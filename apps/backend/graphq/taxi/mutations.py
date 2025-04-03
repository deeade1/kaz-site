import graphene
from django.contrib.auth.models import Group
from graphene import ID, Boolean, Date, Field, Float, Int, List, String, Time
from graphene.relay import ClientIDMutation
from graphql import GraphQLError
from graphql_relay import from_global_id
from .models import Driver, SharedTrip, Trip, Vehicle, Rider
from .types import DriverNode, SharedTripNode, TripNode, VehicleNode, RiderNode
from django.utils import timezone
from accounts.models import UserRole
from .dispatch import UnifiedDispatcher

from .utils import validate_app_role



logger = logging.getLogger("mutation_logger")



# Helper Function: Validate User Permissions
def validate_user_permissions(user, permission):
    if not user or not user.is_authenticated or not user.has_perm(permission):
        raise GraphQLError("Permission denied.")

# Helper Function: Get Object by Global ID
def get_object_by_global_id(model, global_id):
    try:
        return model.objects.get(pk=from_global_id(global_id)[1])
    except model.DoesNotExist:
        raise GraphQLError(f"{model.__name__} not found.")

# Helper Function: Update Object Fields
def update_object_fields(obj, fields, input_data):
    for field in fields:
        if field in input_data:
            setattr(obj, field, input_data[field])
    obj.save()



def resolve_available_drivers(self, info):
    # Only logistics dispatchers can see all drivers
    validate_app_role(info, 'logistics', 'dispatcher')
    
    return User.objects.filter(
        app_roles__app_name='taxi',
        app_roles__role__name='driver',
        app_roles__is_active=True
    )



