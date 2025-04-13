from collections.abc import Iterable
from decimal import Decimal
from typing import TYPE_CHECKING, Optional, Union

from django.conf import settings
from django.contrib.postgres.indexes import GinIndex
from django.db import models
from django.db.models import OuterRef, Q, Subquery
from django_countries.fields import CountryField
from django_measurement.models import MeasurementField
from measurement.measures import Weight

from channel.models import Channel
from core.models import ModelWithMetadata
from core.units import WeightUnits
from core.utils.editorjs import clean_editor_js
from core.utils.translations import Translation
from core.weight import convert_weight, get_default_weight_unit, zero_weight
from django_prices.models import MoneyField
from prices import Money
from tax.models import TaxClass

from . import PostalCodeRuleInclusionType, ShippingMethodType
from .postal_codes import filter_shipping_methods_by_postal_code_rules

if TYPE_CHECKING:
    from accounts.models import Address
    from checkout.fetch import CheckoutLineInfo
    from checkout.models import Checkout
    from order.fetch import OrderLineInfo
    from order.models import Order


class ShippingZone(ModelWithMetadata):
    """Optimized ShippingZone model with improved queries and indexing."""
    name = models.CharField(max_length=100, db_index=True)
    countries = CountryField(multiple=True, default=[], blank=True)
    default = models.BooleanField(default=False, db_index=True)
    description = models.TextField(blank=True)
    channels = models.ManyToManyField(
        Channel, 
        related_name="shipping_zones",
        db_index=True
    )

    class Meta(ModelWithMetadata.Meta):
        permissions = (("manage_shipping", "Manage shipping."),)
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                fields=["countries"],
                name="shippingzone_countries_gin",
                opclasses=["gin_trgm_ops"],
            ),
            models.Index(fields=["name", "default"]),
        ]
        ordering = ["name"]

    def __str__(self):
        return self.name

    def get_shipping_methods_for_channel(self, channel_slug: str) -> models.QuerySet:
        """Optimized query to fetch shipping methods for a specific channel."""
        return (
            self.shipping_methods
            .filter(channel_listings__channel__slug=channel_slug)
            .select_related("shipping_zone")
            .prefetch_related("channel_listings")
            .distinct()
        )


