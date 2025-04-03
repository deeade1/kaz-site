from datetime import timedelta
from django.db.models import Sum
from django.utils import timezone

class IncentiveCalculator:
    def __init__(self, driver):
        self.driver = driver
    
    def calculate_earnings(self, period='weekly'):
        """Calculate driver earnings with incentives"""
        from .models import Trip
        
        date_range = self._get_date_range(period)
        trips = Trip.objects.filter(
            driver=self.driver,
            end_time__range=date_range,
            completed=True
        )
        
        aggregation = trips.aggregate(
            base_total=Sum('base_fare'),
            distance_total=Sum('distance_fare'),
            time_total=Sum('time_fare'),
            surge_total=Sum('surge_multiplier'),
            base_sum=Sum('base_fare')
        )
        
        base_fare = aggregation['base_total'] or 0
        distance_fare = aggregation['distance_total'] or 0
        time_fare = aggregation['time_total'] or 0
        surge_bonus = (aggregation['surge_total'] - trips.count()) * (aggregation['base_sum'] or 0) if aggregation['surge_total'] else 0
        
        # Calculate incentives
        incentive_bonus = self._calculate_incentives(trips.count())
        
        return {
            'period': period,
            'start_date': date_range[0],
            'end_date': date_range[1],
            'base_fare': base_fare,
            'distance_fare': distance_fare,
            'time_fare': time_fare,
            'surge_bonus': surge_bonus,
            'incentive_bonus': incentive_bonus,
            'total_earnings': base_fare + distance_fare + time_fare + surge_bonus + incentive_bonus,
            'trip_count': trips.count()
        }
    
    def _calculate_incentives(self, trip_count):
        """Calculate performance-based incentives"""
        # Tiered incentive structure
        if trip_count >= 100:
            return 500
        elif trip_count >= 75:
            return 300
        elif trip_count >= 50:
            return 150
        elif trip_count >= 25:
            return 50
        return 0
    
    def _get_date_range(self, period):
        now = timezone.now()
        if period == 'daily':
            return (now - timedelta(days=1), now)
        elif period == 'monthly':
            return (now - timedelta(days=30), now)
        else:  # weekly
            return (now - timedelta(days=7), now)