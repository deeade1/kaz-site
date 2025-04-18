from typing import List, TypeVar

import graphene
from django.conf import settings
from django.db.models import Model

x
from ...attribute import AttributeInputType
from ...attribute import models as attribute_models
from ...attribute.models import AttributeValue
from ...discount import models as discount_models
from ...menu import models as menu_models
from ...page import models as page_models
from ...permission.enums import DiscountPermissions, ShippingPermissions
from ...product import models as product_models
from ...shipping import models as shipping_models
from ...site import models as site_models
from ..attribute.dataloaders import AttributesByAttributeId
from ..channel import ChannelContext
from ..core.descriptions import ADDED_IN_39, DEPRECATED_IN_3X_FIELD, RICH_CONTENT
from ..core.enums import LanguageCodeEnum
from ..core.fields import JSONString, PermissionsField
from ..core.tracing import traced_resolver
from ..core.types import LanguageDisplay, ModelObjectType, NonNullList
from ..core.utils import str_to_enum
from ..page.dataloaders import SelectedAttributesByPageIdLoader
from ..product.dataloaders import (
    SelectedAttributesByProductIdLoader,
    SelectedAttributesByProductVariantIdLoader,
)
from .fields import TranslationField


def get_translatable_attribute_values(attributes: list) -> List[AttributeValue]:
    """Filter the list of passed attributes.

    Return those which are translatable attributes.
    """
    translatable_values: List[AttributeValue] = []
    for assignment in attributes:
        attr = assignment["attribute"]
        if attr.input_type in AttributeInputType.TRANSLATABLE_ATTRIBUTES:
            translatable_values.extend(assignment["values"])
    return translatable_values


T = TypeVar("T", bound=Model)


class BaseTranslationType(ModelObjectType[T]):
    language = graphene.Field(
        LanguageDisplay, description="Translation language.", required=True
    )

    class Meta:
        abstract = True

    @staticmethod
    @traced_resolver
    def resolve_language(root, _info):
        try:
            language = next(
                language[1]
                for language in settings.LANGUAGES
                if language[0] == root.language_code
            )
        except StopIteration:
            return None
        return LanguageDisplay(
            code=LanguageCodeEnum[str_to_enum(root.language_code)], language=language
        )


class AttributeValueTranslation(
    BaseTranslationType[attribute_models.AttributeValueTranslation]
):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    rich_text = JSONString(description="Attribute value." + RICH_CONTENT)
    plain_text = graphene.String(description="Attribute plain text value.")

    class Meta:
        model = attribute_models.AttributeValueTranslation
        interfaces = [graphene.relay.Node]


class AttributeTranslation(BaseTranslationType[attribute_models.AttributeTranslation]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)

    class Meta:
        model = attribute_models.AttributeTranslation
        interfaces = [graphene.relay.Node]


class AttributeTranslatableContent(ModelObjectType[attribute_models.Attribute]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    translation = TranslationField(AttributeTranslation, type_name="attribute")
    attribute = graphene.Field(
        "saleor.graphql.attribute.types.Attribute",
        description="Custom attribute of a product.",
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )

    class Meta:
        model = attribute_models.Attribute
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_attribute(root: attribute_models.Attribute, _info):
        return root


class AttributeValueTranslatableContent(
    ModelObjectType[attribute_models.AttributeValue]
):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    rich_text = JSONString(description="Attribute value." + RICH_CONTENT)
    plain_text = graphene.String(description="Attribute plain text value.")
    translation = TranslationField(
        AttributeValueTranslation, type_name="attribute value"
    )
    attribute_value = graphene.Field(
        "saleor.graphql.attribute.types.AttributeValue",
        description="Represents a value of an attribute.",
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )
    attribute = graphene.Field(
        AttributeTranslatableContent,
        description="Associated attribute that can be translated." + ADDED_IN_39,
    )

    class Meta:
        model = attribute_models.AttributeValue
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_attribute_value(root: attribute_models.AttributeValue, _info):
        return root

    @staticmethod
    def resolve_attribute(root: attribute_models.AttributeValue, info):
        return AttributesByAttributeId(info.context).load(root.attribute_id)


class ProductVariantTranslation(
    BaseTranslationType[product_models.ProductVariantTranslation]
):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)

    class Meta:
        model = product_models.ProductVariantTranslation
        interfaces = [graphene.relay.Node]


