import graphene
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType  # Import the optimizer

from attribute.models.base import Attribute, AttributeValue

from .models import (
    Attribute,
    AttributeValue,
    AssignedPageAttributeValue,
    AttributePage,
    AssignedProductAttributeValue,
    AttributeProduct,
    AssignedVariantAttributeValue,
    AttributeVariant,
    AssignedVariantAttribute
)

# --- Node Types ---
class AttributeNode(OptimizedDjangoObjectType):
    class Meta:
        model = Attribute
        interfaces = (relay.Node,)
        filter_fields = {
            'slug': ['exact', 'icontains'],
            'name': ['exact', 'icontains'],
            'type': ['exact'],
            'input_type': ['exact'],
            'visible_in_storefront': ['exact'],
        }

class AttributeValueNode(OptimizedDjangoObjectType):
    class Meta:
        model = AttributeValue
        interfaces = (relay.Node,)
        filter_fields = {
            'name': ['exact', 'icontains'],
            'slug': ['exact'],
            'attribute__id': ['exact'],
        }

class AssignedPageAttributeValueNode(OptimizedDjangoObjectType):
    class Meta:
        model = AssignedPageAttributeValue
        interfaces = (relay.Node,)
        filter_fields = {
            'page__id': ['exact'],
            'value__id': ['exact'],
        }

class AttributePageNode(OptimizedDjangoObjectType):
    class Meta:
        model = AttributePage
        interfaces = (relay.Node,)
        filter_fields = {
            'page_type__id': ['exact'],
            'attribute__id': ['exact'],
        }

class AssignedProductAttributeValueNode(OptimizedDjangoObjectType):
    class Meta:
        model = AssignedProductAttributeValue
        interfaces = (relay.Node,)
        filter_fields = {
            'product__id': ['exact'],
            'value__id': ['exact'],
        }

class AttributeProductNode(OptimizedDjangoObjectType):
    class Meta:
        model = AttributeProduct
        interfaces = (relay.Node,)
        filter_fields = {
            'product_type__id': ['exact'],
            'attribute__id': ['exact'],
        }

class AssignedVariantAttributeValueNode(OptimizedDjangoObjectType):
    class Meta:
        model = AssignedVariantAttributeValue
        interfaces = (relay.Node,)
        filter_fields = {
            'assignment__id': ['exact'],
            'value__id': ['exact'],
        }

class AttributeVariantNode(OptimizedDjangoObjectType):
    class Meta:
        model = AttributeVariant
        interfaces = (relay.Node,)
        filter_fields = {
            'product_type__id': ['exact'],
            'attribute__id': ['exact'],
        }

class AssignedVariantAttributeNode(OptimizedDjangoObjectType):
    class Meta:
        model = AssignedVariantAttribute
        interfaces = (relay.Node,)
        filter_fields = {
            'variant__id': ['exact'],
            'assignment__id': ['exact'],
        }

  
