import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from attribute.models import (
    Attribute,
)  
from .types import AttributeNode, AttributeValueNode  # Adjust import path if necessary



# --- Query ---
class Query(graphene.ObjectType):
    attribute = relay.Node.Field(AttributeNode)
    all_attributes = DjangoFilterConnectionField(AttributeNode)
    
    attribute_value = relay.Node.Field(AttributeValueNode)
    all_attribute_values = DjangoFilterConnectionField(AttributeValueNode)

