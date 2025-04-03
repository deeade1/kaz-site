from django.conf import settings
import face_recognition
import numpy as np
from twilio.rest import Client

class SafetySystem:
    def __init__(self):
        self.twilio_client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)
    
    @staticmethod
    def verify_driver_identity(driver, image_data):
        """Verify driver using facial recognition"""
        try:
            driver_image = face_recognition.load_image_file(
                driver.verification_photo.path
            )
            driver_encoding = face_recognition.face_encodings(driver_image)[0]
            
            current_image = face_recognition.load_image_file(image_data)
            current_encoding = face_recognition.face_encodings(current_image)
            
            if not current_encoding:
                return False
                
            return face_recognition.compare_faces(
                [driver_encoding],
                current_encoding[0],
                tolerance=0.6
            )[0]
        except Exception:
            return False

    def trigger_emergency(self, trip, reason):
        """Initiate emergency protocol"""
        # Notify authorities
        self.twilio_client.messages.create(
            to=settings.EMERGENCY_NUMBER,
            from_=settings.TWILIO_NUMBER,
            body=f"Emergency alert! Trip {trip.id}. Reason: {reason}. Location: {trip.current_location}"
        )
        
        # Notify emergency contacts
        for contact in trip.customer.emergency_contacts.all():
            self.twilio_client.messages.create(
                to=contact.phone,
                from_=settings.TWILIO_NUMBER,
                body=f"Emergency alert for {trip.customer.name}. Trip ID: {trip.id}"
            )
        
        # Lock trip recording
        trip.is_emergency = True
        trip.save()