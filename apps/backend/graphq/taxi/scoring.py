# scoring.py
class DriverScorer:
    def __init__(self, driver):
        self.driver = driver
    
    def calculate_score(self):
        """Calculate comprehensive driver score (0-100)"""
        from .models import Trip
        
        trips = Trip.objects.filter(driver=self.driver, completed=True)
        if not trips.exists():
            return 70  # Default score for new drivers
        
        # Calculate component scores
        rating_score = self._calculate_rating_score(trips)
        punctuality_score = self._calculate_punctuality_score(trips)
        efficiency_score = self._calculate_efficiency_score(trips)
        safety_score = self._calculate_safety_score(trips)
        
        # Weighted composite score
        return (
            rating_score * 0.4 +
            punctuality_score * 0.3 +
            efficiency_score * 0.2 +
            safety_score * 0.1
        )
    
    def _calculate_rating_score(self, trips):
        avg_rating = trips.aggregate(Avg('driver_rating'))['driver_rating__avg']
        return (avg_rating / 5) * 100 if avg_rating else 70
    
    def _calculate_punctuality_score(self, trips):
        on_time = trips.filter(
            actual_pickup_time__lte=F('estimated_pickup_time')
        ).count()
        return (on_time / trips.count()) * 100 if trips.count() > 0 else 80
    
    def _calculate_efficiency_score(self, trips):
        avg_efficiency = trips.aggregate(
            avg=Avg(F('actual_duration') / F('estimated_duration'))
        )['avg']
        return min(100, 100 * (1 / avg_efficiency)) if avg_efficiency else 80
    
    def _calculate_safety_score(self, trips):
        incidents = self.driver.incidents.count()
        return max(0, 100 - (incidents * 10))