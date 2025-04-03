import graphene
from graphene.relay import Node
from graphene_django.filter import DjangoFilterConnectionField

from logistics.models import Courier, Dispatch, LogisticsType, Package
from graphq.logistics.types import (
    CourierNode,
    DispatchNode,
    LogisticsTypeNode,
    PackageNode,
)


class LogisticsQueries(graphene.ObjectType):
    logistics_type = Node.Field(LogisticsTypeNode)
    all_logistics_types = DjangoFilterConnectionField(LogisticsTypeNode)

    courier = Node.Field(CourierNode)
    all_couriers = DjangoFilterConnectionField(CourierNode)

    package = Node.Field(PackageNode)
    all_packages = DjangoFilterConnectionField(PackageNode)

    dispatch = Node.Field(DispatchNode)
    all_dispatches = DjangoFilterConnectionField(DispatchNode)
