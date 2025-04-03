import graphene
from graphene.relay import Node
from graphene_django_optimizer import OptimizedDjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import Q

from transport.models import (
    ServiceProviderProfile,
    Vehicle,
    ServiceRequest,
    Trip,
    Delivery,
    SharedTrip,
    Booking,
    WaitlistEntry,
    Receipt,
    Tracking,
    TrackingEvent
)

class ServiceProviderNode(OptimizedDjangoObjectType):
    class Meta:
        model = ServiceProviderProfile
        interfaces = (Node,)
        filter_fields = {
            'provider_type': ['exact'],
            'is_available': ['exact'],
            'license_type': ['exact'],
            'rating': ['exact', 'gte', 'lte'],
        }

    current_location = graphene.String()
    
    def resolve_current_location(self, info):
        if self.location:
            return f"{self.location.y},{self.location.x}"
        return None

class VehicleNode(OptimizedDjangoObjectType):
    class Meta:
        model = Vehicle
        interfaces = (Node,)
        filter_fields = {
            'vehicle_type': ['exact'],
            'category': ['exact'],
            'is_active': ['exact'],
            'passenger_capacity': ['exact', 'gte', 'lte'],
            'cargo_capacity': ['exact', 'gte', 'lte'],
        }

class ServiceRequestNode(OptimizedDjangoObjectType):
    class Meta:
        model = ServiceRequest
        interfaces = (Node,)
        filter_fields = {
            'service_type': ['exact'],
            'status': ['exact'],
            'customer': ['exact'],
            'provider': ['exact'],
            'created_at': ['year', 'month', 'day', 'gte', 'lte'],
        }

    estimated_duration_minutes = graphene.Int()
    
    def resolve_estimated_duration_minutes(self, info):
        return int(self.estimated_duration) if self.estimated_duration else None

class TripNode(ServiceRequestNode):
    class Meta:
        model = Trip
        interfaces = (Node,)
    
    available_seats = graphene.Int()
    
    def resolve_available_seats(self, info):
        if hasattr(self, 'shared_info'):
            return self.shared_info.available_seats
        return 1

class DeliveryNode(ServiceRequestNode):
    class Meta:
        model = Delivery
        interfaces = (Node,)

class SharedTripNode(OptimizedDjangoObjectType):
    class Meta:
        model = SharedTrip
        interfaces = (Node,)
        filter_fields = {
            'day_time': ['exact'],
            'status': ['exact'],
            'available_seats': ['exact', 'gte', 'lte'],
        }

    waitlist_count = graphene.Int()
    
    def resolve_waitlist_count(self, info):
        return self.waitlist.count()

class BookingNode(OptimizedDjangoObjectType):
    class Meta:
        model = Booking
        interfaces = (Node,)
        filter_fields = {
            'status': ['exact'],
            'user': ['exact'],
            'service_request': ['exact'],
        }

class TrackingNode(OptimizedDjangoObjectType):
    class Meta:
        model = Tracking
        interfaces = (Node,)
        filter_fields = {
            'current_status': ['exact'],
            'package': ['exact'],
            'estimated_delivery': ['gte', 'lte'],
        }

    events = DjangoFilterConnectionField('transport.types.TrackingEventNode')
    
class TrackingEventNode(OptimizedDjangoObjectType):
    class Meta:
        model = TrackingEvent
        interfaces = (Node,)
        

import graphene
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType
from .models import (
    ServiceProviderProfile, 
    Vehicle, 
    ServiceRequest,
    Trip,
    Delivery,
    SharedTrip,
    Booking,
    Tracking,
    TrackingEvent,
    Receipt
)

class ServiceProviderNode(OptimizedDjangoObjectType):
    class Meta:
        model = ServiceProviderProfile
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'provider_type': ['exact'],
            'is_available': ['exact'],
            'license_type': ['exact'],
            'rating': ['gte', 'lte'],
        }

class VehicleNode(OptimizedDjangoObjectType):
    class Meta:
        model = Vehicle
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'vehicle_type': ['exact'],
            'is_active': ['exact'],
        }

class ServiceRequestNode(OptimizedDjangoObjectType):
    class Meta:
        model = ServiceRequest
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'service_type': ['exact'],
            'status': ['exact'],
            'customer': ['exact'],
            'provider': ['exact'],
        }

class TripNode(ServiceRequestNode):
    class Meta:
        model = Trip
        interfaces = (graphene.relay.Node,)

class DeliveryNode(ServiceRequestNode):
    class Meta:
        model = Delivery
        interfaces = (graphene.relay.Node,)


class SharedTripNode(OptimizedDjangoObjectType):
    waitlist_count = graphene.Int()
    available_seats = graphene.Int()
    
    class Meta:
        model = SharedTrip
        interfaces = (graphene.relay.Node,)
        fields = '__all__'
    
    def resolve_waitlist_count(self, info):
        return self.waitlist.count()
    
    def resolve_available_seats(self, info):
        return self.available_seats

class WaitlistEntryNode(OptimizedDjangoObjectType):
    class Meta:
        model = WaitlistEntry
        interfaces = (graphene.relay.Node,)
        fields = '__all__'

class BookingNode(OptimizedDjangoObjectType):
    class Meta:
        model = Booking
        interfaces = (graphene.relay.Node,)

class TrackingNode(OptimizedDjangoObjectType):
    class Meta:
        model = Tracking
        interfaces = (graphene.relay.Node,)

class TrackingEventNode(OptimizedDjangoObjectType):
    class Meta:
        model = TrackingEvent
        interfaces = (graphene.relay.Node,)

class ReceiptNode(OptimizedDjangoObjectType):
    class Meta:
        model = Receipt
        interfaces = (graphene.relay.Node,)