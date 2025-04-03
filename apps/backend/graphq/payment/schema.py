import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from core.doc_category import DOC_CATEGORY_PAYMENTS
from graphq.payment.types import (
    PaymentNode,
    TransactionEventNode,
    TransactionItemNode,
    TransactionNode,
)
from payment.models import Payment, TransactionItem

from ..constants import DOC_CATEGORY_PAYMENTS


class PaymentQueries(graphene.ObjectType):
    payment = Node.Field(
        PaymentNode,
        description="Look up a payment by ID.",
        doc_category=DOC_CATEGORY_PAYMENTS,
    )
    payments = DjangoFilterConnectionField(
        PaymentNode,
        description="List of payments.",
        doc_category=DOC_CATEGORY_PAYMENTS,
    )
    transaction = Node.Field(
        TransactionItemNode,
        description="Look up a transaction by ID.",
        doc_category=DOC_CATEGORY_PAYMENTS,
    )

    def resolve_payment(root, info, id):
        return Payment.objects.filter(id=id).first()

    def resolve_payments(root, info, **kwarg):
        requestor = get_user_or_app_from_context(info.context)
        payments = Payment.objects.all()
        if isinstance(requestor, app_models.App):
            return payments
        accessible_channels = get_user_accessible_channels(info, requestor)
        channel_ids = [channel.id for channel in accessible_channels]
        orders = Order.objects.filter(channel_id__in=channel_ids)
        return payments.filter(order_id__in=orders.values("id"))

    def resolve_transaction(root, info, id):
        if id.isdigit():
            query_params = {"id": id, "use_old_id": True}
        else:
            query_params = {"token": id}
        return TransactionItem.objects.filter(**query_params).first()
