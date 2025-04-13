import itertools
import uuid
from collections.abc import Iterable
from typing import TYPE_CHECKING, Optional, TypedDict, TypeVar, Union, cast

from django.db import models
from django.db.models import Count, Exists, F, OuterRef, Prefetch, Q, Sum
from django.db.models.expressions import Subquery
from django.db.models.functions import Coalesce
from django.db.models.query import QuerySet
from django.utils import timezone
from django_stubs_ext import WithAnnotations

from accounts.models import Address
from channel.models import Channel
from checkout.models import CheckoutLine
from core.models import ModelWithExternalReference, ModelWithMetadata, SortableModel
from order.models import OrderLine
from product.models import Product, ProductVariant, ProductVariantChannelListing
from shipping.models import ShippingZone

from . import WarehouseClickAndCollectOption

if TYPE_CHECKING:
    class WithAvailableQuantity(TypedDict):
        available_quantity: int

    StockWithAvailableQuantity = WithAnnotations["Stock", WithAvailableQuantity]
else:
    StockWithAvailableQuantity = "Stock"


class WarehouseQueryset(models.QuerySet["Warehouse"]):
    def for_channel(self, channel_id: int) -> QuerySet["Warehouse"]:
        """Optimized query for warehouses in a specific channel."""
        return self.filter(
            channelwarehouse__channel_id=channel_id
        ).order_by("pk").distinct()

    def for_country_and_channel(self, country: str, channel_id: int) -> QuerySet["Warehouse"]:
        """Optimized query combining country and channel filters."""
        return self.filter(
            shipping_zones__countries__contains=country,
            shipping_zones__channel__id=channel_id,
            channelwarehouse__channel_id=channel_id
        ).distinct().order_by("pk")

    def _get_click_and_collect_filter(self) -> Q:
        """Reusable filter for click and collect options."""
        return Q(
            click_and_collect_option__in=[
                WarehouseClickAndCollectOption.LOCAL_STOCK,
                WarehouseClickAndCollectOption.ALL_WAREHOUSES,
            ]
        )

    def applicable_for_click_and_collect_no_quantity_check(
        self,
        lines_qs: Union[QuerySet[CheckoutLine], QuerySet[OrderLine]],
        channel_id: int,
    ) -> QuerySet["Warehouse"]:
        """Optimized query for click and collect without quantity checks."""
        if not lines_qs.filter(variant__is_preorder_active=False).exists():
            return self._for_channel_click_and_collect(channel_id)
            
        variant_ids = lines_qs.values_list("variant_id", flat=True)
        stocks_qs = Stock.objects.filter(
            product_variant_id__in=variant_ids
        ).select_related("product_variant")
        return self._for_channel_lines_and_stocks(lines_qs, stocks_qs, channel_id)

    def applicable_for_click_and_collect(
        self,
        lines_qs: Union[QuerySet[CheckoutLine], QuerySet[OrderLine]],
        channel_id: int,
    ) -> QuerySet["Warehouse"]:
        """Optimized query for click and collect with quantity checks."""
        if not lines_qs.filter(variant__is_preorder_active=False).exists():
            return self._for_channel_click_and_collect(channel_id)

        variant_ids = lines_qs.values_list("variant_id", flat=True)
        lines_quantity = (
            lines_qs.filter(variant_id=OuterRef("product_variant_id"))
            .order_by()
            .values("variant_id")
            .annotate(prod_sum=Sum("quantity"))
        )

        stocks_qs = (
            Stock.objects.using(self.db)
            .annotate_available_quantity()
            .annotate(line_quantity=F("available_quantity") - Subquery(lines_quantity))
            .filter(
                product_variant_id__in=variant_ids,
                line_quantity__gte=0,
            )
            .select_related("product_variant")
        )
        return self._for_channel_lines_and_stocks(lines_qs, stocks_qs, channel_id)

    def _for_channel_lines_and_stocks(
        self,
        lines_qs: Union[QuerySet[CheckoutLine], QuerySet[OrderLine]],
        stocks_qs: QuerySet["Stock"],
        channel_id: int,
    ) -> QuerySet["Warehouse"]:
        """Optimized query combining channel, lines and stocks."""
        variant_count = lines_qs.values("variant_id").distinct().count()
        
        return (
            self.for_channel(channel_id)
            .prefetch_related(
                Prefetch("stock_set", 
                       queryset=stocks_qs,
                       to_attr="prefetched_stocks")
            )
            .filter(
                Q(
                    stock__in=stocks_qs,
                    click_and_collect_option=WarehouseClickAndCollectOption.LOCAL_STOCK
                ) & Q(stock__count=variant_count)
                | Q(click_and_collect_option=WarehouseClickAndCollectOption.ALL_WAREHOUSES)
            )
            .annotate(stock_count=Count("stock", distinct=True))
        )

    def _for_channel_click_and_collect(self, channel_id: int) -> QuerySet["Warehouse"]:
        """Optimized query for click and collect warehouses."""
        return self.for_channel(channel_id).filter(
            self._get_click_and_collect_filter()
        )


