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


def _applicable_weight_based_methods(weight, qs):
    """Return weight-based shipping methods applicable for the given weight."""
    return qs.filter(
        Q(minimum_order_weight__lte=weight) | Q(minimum_order_weight__isnull=True),
        Q(maximum_order_weight__gte=weight) | Q(maximum_order_weight__isnull=True),
        type=ShippingMethodType.WEIGHT_BASED,
    )

def _applicable_price_based_methods(price: Money, qs, channel_id):
    """Return price-based shipping methods applicable for the given price."""
    return qs.filter(
        type=ShippingMethodType.PRICE_BASED,
        channel_listings__channel_id=channel_id,
        channel_listings__currency=price.currency,
        channel_listings__minimum_order_price_amount__lte=price.amount,
        channel_listings__maximum_order_price_amount__gte=price.amount,
    ).distinct()

def _get_weight_type_display(min_weight, max_weight):
    """Return a human-readable representation of the weight range."""
    default_unit = get_default_weight_unit()
    min_weight = convert_weight(min_weight, default_unit)
    max_weight = convert_weight(max_weight, default_unit) if max_weight else None

    if max_weight:
        return f"{min_weight} to {max_weight}"
    return f"{min_weight} and up"

class ShippingZone(ModelWithMetadata):
    name = models.CharField(max_length=100)
    countries = CountryField(multiple=True, default=[], blank=True)
    default = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    channels = models.ManyToManyField(Channel, related_name="shipping_zones")

    def __str__(self):
        return self.name

    class Meta(ModelWithMetadata.Meta):
        permissions = (("manage_shipping", "Manage shipping."),)
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                fields=["countries"],
                name="s_z_countries_idx",
                opclasses=["gin_trgm_ops"],
            ),
        ]

    def get_shipping_methods_for_channel(self, channel_slug):
        """Fetch shipping methods for a specific channel."""
        return self.shipping_methods.filter(
            channel_listings__channel__slug=channel_slug
        ).distinct()

class ShippingMethodQueryset(models.QuerySet["ShippingMethod"]):
    def price_based(self):
        """Filter price-based shipping methods."""
        return self.filter(type=ShippingMethodType.PRICE_BASED)

    def weight_based(self):
        """Filter weight-based shipping methods."""
        return self.filter(type=ShippingMethodType.WEIGHT_BASED)

    def for_channel(self, channel_slug: str):
        """Filter shipping methods available for a specific channel."""
        return self.filter(
            shipping_zone__channels__slug=channel_slug,
            channel_listings__channel__slug=channel_slug,
        )

    def applicable_shipping_methods_by_channel(self, shipping_methods, channel_id):
        """Annotate shipping methods with their price for a specific channel."""
        return shipping_methods.annotate(
            price_amount=Subquery(
                ShippingMethodChannelListing.objects.filter(
                    shipping_method=OuterRef("pk"), channel_id=channel_id
                ).values("price_amount")
            )
        ).order_by("price_amount")

    def exclude_shipping_methods_for_excluded_products(self, qs, product_ids: list[int]):
        """Exclude shipping methods that exclude the given products."""
        return qs.exclude(excluded_products__id__in=product_ids)

    def applicable_shipping_methods(
        self, price: Money, channel_id, weight, country_code, product_ids=None
    ):
        """Return shipping methods applicable for the given parameters."""
        qs = self.filter(
            shipping_zone__countries__contains=country_code,
            shipping_zone__channels__id=channel_id,
            channel_listings__currency=price.currency,
            channel_listings__channel_id=channel_id,
        )
        qs = self.applicable_shipping_methods_by_channel(qs, channel_id)
        qs = qs.prefetch_related("shipping_zone")

        if product_ids:
            qs = self.exclude_shipping_methods_for_excluded_products(qs, product_ids)

        price_based_methods = _applicable_price_based_methods(price, qs, channel_id)
        weight_based_methods = _applicable_weight_based_methods(weight, qs)
        return price_based_methods | weight_based_methods

    def applicable_shipping_methods_for_instance(
        self,
        instance: Union["Checkout", "Order"],
        channel_id,
        price: Money,
        shipping_address: Optional["Address"] = None,
        country_code: Optional[str] = None,
        lines: Union[
            Iterable["CheckoutLineInfo"], Iterable["OrderLineInfo"], None
        ] = None,
    ):
        """Return shipping methods applicable for the given instance."""
        if not shipping_address:
            return None

        if not country_code:
            country_code = shipping_address.country.code

        if lines is None:
            lines = list(instance.lines.prefetch_related("variant__product").all())

        instance_product_ids = {
            line.variant.product_id for line in lines if line.variant
        }

        from checkout.models import Checkout

        weight = (
            calculate_checkout_weight(lines)
            if isinstance(instance, Checkout)
            else instance.weight
        )

        applicable_methods = self.applicable_shipping_methods(
            price=price,
            channel_id=channel_id,
            weight=weight,
            country_code=country_code,
            product_ids=instance_product_ids,
        ).prefetch_related("postal_code_rules")

        return filter_shipping_methods_by_postal_code_rules(
            applicable_methods, shipping_address
        )

