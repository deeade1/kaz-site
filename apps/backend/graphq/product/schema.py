from typing import List, Optional
import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphql.product.types import (
    CategoryNode,
    CollectionNode,
    CollectionTranslationNode,
    DigitalContentNode,
    ProductNode,
    ProductTypeNode,
    ProductVariantNode,
)
from product import models
from product.search import search_products
from ..core.types import NonNullList


class ProductQueries(graphene.ObjectType):
    digital_content = Node.Field(DigitalContentNode)
    digital_contents = DjangoFilterConnectionField(DigitalContentNode)
    categories = DjangoFilterConnectionField(CategoryNode, level=graphene.Int())
    category = Node.Field(CategoryNode, id=graphene.ID(), slug=graphene.String())
    collection = Node.Field(CollectionNode, id=graphene.ID(), slug=graphene.String(), channel=graphene.String())
    collections = DjangoFilterConnectionField(CollectionNode, channel=graphene.String())
    collection_translation = Node.Field(CollectionTranslationNode, id=graphene.ID())
    product = Node.Field(ProductNode)
    products = DjangoFilterConnectionField(ProductNode, search=graphene.String(), channel=graphene.String())
    product_type = Node.Field(ProductTypeNode)
    product_types = DjangoFilterConnectionField(ProductTypeNode)
    product_variant = Node.Field(ProductVariantNode, id=graphene.ID(), sku=graphene.String(), channel=graphene.String())
    product_variants = DjangoFilterConnectionField(ProductVariantNode, ids=NonNullList(graphene.ID), channel=graphene.String())


def resolve_categories(root, info, level=None, **kwargs):
    qs = models.Category.objects.all()
    if level is not None:
        qs = qs.filter(level=level)
    return qs


def resolve_category(root, info, id=None, slug=None):
    if id:
        return models.Category.objects.filter(id=id).first()
    elif slug:
        return models.Category.objects.filter(slug=slug).first()
    return None


def resolve_collection(root, info, id=None, slug=None, channel_slug=None):
    requestor = info.context.user
    qs = models.Collection.objects.visible_to_user(requestor, channel_slug)
    if id:
        return qs.filter(id=id).first()
    elif slug:
        return qs.filter(slug=slug).first()
    return None


def resolve_collections(root, info, channel_slug=None):
    requestor = info.context.user
    qs = models.Collection.objects.visible_to_user(requestor, channel_slug)
    return qs


def resolve_digital_content(root, info, id=None):
    return models.DigitalContent.objects.filter(pk=id).first()


def resolve_digital_contents(root, info):
    return models.DigitalContent.objects.all()


def resolve_product(root, info, id=None, slug=None, channel_slug=None):
    requestor = info.context.user
    qs = models.Product.objects.visible_to_user(requestor, channel_slug)
    if id:
        return qs.filter(id=id).first()
    elif slug:
        return qs.filter(slug=slug).first()
    return None


def resolve_products(root, info, search=None, channel_slug=None):
    qs = models.Product.objects.all()
    if channel_slug:
        qs = qs.visible_in_channel(channel_slug)
    if search:
        qs = search_products(qs, search)
    return qs


def resolve_product_type(root, info, id=None):
    return models.ProductType.objects.filter(pk=id).first()


def resolve_product_types(root, info):
    return models.ProductType.objects.all()


def resolve_product_variant(root, info, id=None, sku=None, channel_slug=None):
    requestor = info.context.user
    qs = models.ProductVariant.objects.filter(product__in=models.Product.objects.visible_to_user(requestor, channel_slug))
    if id:
        return qs.filter(pk=id).first()
    elif sku:
        return qs.filter(sku=sku).first()
    return None


def resolve_product_variants(root, info, ids=None, channel_slug=None):
    requestor = info.context.user
    qs = models.ProductVariant.objects.filter(product__in=models.Product.objects.visible_to_user(requestor, channel_slug))
    if ids:
        qs = qs.filter(pk__in=ids)
    return qs