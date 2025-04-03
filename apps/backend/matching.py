# matching.py
from django.db.models import Q
from datetime import timedelta

class CargoMatcher:
    def find_matching_vehicles(self, cargo):
        """Find suitable vehicles for cargo delivery"""
        from .models import Vehicle, Driver
        
        # Base query for available vehicles
        vehicles = Vehicle.objects.filter(
            is_active=True,
            driver__is_available=True,
            max_load__gte=cargo.weight,
            vehicle_type__in=self._get_suitable_vehicle_types(cargo)
        )
        
        # Filter by current location if available
        if cargo.pickup_location:
            vehicles = vehicles.annotate(
                distance=Distance('driver__location', cargo.pickup_location)
            ).filter(
                distance__lte=cargo.max_pickup_distance
            ).order_by('distance')
        
        # Filter by special requirements
        if cargo.requires_refrigeration:
            vehicles = vehicles.filter(has_refrigeration=True)
        if cargo.hazardous_material:
            vehicles = vehicles.filter(hazardous_material_certified=True)
        
        # Add driver rating filter
        vehicles = vehicles.annotate(
            driver_rating=F('driver__rating')
        ).order_by('-driver_rating')
        
        return vehicles
    
    def _get_suitable_vehicle_types(self, cargo):
        """Determine suitable vehicle types based on cargo"""
        if cargo.weight > 1000:  # kg
            return ['truck']
        elif cargo.weight > 500:
            return ['van', 'truck']
        elif cargo.volume > 2:  # cubic meters
            return ['van', 'xl']
        else:
            return ['car', 'xl', 'van']