class ChannelWarehouse(SortableModel):
    channel = models.ForeignKey(
        Channel, 
        related_name="channelwarehouse", 
        on_delete=models.CASCADE,
        db_index=True
    )
    warehouse = models.ForeignKey(
        "Warehouse", 
        related_name="channelwarehouse", 
        on_delete=models.CASCADE,
        db_index=True
    )

    class Meta:
        unique_together = (("channel", "warehouse"),)
        ordering = ("sort_order", "pk")
        indexes = [
            models.Index(fields=["channel", "warehouse"]),
        ]

    def get_ordering_queryset(self) -> QuerySet["ChannelWarehouse"]:
        return self.channel.channelwarehouse.all()


WarehouseManager = models.Manager.from_queryset(WarehouseQueryset)


class Warehouse(ModelWithMetadata, ModelWithExternalReference):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    channels = models.ManyToManyField(
        Channel, 
        related_name="warehouses", 
        through=ChannelWarehouse
    )
    shipping_zones = models.ManyToManyField(
        ShippingZone, 
        blank=True, 
        related_name="warehouses"
    )
    address = models.ForeignKey(
        Address, 
        on_delete=models.PROTECT,
        db_index=True
    )
    email = models.EmailField(blank=True, default="")
    click_and_collect_option = models.CharField(
        max_length=30,
        choices=WarehouseClickAndCollectOption.CHOICES,
        default=WarehouseClickAndCollectOption.DISABLED,
    )
    is_private = models.BooleanField(default=True)

    objects = WarehouseManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("-slug",)
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["click_and_collect_option"]),
            models.Index(fields=["is_private"]),
            models.Index(fields=["name", "slug"]),
        ]

    def __str__(self) -> str:
        return self.name

    @property
    def countries(self) -> set[str]:
        """Optimized country list using cached shipping zones."""
        return set(
            itertools.chain.from_iterable(
                zone.countries for zone in self.shipping_zones.only("countries")
            )
        )

    def delete(self, *args, **kwargs) -> None:
        """Optimized delete with address cleanup."""
        address = self.address
        super().delete(*args, **kwargs)
        if not Warehouse.objects.filter(address=address).exists():
            address.delete()


