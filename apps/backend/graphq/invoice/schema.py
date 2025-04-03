import graphene
from django_filters import FilterSet, OrderingFilter
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from graphq.core.types import Job, ModelObjectType
from invoice import models
from invoice.models import Invoice
from order.models import Order

from ..meta.types import ObjectWithMetadata


class InvoiceFilter(FilterSet):
    class Meta:
        model = Invoice

    order_by = OrderingFilter(fields=(("pk",),))  # Adjust ordering as needed


class InvoiceQuery(graphene.ObjectType):
    all_invoices = DjangoFilterConnectionField(
        InvoiceNode, filterset_class=InvoiceFilter
    )
    comment = Node.Field(InvoiceNode)

    @staticmethod
    def resolve_all_invoices(root, info):
        return Invoice.objects.select_related("order").all()