# Vehicle Mutations
class CreateVehicle(ClientIDMutation):
    class Input:
        owner_id = ID(required=True)
        vehicle_type = String()
        name = String()
        model = String()
        year = Int()
        capacity = Int()
        license_plate = String()

    vehicle = Field(VehicleNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_vehicles")

        owner = get_object_by_global_id(User, input["owner_id"])
        vehicle = Vehicle(owner=owner, **{k: v for k, v in input.items() if k != "owner_id"})
        vehicle.save()
        return CreateVehicle(vehicle=vehicle)

class UpdateVehicle(ClientIDMutation):
    class Input:
        id = ID(required=True)
        vehicle_type = String()
        name = String()
        model = String()
        year = Int()
        capacity = Int()
        license_plate = String()
        owner_id = ID()

    vehicle = Field(VehicleNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_vehicles")

        vehicle = get_object_by_global_id(Vehicle, input["id"])
        if "owner_id" in input:
            vehicle.owner = get_object_by_global_id(User, input["owner_id"])
        update_object_fields(vehicle, ["vehicle_type", "name", "model", "year", "capacity", "license_plate"], input)
        return UpdateVehicle(vehicle=vehicle)

class DeleteVehicle(ClientIDMutation):
    class Input:
        id = ID(required=True)

    success = Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_vehicles")

        vehicle = get_object_by_global_id(Vehicle, input["id"])
        vehicle.delete()
        return DeleteVehicle(success=True)

# Driver Mutations
class CreateDriver(ClientIDMutation):
    class Input:
        user_id = ID(required=True)
        state = String(required=True)
        is_available = Boolean(required=True)

    driver = Field(DriverNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_drivers")

        user_instance = get_object_by_global_id(User, input["user_id"])
        driver_group, _ = Group.objects.get_or_create(name="driver")
        user_instance.groups.add(driver_group)

        driver = Driver(user=user_instance, state=input["state"], is_available=input["is_available"])
        driver.save()
        return CreateDriver(driver=driver)

class UpdateDriver(ClientIDMutation):
    class Input:
        driver_id = ID(required=True)
        state = String()
        is_available = Boolean()

    driver = Field(DriverNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_drivers")

        driver = get_object_by_global_id(Driver, input["driver_id"])
        update_object_fields(driver, ["state", "is_available"], input)
        return UpdateDriver(driver=driver)

class DeleteDriver(ClientIDMutation):
    class Input:
        driver_id = ID(required=True)

    success = Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_drivers")

        driver = get_object_by_global_id(Driver, input["driver_id"])
        driver.delete()
        return DeleteDriver(success=True)

class UpdateDriverLocation(ClientIDMutation):
    class Input:
        lat = Float(required=True)
        lng = Float(required=True)
    
    success = Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, lat, lng):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        driver = user.driver
        if not driver:
            raise GraphQLError("User is not a driver")
        
        driver.location = Point(lng, lat)
        driver.save()
        
        # If driver is on a trip, broadcast location update
        if driver.current_trip:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"trip_{driver.current_trip.id}",
                {
                    "type": "location.update",
                    "latitude": lat,
                    "longitude": lng
                }
            )
        
        return UpdateDriverLocation(success=True)

class RequestRide(ClientIDMutation):
    class Input:
        pickup_lat = Float(required=True)
        pickup_lng = Float(required=True)
        dropoff_lat = Float(required=True)
        dropoff_lng = Float(required=True)
        pickup_address = String(required=True)
        dropoff_address = String(required=True)
        vehicle_type = VehicleTypeEnum()
    
    trip = Field(TripNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        requester = user.userrole
        if requester.user_type != 'rider':
            raise GraphQLError("Only riders can request trips")
        
        trip = Trip.objects.create(
            request_type='taxi',
            requester=requester,
            pickup_location=Point(kwargs['pickup_lng'], kwargs['pickup_lat']),
            dropoff_location=Point(kwargs['dropoff_lng'], kwargs['dropoff_lat']),
            pickup_address=kwargs['pickup_address'],
            dropoff_address=kwargs['dropoff_address'],
            status='requested'
        )
        
        # Calculate fare and save
        trip.calculate_fare()
        
        # Trigger dispatch
        asyncio.create_task(UnifiedDispatcher().assign_requests())
        
        return RequestRide(trip=trip)
    
class UpdateRide(ClientIDMutation):
    class Input:
        id = ID(required=True)
        pickup_location = String()
        drop_off_location = String()
        status = String()
        driver_id = ID()

    trip = Field(TripNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_trips")

        trip = get_object_by_global_id(Trip, input["id"])
        if "driver_id" in input:
            trip.driver = get_object_by_global_id(User, input["driver_id"])
        update_object_fields(trip, ["pickup_location", "drop_off_location", "status"], input)
        return UpdateTrip(trip=trip)

class DeleteRide(ClientIDMutation):
    class Input:
        id = ID(required=True)

    success = Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_trips")

        trip = get_object_by_global_id(Trip, input["id"])
        trip.delete()
        return DeleteTrip(success=True)

class RequestDelivery(ClientIDMutation):
    class Input:
        pickup_lat = Float(required=True)
        pickup_lng = Float(required=True)
        dropoff_lat = Float(required=True)
        dropoff_lng = Float(required=True)
        pickup_address = String(required=True)
        dropoff_address = String(required=True)
        description = String(required=True)
        weight = Float(required=True)
        dimensions = String(required=True)
        recipient_name = String(required=True)
        recipient_phone = String(required=True)
        instructions = String()
        requires_signature = Boolean()
        insurance_required = Boolean()
    
    delivery = Field(DeliveryNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        requester = user.userrole
        if requester.user_type != 'customer':
            raise GraphQLError("Only customers can request deliveries")
        
        delivery = Delivery.objects.create(
            request_type='delivery',
            requester=requester,
            pickup_location=Point(kwargs['pickup_lng'], kwargs['pickup_lat']),
            dropoff_location=Point(kwargs['dropoff_lng'], kwargs['dropoff_lat']),
            pickup_address=kwargs['pickup_address'],
            dropoff_address=kwargs['dropoff_address'],
            package_description=kwargs['description'],
            package_weight=kwargs['weight'],
            package_dimensions=kwargs['dimensions'],
            recipient_name=kwargs['recipient_name'],
            recipient_phone=kwargs['recipient_phone'],
            delivery_instructions=kwargs.get('instructions', ''),
            requires_signature=kwargs.get('requires_signature', False),
            insurance_required=kwargs.get('insurance_required', False),
            status='requested'
        )
        
        # Calculate delivery fee and save
        delivery.calculate_fee()
        
        # Trigger dispatch
        asyncio.create_task(UnifiedDispatcher().assign_requests())
        
        return RequestDelivery(delivery=delivery)

class UpdateWorkerStatus(ClientIDMutation):
    class Input:
        is_online = Boolean(required=True)
        lat = Float()
        lng = Float()
    
    success = Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, is_online, lat=None, lng=None):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        worker = user.fleetuser
        if worker.user_type not in ['driver', 'courier']:
            raise GraphQLError("Only drivers/couriers can update status")
        
        worker.is_online = is_online
        if lat and lng:
            worker.location = Point(lng, lat)
        worker.save()
        
        return UpdateWorkerStatus(success=True)
 
class RequestSharedTrip(ClientIDMutation):
    class Input:
        pick_up_address = graphene.String(required=True)
        drop_off_address = graphene.String(required=True)
        pickup_lat = graphene.Float(required=True)
        pickup_lng = graphene.Float(required=True)
        seats_needed = graphene.Int(required=True)
    
    trip = graphene.Field(TripType)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated or not user.is_rider:
            raise Exception("Riders only")
        
        # Check for existing active trips
        if Trip.objects.filter(rider=user).exclude(status__in=[Trip.COMPLETED, Trip.CANCELLED]).exists():
            raise Exception("You already have an active trip")
        
        with transaction.atomic():
            trip = Trip.objects.create(
                pick_up_address=pick_up_address,
                drop_off_address=drop_off_address,
                pickup_location_latitude=pickup_lat,
                pickup_location_longitude=pickup_lng,
                rider=user,
                status=Trip.PENDING  # Start as PENDING for shared trips
            )
            
            SharedTrip.objects.create(
                trip=trip,
                available_seats=seats_needed
            )
        
        # Start the assignment process
        asyncio.create_task(run_trip_assignment(trip.id))
        
        return RequestSharedTrip(trip=trip)
    
class UpdateSharedTrip(ClientIDMutation):
    class Input:
        id = ID(required=True)
        trip_id = ID()
        rider_id = ID()
        shared_with_ids = List(ID)
        available_seats = Int()
        is_long_trip = Boolean()
        night_ride = Boolean()

    shared_trip = Field(SharedTripNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_shared_trips")

        shared_trip = get_object_by_global_id(SharedTrip, input["id"])
        if "trip_id" in input:
            shared_trip.trip = get_object_by_global_id(Trip, input["trip_id"])
        if "rider_id" in input:
            shared_trip.rider = get_object_by_global_id(User, input["rider_id"])
        if "shared_with_ids" in input:
            shared_trip.shared_with.set([get_object_by_global_id(User, id) for id in input["shared_with_ids"]])
        update_object_fields(shared_trip, ["available_seats", "is_long_trip", "night_ride"], input)
        return UpdateSharedTrip(shared_trip=shared_trip)

class DeleteSharedTrip(ClientIDMutation):
    class Input:
        id = ID(required=True)

    success = Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        validate_user_permissions(user, "app_name.manage_shared_trips")

        shared_trip = get_object_by_global_id(SharedTrip, input["id"])
        shared_trip.delete()
        return DeleteSharedTrip(success=True)

class AcceptTrip(ClientIDMutation):
    class Input:
        trip_id = graphene.ID(required=True)
    
    trip = graphene.Field(TripType)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, trip_id):
        driver = info.context.user
        if not driver.is_authenticated or not driver.is_driver:
            raise Exception("Drivers only")
        
        trip = Trip.objects.get(id=trip_id)
        if trip.status != Trip.REQUESTED:
            raise Exception("Trip not available")
        
        # Update trip
        trip.driver = driver
        trip.status = Trip.STARTED
        trip.save()
        
        # Notify rider and other drivers
        TripSubscription.publish(payload=trip, trip_id=trip_id)
        DriverPoolSubscription.publish(payload=trip)  # To inform other drivers
        
        return AcceptTrip(trip=trip)

class UpdateTripLocation(ClientIDMutation):
    class Arguments:
        trip_id = graphene.ID(required=True)
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)
    
    trip = graphene.Field(TripType)
    
    @classmethod
    def mutate(cls, root, info, trip_id, latitude, longitude):
        user = info.context.user
        trip = Trip.objects.get(id=trip_id)
        
        if user != trip.driver:
            raise Exception("Only the driver can update location")
        
        # In a real app, you'd store this location
        location = f"{latitude},{longitude}"
        
        # Broadcast to rider
        TripSubscription.publish(payload=trip, trip_id=trip_id)
        
        return UpdateTripLocation(trip=trip)


class BookSharedTrip(ClientIDMutation):
    class Input:
        shared_trip_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)
    
    booking = graphene.Field(BookingType)
    receipt = graphene.Field(ReceiptType)
    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id, user_id):
        from .models import SharedTrip, User
        
        try:
            # Convert global IDs to database IDs
            _, st_id = from_global_id(shared_trip_id)
            _, u_id = from_global_id(user_id)
            
            shared_trip = SharedTrip.objects.get(pk=st_id)
            user = User.objects.get(pk=u_id)
            
            # Book the seat
            booking, receipt = shared_trip.book_seat(user)
            
            return BookSharedTrip(
                booking=booking,
                receipt=receipt,
                success=True
            )
        except SharedTrip.DoesNotExist:
            raise GraphQLError("Shared trip not found")
        except User.DoesNotExist:
            raise GraphQLError("User not found")
        except ValueError as e:
            raise GraphQLError(str(e))

class JoinWaitlist(ClientIDMutation):
    class Input:
        shared_trip_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)
    
    waitlist_entry = graphene.Field(WaitlistEntryType)
    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id, user_id):
        from .models import SharedTrip, User
        
        try:
            _, st_id = from_global_id(shared_trip_id)
            _, u_id = from_global_id(user_id)
            
            shared_trip = SharedTrip.objects.get(pk=st_id)
            user = User.objects.get(pk=u_id)
            
            if shared_trip.status != 'full':
                raise GraphQLError("Cannot join waitlist - seats still available")
            
            entry = shared_trip.add_to_waitlist(user)
            
            return JoinWaitlist(
                waitlist_entry=entry,
                success=True
            )
        except Exception as e:
            raise GraphQLError(str(e))

