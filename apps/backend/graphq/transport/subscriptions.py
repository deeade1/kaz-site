import graphene
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import ServiceRequest
from .models import SharedTrip

class ServiceSubscription(graphene.ObjectType):
    service_update = graphene.Field(ServiceRequestNode)
    location_update = graphene.Field(graphene.String)
    
    @staticmethod
    def subscribe(root, info, service_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        
        service = ServiceRequest.objects.get(id=service_id)
        if service.customer != user and (not service.provider or service.provider.user != user):
            raise Exception("Not authorized to subscribe to this service")
        
        return [f"service_{service_id}"]
    
    @staticmethod
    def publish(payload, service_id):
        return ServiceSubscription(service_update=payload)

class ProviderPoolSubscription(graphene.ObjectType):
    new_service_request = graphene.Field(ServiceRequestNode)
    
    @staticmethod
    def subscribe(root, info):
        user = info.context.user
        if not user.is_authenticated or not hasattr(user, 'service_provider'):
            raise Exception("Service providers only")
        
        user.service_provider.join_provider_pool()
        return ["provider_pool"]
    
    @staticmethod
    def publish(payload):
        return ProviderPoolSubscription(new_service_request=payload)

class Subscription(graphene.ObjectType):
    service_updates = graphene.Field(
        ServiceSubscription,
        service_id=graphene.ID(required=True)
    )
    provider_pool_updates = graphene.Field(ProviderPoolSubscription)
    


class SharedTripSubscription(graphene.ObjectType):
    shared_trip_update = graphene.Field(SharedTripNode)
    seat_available = graphene.Field(SharedTripNode)
    
    @staticmethod
    def subscribe(root, info, shared_trip_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        
        shared_trip = SharedTrip.objects.get(id=from_global_id(shared_trip_id)[1])
        
        # Verify user has access to this trip
        if not (shared_trip.trip.customer == user or 
                user in [entry.user for entry in shared_trip.waitlist.all()]):
            raise Exception("Not authorized to subscribe to this trip")
        
        return [f"shared_trip_{shared_trip_id}"]

    @staticmethod
    def publish(payload, shared_trip_id):
        return SharedTripSubscription(shared_trip_update=payload)

class Subscription(graphene.ObjectType):
    shared_trip_updates = graphene.Field(
        SharedTripSubscription,
        shared_trip_id=graphene.ID(required=True)
    )