import graphene
from django.utils.text import slugify
from graphene import relay

from channel.models import Channel
from .types import ChannelNode
from graphq.core.enums import (
    AllocationStrategyEnum,
    MarkAsPaidStrategyEnum,
    TransactionFlowStrategyEnum,
)

from graphene.types.generic import GenericScalar
from graphql.language import ast
from measurement.measures import Weight

from core.weight import (
    convert_weight_to_default_weight_unit,
    get_default_weight_unit,
)

class WeightScalar(graphene.Scalar):
    @staticmethod
    def parse_value(value):
        if isinstance(value, dict):
            weight = Weight(**{value["unit"]: value["value"]})
        else:
            weight = WeightScalar.parse_decimal(value)
        return weight

    @staticmethod
    def serialize(weight):
        if isinstance(weight, Weight):
            weight = convert_weight_to_default_weight_unit(weight)
            return str(weight)
        return None

    @staticmethod
    def parse_literal(node):
        if isinstance(node, ast.ObjectValue):
            weight = WeightScalar.parse_literal_object(node)
        else:
            weight = WeightScalar.parse_decimal(node.value)
        return weight

    @staticmethod
    def parse_decimal(value):
        try:
            value = decimal.Decimal(value)
        except decimal.DecimalException:
            return None
        default_unit = get_default_weight_unit()
        return Weight(**{default_unit: value})

    @staticmethod
    def parse_literal_object(node):
        value = decimal.Decimal(0)
        unit = get_default_weight_unit()

        for field in node.fields:
            if field.name.value == "value":
                try:
                    value = decimal.Decimal(field.value.value)
                except decimal.DecimalException:
                    return None
            if field.name.value == "unit":
                unit = field.value.value
        return Weight(**{unit: value})

class Minute(graphene.Int):
    """The `Minute` scalar type represents number of minutes by integer value."""


class Day(graphene.Int):
    """The `Day` scalar type represents number of days by integer value."""




class ChannelInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    slug = graphene.String(required=True)
    currency_code = graphene.String(required=True)
    default_country = graphene.String(required=True)


