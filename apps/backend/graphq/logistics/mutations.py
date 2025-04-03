import logging
from datetime import datetime
from django.db import transaction
from django.core.exceptions import ValidationError
from graphql import GraphQLError
from geopy.geocoders import Nominatim
from graphene import relay, Field, String, ID
from graphene_django_jwt.decorators import login_required
from graphene_gis.scalars import LineStringScalar

from logistics.models import Courier, Dispatch, LogisticsType, Package
from taxi.models import Vehicle
from graphq.logistics.types import CourierNode, LogisticsTypeNode, PackageNode
from logistics.dispatcher import run_dispatch

# Initialize logger and geolocator
logger = logging.getLogger(__name__)
geolocator = Nominatim(user_agent="server")


def get_authenticated_courier(user):
    try:
        return Courier.objects.get(courier=user)
    except Courier.DoesNotExist:
        raise GraphQLError("Courier not found.")




class CreateLogisticsTypeMutation(relay.ClientIDMutation):
    logistics_type = Field(LogisticsTypeNode)

    class Input:
        vehicle_type = String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        vehicle_type = input.get("vehicle_type")
        logistics_type = LogisticsType.objects.create(vehicle_type=vehicle_type)
        return CreateLogisticsTypeMutation(logistics_type=logistics_type)

class UpdateLogisticsTypeMutation(relay.ClientIDMutation):
    logistics_type = graphene.Field(LogisticsTypeNode)

    class Input:
        logistics_type_id = graphene.ID(required=True)
        vehicle_type = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        logistics_type_id = input.get("logistics_type_id")
        vehicle_type = input.get("vehicle_type")

        try:
            logistics_type = LogisticsType.objects.get(id=logistics_type_id)
        except LogisticsType.DoesNotExist:
            raise GraphQLError("Logistics type not found.")

        logistics_type.vehicle_type = vehicle_type
        logistics_type.save()

        return UpdateLogisticsTypeMutation(logistics_type=logistics_type)
class DeleteLogisticsTypeMutation(relay.ClientIDMutation):
    success = graphene.Boolean()

    class Input:
        logistics_type_id = graphene.ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        logistics_type_id = input.get("logistics_type_id")
        try:
            logistics_type = LogisticsType.objects.get(id=logistics_type_id)
        except LogisticsType.DoesNotExist:
            raise GraphQLError("Logistics type not found.")

        logistics_type.delete()
        return DeleteLogisticsTypeMutation(success=True)


class CreatePackageMutation(relay.ClientIDMutation):
    package = Field(PackageNode)
    tracking = Field('graphq.logistics.types.TrackingNode')  # Will define this type

    class Input:
        receiver_name = String(required=True)
        receiver_phone_number = String(required=True)
        pickup_location = String(required=True)
        delivery_location = String(required=True)
        pickup_time = String(required=True)
        duration = String()
        price = graphene.Float()
        size = graphene.Float()
        weight = graphene.Float()
        fragility = graphene.Boolean()
        description = graphene.String()
        vehicle_type_id = ID(required=True)
        require_signature = graphene.Boolean(default_value=False)
        insurance_amount = graphene.Float(default_value=0.0)
        tracking_preferences = graphene.JSONString()  # {email_updates: bool, sms_updates: bool}

    @classmethod
    @login_required
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        logger.info(f"User {user.first_name} is creating a package.")

        # Extract tracking preferences
        tracking_prefs = input.pop('tracking_preferences', {
            'email_updates': True,
            'sms_updates': False
        })

        vehicle_type_id = input.pop("vehicle_type_id")
        try:
            vehicle_type = LogisticsType.objects.get(id=vehicle_type_id)
        except LogisticsType.DoesNotExist:
            raise GraphQLError("Invalid vehicle type ID.")

        # Create package
        package = Package.objects.create(
            sender=user,
            vehicle_type=vehicle_type,
            **input
        )

        # Create initial tracking record
        tracking = Tracking.objects.create(
            package=package,
            current_status='processing',
            estimated_delivery=timezone.now() + timedelta(hours=24),
            tracking_number=self._generate_tracking_number(package),
            last_updated=timezone.now()
        )

        # Create initial tracking event
        TrackingEvent.objects.create(
            tracking=tracking,
            status='processing',
            location=package.pickup_location,
            description='Package received and processing started',
            timestamp=timezone.now()
        )

        # Set up tracking preferences
        TrackingPreference.objects.create(
            tracking=tracking,
            email_updates=tracking_prefs.get('email_updates', True),
            sms_updates=tracking_prefs.get('sms_updates', False),
            phone_number=input['receiver_phone_number'],
            email=user.email
        )

        # Populate geolocation fields
        try:
            pickup_location = geolocator.geocode(package.pickup_location)
            if pickup_location:
                package.pickup_latitude = pickup_location.latitude
                package.pickup_longitude = pickup_location.longitude
                tracking.current_location = f"{pickup_location.latitude},{pickup_location.longitude}"
                tracking.save()

            delivery_location = geolocator.geocode(package.delivery_location)
            if delivery_location:
                package.delivery_latitude = delivery_location.latitude
                package.delivery_longitude = delivery_location.longitude

            package.save()
        except Exception as e:
            logger.error(f"Geolocation error: {e}")

        # Trigger dispatch process
        from .tasks import initiate_dispatch
        initiate_dispatch.delay(package.id)

        return CreatePackageMutation(package=package, tracking=tracking)

    @staticmethod
    def _generate_tracking_number(package):
        """Generate unique tracking number"""
        timestamp = int(timezone.now().timestamp())
        return f"{package.vehicle_type.code[:2]}-{package.id:06d}-{timestamp % 10000:04d}"
    
