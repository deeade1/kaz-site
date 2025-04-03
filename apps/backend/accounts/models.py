from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.postgres.indexes import GinIndex
from phonenumber_field.modelfields import PhoneNumberField
from django_resized import ResizedImageField

from core.models import ModelWithExternalReference, ModelWithMetadata

STATE_CHOICES = [
    ("", "Select State"),
    ("NG-AB", "Abia"), ("NG-AD", "Adamawa"), ("NG-AK", "Akwa Ibom"), ("NG-AN", "Anambra"),
    ("NG-BA", "Bauchi"), ("NG-BY", "Bayelsa"), ("NG-BE", "Benue"), ("NG-BO", "Borno"),
    ("NG-CR", "Cross River"), ("NG-DE", "Delta"), ("NG-EB", "Ebonyi"), ("NG-ED", "Edo"),
    ("NG-EK", "Ekiti"), ("NG-EN", "Enugu"), ("NG-FCT", "Federal Capital Territory"),
    ("NG-GO", "Gombe"), ("NG-IM", "Imo"), ("NG-JI", "Jigawa"), ("NG-KD", "Kaduna"),
    ("NG-KN", "Kano"), ("NG-KT", "Katsina"), ("NG-KE", "Kebbi"), ("NG-KO", "Kogi"),
    ("NG-KW", "Kwara"), ("NG-LA", "Lagos"), ("NG-NA", "Nasarawa"), ("NG-NI", "Niger"),
    ("NG-OG", "Ogun"), ("NG-ON", "Ondo"), ("NG-OS", "Osun"), ("NG-OY", "Oyo"),
    ("NG-PL", "Plateau"), ("NG-RI", "Rivers"), ("NG-SO", "Sokoto"), ("NG-TA", "Taraba"),
    ("NG-YO", "Yobe"), ("NG-ZA", "Zamfara")
]

from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.postgres.indexes import GinIndex, GistIndex
from phonenumber_field.modelfields import PhoneNumberField
from django_resized import ResizedImageField
from django.contrib.gis.db import models as gis_models

class User(ModelWithMetadata, AbstractUser, ModelWithExternalReference):
    """
    Centralized user model for all applications
    """
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True, unique=True)
    username = None  # Remove username field, use email instead
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        indexes = [
            GinIndex(fields=["email", "first_name", "last_name"], 
                   opclasses=["gin_trgm_ops"] * 3,
                   name="user_search_gin"),
            GistIndex(fields=['location']),
            GinIndex(fields=['address'], name='user_addr_gin', opclasses=['gin_trgm_ops'])
        ]
    
    def __str__(self):
        return self.email or str(self.phone_number)

    @property
    def is_driver(self):
        return self.roles.filter(app_name='transport', role__name='driver').exists()
    
    @property
    def is_courier(self):
        return self.roles.filter(app_name='transport', role__name='courier').exists()
    
    @property
    def is_rider(self):
        return self.roles.filter(app_name='transport', role__name='rider').exists()
    

class UserProfile(models.Model):
    """
    Centralized profile data for all applications
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='profile'
    )
    image = ResizedImageField(
        size=[1200, 630], 
        upload_to='user_profiles/', 
        blank=True, 
        null=True
    )
    location = gis_models.PointField(
        geography=True, 
        null=True, 
        blank=True
    )
    address = models.CharField(max_length=255, blank=True)
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=2, 
        default=5.0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    last_active = models.DateTimeField(auto_now=True)
    is_online = models.BooleanField(default=False)
    language_code = models.CharField(
        max_length=35, 
        choices=settings.LANGUAGES, 
        default=settings.LANGUAGE_CODE
    )
    note = models.TextField(blank=True)
    search_document = models.TextField(blank=True, default="")
    # Additional unified fields
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=20,
        choices=[
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other'),
            ('prefer_not_to_say', 'Prefer not to say')
        ],
        blank=True
    )
    preferred_notification_method = models.CharField(
        max_length=20,
        choices=[
            ('email', 'Email'),
            ('sms', 'SMS'),
            ('push', 'Push Notification'),
            ('whatsapp', 'WhatsApp')
        ],
        default='email'
    )
    
    class Meta:
        indexes = [
            GinIndex(
                fields=["search_document"], 
                name="profile_search_gin",
                opclasses=["gin_trgm_ops"]
            ),
            GistIndex(fields=['location']),
            models.Index(fields=['is_online', 'last_active']),
        ]
    
    def __str__(self):
        return f"Profile for {self.user.email}"
    
    def update_location(self, latitude, longitude, address=None):
        """Update user's geographic location"""
        self.location = Point(longitude, latitude)
        if address:
            self.address = address
        self.save()
    
    def calculate_rating(self):
        """Calculate aggregate rating from all services"""
        from transport.models import ServiceRequest
        from ecommerce.models import Order
        from real_estate.models import RentalContract
        
        transport_rating = ServiceRequest.objects.filter(
            customer=self.user
        ).aggregate(Avg('customer_rating'))['customer_rating__avg'] or 0
        
        commerce_rating = Order.objects.filter(
            customer=self.user
        ).aggregate(Avg('seller_rating'))['seller_rating__avg'] or 0
        
        # Could add more rating sources here
        
        total_ratings = (transport_rating + commerce_rating) / 2
        self.rating = round(total_ratings, 2)
        self.save()
        return self.rating

