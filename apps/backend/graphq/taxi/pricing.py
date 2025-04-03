# pricing.py
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import joblib

class DynamicPricingEngine:
    def __init__(self):
        self.model = joblib.load('demand_model.pkl')
        self.scaler = joblib.load('scaler.pkl')
    
    def calculate_surge_multiplier(self, location, time, weather_data):
        """Calculate dynamic pricing multiplier based on conditions"""
        features = self._prepare_features(location, time, weather_data)
        scaled_features = self.scaler.transform([features])
        demand_level = self.model.predict(scaled_features)[0]
        
        # Convert demand level to pricing multiplier
        if demand_level < 0.5:
            return 1.0  # No surge
        elif demand_level < 0.7:
            return 1.2
        elif demand_level < 0.9:
            return 1.5
        else:
            return 2.0
    
    def _prepare_features(self, location, time, weather_data):
        """Prepare feature vector for model prediction"""
        return {
            'hour_of_day': time.hour,
            'day_of_week': time.weekday(),
            'is_weekend': 1 if time.weekday() >= 5 else 0,
            'latitude': location.y,
            'longitude': location.x,
            'temperature': weather_data.get('temperature', 20),
            'precipitation': weather_data.get('precipitation', 0),
            'is_holiday': self._check_if_holiday(time)
        }
    
    def _check_if_holiday(self, time):
        # Implement holiday checking logic
        return 0