class UpdatePackageMutation(relay.ClientIDMutation):
    package = graphene.Field(PackageNode)

    class Input:
        package_id = graphene.ID(required=True)
        receiver_name = graphene.String()
        receiver_phone_number = graphene.String()
        pickup_location = graphene.String()
        delivery_location = graphene.String()
        pickup_time = graphene.String()
        duration = graphene.String()
        price = graphene.Float()
        size = graphene.Float()
        weight = graphene.Float()
        fragility = graphene.Boolean()
        description = graphene.String()
        vehicle_type_id = graphene.ID()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        package_id = input.pop("package_id")
        try:
            package = Package.objects.get(id=package_id, sender=user)
        except Package.DoesNotExist:
            raise GraphQLError("Package not found or unauthorized.")

        # If vehicle_type changed
        vehicle_type_id = input.pop("vehicle_type_id", None)
        if vehicle_type_id:
            try:
                vehicle_type = LogisticsType.objects.get(id=vehicle_type_id)
                package.vehicle_type = vehicle_type
            except LogisticsType.DoesNotExist:
                raise GraphQLError("Invalid vehicle type ID.")

        # Update other fields
        for key, value in input.items():
            setattr(package, key, value)

        # Optional: Update geolocation if pickup/delivery changed
        try:
            if "pickup_location" in input:
                pickup_location = geolocator.geocode(package.pickup_location)
                if pickup_location:
                    package.pickup_latitude = pickup_location.latitude
                    package.pickup_longitude = pickup_location.longitude

            if "delivery_location" in input:
                delivery_location = geolocator.geocode(package.delivery_location)
                if delivery_location:
                    package.delivery_latitude = delivery_location.latitude
                    package.delivery_longitude = delivery_location.longitude
        except Exception as e:
            logger.error(f"Geolocation error: {e}")

        package.save()

        return UpdatePackageMutation(package=package)

class DeletePackageMutation(relay.ClientIDMutation):
    success = graphene.Boolean()

    class Input:
        package_id = graphene.ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        package_id = input.get("package_id")
        try:
            package = Package.objects.get(id=package_id, sender=user)
        except Package.DoesNotExist:
            raise GraphQLError("Package not found or unauthorized.")

        # Optional: Prevent deletion if package is in active state
        if package.state not in ["new", "created"]:
            raise GraphQLError("Cannot delete a package that's already being processed.")

        package.delete()

        return DeletePackageMutation(success=True)


class CreateCourier(relay.ClientIDMutation):
    courier = Field(CourierNode)
    route = LineStringScalar()

    class Input:
        license_plate = String(required=True)
        vehicle_id = ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, license_plate, vehicle_id):
        user = info.context.user

        if not user.is_staff:
            raise GraphQLError("You do not have permission to create a courier.")

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            raise GraphQLError("Invalid vehicle ID.")

        logger.info(f"Staff {user.first_name} is creating a courier.")

        courier = Courier.objects.create(
            courier=user,
            vehicle=vehicle,
            license_plate=license_plate,
            state=Courier.IDLE,
            is_available=True,
        )

        return CreateCourier(courier=courier)

