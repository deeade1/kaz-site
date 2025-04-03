from django.db import transaction
from .models import Booking, WaitlistEntry
from .signals import booking_cancelled
from django.dispatch import receiver

class SeatReallocator:
    @staticmethod
    @receiver(booking_cancelled)
    def handle_cancelled_booking(sender, booking, **kwargs):
        if booking.shared_trip:
            with transaction.atomic():
                shared_trip = booking.shared_trip
                shared_trip.available_seats += 1
                
                if shared_trip.status == 'full':
                    shared_trip.status = 'available'
                
                shared_trip.save()
                
                # Notify first waitlisted user
                next_in_line = WaitlistEntry.objects.filter(
                    shared_trip=shared_trip
                ).order_by('joined_at').first()
                
                if next_in_line:
                    next_in_line.notify_availability()
                    next_in_line.delete()