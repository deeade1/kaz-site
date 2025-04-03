from django.contrib.gis.db import models as gis_models
from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import get_user_model
from phonenumber_field.modelfields import PhoneNumberField
from django_resized import ResizedImageField
from django.utils import timezone

User = get_user_model()

class ServiceProviderProfile(models.Model):
    """Base profile for both drivers and couriers"""
    PROVIDER_TYPES = [
        ('driver', 'Driver'),
        ('courier', 'Courier'),
        ('rider', 'Rider')
    ]
    
    LICENSE_TYPES = [
        ('standard', 'Standard'),
        ('professional', 'Professional'),
        ('commercial', 'Commercial')
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='service_provider')
    provider_type = models.CharField(max_length=20, choices=PROVIDER_TYPES)
    license_number = models.CharField(max_length=50, blank=True)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPES, blank=True)
    is_available = models.BooleanField(default=True)
    current_service = models.ForeignKey('ServiceRequest', null=True, blank=True, on_delete=models.SET_NULL)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    location = gis_models.PointField(geography=True, null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    last_active = models.DateTimeField(auto_now=True)
    is_online = models.BooleanField(default=False)
    
    class Meta:
        indexes = [
            GistIndex(fields=['location']),
            models.Index(fields=['is_available', 'is_online']),
        ]
    
    def update_location(self, latitude, longitude):
        self.location = Point(longitude, latitude)
        self.save()

class Vehicle(models.Model):
    """Unified vehicle model for both taxi and logistics"""
    VEHICLE_CATEGORIES = [
        ('taxi', 'Taxi'),
        ('logistics', 'Logistics'),
        ('dual', 'Taxi & Logistics'),
    ]
    
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
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vehicles')
    category = models.CharField(max_length=20, choices=VEHICLE_CATEGORIES)
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    license_plate = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=30)
    passenger_capacity = models.PositiveSmallIntegerField(default=4)
    cargo_capacity = models.PositiveIntegerField(default=0)  # in kg
    is_active = models.BooleanField(default=True)
    current_provider = models.ForeignKey(
        ServiceProviderProfile, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='current_vehicle'
    )
    
    class Meta:
        indexes = [
            models.Index(fields=['vehicle_type', 'is_active']),
            models.Index(fields=['category', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.make} {self.model} ({self.license_plate})"

class ServiceRequest(models.Model):
    """Base model for both trips and deliveries"""
    SERVICE_TYPES = [
        ('taxi', 'Taxi Ride'),
        ('delivery', 'Package Delivery'),
        ('shared', 'Shared Ride'),
        ('food', 'Food Delivery'),
        ('cargo', 'Cargo Transport'),
    ]
    
    STATUS_CHOICES = [
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transport_requests')
    provider = models.ForeignKey(
        ServiceProviderProfile, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_services'
    )
    vehicle = models.ForeignKey(
        Vehicle, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='service_assignments'
    )
    pickup_location = gis_models.PointField(geography=True)
    dropoff_location = gis_models.PointField(geography=True, null=True, blank=True)
    pickup_address = models.CharField(max_length=255)
    dropoff_address = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    route = gis_models.LineStringField(geography=True, null=True, blank=True)
    estimated_distance = models.FloatField(null=True, blank=True)  # in km
    estimated_duration = models.FloatField(null=True, blank=True)  # in minutes
    actual_distance = models.FloatField(null=True, blank=True)
    actual_duration = models.FloatField(null=True, blank=True)
    base_fare = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    distance_fare = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    time_fare = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    total_fare = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    customer_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    provider_rating = models.PositiveSmallIntegerField(null=True, blank=True)
    
    class Meta:
        indexes = [
            GistIndex(fields=['pickup_location', 'dropoff_location']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['service_type', 'status']),
        ]
    
    def calculate_fare(self):
        """Dynamic fare calculation based on service type"""
        pricing = PricingProfile.get_current_pricing(self.service_type)
        
        if self.service_type == 'taxi':
            self.base_fare = pricing.base_fare
            self.distance_fare = (self.estimated_distance or 0) * pricing.per_km_rate
            self.time_fare = (self.estimated_duration or 0) * pricing.per_minute_rate
            self.total_fare = self.base_fare + self.distance_fare + self.time_fare
            
        elif self.service_type == 'delivery':
            self.base_fare = pricing.base_fare
            self.distance_fare = (self.estimated_distance or 0) * pricing.per_km_rate
            self.total_fare = self.base_fare + self.distance_fare
            
        self.save()

class Trip(ServiceRequest):
    """Specialization for passenger transport"""
    shared = models.BooleanField(default=False)
    available_seats = models.PositiveSmallIntegerField(default=1)
    rider_count = models.PositiveSmallIntegerField(default=1)
    special_requests = models.TextField(blank=True)
    
    class Meta:
        proxy = True
    
    def save(self, *args, **kwargs):
        self.service_type = 'taxi'
        super().save(*args, **kwargs)

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
    
    class Meta:
        proxy = True
    
    def save(self, *args, **kwargs):
        self.service_type = 'delivery'
        super().save(*args, **kwargs)

class PricingProfile(models.Model):
    """Dynamic pricing configuration for different service types"""
    SERVICE_TYPES = [
        ('taxi', 'Taxi Ride'),
        ('delivery', 'Package Delivery'),
        ('shared', 'Shared Ride'),
        ('food', 'Food Delivery'),
        ('cargo', 'Cargo Transport'),
    ]
    
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES, unique=True)
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    per_km_rate = models.DecimalField(max_digits=8, decimal_places=2)
    per_minute_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    min_fare = models.DecimalField(max_digits=8, decimal_places=2)
    surge_multiplier = models.DecimalField(max_digits=3, decimal_places=1, default=1.0)
    is_active = models.BooleanField(default=True)
    effective_from = models.DateTimeField(auto_now_add=True)
    
    @classmethod
    def get_current_pricing(cls, service_type):
        return cls.objects.filter(
            service_type=service_type, 
            is_active=True
        ).order_by('-effective_from').first()
            
class StopPoint(models.Model):
    trip = models.ForeignKey(
        'ServiceRequest',
        on_delete=models.CASCADE,
        related_name='stops'
    )
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=255)
    sequence = models.PositiveIntegerField()
    is_pickup = models.BooleanField(default=False)
    is_dropoff = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['sequence']
        unique_together = ('trip', 'sequence')

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
        'ServiceRequest',
        on_delete=models.CASCADE,
        related_name='shared_info',
        limit_choices_to={'service_type': 'shared'}
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
        indexes = [
            models.Index(fields=['status', 'day_time']),
            models.Index(fields=['available_seats']),
        ]

    def __str__(self):
        return f"Shared {self.get_day_time_display()} Trip #{self.trip.id} - {self.available_seats} seats left"

    def book_seat(self, user):
        """Book a seat on this shared trip"""
        if self.status == 'full':
            raise ValueError("This trip is already fully booked")
        
        if self.available_seats <= 0:
            self.status = 'full'
            self.save()
            raise ValueError("No available seats left")

        with transaction.atomic():
            # Create booking
            booking = Booking.objects.create(
                service_request=self.trip,
                user=user,
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
                amount=self.trip.total_fare,
                payment_status='completed'
            )

            # Notify other users if trip is now full
            if self.status == 'full':
                self.notify_waitlist_users()

            return booking, receipt

    def get_waitlist(self):
        """Get ordered waitlist for this trip"""
        return self.waitlist.select_related('user').order_by('joined_at')

    def add_to_waitlist(self, user):
        """Add user to waitlist for this trip"""
        if self.status != 'full':
            raise ValueError("Cannot join waitlist - trip still has available seats")
        
        entry, created = WaitlistEntry.objects.get_or_create(
            shared_trip=self,
            user=user,
            defaults={'joined_at': timezone.now()}
        )
        
        return entry

    def notify_waitlist_users(self):
        """Notify all waitlisted users when trip becomes full"""
        from .tasks import notify_waitlist_users
        notify_waitlist_users.delay(self.id)

    def release_seat(self):
        """Release a seat when a booking is cancelled"""
        if self.status == 'full':
            self.status = 'available'
        self.available_seats += 1
        self.save()
        
        # Notify first user on waitlist if any
        first_waitlisted = self.get_waitlist().first()
        if first_waitlisted:
            first_waitlisted.notify_availability()
            first_waitlisted.delete()

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
    notified_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('shared_trip', 'user')
        ordering = ['joined_at']
        verbose_name_plural = "Waitlist entries"

    def __str__(self):
        return f"Waitlist entry for {self.user.email} on Trip #{self.shared_trip.trip.id}"

    def notify_availability(self):
        """Notify user when a seat becomes available"""
        if self.notified:
            return False
            
        # Send notification (email, push, etc.)
        from .tasks import send_seat_available_notification
        send_seat_available_notification.delay(
            user_id=self.user.id,
            trip_id=self.shared_trip.trip.id
        )
        
        self.notified = True
        self.notified_at = timezone.now()
        self.save()
        return True

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    service_request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='confirmed')
    booked_at = models.DateTimeField(auto_now_add=True)

class Tracking(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('dispatched', 'Dispatched'),
        ('in_transit', 'In Transit'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('exception', 'Exception'),
        ('returned', 'Returned')
    ]
    
    service_request = models.OneToOneField(ServiceRequest, on_delete=models.CASCADE, related_name='tracking')
    tracking_number = models.CharField(max_length=50, unique=True)
    current_status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    current_location = models.CharField(max_length=100)
    estimated_delivery = models.DateTimeField()
    last_updated = models.DateTimeField(auto_now=True)

class TrackingEvent(models.Model):
    tracking = models.ForeignKey(Tracking, on_delete=models.CASCADE, related_name='events')
    status = models.CharField(max_length=20, choices=Tracking.STATUS_CHOICES)
    location = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

class Receipt(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('card', 'Credit/Debit Card'),
        ('mobile', 'Mobile Money'),
        ('wallet', 'Digital Wallet'),
    ]
    
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='receipt')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    payment_status = models.CharField(max_length=20, default='completed')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    issued_at = models.DateTimeField(default=timezone.now)