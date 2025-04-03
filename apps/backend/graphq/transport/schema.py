import graphene
from graphene.relay import Node
from graphene_django.filter import DjangoFilterConnectionField

from transport.types import (
    ServiceProviderNode,
    VehicleNode,
    ServiceRequestNode,
    TripNode,
    DeliveryNode,
    SharedTripNode,
    BookingNode,
    TrackingNode
)

class TransportQuery(graphene.ObjectType):
    # Single nodes
    service_provider = Node.Field(ServiceProviderNode)
    vehicle = Node.Field(VehicleNode)
    service_request = Node.Field(ServiceRequestNode)
    trip = Node.Field(TripNode)
    delivery = Node.Field(DeliveryNode)
    shared_trip = Node.Field(SharedTripNode)
    booking = Node.Field(BookingNode)
    tracking = Node.Field(TrackingNode)

    # Filtered lists
    all_service_providers = DjangoFilterConnectionField(
        ServiceProviderNode,
        provider_type=graphene.String(),
        is_available=graphene.Boolean()
    )
    
    all_vehicles = DjangoFilterConnectionField(
        VehicleNode,
        category=graphene.String(),
        vehicle_type=graphene.String()
    )
    
    active_trips = DjangoFilterConnectionField(
        TripNode,
        status=graphene.String()
    )
    
    available_shared_trips = DjangoFilterConnectionField(
        SharedTripNode,
        seats_required=graphene.Int(default_value=1)
    )
    
    user_bookings = DjangoFilterConnectionField(
        BookingNode,
        user_id=graphene.ID(required=True)
    )
    
    package_tracking = DjangoFilterConnectionField(
        TrackingNode,
        tracking_number=graphene.String()
    )

    def resolve_available_shared_trips(self, info, seats_required=1, **kwargs):
        return SharedTrip.objects.filter(
            status='available',
            available_seats__gte=seats_required
        ).order_by('trip__departure_time')

    def resolve_user_bookings(self, info, user_id):
        return Booking.objects.filter(
            user_id=user_id
        ).order_by('-created_at')