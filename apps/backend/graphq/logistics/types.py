import graphene
from graphene.relay import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType

from logistics.models import Courier, Dispatch, LogisticsType, Package
from graphene import relay, Mutation, Field, String, Float, Int, Boolean
from graphql import GraphQLError
from .models import Trip, Driver, Rider, Vehicle
from .dispatch import DispatchOptimizer



class LogisticsTypeNode(OptimizedDjangoObjectType):
    class Meta:
        model = LogisticsType
        fields = "__all__"
        filter_fields = {
            "vehicle_type": ["exact", "icontains"],
        }
        interfaces = (Node,)


class CourierNode(OptimizedDjangoObjectType):
    class Meta:
        model = Courier
        fields = "__all__"
        filter_fields = {
            "courier__id": ["exact"],
            "state": ["exact", "icontains"],
            "last_pos_update": ["exact"],
            "is_available": ["exact"],
            "courier__phone_number": ["exact"],
        }
        interfaces = (Node,)


class PackageNode(OptimizedDjangoObjectType):
    class Meta:
        model = Package
        fields = "__all__"
        filter_fields = {
            "sender": ["exact"],
            "sender__first_name": ["exact", "icontains"],
            "state": ["exact"],
            "description": ["exact", "icontains"],
            "weight": ["exact", "lt", "lte", "gt", "gte"],
        }
        interfaces = (Node,)


class DispatchNode(OptimizedDjangoObjectType):
    class Meta:
        model = Dispatch
        fields = "__all__"
        filter_fields = {
            "package__id": ["exact"],
            "courier__id": ["exact"],
            "state": ["exact"],
            "date_created": ["exact", "lt", "lte", "gt", "gte"],
            "date_updated": ["exact", "lt", "lte", "gt", "gte"],
        }
        interfaces = (Node,)
        
class TrackingNode(DjangoObjectType):
    class Meta:
        model = Tracking
        interfaces = (relay.Node,)
        filter_fields = {
            'tracking_number': ['exact', 'icontains'],
            'current_status': ['exact'],
            'package__id': ['exact'],
        }

    events = DjangoFilterConnectionField('graphq.logistics.types.TrackingEventNode')
    delivery_proof_url = graphene.String()

    def resolve_delivery_proof_url(self, info):
        if self.delivery_proof:
            return info.context.build_absolute_uri(self.delivery_proof.url)
        return None

class TrackingEventNode(DjangoObjectType):
    class Meta:
        model = TrackingEvent
        interfaces = (relay.Node,)
        filter_fields = {
            'status': ['exact'],
            'tracking__id': ['exact'],
            'timestamp': ['gte', 'lte'],
        }

class TrackingPreferenceNode(DjangoObjectType):
    class Meta:
        model = TrackingPreference
        interfaces = (relay.Node,)
        filter_fields = {
            'email_updates': ['exact'],
            'sms_updates': ['exact'],
        }  
        
  
  
  
  
  
  # models.py

class TripNode(DjangoObjectType):
    class Meta:
        model = Trip
        interfaces = (relay.Node,)
        filter_fields = {
            'status': ['exact'],
            'rider': ['exact'],
            'driver': ['exact'],
            'requested_at': ['gte', 'lte'],
        }
    
    eta = graphene.Float()
    
    def resolve_eta(self, info):
        # Calculate ETA based on current driver location and traffic
        return calculate_eta(self)



class ServiceRequestNode(DjangoObjectType):
    class Meta:
        model = ServiceRequest
        interfaces = (relay.Node,)
        filter_fields = {
            'status': ['exact'],
            'request_type': ['exact'],
            'requester': ['exact'],
            'assigned_to': ['exact'],
            'created_at': ['gte', 'lte'],
        }

class TripNode(DjangoObjectType):
    class Meta:
        model = Trip
        interfaces = (relay.Node,)

class DeliveryNode(DjangoObjectType):
    class Meta:
        model = Delivery
        interfaces = (relay.Node,)










