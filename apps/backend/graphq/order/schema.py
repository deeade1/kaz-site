from typing import List, Optional

import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError

from graphq.core.types import TaxedMoney

from ...order import models
from ...permission.enums import OrderPermissions
from ..core.doc_category import DOC_CATEGORY_ORDERS
from ..core.enums import ReportingPeriod
from ..core.fields import PermissionsField
from ..core.scalars import UUID
from ..core.utils import ext_ref_to_global_id_or_error, from_global_id_or_error
from ..core.validators import validate_one_of_args_is_in_query
from .enums import ReportingPeriod
from .models import Order, OrderEvent, OrderGrantedRefund
from .permissions import OrderPermissions
from .resolvers import (resolve_draft_orders, resolve_homepage_events,
                        resolve_order, resolve_order_by_token, resolve_orders,
                        resolve_orders_total)
from .types import OrderEventNode, OrderNode, TaxedMoney


class OrderQueries(graphene.ObjectType):
    homepage_events = DjangoFilterConnectionField(
        OrderEventNode,
        description="List of activity events to display on the homepage.",
        permissions=[OrderPermissions.MANAGE_ORDERS],
    )
    
    order = relay.Node.Field(
        OrderNode,
        description="Look up an order by ID or external reference.",
        external_reference=graphene.Argument(graphene.String, description="External reference ID."),
    )
    
    orders = DjangoFilterConnectionField(
        OrderNode,
        channel=graphene.String(description="Slug of a channel for which data should be returned."),
        permissions=[OrderPermissions.MANAGE_ORDERS],
    )
    
    draft_orders = DjangoFilterConnectionField(
        OrderNode,
        permissions=[OrderPermissions.MANAGE_ORDERS],
    )
    
    orders_total = relay.Node.Field(
        TaxedMoney,
        description="Return the total sales amount for a specific period.",
        period=graphene.Argument(ReportingPeriod, description="A period of time."),
        channel=graphene.String(description="Slug of a channel for which data should be returned."),
        permissions=[OrderPermissions.MANAGE_ORDERS],
    )
    
    order_by_token = relay.Node.Field(
        OrderNode,
        description="Look up an order by token.",
        token=graphene.Argument(graphene.UUID, required=True, description="The order's token."),
    )

    # Resolver Methods
    @staticmethod
    def resolve_homepage_events(root, info, **kwargs):
        return resolve_homepage_events(info)

    @staticmethod
    def resolve_order(root, info, external_reference=None, id=None):
        return resolve_order(info, external_reference, id)

    @staticmethod
    def resolve_orders(root, info, channel=None, **kwargs):
        return resolve_orders(info, channel, **kwargs)

    @staticmethod
    def resolve_draft_orders(root, info, **kwargs):
        return resolve_draft_orders(info, **kwargs)

    @staticmethod
    def resolve_orders_total(root, info, period, channel=None):
        return resolve_orders_total(info, period, channel)

    @staticmethod
    def resolve_order_by_token(root, info, token):
        return resolve_order_by_token(info, token)

    ORDER_SEARCH_FIELDS = ("id", "discount_name", "token", "user_email", "user__email")


    def resolve_orders(
        info, channel_slug=None, requesting_user=None, requestor_has_access_to_all=False
    ):
        database_connection_name = get_database_connection_name(info.context)
        qs = models.Order.objects.using(database_connection_name).non_draft()
        if channel_slug:
            qs = qs.filter(channel__slug=str(channel_slug))

        if requesting_user and not requestor_has_access_to_all:
            return qs.filter(user_id=requesting_user.id)

        if get_app_promise(info.context).get():
            return qs

        accessible_channels = get_user_accessible_channels(info, info.context.user)
        if channel_slug and channel_slug not in [
            channel.slug for channel in accessible_channels
        ]:
            raise PermissionDenied(
                message=f"You do not have access to the {channel_slug} channel."
            )
        channel_ids = [channel.id for channel in accessible_channels]
        return qs.filter(channel_id__in=channel_ids)


    def resolve_draft_orders(info):
        database_connection_name = get_database_connection_name(info.context)
        qs = models.Order.objects.using(database_connection_name).drafts()

        if get_app_promise(info.context).get():
            return qs

        accessible_channels = get_user_accessible_channels(info, info.context.user)
        channel_ids = [channel.id for channel in accessible_channels]
        return qs.filter(channel_id__in=channel_ids)


    @traced_resolver
    def resolve_orders_total(info, period, channel_slug):
        if channel_slug is None:
            channel_slug = get_default_channel_slug_or_graphql_error()
        channel = Channel.objects.filter(slug=str(channel_slug)).first()
        if not channel:
            return None
        database_connection_name = get_database_connection_name(info.context)

        app = get_app_promise(info.context).get()
        if not app:
            accessible_channels = get_user_accessible_channels(info, info.context.user)
            if channel_slug not in [channel.slug for channel in accessible_channels]:
                raise PermissionDenied(
                    message=f"You do not have access to the {channel_slug} channel."
                )

        qs = (
            models.Order.objects.using(database_connection_name)
            .non_draft()
            .exclude(status__in=[OrderStatus.CANCELED, OrderStatus.EXPIRED])
            .filter(channel__slug=str(channel_slug))
        )
        qs = filter_by_period(qs, period, "created_at")
        return sum_order_totals(qs, channel.currency_code)


    def resolve_order(info, id):
        if id is None:
            return None
        try:
            id = UUID(id)
            lookup = Q(id=id)
        except ValueError:
            lookup = Q(number=id) & Q(use_old_id=True)
        database_connection_name = get_database_connection_name(info.context)
        return models.Order.objects.using(database_connection_name).filter(lookup).first()


    def resolve_homepage_events(info):
        # Filter only selected events to be displayed on homepage.
        types = [
            OrderEvents.PLACED,
            OrderEvents.PLACED_FROM_DRAFT,
            OrderEvents.ORDER_FULLY_PAID,
        ]
        database_connection_name = get_database_connection_name(info.context)
        lookup = Q(type__in=types)
        app = get_app_promise(info.context).get()
        if not app:
            # get order events from orders that user has access to
            accessible_channels = get_user_accessible_channels(info, info.context.user)
            channel_ids = [channel.id for channel in accessible_channels]
            accessible_orders = models.Order.objects.filter(channel_id__in=channel_ids)
            lookup &= Q(order_id__in=accessible_orders.values("id"))
        return models.OrderEvent.objects.using(database_connection_name).filter(lookup)


    def resolve_order_by_token(info, token):
        database_connection_name = get_database_connection_name(info.context)
        return (
            models.Order.objects.using(database_connection_name)
            .exclude(status=OrderStatus.DRAFT)
            .filter(id=token)
            .first()
        )

