import logging
import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import TextField
from django.db.models.indexes import BTreeIndex, GinIndex
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from geopy.exc import GeocoderServiceError
from geopy.geocoders import Nominatim
from mptt.models import MPTTModel, TreeManager
from django.contrib.postgres.indexes import GinIndex
from django_resized import ResizedImageField
from .utils import get_coordinates, get_headshot_image, get_image_format, clean_editor_js
from ..core.models import ModelWithMetadata, SeoModel  # Assuming these are your custom abstract base classes
from accounts.models import UserProfile
logger = logging.getLogger(__name__)
geolocator = Nominatim(user_agent="realestate-application")

# =====================
# Constants
# =====================
PROPERTY_TYPES = (
    ("house", _("House")),
    ("apartment", _("Apartment")),
    ("office", _("Office")),
    ("warehouse", _("Warehouse")),
    ("land", _("Land")),
)

PROPERTY_STATUS = (
    ("draft", _("Draft")),
    ("published", _("Published")),
    ("sold", _("Sold")),
    ("rented", _("Rented")),
    ("pending_review", _("Pending Review")),
    ("rejected", _("Rejected")),
    ("approved", _("Approved")),
)

PROPERTY_FOR = (
    ("B", "Buy"),
    ("S", "Sale"),
    ("R", "Rent"),
    ("L", "Lease"),
)

PROPERTY_AREAS = (
    ("R", "Residential"),
    ("C", "Commercial"),
    ("A", "Agricultural"),
)

# =====================
# Utility Functions
# =====================
def listing_dir_path(instance, filename):
    """Generates unique upload path for listing images"""
    ext = filename.split('.')[-1]
    filename = f"{instance.pk or uuid.uuid4().hex}.{ext}"
    return f"listings/{filename}"


# =====================
# Abstract Models
# =====================
class TimeStampedModel(models.Model):
    """Abstract base model for timestamp fields"""
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class LocationModel(models.Model):
    """Abstract model for location-based models"""
    address = models.ForeignKey(
        "accounts.Address", on_delete=models.CASCADE, null=True, blank=True
    )
    location = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        abstract = True

    def update_location(self, latitude, longitude):
        try:
            location = geolocator.reverse((latitude, longitude))
            if location:
                self.location = location.address
                self.save()
            else:
                raise ValueError("Geocoding service returned empty response")
        except GeocoderServiceError as e:
            logger.error(f"Geocoding service error: {e}")
            raise ValidationError(f"Unable to update location: {e}")
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid coordinates or unexpected error: {e}")
            raise ValidationError(f"Invalid coordinates: {e}")


# =====================
# Core Models
# =====================
class Client(LocationModel):
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="as_client",
    )

    def __str__(self):
        return f"Client: {self.client}"


class Agent(LocationModel):
    agent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="as_agent",
    )

    def __str__(self):
        return f"Agent: {self.agent}"


class ListingCategory(ModelWithMetadata, MPTTModel, SeoModel):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)
    description_plaintext = TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )
    background_image = models.ImageField(upload_to="category-backgrounds", blank=True, null=True)
    background_image_alt = models.CharField(max_length=128, blank=True)

    objects = models.Manager()
    tree = TreeManager()

    class Meta:
        indexes = [
            GinIndex(
                name="category_search_name_slug_gin",
                fields=["name", "slug", "description_plaintext"],
                opclasses=["gin_trgm_ops"] * 3,
            ),
            BTreeIndex(fields=["updated_at"], name="updated_at_idx"),
        ]

    def __str__(self) -> str:
        return self.name


class ListingType(TimeStampedModel):
    property_type = models.CharField(max_length=100, choices=PROPERTY_TYPES, unique=True)

    def __str__(self):
        return self.property_type