class StockQuerySet(models.QuerySet["Stock"]):
    def annotate_available_quantity(self) -> QuerySet[StockWithAvailableQuantity]:
        """Optimized available quantity annotation."""
        return cast(
            QuerySet[StockWithAvailableQuantity],
            self.annotate(
                available_quantity=F("quantity")
                - Coalesce(
                    Sum(
                        "allocations__quantity_allocated",
                        filter=Q(allocations__quantity_allocated__gt=0),
                    ),
                    0,
                )
            ),
        )

    def annotate_reserved_quantity(self) -> QuerySet["Stock"]:
        """Optimized reserved quantity annotation."""
        return self.annotate(
            reserved_quantity=Coalesce(
                Sum(
                    "reservations__quantity_reserved",
                    filter=Q(reservations__reserved_until__gt=timezone.now()),
                ),
                0,
            )
        )

    def for_channel_and_click_and_collect(self, channel_slug: str) -> QuerySet["Stock"]:
        """Optimized query for click and collect stocks."""
        return self.filter(
            warehouse__channelwarehouse__channel__slug=channel_slug
        ).select_related("product_variant", "warehouse")

    def for_channel_and_country(
        self,
        channel_slug: str,
        country_code: Optional[str] = None,
        include_cc_warehouses: bool = False,
    ) -> QuerySet["Stock"]:
        """Optimized query combining channel and country filters."""
        qs = self.select_related("product_variant", "warehouse").filter(
            warehouse__channelwarehouse__channel__slug=channel_slug
        )
        
        if country_code:
            qs = qs.filter(
                warehouse__shipping_zones__countries__contains=country_code,
                warehouse__shipping_zones__channel__slug=channel_slug
            )
        
        if not country_code or include_cc_warehouses:
            cc_filter = Q(
                warehouse__click_and_collect_option__in=[
                    WarehouseClickAndCollectOption.LOCAL_STOCK,
                    WarehouseClickAndCollectOption.ALL_WAREHOUSES,
                ]
            )
            qs = qs.filter(cc_filter) if country_code else qs.filter(cc_filter)
        
        return qs.distinct()

    def get_variant_stocks_for_country(
        self, 
        country_code: str, 
        channel_slug: str, 
        product_variant: ProductVariant
    ) -> "Stock":
        """Optimized query for variant stocks."""
        return self.for_channel_and_country(channel_slug, country_code).get(
            product_variant=product_variant
        )

    def get_variants_stocks_for_country(
        self,
        country_code: str,
        channel_slug: str,
        products_variants: Iterable[ProductVariant],
    ) -> QuerySet["Stock"]:
        """Optimized query for multiple variant stocks."""
        return self.for_channel_and_country(channel_slug, country_code).filter(
            product_variant__in=products_variants
        )

    def get_product_stocks_for_country_and_channel(
        self, country_code: str, channel_slug: str, product: Product
    ) -> QuerySet["Stock"]:
        """Optimized query for product stocks."""
        return self.for_channel_and_country(channel_slug, country_code).filter(
            product_variant__product_id=product.pk
        )


StockManager = models.Manager.from_queryset(StockQuerySet)


class Stock(models.Model):
    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name="stocks",
        db_index=True
    )
    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="stocks",
        db_index=True
    )
    quantity = models.IntegerField(default=0)
    quantity_allocated = models.IntegerField(default=0)

    objects = StockManager()

    class Meta:
        unique_together = [["warehouse", "product_variant"]]
        ordering = ("pk",)
        indexes = [
            models.Index(fields=["quantity"]),
            models.Index(fields=["quantity_allocated"]),
            models.Index(fields=["warehouse", "product_variant", "quantity"]),
        ]

    def __str__(self) -> str:
        return f"{self.product_variant} at {self.warehouse}"

    def increase_stock(self, quantity: int, commit: bool = True) -> None:
        """Optimized stock increase."""
        self.quantity = F("quantity") + quantity
        if commit:
            self.save(update_fields=["quantity"])

    def decrease_stock(self, quantity: int, commit: bool = True) -> None:
        """Optimized stock decrease."""
        self.quantity = F("quantity") - quantity
        if commit:
            self.save(update_fields=["quantity"])


class AllocationQueryset(models.QuerySet["Allocation"]):
    def annotate_stock_available_quantity(self) -> QuerySet["Allocation"]:
        """Optimized available quantity annotation."""
        return self.annotate(
            stock_available_quantity=F("stock__quantity")
            - Coalesce(Sum("stock__allocations__quantity_allocated"), 0)
        )

    def available_quantity_for_stock(self, stock: "Stock") -> int:
        """Optimized available quantity calculation."""
        allocated_quantity = (
            self.filter(stock=stock).aggregate(
                Sum("quantity_allocated")
            )["quantity_allocated__sum"] or 0
        )
        return max(stock.quantity - allocated_quantity, 0)


