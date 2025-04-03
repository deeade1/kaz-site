from django.db import models

class NotificationPreference(models.Model):
    """
    Enhanced notification preferences with role-based settings
    """
    NOTIFICATION_CHOICES = [
        ('websocket', 'WebSocket'),
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('push', 'Push Notification'),
        ('whatsapp', 'WhatsApp'),
    ]
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notification_preferences'
    )
    preferred_channels = models.JSONField(
        default=list,
        help_text="List of preferred notification channels"
    )
    role_specific_settings = models.JSONField(
        default=dict,
        help_text="Role-specific notification preferences"
    )
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=False)
    phone_number = PhoneNumberField(blank=True, null=True)
    immediate_alerts = models.BooleanField(default=True)
    daily_digest = models.BooleanField(default=False)
    weekly_summary = models.BooleanField(default=False)
    do_not_disturb = models.BooleanField(default=False)
    dnd_start_time = models.TimeField(null=True, blank=True)
    dnd_end_time = models.TimeField(null=True, blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user', 'do_not_disturb']),
        ]
    
    def __str__(self):
        return f"Notification preferences for {self.user.email}"
    
    def get_channel_for_role(self, role_name):
        """Get preferred channel for a specific role's notifications"""
        return self.role_specific_settings.get(role_name, self.preferred_channels)

class NotificationQueue(models.Model):
    """
    Enhanced notification queue with role-based delivery
    """
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications'
    )
    notification_type = models.CharField(max_length=50)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    channel = models.CharField(
        max_length=20,
        choices=NotificationPreference.NOTIFICATION_CHOICES
    )
    status = models.CharField(
        max_length=10,
        choices=[
            ('pending', 'Pending'),
            ('sent', 'Sent'),
            ('failed', 'Failed'),
            ('delivered', 'Delivered'),
            ('read', 'Read'),
        ],
        default='pending'
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium'
    )
    related_role = models.ForeignKey(
        'core.Role',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    read_at = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['related_role', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.notification_type} notification for {self.user.email}"
    
    def deliver(self):
        """Deliver notification based on user preferences"""
        if self.status != 'pending':
            return
            
        pref = self.user.notification_preferences
        
        # Check Do Not Disturb
        if pref.do_not_disturb and self.priority != 'urgent':
            self.status = 'pending'
            self.save()
            return
            
        # Implement actual delivery logic here
        # ...
        
        self.status = 'sent'
        self.sent_at = timezone.now()
        self.save()