class ShippingMethodQueryset(models.QuerySet["ShippingMethod"]):
    """Optimized queryset for ShippingMethod with common queries."""
    
    def price_based(self) -> models.QuerySet:
        """Filter price-based shipping methods with optimized query."""
        return self.filter(type=ShippingMethodType.PRICE_BASED).select_related("tax_class")

    def weight_based(self) -> models.QuerySet:
        """Filter weight-based shipping methods with optimized query."""
        return self.filter(type=ShippingMethodType.WEIGHT_BASED).select_related("tax_class")

    def for_channel(self, channel_slug: str) -> models.QuerySet:
        """Optimized query for shipping methods available in a channel."""
        return (
            self.filter(
                shipping_zone__channels__slug=channel_slug,
                channel_listings__channel__slug=channel_slug,
            )
            .select_related("shipping_zone", "tax_class")
            .prefetch_related("channel_listings")
            .distinct()
        )

    def annotate_channel_pricing(self, channel_id: int) -> models.QuerySet:
        """Annotate shipping methods with their channel-specific pricing."""
        return self.annotate(
            price_amount=Subquery(
                ShippingMethodChannelListing.objects.filter(
                    shipping_method=OuterRef("pk"),
                    channel_id=channel_id,
                ).values("price_amount")[:1]
            ),
            minimum_order_price_amount=Subquery(
                ShippingMethodChannelListing.objects.filter(
                    shipping_method=OuterRef("pk"),
                    channel_id=channel_id,
                ).values("minimum_order_price_amount")[:1]
            ),
            maximum_order_price_amount=Subquery(
                ShippingMethodChannelListing.objects.filter(
                    shipping_method=OuterRef("pk"),
                    channel_id=channel_id,
                ).values("maximum_order_price_amount")[:1]
            ),
            currency=Subquery(
                ShippingMethodChannelListing.objects.filter(
                    shipping_method=OuterRef("pk"),
                    channel_id=channel_id,
                ).values("currency")[:1]
            ),
        )

    def applicable_for_country(self, country_code: str) -> models.QuerySet:
        """Filter shipping methods available for a specific country."""
        return self.filter(shipping_zone__countries__contains=country_code)

    def exclude_products(self, product_ids: list[int]) -> models.QuerySet:
        """Exclude shipping methods that exclude the given products."""
        if not product_ids:
            return self
        return self.exclude(excluded_products__id__in=product_ids)

    def applicable_for_weight(self, weight: Weight) -> models.QuerySet:
        """Filter weight-based shipping methods applicable for the given weight."""
        return self.filter(
            Q(minimum_order_weight__lte=weight) | Q(minimum_order_weight__isnull=True),
            Q(maximum_order_weight__gte=weight) | Q(maximum_order_weight__isnull=True),
            type=ShippingMethodType.WEIGHT_BASED,
        )

    def applicable_for_price(
        self, 
        price: Money, 
        channel_id: int
    ) -> models.QuerySet:
        """Filter price-based shipping methods applicable for the given price."""
        return self.filter(
            type=ShippingMethodType.PRICE_BASED,
            channel_listings__channel_id=channel_id,
            channel_listings__currency=price.currency,
            channel_listings__minimum_order_price_amount__lte=price.amount,
            channel_listings__maximum_order_price_amount__gte=price.amount,
        ).distinct()

    def applicable_shipping_methods(
        self,
        price: Money,
        channel_id: int,
        weight: Weight,
        country_code: str,
        product_ids: Optional[list[int]] = None,
    ) -> models.QuerySet:
        """Optimized query to get applicable shipping methods."""
        base_qs = (
            self.filter(shipping_zone__countries__contains=country_code)
            .filter(shipping_zone__channels__id=channel_id)
            .annotate_channel_pricing(channel_id)
            .exclude_products(product_ids or [])
            .prefetch_related("shipping_zone", "postal_code_rules")
        )

        price_based = self.applicable_for_price(price, channel_id)
        weight_based = self.applicable_for_weight(weight)
        
        return (price_based | weight_based).filter(id__in=base_qs.values("id"))

    def applicable_for_instance(
        self,
        instance: Union["Checkout", "Order"],
        channel_id: int,
        price: Money,
        shipping_address: Optional["Address"] = None,
        lines: Optional[Union[Iterable["CheckoutLineInfo"], Iterable["OrderLineInfo"]]] = None,
    ) -> Optional[models.QuerySet]:
        """Optimized query for shipping methods applicable to an order/checkout."""
        if not shipping_address:
            return None

        country_code = shipping_address.country.code
        lines = lines or list(instance.lines.select_related("variant__product"))
        
        product_ids = {
            line.variant.product_id 
            for line in lines 
            if line and line.variant
        }

        weight = (
            calculate_checkout_weight(lines)
            if isinstance(instance, Checkout)
            else instance.weight
        )

        methods = self.applicable_shipping_methods(
            price=price,
            channel_id=channel_id,
            weight=weight,
            country_code=country_code,
            product_ids=product_ids,
        )

        return filter_shipping_methods_by_postal_code_rules(methods, shipping_address)


ShippingMethodManager = models.Manager.from_queryset(ShippingMethodQueryset)


