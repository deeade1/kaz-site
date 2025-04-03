# tasks.py
from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from twilio.rest import Client
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import NotificationQueue
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_websocket_notification(user_id, notification_data):
    try:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"user_{user_id}",
            {
                "type": "property.notification",
                "notification": notification_data
            }
        )
    except Exception as e:
        logger.error(f"WebSocket notification failed for user {user_id}: {str(e)}")

@shared_task
def queue_email_notification(user_id, notification_data):
    from django.contrib.auth import get_user_model
    from .models import NotificationQueue
    
    try:
        user = get_user_model().objects.get(id=user_id)
        
        if notification_data['is_new_property']:
            subject = f"New Property: {notification_data['property_title']}"
            template = 'emails/new_property.html'
        else:
            subject = f"Updated Property: {notification_data['property_title']}"
            template = 'emails/updated_property.html'
        
        message = render_to_string(template, {
            'user': user,
            'notification': notification_data
        })
        
        NotificationQueue.objects.create(
            user=user,
            notification_type='property_update',
            subject=subject,
            message=message,
            channel='email',
            metadata=notification_data
        )
    except Exception as e:
        logger.error(f"Failed to queue email for user {user_id}: {str(e)}")

@shared_task
def queue_sms_notification(phone_number, notification_data):
    from .models import NotificationQueue
    from django.contrib.auth import get_user_model
    
    try:
        user = get_user_model().objects.get(
            notification_preferences__phone_number=phone_number
        )
        
        if notification_data['is_new_property']:
            message = f"New property: {notification_data['property_title']}. {notification_data['url']}"
        else:
            changes = ", ".join(notification_data['changed_fields'].keys())
            message = f"Property updated: {notification_data['property_title']} ({changes}). {notification_data['url']}"
        
        NotificationQueue.objects.create(
            user=user,
            notification_type='property_update',
            subject="Property Update",
            message=message,
            channel='sms',
            metadata=notification_data
        )
    except Exception as e:
        logger.error(f"Failed to queue SMS for {phone_number}: {str(e)}")

@shared_task
def process_notification_queue():
    """Process pending notifications in batches"""
    from django.core.mail import EmailMultiAlternatives
    from twilio.rest import Client
    
    # Process email notifications
    email_notifications = NotificationQueue.objects.filter(
        channel='email',
        status='pending'
    )[:50]  # Process in batches of 50
    
    for notification in email_notifications:
        try:
            email = EmailMultiAlternatives(
                notification.subject,
                notification.message,
                settings.DEFAULT_FROM_EMAIL,
                [notification.user.email]
            )
            email.attach_alternative(notification.message, "text/html")
            email.send()
            
            notification.status = 'sent'
            notification.sent_at = timezone.now()
            notification.save()
        except Exception as e:
            notification.status = 'failed'
            notification.save()
            logger.error(f"Failed to send email to {notification.user.email}: {str(e)}")
    
    # Process SMS notifications if Twilio is configured
    if hasattr(settings, 'TWILIO_ACCOUNT_SID'):
        sms_notifications = NotificationQueue.objects.filter(
            channel='sms',
            status='pending'
        )[:50]
        
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        
        for notification in sms_notifications:
            try:
                client.messages.create(
                    body=notification.message,
                    from_=settings.TWILIO_PHONE_NUMBER,
                    to=notification.user.notification_preferences.phone_number
                )
                
                notification.status = 'sent'
                notification.sent_at = timezone.now()
                notification.save()
            except Exception as e:
                notification.status = 'failed'
                notification.save()
                logger.error(f"Failed to send SMS to {notification.user.notification_preferences.phone_number}: {str(e)}")