AllocationManager = models.Manager.from_queryset(AllocationQueryset)


class Allocation(models.Model):
    order_line = models.ForeignKey(
        OrderLine,
        on_delete=models.CASCADE,
        related_name="allocations",
        db_index=True
    )
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name="allocations",
        db_index=True
    )
    quantity_allocated = models.PositiveIntegerField(default=0)

    objects = AllocationManager()

    class Meta:
        unique_together = [["order_line", "stock"]]
        ordering = ("pk",)
        indexes = [
            models.Index(fields=["quantity_allocated"]),
            models.Index(fields=["order_line", "stock", "quantity_allocated"]),
        ]

    def __str__(self) -> str:
        return f"{self.order_line} allocated {self.quantity_allocated}"


class PreorderAllocation(models.Model):
    order_line = models.ForeignKey(
        OrderLine,
        on_delete=models.CASCADE,
        related_name="preorder_allocations",
        db_index=True
    )
    quantity = models.PositiveIntegerField(default=0)
    product_variant_channel_listing = models.ForeignKey(
        ProductVariantChannelListing,
        on_delete=models.CASCADE,
        related_name="preorder_allocations",
        db_index=True
    )

    class Meta:
        unique_together = [["order_line", "product_variant_channel_listing"]]
        ordering = ("pk",)
        indexes = [
            models.Index(fields=["order_line", "product_variant_channel_listing"]),
        ]


T = TypeVar("T", bound=models.Model)


class ReservationQuerySet(models.QuerySet[T]):
    def not_expired(self) -> QuerySet[T]:
        """Optimized filter for active reservations."""
        return self.filter(reserved_until__gt=timezone.now())

    def exclude_checkout_lines(self, checkout_lines: Optional[Iterable[CheckoutLine]]) -> QuerySet[T]:
        """Optimized exclusion of checkout lines."""
        return self if not checkout_lines else self.exclude(
            checkout_line__in=checkout_lines
        )


ReservationManager = models.Manager.from_queryset(ReservationQuerySet)


class PreorderReservation(models.Model):
    checkout_line = models.ForeignKey(
        CheckoutLine,
        on_delete=models.CASCADE,
        related_name="preorder_reservations",
        db_index=True
    )
    product_variant_channel_listing = models.ForeignKey(
        ProductVariantChannelListing,
        on_delete=models.CASCADE,
        related_name="preorder_reservations",
        db_index=True
    )
    quantity_reserved = models.PositiveIntegerField(default=0)
    reserved_until = models.DateTimeField(db_index=True)

    objects = ReservationManager()

    class Meta:
        unique_together = [["checkout_line", "product_variant_channel_listing"]]
        indexes = [
            models.Index(fields=["checkout_line", "reserved_until"]),
            models.Index(fields=["reserved_until"]),
        ]
        ordering = ("pk",)

    def __str__(self) -> str:
        return f"Preorder {self.quantity_reserved} until {self.reserved_until}"


class Reservation(models.Model):
    checkout_line = models.ForeignKey(
        CheckoutLine,
        on_delete=models.CASCADE,
        related_name="reservations",
        db_index=True
    )
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name="reservations",
        db_index=True
    )
    quantity_reserved = models.PositiveIntegerField(default=0)
    reserved_until = models.DateTimeField(db_index=True)

    objects = ReservationManager()

    class Meta:
        unique_together = [["checkout_line", "stock"]]
        indexes = [
            models.Index(fields=["checkout_line", "reserved_until"]),
            models.Index(fields=["reserved_until"]),
            models.Index(fields=["stock", "reserved_until"]),
        ]
        ordering = ("pk",)

    def __str__(self) -> str:
        return f"Reservation {self.quantity_reserved} until {self.reserved_until}"