import graphene

from ...channel import models as channel_models
from ...permission.enums import GiftcardPermissions, OrderPermissions
from ..channel.types import OrderSettings
from ..core.descriptions import DEPRECATED_IN_3X_FIELD, DEPRECATED_IN_3X_MUTATION
from ..core.doc_category import DOC_CATEGORY_GIFT_CARDS, DOC_CATEGORY_ORDERS
from ..core.fields import PermissionsField
from ..site.dataloaders import load_site_callback
from ..translations.mutations import ShopSettingsTranslate
from .mutations import (
    GiftCardSettingsUpdate,
    OrderSettingsUpdate,
    ShopAddressUpdate,
    ShopDomainUpdate,
    ShopFetchTaxRates,
    ShopSettingsUpdate,
    StaffNotificationRecipientCreate,
    StaffNotificationRecipientDelete,
    StaffNotificationRecipientUpdate,
)
from .types import GiftCardSettings, Shop


class ShopQueries(graphene.ObjectType):
    shop = graphene.Field(
        Shop,
        description="Return information about the shop.",
        required=True,
    )
    order_settings = PermissionsField(
        OrderSettings,
        description=(
            "Order related settings from site settings. "
            "Returns `orderSettings` for the first `channel` in "
            "alphabetical order."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} "
            "Use the `channel` query to fetch the `orderSettings` field instead."
        ),
        permissions=[OrderPermissions.MANAGE_ORDERS],
        doc_category=DOC_CATEGORY_ORDERS,
    )
    gift_card_settings = PermissionsField(
        GiftCardSettings,
        description="Gift card related settings from site settings.",
        required=True,
        permissions=[GiftcardPermissions.MANAGE_GIFT_CARD],
        doc_category=DOC_CATEGORY_GIFT_CARDS,
    )

    def resolve_shop(self, _info):
        return Shop()

    def resolve_order_settings(self, _info):
        channel = (
            channel_models.Channel.objects.filter(is_active=True)
            .order_by("slug")
            .first()
        )
        if channel is None:
            return None
        return OrderSettings(
            automatically_confirm_all_new_orders=(
                channel.automatically_confirm_all_new_orders
            ),
            automatically_fulfill_non_shippable_gift_card=(
                channel.automatically_fulfill_non_shippable_gift_card
            ),
        )

    @load_site_callback
    def resolve_gift_card_settings(self, _info, site):
        return site.settings


@traced_resolver
def resolve_available_shipping_methods(_info, *, channel_slug: str, address):
    instances = []
    available = ShippingMethod.objects.for_channel(channel_slug)
    if address and address.country:
        available = available.filter(
            shipping_zone__countries__contains=address.country,
        )
        available = filter_shipping_methods_by_postal_code_rules(
            available, Address(**address)
        )

    if available is not None:
        mapping = get_shipping_method_to_listing_mapping(available, channel_slug)
        instances += [
            convert_to_shipping_method_data(method, mapping[method.id])
            for method in available
        ]

    return instances


def resolve_countries(**kwargs):
    countries_filter = kwargs.get("filter", {})
    attached_to_shipping_zones = countries_filter.get("attached_to_shipping_zones")
    language_code = kwargs.get("language_code")
    taxes = {vat.country_code: vat for vat in VAT.objects.all()}
    codes_list = get_countries_codes_list(attached_to_shipping_zones)
    # DEPRECATED: translation.override will be dropped in
    with translation.override(language_code):
        return [
            CountryDisplay(
                code=country[0], country=country[1], vat=taxes.get(country[0])
            )
            for country in countries
            if country[0] in codes_list
        ]


def get_shipping_method_to_listing_mapping(shipping_methods, channel_slug):
    """Prepare mapping shipping method to its channel listings."""
    shipping_mapping = {}
    shipping_listings = ShippingMethodChannelListing.objects.filter(
        shipping_method__in=shipping_methods, channel__slug=channel_slug
    )
    for listing in shipping_listings:
        shipping_mapping[listing.shipping_method_id] = listing

    return shipping_mapping