ShippingMethodManager = models.Manager.from_queryset(ShippingMethodQueryset)


class ShippingMethodNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethod
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "shipping_zone__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (graphene.relay.Node,)

    # Optional: Translation field if you support multi-language descriptions
    # translation = graphene.Field(ShippingMethodTranslation, resolver=resolve_shipping_translation)

    price = graphene.Field(Money, required=True, description="Shipping price for the method.")
    maximum_order_price = graphene.Field(Money, description="Maximum order price for this method.")
    minimum_order_price = graphene.Field(Money, description="Minimum order price for this method.")
    active = graphene.Boolean(required=True, description="Whether the method is currently active.")
    message = graphene.String(description="Message regarding shipping method availability.")
    country_code = graphene.Field(graphene.String, required=True, description="Country code.")

    maximum_order_weight = graphene.Field(
        WeightScalar, description="Maximum order weight allowed for this method."
    )
    minimum_order_weight = graphene.Field(
        WeightScalar, description="Minimum order weight allowed for this method."
    )

    @staticmethod
    def resolve_maximum_order_weight(root, info):
        if root.maximum_order_weight:
            return convert_weight_to_default_weight_unit(root.maximum_order_weight)
        return None

    @staticmethod
    def resolve_minimum_order_weight(root, info):
        if root.minimum_order_weight:
            return convert_weight_to_default_weight_unit(root.minimum_order_weight)
        return None

    @staticmethod
    def resolve_price(root, info):
        # This assumes price depends on channel, country, or shipping zone
        # You need to pass or get context for channel/country
        # Placeholder implementation:
        channel_slug = info.context.channel.slug  # Adjust as per context setup
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        if listing:
            return listing.price
        return None

    @staticmethod
    def resolve_maximum_order_price(root, info):
        channel_slug = info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        if listing:
            return listing.maximum_order_price
        return None

    @staticmethod
    def resolve_minimum_order_price(root, info):
        channel_slug = info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        if listing:
            return listing.minimum_order_price
        return None

    @staticmethod
    def resolve_active(root, info):
        # Placeholder logic; adjust based on availability logic
        channel_slug = info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        return listing.is_active if listing else False

    @staticmethod
    def resolve_message(root, info):
        # Placeholder message logic
        return "Shipping method available."

    @staticmethod
    def resolve_country_code(root, info):
        # Assuming country code is passed in context or args, or from zone
        countries = root.shipping_zone.countries
        return countries[0] if countries else None



class ShippingMethodPostalCodeRule(models.Model):
    shipping_method = models.ForeignKey(
        ShippingMethod, on_delete=models.CASCADE, related_name="postal_code_rules"
    )
    start = models.CharField(max_length=32)
    end = models.CharField(max_length=32, blank=True, null=True)
    inclusion_type = models.CharField(
        max_length=32,
        choices=PostalCodeRuleInclusionType.CHOICES,
        default=PostalCodeRuleInclusionType.EXCLUDE,
    )

    class Meta:
        unique_together = ("shipping_method", "start", "end")


class ShippingMethodChannelListing(models.Model):
    shipping_method = models.ForeignKey(
        ShippingMethod,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="shipping_method_listings",
        on_delete=models.CASCADE,
    )
    minimum_order_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
        blank=True,
        null=True,
    )
    minimum_order_price = MoneyField(
        amount_field="minimum_order_price_amount", currency_field="currency"
    )
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )
    maximum_order_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    maximum_order_price = MoneyField(
        amount_field="maximum_order_price_amount", currency_field="currency"
    )
    price = MoneyField(amount_field="price_amount", currency_field="currency")
    price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )

    def get_total(self):
        return self.price

    class Meta:
        unique_together = [["shipping_method", "channel"]]
        ordering = ("pk",)


class ShippingMethodTranslation(Translation):
    name = models.CharField(max_length=255, null=True, blank=True)
    shipping_method = models.ForeignKey(
        ShippingMethod, related_name="translations", on_delete=models.CASCADE
    )
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)

    class Meta:
        unique_together = (("language_code", "shipping_method"),)

    def get_translated_object_id(self):
        return "ShippingMethod", self.shipping_method_id

    def get_translated_keys(self):
        return {
            "name": self.name,
            "description": self.description,
        }
