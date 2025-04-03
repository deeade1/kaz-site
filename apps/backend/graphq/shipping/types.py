import graphene
from django.db.models import QuerySet
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query

# Core utilities and types
from core.weight import convert_weight_to_default_weight_unit
from ..core.fields import JSONString
from ..core.tracing import traced_resolver
from ..core.types import (
    CountryDisplay,
    Money,
    MoneyRange,
    NonNullList,
    Weight,
)

# Product & Shipping models
from product import models as product_models
from shipping import models as shipping_models
from shipping.models import (
    ShippingMethod,
    ShippingZone,
    ShippingMethodPostalCodeRule,
    ShippingMethodTranslation,
    ShippingMethodChannelListing,
)
from shipping.interface import ShippingMethodData

# Channel & Context
from ..channel import ChannelQsContext
from ..channel.types import (
    Channel,
    ChannelContext,
    ChannelContextType,
    ChannelContextTypeWithMetadata,
    ChannelContextTypeWithMetadataForObjectType,
)

# Enums & Permissions
from ..account.enums import CountryCodeEnum
from .enums import PostalCodeRuleInclusionTypeEnum, ShippingMethodTypeEnum

# Tax, Warehouse, Translation
from ..tax.types import TaxClass
from ..warehouse.types import Warehouse
from ..translations.fields import TranslationField
from ..translations.types import ShippingMethodTranslation

# Shipping resolvers
from ..shipping.resolvers import resolve_price_range, resolve_shipping_translation


class ShippingZoneNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingZone
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "default": ["exact"],
            "countries": ["exact", "icontains"],
        }
        interfaces = (graphene.relay.Node,)

    price_range = graphene.Field(
        MoneyRange, 
        description="Lowest and highest prices for the shipping."
    )
    countries = graphene.List(
        CountryDisplay, 
        required=True, 
        description="List of countries in the shipping zone."
    )
    warehouses = graphene.List(
        lambda: Warehouse, 
        required=True, 
        description="List of warehouses for the shipping zone."
    )
    channels = graphene.List(
        lambda: Channel, 
        required=True, 
        description="List of channels for the shipping zone."
    )
    description = graphene.String(description="Description of a shipping zone.")

    @staticmethod
    def resolve_price_range(root, info):
        # Assuming price_range is computed per channel, adjust as per your logic.
        # You might need to pass channel_slug in context or arguments.
        # Here’s an example without specific channel logic.
        return root.get_shipping_methods_for_channel(
            channel_slug=info.context.channel.slug  # Adjust accordingly
        ).aggregate_price_range()

    @staticmethod
    def resolve_countries(root, info):
        from django_countries.fields import Country
        return [
            CountryDisplay(code=country_code, country=Country(country_code).name)
            for country_code in root.countries
        ]

    @staticmethod
    def resolve_warehouses(root, info):
        # Assuming a M2M relationship or related field 'warehouses' exists
        return root.warehouse_set.all()

    @staticmethod
    def resolve_channels(root, info):
        return root.channels.all()


class ShippingMethodNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethod
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "shipping_zone__name": ["exact", "icontains", "istartswith"],
            "tax_class__id": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    #translation = graphene.Field(ShippingMethodTranslation, resolver=resolve_shipping_translation)
    price = graphene.Field(Money, required=True)
    maximum_order_price = graphene.Field(Money)
    minimum_order_price = graphene.Field(Money)
    active = graphene.Boolean(required=True)
    message = graphene.String()
    country_code = graphene.Field(graphene.String, required=True)

    
    def resolve_maximum_order_weight(root, info):
        return convert_weight_to_default_weight_unit(root.maximum_order_weight)

    @staticmethod
    def resolve_minimum_order_weight(root, info):
        return convert_weight_to_default_weight_unit(root.minimum_order_weight)


class ShippingMethodPostalCodeRuleNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodPostalCodeRule
        fields = "__all__"
        filter_fields = {
            "start": ["exact", "icontains", "istartswith"],
            "end": ["exact", "icontains", "istartswith"],
            "inclusion_type": ["exact"],
            "shipping_method__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (graphene.relay.Node,)

    # Explicit fields definitions (optional but good for clarity and customization)
    start = graphene.String(description="Start of the postal code range.")
    end = graphene.String(description="End of the postal code range.")
    inclusion_type = graphene.Field(
        PostalCodeRuleInclusionTypeEnum,
        description="Specifies if the rule includes or excludes the postal code range.",
        required=True
    )

    @staticmethod
    def resolve_start(root, info):
        return root.start

    @staticmethod
    def resolve_end(root, info):
        return root.end

    @staticmethod
    def resolve_inclusion_type(root, info):
        return root.inclusion_type

class ShippingMethodChannelListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodChannelListing
        fields = "__all__"
        filter_fields = {
            "shipping_method__name": ["exact", "icontains", "istartswith"],
            "channel__slug": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    # Explicit fields
    channel = graphene.Field(Channel, required=True, description="Channel for the listing.")
    maximum_order_price = graphene.Field(
        Money,
        description="Maximum order price for which this shipping method is available."
    )
    minimum_order_price = graphene.Field(
        Money,
        description="Minimum order price for which this shipping method is available."
    )
    price = graphene.Field(
        Money,
        description="Shipping price for the channel."
    )

    @staticmethod
    def resolve_channel(root, info):
        # You already have FK; can safely access
        return root.channel

    @staticmethod
    def resolve_minimum_order_price(root, info):
        return root.minimum_order_price if root.minimum_order_price_amount else None

    @staticmethod
    def resolve_maximum_order_price(root, info):
        return root.maximum_order_price if root.maximum_order_price_amount else None

    @staticmethod
    def resolve_price(root, info):
        return root.price
 

class ShippingMethodTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = ShippingMethodTranslation
        fields = "__all__"
        filter_fields = {
            "language_code": ["exact"],
            "shipping_method__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (graphene.relay.Node,)

    name = graphene.String(description="Translated shipping method name.")
    description = graphene.JSONString(description="Translated description in JSON format.")
    language_code = graphene.String(description="Language code for the translation.")
    shipping_method = graphene.Field(
        lambda: ShippingMethodNode,
        description="Shipping method related to this translation."
    )

    @staticmethod
    def resolve_name(root, info):
        return root.name

    @staticmethod
    def resolve_description(root, info):
        return root.description

    @staticmethod
    def resolve_language_code(root, info):
        return root.language_code

    @staticmethod
    def resolve_shipping_method(root, info):
        return root.shipping_method
    

   
   

   