import graphene
from django.contrib.auth import get_user_model
from graphene import Decimal, relay
from graphql_relay import from_global_id, to_global_id

from graphq.order.types import OrderNode

User = get_user_model()


class DraftOrderComplete(relay.ClientIDMutation):
    order = graphene.Field(OrderNode, description="Completed order.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to be completed.")

    @classmethod
    def update_user_fields(cls, order):
        if order.user:
            order.user_email = order.user.email
        elif order.user_email:
            try:
                order.user = User.objects.get(email=order.user_email)
            except User.DoesNotExist:
                order.user = None

    @classmethod
    def validate_order(cls, order):
        if not order.is_draft():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "The order is not a draft.", code=OrderErrorCode.INVALID.value
                    )
                }
            )
        return order

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        user = cast(User, user)
        manager = info.context.user

        # Retrieve the order by its ID
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            only_type=OrderNode,
            qs=models.Order.objects.prefetch_related("lines__variant"),
        )

        # Validate channel permissions and order
        cls.check_channel_permissions(info, [order.channel_id])
        order, _ = fetch_order_prices_if_expired(order, manager)
        cls.validate_order(order)

        # Validate draft order requirements
        country = get_order_country(order)
        validate_draft_order(order, country, manager)

        # Perform necessary updates in a transaction
        with traced_atomic_transaction():
            cls.update_user_fields(order)
            order.status = OrderStatus.UNFULFILLED

            # Handle non-shipping orders
            if not order.is_shipping_required():
                order.shipping_method_name = None
                order.shipping_price = zero_taxed_money(order.currency)
                if order.shipping_address:
                    order.shipping_address.delete()
                    order.shipping_address = None

            # Update the order's search vector and gross prices
            order.search_vector = FlatConcatSearchVector(
                *prepare_order_search_vector_value(order)
            )
            update_order_display_gross_prices(order)
            order.save()

            # Allocate stock and preorders
            channel = order.channel
            order_lines_info = []
            for line in order.lines.all():
                if line.variant and (
                    line.variant.track_inventory or line.variant.is_preorder_active()
                ):
                    line_data = OrderLineInfo(
                        line=line, quantity=line.quantity, variant=line.variant
                    )
                    order_lines_info.append(line_data)

                    # Allocate stock and handle preorders
                    site = get_site_promise(info.context).get()
                    try:
                        with traced_atomic_transaction():
                            allocate_stocks(
                                [line_data],
                                country,
                                channel,
                                manager,
                                check_reservations=is_reservation_enabled(
                                    site.settings
                                ),
                            )
                            allocate_preorders(
                                [line_data],
                                channel.slug,
                                check_reservations=is_reservation_enabled(
                                    site.settings
                                ),
                            )
                    except InsufficientStock as exc:
                        errors = prepare_insufficient_stock_order_validation_errors(exc)
                        raise ValidationError({"lines": errors})

            # Prepare order info and trigger post-order creation events
            order_info = OrderInfo(
                order=order,
                customer_email=order.get_customer_email(),
                channel=channel,
                payment=order.get_last_payment(),
                lines_data=order_lines_info,
            )
            transaction.on_commit(
                lambda: order_created(
                    order_info=order_info,
                    user=user,
                    manager=manager,
                    from_draft=True,
                )
            )

        # Return the completed order
        return DraftOrderComplete(order=order)


