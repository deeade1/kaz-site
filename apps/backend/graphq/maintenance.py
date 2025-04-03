# maintenance.py
from datetime import timedelta

class MaintenanceScheduler:
    MAINTENANCE_INTERVAL = timedelta(days=30)
    OIL_CHANGE_MILEAGE = 5000  # miles
    
    def __init__(self, vehicle):
        self.vehicle = vehicle
    
    def check_maintenance_needed(self):
        """Check if vehicle needs maintenance"""
        from .models import MaintenanceLog
        
        last_maintenance = MaintenanceLog.objects.filter(
            vehicle=self.vehicle
        ).order_by('-date').first()
        
        mileage_since = self.vehicle.current_mileage - (last_maintenance.mileage if last_maintenance else 0)
        time_since = timezone.now() - (last_maintenance.date if last_maintenance else self.vehicle.registration_date)
        
        alerts = []
        
        if mileage_since >= self.OIL_CHANGE_MILEAGE:
            alerts.append({
                'type': 'oil_change',
                'severity': 'high',
                'message': f'Oil change needed ({mileage_since} miles since last)'
            })
        
        if time_since >= self.MAINTENANCE_INTERVAL:
            alerts.append({
                'type': 'routine',
                'severity': 'medium',
                'message': f'Routine maintenance due ({time_since.days} days since last)'
            })
        
        # Add other maintenance checks (tires, brakes, etc.)
        
        return alerts
    
    def schedule_maintenance(self, maintenance_type):
        """Schedule maintenance and notify driver"""
        from .models import MaintenanceSchedule
        from .tasks import notify_driver
        
        schedule = MaintenanceSchedule.objects.create(
            vehicle=self.vehicle,
            maintenance_type=maintenance_type,
            scheduled_date=timezone.now() + timedelta(days=2),
            status='pending'
        )
        
        notify_driver.delay(
            driver_id=self.vehicle.driver.id,
            message=f"Maintenance scheduled for {schedule.scheduled_date.strftime('%Y-%m-%d')}",
            notification_type='maintenance'
        )
        
        return schedule