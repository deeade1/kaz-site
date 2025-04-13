from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from graphq.warehouse.types import (
    AllocationNode,
    PreorderAllocationNode,
    PreorderReservationNode,
    ReservationNode,
    StockNode,
    ChannelWarehouseNode,
    WarehouseNode,
)

class WarehouseQueries(graphene.ObjectType):
    warehouse = Node.Field(WarehouseNode)
    warehouses = DjangoFilterConnectionField(WarehouseNode,)
    allocation = Node.Field(AllocationNode)
    allocations = DjangoFilterConnectionField(AllocationNode)
    channel_warehouse = Node.Field(ChannelWarehouseNode)
    all_channel_warehouse = DjangoFilterConnectionField(ChannelWarehouseNode)
    preorder_allocation = Node.Field(PreorderAllocationNode)
    preorder_reservation = Node.Field(PreorderReservationNode)
    reservation = Node.Field(ReservationNode)
    stock= Node.Field(StockNode)
    all_preorder_allocation = DjangoFilterConnectionField(PreorderAllocationNode)
    all_preorder_reservation = DjangoFilterConnectionField(PreorderReservationNode)
    all_reservation = DjangoFilterConnectionField(ReservationNode)
    all_Stocks = DjangoFilterConnectionField(StockNode)
    
    
    