class OrderLineInput(graphene.InputObjectType):
    quantity = graphene.Int(
        description="Number of variant items ordered.", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderLineCreateInput(OrderLineInput):
    variant_id = graphene.ID(
        description="Product variant ID.", name="variantId", required=True
    )
    force_new_line = graphene.Boolean(
        required=False,
        default_value=False,
        description=(
            "Flag that allow force splitting the same variant into multiple lines "
            "by skipping the matching logic. " + ADDED_IN_36
        ),
    )
    price = Decimal(required=True, decimal_input=Decimal(required=True))

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class DraftOrderInput(InputObjectType):
    billing_address = AddressInput(description="Billing address of the customer.")
    user = graphene.ID(
        description="Customer associated with the draft order.", name="user"
    )
    user_email = graphene.String(description="Email address of the customer.")
    discount = Decimal(required=True, decimal_input=Decimal(required=True))
    shipping_address = AddressInput(description="Shipping address of the customer.")
    shipping_method = graphene.ID(
        description="ID of a selected shipping method.", name="shippingMethod"
    )
    voucher = graphene.ID(
        description="ID of the voucher associated with the order.", name="voucher"
    )
    customer_note = graphene.String(
        description="A note from a customer. Visible by customers in the order summary."
    )
    channel_id = graphene.ID(description="ID of the channel associated with the order.")
    redirect_url = graphene.String(
        required=False,
        description=(
            "URL of a view where users should be redirected to "
            "see the order details. URL in RFC 1808 format."
        ),
    )
    external_reference = graphene.String(
        description="External ID of this order.", required=False
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class DraftOrderCreateInput(DraftOrderInput):
    lines = NonNullList(
        OrderLineCreateInput,
        description=(
            "Variant line input consisting of variant ID and quantity of products."
        ),
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class DraftOrderCreate(
    relay.ClientIDMutation,
    ModelWithRestrictedChannelAccessMutation,
    ShippingMethodUpdateMixin,
    I18nMixin,
):

    class Input:
        input = DraftOrderCreateInput(
            required=True, description="Fields required to create an order."
        )

    order = graphene.Field(Order)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        shipping_address = input.get("shipping_address")
        billing_address = input.get("billing_address")
        redirect_url = input.get("redirect_url")
        channel_id = input.get("channel_id")
        user_email = input.get("user_email")
        manager = info.context.user
        shipping_method_input = {}

        if "shipping_method" in input:
            shipping_method_input["shipping_method"] = get_shipping_model_by_object_id(
                object_id=input.get("shipping_method"), raise_error=False
            )

        user = None
        if user_email:
            try:
                user = User.objects.get(email=user_email, is_active=True)
            except User.DoesNotExist:
                user = None

        order = models.Order.objects.create(
            shipping_address=shipping_address,
            billing_address=billing_address,
            redirect_url=redirect_url,
            channel_id=channel_id,
            user=user,
            status=OrderStatus.DRAFT,
            origin=OrderOrigin.DRAFT,
        )

        # Clean lines, voucher, addresses, and other inputs
        cleaned_input = cls.clean_input(info, order, input)

        # Save addresses
        cls._save_addresses(order, cleaned_input)

        # Save lines
        cls._save_lines(info, order, cleaned_input.get("lines_data"), app=manager)

        # Finalize and save order
        cls._commit_changes(
            info, order, cleaned_input, is_new_instance=True, app=manager
        )

        return DraftOrderCreate(order=order)


class DraftOrderDelete(
    relay.ClientIDMutation,
    ModelDeleteWithRestrictedChannelAccessMutation,
    ModelWithExtRefMutation,
):

    class Input:
        id = graphene.ID(required=False, description="ID of a draft order to delete.")
        external_reference = graphene.String(
            required=False, description="External ID of a draft order to delete."
        )

    order = graphene.Field(Order)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_instance(info, **input)
        manager = get_plugin_manager_promise(info.context).get()

        with traced_atomic_transaction():
            response = super().perform_mutation(root, info, **input)
            cls.call_event(manager.draft_order_deleted, order)

        return DraftOrderDelete(order=order)


class DraftOrderUpdate(
    relay.ClientIDMutation, DraftOrderCreate, ModelWithExtRefMutation
):

    class Input:
        id = graphene.ID(required=False, description="ID of a draft order to update.")
        external_reference = graphene.String(
            required=False, description="External ID of a draft order to update."
        )
        input = DraftOrderInput(
            required=True, description="Fields required to update an order."
        )

    order = graphene.Field(Order)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_instance(info, **input)

        cleaned_input = cls.clean_input(info, order, input)
        cls._save_addresses(order, cleaned_input)
        cls._save_lines(
            info, order, cleaned_input.get("lines_data"), app=info.context.user
        )

        # Finalize updates and save
        cls._commit_changes(
            info, order, cleaned_input, is_new_instance=False, app=info.context.user
        )

        return DraftOrderUpdate(order=order)


class FulfillmentApprove(relay.ClientIDMutation, BaseMutation):

    class Input:
        id = graphene.ID(required=True, description="ID of a fulfillment to approve.")
        notify_customer = graphene.Boolean(
            required=True, description="True if confirmation email should be sent."
        )
        allow_stock_to_be_exceeded = graphene.Boolean(
            default_value=False, description="True if stock could be exceeded."
        )

    fulfillment = graphene.Field(Fulfillment, description="An approved fulfillment.")
    order = graphene.Field(Order, description="Order whose fulfillment was approved.")

    class Meta:
        description = "Approve existing fulfillment." + ADDED_IN_31
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, fulfillment):
        if fulfillment.status != FulfillmentStatus.WAITING_FOR_APPROVAL:
            raise ValidationError(
                "Invalid fulfillment status, only WAITING_FOR_APPROVAL "
                "fulfillments can be accepted.",
                code=OrderErrorCode.INVALID.value,
            )

        OrderFulfill.check_lines_for_preorder([line.order_line for line in fulfillment])
        site = get_site_promise(info.context).get()
        if (
            not site.settings.fulfillment_allow_unpaid
            and not fulfillment.order.is_fully_paid()
        ):
            raise ValidationError(
                "Cannot fulfill unpaid order.",
                code=OrderErrorCode.CANNOT_FULFILL_UNPAID_ORDER.value,
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        fulfillment = cls.get_node_or_error(
            info, input.get("id"), only_type=Fulfillment
        )
        notify_customer = input.get("notify_customer")
        allow_stock_to_be_exceeded = input.get("allow_stock_to_be_exceeded", False)

        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.clean_input(info, fulfillment)

        user = info.context.user
        user = cast(User, user)

        manager = get_plugin_manager_promise(info.context).get()
        app = get_app_promise(info.context).get()
        site = get_site_promise(info.context).get()

        try:
            fulfillment = approve_fulfillment(
                fulfillment,
                user,
                app,
                manager,
                site.settings,
                notify_customer=notify_customer,
                allow_stock_to_be_exceeded=allow_stock_to_be_exceeded,
            )
        except InsufficientStock as exc:
            errors = prepare_insufficient_stock_order_validation_errors(exc)
            raise ValidationError({"stocks": errors})

        order.refresh_from_db(fields=["status"])

        return FulfillmentApprove(fulfillment=fulfillment, order=order)


class FulfillmentCancelInput(InputObjectType):
    warehouse_id = graphene.ID(
        description="ID of a warehouse where items will be restocked. Optional "
        "when fulfillment is in WAITING_FOR_APPROVAL state.",
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class FulfillmentCancel(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a fulfillment to cancel.")
        input = FulfillmentCancelInput(
            required=False, description="Fields required to cancel a fulfillment."
        )

    fulfillment = graphene.Field(Fulfillment, description="A canceled fulfillment.")
    order = graphene.Field(Order, description="Order which fulfillment was canceled.")

    class Meta:
        description = "Cancels existing fulfillment and optionally restocks items."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def validate_fulfillment(cls, fulfillment, warehouse):
        if not fulfillment.can_edit():
            raise ValidationError(
                {
                    "fulfillment": ValidationError(
                        "This fulfillment can't be canceled",
                        code=OrderErrorCode.CANNOT_CANCEL_FULFILLMENT.value,
                    )
                }
            )
        if (
            fulfillment.status != FulfillmentStatus.WAITING_FOR_APPROVAL
            and not warehouse
        ):
            raise ValidationError(
                {
                    "warehouseId": ValidationError(
                        "This parameter is required for fulfillments which are not in "
                        "WAITING_FOR_APPROVAL state.",
                        code=OrderErrorCode.REQUIRED.value,
                    )
                }
            )

    @classmethod
    def validate_order(cls, order):
        if order_has_gift_card_lines(order):
            raise ValidationError(
                {
                    "fulfillment": ValidationError(
                        "Cannot cancel fulfillment with gift card lines.",
                        code=OrderErrorCode.CANNOT_CANCEL_FULFILLMENT.value,
                    )
                }
            )
        return order

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        fulfillment = cls.get_node_or_error(
            info, input.get("id"), only_type=Fulfillment
        )
        user = info.context.user
        user = cast(User, user)

        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])

        cls.validate_order(order)

        warehouse = None
        fulfillment_input = input.get("input")
        if fulfillment.status != FulfillmentStatus.WAITING_FOR_APPROVAL:
            if fulfillment_input:
                warehouse_id = fulfillment_input.get("warehouse_id")
                if warehouse_id:
                    warehouse = cls.get_node_or_error(
                        info, warehouse_id, only_type=Warehouse, field="warehouse_id"
                    )

        cls.validate_fulfillment(fulfillment, warehouse)

        manager = get_plugin_manager_promise(info.context).get()

        if fulfillment.status == FulfillmentStatus.WAITING_FOR_APPROVAL:
            fulfillment = cancel_waiting_fulfillment(fulfillment, user, manager)
        else:
            fulfillment = cancel_fulfillment(fulfillment, user, warehouse, manager)

        order.refresh_from_db(fields=["status"])
        return FulfillmentCancel(fulfillment=fulfillment, order=order)


class FulfillmentRefundAndReturnProductBase(relay.ClientIDMutation):
    class Meta:
        abstract = True

    class Input:
        warehouse_id = graphene.ID(
            description="ID of a warehouse where items will be restocked. Optional "
            "when fulfillment is in WAITING_FOR_APPROVAL state.",
            required=False,
        )

    @classmethod
    def clean_order_payment(cls, payment, cleaned_input):
        if not payment or not payment.can_refund():
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Order cannot be refunded.",
                        code=OrderErrorCode.CANNOT_REFUND.value,
                    )
                }
            )
        cleaned_input["payment"] = payment

    @classmethod
    def clean_amount_to_refund(
        cls, order, amount_to_refund, charged_value, cleaned_input
    ):
        if amount_to_refund is not None:
            if order_has_gift_card_lines(order):
                raise ValidationError(
                    {
                        "amount_to_refund": ValidationError(
                            (
                                "Cannot specify amount to refund when order has "
                                "gift card lines."
                            ),
                            code=OrderErrorCode.CANNOT_REFUND.value,
                        )
                    }
                )

            if amount_to_refund > charged_value:
                raise ValidationError(
                    {
                        "amount_to_refund": ValidationError(
                            (
                                "The amount to refund is greater than the maximal "
                                "possible amount to refund."
                            ),
                            code=OrderErrorCode.CANNOT_REFUND.value,
                        ),
                    }
                )
        cleaned_input["amount_to_refund"] = amount_to_refund

    @classmethod
    def _raise_error_for_line(cls, msg, type, line_id, field_name, code=None):
        line_global_id = graphene.Node.to_global_id(type, line_id)
        if not code:
            code = OrderErrorCode.INVALID_QUANTITY.value
        raise ValidationError(
            {
                field_name: ValidationError(
                    msg,
                    code=code,
                    params={field_name: line_global_id},
                )
            }
        )

    @classmethod
    def raise_error_for_payment_error(cls):
        msg = "The refund operation is not available yet."
        code = OrderErrorCode.CANNOT_REFUND.value
        raise ValidationError(msg, code=code)

    @classmethod
    def clean_fulfillment_lines(
        cls, fulfillment_lines_data, cleaned_input, whitelisted_statuses
    ):
        fulfillment_lines = cls.get_nodes_or_error(
            [line["fulfillment_line_id"] for line in fulfillment_lines_data],
            field="fulfillment_lines",
            only_type=FulfillmentLine,
            qs=order_models.FulfillmentLine.objects.prefetch_related(
                "fulfillment", "order_line"
            ),
        )
        fulfillment_lines = list(fulfillment_lines)
        cleaned_fulfillment_lines = []
        for line, line_data in zip(fulfillment_lines, fulfillment_lines_data):
            quantity = line_data["quantity"]
            if line.order_line.is_gift_card:
                cls._raise_error_for_line(
                    "Cannot refund or return gift card line.",
                    "FulfillmentLine",
                    line.pk,
                    "fulfillment_line_id",
                    OrderErrorCode.GIFT_CARD_LINE.value,
                )
            if line.quantity < quantity:
                cls._raise_error_for_line(
                    "Provided quantity is bigger than quantity from "
                    "fulfillment line",
                    "FulfillmentLine",
                    line.pk,
                    "fulfillment_line_id",
                )
            if line.fulfillment.status not in whitelisted_statuses:
                allowed_statuses_str = ", ".join(whitelisted_statuses)
                cls._raise_error_for_line(
                    f"Unable to process action for fulfillmentLine with different "
                    f"status than {allowed_statuses_str}.",
                    "FulfillmentLine",
                    line.pk,
                    "fulfillment_line_id",
                    code=OrderErrorCode.INVALID.value,
                )
            replace = line_data.get("replace", False)
            if replace and not line.order_line.variant_id:
                cls._raise_error_for_line(
                    "Unable to replace line as the assigned product doesn't exist.",
                    "OrderLine",
                    line.pk,
                    "order_line_id",
                )
            cleaned_fulfillment_lines.append(
                FulfillmentLineData(
                    line=line,
                    quantity=quantity,
                    replace=replace,
                )
            )
        cleaned_input["fulfillment_lines"] = cleaned_fulfillment_lines

    @classmethod
    def clean_lines(cls, lines_data, cleaned_input):
        order_lines = cls.get_nodes_or_error(
            [line["order_line_id"] for line in lines_data],
            field="order_lines",
            only_type=OrderLine,
            qs=order_models.OrderLine.objects.prefetch_related(
                "fulfillment_lines__fulfillment", "variant", "allocations"
            ),
        )
        order_lines = list(order_lines)
        cleaned_order_lines = []
        for line, line_data in zip(order_lines, lines_data):
            quantity = line_data["quantity"]
            if line.is_gift_card:
                cls._raise_error_for_line(
                    "Cannot refund or return gift card line.",
                    "OrderLine",
                    line.pk,
                    "order_line_id",
                    OrderErrorCode.GIFT_CARD_LINE.value,
                )
            if line.quantity < quantity:
                cls._raise_error_for_line(
                    "Provided quantity is bigger than quantity from order line.",
                    "OrderLine",
                    line.pk,
                    "order_line_id",
                )
            quantity_ready_to_move = line.quantity_unfulfilled
            if quantity_ready_to_move < quantity:
                cls._raise_error_for_line(
                    "Provided quantity is bigger than unfulfilled quantity.",
                    "OrderLine",
                    line.pk,
                    "order_line_id",
                )
            variant = line.variant
            replace = line_data.get("replace", False)
            if replace and not line.variant_id:
                cls._raise_error_for_line(
                    "Unable to replace line as the assigned product doesn't exist.",
                    "OrderLine",
                    line.pk,
                    "order_line_id",
                )

            cleaned_order_lines.append(
                OrderLineInfo(
                    line=line, quantity=quantity, variant=variant, replace=replace
                )
            )
        cleaned_input["order_lines"] = cleaned_order_lines


