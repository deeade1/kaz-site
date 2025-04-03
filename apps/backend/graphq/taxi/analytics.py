# analytics.py
from django.contrib.gis.db.models.functions import Transform
from django.db.models import Count, DateTimeField, ExpressionWrapper, F
from django.db.models.functions import ExtractHour

class DemandAnalyzer:
    def generate_heatmap(self, days=7, resolution=0.01):
        """Generate grid-based demand heatmap"""
        from .models import Trip
        from django.contrib.gis.db.models.aggregates import Union
        from django.contrib.gis.geos import Point, Polygon
        
        # Aggregate trips by location grid
        trips = Trip.objects.filter(
            start_time__gte=timezone.now() - timedelta(days=days)
        ).annotate(
            grid_x=ExpressionWrapper(
                F('start_location__x') // resolution * resolution,
                output_field=FloatField()
            ),
            grid_y=ExpressionWrapper(
                F('start_location__y') // resolution * resolution,
                output_field=FloatField()
            ),
            hour=ExtractHour('start_time')
        ).values('grid_x', 'grid_y', 'hour').annotate(
            count=Count('id')
        ).order_by('hour', 'grid_x', 'grid_y')
        
        # Convert to heatmap format
        heatmap = {}
        for period in trips:
            hour = period['hour']
            if hour not in heatmap:
                heatmap[hour] = []
            
            heatmap[hour].append({
                'lat': period['grid_y'],
                'lng': period['grid_x'],
                'weight': period['count']
            })
        
        return heatmap
    
# analytics.py
from django.db.models import Count, Sum, Avg, F, ExpressionWrapper, DurationField
from django.db.models.functions import ExtractHour, ExtractWeek

class FleetAnalyzer:
    def get_utilization_metrics(self, start_date, end_date):
        """Calculate key fleet utilization metrics"""
        from .models import Trip, Vehicle
        
        # Calculate hours operated per vehicle
        vehicle_usage = Vehicle.objects.annotate(
            total_hours=ExpressionWrapper(
                Sum(F('trips__end_time') - F('trips__start_time')),
                output_field=DurationField()
            ),
            trip_count=Count('trips'),
            revenue=Sum('trips__fare')
        ).filter(
            trips__start_time__gte=start_date,
            trips__end_time__lte=end_date
        )
        
        # Calculate overall metrics
        total_hours = sum(
            v.total_hours.total_seconds() / 3600 if v.total_hours else 0
            for v in vehicle_usage
        )
        total_revenue = sum(v.revenue or 0 for v in vehicle_usage)
        
        return {
            'period': {'start': start_date, 'end': end_date},
            'total_vehicles': vehicle_usage.count(),
            'total_hours': total_hours,
            'total_trips': sum(v.trip_count or 0 for v in vehicle_usage),
            'total_revenue': total_revenue,
            'avg_revenue_per_hour': total_revenue / total_hours if total_hours else 0,
            'vehicles': [
                {
                    'id': v.id,
                    'type': v.vehicle_type,
                    'hours': v.total_hours.total_seconds() / 3600 if v.total_hours else 0,
                    'trips': v.trip_count or 0,
                    'revenue': v.revenue or 0
                }
                for v in vehicle_usage
            ]
        }
    
    def get_peak_hours(self, weeks=4):
        """Identify peak demand hours"""
        from .models import Trip
        
        peak_data = Trip.objects.filter(
            start_time__gte=timezone.now() - timedelta(weeks=weeks)
        ).annotate(
            hour=ExtractHour('start_time'),
            week=ExtractWeek('start_time')
        ).values('hour', 'week').annotate(
            trip_count=Count('id')
        ).order_by('hour')
        
        # Aggregate by hour across weeks
        hourly_counts = {}
        for data in peak_data:
            if data['hour'] not in hourly_counts:
                hourly_counts[data['hour']] = []
            hourly_counts[data['hour']].append(data['trip_count'])
        
        # Calculate average trips per hour
        return {
            hour: sum(counts) / len(counts)
            for hour, counts in hourly_counts.items()
        }