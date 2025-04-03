import graphene
from django.db.models import Q, Sum
from django.db.models.functions import Coalesce
from django.utils import timezone
from itertools import chain
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query

from warehouse import models
from warehouse.reservations import is_reservation_enabled
from ..channel import ChannelContext
from .models import Warehouse as WarehouseModel


class WarehouseNode(OptimizedDjangoObjectType):
    countries = graphene.List(
        graphene.String, description="List of countries associated with the warehouse."
    )
    shipping_zones = graphene.List(
        graphene.String,
        description="List of shipping zones associated with the warehouse.",
    )

    class Meta:
        model = WarehouseModel
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_countries(root, info):
        shipping_zones = query(root.shipping_zones.all(), info)
        return list(set(chain.from_iterable(zone.countries for zone in shipping_zones)))

    @staticmethod
    def resolve_shipping_zones(root, info, **kwargs):
        return query(root.shipping_zones.all(), info)

    @staticmethod
    def resolve_address(root, info):
        return root.address


class StockNode(OptimizedDjangoObjectType):
    quantity_reserved = graphene.Int(
        description="Total quantity reserved for the stock item."
    )

    class Meta:
        model = models.Stock
        fields = "__all__"
        filter_fields = {
            "warehouse__name": ["exact", "icontains", "istartswith"],
            "product_variant__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_quantity(root, info):
        return root.quantity

    @staticmethod
    def resolve_quantity_allocated(root, info):
        # Calculate allocated quantity from related allocations
        return query(
            root.allocations.aggregate(
                quantity_allocated=Coalesce(Sum("quantity_allocated"), 0)
            ),
            info,
        )["quantity_allocated"]

    @staticmethod
    def resolve_quantity_reserved(root, info):
        site = info.context.site
        if not is_reservation_enabled(site.settings):
            return 0

        # Calculate reserved quantity, filtering by active reservations
        return query(
            root.reservations.aggregate(
                quantity_reserved=Coalesce(
                    Sum(
                        "quantity_reserved",
                        filter=Q(reserved_until__gt=timezone.now()),
                    ),
                    0,
                )
            ),
            info,
        )["quantity_reserved"]

    @staticmethod
    def resolve_warehouse(root, info):
        # Load warehouse data by ID using WarehouseByIdLoader
        if root.warehouse_id:
            return query(WarehouseByIdLoader(info.context).load(root.warehouse_id), info)
        return None

    @staticmethod
    def resolve_product_variant(root, info):
        # Load product variant data by ID with a context for channels
        return query(
            ProductVariantByIdLoader(info.context)
            .load(root.product_variant_id)
            .then(lambda variant: ChannelContext(node=variant, channel_slug=None)),
            info,
        )


class AllocationNode(OptimizedDjangoObjectType):
    stock_available_quantity = graphene.Int(
        description="Available quantity for the associated stock."
    )

    class Meta:
        model = models.Allocation
        fields = "__all__"
        filter_fields = {
            "order_line__id": ["exact"],
            "stock__id": ["exact"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_stock_available_quantity(root, info):
        # Use available_quantity_for_stock to get the available quantity for the stock
        return query(
            models.Allocation.objects.available_quantity_for_stock(root.stock), info
        )


class ChannelWarehouseNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.Category
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class PreorderAllocationNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.PreorderAllocation
        fields = "__all__"
        filter_fields = {
            "order_line__id": ["exact"],
            "product_variant_channel_listing__id": ["exact"],
        }
        interfaces = (Node,)


class PreorderReservationNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.PreorderReservation
        fields = "__all__"
        filter_fields = {
            "checkout_line__id": ["exact"],
            "product_variant_channel_listing__id": ["exact"],
            "reserved_until": ["gte", "lte"],
        }
        interfaces = (Node,)


class ReservationNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.Reservation
        fields = "__all__"
        filter_fields = {
            "checkout_line__id": ["exact"],
            "stock__id": ["exact"],
            "reserved_until": ["gte", "lte"],
        }
        interfaces = (Node,)