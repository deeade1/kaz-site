import graphene
from graphene.relay import Node
from graphene_django.filter import DjangoFilterConnectionField

from graphq.taxi.types import TripNode, SharedTripNode, RiderNode, DriverNode


class TripQueries(graphene.ObjectType):
    # Single nodes by ID
    trip = Node.Field(TripNode)
    shared_trip = Node.Field(SharedTripNode)
    booking = Node.Field(BookingType)
    waitlist_entry = Node.Field(WaitlistEntryType)
    receipt = Node.Field(ReceiptType)
    service_request = Node.Field(ServiceRequestNode)
    delivery = Node.Field(DeliveryNode)

    # All nodes with filtering and pagination
    all_trips = DjangoFilterConnectionField(TripNode)
    all_shared_trips = DjangoFilterConnectionField(SharedTripNode)
    drivers = DjangoFilterConnectionField(DriverNode)
    riders = DjangoFilterConnectionField(RiderNode)
    available_vehicle_types = DjangoFilterConnectionField(graphene.String)
    all_bookings = DjangoFilterConnectionField(BookingType)
    all_waitlist_entries = DjangoFilterConnectionField(WaitlistEntryType)
    all_receipts = DjangoFilterConnectionField(ReceiptType)
    available_shared_trips = DjangoFilterConnectionField(
        SharedTripNode,
        day_time=graphene.String(),
        seats_required=graphene.Int(default_value=1)
    )
    service_requests = DjangoFilterConnectionField(ServiceRequestNode)
    deliveries = DjangoFilterConnectionField(DeliveryNode)
    available_vehicle_types = graphene.List(VehicleTypeEnum)
    
    def resolve_available_vehicle_types(self, info):
        return [choice[0] for choice in Vehicle.VEHICLE_TYPES]
    
    def resolve_available_shared_trips(self, info, day_time=None, seats_required=1):
        from .models import SharedTrip
        
        queryset = SharedTrip.objects.filter(
            status='available',
            available_seats__gte=seats_required
        )
        
        if day_time:
            queryset = queryset.filter(day_time=day_time)
        
        return queryset.order_by('trip__departure_time')
    
    def resolve_available_vehicle_types(self, info):
        return [choice[0] for choice in Vehicle.VEHICLE_TYPES]
    
  


