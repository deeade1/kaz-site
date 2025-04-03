class CarbonCalculator:
    EMISSION_FACTORS = {
        'economy': 0.12,  # kg CO2 per km
        'comfort': 0.15,
        'premium': 0.18,
        'van': 0.2,
        'shared': 0.1
    }
    
    @classmethod
    def calculate_savings(cls, trip):
        """Calculate CO2 savings from shared trip"""
        if not hasattr(trip, 'bookings'):
            return 0
            
        individual_emissions = sum(
            booking.distance_km * cls.EMISSION_FACTORS.get(
                booking.user.preferred_vehicle or 'economy'
            )
            for booking in trip.bookings.all()
        )
        
        shared_emissions = trip.distance_km * cls.EMISSION_FACTORS.get(
            trip.vehicle.type if trip.vehicle else 'shared'
        )
        
        return max(0, individual_emissions - shared_emissions)