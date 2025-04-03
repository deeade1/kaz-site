# tasks.py
import asyncio
from .models import Trip, Vehicle, SharedTrip
from .utils import run_and_assign_trips

async def run_trip_assignment(trip_id):
    try:
        trip = await Trip.objects.aget(id=trip_id)
        if trip.status == Trip.PENDING:
            # Run assignment with custom parameters for this trip
            await run_and_assign_trips(
                timeout=120,
                max_distance_km=10,
                specific_trip_id=trip_id
            )
            
            # Refresh trip status
            trip = await Trip.objects.aget(id=trip_id)
            if trip.status == Trip.STARTED:
                # Notify rider and driver
                await TripSubscription.publish(payload=trip, trip_id=trip_id)
                await DriverPoolSubscription.publish(payload=trip)
    except Exception as e:
        logger.error(f"Error assigning trip {trip_id}: {str(e)}")