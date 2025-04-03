from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType

from giftcard.models import GiftCard, GiftCardEvent, GiftCardTag


class GiftCardEventNode(OptimizedDjangoObjectType):
    class Meta:
        model = GiftCardEvent
        fields = "__all__"
        filter_fields = {
            "type": ["exact", "icontains", "istartswith"],
            "date": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class GiftCardTagNode(OptimizedDjangoObjectType):
    class Meta:
        model = GiftCardTag
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class GiftCardNode(OptimizedDjangoObjectType):
    class Meta:
        model = GiftCard
        fields = "__all__"
        filter_fields = {
            "code": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)