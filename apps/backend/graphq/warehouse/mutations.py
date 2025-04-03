from collections import defaultdict
from typing import List

import graphene
from django.core.exceptions import ValidationError
from django.db.models import F, Q
from graph.accounts.types import UserNode
from graph.blog.types import CommentNode, PostCategoryNode, PostNode
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from graphql_relay import from_global_id

from blog.models import Category, Comment, Post, PostView
from graphene_django_jwt.decorators import login_required

from ...channel import models as channel_models
from ...core.tracing import traced_atomic_transaction
from ...permission.enums import ProductPermissions
from ...warehouse import WarehouseClickAndCollectOption, models
from ...warehouse.error_codes import WarehouseErrorCode
from ...warehouse.validation import validate_warehouse_count
from ..account.i18n import I18nMixin
from ..core import ResolveInfo
from ..core.mutations import ModelDeleteMutation, ModelMutation
from ..core.types import NonNullList, WarehouseError
from ..core.validators import (
    validate_required_string_field,
    validate_slug_and_generate_if_needed,
)
from ..plugins.dataloaders import get_plugin_manager_promise
from ..shipping.types import ShippingZone
from .errors import StockError
from .models import ProductVariant, Stock, Warehouse
from .permissions import ProductPermissions
from .types import (
    ErrorPolicyEnum,
    StockResult,
    StockType,
    StockUpdateError,
    Warehouse,
    WarehouseCreateInput,
    WarehouseUpdateInput,
)
from .utils import get_plugin_manager_promise, validate_one_of_args_is_in_mutation

ADDRESS_FIELDS = [
    "street_address_1",
    "street_address_2",
    "city",
    "city_area",
    "postal_code",
    "country",
    "country_area",
    "phone",
]


class WarehouseMixin:
    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        cleaned_input = super().clean_input(  # type: ignore[misc] # mixin
            info, instance, data, **kwargs
        )
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = WarehouseErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        if "name" in cleaned_input:
            try:
                cleaned_input = validate_required_string_field(cleaned_input, "name")
            except ValidationError as error:
                error.code = WarehouseErrorCode.REQUIRED.value
                raise ValidationError({"name": error})

        # assigning shipping zones in the WarehouseCreate mutation is deprecated
        if cleaned_input.get("shipping_zones"):
            raise ValidationError(
                {
                    "shipping_zones": ValidationError(
                        "The shippingZone input field is deprecated. "
                        "Use WarehouseShippingZoneAssign mutation",
                        code=WarehouseErrorCode.INVALID.value,
                    )
                }
            )

        click_and_collect_option = cleaned_input.get(
            "click_and_collect_option", instance.click_and_collect_option
        )
        is_private = cleaned_input.get("is_private", instance.is_private)
        if (
            click_and_collect_option == WarehouseClickAndCollectOption.LOCAL_STOCK
            and is_private
        ):
            msg = "Local warehouse can be toggled only for non-private warehouse stocks"
            raise ValidationError(
                {
                    "click_and_collect_option": ValidationError(
                        msg, code=WarehouseErrorCode.INVALID.value
                    )
                },
            )
        return cleaned_input

    @classmethod
    def construct_instance(cls, instance, cleaned_data):
        cleaned_data["address"] = cls.prepare_address(cleaned_data, instance)  # type: ignore[attr-defined] # mixing # noqa: E501
        return super().construct_instance(instance, cleaned_data)  # type: ignore[misc] # mixing # noqa: E501


class WarehouseCreate(relay.ClientIDMutation, WarehouseMixin, I18nMixin):
    class Input:
        input = WarehouseCreateInput(
            required=True, description="Fields required to create a warehouse."
        )

    warehouse = graphene.Field(WarehouseNode, description="The created warehouse.")

    @classmethod
    def prepare_address(cls, cleaned_data):
        address_form = cls.validate_address_form(cleaned_data["address"])
        return address_form.save()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        # Extract and validate input data
        data = input.get("input")
        if not data:
            raise ValidationError("Input data is required to create a warehouse.")

        # Prepare address
        address = cls.prepare_address(data)
        data["address"] = address

        # Create the warehouse instance
        warehouse_instance = Warehouse.objects.create(**data)

        # Post-save action (e.g., trigger plugins or notifications)
        cls.post_save_action(info, warehouse_instance, data)

        return WarehouseCreate(warehouse=warehouse_instance)

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.warehouse_created, instance)