class OrderRefundLineInput(InputObjectType):
    order_line_id = graphene.ID(
        description="The ID of the order line to refund.",
        name="orderLineId",
        required=True,
    )
    quantity = graphene.Int(
        description="The number of items to be refunded.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderRefundFulfillmentLineInput(InputObjectType):
    fulfillment_line_id = graphene.ID(
        description="The ID of the fulfillment line to refund.",
        name="fulfillmentLineId",
        required=True,
    )
    quantity = graphene.Int(
        description="The number of items to be refunded.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderRefundProductsInput(InputObjectType):
    order_lines = NonNullList(
        OrderRefundLineInput,
        description="List of unfulfilled lines to refund.",
    )
    fulfillment_lines = NonNullList(
        OrderRefundFulfillmentLineInput,
        description="List of fulfilled lines to refund.",
    )
    amount_to_refund = PositiveDecimal(
        required=False,
        description="The total amount of refund when the value is provided manually.",
    )
    include_shipping_costs = graphene.Boolean(
        description=(
            "If true, Saleor will refund shipping costs. If amountToRefund is provided"
            "includeShippingCosts will be ignored."
        ),
        default_value=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class FulfillmentRefundProducts(
    relay.ClientIDMutation, FulfillmentRefundAndReturnProductBase
):
    fulfillment = graphene.Field(Fulfillment, description="A refunded fulfillment.")
    order = graphene.Field(Order, description="Order which fulfillment was refunded.")

    class Input:
        order = graphene.ID(
            description="ID of the order to be refunded.", required=True
        )
        input = OrderRefundProductsInput(
            required=True,
            description="Fields required to create an refund fulfillment.",
        )

    class Meta:
        description = "Refund products."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, order_id, input):
        cleaned_input: Dict[str, Any] = {}
        amount_to_refund = input.get("amount_to_refund")
        include_shipping_costs = input["include_shipping_costs"]

        qs = order_models.Order.objects.prefetch_related("payments")
        order = cls.get_node_or_error(
            info, order_id, field="order", only_type=Order, qs=qs
        )
        payment = order.get_last_payment()
        cls.clean_order_payment(payment, cleaned_input)
        charged_value = payment.captured_amount
        cls.clean_amount_to_refund(
            order, amount_to_refund, charged_value, cleaned_input
        )

        cleaned_input.update(
            {
                "include_shipping_costs": include_shipping_costs,
                "order": order,
                "payment": payment,
            }
        )

        order_lines_data = input.get("order_lines", [])
        fulfillment_lines_data = input.get("fulfillment_lines", [])

        if order_lines_data:
            cls.clean_lines(order_lines_data, cleaned_input)
        if fulfillment_lines_data:
            cls.clean_fulfillment_lines(
                fulfillment_lines_data,
                cleaned_input,
                whitelisted_statuses=[
                    FulfillmentStatus.FULFILLED,
                    FulfillmentStatus.RETURNED,
                    FulfillmentStatus.WAITING_FOR_APPROVAL,
                ],
            )
        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        cleaned_input = cls.clean_input(info, data.get("order"), data.get("input"))
        order = cleaned_input["order"]
        cls.check_channel_permissions(info, [order.channel_id])
        manager = get_plugin_manager_promise(info.context).get()
        try:
            app = get_app_promise(info.context).get()
            refund_fulfillment = create_refund_fulfillment(
                info.context.user,
                app,
                order,
                cleaned_input["payment"],
                cleaned_input.get("order_lines", []),
                cleaned_input.get("fulfillment_lines", []),
                manager,
                cleaned_input["amount_to_refund"],
                cleaned_input["include_shipping_costs"],
            )
        except PaymentError:
            cls.raise_error_for_payment_error()
        return cls(order=order, fulfillment=refund_fulfillment)


class OrderReturnLineInput(InputObjectType):
    order_line_id = graphene.ID(
        description="The ID of the order line to return.",
        name="orderLineId",
        required=True,
    )
    quantity = graphene.Int(
        description="The number of items to be returned.",
        required=True,
    )
    replace = graphene.Boolean(
        description="Determines, if the line should be added to replace order.",
        default_value=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderReturnFulfillmentLineInput(InputObjectType):
    fulfillment_line_id = graphene.ID(
        description="The ID of the fulfillment line to return.",
        name="fulfillmentLineId",
        required=True,
    )
    quantity = graphene.Int(
        description="The number of items to be returned.",
        required=True,
    )
    replace = graphene.Boolean(
        description="Determines, if the line should be added to replace order.",
        default_value=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class FulfillmentReturnProducts(
    relay.ClientIDMutation, FulfillmentRefundAndReturnProductBase
):
    return_fulfillment = graphene.Field(
        Fulfillment, description="A return fulfillment."
    )
    replace_fulfillment = graphene.Field(
        Fulfillment, description="A replace fulfillment."
    )
    order = graphene.Field(Order, description="Order which fulfillment was returned.")
    replace_order = graphene.Field(
        Order,
        description="A draft order which was created for products with replace flag.",
    )

    class Meta:
        description = "Return products."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    class Input:
        order = graphene.ID(
            description="ID of the order to be returned.", required=True
        )
        input = OrderReturnProductsInput(
            required=True,
            description="Fields required to return products.",
        )

    @classmethod
    def clean_input(cls, info: ResolveInfo, order_id, input):
        cleaned_input: Dict[str, Any] = {}
        amount_to_refund = input.get("amount_to_refund")
        include_shipping_costs = input["include_shipping_costs"]
        refund = input["refund"]

        qs = order_models.Order.objects.prefetch_related("payments")
        order = cls.get_node_or_error(
            info, order_id, field="order", only_type=Order, qs=qs
        )

        if refund:
            payment = order.get_last_payment()
            cls.clean_order_payment(payment, cleaned_input)
            charged_value = payment.captured_amount
            cls.clean_amount_to_refund(
                order, amount_to_refund, charged_value, cleaned_input
            )

        cleaned_input.update(
            {
                "include_shipping_costs": include_shipping_costs,
                "order": order,
                "refund": refund,
            }
        )

        order_lines_data = input.get("order_lines")
        fulfillment_lines_data = input.get("fulfillment_lines")

        if order_lines_data:
            cls.clean_lines(order_lines_data, cleaned_input)
        if fulfillment_lines_data:
            cls.clean_fulfillment_lines(
                fulfillment_lines_data,
                cleaned_input,
                whitelisted_statuses=[
                    FulfillmentStatus.FULFILLED,
                    FulfillmentStatus.REFUNDED,
                    FulfillmentStatus.WAITING_FOR_APPROVAL,
                ],
            )
        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        cleaned_input = cls.clean_input(info, data.get("order"), data.get("input"))
        order = cleaned_input["order"]
        cls.check_channel_permissions(info, [order.channel_id])
        manager = get_plugin_manager_promise(info.context).get()

        try:
            app = get_app_promise(info.context).get()
            response = create_fulfillments_for_returned_products(
                info.context.user,
                app,
                order,
                cleaned_input.get("payment"),
                cleaned_input.get("order_lines", []),
                cleaned_input.get("fulfillment_lines", []),
                manager,
                cleaned_input["refund"],
                cleaned_input.get("amount_to_refund"),
                cleaned_input["include_shipping_costs"],
            )
        except PaymentError:
            cls.raise_error_for_payment_error()

        return_fulfillment, replace_fulfillment, replace_order = response
        return cls(
            order=order,
            return_fulfillment=return_fulfillment,
            replace_fulfillment=replace_fulfillment,
            replace_order=replace_order,
        )


class FulfillmentRefundProducts(
    relay.ClientIDMutation, FulfillmentRefundAndReturnProductBase
):
    fulfillment = graphene.Field(Fulfillment, description="A refunded fulfillment.")
    order = graphene.Field(Order, description="Order which fulfillment was refunded.")

    class Input:
        order = graphene.ID(
            description="ID of the order to be refunded.", required=True
        )
        input = OrderRefundProductsInput(
            required=True,
            description="Fields required to create a refund fulfillment.",
        )

    class Meta:
        description = "Refund products."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, order_id, input):
        cleaned_input: Dict[str, Any] = {}
        amount_to_refund = input.get("amount_to_refund")
        include_shipping_costs = input["include_shipping_costs"]

        qs = order_models.Order.objects.prefetch_related("payments")
        order = cls.get_node_or_error(
            info, order_id, field="order", only_type=Order, qs=qs
        )
        payment = order.get_last_payment()
        cls.clean_order_payment(payment, cleaned_input)
        charged_value = payment.captured_amount
        cls.clean_amount_to_refund(
            order, amount_to_refund, charged_value, cleaned_input
        )

        cleaned_input.update(
            {
                "include_shipping_costs": include_shipping_costs,
                "order": order,
                "payment": payment,
            }
        )

        order_lines_data = input.get("order_lines", [])
        fulfillment_lines_data = input.get("fulfillment_lines", [])

        if order_lines_data:
            cls.clean_lines(order_lines_data, cleaned_input)
        if fulfillment_lines_data:
            cls.clean_fulfillment_lines(
                fulfillment_lines_data,
                cleaned_input,
                whitelisted_statuses=[
                    FulfillmentStatus.FULFILLED,
                    FulfillmentStatus.RETURNED,
                    FulfillmentStatus.WAITING_FOR_APPROVAL,
                ],
            )
        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        cleaned_input = cls.clean_input(info, data.get("order"), data.get("input"))
        order = cleaned_input["order"]
        cls.check_channel_permissions(info, [order.channel_id])
        manager = get_plugin_manager_promise(info.context).get()
        try:
            app = get_app_promise(info.context).get()
            refund_fulfillment = create_refund_fulfillment(
                info.context.user,
                app,
                order,
                cleaned_input["payment"],
                cleaned_input.get("order_lines", []),
                cleaned_input.get("fulfillment_lines", []),
                manager,
                cleaned_input["amount_to_refund"],
                cleaned_input["include_shipping_costs"],
            )
        except PaymentError:
            cls.raise_error_for_payment_error()
        return cls(order=order, fulfillment=refund_fulfillment)


class FulfillmentUpdateTracking(relay.ClientIDMutation):
    fulfillment = graphene.Field(
        Fulfillment, description="A fulfillment with updated tracking."
    )
    order = graphene.Field(
        Order, description="Order for which fulfillment was updated."
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a fulfillment to update.")
        input = FulfillmentUpdateTrackingInput(
            required=True, description="Fields required to update a fulfillment."
        )

    class Meta:
        description = "Updates a fulfillment for an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        user = info.context.user
        user = cast(User, user)
        fulfillment = cls.get_node_or_error(info, data.get("id"), only_type=Fulfillment)

        order = fulfillment.order
        cls.check_channel_permissions(info, [order.channel_id])

        tracking_number = data.get("input").get("tracking_number") or ""
        fulfillment.tracking_number = tracking_number
        fulfillment.save()

        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        fulfillment_tracking_updated(fulfillment, user, app, tracking_number, manager)

        notify_customer = data.get("input").get("notify_customer")
        if notify_customer:
            send_fulfillment_update(order, fulfillment, manager)

        return FulfillmentUpdateTracking(fulfillment=fulfillment, order=order)


OrderNoteAddErrorCode = graphene.Enum.from_enum(error_codes.OrderNoteAddErrorCode)
OrderNoteAddErrorCode.doc_category = DOC_CATEGORY_ORDERS


class OrderNoteAddError(Error):
    code = OrderNoteAddErrorCode(description="The error code.", required=False)

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderNoteAdd(OrderNoteCommon):
    order = graphene.Field(Order, description="Order with the note added.")
    event = graphene.Field(OrderEvent, description="Order note created.")

    class Arguments(OrderNoteCommon.Arguments):
        id = graphene.ID(
            required=True,
            description="ID of the order to add a note for.",
            name="order",
        )

    class Meta:
        description = "Adds note to the order." + ADDED_IN_315 + PREVIEW_FEATURE
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderNoteAddError

    @classmethod
    def perform_mutation(  # type: ignore[override]
        cls, _root, info: ResolveInfo, /, *, id: str, input
    ):
        order = cls.get_node_or_error(info, id, only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cleaned_input = cls.clean_input(info, order, input)
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        with transaction.atomic():
            event = events.order_note_added_event(
                order=order,
                user=info.context.user,
                app=app,
                message=cleaned_input["message"],
            )
            call_event_by_order_status(order, manager)
        return OrderNoteAdd(order=order, event=event)


class OrderAddNoteInput(InputObjectType):
    message = graphene.String(
        description="Note message.", name="message", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderAddNote(relay.ClientIDMutation):
    order = graphene.Field(Order, description="Order with the note added.")
    event = graphene.Field(OrderEvent, description="Order note created.")

    class Input:
        id = graphene.ID(
            required=True,
            description="ID of the order to add a note for.",
            name="order",
        )
        input = OrderAddNoteInput(
            required=True, description="Fields required to create a note for the order."
        )

    class Meta:
        description = "Adds note to the order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, _info, _instance, data):
        try:
            cleaned_input = validate_required_string_field(data, "message")
        except ValidationError:
            raise ValidationError(
                {
                    "message": ValidationError(
                        "Message can't be empty.",
                        code=OrderErrorCode.REQUIRED.value,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        order = cls.get_node_or_error(info, data.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cleaned_input = cls.clean_input(info, order, data.get("input"))

        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()

        with traced_atomic_transaction():
            event = events.order_note_added_event(
                order=order,
                user=info.context.user,
                app=app,
                message=cleaned_input["message"],
            )
            func = get_webhook_handler_by_order_status(order.status, manager)
            cls.call_event(func, order)

        return OrderAddNote(order=order, event=event)


def clean_order_cancel(order: Optional[models.Order]) -> models.Order:
    if not order or not order.can_cancel():
        raise ValidationError(
            {
                "order": ValidationError(
                    "This order can't be canceled.",
                    code=OrderErrorCode.CANNOT_CANCEL_ORDER.value,
                )
            }
        )
    return order


class OrderCancel(relay.ClientIDMutation):
    order = graphene.Field(Order, description="Canceled order.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to cancel.")

    class Meta:
        description = "Cancel an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        order = cls.get_node_or_error(info, data.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        order = clean_order_cancel(order)

        user = info.context.user
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()

        with traced_atomic_transaction():
            cancel_order(
                order=order,
                user=user,
                app=app,
                manager=manager,
            )
            deactivate_order_gift_cards(order.id, user, app)

        return OrderCancel(order=order)


def clean_order_capture(
    payment: Optional[payment_models.Payment],
) -> payment_models.Payment:
    payment = clean_payment(payment)
    if not payment.is_active:
        raise ValidationError(
            {
                "payment": ValidationError(
                    "Only pre-authorized payments can be captured",
                    code=OrderErrorCode.CAPTURE_INACTIVE_PAYMENT.value,
                )
            }
        )
    return payment


class OrderCapture(relay.ClientIDMutation):
    order = graphene.Field(Order, description="Captured order.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to capture.")
        amount = PositiveDecimal(
            required=True, description="Amount of money to capture."
        )

    class Meta:
        description = "Capture an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        amount = data.get("amount")
        if amount <= 0:
            raise ValidationError(
                {
                    "amount": ValidationError(
                        "Amount should be a positive number.",
                        code=OrderErrorCode.ZERO_QUANTITY.value,
                    )
                }
            )

        order = cls.get_node_or_error(info, data.get("id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])

        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        order_info = fetch_order_info(order)
        payment = order_info.payment
        payment = clean_order_capture(payment)

        transaction = try_payment_action(
            order,
            info.context.user,
            app,
            payment,
            gateway.capture,
            payment,
            manager,
            amount=amount,
            channel_slug=order.channel.slug,
        )

        payment.refresh_from_db()
        if transaction.kind == TransactionKind.CAPTURE:
            site = get_site_promise(info.context).get()
            order_charged(
                order_info,
                info.context.user,
                app,
                amount,
                payment,
                manager,
                site.settings,
            )

        return OrderCapture(order=order)


class OrderConfirm(relay.ClientIDMutation):
    order = graphene.Field(Order, description="Order which has been confirmed.")

    class Input:
        id = graphene.ID(description="ID of an order to confirm.", required=True)

    class Meta:
        description = "Confirms an unconfirmed order by changing status to unfulfilled."
        model = models.Order
        object_type = Order
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def get_instance(cls, info: ResolveInfo, **data):
        instance = super().get_instance(info, **data)
        if not instance.is_unconfirmed():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Provided order id belongs to an order with status "
                        "different than unconfirmed.",
                        code=OrderErrorCode.INVALID.value,
                    )
                }
            )
        if not instance.lines.exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Provided order id belongs to an order without products.",
                        code=OrderErrorCode.INVALID.value,
                    )
                }
            )
        return instance

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        user = cast(User, info.context.user)
        order = cls.get_instance(info, **data)
        cls.check_channel_permissions(info, [order.channel_id])

        order.status = OrderStatus.UNFULFILLED
        update_order_display_gross_prices(order)
        order.save(update_fields=["status", "updated_at", "display_gross_prices"])

        order_info = fetch_order_info(order)
        payment = order_info.payment
        manager = get_plugin_manager_promise(info.context).get()
        app = get_app_promise(info.context).get()

        with traced_atomic_transaction():
            if payment and payment.is_authorized and payment.can_capture():
                authorized_payment = payment
                gateway.capture(payment, manager, channel_slug=order.channel.slug)
                site = get_site_promise(info.context).get()
                transaction.on_commit(
                    lambda: order_charged(
                        order_info,
                        user,
                        app,
                        authorized_payment.total,
                        authorized_payment,
                        manager,
                        site.settings,
                    )
                )
            transaction.on_commit(
                lambda: order_confirmed(
                    order,
                    user,
                    app,
                    manager,
                    send_confirmation_email=True,
                )
            )

        return OrderConfirm(order=order)


class OrderDiscountAdd(relay.ClientIDMutation, OrderDiscountCommon):
    order = graphene.Field(Order, description="Order which has been discounted.")

    class Input:
        order_id = graphene.ID(description="ID of an order to discount.", required=True)
        input = OrderDiscountCommonInput(
            required=True,
            description="Fields required to create a discount for the order.",
        )

    class Meta:
        description = "Adds discount to the order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def validate_order(cls, info: ResolveInfo, order):
        order = super().validate_order(info, order)
        order_discounts = get_order_discounts(order)

        if len(order_discounts) >= 1:
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Order already has assigned discount.",
                        code=OrderErrorCode.CANNOT_DISCOUNT.value,
                    )
                }
            )
        return order

    @classmethod
    def validate(cls, info: ResolveInfo, order, input):
        cls.validate_order(info, order)
        cls.validate_order_discount_input(order.undiscounted_total.gross, input)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        manager = get_plugin_manager_promise(info.context).get()
        order = cls.get_node_or_error(info, input.get("order_id"), only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate(info, order, input)

        reason = input.get("reason")
        value_type = input.get("value_type")
        value = input.get("value")
        app = get_app_promise(info.context).get()

        with traced_atomic_transaction():
            order_discount = create_order_discount_for_order(
                order, reason, value_type, value
            )
            order, _ = fetch_order_prices_if_expired(order, manager, force_update=True)
            order_discount.refresh_from_db()

            events.order_discount_added_event(
                order=order,
                user=info.context.user,
                app=app,
                order_discount=order_discount,
            )

        return OrderDiscountAdd(order=order)


class OrderDiscountCommonInput(InputObjectType):
    value_type = graphene.Field(
        DiscountValueTypeEnum,
        required=True,
        description="Type of the discount: fixed or percent",
    )
    value = PositiveDecimal(
        required=True,
        description="Value of the discount. Can store fixed value or percent value",
    )
    reason = graphene.String(
        required=False, description="Explanation for the applied discount."
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderDiscountCommon(relay.ClientIDMutation):
    class Meta:
        abstract = True

    @classmethod
    def validate_order(cls, _info: ResolveInfo, order: models.Order) -> models.Order:
        if not (order.is_draft() or order.is_unconfirmed()):
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Only draft and unconfirmed orders can be modified.",
                        code=OrderErrorCode.CANNOT_DISCOUNT.value,
                    )
                }
            )
        return order

    @classmethod
    def _validation_error_for_input_value(
        cls, error_msg, code=OrderErrorCode.INVALID.value
    ):
        return ValidationError({"value": ValidationError(error_msg, code=code)})

    @classmethod
    def validate_order_discount_input(cls, max_total: Money, input: dict):
        value_type = input["value_type"]
        value = input["value"]

        if value_type == DiscountValueTypeEnum.FIXED:
            if value > max_total.amount:
                error_msg = (
                    f"The value ({value}) cannot be higher than {max_total.amount} "
                    f"{max_total.currency}"
                )
                raise cls._validation_error_for_input_value(error_msg)
        elif value > 100:
            error_msg = f"The percentage value ({value}) cannot be higher than 100."
            raise cls._validation_error_for_input_value(error_msg)


class OrderDiscountDelete(relay.ClientIDMutation, OrderDiscountCommon):
    order = graphene.Field(Order, description="Order which has removed discount.")

    class Input:
        discount_id = graphene.ID(
            description="ID of a discount to remove.", required=True
        )

    class Meta:
        description = "Remove discount from the order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_discount = cls.get_node_or_error(
            info, input.get("discount_id"), only_type=OrderDiscount
        )
        order = order_discount.order

        if not order:
            raise ValidationError(
                {
                    "discountId": ValidationError(
                        "Discount doesn't belong to any order.",
                        code=OrderErrorCode.NOT_FOUND.value,
                    )
                }
            )

        cls.check_channel_permissions(info, [order.channel_id])
        app = get_app_promise(info.context).get()
        order = cls.validate_order(info, order)

        with traced_atomic_transaction():
            remove_order_discount_from_order(order, order_discount)
            events.order_discount_deleted_event(
                order=order,
                user=info.context.user,
                app=app,
                order_discount=order_discount,
            )

            order.refresh_from_db()
            update_order_search_vector(order, save=False)
            invalidate_order_prices(order)
            order.save(
                update_fields=["should_refresh_prices", "search_vector", "updated_at"]
            )

        return OrderDiscountDelete(order=order)


class OrderDiscountUpdate(relay.ClientIDMutation, OrderDiscountCommon):
    order = graphene.Field(Order, description="Order which has been discounted.")

    class Input:
        discount_id = graphene.ID(
            description="ID of a discount to update.", required=True
        )
        input = OrderDiscountCommonInput(
            required=True,
            description="Fields required to update a discount for the order.",
        )

    class Meta:
        description = "Update discount for the order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def validate(cls, info: ResolveInfo, order: models.Order, order_discount, input):
        cls.validate_order(info, order)
        input["value"] = input.get("value") or order_discount.value
        input["value_type"] = input.get("value_type") or order_discount.value_type

        cls.validate_order_discount_input(order.undiscounted_total.gross, input)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        manager = get_plugin_manager_promise(info.context).get()
        order_discount = cls.get_node_or_error(
            info, input.get("discount_id"), only_type=OrderDiscount
        )
        order = order_discount.order

        if not order:
            raise ValidationError(
                {
                    "discountId": ValidationError(
                        "Discount doesn't belong to any order.",
                        code=OrderErrorCode.NOT_FOUND.value,
                    )
                }
            )

        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate(info, order, order_discount, input)

        reason = input.get("reason", order_discount.reason)
        value_type = input.get("value_type", order_discount.value_type)
        value = input.get("value", order_discount.value)

        order_discount_before_update = copy.deepcopy(order_discount)

        with traced_atomic_transaction():
            order_discount.reason = reason
            order_discount.value = value
            order_discount.value_type = value_type
            order_discount.save()

            if (
                order_discount_before_update.value_type != value_type
                or order_discount_before_update.value != value
            ):
                fetch_order_prices_if_expired(order, manager, force_update=True)
                order_discount.refresh_from_db()

                app = get_app_promise(info.context).get()
                events.order_discount_updated_event(
                    order=order,
                    user=info.context.user,
                    app=app,
                    order_discount=order_discount,
                    old_order_discount=order_discount_before_update,
                )

        return OrderDiscountUpdate(order=order)


class OrderFulfillStockInput(InputObjectType):
    quantity = graphene.Int(
        description="The number of line items to be fulfilled from given warehouse.",
        required=True,
    )
    warehouse = graphene.ID(
        description="ID of the warehouse from which the item will be fulfilled.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderFulfillLineInput(InputObjectType):
    order_line_id = graphene.ID(
        description="The ID of the order line.", name="orderLineId"
    )
    stocks = NonNullList(
        OrderFulfillStockInput,
        required=True,
        description="List of stock items to create.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderFulfillInput(InputObjectType):
    lines = NonNullList(
        OrderFulfillLineInput,
        required=True,
        description="List of items informing how to fulfill the order.",
    )
    notify_customer = graphene.Boolean(
        description="If true, send an email notification to the customer."
    )

    allow_stock_to_be_exceeded = graphene.Boolean(
        description="If true, then allow proceed fulfillment when stock is exceeded.",
        default_value=False,
    )
    tracking_number = graphene.String(
        description="Fulfillment tracking number." + ADDED_IN_36,
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class FulfillmentUpdateTrackingInput(InputObjectType):
    tracking_number = graphene.String(description="Fulfillment tracking number.")
    notify_customer = graphene.Boolean(
        default_value=False,
        description="If true, send an email notification to the customer.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderFulfill(relay.ClientIDMutation):
    fulfillments = NonNullList(Fulfillment, description="List of created fulfillments.")
    order = graphene.Field(Order, description="Fulfilled order.")

    class Input:
        order_id = graphene.ID(
            description="ID of the order to be fulfilled.", name="order"
        )
        input_data = OrderFulfillInput(
            required=True, description="Fields required to create a fulfillment."
        )

    class Meta:
        description = "Creates new fulfillments for an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_lines(cls, order_lines, quantities_for_lines):
        for order_line, line_quantities in zip(order_lines, quantities_for_lines):
            line_total_quantity = sum(line_quantities)
            line_quantity_unfulfilled = order_line.quantity_unfulfilled

            if line_total_quantity > line_quantity_unfulfilled:
                msg = (
                    "Only %(quantity)d item%(item_pluralize)s remaining to fulfill."
                ) % {
                    "quantity": line_quantity_unfulfilled,
                    "item_pluralize": pluralize(line_quantity_unfulfilled),
                }
                order_line_global_id = graphene.Node.to_global_id(
                    "OrderLine", order_line.pk
                )
                raise ValidationError(
                    {
                        "order_line_id": ValidationError(
                            msg,
                            code=OrderErrorCode.FULFILL_ORDER_LINE.value,
                            params={"order_lines": [order_line_global_id]},
                        )
                    }
                )

    @classmethod
    def check_warehouses_for_duplicates(cls, warehouse_ids):
        for warehouse_ids_for_line in warehouse_ids:
            duplicates = get_duplicated_values(warehouse_ids_for_line)
            if duplicates:
                raise ValidationError(
                    {
                        "warehouse": ValidationError(
                            "Duplicated warehouse ID.",
                            code=OrderErrorCode.DUPLICATED_INPUT_ITEM.value,
                            params={"warehouse": duplicates.pop()},
                        )
                    }
                )

    @classmethod
    def check_lines_for_duplicates(cls, lines_ids):
        duplicates = get_duplicated_values(lines_ids)
        if duplicates:
            raise ValidationError(
                {
                    "orderLineId": ValidationError(
                        "Duplicated order line ID.",
                        code=OrderErrorCode.DUPLICATED_INPUT_ITEM.value,
                        params={"order_lines": [duplicates.pop()]},
                    )
                }
            )

    @classmethod
    def check_lines_for_preorder(cls, order_lines):
        for order_line in order_lines:
            if order_line.variant_id and order_line.variant.is_preorder_active():
                order_line_global_id = graphene.Node.to_global_id(
                    "OrderLine", order_line.pk
                )
                raise ValidationError(
                    {
                        "order_line_id": ValidationError(
                            "Cannot fulfill preorder variant.",
                            code=OrderErrorCode.FULFILL_ORDER_LINE.value,
                            params={"order_lines": [order_line_global_id]},
                        )
                    }
                )

    @classmethod
    def check_total_quantity_of_items(cls, quantities_for_lines: List[List[int]]):
        flat_quantities: List[int] = sum(quantities_for_lines, [])
        if sum(flat_quantities) <= 0:
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Total quantity must be larger than 0.",
                        code=OrderErrorCode.ZERO_QUANTITY.value,
                    )
                }
            )

    @classmethod
    def clean_input(cls, info: ResolveInfo, order, data, site):
        if not order.is_fully_paid() and (
            site.settings.fulfillment_auto_approve
            and not site.settings.fulfillment_allow_unpaid
        ):
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Cannot fulfill unpaid order.",
                        code=OrderErrorCode.CANNOT_FULFILL_UNPAID_ORDER.value,
                    )
                }
            )

        lines = data["lines"]

        warehouse_ids_for_lines = [
            [stock["warehouse"] for stock in line["stocks"]] for line in lines
        ]
        cls.check_warehouses_for_duplicates(warehouse_ids_for_lines)

        quantities_for_lines: List[List[int]] = [
            [stock["quantity"] for stock in line["stocks"]] for line in lines
        ]

        lines_ids = [line["order_line_id"] for line in lines]
        cls.check_lines_for_duplicates(lines_ids)
        order_lines = cls.get_nodes_or_error(
            lines_ids, field="lines", only_type=OrderLine
        )

        cls.clean_lines(order_lines, quantities_for_lines)

        if site.settings.fulfillment_auto_approve:
            cls.check_lines_for_preorder(order_lines)

        cls.check_total_quantity_of_items(quantities_for_lines)

        lines_for_warehouses: DefaultDict[UUID, List[OrderFulfillmentLineInfo]] = (
            defaultdict(list)
        )
        for line, order_line in zip(lines, order_lines):
            for stock in line["stocks"]:
                if stock["quantity"] > 0:
                    warehouse_pk = UUID(
                        cls.get_global_id_or_error(
                            stock["warehouse"], only_type=Warehouse, field="warehouse"
                        )
                    )
                    lines_for_warehouses[warehouse_pk].append(
                        {"order_line": order_line, "quantity": stock["quantity"]}
                    )

        data["order_lines"] = order_lines
        data["lines_for_warehouses"] = lines_for_warehouses
        return data

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input["order_id"],
            field="order",
            only_type=Order,
            qs=order_models.Order.objects.prefetch_related("lines__variant"),
        )
        if not order:
            raise ValidationError(
                "Order does not exist.", code=OrderErrorCode.NOT_FOUND.value
            )
        cls.check_channel_permissions(info, [order.channel_id])
        site = get_site_promise(info.context).get()
        cleaned_input = cls.clean_input(info, order, input, site=site)

        context = info.context
        user = context.user
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        lines_for_warehouses = cleaned_input["lines_for_warehouses"]
        notify_customer = cleaned_input.get("notify_customer", True)
        allow_stock_to_be_exceeded = cleaned_input.get(
            "allow_stock_to_be_exceeded", False
        )
        approved = site.settings.fulfillment_auto_approve
        tracking_number = cleaned_input.get("tracking_number", "")
        try:
            fulfillments = create_fulfillments(
                user,
                app,
                order,
                dict(lines_for_warehouses),
                manager,
                site.settings,
                notify_customer,
                allow_stock_to_be_exceeded=allow_stock_to_be_exceeded,
                approved=approved,
                tracking_number=tracking_number,
            )
        except InsufficientStock as exc:
            errors = prepare_insufficient_stock_order_validation_errors(exc)
            raise ValidationError({"stocks": errors})

        return OrderFulfill(fulfillments=fulfillments, order=order)


