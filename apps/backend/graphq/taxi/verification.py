# verification.py
import face_recognition
import numpy as np

class DriverVerifier:
    def __init__(self):
        self.known_encodings = {}  # {driver_id: encoding}
    
    def register_driver(self, driver_id, image_path):
        """Register driver's facial recognition data"""
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)
        
        if not encodings:
            return False
        
        self.known_encodings[driver_id] = encodings[0]
        return True
    
    def verify_driver(self, driver_id, image_path):
        """Verify driver identity before starting shift"""
        if driver_id not in self.known_encodings:
            return False
        
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)
        
        if not encodings:
            return False
        
        matches = face_recognition.compare_faces(
            [self.known_encodings[driver_id]],
            encodings[0]
        )
        
        return matches[0]
    
    def continuous_verification(self, driver_id, frame):
        """Continuous verification during trip (for mobile app)"""
        if driver_id not in self.known_encodings:
            return False
        
        encodings = face_recognition.face_encodings(frame)
        
        if not encodings:
            return False
        
        distance = face_recognition.face_distance(
            [self.known_encodings[driver_id]],
            encodings[0]
        )
        
        return distance < 0.6  # Threshold for verification