class CreateChannel(relay.ClientIDMutation):
    class Input:
        name = graphene.String(description="Name of the channel.", required=True)
        slug = graphene.String(description="Slug of the channel.", required=True)
        currency_code = graphene.String(description="Currency code.", required=True)
        default_country = graphene.String(description="Default country.", required=True)

    channel = graphene.Field(ChannelNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        channel = Channel(
            name=input.get("name"),
            slug=slugify(input.get("slug")),
            currency_code=input.get("currency_code"),
            default_country=input.get("default_country"),
        )
        channel.save()
        return CreateChannel(channel=channel)


class UpdateChannel(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        name = graphene.String()
        slug = graphene.String()
        currency_code = graphene.String()
        default_country = graphene.String()

    channel = graphene.Field(ChannelNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        channel = Channel.objects.get(pk=from_global_id(input.get("id"))[1])
        if "name" in input:
            channel.name = input.get("name")
        if "slug" in input:
            channel.slug = slugify(input.get("slug"))
        if "currency_code" in input:
            channel.currency_code = input.get("currency_code")
        if "default_country" in input:
            channel.default_country = input.get("default_country")
        channel.save()
        return UpdateChannel(channel=channel)


class ChannelActivate(relay.ClientIDMutation):
    channel = graphene.Field(ChannelNode, description="Activated channel.")

    class Input:
        id = graphene.ID(required=True, description="ID of the channel to activate.")

    @classmethod
    def clean_channel_availability(cls, channel):
        if channel.is_active:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "This channel is already activated.",
                        code=ChannelErrorCode.INVALID.value,
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        channel = cls.get_node_or_error(info, input["id"], only_type=ChannelNode)
        cls.clean_channel_availability(channel)
        channel.is_active = True
        channel.save(update_fields=["is_active"])
        return ChannelActivate(channel=channel)


class StockSettingsInput(graphene.InputObjectType):
    allocation_strategy = AllocationStrategyEnum(
        description=(
            "Allocation strategy options. Strategy defines the preference "
            "of warehouses for allocations and reservations."
        ),
        required=True,
    )


class OrderSettingsInput(graphene.InputObjectType):
    automatically_confirm_all_new_orders = graphene.Boolean(
        required=False,
        description="When disabled, all new orders from checkout "
        "will be marked as unconfirmed. When enabled orders from checkout will "
        "become unfulfilled immediately. By default set to True",
    )
    automatically_fulfill_non_shippable_gift_card = graphene.Boolean(
        required=False,
        description="When enabled, all non-shippable gift card orders "
        "will be fulfilled automatically. By defualt set to True.",
    )
    expire_orders_after = Minute(
        required=False,
        description=(
            "Expiration time in minutes. "
            "Default null - means do not expire any orders. "
            "Enter 0 or null to disable."
        ),
    )
    delete_expired_orders_after = Day(
        required=False,
        description=(
            "The time in days after expired orders will be deleted."
            "Allowed range is from 1 to 120."
        ),
    )
    mark_as_paid_strategy = MarkAsPaidStrategyEnum(
        required=False,
        description=(
            "Determine what strategy will be used to mark the order as paid. "
            "Based on the chosen option, the proper object will be created "
            "and attached to the order when it's manually marked as paid."
            "\n`PAYMENT_FLOW` - [default option] creates the `Payment` object."
            "\n`TRANSACTION_FLOW` - creates the `TransactionItem` object."
        ),
    )
    default_transaction_flow_strategy = TransactionFlowStrategyEnum(
        required=False,
        description=(
            "Determine the transaction flow strategy to be used. "
            "Include the selected option in the payload sent to the payment app, as a "
            "requested action for the transaction."
        ),
    )

class ReorderInput(graphene.InputObjectType):
    id = graphene.ID(required=True, description="The ID of the item to move.")
    sort_order = graphene.Int(
        description=(
            "The new relative sorting position of the item (from -inf to +inf). "
            "1 moves the item one position forward, -1 moves the item one position "
            "backward, 0 leaves the item unchanged."
        )
    )

class ChannelDeactivate(relay.ClientIDMutation):
    channel = graphene.Field(ChannelNode, description="Deactivated channel.")

    class Input:
        id = graphene.ID(required=True, description="ID of the channel to deactivate.")

    @classmethod
    def clean_channel_availability(cls, channel):
        if not channel.is_active:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "This channel is already deactivated.",
                        code=ChannelErrorCode.INVALID.value,
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        channel = cls.get_node_or_error(info, input["id"], only_type=Channel)
        cls.clean_channel_availability(channel)

        channel.is_active = False
        channel.save(update_fields=["is_active"])
        return ChannelDeactivate(channel=channel)


class ChannelDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of the channel to delete.")
        channel_id = graphene.ID(
            required=True,
            description="ID of the channel to migrate orders from the origin channel.",
        )

    @classmethod
    def validate_input(cls, origin_channel, target_channel):
        if origin_channel.id == target_channel.id:
            raise ValidationError(
                {
                    "channel_id": ValidationError(
                        "Cannot migrate data to the channel that is being removed.",
                        code=ChannelErrorCode.INVALID.value,
                    )
                }
            )
        if origin_channel.currency_code != target_channel.currency_code:
            raise ValidationError(
                {
                    "channel_id": ValidationError(
                        f"Cannot migrate from {origin_channel.currency_code} "
                        f"to {target_channel.currency_code}. "
                        "Migration is allowed only between channels with the same currency.",
                        code=ChannelErrorCode.CHANNELS_CURRENCY_MUST_BE_THE_SAME.value,
                    )
                }
            )

    @classmethod
    def migrate_orders_to_target_channel(cls, origin_channel_id, target_channel_id):
        Order.objects.select_for_update().filter(channel_id=origin_channel_id).update(
            channel_id=target_channel_id
        )

    @classmethod
    def delete_checkouts(cls, origin_channel_id):
        Checkout.objects.select_for_update().filter(
            channel_id=origin_channel_id
        ).delete()

    @classmethod
    def perform_delete_with_order_migration(cls, origin_channel, target_channel):
        cls.validate_input(origin_channel, target_channel)
        with traced_atomic_transaction():
            origin_channel_id = origin_channel.id
            cls.delete_checkouts(origin_channel_id)
            cls.migrate_orders_to_target_channel(origin_channel_id, target_channel.id)

    @classmethod
    def perform_delete_channel_without_order(cls, origin_channel):
        if Order.objects.filter(channel=origin_channel).exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Cannot remove a channel with orders. "
                        "Try migrating orders to another channel by passing the `channel_id`.",
                        code=ChannelErrorCode.CHANNEL_WITH_ORDERS.value,
                    )
                }
            )
        with traced_atomic_transaction():
            cls.delete_checkouts(origin_channel.id)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        origin_channel = cls.get_node_or_error(info, input["id"], only_type=ChannelNode)
        target_channel_global_id = input.get("channel_id")

        if target_channel_global_id:
            target_channel = cls.get_node_or_error(
                info, target_channel_global_id, only_type=ChannelNode
            )
            cls.perform_delete_with_order_migration(origin_channel, target_channel)
        else:
            cls.perform_delete_channel_without_order(origin_channel)

        with traced_atomic_transaction():
            delete_invalid_warehouse_to_shipping_zone_relations(
                origin_channel,
                origin_channel.warehouses.values("id"),
                channel_deletion=True,
            )

        return ChannelDelete(origin_channel)