class OrderGrantRefundCreateError(Error):
    code = OrderGrantRefundCreateErrorCode(description="The error code.", required=True)

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderGrantRefundCreateInput(BaseInputObjectType):
    amount = Decimal(required=True, description="Amount of the granted refund.")
    reason = graphene.String(description="Reason of the granted refund.")

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderGrantRefundCreate(relay.ClientIDMutation):
    order = graphene.Field(
        Order, description="Order which has assigned new grant refund."
    )
    granted_refund = graphene.Field(
        OrderGrantedRefund, description="Created granted refund."
    )

    class Input:
        order_id = graphene.ID(description="ID of the order.", required=True)
        input_data = OrderGrantRefundCreateInput(
            required=True,
            description="Fields required to create a granted refund for the order.",
        )

    class Meta:
        description = (
            "Adds granted refund to the order." + ADDED_IN_313 + PREVIEW_FEATURE
        )
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderGrantRefundCreateError
        doc_category = DOC_CATEGORY_ORDERS

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input["order_id"], only_type=Order)
        amount = input["input_data"]["amount"]
        reason = input["input_data"].get("reason", "")
        granted_refund = order.granted_refunds.create(
            amount_value=amount,
            currency=order.currency,
            reason=reason,
            user=info.context.user,
            app=info.context.app,
        )
        return cls(order=order, granted_refund=granted_refund)