class UpdateCourierMutation(relay.ClientIDMutation):
    courier = graphene.Field(CourierNode)

    class Input:
        courier_id = graphene.ID(required=True)
        license_plate = graphene.String()
        vehicle_id = graphene.ID()
        is_available = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user

        if not user.is_staff:
            raise GraphQLError("You do not have permission to update a courier.")

        courier_id = input.pop("courier_id")
        try:
            courier = Courier.objects.get(id=courier_id)
        except Courier.DoesNotExist:
            raise GraphQLError("Courier not found.")

        vehicle_id = input.pop("vehicle_id", None)
        if vehicle_id:
            try:
                vehicle = Vehicle.objects.get(pk=vehicle_id)
                courier.vehicle = vehicle
            except Vehicle.DoesNotExist:
                raise GraphQLError("Invalid vehicle ID.")

        # Update other fields
        for key, value in input.items():
            setattr(courier, key, value)

        courier.save()

        return UpdateCourierMutation(courier=courier)
class DeleteCourierMutation(relay.ClientIDMutation):
    success = graphene.Boolean()

    class Input:
        courier_id = graphene.ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user

        if not user.is_staff:
            raise GraphQLError("You do not have permission to delete a courier.")

        courier_id = input.get("courier_id")
        try:
            courier = Courier.objects.get(id=courier_id)
        except Courier.DoesNotExist:
            raise GraphQLError("Courier not found.")

        courier.delete()
        return DeleteCourierMutation(success=True)


class CheckIn(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        courier.state = Courier.STANDING_BY
        courier.save()
        run_dispatch()
        return CheckIn(success=True)


class Leave(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        courier.state = Courier.IDLE
        courier.save()

        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.PENDING
        ).first()
        if dispatch:
            dispatch.state = Dispatch.REJECTED
            dispatch.package.state = Package.NEW
            dispatch.save()
            dispatch.package.save()

        run_dispatch()
        return Leave(success=True)


class Decline(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.PENDING
        ).first()

        if dispatch:
            with transaction.atomic():
                dispatch.state = Dispatch.REJECTED
                dispatch.save()

                courier.state = Courier.STANDING_BY
                courier.save()

                dispatch.package.state = Package.NEW
                dispatch.package.save()

            run_dispatch()
            return Decline(success=True)

        return Decline(success=False)


class Get(relay.ClientIDMutation):
    package_info = graphene.String()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.PENDING
        ).first()

        if dispatch:
            return Get(package_info=dispatch.package.serialize())

        return Get(package_info="No pending package for this courier.")


class Accept(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.PENDING
        ).first()

        if dispatch:
            with transaction.atomic():
                dispatch.state = Dispatch.SHIPPING
                dispatch.save()

                courier.state = Courier.SHIPPING
                courier.save()

                dispatch.package.state = Package.IN_TRANSIT
                dispatch.package.save()

            return Accept(success=True)

        return Accept(success=False)


class Complete(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.SHIPPING
        ).first()

        if dispatch:
            with transaction.atomic():
                dispatch.state = Dispatch.SHIPPED
                dispatch.save()

                courier.state = Courier.IDLE
                courier.save()

                dispatch.package.state = Package.DELIVERED
                dispatch.package.save()

            return Complete(success=True)

        return Complete(success=False)


class Fail(relay.ClientIDMutation):
    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)
        dispatch = Dispatch.objects.filter(
            courier=courier, state=Dispatch.SHIPPING
        ).first()

        if dispatch:
            with transaction.atomic():
                dispatch.state = Dispatch.FAILED
                dispatch.save()

                courier.state = Courier.IDLE
                courier.save()

                dispatch.package.state = Package.FAILED
                dispatch.package.save()

            return Fail(success=True)

        return Fail(success=False)