class UpdateSharedTripStatus(ClientIDMutation):
    class Input:
        shared_trip_id = graphene.ID(required=True)
        status = graphene.String(required=True)
    
    shared_trip = graphene.Field(SharedTripType)
    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, shared_trip_id, status):
        from .models import SharedTrip
        
        try:
            _, st_id = from_global_id(shared_trip_id)
            shared_trip = SharedTrip.objects.get(pk=st_id)
            
            if status not in dict(SharedTrip.STATUS_CHOICES):
                raise GraphQLError("Invalid status")
            
            shared_trip.status = status
            shared_trip.save()
            
            return UpdateSharedTripStatus(
                shared_trip=shared_trip,
                success=True
            )
        except Exception as e:
            raise GraphQLError(str(e))

class GenerateReceiptPDF(ClientIDMutation):
    class Input:
        receipt_id = graphene.ID(required=True)
    
    receipt = graphene.Field(ReceiptType)
    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, receipt_id):
        from .models import Receipt
        
        try:
            _, r_id = from_global_id(receipt_id)
            receipt = Receipt.objects.get(pk=r_id)
            
            if not receipt.pdf:
                receipt.pdf = receipt.generate_pdf()
                receipt.save()
            
            return GenerateReceiptPDF(
                receipt=receipt,
                success=True
            )
        except Exception as e:
            raise GraphQLError(str(e))

