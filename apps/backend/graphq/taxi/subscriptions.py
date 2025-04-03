# schema.py
import graphene
from graphene_django import DjangoObjectType
from .models import Trip, User
from graphq.accounts.types import UserNode
from graphq.taxi.type import TripNde 

class TripSubscription(graphene.ObjectType):
    trip_update = graphene.Field(TripType)
    
    @staticmethod
    def subscribe(root, info, trip_id):
        # Get user from context
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        
        # Get trip and verify permissions
        trip = Trip.objects.get(id=trip_id)
        if user not in [trip.rider, trip.driver] and not user.is_staff:
            raise Exception("Not authorized to subscribe to this trip")
        
        return [trip.get_group_name()]
    
    @staticmethod
    def publish(payload, trip_id):
        return TripSubscription(trip_update=payload)

class DriverPoolSubscription(graphene.ObjectType):
    new_trip_request = graphene.Field(TripType)
    
    @staticmethod
    def subscribe(root, info):
        user = info.context.user
        if not user.is_authenticated or not user.is_driver:
            raise Exception("Drivers only")
        
        user.join_driver_pool()
        return ["driver_pool"]
    
    @staticmethod
    def publish(payload):
        return DriverPoolSubscription(new_trip_request=payload)

class Subscription(graphene.ObjectType):
    trip_updates = graphene.Field(TripSubscription, trip_id=graphene.ID(required=True))
    driver_pool_updates = graphene.Field(DriverPoolSubscription)
    
    def resolve_trip_updates(root, info, trip_id):
        return trip_id
    
    def resolve_driver_pool_updates(root, info):
        return {}