class OrderGrantRefundUpdateError(Error):
    code = OrderGrantRefundUpdateErrorCode(description="The error code.", required=True)

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderGrantRefundUpdateInput(InputObjectType):
    amount = Decimal(description="Amount of the granted refund.")
    reason = graphene.String(description="Reason of the granted refund.")

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderGrantRefundUpdate(relay.ClientIDMutation):
    order = graphene.Field(
        Order, description="Order which has assigned updated grant refund."
    )
    granted_refund = graphene.Field(
        OrderGrantedRefund, description="Created granted refund."
    )

    class Input:
        id = graphene.ID(description="ID of the granted refund.", required=True)
        input = OrderGrantRefundUpdateInput(
            required=True,
            description="Fields required to update a granted refund.",
        )

    class Meta:
        description = "Updates granted refund." + ADDED_IN_313 + PREVIEW_FEATURE
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderGrantRefundUpdateError
        model = models.OrderGrantedRefund
        object_type = OrderGrantedRefund
        doc_category = DOC_CATEGORY_ORDERS

    @classmethod
    def validate_input(cls, amount, reason):
        if not amount and not reason:
            error_msg = (
                "At least amount or reason need to be provided to process update."
            )
            raise ValidationError(
                {
                    "input": ValidationError(
                        error_msg, code=OrderGrantRefundUpdateErrorCode.REQUIRED.value
                    )
                }
            )

    @classmethod
    def success_response(cls, instance):
        return cls(order=instance.order, granted_refund=instance)

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        cleaned_input = super().clean_input(info, instance, data, input_cls=input_cls)
        amount = cleaned_input.pop("amount", None)
        cls.validate_input(amount, data.get("reason"))
        if amount is not None:
            cleaned_input["amount_value"] = amount
        return cleaned_input


