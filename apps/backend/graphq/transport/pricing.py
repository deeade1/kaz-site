from django.utils import timezone
from datetime import timedelta
import holidays

class DynamicPricing:
    @staticmethod
    def calculate_base_price(distance_km, vehicle_type):
        """Calculate base price based on distance and vehicle type"""
        base_rates = {
            'economy': 1.2,
            'comfort': 1.5,
            'premium': 2.0,
            'van': 1.8
        }
        return distance_km * base_rates.get(vehicle_type, 1.5)

    @staticmethod
    def get_demand_multiplier(location, datetime):
        """Calculate demand multiplier based on time and location"""
        multiplier = 1.0
        
        # Time-based adjustments
        if datetime.hour in (7-9, 17-19):  # Rush hours
            multiplier *= 1.3
        elif datetime.hour in (22-6):  # Late night
            multiplier *= 1.5
            
        # Holiday pricing
        country_holidays = holidays.CountryHoliday('US')
        if datetime in country_holidays:
            multiplier *= 1.4
            
        # Weather impact (would integrate with weather API)
        # weather = WeatherAPI.get_current(location)
        # if weather['precipitation'] > 0.5:
        #     multiplier *= 1.2
            
        return round(multiplier, 2)

    @classmethod
    def calculate_shared_price(cls, base_price, seats_available, total_seats):
        """Calculate dynamic pricing for shared trips"""
        availability_factor = 1 + (0.5 * (1 - (seats_available / total_seats)))
        return round(base_price * availability_factor, 2)