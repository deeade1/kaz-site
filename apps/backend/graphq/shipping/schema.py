import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from ...permission.enums import ShippingPermissions
from ...shipping import models
from ..channel.types import ChannelContext
from ..core import ResolveInfo
from ..core.connection import create_connection_slice, filter_connection_queryset
from ..core.doc_category import DOC_CATEGORY_SHIPPING
from ..core.fields import FilterConnectionField, PermissionsField
from ..core.utils import from_global_id_or_error
from ..translations.mutations import ShippingPriceTranslate
from .bulk_mutations import ShippingPriceBulkDelete, ShippingZoneBulkDelete
from .filters import ShippingZoneFilterInput
from .mutations.channels import ShippingMethodChannelListingUpdate
from .mutations.shippings import (
    ShippingPriceCreate,
    ShippingPriceDelete,
    ShippingPriceExcludeProducts,
    ShippingPriceRemoveProductFromExclude,
    ShippingPriceUpdate,
    ShippingZoneCreate,
    ShippingZoneDelete,
    ShippingZoneUpdate,
)
from .resolvers import resolve_shipping_zones
from .types import (
    ShippingZoneNode, 
    ShippingMethodNode,
    ShippingMethodChannelListingNode,
    ShippingMethodTypeNode,
    ShippingMethodPostalCodeRuleNode
)


class ShippingQueries(graphene.ObjectType):
    # --- Shipping Zone Queries ---
    shipping_zone = Node.Field(
        ShippingZoneNode,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="Look up a shipping zone by ID.",
    )
    shipping_zones = DjangoFilterConnectionField(
        ShippingZoneNode,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="List of shipping zones."
    )

    # --- Shipping Method Queries ---
    shipping_method = Node.Field(
        ShippingMethodNode,
        description="Look up a shipping method by ID."
    )
    shipping_methods = DjangoFilterConnectionField(
        ShippingMethodNode,
        description="List of shipping methods."
    )

    # --- Shipping Method Postal Code Rule Queries ---
    shipping_method_postal_code_rule = Node.Field(
        ShippingMethodPostalCodeRuleNode,
        description="Look up a shipping method postal code rule by ID."
    )
    shipping_method_postal_code_rules = DjangoFilterConnectionField(
        ShippingMethodPostalCodeRuleNode,
        description="List of shipping method postal code rules."
    )

    # --- Shipping Method Channel Listing Queries ---
    shipping_method_channel_listing = Node.Field(
        ShippingMethodChannelListingNode,
        description="Look up a shipping method channel listing by ID."
    )
    shipping_method_channel_listings = DjangoFilterConnectionField(
        ShippingMethodChannelListingNode,
        description="List of shipping method channel listings."
    )

    # --- Shipping Method Translation Queries ---
    shipping_method_translation = Node.Field(
        ShippingMethodTranslationNode,
        description="Look up a shipping method translation by ID."
    )
    shipping_method_translations = DjangoFilterConnectionField(
        ShippingMethodTranslationNode,
        description="List of shipping method translations."
    )

    # ------------------- Resolvers -------------------

    @staticmethod
    def resolve_shipping_zone(root, info, id, channel=None):
        from graphql_relay import from_global_id
        try:
            _, obj_id = from_global_id(id)
            instance = models.ShippingZone.objects.filter(id=obj_id).first()
            return instance
        except Exception:
            return None

    @staticmethod
    def resolve_shipping_zones(root, info, channel=None, **kwargs):
        qs = models.ShippingZone.objects.all()
        if channel:
            qs = qs.filter(channels__slug=channel)
        qs = filter_queryset(qs, kwargs)
        return qs  # Directly return queryset

    @staticmethod
    def resolve_price_range(channel_slug):
        listings = models.ShippingMethodChannelListing.objects.filter(
            channel__slug=channel_slug
        )
        prices = [listing.get_total() for listing in listings]
        if prices:
            return MoneyRange(min(prices), max(prices))
        return None

    @staticmethod
    def resolve_shipping_translation(root, info, language_code):
        if getattr(root, "is_external", False):
            return None
        return resolve_translation(root, info, language_code=language_code)
