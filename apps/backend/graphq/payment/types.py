from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType

from payment.models import Payment, Transaction, TransactionEvent, TransactionItem


class TransactionNode(OptimizedDjangoObjectType):
    class Meta:
        model = Transaction
        fields = "__all__"
        filter_fields = {
            "kind": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "is_success": ["exact"],
        }
        interfaces = (Node,)


class PaymentNode(OptimizedDjangoObjectType):
    class Meta:
        model = Payment
        fields = "__all__"
        filter_fields = {
            "gateway": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
            "charge_status": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class TransactionEventNode(OptimizedDjangoObjectType):
    class Meta:
        model = TransactionEvent
        fields = "__all__"
        filter_fields = {
            "status": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "type": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class TransactionItemNode(OptimizedDjangoObjectType):
    class Meta:
        model = TransactionItem
        fields = "__all__"
        filter_fields = {
            "status": ["exact", "icontains", "istartswith"],
            "currency": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)