class ChannelReorderWarehouses(relay.ClientIDMutation):
    channel = graphene.Field(
        Channel, description="Channel within the warehouses are reordered."
    )

    class Input:
        channel_id = graphene.ID(
            description="ID of a channel.",
            required=True,
        )
        moves = graphene.List(ReorderInput, graphene.NonNull(graphene.String))

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        channel = cls.get_node_or_error(
            info, channel_id, field="channel_id", only_type=Channel
        )

        warehouses_m2m = channel.channelwarehouse
        operations = cls.get_operations(moves, warehouses_m2m)

        with traced_atomic_transaction():
            perform_reordering(warehouses_m2m, operations)

        return ChannelReorderWarehouses(channel=channel)

    @classmethod
    def get_operations(cls, moves, channel_warehouses_m2m):
        warehouse_ids = [move["id"] for move in moves]
        warehouse_pks = cls.get_global_ids_or_error(
            warehouse_ids, only_type=Warehouse, field="moves"
        )

        warehouses_m2m = channel_warehouses_m2m.filter(warehouse_id__in=warehouse_pks)

        if warehouses_m2m.count() != len(set(warehouse_pks)):
            pks = {
                str(pk) for pk in warehouses_m2m.values_list("warehouse_id", flat=True)
            }
            invalid_values = set(warehouse_pks) - pks
            invalid_ids = [
                graphene.Node.to_global_id("Warehouse", warehouse_id)
                for warehouse_id in invalid_values
            ]
            raise ValidationError(
                {
                    "moves": ValidationError(
                        "Couldn't resolve to a warehouse",
                        code=ChannelErrorCode.NOT_FOUND.value,
                        params={"warehouses": invalid_ids},
                    )
                }
            )

        warehouse_id_to_warehouse_m2m_id = {
            str(warehouse_data["warehouse_id"]): warehouse_data["id"]
            for warehouse_data in warehouses_m2m.values("id", "warehouse_id")
        }
        operations: DefaultDict[str, int] = defaultdict(int)
        for warehouse_pk, move in zip(warehouse_pks, moves):
            warehouse_m2m_id = warehouse_id_to_warehouse_m2m_id[warehouse_pk]
            operations[warehouse_m2m_id] += move.sort_order

        return dict(operations)


class ChannelMutations(graphene.ObjectType):
    create_channel = CreateChannel.Field()
    update_channel = UpdateChannel.Field()
    channel_delete = ChannelDelete.Field()
    channel_activate = ChannelActivate.Field()
    channel_deactivate = ChannelDeactivate.Field()
    channel_reorder_warehouses = ChannelReorderWarehouses.Field()