# Mutation Root
class Mutation(graphene.ObjectType):
    create_vehicle = CreateVehicle.Field()
    update_vehicle = UpdateVehicle.Field()
    delete_vehicle = DeleteVehicle.Field()
    create_driver = CreateDriver.Field()
    update_driver = UpdateDriver.Field()
    delete_driver = DeleteDriver.Field()
    request_trip = RequestTrip.Field()
    update_trip = UpdateTrip.Field()
    delete_trip = DeleteTrip.Field()
    create_shared_trip = CreateSharedTrip.Field()
    update_shared_trip = UpdateSharedTrip.Field()
    delete_shared_trip = DeleteSharedTrip.Field()
    request_shared_trip = RequestSharedTrip.Field()
    accept_trip = AcceptTrip.Field()
    update_trip_location = UpdateTripLocation.Field()
    book_shared_trip = BookSharedTrip.Field()
    join_waitlist = JoinWaitlist.Field()
    update_shared_trip_status = UpdateSharedTripStatus.Field()
    generate_receipt_pdf = GenerateReceiptPDF.Field()
    update_driver_location = UpdateDriverLocation.Field()
    request_ride = RequestRide.Field()
    request_delivery = RequestDelivery.Field()
    update_worker_status = UpdateWorkerStatus.Field()


    
    





 