import graphene
from django_filters import FilterSet, OrderingFilter
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query
from graphql import GraphQLError
from orders.models import (
    Fulfillment,
    FulfillmentLine,
    Order,
    OrderEvent,
    OrderGrantedRefund,
    OrderLine,
)


class OrderFilter(FilterSet):
    class Meta:
        model = Order
        fields = {
            "id": ["exact"],
            "number": ["exact", "icontains"],
            "status": ["exact", "icontains"],
            "user_email": ["exact", "icontains"],
            "created_at": ["exact", "gt", "lt"],
            "updated_at": ["exact", "gt", "lt"],
        }

    order_by = OrderingFilter(
        fields=[
            ("created_at", "created_at"),
            ("updated_at", "updated_at"),
            ("number", "number"),
        ]
    )


class OrderNode(OptimizedDjangoObjectType):
    class Meta:
        model = Order
        fields = "__all__"
        filterset_class = OrderFilter
        interfaces = (graphene.relay.Node,)


class OrderLineNode(OptimizedDjangoObjectType):
    class Meta:
        model = OrderLine
        fields = "__all__"
        filter_fields = {
            "product_name": ["exact", "icontains", "istartswith"],
            "variant_name": ["exact", "icontains", "istartswith"],
            "product_sku": ["exact", "icontains", "istartswith"],
            "order": ["exact"],
            "quantity": ["exact", "gt", "lt"],
            "is_shipping_required": ["exact"],
            "is_gift_card": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    quantity_unfulfilled = graphene.Int(
        description="Quantity unfulfilled for the order line."
    )
    is_digital = graphene.Boolean(description="Is the order line digital.")

    @staticmethod
    def resolve_quantity_unfulfilled(root, info):
        return root.quantity_unfulfilled

    @staticmethod
    def resolve_is_digital(root, info):
        return root.is_digital


class FulfillmentNode(OptimizedDjangoObjectType):
    class Meta:
        model = Fulfillment
        fields = "__all__"
        filter_fields = {
            "order": ["exact"],
            "status": ["exact", "icontains", "istartswith"],
            "tracking_number": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (graphene.relay.Node,)


class FulfillmentLineNode(OptimizedDjangoObjectType):
    class Meta:
        model = FulfillmentLine
        fields = "__all__"
        filter_fields = {
            "order_line": ["exact"],
            "fulfillment": ["exact"],
            "quantity": ["exact", "gte", "lte"],
            "stock": ["exact"],
        }
        interfaces = (graphene.relay.Node,)


class OrderEventNode(OptimizedDjangoObjectType):
    class Meta:
        model = OrderEvent
        fields = "__all__"
        filter_fields = {
            "order": ["exact"],
            "type": ["exact", "icontains", "istartswith"],
            "parameters": ["icontains"],
            "date": ["exact", "gte", "lte"],
            "user": ["exact"],
        }
        interfaces = (graphene.relay.Node,)


class OrderGrantedRefundNode(OptimizedDjangoObjectType):
    class Meta:
        model = OrderGrantedRefund
        fields = "__all__"
        filter_fields = {
            "order": ["exact"],
            "amount_value": ["exact", "gte", "lte"],
            "currency": ["exact", "icontains"],
            "created_at": ["exact", "gte", "lte"],
            "user": ["exact"],
        }
        interfaces = (graphene.relay.Node,)