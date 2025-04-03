from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from .models import SharedTrip, WaitlistEntry

def notify_waitlist_users(shared_trip_id):
    """Notify all waitlisted users when a trip becomes full"""
    shared_trip = SharedTrip.objects.get(id=shared_trip_id)
    for entry in shared_trip.waitlist.all():
        entry.notify_availability()

def send_seat_available_notification(user_id, trip_id):
    """Send notification to user when a seat becomes available"""
    from .models import User, ServiceRequest
    
    user = User.objects.get(id=user_id)
    trip = ServiceRequest.objects.get(id=trip_id)
    
    subject = "Seat Available on Shared Trip"
    message = render_to_string('emails/seat_available.html', {
        'user': user,
        'trip': trip
    })
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )