import graphene
from graphene import ID, Boolean, Float, Int, String
from graphene.relay import ClientIDMutation
from graphql import GraphQLError
from graphql_relay import from_global_id
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from .models import *
from .types import *
from .dispatch import UnifiedDispatcher
from .utils import validate_user_permissions, get_object_by_global_id

User = get_user_model()

class BaseServiceMutation(ClientIDMutation):
    @classmethod
    def validate_service_request(cls, user, service_type):
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        if service_type == 'taxi' and not hasattr(user, 'rider_profile'):
            raise GraphQLError("Only riders can request trips")
        
        if service_type == 'delivery' and not hasattr(user, 'customer_profile'):
            raise GraphQLError("Only customers can request deliveries")

class RequestService(BaseServiceMutation):
    class Input:
        service_type = String(required=True)
        pickup_lat = Float(required=True)
        pickup_lng = Float(required=True)
        dropoff_lat = Float()
        dropoff_lng = Float()
        pickup_address = String(required=True)
        dropoff_address = String()
        # Trip specific
        rider_count = Int()
        special_requests = String()
        # Delivery specific
        package_description = String()
        package_weight = Float()
        recipient_name = String()
        recipient_phone = String()
    
    service_request = Field(ServiceRequestNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user = info.context.user
        service_type = kwargs.pop('service_type')
        
        cls.validate_service_request(user, service_type)
        
        if service_type == 'taxi':
            request = Trip.objects.create(
                service_type=service_type,
                customer=user,
                pickup_location=f"POINT({kwargs['pickup_lng']} {kwargs['pickup_lat']})",
                pickup_address=kwargs['pickup_address'],
                rider_count=kwargs.get('rider_count', 1),
                special_requests=kwargs.get('special_requests', ''),
                status='requested'
            )
        elif service_type == 'delivery':
            request = Delivery.objects.create(
                service_type=service_type,
                customer=user,
                pickup_location=f"POINT({kwargs['pickup_lng']} {kwargs['pickup_lat']})",
                pickup_address=kwargs['pickup_address'],
                package_description=kwargs['package_description'],
                package_weight=kwargs['package_weight'],
                recipient_name=kwargs['recipient_name'],
                recipient_phone=kwargs['recipient_phone'],
                status='requested'
            )
        
        # Trigger dispatch
        asyncio.create_task(UnifiedDispatcher().assign_requests())
        
        return RequestService(service_request=request)

class UpdateServiceStatus(ClientIDMutation):
    class Input:
        request_id = ID(required=True)
        status = String(required=True)
    
    service_request = Field(ServiceRequestNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, request_id, status):
        user = info.context.user
        validate_user_permissions(user, "transport.change_servicerequest")
        
        service_request = get_object_by_global_id(ServiceRequest, request_id)
        service_request.status = status
        service_request.save()
        
        return UpdateServiceStatus(service_request=service_request)

class UpdateLocation(ClientIDMutation):
    class Input:
        lat = Float(required=True)
        lng = Float(required=True)
    
    success = Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, lat, lng):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        if hasattr(user, 'service_provider'):
            provider = user.service_provider
            provider.location = f"POINT({lng} {lat})"
            provider.save()
            
            # Broadcast location update if on active service
            active_service = ServiceRequest.objects.filter(
                provider=provider,
                status__in=['accepted', 'in_progress']
            ).first()
            
            if active_service:
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    f"service_{active_service.id}",
                    {
                        "type": "location.update",
                        "latitude": lat,
                        "longitude": lng
                    }
                )
        
        return UpdateLocation(success=True)


import graphene
from graphene import ID, Boolean, Int, String
from graphene.relay import ClientIDMutation
from graphql import GraphQLError
from .models import SharedTrip, WaitlistEntry, Booking, Receipt
from .types import SharedTripNode, WaitlistEntryNode

class BookSharedTrip(ClientIDMutation):
    class Input:
        shared_trip_id = ID(required=True)
    
    booking = graphene.Field('transport.types.BookingNode')
    receipt = graphene.Field('transport.types.ReceiptNode')
    shared_trip = graphene.Field(SharedTripNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        try:
            shared_trip = SharedTrip.objects.get(pk=from_global_id(shared_trip_id)[1])
            booking, receipt = shared_trip.book_seat(user)
            return BookSharedTrip(
                booking=booking,
                receipt=receipt,
                shared_trip=shared_trip
            )
        except ValueError as e:
            raise GraphQLError(str(e))
        except SharedTrip.DoesNotExist:
            raise GraphQLError("Shared trip not found")

class JoinWaitlist(ClientIDMutation):
    class Input:
        shared_trip_id = ID(required=True)
    
    waitlist_entry = graphene.Field(WaitlistEntryNode)
    shared_trip = graphene.Field(SharedTripNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        try:
            shared_trip = SharedTrip.objects.get(pk=from_global_id(shared_trip_id)[1])
            waitlist_entry = shared_trip.add_to_waitlist(user)
            return JoinWaitlist(
                waitlist_entry=waitlist_entry,
                shared_trip=shared_trip
            )
        except ValueError as e:
            raise GraphQLError(str(e))
        except SharedTrip.DoesNotExist:
            raise GraphQLError("Shared trip not found")

class UpdateSharedTripStatus(ClientIDMutation):
    class Input:
        shared_trip_id = ID(required=True)
        status = String(required=True)
    
    shared_trip = graphene.Field(SharedTripNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id, status):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        try:
            shared_trip = SharedTrip.objects.get(pk=from_global_id(shared_trip_id)[1])
            if status not in dict(SharedTrip.STATUS_CHOICES):
                raise GraphQLError("Invalid status")
            
            shared_trip.status = status
            shared_trip.save()
            
            return UpdateSharedTripStatus(shared_trip=shared_trip)
        except SharedTrip.DoesNotExist:
            raise GraphQLError("Shared trip not found")

  
class Mutation(graphene.ObjectType):
    request_service = RequestService.Field()
    update_service_status = UpdateServiceStatus.Field()
    update_location = UpdateLocation.Field()
    book_shared_trip = BookSharedTrip.Field()
    join_waitlist = JoinWaitlist.Field()
    update_shared_trip_status = UpdateSharedTripStatus.Field()