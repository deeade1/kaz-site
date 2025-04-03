import asyncio
import logging
import uuid
from datetime import timedelta
from decimal import Decimal
from django.utils import timezone
from django.contrib.postgres.indexes import GinIndex, GistIndex
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.contrib.gis.db import models as gis_models
from django.contrib.postgres.indexes import GinIndex
from django.contrib.gis.geos import Point, LineString
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models import Sum
from django.utils import timezone
from geopy.distance import geodesic
from geopy.exc import GeocoderServiceError
from geopy.geocoders import Nominatim
from asgiref.sync import sync_to_async, database_sync_to_async



# Constants
GIN_TRGM_OPS = {'opclass': 'gin_trgm_ops'}
geolocator = Nominatim(user_agent='location_app')
logger = logging.getLogger(__name__)


class Driver(UserProfile):
    LICENSE_TYPES = [
        ('standard', 'Standard'),
        ('professional', 'Professional'),
        ('commercial', 'Commercial')
    ]
    
    license_number = models.CharField(max_length=50)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPES)
    is_available = models.BooleanField(default=True)
    current_trip = models.ForeignKey('Trip', null=True, blank=True, on_delete=models.SET_NULL)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    class Meta:
        indexes = [
            GistIndex(fields=['location']),  # For spatial queries
            GinIndex(fields=['address'], name='driver_addr_gin', opclasses=['gin_trgm_ops'])
        ]
    @property
    def vehicle_type(self):
        return self.vehicle.vehicle_type if self.vehicle else None

    def update_location(self, latitude, longitude):
        self.location = Point(longitude, latitude)
        self.save()

    def calculate_rating(self):
        driver_trips = Trip.objects.filter(driver=self, completed=True)
        total_ratings = driver_trips.aggregate(Sum('rider_rating'))['rider_rating__sum'] or 0
        num_trips = driver_trips.count()
        self.rating = Decimal(total_ratings) / Decimal(num_trips) if num_trips > 0 else 0
        self.save()

    class Meta:
        indexes = [
            GinIndex(fields=['address'], name='driver_address_gin', opclasses=['gin_trgm_ops']),
        ]


class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('economy', 'Economy Car'),
        ('comfort', 'Comfort Car'),
        ('premium', 'Premium Car'),
        ('xl', 'XL Vehicle'),
        ('green', 'Eco Vehicle'),
        ('bike', 'Motorcycle'),
        ('cargo_bike', 'Cargo Bike'),
        ('van', 'Delivery Van'),
        ('truck', 'Truck')
    ]
    owner = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='vehicles')
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    license_plate = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=30)
    capacity = models.PositiveSmallIntegerField(default=4)
    max_load = models.PositiveIntegerField(default=0)  # in kg
    is_active = models.BooleanField(default=True)
    
    
    def __str__(self):
        return f"{self.make} {self.model} ({self.license_plate})"
    class Meta:
        indexes = [
            models.Index(fields=['vehicle_type', 'is_active'])
        ]


