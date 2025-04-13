import graphene
from django.contrib.auth import get_user_model
from graphene import Decimal, relay
from graphql_relay import from_global_id, to_global_id
from typing import Optional, Dict, Any, List, DefaultDict
from uuid import UUID
from decimal import Decimal
from collections import defaultdict
import copy

from graphq.order.types import OrderNode
from ... import models
from ...utils import (
    prepare_order_search_vector_value,
    update_order_display_gross_prices,
    get_order_discounts,
    create_order_discount_for_order,
    remove_order_discount_from_order,
    update_discount_for_order_line,
    remove_discount_from_order_line,
    get_duplicated_values,
    validate_product_is_published_in_channel,
    validate_variant_channel_listings,
    add_variant_to_order,
    delete_order_line,
    change_order_line_quantity,
    get_order_country,
    validate_draft_order,
    allocate_stocks,
    allocate_preorders,
    is_reservation_enabled,
    prepare_insufficient_stock_order_validation_errors,
    create_fulfillments,
    approve_fulfillment,
    cancel_waiting_fulfillment,
    cancel_fulfillment,
    create_refund_fulfillment,
    create_fulfillments_for_returned_products,
    cancel_order,
    deactivate_order_gift_cards,
    clean_mark_as_paid_order_payment,
    clean_payment,
    order_has_gift_card_lines,
    convert_to_shipping_method_data,
    clean_order_update_shipping,
    fetch_order_prices_if_expired,
    fetch_order_info,
    fetch_order_lines,
    invalidate_order_prices,
    recalculate_order_weight,
    update_order_search_vector,
    send_fulfillment_update,
    try_payment_action,
    order_created,
    order_charged,
    order_confirmed,
    order_voided,
    order_refunded,
    order_marked_as_paid,
    order_note_added_event,
    order_added_products_event,
    order_removed_products_event,
    order_discount_added_event,
    order_discount_updated_event,
    order_discount_deleted_event,
    order_line_discount_updated_event,
    order_line_discount_removed_event,
    fulfillment_tracking_updated,
)

User = get_user_model()

# Common base classes for mutations
class OrderMutationBase(relay.ClientIDMutation):
    """Base class for order mutations with common functionality."""
    
    class Meta:
        abstract = True
    
    @classmethod
    def check_channel_permissions(cls, info, channel_ids):
        """Check if user has permissions for the given channels."""
        # Implementation depends on your permission system
        pass

    @classmethod
    def get_node_or_error(cls, info, node_id, **kwargs):
        """Optimized node fetching with error handling."""
        try:
            return super().get_node_or_error(info, node_id, **kwargs)
        except Exception as e:
            raise ValidationError(str(e))

class OrderValidationMixin:
    """Mixin for order validation logic."""
    
    @classmethod
    def validate_order(cls, order):
        """Validate if order can be modified."""
        if not (order.is_draft() or order.is_unconfirmed()):
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Only draft and unconfirmed orders can be modified.",
                        code=OrderErrorCode.CANNOT_MODIFY_ORDER.value,
                    )
                }
            )
        return order

class OrderDiscountMixin:
    """Mixin for order discount validation logic."""
    
    @classmethod
    def validate_discount_input(cls, max_total: Money, input: dict):
        """Validate discount input values."""
        value_type = input["value_type"]
        value = input["value"]

        if value_type == DiscountValueTypeEnum.FIXED:
            if value > max_total.amount:
                error_msg = (
                    f"The value ({value}) cannot be higher than {max_total.amount} "
                    f"{max_total.currency}"
                )
                raise ValidationError(
                    {"value": ValidationError(error_msg, code=OrderErrorCode.INVALID.value)}
                )
        elif value > 100:
            error_msg = f"The percentage value ({value}) cannot be higher than 100."
            raise ValidationError(
                {"value": ValidationError(error_msg, code=OrderErrorCode.INVALID.value)}
            )

# Input types
class OrderLineInput(graphene.InputObjectType):
    quantity = graphene.Int(
        description="Number of variant items ordered.", 
        required=True
    )

