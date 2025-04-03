from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone

class Friend(models.Model):
    """
    Enhanced friendship relationship with role-based visibility
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Fixed typo: was AUTH_USER_MODEL
        on_delete=models.CASCADE,
        related_name="friendships_initiated"
    )
    friend = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="friendships_received"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    visibility = models.CharField(
        max_length=20,
        choices=[
            ('public', 'Public'),
            ('friends', 'Friends Only'),
            ('private', 'Private')
        ],
        default='friends'
    )
    relationship_type = models.CharField(
        max_length=50,
        blank=True,
        help_text="e.g., colleague, family, close friend"
    )
    
    class Meta:
        unique_together = ('user', 'friend')
        verbose_name = "Friendship"
        verbose_name_plural = "Friendships"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['friend', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.user} → {self.friend}"
    
    @classmethod
    def can_become_friends(cls, user1, user2):
        """Check if users can become friends based on roles"""
        from core.models import UserRole
        
        # Prevent certain role combinations from friending
        restricted_roles = {
            'transport': ['driver', 'dispatcher'],
            'ecommerce': ['vendor']
    }
    
    user1_roles = set(UserRole.objects.filter(user=user1, is_active=True).values_list('role__name', flat=True))
    user2_roles = set(UserRole.objects.filter(user=user2, is_active=True).values_list('role__name', flat=True))
    
    # Check for restricted role combinations
    for app_name, roles in restricted_roles.items():
        if any(r in user1_roles for r in roles) and any(r in user2_roles for r in roles):
            return False
    return True

class FriendRequest(models.Model):
    """
    Enhanced friend request with role-based restrictions
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('blocked', 'Blocked'),
    ]
    
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_requests"
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_requests"
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    message = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('sender', 'receiver')
        verbose_name = "Friend Request"
        verbose_name_plural = "Friend Requests"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.sender} → {self.receiver} ({self.status})"
    
    def clean(self):
        """Validate based on user roles"""
        from core.models import UserRole
        
        # Prevent certain roles from sending friend requests
        restricted_roles = UserRole.objects.filter(
            user=self.sender,
            role__name__in=['driver', 'vendor'],
            is_active=True
        ).exists()
        
        if restricted_roles:
            raise ValidationError("Users with this role cannot send friend requests")
        
        # Check if users can be friends
        if not Friend.can_become_friends(self.sender, self.receiver):
            raise ValidationError("These users cannot become friends based on their roles")
    
    def accept(self):
        """Accept friend request and create friendship"""
        if self.status != 'pending':
            return
            
        with transaction.atomic():
            Friend.objects.create(
                user=self.sender,
                friend=self.receiver,
                is_active=True
            )
            self.status = 'accepted'
            self.save()
            
            # Create reverse friendship for bidirectional relationship
            Friend.objects.create(
                user=self.receiver,
                friend=self.sender,
                is_active=True
            )