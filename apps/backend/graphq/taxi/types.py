import graphene
from graphene.relay import Node
from graphene_django_optimizer import OptimizedDjangoObjectType, query
from django.db.models import Q
from .models import Driver, Rider, Trip, SharedTrip, Vehicle


class DriverNode(OptimizedDjangoObjectType):
    class Meta:
        model = Driver
        filter_fields = {
            "state": ["exact"],
            "is_available": ["exact"],
        }
        interfaces = (Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        user = info.context.user
        if user.is_authenticated and hasattr(user, "group") and user.group == "driver":
            return query(queryset.filter(driver=user), info)
        return Driver.objects.none()


class RiderNode(OptimizedDjangoObjectType):
    class Meta:
        model = Rider
        filter_fields = {}
        interfaces = (Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        user = info.context.user
        if user.is_authenticated and hasattr(user, "group") and user.group == "rider":
            return query(queryset.filter(rider=user), info)
        return Rider.objects.none()


class TripNode(OptimizedDjangoObjectType):
    class Meta:
        model = Trip
        filter_fields = {
            "pickup_location": ["exact", "icontains"],
            "drop_off_location": ["exact", "icontains"],
            "status": ["exact"],
            "driver": ["exact"],
            "rider": ["exact"],
            "created": ["exact", "year", "month", "day"],
            "driver_rating": ["exact", "lt", "lte", "gt", "gte"],
            "rider_rating": ["exact", "lt", "lte", "gt", "gte"],
            "price": ["exact", "lt", "lte", "gt", "gte"],
            "date": ["exact", "year", "month", "day"],
            "payment_method": ["exact"],
        }
        interfaces = (Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        user = info.context.user
        if user.is_authenticated:
            if user.groups.filter(name="driver").exists():
                return query(queryset.filter(Q(driver=user) | Q(status=Trip.REQUESTED)), info)
            elif user.groups.filter(name="rider").exists():
                return query(queryset.filter(rider=user), info)
        return Trip.objects.none()


class SharedTripNode(OptimizedDjangoObjectType):
    class Meta:
        model = SharedTrip
        fields = "__all__"
        filter_fields = {
            "trip__id": ["exact"],
            "rider__id": ["exact"],
            "shared_with__id": ["exact"],
            "available_seats": ["exact", "lt", "lte", "gt", "gte"],
            "is_long_trip": ["exact"],
            "night_ride": ["exact"],
            "date_created": ["exact", "year", "month", "day"],
        }
        interfaces = (Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        user = info.context.user
        if user.is_authenticated:
            return query(queryset.filter(Q(rider=user) | Q(shared_with=user)), info)
        return SharedTrip.objects.none()


class VehicleNode(OptimizedDjangoObjectType):
    class Meta:
        model = Vehicle
        fields = "__all__"
        filter_fields = {
            "vehicle_type": ["exact", "icontains"],
            "name": ["exact", "icontains"],
            "model": ["exact", "icontains"],
            "year": ["exact", "lt", "lte", "gt", "gte"],
            "capacity": ["exact", "lt", "lte", "gt", "gte"],
            "license_plate": ["exact", "icontains"],
            "owner__id": ["exact"],
            "owner__first_name": ["exact", "icontains"],
        }
        interfaces = (Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        user = info.context.user
        if user.is_authenticated:
            if user.is_superuser:
                return query(queryset, info)
            return query(queryset.filter(owner=user), info)
        return Vehicle.objects.none()
    
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id
from .models import SharedTrip, Booking, WaitlistEntry, Receipt

class SharedTripType(DjangoObjectType):
    class Meta:
        model = SharedTrip
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'day_time': ['exact'],
            'status': ['exact'],
            'available_seats': ['exact', 'gte', 'lte'],
            'trip__id': ['exact'],
        }
    
    waitlist_count = graphene.Int()
    
    def resolve_waitlist_count(self, info):
        return self.waitlist.count()

class BookingType(DjangoObjectType):
    class Meta:
        model = Booking
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'status': ['exact'],
            'user__id': ['exact'],
            'trip__id': ['exact'],
            'shared_trip__id': ['exact'],
        }

class WaitlistEntryType(DjangoObjectType):
    class Meta:
        model = WaitlistEntry
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'shared_trip__id': ['exact'],
            'user__id': ['exact'],
            'notified': ['exact'],
        }

class ReceiptType(DjangoObjectType):
    class Meta:
        model = Receipt
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'payment_status': ['exact'],
            'booking__id': ['exact'],
            'amount': ['exact', 'gte', 'lte'],
        }
    
    pdf_url = graphene.String()
    
    def resolve_pdf_url(self, info):
        if self.pdf:
            return info.context.build_absolute_uri(self.pdf.url)
        return None