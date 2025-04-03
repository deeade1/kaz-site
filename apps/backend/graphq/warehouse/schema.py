import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from graphq.warehouse.types import (
    AllocationNode,
    PreorderAllocationNode,
    PreorderReservationNode,
    ReservationNode,
    StockNode,
    WarehouseNode,
)
from warehouse import models

from ...permission.enums import (
    OrderPermissions,
    ProductPermissions,
    ShippingPermissions,
)
from ..core.doc_category import DOC_CATEGORY_PRODUCTS
from ..core.fields import FilterConnectionField, PermissionsField
from ..core.utils import from_global_id_or_error
from ..core.utils.resolvers import resolve_by_global_id_or_ext_ref
from .filters import StockFilterInput, WarehouseFilterInput
from .resolvers import resolve_stock, resolve_stocks, resolve_warehouses
from .sorters import WarehouseSortingInput


class WarehouseQueries(graphene.ObjectType):
    warehouse = Node.Field(
        WarehouseNode,
        description="Look up a warehouse by ID.",
        id=graphene.Argument(graphene.ID, description="ID of a warehouse."),
        external_reference=graphene.Argument(
            graphene.String, description="External ID of a warehouse."
        ),
        permissions=[
            ProductPermissions.MANAGE_PRODUCTS,
            OrderPermissions.MANAGE_ORDERS,
            ShippingPermissions.MANAGE_SHIPPING,
        ],
        doc_category=DOC_CATEGORY_PRODUCTS,
    )
    warehouses = DjangoFilterConnectionField(
        WarehouseNode,
        description="List of warehouses.",
        filterset_class=WarehouseFilterInput,
        sort_by=WarehouseSortingInput(),
        permissions=[
            ProductPermissions.MANAGE_PRODUCTS,
            OrderPermissions.MANAGE_ORDERS,
            ShippingPermissions.MANAGE_SHIPPING,
        ],
        doc_category=DOC_CATEGORY_PRODUCTS,
    )

    @staticmethod
    def resolve_warehouse(root, info, id=None, external_reference=None):
        # Query a single warehouse by global ID or external reference
        return resolve_by_global_id_or_ext_ref(WarehouseModel, id, external_reference)

    @staticmethod
    def resolve_warehouses(root, info, **kwargs):
        # Retrieve all warehouses, applying filtering and sorting if specified
        return resolve_warehouses().filter(**kwargs)

    def resolve_stock(id):
        return models.Stock.objects.filter(id=id).first()

    def resolve_stocks():
        return models.Stock.objects.all()

    def resolve_warehouses():
        return models.Warehouse.objects.all()
