import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError
from graphql_relay import from_global_id
from django.db import models
from typing import Optional

from channel.models import Channel
from .types import ChannelNode
from graphq.core.enums import (
    AllocationStrategyEnum,
    MarkAsPaidStrategyEnum,
    TransactionFlowStrategyEnum,
)
from graphq.core.validators import (
    validate_one_of_args_is_in_query,

)


# Custom scalar types for Minute and Day
Minute = graphene.Int
Day = graphene.Int

def is_staff_user(context):
    """
    Check if the user in the request context is a staff user.
    """
    user = getattr(context, "user", None)
    return user and user.is_staff

class StockSettings(graphene.ObjectType):
    allocation_strategy = graphene.Field(
        AllocationStrategyEnum,
        description=(
            "Allocation strategy defines the preference of warehouses "
            "for allocations and reservations."
        ),
        required=True,
    )

    class Meta:
        description = "Represents the channel stock settings."
        doc_category = "Products"


class OrderSettings(graphene.ObjectType):
    automatically_confirm_all_new_orders = graphene.Boolean(
        required=True,
        description=(
            "When disabled, all new orders from checkout "
            "will be marked as unconfirmed. When enabled, orders from checkout will "
            "become unfulfilled immediately."
        ),
    )
    automatically_fulfill_non_shippable_gift_card = graphene.Boolean(
        required=True,
        description=(
            "When enabled, all non-shippable gift card orders "
            "will be fulfilled automatically."
        ),
    )
    expire_orders_after = Minute(
        required=False,
        description=(
            "Expiration time in minutes. Default null - means do not expire any orders."
            
        ),
    )
    mark_as_paid_strategy = graphene.Field(
        MarkAsPaidStrategyEnum,
        required=True,
        description=(
            "Determine what strategy will be used to mark the order as paid. "
            "Based on the chosen option, the proper object will be created "
            "and attached to the order when it's manually marked as paid."
            "\n`PAYMENT_FLOW` - [default option] creates the `Payment` object."
            "\n`TRANSACTION_FLOW` - creates the `TransactionItem` object."
          
        ),
    )
    default_transaction_flow_strategy = graphene.Field(
        TransactionFlowStrategyEnum,
        required=True,
        description=(
            "Determine the transaction flow strategy to be used. "
            "Include the selected option in the payload sent to the payment app, as a "
            "requested action for the transaction."
        ),
    )
    delete_expired_orders_after = Day(
        required=True,
        description=(
            "The time in days after expired orders will be deleted."
        ),
    )

    class Meta:
        description = "Represents the channel-specific order settings."
        


class ChannelQueries(graphene.ObjectType):
    channel = Node.Field(ChannelNode)
    all_channels = DjangoFilterConnectionField(ChannelNode)
    channel_by_slug = graphene.Field(ChannelNode, slug=graphene.String(required=True))
    stock_settings = graphene.Field(StockSettings)
    order_settings = graphene.Field(OrderSettings)

    def resolve_all_channels(root, info, **kwargs):
        return Channel.objects.all()

    def resolve_channel_by_slug(root, info, slug):
        try:
            return Channel.objects.get(slug=slug)
        except Channel.DoesNotExist:
            return None

    def resolve_channel(info, id: Optional[str] = None, slug: Optional[str] = None):
        validate_one_of_args_is_in_query("id", id, "slug", slug)
        if id:
            _, db_id = from_global_id(id, Channel)
            channel = Channel.objects.filter(id=db_id).first()
        else:
            channel = Channel.objects.filter(slug=slug).first()

        if channel and channel.is_active:
            return channel
        if is_staff_user(info.context):
            return channel

        return None