class Role(models.Model):
    """
    Centralized role definitions with enhanced permissions
    """
    APP_CHOICES = [
        ('transport', 'Transport Service'),
        ('ecommerce', 'E-Commerce'),
        ('real_estate', 'Real Estate'),
        ('community', 'Community'),
    ]
    
    name = models.CharField(max_length=50)
    app_name = models.CharField(max_length=30, choices=APP_CHOICES)
    permissions = models.ManyToManyField(
        Permission, 
        blank=True,
        limit_choices_to={'content_type__app_label__in': [
            'transport', 'ecommerce', 'real_estate', 'community'
        ]}
    )
    description = models.TextField(blank=True)
    is_default = models.BooleanField(
        default=False,
        help_text="Auto-assign this role to new users in this app"
    )
    requires_verification = models.BooleanField(
        default=False,
        help_text="Require admin approval for this role"
    )
    
    class Meta:
        unique_together = ('name', 'app_name')
        ordering = ['app_name', 'name']
    
    def __str__(self):
        return f"{self.get_app_name_display()} - {self.name}"

class UserRole(models.Model):
    """
    Enhanced user role assignment with audit tracking
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='app_roles'
    )
    role = models.ForeignKey(
        Role, 
        on_delete=models.CASCADE,
        related_name='user_assignments'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_roles'
    )
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_roles'
    )
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('user', 'role')
        verbose_name = "User Application Role"
        verbose_name_plural = "User Application Roles"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.role}"
    
    def activate(self, verified_by=None):
        """Activate this role assignment"""
        if not self.is_active:
            self.is_active = True
            if verified_by:
                self.verified_by = verified_by
                self.verified_at = timezone.now()
            self.save()
    
    def deactivate(self):
        """Deactivate this role assignment"""
        if self.is_active:
            self.is_active = False
            self.save()
    
    @classmethod
    def get_user_roles(cls, user, app_name=None):
        """Get active roles for a user, optionally filtered by app"""
        qs = cls.objects.filter(user=user, is_active=True)
        if app_name:
            qs = qs.filter(role__app_name=app_name)
        return qs.select_related('role')
    

class Address(models.Model):
    """
    Enhanced address model with role-based access
    """
    ADDRESS_TYPES = [
        ('home', 'Home'),
        ('work', 'Work'),
        ('billing', 'Billing'),
        ('shipping', 'Shipping'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='addresses'
    )
    address_type = models.CharField(
        max_length=20,
        choices=ADDRESS_TYPES,
        default='home'
    )
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default="Nigeria")
    is_default = models.BooleanField(
        default=False,
        help_text="Default address for this type"
    )
    role_visibility = models.ManyToManyField(
        'core.Role',
        blank=True,
        help_text="Roles that can see this address"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "addresses"
        ordering = ['-is_default', 'address_type']
        indexes = [
            models.Index(fields=['user', 'is_default']),
            GinIndex(fields=['street', 'city', 'state'], name='address_search_idx'),
        ]
    
    def __str__(self):
        return f"{self.address_type.title()} address for {self.user}"
    
    def is_visible_to(self, user):
        """Check if address is visible to another user"""
        from core.models import UserRole
        
        # Always visible to owner
        if user == self.user:
            return True
            
        # Check role-based visibility
        requester_roles = UserRole.get_user_roles(user).values_list('role_id', flat=True)
        return self.role_visibility.filter(id__in=requester_roles).exists()
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=50)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    channel = models.CharField(max_length=20, choices=NotificationPreference.NOTIFICATION_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict)
    
    class Meta:
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['user', 'status']),
        ]
    
    def __str__(self):
        return f"{self.notification_type} notification for {self.user.email}"