class ShippingMethod(models.Model):
    """Optimized ShippingMethod model with better indexing and relationships."""
    name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=30,
        choices=ShippingMethodType.CHOICES,
        default=ShippingMethodType.PRICE_BASED,
    )
    shipping_zone = models.ForeignKey(
        ShippingZone,
        related_name="shipping_methods",
        on_delete=models.CASCADE,
        db_index=True,
    )
    minimum_order_weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        blank=True,
        null=True,
    )
    maximum_order_weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        blank=True,
        null=True,
    )
    excluded_products = models.ManyToManyField(
        "product.Product",
        blank=True,
        related_name="excluded_shipping_methods",
        db_index=True,
    )
    tax_class = models.ForeignKey(
        TaxClass,
        related_name="shipping_methods",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    objects = ShippingMethodManager()

    class Meta:
        indexes = [
            models.Index(fields=["type"]),
            models.Index(fields=["name", "type"]),
            models.Index(fields=["shipping_zone", "type"]),
        ]
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"

    def get_price(self, channel_id: int) -> Optional[Money]:
        """Get price for a specific channel with caching."""
        if not hasattr(self, "_channel_prices"):
            self._channel_prices = {
                listing.channel_id: listing.price
                for listing in self.channel_listings.all()
            }
        return self._channel_prices.get(channel_id)

    def is_applicable(
        self,
        price: Money,
        weight: Weight,
        channel_id: int,
        country_code: str,
        product_ids: Optional[list[int]] = None,
    ) -> bool:
        """Check if shipping method is applicable for given parameters."""
        if self.type == ShippingMethodType.PRICE_BASED:
            listing = self.channel_listings.filter(
                channel_id=channel_id,
                currency=price.currency,
                minimum_order_price_amount__lte=price.amount,
                maximum_order_price_amount__gte=price.amount,
            ).first()
            return bool(listing)
        
        elif self.type == ShippingMethodType.WEIGHT_BASED:
            return (
                (not self.minimum_order_weight or self.minimum_order_weight <= weight)
                and (not self.maximum_order_weight or self.maximum_order_weight >= weight)
                and self.shipping_zone.countries.filter(code=country_code).exists()
                and not (product_ids and self.excluded_products.filter(id__in=product_ids).exists())
            )
        return False


class ShippingMethodPostalCodeRule(models.Model):
    """Optimized model for postal code rules with better indexing."""
    shipping_method = models.ForeignKey(
        ShippingMethod,
        on_delete=models.CASCADE,
        related_name="postal_code_rules",
        db_index=True,
    )
    start = models.CharField(max_length=32, db_index=True)
    end = models.CharField(max_length=32, blank=True, null=True, db_index=True)
    inclusion_type = models.CharField(
        max_length=32,
        choices=PostalCodeRuleInclusionType.CHOICES,
        default=PostalCodeRuleInclusionType.EXCLUDE,
        db_index=True,
    )

    class Meta:
        unique_together = ("shipping_method", "start", "end")
        indexes = [
            models.Index(fields=["start", "end"]),
        ]
        ordering = ["shipping_method", "start"]

    def __str__(self):
        return f"{self.get_inclusion_type_display()}: {self.start}-{self.end}"


class ShippingMethodChannelListing(models.Model):
    """Optimized channel listings with better money field handling."""
    shipping_method = models.ForeignKey(
        ShippingMethod,
        related_name="channel_listings",
        on_delete=models.CASCADE,
        db_index=True,
    )
    channel = models.ForeignKey(
        Channel,
        related_name="shipping_method_listings",
        on_delete=models.CASCADE,
        db_index=True,
    )
    price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    price = MoneyField(amount_field="price_amount", currency_field="currency")
    minimum_order_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
        blank=True,
        null=True,
    )
    minimum_order_price = MoneyField(
        amount_field="minimum_order_price_amount", 
        currency_field="currency"
    )
    maximum_order_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    maximum_order_price = MoneyField(
        amount_field="maximum_order_price_amount", 
        currency_field="currency"
    )
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        unique_together = [["shipping_method", "channel"]]
        indexes = [
            models.Index(fields=["channel", "is_active"]),
            models.Index(fields=["price_amount", "currency"]),
        ]
        ordering = ("channel", "price_amount")

    def __str__(self):
        return f"{self.shipping_method.name} - {self.channel.name}"

    def clean(self):
        """Validate price ranges."""
        super().clean()
        if (
            self.minimum_order_price_amount is not None
            and self.maximum_order_price_amount is not None
            and self.minimum_order_price_amount > self.maximum_order_price_amount
        ):
            raise ValidationError(
                "Minimum order price cannot be greater than maximum order price."
            )

    def get_total(self) -> Money:
        """Get total price with proper currency handling."""
        return Money(self.price_amount, self.currency)


class ShippingMethodTranslation(Translation):
    """Optimized translations model with better JSON field handling."""
    name = models.CharField(max_length=255, blank=True)
    shipping_method = models.ForeignKey(
        ShippingMethod, 
        related_name="translations", 
        on_delete=models.CASCADE,
        db_index=True,
    )
    description = models.JSONField(blank=True, null=True)

    class Meta:
        unique_together = (("language_code", "shipping_method"),)
        indexes = [
            models.Index(fields=["language_code", "shipping_method"]),
        ]

    def __str__(self):
        return f"{self.shipping_method.name} ({self.language_code})"

    def clean(self):
        """Clean and validate editorjs content."""
        if self.description:
            self.description = clean_editor_js(self.description, to_string=True)
        super().clean()

    def get_translated_object_id(self):
        return "ShippingMethod", self.shipping_method_id

    def get_translated_keys(self):
        return {
            "name": self.name,
            "description": self.description,
        }