class ProductVariantTranslatableContent(ModelObjectType[product_models.ProductVariant]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    translation = TranslationField(
        ProductVariantTranslation, type_name="product variant"
    )
    product_variant = graphene.Field(
        "saleor.graphql.product.types.products.ProductVariant",
        description=(
            "Represents a version of a product such as different size or color."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )
    attribute_values = NonNullList(
        AttributeValueTranslatableContent,
        required=True,
        description="List of product variant attribute values that can be translated.",
    )

    class Meta:
        model = product_models.ProductVariant
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_product_variant(root: product_models.ProductVariant, info):
        return ChannelContext(node=root, channel_slug=None)

    @staticmethod
    def resolve_attribute_values(root: product_models.ProductVariant, info):
        return (
            SelectedAttributesByProductVariantIdLoader(info.context)
            .load(root.id)
            .then(get_translatable_attribute_values)
        )


class ProductTranslation(BaseTranslationType[product_models.ProductTranslation]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String()
    description = JSONString(
        description="Translated description of the product." + RICH_CONTENT
    )
    description_json = JSONString(
        description="Translated description of the product." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )

    class Meta:
        model = product_models.ProductTranslation
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_description_json(root: product_models.ProductTranslation, _info):
        description = root.description
        return description if description is not None else {}


class ProductTranslatableContent(ModelObjectType[product_models.Product]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String(required=True)
    description = JSONString(description="Description of the product." + RICH_CONTENT)
    description_json = JSONString(
        description="Description of the product." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )
    translation = TranslationField(ProductTranslation, type_name="product")
    product = graphene.Field(
        "saleor.graphql.product.types.products.Product",
        description="Represents an individual item for sale in the storefront.",
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )
    attribute_values = NonNullList(
        AttributeValueTranslatableContent,
        required=True,
        description="List of product attribute values that can be translated.",
    )

    class Meta:
        model = product_models.Product
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_product(root: product_models.Product, info):
        return ChannelContext(node=root, channel_slug=None)

    @staticmethod
    def resolve_description_json(root: product_models.Product, _info):
        description = root.description
        return description if description is not None else {}

    @staticmethod
    def resolve_attribute_values(root: product_models.Product, info):
        return (
            SelectedAttributesByProductIdLoader(info.context)
            .load(root.id)
            .then(get_translatable_attribute_values)
        )


class CollectionTranslation(BaseTranslationType[product_models.CollectionTranslation]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String()
    description = JSONString(
        description="Translated description of the collection." + RICH_CONTENT
    )
    description_json = JSONString(
        description="Translated description of the collection." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )

    class Meta:
        model = product_models.CollectionTranslation
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_description_json(root: product_models.CollectionTranslation, _info):
        description = root.description
        return description if description is not None else {}


class CollectionTranslatableContent(ModelObjectType[product_models.Collection]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String(required=True)
    description = JSONString(
        description="Description of the collection." + RICH_CONTENT
    )
    description_json = JSONString(
        description="Description of the collection." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )
    translation = TranslationField(CollectionTranslation, type_name="collection")
    collection = graphene.Field(
        "saleor.graphql.product.types.collections.Collection",
        description="Represents a collection of products.",
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )

    class Meta:
        model = product_models.Collection
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_collection(root: product_models.Collection, info):
        collection = product_models.Collection.objects.all().filter(pk=root.id).first()
        return (
            ChannelContext(node=collection, channel_slug=None) if collection else None
        )

    @staticmethod
    def resolve_description_json(root: product_models.Collection, _info):
        description = root.description
        return description if description is not None else {}


class CategoryTranslation(BaseTranslationType[product_models.CategoryTranslation]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String()
    description = JSONString(
        description="Translated description of the category." + RICH_CONTENT
    )
    description_json = JSONString(
        description="Translated description of the category." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )

    class Meta:
        model = product_models.CategoryTranslation
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_description_json(root: product_models.CategoryTranslation, _info):
        description = root.description
        return description if description is not None else {}


class CategoryTranslatableContent(ModelObjectType[product_models.Category]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    name = graphene.String(required=True)
    description = JSONString(description="Description of the category." + RICH_CONTENT)
    description_json = JSONString(
        description="Description of the category." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )
    translation = TranslationField(CategoryTranslation, type_name="category")
    category = graphene.Field(
        "saleor.graphql.product.types.categories.Category",
        description="Represents a single category of products.",
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )

    class Meta:
        model = product_models.Category
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_category(root: product_models.Category, _info):
        return root

    @staticmethod
    def resolve_description_json(root: product_models.Category, _info):
        description = root.description
        return description if description is not None else {}


class PageTranslation(BaseTranslationType[page_models.PageTranslation]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    title = graphene.String()
    content = JSONString(description="Translated content of the page." + RICH_CONTENT)
    content_json = JSONString(
        description="Translated description of the page." + RICH_CONTENT,
        deprecation_reason=f"{DEPRECATED_IN_3X_FIELD} Use the `content` field instead.",
    )

    class Meta:
        model = page_models.PageTranslation
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_content_json(root: page_models.PageTranslation, _info):
        content = root.content
        return content if content is not None else {}


class PageTranslatableContent(ModelObjectType[page_models.Page]):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    title = graphene.String(required=True)
    content = JSONString(description="Content of the page." + RICH_CONTENT)
    content_json = JSONString(
        description="Content of the page." + RICH_CONTENT,
        deprecation_reason=f"{DEPRECATED_IN_3X_FIELD} Use the `content` field instead.",
    )
    translation = TranslationField(PageTranslation, type_name="page")
    page = graphene.Field(
        "saleor.graphql.page.types.Page",
        description=(
            "A static page that can be manually added by a shop operator "
            "through the dashboard."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )
    attribute_values = NonNullList(
        AttributeValueTranslatableContent,
        required=True,
        description="List of page content attribute values that can be translated.",
    )

    class Meta:
        model = page_models.Page
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_page(root: page_models.Page, info):
        return (
            page_models.Page.objects.visible_to_user(info.context.user)
            .filter(pk=root.id)
            .first()
        )

    @staticmethod
    def resolve_content_json(root: page_models.Page, _info):
        content = root.content
        return content if content is not None else {}

    @staticmethod
    def resolve_attribute_values(root: page_models.Page, info):
        return (
            SelectedAttributesByPageIdLoader(info.context)
            .load(root.id)
            .then(get_translatable_attribute_values)
        )


class VoucherTranslation(BaseTranslationType[discount_models.VoucherTranslation]):
    id = graphene.GlobalID(required=True)
    name = graphene.String()

    class Meta:
        model = discount_models.VoucherTranslation
        interfaces = [graphene.relay.Node]


class VoucherTranslatableContent(ModelObjectType[discount_models.Voucher]):
    id = graphene.GlobalID(required=True)
    name = graphene.String()
    translation = TranslationField(VoucherTranslation, type_name="voucher")
    voucher = PermissionsField(
        "saleor.graphql.discount.types.Voucher",
        description=(
            "Vouchers allow giving discounts to particular customers on categories, "
            "collections or specific products. They can be used during checkout by "
            "providing valid voucher codes."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
    )

    class Meta:
        model = discount_models.Voucher
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_voucher(root: discount_models.Voucher, _info):
        return ChannelContext(node=root, channel_slug=None)


class SaleTranslation(BaseTranslationType[discount_models.SaleTranslation]):
    id = graphene.GlobalID(required=True)
    name = graphene.String()

    class Meta:
        model = discount_models.SaleTranslation
        interfaces = [graphene.relay.Node]


class SaleTranslatableContent(ModelObjectType[discount_models.Sale]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    translation = TranslationField(SaleTranslation, type_name="sale")
    sale = PermissionsField(
        "saleor.graphql.discount.types.Sale",
        description=(
            "Sales allow creating discounts for categories, collections "
            "or products and are visible to all the customers."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
    )

    class Meta:
        model = discount_models.Sale
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_sale(root: discount_models.Sale, _info):
        return ChannelContext(node=root, channel_slug=None)


class ShopTranslation(BaseTranslationType[site_models.SiteSettingsTranslation]):
    id = graphene.GlobalID(required=True)
    header_text = graphene.String(required=True)
    description = graphene.String(required=True)

    class Meta:
        model = site_models.SiteSettingsTranslation
        interfaces = [graphene.relay.Node]


class MenuItemTranslation(BaseTranslationType[menu_models.MenuItemTranslation]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)

    class Meta:
        model = menu_models.MenuItemTranslation
        interfaces = [graphene.relay.Node]


class MenuItemTranslatableContent(ModelObjectType[menu_models.MenuItem]):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    translation = TranslationField(MenuItemTranslation, type_name="menu item")
    menu_item = graphene.Field(
        "saleor.graphql.menu.types.MenuItem",
        description=(
            "Represents a single item of the related menu. Can store categories, "
            "collection or pages."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
    )

    class Meta:
        model = menu_models.MenuItem
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_menu_item(root: menu_models.MenuItem, _info):
        return ChannelContext(node=root, channel_slug=None)


class ShippingMethodTranslation(
    BaseTranslationType[shipping_models.ShippingMethodTranslation]
):
    id = graphene.GlobalID(required=True)
    name = graphene.String()
    description = JSONString(
        description="Translated description of the shipping method." + RICH_CONTENT
    )

    class Meta:
        model = shipping_models.ShippingMethodTranslation
        interfaces = [graphene.relay.Node]


class ShippingMethodTranslatableContent(
    ModelObjectType[shipping_models.ShippingMethod]
):
    id = graphene.GlobalID(required=True)
    name = graphene.String(required=True)
    description = JSONString(
        description="Description of the shipping method." + RICH_CONTENT
    )
    translation = TranslationField(
        ShippingMethodTranslation, type_name="shipping method"
    )
    shipping_method = PermissionsField(
        "saleor.graphql.shipping.types.ShippingMethodType",
        description=(
            "Shipping method are the methods you'll use to get customer's orders "
            " to them. They are directly exposed to the customers."
        ),
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Get model fields from the root level queries."
        ),
        permissions=[
            ShippingPermissions.MANAGE_SHIPPING,
        ],
    )

    class Meta:
        model = shipping_models.ShippingMethod
        interfaces = [graphene.relay.Node]

    @staticmethod
    def resolve_shipping_method(root: shipping_models.ShippingMethod, _info):
        return ChannelContext(node=root, channel_slug=None)


from graphene import Node
from graphene_django import DjangoObjectType

from blog.models import Category, Comment, Post, Reply, Tag


class AttributeTranslationNode(DjangoObjectType):
    class Meta:
        model = AttributeTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class AttributeTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = AttributeTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class AttributeValueTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = AttributeValueTranslatableContent
        fields = "__all__"
        filter_fields = {
            "post": ["exact"],
            "name": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ProductVariantTranslationNode(DjangoObjectType):
    class Meta:
        model = ProductVariantTranslation
        fields = "__all__"
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "subtitle": ["exact", "icontains", "istartswith"],
            "publish_date": ["exact", "gte", "lte"],
            "category": ["exact"],
            "author": ["exact"],
        }
        interfaces = (Node,)


class ProductVariantTranslatableContentNode(DjangoObjectType):

    class Meta:
        model = ProductVariantTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ProductTranslationNode(DjangoObjectType):
    class Meta:
        model = ProductTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class ProductTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = ProductTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class CollectionTranslationNode(DjangoObjectType):
    class Meta:
        model = CollectionTranslation
        fields = "__all__"
        filter_fields = {
            "post": ["exact"],
            "name": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class CollectionTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = CollectionTranslatableContent
        fields = "__all__"
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "subtitle": ["exact", "icontains", "istartswith"],
            "publish_date": ["exact", "gte", "lte"],
            "category": ["exact"],
            "author": ["exact"],
        }
        interfaces = (Node,)


class CategoryTranslationNode(DjangoObjectType):
    class Meta:
        model = CategoryTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class CategoryTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = CategoryTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class PageTranslationNode(DjangoObjectType):
    class Meta:
        model = PageTranslationCategory
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class PageTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = PageTranslatableContent
        fields = "__all__"
        filter_fields = {
            "post": ["exact"],
            "name": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class VoucherTranslationNode(DjangoObjectType):
    class Meta:
        model = VoucherTranslation
        fields = "__all__"
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "subtitle": ["exact", "icontains", "istartswith"],
            "publish_date": ["exact", "gte", "lte"],
            "category": ["exact"],
            "author": ["exact"],
        }
        interfaces = (Node,)


class VoucherTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = VoucherTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class SaleTranslationNode(DjangoObjectType):
    class Meta:
        model = SaleTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class SaleTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = SaleTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ShopTranslationNode(DjangoObjectType):
    class Meta:
        model = ShopTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class MenuItemTranslationNode(DjangoObjectType):
    class Meta:
        model = MenuItemTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class MenuItemTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = MenuItemTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ShippingMethodTranslationNode(DjangoObjectType):
    class Meta:
        model = ShippingMethodTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ShippingMethodTranslatableContentNode(DjangoObjectType):
    class Meta:
        model = ShippingMethodTranslatableContent
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)