class OrderLineDelete(
    relay.ClientIDMutation, EditableOrderValidationMixin, BaseMutation
):
    order = graphene.Field(Order, description="A related order.")
    order_line = graphene.Field(
        OrderLine, description="An order line that was deleted."
    )

    class Input:
        id = graphene.ID(description="ID of the order line to delete.", required=True)

    class Meta:
        description = "Deletes an order line from an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        manager = get_plugin_manager_promise(info.context).get()
        line = cls.get_node_or_error(
            info,
            id,
            only_type=OrderLine,
        )
        order = line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(line.order)

        db_id = line.id
        warehouse_pk = (
            line.allocations.first().stock.warehouse.pk
            if order.is_unconfirmed()
            else None
        )
        with traced_atomic_transaction():
            line_info = OrderLineInfo(
                line=line,
                quantity=line.quantity,
                variant=line.variant,
                warehouse_pk=warehouse_pk,
            )
            delete_order_line(line_info, manager)
            line.id = db_id

            updated_fields = []
            if not order.is_shipping_required():
                order.shipping_method = None
                order.shipping_price = zero_taxed_money(order.currency)
                order.shipping_method_name = None
                updated_fields = [
                    "currency",
                    "shipping_method",
                    "shipping_price_net_amount",
                    "shipping_price_gross_amount",
                    "shipping_method_name",
                    "updated_at",
                ]
            # Create the removal event
            app = get_app_promise(info.context).get()
            events.order_removed_products_event(
                order=order,
                user=info.context.user,
                app=app,
                order_lines=[line],
            )

            invalidate_order_prices(order)
            recalculate_order_weight(order)
            update_order_search_vector(order, save=False)
            updated_fields.extend(
                ["should_refresh_prices", "weight", "search_vector", "updated_at"]
            )
            order.save(update_fields=updated_fields)
            func = get_webhook_handler_by_order_status(order.status, manager)
            cls.call_event(func, order)
        return OrderLineDelete(order=order, order_line=line)


class OrderLineDiscountRemove(relay.ClientIDMutation, OrderDiscountCommon):
    order_line = graphene.Field(
        OrderLine, description="Order line which has removed discount."
    )
    order = graphene.Field(
        Order, description="Order which is related to line which has removed discount."
    )

    class Input:
        order_line_id = graphene.ID(
            description="ID of a order line to remove its discount", required=True
        )

    class Meta:
        description = "Remove discount applied to the order line."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def validate(cls, info: ResolveInfo, order):
        cls.validate_order(info, order)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_line = cls.get_node_or_error(info, order_line_id, only_type=OrderLine)
        order = order_line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate(info, order)
        with traced_atomic_transaction():
            remove_discount_from_order_line(order_line, order)
            app = get_app_promise(info.context).get()
            events.order_line_discount_removed_event(
                order=order,
                user=info.context.user,
                app=app,
                line=order_line,
            )

            invalidate_order_prices(order, save=True)
        return OrderLineDiscountRemove(order_line=order_line, order=order)


