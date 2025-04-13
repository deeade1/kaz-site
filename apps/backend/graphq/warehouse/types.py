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
from ..core.dataloaders import DataLoader


class WarehouseByIdLoader(DataLoader):
    context_key = "warehouse_id"

    def batch_load(self, keys):
        warehouses = WarehouseModel.objects.in_bulk(keys)
        return [warehouses.get(warehouse_id) for warehouse_id in keys]


class ProductVariantByIdLoader(DataLoader):
    context_key = "product_variant_id"

    def batch_load(self, keys):
        variants = models.ProductVariant.objects.in_bulk(keys)
        return [variants.get(variant_id) for variant_id in keys]


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
            "slug": ["exact"],
            "click_and_collect_option": ["exact"],
            "is_private": ["exact"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_countries(root, info):
        # Use prefetch_related in queries to optimize this
        return list(set(chain.from_iterable(
            zone.countries for zone in root.shipping_zones.all()
        )))

    @staticmethod
    def resolve_shipping_zones(root, info):
        return query(root.shipping_zones.all().only("name", "description"), info)

    @staticmethod
    def resolve_address(root, info):
        return query(root.address, info)


class StockNode(OptimizedDjangoObjectType):
    quantity_reserved = graphene.Int(
        description="Total quantity reserved for the stock item."
    )
    available_quantity = graphene.Int(
        description="Calculated available quantity (quantity - allocated - reserved)"
    )

    class Meta:
        model = models.Stock
        fields = "__all__"
        filter_fields = {
            "warehouse__name": ["exact", "icontains", "istartswith"],
            "product_variant__name": ["exact", "icontains", "istartswith"],
            "quantity": ["gte", "lte"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_quantity(root, info):
        return root.quantity

    @staticmethod
    def resolve_quantity_allocated(root, info):
        # Use cached value if available
        if hasattr(root, 'quantity_allocated'):
            return root.quantity_allocated
        return root.allocations.aggregate(
            quantity_allocated=Coalesce(Sum("quantity_allocated"), 0
        ))["quantity_allocated"]

    @staticmethod
    def resolve_quantity_reserved(root, info):
        if not is_reservation_enabled(info.context.site.settings):
            return 0

        # Use cached value if available
        if hasattr(root, 'quantity_reserved'):
            return root.quantity_reserved

        return root.reservations.filter(
            reserved_until__gt=timezone.now()
        ).aggregate(
            quantity_reserved=Coalesce(Sum("quantity_reserved"), 0)
        )["quantity_reserved"]

    @staticmethod
    def resolve_available_quantity(root, info):
        # Calculate on the fly if not pre-annotated
        if hasattr(root, 'available_quantity'):
            return root.available_quantity
            
        allocated = root.allocations.aggregate(
            total=Coalesce(Sum("quantity_allocated"), 0)
        )["total"]
        
        if is_reservation_enabled(info.context.site.settings):
            reserved = root.reservations.filter(
                reserved_until__gt=timezone.now()
            ).aggregate(
                total=Coalesce(Sum("quantity_reserved"), 0)
            )["total"]
        else:
            reserved = 0
            
        return max(root.quantity - allocated - reserved, 0)

    @staticmethod
    def resolve_warehouse(root, info):
        if not root.warehouse_id:
            return None
        return WarehouseByIdLoader(info.context).load(root.warehouse_id)

    @staticmethod
    def resolve_product_variant(root, info):
        if not root.product_variant_id:
            return None
        return ProductVariantByIdLoader(info.context).load(
            root.product_variant_id
        ).then(
            lambda variant: ChannelContext(node=variant, channel_slug=None)
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
            "quantity_allocated": ["gte", "lte"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_stock_available_quantity(root, info):
        return models.Allocation.objects.filter(
            stock=root.stock
        ).available_quantity_for_stock(root.stock)


class ChannelWarehouseNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.ChannelWarehouse
        fields = "__all__"
        interfaces = (Node,)


class PreorderAllocationNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.PreorderAllocation
        fields = "__all__"
        filter_fields = {
            "order_line__id": ["exact"],
            "product_variant_channel_listing__id": ["exact"],
            "quantity": ["gte", "lte"],
        }
        interfaces = (Node,)


class PreorderReservationNode(OptimizedDjangoObjectType):
    class Meta:
        model = models.PreorderReservation
        fields = "__all__"
        filter_fields = {
            "checkout_line__id": ["exact"],
            "product_variant_channel_listing__id": ["exact"],
            "quantity_reserved": ["gte", "lte"],
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
            "quantity_reserved": ["gte", "lte"],
            "reserved_until": ["gte", "lte"],
        }
        interfaces = (Node,)