import graphene
from django.db.models import QuerySet
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query
from django_countries.fields import Country

# Core imports
from core.weight import convert_weight_to_default_weight_unit
from ..core.types import (
    CountryDisplay,
    Money,
    MoneyRange,
    NonNullList,
    Weight,
)
from ..core.fields import JSONString
from ..core.tracing import traced_resolver

# Model imports
from shipping import models as shipping_models
from shipping.models import (
    ShippingMethod,
    ShippingZone,
    ShippingMethodPostalCodeRule,
    ShippingMethodTranslation,
    ShippingMethodChannelListing,
)

# Channel & Context
from ..channel import ChannelQsContext
from ..channel.types import Channel

# Enums
from .enums import PostalCodeRuleInclusionTypeEnum, ShippingMethodTypeEnum

# Translation
from ..translations.types import ShippingMethodTranslation


class ShippingZoneNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingZone
        description = "Represents a shipping zone in the shop."
        interfaces = (relay.Node,)
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "default": ["exact"],
            "countries": ["exact", "icontains"],
        }
        convert_choices_to_enum = False

    price_range = graphene.Field(
        MoneyRange,
        description="Lowest and highest prices for the shipping.",
        channel_slug=graphene.String(
            description="Slug of the channel for which the data should be returned."
        )
    )
    countries = NonNullList(
        CountryDisplay,
        description="List of countries available for the shipping method."
    )
    warehouses = NonNullList(
        "saleor.warehouse.types.Warehouse",
        description="List of warehouses for the shipping zone."
    )
    channels = NonNullList(
        Channel,
        description="List of channels for the shipping zone."
    )

    @staticmethod
    @traced_resolver
    def resolve_price_range(root: ShippingZone, info, channel_slug=None):
        """Optimized price range resolver with channel context."""
        channel_slug = channel_slug or info.context.channel.slug
        return root.get_shipping_methods_for_channel(channel_slug).aggregate_price_range()

    @staticmethod
    def resolve_countries(root: ShippingZone, _info):
        """Efficient country resolution with cached country names."""
        return [
            CountryDisplay(code=code, country=Country(code).name)
            for code in root.countries
        ]

    @staticmethod
    def resolve_warehouses(root: ShippingZone, info):
        """Optimized warehouse resolution with prefetching."""
        return query(root.warehouses.all(), info)

    @staticmethod
    def resolve_channels(root: ShippingZone, info):
        """Optimized channel resolution with prefetching."""
        return query(root.channels.all(), info)


class ShippingMethodNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethod
        description = "Shipping method are the methods you'll use to get customer's orders to them."
        interfaces = (relay.Node,)
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "shipping_zone__name": ["exact", "icontains", "istartswith"],
            "tax_class__id": ["exact"],
        }
        convert_choices_to_enum = False

    price = graphene.Field(
        Money,
        required=True,
        description="Price of the shipping method.",
        channel_slug=graphene.String(
            description="Slug of the channel for which the data should be returned."
        )
    )
    maximum_order_price = graphene.Field(
        Money,
        description="Maximum order price for this shipping method.",
        channel_slug=graphene.String(
            description="Slug of the channel for which the data should be returned."
        )
    )
    minimum_order_price = graphene.Field(
        Money,
        description="Minimum order price for this shipping method.",
        channel_slug=graphene.String(
            description="Slug of the channel for which the data should be returned."
        )
    )
    active = graphene.Boolean(
        required=True,
        description="Whether the shipping method is active.",
        channel_slug=graphene.String(
            description="Slug of the channel for which the data should be returned."
        )
    )
    translation = TranslationField(ShippingMethodTranslation)
    maximum_order_weight = graphene.Field(
        Weight,
        description="Maximum order weight for this shipping method."
    )
    minimum_order_weight = graphene.Field(
        Weight,
        description="Minimum order weight for this shipping method."
    )
    postal_code_rules = NonNullList(
        lambda: ShippingMethodPostalCodeRuleNode,
        description="List of postal code rules for this shipping method."
    )
    channel_listings = NonNullList(
        lambda: ShippingMethodChannelListingNode,
        description="List of channels available for the shipping method."
    )

    @staticmethod
    @traced_resolver
    def resolve_price(root: ShippingMethod, info, channel_slug=None):
        """Optimized price resolver with channel context."""
        channel_slug = channel_slug or info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        return listing.price if listing else None

    @staticmethod
    def resolve_maximum_order_price(root: ShippingMethod, info, channel_slug=None):
        channel_slug = channel_slug or info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        return listing.maximum_order_price if listing else None

    @staticmethod
    def resolve_minimum_order_price(root: ShippingMethod, info, channel_slug=None):
        channel_slug = channel_slug or info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        return listing.minimum_order_price if listing else None

    @staticmethod
    def resolve_active(root: ShippingMethod, info, channel_slug=None):
        channel_slug = channel_slug or info.context.channel.slug
        listing = root.channel_listings.filter(channel__slug=channel_slug).first()
        return listing.is_active if listing else False

    @staticmethod
    def resolve_maximum_order_weight(root: ShippingMethod, _info):
        return convert_weight_to_default_weight_unit(root.maximum_order_weight)

    @staticmethod
    def resolve_minimum_order_weight(root: ShippingMethod, _info):
        return convert_weight_to_default_weight_unit(root.minimum_order_weight)

    @staticmethod
    def resolve_postal_code_rules(root: ShippingMethod, info):
        return query(root.postal_code_rules.all(), info)

    @staticmethod
    def resolve_channel_listings(root: ShippingMethod, info):
        return query(root.channel_listings.all(), info)


class ShippingMethodPostalCodeRuleNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodPostalCodeRule
        description = "Represents postal code rules for shipping methods."
        interfaces = (relay.Node,)
        fields = "__all__"
        filterset_fields = {
            "start": ["exact", "icontains", "istartswith"],
            "end": ["exact", "icontains", "istartswith"],
            "inclusion_type": ["exact"],
            "shipping_method__name": ["exact", "icontains", "istartswith"],
        }

    inclusion_type = PostalCodeRuleInclusionTypeEnum(
        description="Inclusion type of the postal code rule.",
        required=True
    )


class ShippingMethodChannelListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodChannelListing
        description = "Represents shipping method channel listing."
        interfaces = (relay.Node,)
        fields = "__all__"
        filterset_fields = {
            "shipping_method__name": ["exact", "icontains", "istartswith"],
            "channel__slug": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
            "is_active": ["exact"],
        }

    price = graphene.Field(
        Money,
        description="Price of the shipping method in the given channel.",
        required=True
    )
    minimum_order_price = graphene.Field(
        Money,
        description="Minimum order price to use this shipping method."
    )
    maximum_order_price = graphene.Field(
        Money,
        description="Maximum order price to use this shipping method."
    )

    @staticmethod
    def resolve_price(root: ShippingMethodChannelListing, _info):
        return root.price

    @staticmethod
    def resolve_minimum_order_price(root: ShippingMethodChannelListing, _info):
        return root.minimum_order_price if root.minimum_order_price_amount else None

    @staticmethod
    def resolve_maximum_order_price(root: ShippingMethodChannelListing, _info):
        return root.maximum_order_price if root.maximum_order_price_amount else None


class ShippingMethodTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodTranslation
        description = "Represents shipping method translations."
        interfaces = (relay.Node,)
        fields = "__all__"
        filterset_fields = {
            "language_code": ["exact"],
            "shipping_method__name": ["exact", "icontains", "istartswith"],
        }

    name = graphene.String(description="Translated shipping method name.")
    description = JSONString(description="Translated shipping method description.")

    @staticmethod
    def resolve_name(root: ShippingMethodTranslation, _info):
        return root.name

    @staticmethod
    def resolve_description(root: ShippingMethodTranslation, _info):
        return root.description