class WarehouseShippingZoneAssign(relay.ClientIDMutation, I18nMixin):

    class Input:
        id = graphene.ID(description="ID of the warehouse to update.", required=True)
        shipping_zone_ids = NonNullList(
            graphene.ID,
            required=True,
            description="List of shipping zone IDs to assign.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        warehouse = cls.get_node_or_error(info, input["id"], only_type=WarehouseNode)
        shipping_zones = cls.get_nodes_or_error(
            input["shipping_zone_ids"], "shipping_zone_id", only_type=ShippingZone
        )
        cls.clean_shipping_zones(warehouse, shipping_zones)
        warehouse.shipping_zones.add(*shipping_zones)
        return WarehouseShippingZoneAssign(warehouse=warehouse)


class WarehouseShippingZoneUnassign(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(description="ID of a warehouse to update.", required=True)
        shipping_zone_ids = graphene.List(
            graphene.NonNull(graphene.ID),
            required=True,
            description="List of shipping zone IDs to unassign.",
        )

    warehouse = graphene.Field(WarehouseNode, description="The updated warehouse.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        warehouse_id = input.get("id")
        shipping_zone_ids = input.get("shipping_zone_ids")

        # Validate warehouse ID and fetch warehouse instance
        warehouse = cls.get_node_or_error(info, warehouse_id, only_type=WarehouseNode)

        # Validate and fetch shipping zone instances
        shipping_zones = get_nodes_or_error(
            shipping_zone_ids, "shipping_zone_id", only_type=ShippingZone
        )

        # Unassign shipping zones from the warehouse
        warehouse.shipping_zones.remove(*shipping_zones)

        # Save changes
        warehouse.save()

        return WarehouseShippingZoneUnassign(warehouse=warehouse)

    @classmethod
    def get_node_or_error(cls, info, global_id, only_type):
        try:
            return resolve_by_global_id_or_ext_ref(global_id, only_type)
        except GraphQLError as e:
            raise ValidationError({"id": str(e)})

    @classmethod
    def get_nodes_or_error(cls, ids, field_name, only_type):
        try:
            return get_nodes_or_error(ids, field_name=field_name, only_type=only_type)
        except GraphQLError as e:
            raise ValidationError({field_name: str(e)})


class WarehouseUpdate(relay.ClientIDMutation, WarehouseMixin, I18nMixin):
    class Input:
        id = graphene.ID(description="ID of the warehouse to update.", required=True)
        input = WarehouseUpdateInput(
            required=True, description="Fields required to update a warehouse."
        )

    class Meta:
        description = "Updates an existing warehouse."
        model = Warehouse
        object_type = WarehouseNode
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = WarehouseError
        error_type_field = "warehouse_errors"

    warehouse = graphene.Field(WarehouseNode, description="The updated warehouse.")

    @classmethod
    def prepare_address(cls, cleaned_data, instance):
        address_data = cleaned_data.get("address")
        address = instance.address
        if address_data is None:
            return address
        address_form = cls.validate_address_form(address_data, instance=address)
        return address_form.save()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = input.get("input")
        warehouse_id = input.get("id")

        if not data or not warehouse_id:
            raise ValidationError(
                "Both 'id' and 'input' data are required to update a warehouse."
            )

        # Retrieve the warehouse instance
        try:
            warehouse = cls.get_node_or_error(
                info, warehouse_id, only_type=WarehouseNode
            )
        except GraphQLError as e:
            raise ValidationError(str(e))

        # Begin atomic transaction
        with transaction.atomic():
            # Prepare and save the address if provided
            if "address" in data:
                address = cls.prepare_address(data, instance=warehouse)
                data["address"] = address

            # Update warehouse fields
            for key, value in data.items():
                setattr(warehouse, key, value)

            warehouse.save()

            # Post-save action (e.g., trigger plugins or notifications)
            cls.post_save_action(info, warehouse, data)

        return WarehouseUpdate(warehouse=warehouse)

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.warehouse_updated, instance)


class WarehouseDelete(relay.ClientIDMutation, ModelDeleteMutation):

    class Input:
        id = graphene.ID(description="ID of the warehouse to delete.", required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        instance = cls.get_node_or_error(info, input["id"], only_type=WarehouseNode)
        address_id = instance.address_id
        address = instance.address

        db_id = instance.id
        with traced_atomic_transaction():
            instance.delete()
            instance.id = db_id
            address.id = address_id
            instance.address = address
            instance.is_object_deleted = True
            cls.post_save_action(info, instance, None)
        return cls.success_response(instance)

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.warehouse_deleted, instance)


class StockCreateInput(graphene.InputObjectType):
    warehouse_id = graphene.ID(required=True, description="ID of the warehouse.")
    product_variant_id = graphene.ID(
        required=True, description="ID of the product variant."
    )
    quantity = graphene.Int(required=True, description="Quantity of stock.")


class StockCreate(relay.ClientIDMutation):
    stock = graphene.Field(StockType, description="The newly created stock.")
    error = graphene.String(description="Error message if the operation fails.")

    class Input:
        input = StockCreateInput(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            # Decode IDs
            warehouse_id = graphene.Node.get_node_from_global_id(
                info, input["warehouse_id"], only_type="Warehouse"
            )
            product_variant_id = graphene.Node.get_node_from_global_id(
                info, input["product_variant_id"], only_type="ProductVariant"
            )

            # Create the stock instance
            stock = Stock.objects.create(
                warehouse=warehouse_id,
                product_variant=product_variant_id,
                quantity=input["quantity"],
            )
            return StockCreate(stock=stock)
        except (Warehouse.DoesNotExist, ProductVariant.DoesNotExist):
            return StockCreate(error="Warehouse or Product Variant does not exist.")
        except ValidationError as e:
            return StockCreate(error=str(e))


class StockUpdateInput(graphene.InputObjectType):
    variant_id = graphene.ID(required=False, description="ID of the product variant.")
    warehouse_id = graphene.ID(required=False, description="ID of the warehouse.")
    quantity = graphene.Int(required=True, description="Quantity of stock.")


class StockUpdate(relay.ClientIDMutation):
    count = graphene.Int(
        required=True,
        default_value=0,
        description="Returns the count of updated stocks.",
    )
    results = graphene.List(
        graphene.NonNull(StockResult),
        required=True,
        description="List of the updated stocks with errors if any.",
    )

    class Arguments:
        stocks = graphene.List(
            graphene.NonNull(StockUpdateInput),
            required=True,
            description="List of stocks to update.",
        )
        error_policy = ErrorPolicyEnum(
            required=False,
            description="Policies for error handling. Default is REJECT_EVERYTHING.",
        )

    class Meta:
        description = "Updates stock quantities for given variants and warehouses."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)

    @classmethod
    def validate_stock_inputs(cls, stock_inputs, index_error_map):
        cleaned_inputs_map = {}

        for index, stock_input in enumerate(stock_inputs):
            errors = []

            variant_id = stock_input.get("variant_id")
            warehouse_id = stock_input.get("warehouse_id")
            quantity = stock_input.get("quantity")

            if quantity < 0:
                errors.append(
                    StockUpdateError(
                        field="quantity",
                        message="Quantity cannot be less than 0.",
                    )
                )

            if not variant_id or not warehouse_id:
                errors.append(
                    StockUpdateError(
                        message="Both variant_id and warehouse_id must be provided.",
                    )
                )

            if errors:
                index_error_map[index].extend(errors)
                cleaned_inputs_map[index] = None
            else:
                cleaned_inputs_map[index] = stock_input

        return cleaned_inputs_map

    @classmethod
    def update_stocks(cls, cleaned_inputs_map, index_error_map):
        updated_stocks = []
        instances_data_and_errors = []

        for index, cleaned_input in cleaned_inputs_map.items():
            if not cleaned_input:
                instances_data_and_errors.append(
                    {"instance": None, "errors": index_error_map[index]}
                )
                continue

            variant_id = cleaned_input.get("variant_id")
            warehouse_id = cleaned_input.get("warehouse_id")
            quantity = cleaned_input.get("quantity")

            try:
                stock = Stock.objects.get(
                    product_variant_id=variant_id, warehouse_id=warehouse_id
                )
                stock.quantity = F("quantity") + quantity
                stock.save(update_fields=["quantity"])
                updated_stocks.append(stock)

                instances_data_and_errors.append(
                    {"instance": stock, "errors": index_error_map[index]}
                )
            except Stock.DoesNotExist:
                index_error_map[index].append(
                    StockUpdateError(
                        message="Stock not found.",
                    )
                )
                instances_data_and_errors.append(
                    {"instance": None, "errors": index_error_map[index]}
                )

        return updated_stocks, instances_data_and_errors

    @classmethod
    def save_stocks(cls, updated_stocks):
        Stock.objects.bulk_update(updated_stocks, ["quantity"])

    @classmethod
    def post_save_actions(cls, info, updated_stocks):
        manager = get_plugin_manager_promise(info.context).get()
        for stock in updated_stocks:
            manager.product_variant_stock_updated(stock)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        error_policy = data.get("error_policy", ErrorPolicyEnum.REJECT_EVERYTHING)
        stock_inputs = data["stocks"]
        index_error_map = defaultdict(list)

        cleaned_inputs_map = cls.validate_stock_inputs(stock_inputs, index_error_map)
        updated_stocks, instances_data_and_errors = cls.update_stocks(
            cleaned_inputs_map, index_error_map
        )

        if any(index_error_map.values()):
            if error_policy == ErrorPolicyEnum.REJECT_EVERYTHING:
                results = [
                    StockResult(stock=None, errors=errors)
                    for errors in index_error_map.values()
                ]
                return StockUpdate(count=0, results=results)

            if error_policy == ErrorPolicyEnum.REJECT_FAILED_ROWS:
                instances_data_and_errors = [
                    {"instance": None, "errors": errors} if errors else data
                    for data, errors in zip(
                        instances_data_and_errors, index_error_map.values()
                    )
                ]

        cls.save_stocks(updated_stocks)
        results = [
            StockResult(stock=data.get("instance"), errors=data.get("errors"))
            for data in instances_data_and_errors
        ]

        cls.post_save_actions(info, updated_stocks)

        return StockUpdate(count=len(updated_stocks), results=results)


class StockDelete(relay.ClientIDMutation):
    success = graphene.Boolean(
        description="Whether the stock was successfully deleted."
    )
    error = graphene.String(description="Error message if the operation fails.")

    class Input:
        stock_id = graphene.ID(required=True, description="ID of the stock to delete.")

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, stock_id):
        try:
            stock_instance = graphene.Node.get_node_from_global_id(
                info, stock_id, only_type="Stock"
            )
            if stock_instance:
                stock_instance.delete()
                return StockDelete(success=True)
            return StockDelete(error="Stock not found.")
        except Exception as e:
            return StockDelete(success=False, error=str(e))


class WarehouseMutations(graphene.ObjectType):
    create_warehouse = WarehouseCreate.Field()
    update_warehouse = WarehouseUpdate.Field()
    delete_warehouse = WarehouseDelete.Field()
    assign_warehouse_shipping_zone = WarehouseShippingZoneAssign.Field()
    unassign_warehouse_shipping_zone = WarehouseShippingZoneUnassign.Field()


class StockMutations(graphene.ObjectType):
    create_stock = StockCreate.Field()
    stock_update = StockUpdate.Field()
    delete_stock = StockDelete.Field()
