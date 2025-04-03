import logging
import random
import string

from django.conf import settings

# from django.db import models
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.crypto import get_random_string
from geopy.exc import GeocoderServiceError
from geopy.geocoders import Nominatim
from phonenumber_field.modelfields import PhoneNumberField
from core.units import MeasurementUnits
from django_prices.models import MoneyField, TaxedMoneyField
from taxi.models import Vehicle
from django.db import models
from django.utils import timezone


# Initialize geolocator and logger
geolocator = Nominatim(user_agent="server")
logger = logging.getLogger(__name__)



class TimeStampedModel(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class LocationMixin(models.Model):
    location = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        abstract = True

    def update_location(self, latitude, longitude, geolocator):
        try:
            loc = geolocator.reverse((latitude, longitude))
            if loc:
                self.location = loc.address
                self.save()
        except Exception as e:
            logger.error(f"Error updating location: {e}")

class LogisticsType(models.Model):
    VEHICLE_CHOICES = [
        ("Truck", "Truck"),
        ("Lorry", "Lorry"),
        ("Bus", "Bus"),
        ("Van", "Van"),
        ("Car", "Car"),
        ("Bike", "Bike"),
    ]

    vehicle_type = models.CharField(
        max_length=100, choices=VEHICLE_CHOICES, default="Bike"
    )

    def __str__(self):
        return self.vehicle_type

class Courier(LocationMixin, TimeStampedModel):
    STATE_CHOICES = [
        ("idle", "Idle"),
        ("standing_by", "Standing by"),
        ("pending", "Pending"),
        ("shipping", "Shipping"),
    ]

    courier = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.CASCADE,
        related_name="as_courier"
    )
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default="idle")
    route = models.LineStringField(null=True, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.courier.first_name if self.courier else 'Courier'}"

class Package(TimeStampedModel):
    STATE_CHOICES = [
        ("new", "New"),
        ("created", "Created"),
        ("pickup_scheduled", "Pickup scheduled"),
        ("picked_up", "Picked up"),
        ("in_transit", "In transit"),
        ("out_for_delivery", "Out for delivery"),
        ("delivered", "Delivered"),
        ("failed", "Failed"),
    ]

    PAYMENT_METHODS = [("cash", "Cash"), ("card", "Card")]

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_packages"
    )
    receiver_name = models.CharField(max_length=255)
    receiver_phone_number = PhoneNumberField(blank=True, null=True, db_index=True)
    receiver_email = models.EmailField(blank=True, null=True)
    pickup_location = models.CharField(max_length=255)
    delivery_location = models.CharField(max_length=255)
    pickup_latitude = models.FloatField(null=True, blank=True)
    pickup_longitude = models.FloatField(null=True, blank=True)
    delivery_latitude = models.FloatField(null=True, blank=True)
    delivery_longitude = models.FloatField(null=True, blank=True)
    pickup_time = models.TimeField()
    duration = models.DurationField(blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    size = models.CharField(
        max_length=100, choices=MeasurementUnits.CHOICES, blank=True, null=True
    )
    weight = models.CharField(
        max_length=100, choices=MeasurementUnits.CHOICES, blank=True, null=True
    )
    fragility = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    vehicle_type = models.ForeignKey(LogisticsType, on_delete=models.CASCADE)
    state = models.CharField(max_length=30, choices=STATE_CHOICES, default="created")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, null=True, blank=True)
    sender_rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    rider_rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    receipts = models.FileField(null=True, blank=True)
    package_count = models.PositiveIntegerField(null=True, blank=True)
    cancelled_reason = models.CharField(max_length=255, null=True, blank=True)
    ref_code = models.CharField(max_length=8, editable=False)

    def save(self, *args, **kwargs):
        # Generate reference code if not present
        if not self.ref_code:
            self.ref_code = get_random_string(8).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.sender.first_name}'s package {self.ref_code}"

class Dispatch(TimeStampedModel):
    STATE_CHOICES = [
        (1, "PENDING"),
        (2, "REJECTED"),
        (3, "SHIPPING"),
        (4, "SHIPPED"),
        (5, "FAILED"),
        (6, "TIMED_OUT"),
    ]

    state = models.IntegerField(choices=STATE_CHOICES, default=1)
    courier = models.ForeignKey("Courier", on_delete=models.CASCADE, blank=True, null=True)
    package = models.ForeignKey("Package", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"Dispatch - Package: {self.package}, Courier: {self.courier}, State: {self.get_state_display()}"

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

    package = models.OneToOneField(
        Package, 
        on_delete=models.CASCADE,
        related_name='tracking_info'
    )
    tracking_number = models.CharField(max_length=50, unique=True)
    current_status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    current_location = models.CharField(max_length=100)
    estimated_delivery = models.DateTimeField()
    last_updated = models.DateTimeField(auto_now=True)
    requires_signature = models.BooleanField(default=False)
    delivery_proof = models.ImageField(upload_to='delivery_proofs/', null=True, blank=True)
    delivery_notes = models.TextField(blank=True)

    def __str__(self):
        return f"Tracking #{self.tracking_number} - {self.get_current_status_display()}"

class TrackingEvent(models.Model):
    tracking = models.ForeignKey(
        Tracking,
        on_delete=models.CASCADE,
        related_name='events'
    )
    status = models.CharField(max_length=20, choices=Tracking.STATUS_CHOICES)
    location = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.tracking.tracking_number} - {self.get_status_display()} at {self.timestamp}"

class TrackingPreference(models.Model):
    tracking = models.OneToOneField(
        Tracking,
        on_delete=models.CASCADE,
        related_name='preferences'
    )
    email_updates = models.BooleanField(default=True)
    sms_updates = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    preferred_language = models.CharField(max_length=10, default='en')

    def __str__(self):
        return f"Notification prefs for {self.tracking.tracking_number}"
    
    