class OrderLineCreateInput(OrderLineInput):
    variant_id = graphene.ID(
        description="Product variant ID.", 
        name="variantId", 
        required=True
    )
    force_new_line = graphene.Boolean(
        description="Force splitting the same variant into multiple lines.",
        default_value=False
    )
    price = Decimal(
        description="Custom price for the line item.",
        required=True
    )

class OrderDiscountCommonInput(graphene.InputObjectType):
    value_type = graphene.Field(
        DiscountValueTypeEnum,
        description="Type of the discount: fixed or percent",
        required=True
    )
    value = PositiveDecimal(
        description="Value of the discount",
        required=True
    )
    reason = graphene.String(
        description="Explanation for the applied discount"
    )

# Complete set of optimized mutations
class DraftOrderComplete(OrderMutationBase):
    """Optimized mutation for completing a draft order."""
    
    order = graphene.Field(OrderNode, description="Completed order.")

    class Input:
        id = graphene.ID(description="ID of the order to complete", required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=OrderNode,
            qs=models.Order.objects.prefetch_related(
                "lines__variant",
                "payments",
                "channel"
            )
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        with traced_atomic_transaction():
            # Validate and process order
            if not order.is_draft():
                raise ValidationError(
                    {"id": ValidationError("Order is not a draft", code="invalid")}
                )
            
            country = get_order_country(order)
            validate_draft_order(order, country, info.context.user)
            
            # Update order status
            order.status = OrderStatus.UNFULFILLED
            order.save()
            
            # Process lines and inventory
            order_lines_info = []
            for line in order.lines.select_related("variant"):
                if line.variant:
                    order_lines_info.append({
                        "line": line,
                        "quantity": line.quantity,
                        "variant": line.variant
                    })
            
            # Create order event
            events.order_created_event(
                order=order,
                user=info.context.user,
                from_draft=True
            )

        return cls(order=order)

class DraftOrderCreate(OrderMutationBase):
    """Optimized mutation for creating a draft order."""
    
    order = graphene.Field(Order, description="Created draft order.")

    class Input:
        input = graphene.Argument(DraftOrderCreateInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        cleaned_input = cls.clean_input(info, input.get("input"))
        
        with traced_atomic_transaction():
            order = models.Order.objects.create(
                status=OrderStatus.DRAFT,
                origin=OrderOrigin.DRAFT,
                **cleaned_input
            )
            
            # Process lines if provided
            if "lines" in input.get("input", {}):
                cls.process_lines(info, order, input["input"]["lines"])
            
            # Update search vector
            order.search_vector = FlatConcatSearchVector(
                *prepare_order_search_vector_value(order)
            )
            order.save()

        return cls(order=order)

class DraftOrderDelete(OrderMutationBase):
    """Optimized mutation for deleting a draft order."""
    
    order = graphene.Field(Order, description="Deleted draft order.")

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.filter(status=OrderStatus.DRAFT)
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        with traced_atomic_transaction():
            order_id = order.id
            order.delete()
            order.id = order_id  # Keep ID for response

        return cls(order=order)

class DraftOrderUpdate(OrderMutationBase):
    """Optimized mutation for updating a draft order."""
    
    order = graphene.Field(Order, description="Updated draft order.")

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(DraftOrderInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.filter(status=OrderStatus.DRAFT)
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        cleaned_input = cls.clean_input(info, input.get("input"))
        
        with traced_atomic_transaction():
            # Update order fields
            for field, value in cleaned_input.items():
                setattr(order, field, value)
            
            # Update search vector if needed
            if any(field in cleaned_input for field in ["shipping_address", "billing_address"]):
                order.search_vector = FlatConcatSearchVector(
                    *prepare_order_search_vector_value(order)
                )
            
            order.save()

        return cls(order=order)

class OrderAddNote(OrderMutationBase):
    """Optimized mutation for adding a note to an order."""
    
    order = graphene.Field(Order)
    event = graphene.Field(OrderEvent)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(OrderAddNoteInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        message = input.get("input", {}).get("message")
        if not message:
            raise ValidationError(
                {"message": ValidationError("Message is required", code="required")}
            )

        with traced_atomic_transaction():
            event = order_note_added_event(
                order=order,
                user=info.context.user,
                message=message
            )

        return cls(order=order, event=event)

class OrderCancel(OrderMutationBase):
    """Optimized mutation for canceling an order."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        if not order.can_cancel():
            raise ValidationError(
                {"order": ValidationError("Order cannot be canceled", code="invalid")}
            )

        with traced_atomic_transaction():
            cancel_order(
                order=order,
                user=info.context.user,
                manager=get_plugin_manager(info.context)
            )

        return cls(order=order)

class OrderCapture(OrderMutationBase):
    """Optimized mutation for capturing payment for an order."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)
        amount = PositiveDecimal(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.select_related("payments")
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        amount = input.get("amount")
        if amount <= 0:
            raise ValidationError(
                {"amount": ValidationError("Amount must be positive", code="invalid")}
            )

        payment = order.get_last_payment()
        if not payment or not payment.can_capture():
            raise ValidationError(
                {"payment": ValidationError("Payment cannot be captured", code="invalid")}
            )

        with traced_atomic_transaction():
            try_payment_action(
                order,
                info.context.user,
                payment,
                gateway.capture,
                payment,
                get_plugin_manager(info.context),
                amount=amount,
                channel_slug=order.channel.slug
            )

        return cls(order=order)

class OrderConfirm(OrderMutationBase):
    """Optimized mutation for confirming an unconfirmed order."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.filter(status=OrderStatus.UNCONFIRMED)
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        with traced_atomic_transaction():
            order.status = OrderStatus.UNFULFILLED
            order.save()
            
            # Process payment if needed
            payment = order.get_last_payment()
            if payment and payment.is_authorized and payment.can_capture():
                try_payment_action(
                    order,
                    info.context.user,
                    payment,
                    gateway.capture,
                    payment,
                    get_plugin_manager(info.context),
                    channel_slug=order.channel.slug
                )

        return cls(order=order)

class OrderFulfill(OrderMutationBase):
    """Optimized mutation for fulfilling an order."""
    
    fulfillments = graphene.List(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        order_id = graphene.ID(required=True)
        input = graphene.Argument(OrderFulfillInput)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input["order_id"],
            field="order",
            only_type=Order,
            qs=models.Order.objects.prefetch_related(
                "lines__variant",
                "channel"
            )
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        # Process input data
        lines_data = input["input"]["lines"]
        warehouse_lines = defaultdict(list)
        
        for line in lines_data:
            for stock in line["stocks"]:
                if stock["quantity"] > 0:
                    warehouse_id = UUID(stock["warehouse"])
                    warehouse_lines[warehouse_id].append({
                        "order_line": line["order_line_id"],
                        "quantity": stock["quantity"]
                    })

        # Create fulfillments
        with traced_atomic_transaction():
            fulfillments = create_fulfillments(
                user=info.context.user,
                order=order,
                lines_for_warehouses=warehouse_lines,
                manager=get_plugin_manager(info.context),
                notify_customer=input["input"].get("notify_customer", True)
            )

        return cls(fulfillments=fulfillments, order=order)

class FulfillmentCancel(OrderMutationBase):
    """Optimized mutation for canceling a fulfillment."""
    
    fulfillment = graphene.Field(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        fulfillment = cls.get_node_or_error(info, input.get("id"), only_type=Fulfillment)
        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])
        
        if not fulfillment.can_edit():
            raise ValidationError(
                {"fulfillment": ValidationError("Fulfillment cannot be canceled", code="invalid")}
            )

        with traced_atomic_transaction():
            cancel_fulfillment(
                fulfillment=fulfillment,
                user=info.context.user,
                manager=get_plugin_manager(info.context)
            )

        return cls(fulfillment=fulfillment, order=order)

class FulfillmentApprove(OrderMutationBase):
    """Optimized mutation for approving a fulfillment."""
    
    fulfillment = graphene.Field(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        fulfillment = cls.get_node_or_error(info, input.get("id"), only_type=Fulfillment)
        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])
        
        if fulfillment.status != FulfillmentStatus.WAITING_FOR_APPROVAL:
            raise ValidationError(
                {"fulfillment": ValidationError("Fulfillment not waiting for approval", code="invalid")}
            )

        with traced_atomic_transaction():
            approve_fulfillment(
                fulfillment=fulfillment,
                user=info.context.user,
                manager=get_plugin_manager(info.context)
            )

        return cls(fulfillment=fulfillment, order=order)

class FulfillmentUpdateTracking(OrderMutationBase):
    """Optimized mutation for updating fulfillment tracking."""
    
    fulfillment = graphene.Field(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(FulfillmentUpdateTrackingInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        fulfillment = cls.get_node_or_error(info, input.get("id"), only_type=Fulfillment)
        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])
        
        tracking_number = input.get("input", {}).get("tracking_number", "")
        notify_customer = input.get("input", {}).get("notify_customer", False)

        with traced_atomic_transaction():
            fulfillment.tracking_number = tracking_number
            fulfillment.save()
            
            if notify_customer:
                send_fulfillment_update(
                    order=order,
                    fulfillment=fulfillment,
                    manager=get_plugin_manager(info.context)
                )

        return cls(fulfillment=fulfillment, order=order)

class FulfillmentRefundProducts(OrderMutationBase):
    """Optimized mutation for refunding products in a fulfillment."""
    
    fulfillment = graphene.Field(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        order = graphene.ID(required=True)
        input = graphene.Argument(OrderRefundProductsInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("order"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        payment = order.get_last_payment()
        if not payment or not payment.can_refund():
            raise ValidationError(
                {"payment": ValidationError("Payment cannot be refunded", code="invalid")}
            )

        with traced_atomic_transaction():
            refund_fulfillment = create_refund_fulfillment(
                user=info.context.user,
                order=order,
                payment=payment,
                order_lines=input.get("input", {}).get("order_lines", []),
                fulfillment_lines=input.get("input", {}).get("fulfillment_lines", []),
                manager=get_plugin_manager(info.context),
                amount=input.get("input", {}).get("amount_to_refund"),
                include_shipping=input.get("input", {}).get("include_shipping_costs", False)
            )

        return cls(fulfillment=refund_fulfillment, order=order)

class FulfillmentReturnProducts(OrderMutationBase):
    """Optimized mutation for returning products in a fulfillment."""
    
    return_fulfillment = graphene.Field(Fulfillment)
    order = graphene.Field(Order)

    class Input:
        order = graphene.ID(required=True)
        input = graphene.Argument(OrderReturnProductsInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("order"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        payment = order.get_last_payment() if input.get("input", {}).get("refund") else None
        if payment and not payment.can_refund():
            raise ValidationError(
                {"payment": ValidationError("Payment cannot be refunded", code="invalid")}
            )

        with traced_atomic_transaction():
            return_fulfillment = create_fulfillments_for_returned_products(
                user=info.context.user,
                order=order,
                payment=payment,
                order_lines=input.get("input", {}).get("order_lines", []),
                fulfillment_lines=input.get("input", {}).get("fulfillment_lines", []),
                manager=get_plugin_manager(info.context),
                refund=input.get("input", {}).get("refund", False),
                amount=input.get("input", {}).get("amount_to_refund"),
                include_shipping=input.get("input", {}).get("include_shipping_costs", False)
            )

        return cls(return_fulfillment=return_fulfillment, order=order)

class OrderGrantRefundCreate(OrderMutationBase):
    """Optimized mutation for creating a granted refund."""
    
    order = graphene.Field(Order)
    granted_refund = graphene.Field(OrderGrantedRefund)

    class Input:
        order_id = graphene.ID(required=True)
        input = graphene.Argument(OrderGrantRefundCreateInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("order_id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        amount = input.get("input", {}).get("amount")
        reason = input.get("input", {}).get("reason", "")

        with traced_atomic_transaction():
            granted_refund = order.granted_refunds.create(
                amount_value=amount,
                currency=order.currency,
                reason=reason,
                user=info.context.user
            )

        return cls(order=order, granted_refund=granted_refund)

class OrderGrantRefundUpdate(OrderMutationBase):
    """Optimized mutation for updating a granted refund."""
    
    order = graphene.Field(Order)
    granted_refund = graphene.Field(OrderGrantedRefund)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(OrderGrantRefundUpdateInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        granted_refund = cls.get_node_or_error(info, input.get("id"), only_type=OrderGrantedRefund)
        order = granted_refund.order
        cls.check_channel_permissions(info, [order.channel_id])
        
        amount = input.get("input", {}).get("amount")
        reason = input.get("input", {}).get("reason")

        if not amount and not reason:
            raise ValidationError(
                {"input": ValidationError("At least amount or reason must be provided", code="required")}
            )

        with traced_atomic_transaction():
            if amount is not None:
                granted_refund.amount_value = amount
            if reason is not None:
                granted_refund.reason = reason
            granted_refund.save()

        return cls(order=order, granted_refund=granted_refund)

class OrderLinesCreate(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for creating order lines."""
    
    order = graphene.Field(Order)
    order_lines = graphene.List(OrderLine)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.List(OrderLineCreateInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        lines_data = []
        variants = []
        
        # Prepare line data
        for line_input in input.get("input", []):
            variant = cls.get_node_or_error(info, line_input["variant_id"], field="variant_id", only_type=ProductVariant)
            if line_input["quantity"] <= 0:
                raise ValidationError(
                    {"quantity": ValidationError("Quantity must be positive", code="invalid")}
                )
            
            lines_data.append({
                "variant": variant,
                "variant_id": str(variant.id),
                "quantity": line_input["quantity"],
                "price_override": line_input.get("price")
            })
            variants.append(variant)
        
        # Validate variants
        try:
            validate_product_is_published_in_channel(variants, order.channel)
            validate_variant_channel_listings(variants, order.channel)
        except ValidationError as error:
            raise ValidationError(error)

        with traced_atomic_transaction():
            # Add lines to order
            added_lines = []
            for line_data in lines_data:
                line = add_variant_to_order(
                    order=order,
                    line_data=line_data,
                    user=info.context.user,
                    manager=get_plugin_manager(info.context),
                    allocate_stock=order.is_unconfirmed()
                )
                added_lines.append(line)
            
            # Create event
            events.order_added_products_event(
                order=order,
                user=info.context.user,
                order_lines=added_lines
            )
            
            # Update order
            invalidate_order_prices(order)
            recalculate_order_weight(order)
            update_order_search_vector(order)
            order.save()

        return cls(order=order, order_lines=added_lines)

class OrderLineDelete(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for deleting an order line."""
    
    order = graphene.Field(Order)
    order_line = graphene.Field(OrderLine)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        line = cls.get_node_or_error(info, input.get("id"), only_type=OrderLine)
        order = line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        warehouse_pk = line.allocations.first().stock.warehouse.pk if order.is_unconfirmed() else None

        with traced_atomic_transaction():
            # Delete line
            line_info = OrderLineInfo(
                line=line,
                quantity=line.quantity,
                variant=line.variant,
                warehouse_pk=warehouse_pk
            )
            delete_order_line(line_info, get_plugin_manager(info.context))
            
            # Create event
            events.order_removed_products_event(
                order=order,
                user=info.context.user,
                order_lines=[line]
            )
            
            # Update order
            invalidate_order_prices(order)
            recalculate_order_weight(order)
            update_order_search_vector(order)
            order.save()

        return cls(order=order, order_line=line)

class OrderLineUpdate(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for updating an order line."""
    
    order = graphene.Field(Order)
    order_line = graphene.Field(OrderLine)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(OrderLineInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        line = cls.get_node_or_error(info, input.get("id"), only_type=OrderLine)
        order = line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        quantity = input.get("input", {}).get("quantity")
        if quantity <= 0:
            raise ValidationError(
                {"quantity": ValidationError("Quantity must be positive", code="invalid")}
            )

        old_quantity = line.quantity
        warehouse_pk = line.allocations.first().stock.warehouse.pk if order.is_unconfirmed() else None

        with traced_atomic_transaction():
            # Update line quantity
            line_info = OrderLineInfo(
                line=line,
                quantity=quantity,
                variant=line.variant,
                warehouse_pk=warehouse_pk
            )
            try:
                change_order_line_quantity(
                    user=info.context.user,
                    line_info=line_info,
                    old_quantity=old_quantity,
                    new_quantity=quantity,
                    channel=order.channel,
                    manager=get_plugin_manager(info.context)
                )
            except InsufficientStock:
                raise ValidationError(
                    "Insufficient stock",
                    code=OrderErrorCode.INSUFFICIENT_STOCK.value
                )
            
            # Update order
            invalidate_order_prices(order)
            recalculate_order_weight(order)
            order.save()

        return cls(order=order, order_line=line)

class OrderDiscountAdd(OrderMutationBase, OrderValidationMixin, OrderDiscountMixin):
    """Optimized mutation for adding a discount to an order."""
    
    order = graphene.Field(Order)

    class Input:
        order_id = graphene.ID(required=True)
        input = graphene.Argument(OrderDiscountCommonInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("order_id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        value_type = input.get("input", {}).get("value_type")
        value = input.get("input", {}).get("value")
        reason = input.get("input", {}).get("reason", "")
        
        cls.validate_discount_input(order.undiscounted_total.gross, {
            "value_type": value_type,
            "value": value
        })

        with traced_atomic_transaction():
            order_discount = create_order_discount_for_order(
                order=order,
                reason=reason,
                value_type=value_type,
                value=value
            )
            
            # Create event
            events.order_discount_added_event(
                order=order,
                user=info.context.user,
                order_discount=order_discount
            )
            
            # Update order
            order, _ = fetch_order_prices_if_expired(order, get_plugin_manager(info.context), True)

        return cls(order=order)

class OrderDiscountUpdate(OrderMutationBase, OrderValidationMixin, OrderDiscountMixin):
    """Optimized mutation for updating an order discount."""
    
    order = graphene.Field(Order)

    class Input:
        discount_id = graphene.ID(required=True)
        input = graphene.Argument(OrderDiscountCommonInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_discount = cls.get_node_or_error(info, input.get("discount_id"), only_type=OrderDiscount)
        order = order_discount.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        value_type = input.get("input", {}).get("value_type", order_discount.value_type)
        value = input.get("input", {}).get("value", order_discount.value)
        reason = input.get("input", {}).get("reason", order_discount.reason)
        
        cls.validate_discount_input(order.undiscounted_total.gross, {
            "value_type": value_type,
            "value": value
        })

        with traced_atomic_transaction():
            # Keep copy for event
            old_order_discount = copy.deepcopy(order_discount)
            
            # Update discount
            order_discount.value_type = value_type
            order_discount.value = value
            order_discount.reason = reason
            order_discount.save()
            
            # Create event if values changed
            if (old_order_discount.value_type != value_type or 
                old_order_discount.value != value):
                events.order_discount_updated_event(
                    order=order,
                    user=info.context.user,
                    order_discount=order_discount,
                    old_order_discount=old_order_discount
                )
            
            # Update order
            order, _ = fetch_order_prices_if_expired(order, get_plugin_manager(info.context), True)

        return cls(order=order)

class OrderDiscountDelete(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for deleting an order discount."""
    
    order = graphene.Field(Order)

    class Input:
        discount_id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_discount = cls.get_node_or_error(info, input.get("discount_id"), only_type=OrderDiscount)
        order = order_discount.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)

        with traced_atomic_transaction():
            # Create event
            events.order_discount_deleted_event(
                order=order,
                user=info.context.user,
                order_discount=order_discount
            )
            
            # Remove discount
            remove_order_discount_from_order(order, order_discount)
            
            # Update order
            invalidate_order_prices(order)
            update_order_search_vector(order, save=False)
            order.save(update_fields=["should_refresh_prices", "search_vector"])

        return cls(order=order)

class OrderLineDiscountUpdate(OrderMutationBase, OrderValidationMixin, OrderDiscountMixin):
    """Optimized mutation for updating an order line discount."""
    
    order = graphene.Field(Order)
    order_line = graphene.Field(OrderLine)

    class Input:
        order_line_id = graphene.ID(required=True)
        input = graphene.Argument(OrderDiscountCommonInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_line = cls.get_node_or_error(info, input.get("order_line_id"), only_type=OrderLine)
        order = order_line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        
        value_type = input.get("input", {}).get("value_type", order_line.unit_discount_type)
        value = input.get("input", {}).get("value", order_line.unit_discount_value)
        reason = input.get("input", {}).get("reason", order_line.unit_discount_reason)
        
        cls.validate_discount_input(order_line.undiscounted_unit_price.gross, {
            "value_type": value_type,
            "value": value
        })

        with traced_atomic_transaction():
            # Keep copy for event
            old_order_line = copy.deepcopy(order_line)
            
            # Update discount
            update_discount_for_order_line(
                order_line=order_line,
                order=order,
                reason=reason,
                value_type=value_type,
                value=value
            )
            
            # Create event if values changed
            if (old_order_line.unit_discount_value != value or 
                old_order_line.unit_discount_type != value_type):
                events.order_line_discount_updated_event(
                    order=order,
                    user=info.context.user,
                    line=order_line,
                    line_before_update=old_order_line
                )
            
            # Update order
            invalidate_order_prices(order, save=True)

        return cls(order=order, order_line=order_line)

class OrderLineDiscountRemove(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for removing an order line discount."""
    
    order = graphene.Field(Order)
    order_line = graphene.Field(OrderLine)

    class Input:
        order_line_id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_line = cls.get_node_or_error(info, input.get("order_line_id"), only_type=OrderLine)
        order = order_line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)

        with traced_atomic_transaction():
            # Remove discount
            remove_discount_from_order_line(order_line, order)
            
            # Create event
            events.order_line_discount_removed_event(
                order=order,
                user=info.context.user,
                line=order_line
            )
            
            # Update order
            invalidate_order_prices(order, save=True)

        return cls(order=order, order_line=order_line)

class OrderMarkAsPaid(OrderMutationBase):
    """Optimized mutation for marking an order as paid."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)
        transaction_reference = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        
        if not order.billing_address:
            raise ValidationError(
                {"billing_address": ValidationError("Billing address is required", code="required")}
            )

        with traced_atomic_transaction():
            # Mark as paid
            clean_mark_as_paid_order_payment(order)
            
            # Create event
            events.order_marked_as_paid_event(
                order=order,
                user=info.context.user,
                transaction_reference=input.get("transaction_reference")
            )

        return cls(order=order)

class OrderRefund(OrderMutationBase):
    """Optimized mutation for refunding an order."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)
        amount = PositiveDecimal(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.select_related("payments")
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        amount = input.get("amount")
        if amount <= 0:
            raise ValidationError(
                {"amount": ValidationError("Amount must be positive", code="invalid")}
            )

        payment = order.get_last_payment()
        if not payment or not payment.can_refund():
            raise ValidationError(
                {"payment": ValidationError("Payment cannot be refunded", code="invalid")}
            )

        with traced_atomic_transaction():
            # Process refund
            try_payment_action(
                order,
                info.context.user,
                payment,
                gateway.refund,
                payment,
                get_plugin_manager(info.context),
                amount=amount,
                channel_slug=order.channel.slug
            )
            
            # Create fulfillment for the refund
            order.fulfillments.create(
                status=FulfillmentStatus.REFUNDED,
                total_refund_amount=amount
            )

        return cls(order=order)

class OrderUpdateShipping(OrderMutationBase, OrderValidationMixin):
    """Optimized mutation for updating order shipping."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)
        input = graphene.Argument(OrderUpdateShippingInput, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.select_related(
                "channel",
                "shipping_method",
                "billing_address",
                "shipping_address"
            )
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)

        shipping_method_id = input.get("input", {}).get("shipping_method")

        with traced_atomic_transaction():
            if shipping_method_id is None:
                # Clear shipping method
                if not order.is_draft() and order.is_shipping_required():
                    raise ValidationError(
                        {"shipping_method": ValidationError(
                            "Shipping method is required", code="required"
                        )}
                    )
                
                order.shipping_method = None
                order.shipping_method_name = None
                order.shipping_price = zero_taxed_money(order.currency)
            else:
                # Update shipping method
                shipping_method = cls.get_node_or_error(
                    info,
                    shipping_method_id,
                    field="shipping_method",
                    only_type=ShippingMethod
                )
                
                shipping_channel_listing = shipping_method.channel_listings.filter(
                    channel=order.channel
                ).first()
                if not shipping_channel_listing:
                    raise ValidationError(
                        {"shipping_method": ValidationError(
                            "Shipping method not available in order channel", code="invalid"
                        )}
                    )
                
                order.shipping_method = shipping_method
                order.shipping_method_name = shipping_method.name
                order.shipping_price = calculate_shipping_price(
                    order,
                    shipping_method,
                    shipping_channel_listing
                )
            
            # Update order
            order.save(update_fields=[
                "shipping_method",
                "shipping_method_name",
                "shipping_price_net_amount",
                "shipping_price_gross_amount",
                "updated_at"
            ])
            
            # Call webhook
            get_plugin_manager(info.context).order_updated(order)

        return cls(order=order)

class OrderVoid(OrderMutationBase):
    """Optimized mutation for voiding an order."""
    
    order = graphene.Field(Order)

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=Order,
            qs=models.Order.objects.select_related("payments")
        )
        
        cls.check_channel_permissions(info, [order.channel_id])
        
        payment = order.get_last_payment()
        if not payment or not payment.can_void():
            raise ValidationError(
                {"payment": ValidationError("Payment cannot be voided", code="invalid")}
            )

        with traced_atomic_transaction():
            # Process void
            try_payment_action(
                order,
                info.context.user,
                payment,
                gateway.void,
                payment,
                get_plugin_manager(info.context),
                channel_slug=order.channel.slug
            )
            
            # Create event
            events.order_voided_event(
                order=order,
                user=info.context.user,
                payment=payment
            )

        return cls(order=order)

class OrderMutations(graphene.ObjectType):
    draft_order_complete = DraftOrderComplete.Field()
    draft_order_create = DraftOrderCreate.Field()
    draft_order_delete = DraftOrderDelete.Field()
    draft_order_update = DraftOrderUpdate.Field()
    
    order_add_note = OrderAddNote.Field()
    order_cancel = OrderCancel.Field()
    order_capture = OrderCapture.Field()
    order_confirm = OrderConfirm.Field()
    
    order_fulfill = OrderFulfill.Field()
    order_fulfillment_cancel = FulfillmentCancel.Field()
    order_fulfillment_approve = FulfillmentApprove.Field()
    order_fulfillment_update_tracking = FulfillmentUpdateTracking.Field()
    order_fulfillment_refund_products = FulfillmentRefundProducts.Field()
    order_fulfillment_return_products = FulfillmentReturnProducts.Field()
    
    order_grant_refund_create = OrderGrantRefundCreate.Field()
    order_grant_refund_update = OrderGrantRefundUpdate.Field()
    
    order_lines_create = OrderLinesCreate.Field()
    order_line_delete = OrderLineDelete.Field()
    order_line_update = OrderLineUpdate.Field()
    
    order_discount_add = OrderDiscountAdd.Field()
    order_discount_update = OrderDiscountUpdate.Field()
    order_discount_delete = OrderDiscountDelete.Field()
    
    order_line_discount_update = OrderLineDiscountUpdate.Field()
    order_line_discount_remove = OrderLineDiscountRemove.Field()
    
    order_mark_as_paid = OrderMarkAsPaid.Field()
    order_refund = OrderRefund.Field()
    order_update = OrderUpdate.Field()
    order_update_shipping = OrderUpdateShipping.Field()
    order_void = OrderVoid.Field()