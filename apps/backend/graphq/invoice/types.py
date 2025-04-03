from graphene_django_optimizer import query

class InvoiceNode(OptimizedDjangoObjectType):
    class Meta:
        model = Invoice
        fields = "__all__"
        filter_fields = {
            "number": ["exact", "icontains", "istartswith"],
            "created": ["exact", "gt", "lt"],
            "order": ["exact"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_order(root, info):
        return query(root.order, info)