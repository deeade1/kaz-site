from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query
from django.contrib.postgres.search import SearchQuery, SearchRank
from django.db.models import F

from product.models import (
    Category,
    CategoryTranslation,
    Collection,
    CollectionChannelListing,
    CollectionProduct,
    CollectionTranslation,
    DigitalContent,
    DigitalContentUrl,
    Product,
    ProductChannelListing,
    ProductMedia,
    ProductTranslation,
    ProductType,
    ProductVariant,
    ProductVariantChannelListing,
    ProductVariantTranslation,
    VariantMedia,
)


class BaseNode(OptimizedDjangoObjectType):
    """Base node with common configurations"""
    class Meta:
        abstract = True
        interfaces = (Node,)
        fields = "__all__"


class CategoryNode(BaseNode):
    search_rank = graphene.Float()

    class Meta(BaseNode.Meta):
        model = Category
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "description_plaintext": ["icontains", "istartswith"],
            "parent": ["exact"],
        }

    @classmethod
    def get_queryset(cls, queryset, info):
        if search := info.context.GET.get('search'):
            queryset = queryset.annotate(
                rank=SearchRank(F('search_vector'), SearchQuery(search))
            ).order_by('-rank')
        return query(queryset, info)


class TranslationNode(BaseNode):
    """Base node for translation models"""
    class Meta(BaseNode.Meta):
        abstract = True
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "language_code": ["exact"],
        }


class CategoryTranslationNode(TranslationNode):
    class Meta(TranslationNode.Meta):
        model = CategoryTranslation


class ProductTypeNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = ProductType


class ProductNode(BaseNode):
    first_image = graphene.String()

    class Meta(BaseNode.Meta):
        model = Product

    @staticmethod
    def resolve_first_image(root, info):
        if image := root.get_first_image():
            return image.image.url
        return None


class ProductTranslationNode(TranslationNode):
    class Meta(TranslationNode.Meta):
        model = ProductTranslation
        filter_fields = {
            **TranslationNode.Meta.filter_fields,
            "product__slug": ["exact", "icontains", "istartswith"],
        }


class ProductChannelListingNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = ProductChannelListing
        filter_fields = {
            "product__name": ["exact", "icontains", "istartswith"],
            "channel__name": ["exact", "icontains", "istartswith"],
            "available_for_purchase_at": ["exact", "gte", "lte"],
        }


class ProductVariantNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = ProductVariant
        filter_fields = {
            "sku": ["exact", "icontains", "istartswith"],
            "name": ["exact", "icontains", "istartswith"],
            "product": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "updated_at": ["exact", "gte", "lte"],
            "is_preorder": ["exact"],
        }


class ProductVariantTranslationNode(TranslationNode):
    class Meta(TranslationNode.Meta):
        model = ProductVariantTranslation


class ProductVariantChannelListingNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = ProductVariantChannelListing
        filter_fields = {
            "currency": ["exact"],
            "price_amount": ["exact", "gte", "lte"],
            "cost_price_amount": ["exact", "gte", "lte"],
            "discounted_price_amount": ["exact", "gte", "lte"],
        }


class DigitalContentNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = DigitalContent
        filter_fields = {
            "content_type": ["exact"],
            "product_variant": ["exact"],
        }


class DigitalContentUrlNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = DigitalContentUrl
        filter_fields = {
            "token": ["exact"],
            "content": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }


class ProductMediaNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = ProductMedia
        filter_fields = {
            "alt": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "external_url": ["icontains"],
        }


class VariantMediaNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = VariantMedia
        filter_fields = {
            "variant__id": ["exact"],
            "media__id": ["exact"],
        }


class CollectionProductNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = CollectionProduct
        filter_fields = {
            "collection__id": ["exact"],
            "product__id": ["exact"],
        }


class CollectionNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = Collection
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains"],
            "background_image_alt": ["exact", "icontains"],
            "description": ["exact", "icontains"],
        }


class CollectionChannelListingNode(BaseNode):
    class Meta(BaseNode.Meta):
        model = CollectionChannelListing
        filter_fields = {
            "collection": ["exact"],
            "channel": ["exact"],
        }


class CollectionTranslationNode(TranslationNode):
    class Meta(TranslationNode.Meta):
        model = CollectionTranslation
        filter_fields = {
            **TranslationNode.Meta.filter_fields,
            "collection": ["exact"],
        }