class Rider(UserProfile):
    payment_methods = models.ManyToManyField('PaymentMethod')
    preferred_vehicle_type = models.CharField(max_length=20, null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = gis_models.PointField(geography=True, null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.username

    def update_location(self, latitude, longitude):
        self.location = Point(longitude, latitude)
        self.save()

    class Meta:
        indexes = [
            GinIndex(fields=['address'], name='rider_address_gin', opclasses=['gin_trgm_ops']),
        ]

class ServiceRequest(models.Model):
    """Base model for both trips and deliveries"""
    REQUEST_TYPES = [
        ('taxi', 'Taxi Ride'),
        ('delivery', 'Package Delivery'),
        ('food', 'Food Delivery')
    ]
    
    STATUS_CHOICES = [
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    
    request_type = models.CharField(max_length=20, choices=REQUEST_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    requester = models.ForeignKey(FleetUser, on_delete=models.CASCADE, related_name='requests')
    assigned_to = models.ForeignKey(FleetUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='assignments')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    pickup_location = gis_models.PointField(geography=True)
    dropoff_location = gis_models.PointField(geography=True, null=True, blank=True)
    pickup_address = models.CharField(max_length=255)
    dropoff_address = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    route = gis_models.LineStringField(geography=True, null=True, blank=True)
    
    class Meta:
        indexes = [
            GistIndex(fields=['pickup_location', 'dropoff_location']),
            models.Index(fields=['status', 'created_at'])
        ]

class Trip(ServiceRequest):
    """Specialization for passenger transport"""
    estimated_distance = models.FloatField(null=True, blank=True)  # in km
    estimated_duration = models.FloatField(null=True, blank=True)  # in minutes
    actual_distance = models.FloatField(null=True, blank=True)
    actual_duration = models.FloatField(null=True, blank=True)
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    distance_fare = models.DecimalField(max_digits=8, decimal_places=2)
    time_fare = models.DecimalField(max_digits=8, decimal_places=2)
    total_fare = models.DecimalField(max_digits=8, decimal_places=2)
    rider_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    driver_rating = models.PositiveSmallIntegerField(null=True, blank=True)

class Delivery(ServiceRequest):
    """Specialization for package delivery"""
    package_description = models.TextField()
    package_weight = models.FloatField()  # in kg
    package_dimensions = models.CharField(max_length=50)  # "LxWxH" in cm
    package_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    requires_signature = models.BooleanField(default=False)
    insurance_required = models.BooleanField(default=False)
    delivery_instructions = models.TextField(blank=True)
    recipient_name = models.CharField(max_length=100)
    recipient_phone = models.CharField(max_length=20)
    base_fee = models.DecimalField(max_digits=8, decimal_places=2)
    distance_fee = models.DecimalField(max_digits=8, decimal_places=2)
    weight_fee = models.DecimalField(max_digits=8, decimal_places=2)
    total_fee = models.DecimalField(max_digits=8, decimal_places=2)
    customer_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    courier_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    
  


class Trip(models.Model):
    STATUS_CHOICES = [
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    pickup_location = gis_models.PointField(geography=True)
    dropoff_location = gis_models.PointField(geography=True)
    pickup_address = models.CharField(max_length=255)
    dropoff_address = models.CharField(max_length=255)
    requested_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    estimated_distance = models.FloatField(null=True, blank=True)  # in km
    estimated_duration = models.FloatField(null=True, blank=True)  # in minutes
    actual_distance = models.FloatField(null=True, blank=True)
    actual_duration = models.FloatField(null=True, blank=True)
    route = gis_models.LineStringField(geography=True, null=True, blank=True)
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    distance_fare = models.DecimalField(max_digits=8, decimal_places=2)
    time_fare = models.DecimalField(max_digits=8, decimal_places=2)
    total_fare = models.DecimalField(max_digits=8, decimal_places=2)
    rider_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    driver_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    start_location = gis_models.PointField(geography=True)
    end_location = gis_models.PointField(geography=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    distance = models.FloatField(null=True, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    route = gis_models.LineStringField(geography=True, null=True, blank=True)
    rider_rating = models.IntegerField(null=True, blank=True)
    driver_rating = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Trip {self.id} - {self.driver} -> {self.rider}"
     
    class Meta:
        indexes = [
            GistIndex(fields=['pickup_location', 'dropoff_location']),
            models.Index(fields=['status', 'requested_at'])
        ]
    
    def calculate_fare(self):
        """Dynamic fare calculation based on distance, time, and demand"""
        pricing = get_current_pricing()
        self.base_fare = pricing.base_fare
        self.distance_fare = self.estimated_distance * pricing.per_km_rate
        self.time_fare = self.estimated_duration * pricing.per_minute_rate
        self.total_fare = self.base_fare + self.distance_fare + self.time_fare
        self.save()     
    def calculate_cost(self):
        base_fare = Decimal('2.50')
        cost_per_km = Decimal('1.50')
        total_cost = base_fare + Decimal(self.distance) * cost_per_km
        self.cost = total_cost
        self.save()

    def calculate_distance(self):
        start = (self.start_location.y, self.start_location.x)
        end = (self.end_location.y, self.end_location.x)
        self.distance = geodesic(start, end).kilometers
        self.save()

    def calculate_duration(self):
        if self.start_time and self.end_time:
            duration = self.end_time - self.start_time
            return duration.total_seconds() / 60
        return 0

    def clean(self):
        if self.start_location == self.end_location:
            raise ValidationError("Start and end locations cannot be the same.")

    @classmethod
    def calculate_driver_rating(cls, driver):
        driver_trips = cls.objects.filter(driver=driver, completed=True)
        total_ratings = driver_trips.aggregate(Sum('rider_rating'))['rider_rating__sum'] or 0
        num_trips = driver_trips.count()
        return Decimal(total_ratings) / Decimal(num_trips) if num_trips > 0 else 0

    @classmethod
    def calculate_rider_rating(cls, rider):
        rider_trips = cls.objects.filter(rider=rider, completed=True)
        total_ratings = rider_trips.aggregate(Sum('driver_rating'))['driver_rating__sum'] or 0
        num_trips = rider_trips.count()
        return Decimal(total_ratings) / Decimal(num_trips) if num_trips > 0 else 0

    @classmethod
    async def create_route(cls, trip_id, locations):
        try:
            trip = await cls.objects.aget(id=trip_id)
            points = [Point(lon, lat) for lat, lon in locations]
            trip.route = LineString(points)
            await database_sync_to_async(trip.save)()
        except cls.DoesNotExist:
            logger.error(f"Trip with id {trip_id} does not exist.")

    async def asave(self, *args, **kwargs):
        await self.async_geocode_locations()
        await database_sync_to_async(super().save)(*args, **kwargs)
        await self.update_driver_rider_rating()

    async def async_geocode_locations(self):
        async with transaction.async_atomic():
            await asyncio.gather(
                self.geocode_location('start_location'),
                self.geocode_location('end_location')
            )

    async def geocode_location(self, location_field):
        location = getattr(self, location_field)
        if location:
            lat, lon = location.y, location.x
            cache_key = f'geocode:{lat},{lon}'
            cached_address = cache.get(cache_key)

            if cached_address:
                setattr(self, f'{location_field}_address', cached_address)
            else:
                try:
                    loop = asyncio.get_event_loop()
                    address = await loop.run_in_executor(
                        None,
                        lambda: geolocator.reverse((lat, lon)).address
                    )
                    if address:
                        setattr(self, f'{location_field}_address', address)
                        cache.set(cache_key, address, timeout=86400)
                except GeocoderServiceError as e:
                    logger.error(f"Geocoding failed for {location_field}: {e}")

    async def update_driver_rider_rating(self):
        await asyncio.gather(
            self.update_driver_rating(),
            self.update_rider_rating()
        )

    async def update_driver_rating(self):
        self.driver.rating = await sync_to_async(self.calculate_driver_rating)(self.driver)
        await database_sync_to_async(self.driver.save)()

    async def update_rider_rating(self):
        self.rider.rating = await sync_to_async(self.calculate_rider_rating)(self.rider)
        await database_sync_to_async(self.rider.save)()


class SharedTrip(models.Model):
    DAY_TIME_CHOICES = [
        ('day', 'Day Trip'),
        ('night', 'Night Trip'),
    ]
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('full', 'Fully Booked'),
        ('departed', 'Departed'),
        ('completed', 'Completed'),
    ]

    trip = models.OneToOneField(
        'Trip',
        on_delete=models.CASCADE,
        related_name='shared_info'
    )
    available_seats = models.PositiveIntegerField(
        default=3,
        validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    day_time = models.CharField(
        max_length=10,
        choices=DAY_TIME_CHOICES,
        default='day'
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='available'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Shared Trip"
        verbose_name_plural = "Shared Trips"
        ordering = ['-created_at']

    def __str__(self):
        return f"Shared {self.get_day_time_display()} Trip #{self.trip.id} - {self.available_seats} seats left"

    def book_seat(self, user):
        """Book a seat on this shared trip"""
        from .models import Booking, Receipt
        
        if self.status == 'full':
            raise ValueError("This trip is already fully booked")
        
        if self.available_seats <= 0:
            self.status = 'full'
            self.save()
            raise ValueError("No available seats left")

        # Create booking
        booking = Booking.objects.create(
            trip=self.trip,
            user=user,
            shared_trip=self,
            status='confirmed'
        )

        # Reduce available seats
        self.available_seats -= 1
        if self.available_seats <= 0:
            self.status = 'full'
        self.save()

        # Generate receipt
        receipt = Receipt.objects.create(
            booking=booking,
            amount=self.trip.cost,
            payment_status='completed',
            issued_at=timezone.now()
        )

        return booking, receipt

    def get_waitlist(self):
        """Get users on the waitlist for this trip"""
        return self.waitlist.all().order_by('joined_at')

    def add_to_waitlist(self, user):
        """Add user to waitlist for this trip"""
        from .models import WaitlistEntry
        
        if self.status != 'full':
            raise ValueError("Cannot join waitlist - trip still has available seats")
        
        entry, created = WaitlistEntry.objects.get_or_create(
            shared_trip=self,
            user=user,
            defaults={'joined_at': timezone.now()}
        )
        
        return entry


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    trip = models.ForeignKey(
        'Trip',
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    shared_trip = models.ForeignKey(
        SharedTrip,
        on_delete=models.CASCADE,
        related_name='bookings',
        null=True,
        blank=True
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trip_bookings'
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='confirmed'
    )
    booked_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking #{self.id} - {self.user.username} for Trip #{self.trip.id}"


class WaitlistEntry(models.Model):
    shared_trip = models.ForeignKey(
        SharedTrip,
        on_delete=models.CASCADE,
        related_name='waitlist'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trip_waitlists'
    )
    joined_at = models.DateTimeField(auto_now_add=True)
    notified = models.BooleanField(default=False)

    class Meta:
        unique_together = ('shared_trip', 'user')
        ordering = ['joined_at']

    def __str__(self):
        return f"Waitlist entry for {self.user.username} on Trip #{self.shared_trip.trip.id}"


class Receipt(models.Model):
    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name='receipt'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
            ('refunded', 'Refunded'),
        ],
        default='completed'
    )
    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    issued_at = models.DateTimeField()
    pdf = models.FileField(
        upload_to='receipts/',
        null=True,
        blank=True
    )

    def generate_pdf(self):
        """Generate PDF receipt (implementation depends on your PDF library)"""
        # Example using reportlab or weasyprint
        # This should return the generated PDF file
        pass

    def save(self, *args, **kwargs):
        if not self.issued_at:
            self.issued_at = timezone.now()
        super().save(*args, **kwargs)
        if not self.pdf and self.payment_status == 'completed':
            self.pdf = self.generate_pdf()
            self.save()

    def __str__(self):
        return f"Receipt #{self.id} for Booking #{self.booking.id}"