from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query
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


class CategoryNode(OptimizedDjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "description_plaintext": ["icontains", "istartswith"],
            "parent": ["exact"],
        }
        interfaces = (Node,)

    search_rank = graphene.Float()

    @classmethod
    def get_queryset(cls, queryset, info):
        search = info.context.GET.get('search')
        if search:
            from django.contrib.postgres.search import SearchQuery, SearchRank
            query = SearchQuery(search)
            queryset = queryset.annotate(
                rank=SearchRank(F('search_vector'), query)
            ).order_by('-rank')
        return query(queryset, info)


class CategoryTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = CategoryTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "language_code": ["exact"],
        }
        interfaces = (Node,)


class ProductTypeNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductType
        fields = "__all__"
        interfaces = (Node,)


class ProductNode(OptimizedDjangoObjectType):
    first_image = graphene.String()

    class Meta:
        model = Product
        fields = "__all__"
        interfaces = (Node,)

    @staticmethod
    def resolve_first_image(root, info):
        image = root.get_first_image()
        return image.image.url if image else None


class ProductTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "product__slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class ProductChannelListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductChannelListing
        fields = "__all__"
        filter_fields = {
            "product__name": ["exact", "icontains", "istartswith"],
            "channel__name": ["exact", "icontains", "istartswith"],
            "available_for_purchase_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ProductVariantNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductVariant
        fields = "__all__"
        filter_fields = {
            "sku": ["exact", "icontains", "istartswith"],
            "name": ["exact", "icontains", "istartswith"],
            "product": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "updated_at": ["exact", "gte", "lte"],
            "is_preorder": ["exact"],
        }
        interfaces = (Node,)


class ProductVariantTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductVariantTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "language_code": ["exact"],
        }
        interfaces = (Node,)


class ProductVariantChannelListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductVariantChannelListing
        fields = "__all__"
        filter_fields = {
            "currency": ["exact"],
            "price_amount": ["exact", "gte", "lte"],
            "cost_price_amount": ["exact", "gte", "lte"],
            "discounted_price_amount": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class DigitalContentNode(OptimizedDjangoObjectType):
    class Meta:
        model = DigitalContent
        fields = "__all__"
        filter_fields = {
            "content_type": ["exact"],
            "product_variant": ["exact"],
        }
        interfaces = (Node,)


class DigitalContentUrlNode(OptimizedDjangoObjectType):
    class Meta:
        model = DigitalContentUrl
        fields = "__all__"
        filter_fields = {
            "token": ["exact"],
            "content": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class ProductMediaNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductMedia
        fields = "__all__"
        filter_fields = {
            "alt": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "external_url": ["icontains"],
        }
        interfaces = (Node,)


class VariantMediaNode(OptimizedDjangoObjectType):
    class Meta:
        model = VariantMedia
        fields = "__all__"
        filter_fields = {
            "variant__id": ["exact"],
            "media__id": ["exact"],
        }
        interfaces = (Node,)


class CollectionProductNode(OptimizedDjangoObjectType):
    class Meta:
        model = CollectionProduct
        fields = "__all__"
        filter_fields = {
            "collection__id": ["exact"],
            "product__id": ["exact"],
        }
        interfaces = (Node,)


class CollectionNode(OptimizedDjangoObjectType):
    class Meta:
        model = Collection
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains"],
            "background_image_alt": ["exact", "icontains"],
            "description": ["exact", "icontains"],
        }
        interfaces = (Node,)


class CollectionChannelListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = CollectionChannelListing
        fields = "__all__"
        filter_fields = {
            "collection": ["exact"],
            "channel": ["exact"],
        }
        interfaces = (Node,)


class CollectionTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = CollectionTranslation
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "collection": ["exact"],
        }
        interfaces = (Node,)