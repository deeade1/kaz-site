from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class ChatRoom(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    sender = models.ForeignKey(settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.CASCADE,
        related_name="as_sender"
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['chatroom', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.sender.first_name}: {self.text[:20]}"