class Listing(TimeStampedModel):
    property_area = models.CharField(max_length=20, choices=PROPERTY_AREAS)
    listing_type = models.ForeignKey(ListingType, on_delete=models.CASCADE, verbose_name=_("Listing type"))
    property_category = models.ForeignKey(
        ListingCategory, related_name="products", on_delete=models.SET_NULL, null=True, blank=True
    )
    title = models.CharField(max_length=50, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    bedrooms = models.PositiveIntegerField(blank=True, null=True)
    property_location = models.CharField(max_length=255, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    ceiling_height = models.FloatField(blank=True, null=True)
    bathrooms = models.PositiveIntegerField(blank=True, null=True)
    garage = models.IntegerField(default=0)
    square_feet = models.FloatField()
    lot_size = models.FloatField()
    image = ResizedImageField(size=[1200, 630], upload_to=listing_dir_path)
    property_status = models.CharField(max_length=40, choices=PROPERTY_STATUS, default="draft")
    property_for = models.CharField(max_length=5, choices=PROPERTY_FOR, default="S")
    is_published = models.BooleanField(default=False)
    year_built = models.PositiveIntegerField(default=0)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, null=True, blank=True, related_name="listings_agent")
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="owner_listings", null=True, blank=True
    )
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="reviewed_listings"
    )
    free_from = models.DateField(default=timezone.now, blank=True)

    class Meta:
        ordering = ["-created"]
        permissions = [
            ("can_create_update_listing", "Can create and update listing"),
            ("can_publish_listing", "Can publish listing"),
            ("can_submit_listing_for_review", "Can submit listing for review"),
            ("can_reject_listing", "Can reject listing"),
        ]
        indexes = [
            GinIndex(fields=['description'], name='description_gin_index'),
        ]

    def __str__(self):
        return f"{self.title or 'No Title'} - {self.property_status}"

    def publish(self):
        self.property_status = "published"
        self.save()

    def submit_for_review(self):
        self.property_status = "pending_review"
        self.save()

    def reject(self):
        self.property_status = "rejected"
        self.save()

    def delete(self, *args, **kwargs):
        if self.owner or self.agent:
            raise PermissionError("Agents and owners are not allowed to delete listings.")
        super().delete(*args, **kwargs)

    @property
    def free_date(self):
        return _("Immediately") if self.free_from <= timezone.now().date() else self.free_from

    @property
    def price_with_currency(self):
        return f"${self.price}" if self.price else "Price Not Set"

    @property
    def sqft_formatted(self):
        return f"{self.square_feet} sq ft" if self.square_feet else "Not Specified"

    @property
    def ceiling_height_formatted(self):
        return f"{self.ceiling_height} ft" if self.ceiling_height else "N/A"

    @property
    def total_rooms(self):
        return (
            self.bedrooms + self.bathrooms
            if self.bedrooms is not None and self.bathrooms is not None
            else "N/A"
        )
    def save(self, *args, **kwargs):
        """Override save to log changes and trigger notifications"""
        if self.pk:  # Only for updates, not creations
            original = Listing.objects.get(pk=self.pk)
            changed_fields = {}
            for field in self._meta.fields:
                field_name = field.name
                original_val = getattr(original, field_name)
                current_val = getattr(self, field_name)
                if original_val != current_val:
                    changed_fields[field_name] = {
                        'old': str(original_val),
                        'new': str(current_val)
                    }
            
            if changed_fields:
                PropertyUpdateLog.objects.create(
                    property=self,
                    updated_by=getattr(self, 'updated_by', None),
                    changed_fields=changed_fields
                )
        
        super().save(*args, **kwargs)
        
        # Trigger real-time update after save completes
        from .signals import property_updated
        property_updated.send(sender=self.__class__, instance=self)


class ListingImage(TimeStampedModel):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="images")
    image = ResizedImageField(size=[1200, 630], upload_to=listing_dir_path)
    short_description = models.TextField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.listing.title or 'No Title'} - {self.image.name}"


class ListingFile(TimeStampedModel):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="files")
    name = models.CharField(max_length=255)
    short_description = models.TextField(blank=True)
    file = models.FileField(upload_to="listings/files/", null=True, blank=True)
    for_customer = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.listing.title or 'No Title'})"
    
    
