from django.apps import AppConfig
import asyncio
from .utils import run_and_assign_trips

class TaxiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "taxi"
    
    def ready(self):
        if not hasattr(self, 'assignment_task'):
            self.assignment_task = asyncio.create_task(self.run_periodic_assignments())
    
    async def run_periodic_assignments(self):
        while True:
            try:
                await run_and_assign_trips()
            except Exception as e:
                logger.error(f"Error in periodic assignments: {str(e)}")
            await asyncio.sleep(60)  # Run every minute