class OrderLineDiscountUpdate(relay.ClientIDMutation, OrderDiscountCommon):
    order_line = graphene.Field(
        OrderLine, description="Order line which has been discounted."
    )
    order = graphene.Field(
        Order, description="Order which is related to the discounted line."
    )

    class Input:
        order_line_id = graphene.ID(
            description="ID of a order line to update price", required=True
        )
        input = OrderDiscountCommonInput(
            required=True,
            description="Fields required to update price for the order line.",
        )

    class Meta:
        description = "Update discount for the order line."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def validate(cls, info: ResolveInfo, order, order_line, input):
        cls.validate_order(info, order)
        input["value"] = input.get("value") or order_line.unit_discount_value
        input["value_type"] = input.get("value_type") or order_line.unit_discount_type

        cls.validate_order_discount_input(
            order_line.undiscounted_unit_price.gross, input
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order_line = cls.get_node_or_error(info, order_line_id, only_type=OrderLine)
        order = order_line.order
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate(info, order, order_line, input)
        reason = input.get("reason")
        value_type = input.get("value_type")
        value = input.get("value")
        order_line_before_update = copy.deepcopy(order_line)
        app = get_app_promise(info.context).get()
        with traced_atomic_transaction():
            update_discount_for_order_line(
                order_line,
                order=order,
                reason=reason,
                value_type=value_type,
                value=value,
            )
            if (
                order_line_before_update.unit_discount_value != value
                or order_line_before_update.unit_discount_type != value_type
            ):
                # Create event only when we change type or value of the discount
                events.order_line_discount_updated_event(
                    order=order,
                    user=info.context.user,
                    app=app,
                    line=order_line,
                    line_before_update=order_line_before_update,
                )
                invalidate_order_prices(order, save=True)
        return OrderLineDiscountUpdate(order_line=order_line, order=order)


class OrderLineUpdate(
    relay.ClientIDMutation,
    EditableOrderValidationMixin,
    ModelWithRestrictedChannelAccessMutation,
):
    order = graphene.Field(Order, description="Related order.")

    class Input:
        id = graphene.ID(description="ID of the order line to update.", required=True)
        input = OrderLineInput(
            required=True, description="Fields required to update an order line."
        )

    class Meta:
        description = "Updates an order line of an order."
        model = models.OrderLine
        object_type = OrderLine
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        instance.old_quantity = instance.quantity
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        cls.validate_order(instance.order)

        quantity = data["quantity"]
        if quantity <= 0:
            raise ValidationError(
                {
                    "quantity": ValidationError(
                        "Ensure this value is greater than 0.",
                        code=OrderErrorCode.ZERO_QUANTITY.value,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def save(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        warehouse_pk = (
            instance.allocations.first().stock.warehouse.pk
            if instance.order.is_unconfirmed()
            else None
        )
        app = get_app_promise(info.context).get()
        with traced_atomic_transaction():
            line_info = OrderLineInfo(
                line=instance,
                quantity=instance.quantity,
                variant=instance.variant,
                warehouse_pk=warehouse_pk,
            )
            try:
                change_order_line_quantity(
                    info.context.user,
                    app,
                    line_info,
                    instance.old_quantity,
                    instance.quantity,
                    instance.order.channel,
                    manager,
                )
            except InsufficientStock:
                raise ValidationError(
                    "Cannot set new quantity because of insufficient stock.",
                    code=OrderErrorCode.INSUFFICIENT_STOCK.value,
                )
            invalidate_order_prices(instance.order)
            recalculate_order_weight(instance.order)
            instance.order.save(update_fields=["should_refresh_prices", "weight"])

            func = get_webhook_handler_by_order_status(instance.order.status, manager)
            cls.call_event(func, instance.order)

    @classmethod
    def success_response(cls, instance):
        response = super().success_response(instance)
        response.order = instance.order
        return response

    @classmethod
    def get_instance_channel_id(cls, instance, **data):
        """Retrieve the instance channel id for channel permission accessible check."""
        return instance.order.channel_id


class OrderLinesCreate(
    relay.ClientIDMutation, EditableOrderValidationMixin, BaseMutation
):
    order = graphene.Field(Order, description="Related order.")
    order_lines = NonNullList(OrderLine, description="List of added order lines.")

    class Input:
        id = graphene.ID(
            required=True, description="ID of the order to add the lines to."
        )
        input = NonNullList(
            OrderLineCreateInput,
            required=True,
            description="Fields required to add order lines.",
        )

    class Meta:
        description = "Create order lines for an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"
        errors_mapping = {"lines": "input", "channel": "input"}

    @classmethod
    def validate_lines(cls, info: ResolveInfo, data, existing_lines_info):
        grouped_lines_data: List[OrderLineData] = []
        lines_data_map: Dict[str, OrderLineData] = defaultdict(OrderLineData)

        variants_from_existing_lines = [
            line_info.line.variant_id for line_info in existing_lines_info
        ]

        invalid_ids = []
        for input_line in data:
            variant_id: str = input_line["variant_id"]
            force_new_line = input_line["force_new_line"]
            variant = cls.get_node_or_error(
                info, variant_id, field="variant_id", only_type=ProductVariant
            )
            quantity = input_line["quantity"]

            custom_price = input_line.get("price")
            if quantity > 0:
                if force_new_line or variants_from_existing_lines.count(variant.pk) > 1:
                    grouped_lines_data.append(
                        OrderLineData(
                            variant_id=str(variant.id),
                            variant=variant,
                            quantity=quantity,
                            price_override=custom_price,
                        )
                    )
                else:
                    line_id = cls._find_line_id_for_variant_if_exist(
                        variant.pk, existing_lines_info
                    )

                    if line_id:
                        line_data = lines_data_map[line_id]
                        line_data.line_id = line_id
                    else:
                        line_data = lines_data_map[str(variant.id)]
                        line_data.variant_id = str(variant.id)

                    line_data.variant = variant
                    line_data.quantity += quantity
                    line_data.price_override = custom_price
            else:
                invalid_ids.append(variant_id)
        if invalid_ids:
            raise ValidationError(
                {
                    "quantity": ValidationError(
                        "Variants quantity must be greater than 0.",
                        code=OrderErrorCode.ZERO_QUANTITY.value,
                        params={"variants": invalid_ids},
                    ),
                }
            )

        grouped_lines_data += list(lines_data_map.values())
        return grouped_lines_data

    @classmethod
    def validate_variants(cls, order, variants):
        try:
            channel = order.channel
            validate_product_is_published_in_channel(variants, channel)
            validate_variant_channel_listings(variants, channel)
        except ValidationError as error:
            cls.remap_error_fields(error, cls._meta.errors_mapping)
            raise ValidationError(error)

    @staticmethod
    def add_lines_to_order(order, lines_data, user, app, manager, discounts):
        added_lines: List[OrderLine] = []
        try:
            for line_data in lines_data:
                line = add_variant_to_order(
                    order,
                    line_data,
                    user,
                    app,
                    manager,
                    discounts=discounts,
                    allocate_stock=order.is_unconfirmed(),
                )
                added_lines.append(line)
        except TaxError as tax_error:
            raise ValidationError(
                f"Unable to calculate taxes - {str(tax_error)}",
                code=OrderErrorCode.TAX_ERROR.value,
            )
        return added_lines

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, id, only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)
        existing_lines_info = fetch_order_lines(order)

        lines_to_add = cls.validate_lines(info, input, existing_lines_info)
        variants = [line.variant for line in lines_to_add]
        cls.validate_variants(order, variants)
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        discounts = load_discounts(info.context)
        with traced_atomic_transaction():
            added_lines = cls.add_lines_to_order(
                order,
                lines_to_add,
                info.context.user,
                app,
                manager,
                discounts,
            )

            # Create the products added event
            events.order_added_products_event(
                order=order,
                user=info.context.user,
                app=app,
                order_lines=added_lines,
            )

            invalidate_order_prices(order)
            recalculate_order_weight(order)
            update_order_search_vector(order, save=False)
            order.save(
                update_fields=[
                    "should_refresh_prices",
                    "weight",
                    "search_vector",
                    "updated_at",
                ]
            )
            func = get_webhook_handler_by_order_status(order.status, manager)
            cls.call_event(func, order)

        return OrderLinesCreate(order=order, order_lines=added_lines)

    @classmethod
    def _find_line_id_for_variant_if_exist(cls, variant_id, lines_info):
        """Return line id by using provided variantId parameter."""
        if not lines_info:
            return

        line_info = list(
            filter(
                lambda x: (x.variant and x.variant.pk == int(variant_id)), lines_info
            )
        )

        if not line_info or len(line_info) > 1:
            return

        return str(line_info[0].line.id)


class OrderMarkAsPaid(relay.ClientIDMutation, BaseMutation):
    order = graphene.Field(Order, description="Order marked as paid.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to mark paid.")
        transaction_reference = graphene.String(
            required=False, description="The external transaction reference."
        )

    class Meta:
        description = "Mark order as manually paid."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_billing_address(cls, instance):
        if not instance.billing_address:
            raise ValidationError(
                "Order billing address is required to mark order as paid.",
                code=OrderErrorCode.BILLING_ADDRESS_NOT_SET.value,
            )

    @classmethod
    def handle_mark_as_paid_for_payment(
        cls,
        order: "order_models.Order",
        request_user: User,
        app: Optional["App"],
        manager: "PluginsManager",
        external_reference: Optional[str] = None,
    ):
        try_payment_action(
            order, request_user, app, None, clean_mark_as_paid_order_payment
        )
        events.order_marked_as_paid_event(
            order=order,
            user=request_user,
            app=app,
            transaction_reference=external_reference,
        )
        return order

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(info, input["id"], only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        cls.clean_billing_address(order)

        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        order = cls.handle_mark_as_paid_for_payment(
            order,
            info.context.user,
            app,
            manager,
            input.get("transaction_reference"),
        )

        return OrderMarkAsPaid(order=order)


def clean_refund_payment(
    payment: Optional[payment_models.Payment],
) -> payment_models.Payment:
    payment = clean_payment(payment)
    if not payment.can_refund():
        raise ValidationError(
            {
                "payment": ValidationError(
                    "Payment cannot be refunded.",
                    code=OrderErrorCode.CANNOT_REFUND.value,
                )
            }
        )
    return payment


def clean_order_refund(order: models.Order) -> models.Order:
    if order_has_gift_card_lines(order):
        raise ValidationError(
            {
                "id": ValidationError(
                    "Cannot refund order with gift card lines.",
                    code=OrderErrorCode.CANNOT_REFUND.value,
                )
            }
        )
    return order


class OrderRefund(relay.ClientIDMutation):
    order = graphene.Field(Order, description="A refunded order.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to refund.")
        amount = PositiveDecimal(
            required=True, description="Amount of money to refund."
        )

    class Meta:
        description = "Refund an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        amount = input.get("amount")

        if amount <= 0:
            raise ValidationError(
                {
                    "amount": ValidationError(
                        "Amount should be a positive number.",
                        code=OrderErrorCode.ZERO_QUANTITY.value,
                    )
                }
            )

        order = cls.get_node_or_error(info, input["id"], only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        order = clean_order_refund(order)
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        payment = order.get_last_payment()
        payment = clean_payment(payment)
        payment = clean_refund_payment(payment)

        transaction = try_payment_action(
            order,
            info.context.user,
            app,
            payment,
            gateway.refund,
            payment,
            manager,
            amount=amount,
            channel_slug=order.channel.slug,
        )

        # Confirm that we changed the status to refund.
        if transaction.kind == TransactionKind.REFUND:
            payment.refresh_from_db()
            order_refunded(order, info.context.user, app, amount, payment, manager)

        order.fulfillments.create(
            status=FulfillmentStatus.REFUNDED, total_refund_amount=amount
        )
        return OrderRefund(order=order)


class OrderUpdateShippingInput(InputObjectType):
    shipping_method = graphene.ID(
        description="ID of the selected shipping method, pass null to remove currently assigned shipping method.",
        name="shippingMethod",
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderUpdateShipping(
    relay.ClientIDMutation,
    EditableOrderValidationMixin,
    ShippingMethodUpdateMixin,
    BaseMutation,
):
    order = graphene.Field(Order, description="Order with updated shipping method.")

    class Input:
        id = graphene.ID(
            required=True,
            name="order",
            description="ID of the order to update a shipping method.",
        )
        input = OrderUpdateShippingInput(
            description="Fields required to change shipping method of the order.",
            required=True,
        )

    class Meta:
        description = (
            "Updates a shipping method of the order."
            " Requires shipping method ID to update, when null is passed then currently assigned shipping method is removed."
        )
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        order = cls.get_node_or_error(
            info,
            input["id"],
            only_type=Order,
            qs=models.Order.objects.prefetch_related(
                "lines", "channel__shipping_method_listings"
            ),
        )
        cls.check_channel_permissions(info, [order.channel_id])
        cls.validate_order(order)

        shipping_method_id = input.get("input").shipping_method

        if shipping_method_id is None:
            if not order.is_draft() and order.is_shipping_required():
                raise ValidationError(
                    {
                        "shipping_method": ValidationError(
                            "Shipping method is required for this order.",
                            code=OrderErrorCode.SHIPPING_METHOD_REQUIRED.value,
                        )
                    }
                )

            cls.clear_shipping_method_from_order(order)
            order.save(update_fields=SHIPPING_METHOD_UPDATE_FIELDS)
            return OrderUpdateShipping(order=order)

        method: shipping_models.ShippingMethod = cls.get_node_or_error(
            info,
            shipping_method_id,
            field="shipping_method",
            only_type=ShippingMethod,
            qs=shipping_models.ShippingMethod.objects.prefetch_related(
                "postal_code_rules"
            ),
        )

        shipping_channel_listing = cls.validate_shipping_channel_listing(method, order)
        shipping_method_data = convert_to_shipping_method_data(
            method, shipping_channel_listing
        )
        manager = get_plugin_manager_promise(info.context).get()

        if order.status != OrderStatus.DRAFT:
            clean_order_update_shipping(order, shipping_method_data, manager)

        cls.update_shipping_method(order, method, shipping_channel_listing)
        cls._update_shipping_price(order, shipping_channel_listing)

        order.save(update_fields=SHIPPING_METHOD_UPDATE_FIELDS)
        cls.call_event(manager.order_updated, order)
        return OrderUpdateShipping(order=order)


class OrderUpdateInput(InputObjectType):
    """Input type for updating an order."""

    billing_address = AddressInput(description="Billing address of the customer.")
    user_email = graphene.String(description="Email address of the customer.")
    shipping_address = AddressInput(description="Shipping address of the customer.")
    external_reference = graphene.String(
        description="External ID of this order." + ADDED_IN_310, required=False
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class OrderUpdate(relay.ClientIDMutation, DraftOrderCreate, ModelWithExtRefMutation):
    """Mutation for updating an existing order."""

    class Input:
        id = graphene.ID(required=False, description="ID of an order to update.")
        external_reference = graphene.String(
            required=False,
            description=f"External ID of an order to update. {ADDED_IN_310}",
        )
        input = OrderUpdateInput(
            required=True, description="Fields required to update an order."
        )

    class Meta:
        description = "Updates an order."
        model = models.Order
        object_type = Order
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        """Clean the input data for the mutation.

        This method filters out fields that should not be included from the input data
        and returns a dictionary of cleaned input.
        """
        draft_order_cleaned_input = super().clean_input(info, instance, data, **kwargs)

        # Filter out fields added by DraftOrderUpdate
        editable_fields = [
            "billing_address",
            "shipping_address",
            "user_email",
            "external_reference",
        ]
        cleaned_input = {}
        for key in draft_order_cleaned_input:
            if key in editable_fields:
                cleaned_input[key] = draft_order_cleaned_input[key]
        return cleaned_input

    @classmethod
    def get_instance(cls, info: ResolveInfo, **data):
        """Retrieve the order instance to be updated.

        Raises a ValidationError if the provided order ID belongs to a draft order.
        """
        instance = super().get_instance(info, **data)
        if instance.status == OrderStatus.DRAFT:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Provided order id belongs to draft order. "
                        "Use `draftOrderUpdate` mutation instead.",
                        code=OrderErrorCode.INVALID.value,
                    )
                }
            )
        return instance

    @classmethod
    def should_invalidate_prices(cls, instance, cleaned_input, is_new_instance) -> bool:
        """Determine if the prices need to be invalidated based on input changes."""
        return any(
            cleaned_input.get(field) is not None
            for field in ["shipping_address", "billing_address"]
        )

    @classmethod
    def save(cls, info: ResolveInfo, instance, cleaned_input):
        """Save the updated order instance after applying changes.

        This method handles saving addresses, updating the user email,
        and invalidating order prices if necessary.
        """
        with traced_atomic_transaction():
            cls._save_addresses(instance, cleaned_input)
            if instance.user_email:
                user = User.objects.filter(email=instance.user_email).first()
                instance.user = user
            instance.search_vector = FlatConcatSearchVector(
                *prepare_order_search_vector_value(instance)
            )
            manager = get_plugin_manager_promise(info.context).get()
            if cls.should_invalidate_prices(instance, cleaned_input, False):
                invalidate_order_prices(instance)

            instance.save()
            cls.call_event(manager.order_updated, instance)


def clean_void_payment(
    payment: Optional[payment_models.Payment],
) -> payment_models.Payment:
    """Check for payment errors and validate if the payment can be voided.

    Raises ValidationError if the payment is not active.
    """
    payment = clean_payment(payment)
    if not payment.is_active:
        raise ValidationError(
            {
                "payment": ValidationError(
                    "Only pre-authorized payments can be voided",
                    code=OrderErrorCode.VOID_INACTIVE_PAYMENT.value,
                )
            }
        )
    return payment


class OrderVoid(relay.ClientIDMutation):
    """Mutation for voiding an order."""

    order = graphene.Field(Order, description="A voided order.")

    class Input:
        id = graphene.ID(required=True, description="ID of the order to void.")

    class Meta:
        description = "Void an order."
        doc_category = DOC_CATEGORY_ORDERS
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        """Handle the mutation for voiding an order.

        This method performs the void operation on the specified order,
        checking permissions and cleaning the payment.
        """
        order = cls.get_node_or_error(info, id, only_type=Order)
        cls.check_channel_permissions(info, [order.channel_id])
        app = get_app_promise(info.context).get()
        manager = get_plugin_manager_promise(info.context).get()
        payment = order.get_last_payment()
        payment = clean_void_payment(payment)
        transaction = try_payment_action(
            order,
            info.context.user,
            app,
            payment,
            gateway.void,
            payment,
            manager,
            channel_slug=order.channel.slug,
        )
        # Confirm that we changed the status to void. Some payment can receive
        # asynchronous webhook with update status
        if transaction.kind == TransactionKind.VOID:
            order_voided(
                order,
                info.context.user,
                app,
                payment,
                manager,
            )
        return OrderVoid(order=order)


class OrderMutations(graphene.ObjectType):
    draft_order_complete = DraftOrderComplete.Field()
    draft_order_create = DraftOrderCreate.Field()
    draft_order_delete = DraftOrderDelete.Field()
    draft_order_bulk_delete = DraftOrderBulkDelete.Field()
    draft_order_lines_bulk_delete = DraftOrderLinesBulkDelete.Field(
        deprecation_reason=DEPRECATED_IN_3X_FIELD
    )
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
    order_bulk_cancel = OrderBulkCancel.Field()
    order_bulk_create = OrderBulkCreate.Field()