class LocUpdate(relay.ClientIDMutation):
    success = graphene.Boolean()

    class Input:
        lat = graphene.String(required=True)
        lng = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        courier = get_authenticated_courier(info.context.user)

        lat = input.get("lat")
        lng = input.get("lng")

        courier.lat = lat
        courier.lng = lng
        courier.last_pos_update = datetime.now()

        # Optional: Update readable location address
        courier.update_location(lat, lng, geolocator)

        courier.save()

        logger = logging.getLogger("location_logger")
        logger.info(
            f"{courier}: {lat}, {lng} @ {courier.last_pos_update.isoformat()}"
        )

        return LocUpdate(success=True)
    
class UpdateTrackingLocation(relay.ClientIDMutation):
    class Input:
        tracking_id = graphene.ID(required=True)
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)
        status = graphene.String()
        notes = graphene.String()

    tracking = graphene.Field(TrackingNode)
    event = graphene.Field(TrackingEventNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, tracking_id, latitude, longitude, **kwargs):
        try:
            _, track_id = from_global_id(tracking_id)
            tracking = Tracking.objects.get(pk=track_id)
            
            # Update tracking location
            tracking.current_location = f"{latitude},{longitude}"
            
            # Update status if provided
            status = kwargs.get('status')
            if status and status in dict(Tracking.STATUS_CHOICES):
                tracking.current_status = status
            
            tracking.save()
            
            # Create tracking event
            event = TrackingEvent.objects.create(
                tracking=tracking,
                status=tracking.current_status,
                location=tracking.current_location,
                latitude=latitude,
                longitude=longitude,
                description=kwargs.get('notes', 'Location updated'),
                timestamp=timezone.now()
            )
            
            # Send notifications if needed
            if tracking.preferences.email_updates or tracking.preferences.sms_updates:
                from .tasks import send_tracking_update
                send_tracking_update.delay(tracking.id, event.id)
            
            return UpdateTrackingLocation(tracking=tracking, event=event)
        except Exception as e:
            raise GraphQLError(str(e))

class CompleteDelivery(relay.ClientIDMutation):
    class Input:
        tracking_id = graphene.ID(required=True)
        signature_image = Upload(required=False)
        notes = graphene.String()
        proof_image = Upload(required=False)

    tracking = graphene.Field(TrackingNode)
    receipt = graphene.Field(ReceiptType)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, tracking_id, **kwargs):
        try:
            _, track_id = from_global_id(tracking_id)
            tracking = Tracking.objects.get(pk=track_id)
            
            # Update tracking status
            tracking.current_status = 'delivered'
            tracking.delivery_notes = kwargs.get('notes', '')
            tracking.last_updated = timezone.now()
            
            # Handle delivery proof
            proof_image = kwargs.get('proof_image')
            if proof_image:
                tracking.delivery_proof.save(
                    f'delivery_{tracking.tracking_number}.jpg',
                    proof_image
                )
            
            tracking.save()
            
            # Create final tracking event
            TrackingEvent.objects.create(
                tracking=tracking,
                status='delivered',
                location=tracking.package.delivery_location,
                description='Package delivered successfully',
                timestamp=timezone.now()
            )
            
            # Generate receipt if not already exists
            receipt, created = Receipt.objects.get_or_create(
                package=tracking.package,
                defaults={
                    'amount': tracking.package.price,
                    'payment_status': 'completed',
                    'issued_at': timezone.now()
                }
            )
            
            return CompleteDelivery(tracking=tracking, receipt=receipt)
        except Exception as e:
            raise GraphQLError(str(e))

class LogisticsMutation(graphene.ObjectType):
    # LogisticsType CRUD
    create_logistics_type = CreateLogisticsTypeMutation.Field()
    update_logistics_type = UpdateLogisticsTypeMutation.Field()
    delete_logistics_type = DeleteLogisticsTypeMutation.Field()

    # Courier CRUD
    create_courier = CreateCourier.Field()
    update_courier = UpdateCourierMutation.Field()
    delete_courier = DeleteCourierMutation.Field()

    # Package CRUD
    create_package = CreatePackageMutation.Field()
    update_package = UpdatePackageMutation.Field()
    delete_package = DeletePackageMutation.Field()

    # Courier state & location
    check_in = CheckIn.Field()
    leave = Leave.Field()
    decline = Decline.Field()
    get = Get.Field()
    accept = Accept.Field()
    complete = Complete.Field()
    fail = Fail.Field()
    loc_update = LocUpdate.Field()
