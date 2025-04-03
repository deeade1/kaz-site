import graphene
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType  # Import the optimizer

from channel.models import Channel


class ChannelNode(OptimizedDjangoObjectType):  # Use OptimizedDjangoObjectType
    class Meta:
        model = Channel
        fields = "__all__"  # Expose all fields of the Channel model
        filterset_fields = {
            "name": ["exact"],
            "slug": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
        }
        interfaces = (Node,)