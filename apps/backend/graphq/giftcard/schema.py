import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphql.error import GraphQLError
from permission.enums import GiftcardPermissions

from giftcard import models
from graphq.giftcard.types import GiftCardNode, GiftCardTagNode

from ...giftcard.resolvers import (
    resolve_gift_card,
    resolve_gift_card_tags,
    resolve_gift_cards,
)
from ..core.types import NonNullList
from ..core.utils import filter_connection_queryset, from_global_id_or_error


class GiftCardQueries(graphene.ObjectType):
    gift_card = Node.Field(
        GiftCardNode,
    )
    gift_cards = DjangoFilterConnectionField(
        GiftCardNode,
    )
    gift_card_currencies = DjangoFilterConnectionField(GiftCardNode)
    gift_card_tags = DjangoFilterConnectionField(
        GiftCardTagNode,
    )

    @staticmethod
    def resolve_gift_card(_root, info, id: str):
        _, id = from_global_id_or_error(id, models.GiftCard)
        return resolve_gift_card(id)

    @staticmethod
    def resolve_gift_cards(root, info, sort_by=None, filter=None, **kwargs):
        sorting_by_balance = sort_by and "current_balance_amount" in sort_by.get(
            "field", []
        )
        filtering_by_currency = filter and "currency" in filter
        if sorting_by_balance and not filtering_by_currency:
            raise GraphQLError("Sorting by balance requires filtering by currency.")
        return resolve_gift_cards()

    @staticmethod
    def resolve_gift_card_currencies(_root, _info):
        return set(models.GiftCard.objects.values_list("currency", flat=True))

    @staticmethod
    def resolve_gift_card_tags(_root, info, **data):
        return resolve_gift_card_tags()

    def resolve_gift_card(id):
        return models.GiftCard.objects.filter(pk=id).first()

    def resolve_gift_cards():
        return models.GiftCard.objects.all()

    def resolve_gift_card_tags():
        return models.GiftCardTag.objects.all()
