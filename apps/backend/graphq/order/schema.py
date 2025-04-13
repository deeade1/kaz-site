from typing import List, Optional
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError
from uuid import UUID
from django.db.models import Q

from graphq.core.types import TaxedMoney
from order import models
from ..core.enums import ReportingPeriod
from .enums import ReportingPeriod
from .models import Order, OrderEvent, OrderGrantedRefund
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
        external_reference=graphene.Argument(
            graphene.String, 
            description="External reference ID."
        ),
    )
    
    orders = DjangoFilterConnectionField(
        OrderNode,
        channel=graphene.String(
            description="Slug of a channel for which data should be returned."
        ),
    )
    
    draft_orders = DjangoFilterConnectionField(
        OrderNode,
        description="List of draft orders.",
    )
    
    orders_total = relay.Node.Field(
        TaxedMoney,
        description="Return the total sales amount for a specific period.",
        period=graphene.Argument(
            ReportingPeriod, 
            description="A period of time."
        ),
        channel=graphene.String(
            description="Slug of a channel for which data should be returned."
        ),
    )
    
    order_by_token = relay.Node.Field(
        OrderNode,
        description="Look up an order by token.",
        token=graphene.Argument(
            graphene.UUID, 
            required=True, 
            description="The order's token."
        ),
    )

    # Optimized Resolvers
    @staticmethod
    def resolve_homepage_events(root, info, **kwargs):
        """Optimized resolver for homepage events with prefetching."""
        types = [
            OrderEvents.PLACED,
            OrderEvents.PLACED_FROM_DRAFT,
            OrderEvents.ORDER_FULLY_PAID,
        ]
        
        qs = models.OrderEvent.objects.filter(type__in=types)
        
        # Apply channel filtering if needed
        if not get_app_promise(info.context).get():
            accessible_channels = get_user_accessible_channels(info, info.context.user)
            channel_ids = [channel.id for channel in accessible_channels]
            qs = qs.filter(order__channel_id__in=channel_ids)
            
        return qs.prefetch_related('order', 'user')

    @staticmethod
    def resolve_order(root, info, external_reference=None, id=None):
        """Optimized order lookup with caching."""
        if not (external_reference or id):
            return None
            
        qs = models.Order.objects.all()
        
        if external_reference:
            qs = qs.filter(external_reference=external_reference)
        else:
            try:
                uuid = UUID(id)
                qs = qs.filter(Q(id=uuid) | Q(number=id, use_old_id=True))
            except ValueError:
                qs = qs.filter(number=id, use_old_id=True)
                
        return qs.select_related(
            'channel',
            'user',
            'shipping_address',
            'billing_address'
        ).first()

    @staticmethod
    def resolve_orders(root, info, channel=None, **kwargs):
        """Optimized orders resolver with permission checks."""
        qs = models.Order.objects.non_draft()
        
        if channel:
            qs = qs.filter(channel__slug=channel)
            
        # Permission handling
        user = info.context.user
        if user and not user.has_perm(OrderPermissions.MANAGE_ORDERS):
            qs = qs.filter(user=user)
        elif not get_app_promise(info.context).get():
            accessible_channels = get_user_accessible_channels(info, user)
            qs = qs.filter(channel__in=accessible_channels)
            
        return qs.select_related(
            'channel',
            'user'
        ).prefetch_related(
            'payments',
            'lines'
        )

    @staticmethod
    def resolve_draft_orders(root, info, **kwargs):
        """Optimized draft orders resolver."""
        qs = models.Order.objects.drafts()
        
        # Permission handling
        if not get_app_promise(info.context).get():
            accessible_channels = get_user_accessible_channels(info, info.context.user)
            qs = qs.filter(channel__in=accessible_channels)
            
        return qs.select_related(
            'channel',
            'user'
        ).prefetch_related(
            'lines'
        )

    @staticmethod
    def resolve_orders_total(root, info, period, channel=None):
        """Optimized orders total calculation."""
        channel_slug = channel or get_default_channel_slug_or_graphql_error()
        
        # Early permission check
        if not get_app_promise(info.context).get():
            accessible_channels = get_user_accessible_channels(info, info.context.user)
            if channel_slug not in [c.slug for c in accessible_channels]:
                raise PermissionDenied(
                    f"You do not have access to the {channel_slug} channel."
                )
        
        # Get channel and currency once
        channel = Channel.objects.filter(slug=channel_slug).only('currency_code').first()
        if not channel:
            return None
            
        # Optimized queryset
        qs = (
            models.Order.objects
            .non_draft()
            .exclude(status__in=[OrderStatus.CANCELED, OrderStatus.EXPIRED])
            .filter(channel__slug=channel_slug)
            .filter_by_period(period, "created_at")
            .only('total_gross_amount', 'currency')
        )
        
        return sum_order_totals(qs, channel.currency_code)

    @staticmethod
    def resolve_order_by_token(root, info, token):
        """Optimized order lookup by token."""
        return (
            models.Order.objects
            .exclude(status=OrderStatus.DRAFT)
            .filter(id=token)
            .select_related(
                'channel',
                'user',
                'shipping_address',
                'billing_address'
            )
            .prefetch_related('lines')
            .first()
        )

    # Common search fields
    ORDER_SEARCH_FIELDS = (
        "id", 
        "discount_name", 
        "token", 
        "user_email", 
        "user__email"
    )