class PropertySubscription(models.Model):
    """Tracks which users are subscribed to which property types/locations"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    property_type = models.CharField(max_length=50, blank=True, null=True)
    location = gis_models.PointField(null=True, blank=True)
    radius_km = models.PositiveIntegerField(default=10)  # Search radius
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            GinIndex(fields=['property_type']),
            models.Index(fields=['user']),
        ]

class PropertyUpdateLog(models.Model):
    """Logs all updates for real-time notifications"""
    property = models.ForeignKey('Listing', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    changed_fields = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['property', 'timestamp']),
        ]


class LocationPreference(models.Model):
    """Stores specific locations buyers are interested in"""
    name = models.CharField(max_length=100)
    location = gis_models.PointField()
    radius_km = models.PositiveIntegerField(default=5)
    buyer = models.ForeignKey(
        BuyerProfile,
        on_delete=models.CASCADE,
        related_name='location_preferences'
    )
    
    class Meta:
        indexes = [
            GistIndex(fields=['location']),
        ]

class PropertyProximity(models.Model):
    """Pre-calculated proximity data for faster queries"""
    property = models.ForeignKey(
        'Listing',
        on_delete=models.CASCADE,
        related_name='proximities'
    )
    buyer = models.ForeignKey(
        BuyerProfile,
        on_delete=models.CASCADE,
        related_name='property_proximities'
    )
    distance_km = models.FloatField()
    is_in_preferred_location = models.BooleanField()
    score = models.FloatField(
        help_text="Calculated proximity score (0-100)"
    )
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('property', 'buyer')
        indexes = [
            models.Index(fields=['distance_km']),
            models.Index(fields=['score']),
            models.Index(fields=['is_in_preferred_location']),
        ]
        
          
# models.py
class SavedSearch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    search_parameters = models.JSONField()
    is_active = models.BooleanField(default=True)
    last_notified = models.DateTimeField(null=True, blank=True)
    
    def execute_search(self):
        from django.db.models import Q
        query = Q()
        
        # Build query from saved parameters
        if 'min_price' in self.search_parameters:
            query &= Q(price__gte=self.search_parameters['min_price'])
        if 'property_types' in self.search_parameters:
            query &= Q(listing_type__in=self.search_parameters['property_types'])
        # Add more filters as needed
        
        return Listing.objects.filter(query)
    
# models.py
class VirtualTour(models.Model):
    property = models.ForeignKey(Listing, on_delete=models.CASCADE)
    tour_url = models.URLField()
    thumbnail = models.ImageField(upload_to='virtual_tours/')
    created_at = models.DateTimeField(auto_now_add=True)
    is_primary = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-is_primary', 'created_at']
        
# models.py
class LiveTourSchedule(models.Model):
    property = models.ForeignKey(Listing, on_delete=models.CASCADE)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    scheduled_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=30)
    meeting_link = models.URLField()
    max_attendees = models.PositiveIntegerField(default=10)
    attendees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='LiveTourRegistration'
    )
    
    def is_fully_booked(self):
        return self.attendees.count() >= self.max_attendees

class LiveTourRegistration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tour = models.ForeignKey(LiveTourSchedule, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)
    attended = models.BooleanField(default=False)
    
# models.py
class DocumentPackage(models.Model):
    property = models.ForeignKey(Listing, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

class Document(models.Model):
    package = models.ForeignKey(DocumentPackage, on_delete=models.CASCADE)
    file = models.FileField(upload_to='property_documents/')
    title = models.CharField(max_length=200)
    requires_signature = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

class DocumentSignature(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    signed_at = models.DateTimeField(auto_now_add=True)
    signature_image = models.ImageField(upload_to='signatures/')
    ip_address = models.GenericIPAddressField()
    
# models.py
class MessageThread(models.Model):
    property = models.ForeignKey(Listing, on_delete=models.CASCADE, null=True, blank=True)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    thread = models.ForeignKey(MessageThread, on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

class MessageAttachment(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    file = models.FileField(upload_to='message_attachments/')
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50)
    
# models.py
class Neighborhood(models.Model):
    name = models.CharField(max_length=200)
    boundary = gis_models.PolygonField()
    avg_price = models.DecimalField(max_digits=12, decimal_places=2)
    avg_price_per_sqft = models.DecimalField(max_digits=8, decimal_places=2)
    school_rating = models.DecimalField(max_digits=3, decimal_places=1)
    crime_rate = models.DecimalField(max_digits=5, decimal_places=2)
    amenities_score = models.PositiveIntegerField()

class MarketTrend(models.Model):
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE)
    date = models.DateField()
    median_price = models.DecimalField(max_digits=12, decimal_places=2)
    listings_count = models.PositiveIntegerField()
    avg_days_on_market = models.PositiveIntegerField()
    price_per_sqft = models.DecimalField(max_digits=8, decimal_places=2)

# models.py
class ARModel(models.Model):
    property = models.ForeignKey(Listing, on_delete=models.CASCADE)
    model_url = models.URLField()
    scale = models.FloatField(default=1.0)
    anchor_type = models.CharField(max_length=50, choices=[
        ('plane', 'Horizontal Plane'),
        ('image', 'Image Target'),
        ('location', 'GPS Location')
    ])
    preview_image = models.ImageField(upload_to='ar_previews/')
    
# models.py
class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pre_offer', 'Pre-Offer'),
        ('offer_pending', 'Offer Pending'),
        ('under_contract', 'Under Contract'),
        ('due_diligence', 'Due Diligence'),
        ('closing', 'Closing'),
        ('closed', 'Closed'),
        ('cancelled', 'Cancelled')
    ]
    
    property = models.ForeignKey(Listing, on_delete=models.PROTECT)
    buyer = models.ForeignKey(Client, on_delete=models.PROTECT)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    offer_price = models.DecimalField(max_digits=12, decimal_places=2)
    agreed_price = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    target_close_date = models.DateField()
    actual_close_date = models.DateField(null=True)

class TransactionMilestone(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    due_date = models.DateField()
    completed_date = models.DateField(null=True)
    required = models.BooleanField(default=True)
    documents = models.ManyToManyField(Document)