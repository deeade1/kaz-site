import asyncio
import logging
from datetime import datetime, timedelta
from django.db import transaction
from geopy.distance import geodesic
from django.contrib.gis.geos import Point
from django.core.cache import cache
from .models import FleetUser, Vehicle, ServiceRequest, Trip, Delivery
import asyncio
import logging
from datetime import datetime, timedelta
from django.db import transaction
from geopy.distance import geodesic
from .models import Driver, SharedTrip, Trip, Vehicle
from django.contrib.gis.geos import Point
from django.core.cache import cache


logger = logging.getLogger('dispatch')



class DispatchOptimizer:
    def __init__(self):
        self.driver_pool = []
        self.pending_trips = []
    
    async def update_driver_pool(self):
        """Refresh available drivers from database"""
        self.driver_pool = await Driver.objects.filter(
            is_available=True,
            current_trip__isnull=True,
            last_active__gte=datetime.now() - timedelta(minutes=5)
        ).prefetch_related('vehicles').all()
    
    async def update_pending_trips(self):
        """Refresh pending trips from database"""
        self.pending_trips = await Trip.objects.filter(
            status='requested',
            requested_at__gte=datetime.now() - timedelta(minutes=10)
        ).select_related('rider').all()
    
    def calculate_distance_score(self, driver, trip):
        """Calculate distance score with caching"""
        cache_key = f'distance_{driver.id}_{trip.id}'
        cached_score = cache.get(cache_key)
        
        if cached_score:
            return cached_score
        
        driver_point = Point(driver.location.x, driver.location.y)
        pickup_point = Point(trip.pickup_location.x, trip.pickup_location.y)
        distance = driver_point.distance(pickup_point) * 100  # Convert to km
        
        # Cache for 30 seconds
        cache.set(cache_key, distance, timeout=30)
        return distance
    
    def calculate_rating_score(self, driver, trip):
        """Calculate rating-based score"""
        return (driver.rating / 5) * 0.3  # 30% weight for rating
    
    def calculate_vehicle_match_score(self, driver, trip):
        """Score based on vehicle type preference match"""
        if not trip.rider.preferred_vehicle_type:
            return 0.5  # Neutral score if no preference
        
        vehicle_types = [v.vehicle_type for v in driver.vehicles.all()]
        return 1.0 if trip.rider.preferred_vehicle_type in vehicle_types else 0.2
    
    def calculate_total_score(self, driver, trip):
        """Composite score for driver-trip matching"""
        distance_score = 1 - (self.calculate_distance_score(driver, trip) / 50)  # Normalize to 0-50km
        rating_score = self.calculate_rating_score(driver, trip)
        vehicle_score = self.calculate_vehicle_match_score(driver, trip)
        
        return (distance_score * 0.5) + (rating_score * 0.3) + (vehicle_score * 0.2)
    
    async def find_best_match(self, trip):
        """Find best driver for a given trip"""
        if not self.driver_pool:
            return None
        
        scored_drivers = []
        for driver in self.driver_pool:
            score = self.calculate_total_score(driver, trip)
            scored_drivers.append((driver, score))
        
        # Sort by score descending
        scored_drivers.sort(key=lambda x: x[1], reverse=True)
        return scored_drivers[0][0] if scored_drivers else None
    
    async def assign_trips(self):
        """Main dispatch method to assign trips to drivers"""
        await self.update_driver_pool()
        await self.update_pending_trips()
        
        assignments = []
        
        for trip in self.pending_trips:
            best_driver = await self.find_best_match(trip)
            if best_driver:
                async with transaction.atomic():
                    # Get the driver with row lock
                    driver = await Driver.objects.select_for_update().aget(pk=best_driver.pk)
                    if driver.current_trip or not driver.is_available:
                        continue
                    
                    # Assign trip
                    trip.driver = driver
                    trip.status = 'accepted'
                    trip.vehicle = await driver.vehicles.filter(is_active=True).afirst()
                    await trip.asave()
                    
                    driver.current_trip = trip
                    driver.is_available = False
                    await driver.asave()
                    
                    assignments.append((trip.id, driver.id))
        
        return assignments

async def run_dispatch_cycle():
    """Run the dispatch process in intervals"""
    optimizer = DispatchOptimizer()
    while True:
        try:
            assignments = await optimizer.assign_trips()
            logger.info(f"Dispatch cycle completed. Assignments: {assignments}")
        except Exception as e:
            logger.error(f"Dispatch error: {str(e)}")
        
        await asyncio.sleep(10)  # Run every 10 seconds
 
 
 
 # schema.py
class UnifiedDispatcher:
    def __init__(self):
        self.worker_pool = []
        self.pending_requests = []
    
    async def update_worker_pool(self):
        """Refresh available workers (drivers/couriers) from database"""
        self.worker_pool = await FleetUser.objects.filter(
            is_online=True,
            user_type__in=['driver', 'courier'],
            last_active__gte=datetime.now() - timedelta(minutes=5)
        ).prefetch_related('vehicles').all()
    
    async def update_pending_requests(self):
        """Refresh pending requests from database"""
        self.pending_requests = await ServiceRequest.objects.filter(
            status='requested',
            created_at__gte=datetime.now() - timedelta(minutes=30)
        ).select_related('requester').all()
    
    def calculate_worker_score(self, worker, request):
        """Calculate suitability score for worker-request matching"""
        # Base distance score (50% weight)
        worker_point = Point(worker.location.x, worker.location.y)
        pickup_point = Point(request.pickup_location.x, request.pickup_location.y)
        distance = worker_point.distance(pickup_point) * 100  # Convert to km
        distance_score = 1 - (min(distance, 50) / 50)  # Normalize to 0-50km
        
        # Rating score (20% weight)
        rating_score = (worker.rating / 5) * 0.2
        
        # Vehicle suitability score (30% weight)
        vehicle_score = self._calculate_vehicle_score(worker, request)
        
        return distance_score + rating_score + vehicle_score
    
    def _calculate_vehicle_score(self, worker, request):
        """Calculate vehicle suitability based on request type"""
        vehicles = worker.vehicles.filter(is_active=True)
        if not vehicles:
            return 0
        
        if isinstance(request, Trip):
            # For trips, match vehicle type to rider preference
            preferred_type = getattr(request.requester, 'preferred_vehicle_type', None)
            if preferred_type:
                return 0.3 if any(v.vehicle_type == preferred_type for v in vehicles) else 0.1
            return 0.2  # Neutral score if no preference
        
        elif isinstance(request, Delivery):
            # For deliveries, match vehicle capacity to package requirements
            suitable_vehicles = [
                v for v in vehicles 
                if v.max_load >= request.package_weight and
                v.vehicle_type in ['bike', 'cargo_bike', 'van', 'truck']
            ]
            return 0.3 if suitable_vehicles else 0
        
        return 0
    
    async def find_best_worker(self, request):
        """Find best worker for a given request"""
        if not self.worker_pool:
            return None
        
        scored_workers = []
        for worker in self.worker_pool:
            score = self.calculate_worker_score(worker, request)
            scored_workers.append((worker, score))
        
        # Sort by score descending
        scored_workers.sort(key=lambda x: x[1], reverse=True)
        return scored_workers[0][0] if scored_workers else None
    
    async def assign_requests(self):
        """Main dispatch method to assign requests to workers"""
        await self.update_worker_pool()
        await self.update_pending_requests()
        
        assignments = []
        
        for request in self.pending_requests:
            best_worker = await self.find_best_worker(request)
            if best_worker:
                async with transaction.atomic():
                    # Get the worker with row lock
                    worker = await FleetUser.objects.select_for_update().aget(pk=best_worker.pk)
                    if not worker.is_online:
                        continue
                    
                    # Find suitable vehicle
                    vehicle = await self._select_vehicle(worker, request)
                    if not vehicle:
                        continue
                    
                    # Assign request
                    request.assigned_to = worker
                    request.vehicle = vehicle
                    request.status = 'accepted'
                    await request.asave()
                    
                    worker.is_online = False
                    await worker.asave()
                    
                    assignments.append((request.id, worker.id))
        
        return assignments
    
    async def _select_vehicle(self, worker, request):
        """Select appropriate vehicle for the request"""
        vehicles = worker.vehicles.filter(is_active=True)
        
        if isinstance(request, Trip):
            # For trips, prefer the rider's preferred vehicle type
            preferred_type = getattr(request.requester, 'preferred_vehicle_type', None)
            if preferred_type:
                vehicle = await vehicles.filter(vehicle_type=preferred_type).afirst()
                if vehicle:
                    return vehicle
            return await vehicles.afirst()
        
        elif isinstance(request, Delivery):
            # For deliveries, find vehicle with sufficient capacity
            return await vehicles.filter(
                max_load__gte=request.package_weight,
                vehicle_type__in=['bike', 'cargo_bike', 'van', 'truck']
            ).afirst()
        
        return None

async def run_dispatch_cycle():
    """Run the dispatch process in intervals"""
    dispatcher = UnifiedDispatcher()
    while True:
        try:
            assignments = await dispatcher.assign_requests()
            logger.info(f"Dispatch completed. Assignments: {assignments}")
        except Exception as e:
            logger.error(f"Dispatch error: {str(e)}")
        
        await asyncio.sleep(15)  # Run every 15 seconds
 
# Helper Function 1: Reset Timed-Out Trips
async def reset_timed_out_trips(timeout):
    now = datetime.now()
    timeout_threshold = now - timedelta(seconds=timeout)
    timed_out_trips = await Trip.objects.filter(
        status=Trip.PENDING, created__lte=timeout_threshold
    ).all()
    for trip in timed_out_trips:
        trip.status = Trip.REQUESTED
        await trip.asave(update_fields=["status"])
        logger.info(f"Trip {trip.id} reset to REQUESTED due to timeout.")

# Helper Function 2: Filter Nearby Vehicles
def filter_nearby_vehicles(rider_location, vehicles, max_distance_km):
    nearby_vehicles = []
    for vehicle in vehicles:
        driver_location = (
            vehicle.current_location_latitude,
            vehicle.current_location_longitude,
        )
        try:
            distance = geodesic(rider_location, driver_location).kilometers
            if distance <= max_distance_km:
                nearby_vehicles.append((vehicle, distance))
        except ValueError:
            logger.error(
                f"Error calculating distance for Vehicle {vehicle.id}. Skipping vehicle."
            )
            continue
    nearby_vehicles.sort(key=lambda x: x[1])  # Sort by distance
    return [vehicle for vehicle, distance in nearby_vehicles]

# Helper Function 3: Assign Driver to Trip
async def assign_driver_to_trip(trip, vehicle):
    trip.driver = vehicle.driver
    trip.status = Trip.STARTED
    await trip.asave(update_fields=["driver", "status"])
    logger.info(f"Assigned Trip {trip.id} to Driver {vehicle.driver.id}.")

# Helper Function 4: Handle Shared Trip Availability
async def handle_shared_trip_availability(trip):
    shared_trip = await SharedTrip.objects.filter(trip=trip).afirst()
    if shared_trip:
        logger.info(f"Processing SharedTrip {shared_trip.id} for Trip {trip.id}.")
        if shared_trip.available_seats <= 0:
            trip.status = Trip.REJECTED
            await trip.asave(update_fields=["status"])
            logger.info(
                f"SharedTrip {shared_trip.id} rejected due to no available seats."
            )
            return False
        shared_trip.available_seats -= 1
        await shared_trip.asave(update_fields=["available_seats"])
        logger.info(
            f"SharedTrip {shared_trip.id} updated: {shared_trip.available_seats} seats remaining."
        )
    return True

# Main Function: Run and Assign Trips
async def run_and_assign_trips(timeout=120, max_distance_km=10):
    await reset_timed_out_trips(timeout)
    trips = await Trip.objects.filter(status=Trip.REQUESTED).select_related("rider").all()
    available_vehicles = await Vehicle.objects.filter(driver__isnull=False).select_related("driver").all()
    assignments = []

    for trip in trips:
        async with transaction.atomic():
            trip = await Trip.objects.select_for_update().aget(id=trip.id)
            if trip.status != Trip.REQUESTED:
                logger.info(f"Trip {trip.id} skipped. Status changed during processing.")
                continue

            if not await handle_shared_trip_availability(trip):
                continue

            rider_location = (trip.pickup_location_latitude, trip.pickup_location_longitude)
            nearby_vehicles = filter_nearby_vehicles(rider_location, available_vehicles, max_distance_km)

            if nearby_vehicles:
                closest_vehicle = nearby_vehicles[0]
                await assign_driver_to_trip(trip, closest_vehicle)
                assignments.append((trip, closest_vehicle.driver))
            else:
                trip.status = Trip.REJECTED
                await trip.asave(update_fields=["status"])
                logger.info(f"No drivers available within distance for Trip {trip.id}.")

    if assignments:
        for trip, driver in assignments:
            logger.info(f"Driver {driver.id} assigned to Trip {trip.id}.")
    else:
        logger.info("No assignments were made.")

    logger.info(f"Run completed at {datetime.now().isoformat()} with {len(assignments)} assignments.")



async def run_and_assign_trips(timeout=120, max_distance_km=10, specific_trip_id=None):
    await reset_timed_out_trips(timeout)
    
    # Get either specific trip or all requested trips
    if specific_trip_id:
        trips = await Trip.objects.filter(id=specific_trip_id, status=Trip.PENDING).select_related("rider").all()
    else:
        trips = await Trip.objects.filter(status__in=[Trip.REQUESTED, Trip.PENDING]).select_related("rider").all()
    
    available_vehicles = await Vehicle.objects.filter(
        driver__isnull=False,
        is_available=True
    ).select_related("driver").all()
    
    assignments = []

    for trip in trips:
        async with transaction.atomic():
            trip = await Trip.objects.select_for_update().aget(id=trip.id)
            current_status = trip.status
            
            if current_status not in [Trip.REQUESTED, Trip.PENDING]:
                continue

            if not await handle_shared_trip_availability(trip):
                continue

            rider_location = (trip.pickup_location_latitude, trip.pickup_location_longitude)
            nearby_vehicles = filter_nearby_vehicles(rider_location, available_vehicles, max_distance_km)

            if nearby_vehicles:
                closest_vehicle = nearby_vehicles[0]
                await assign_driver_to_trip(trip, closest_vehicle)
                assignments.append((trip, closest_vehicle.driver))
            else:
                trip.status = Trip.REJECTED
                await trip.asave(update_fields=["status"])
                logger.info(f"No drivers available within distance for Trip {trip.id}.")

    # Notify all affected parties
    for trip, driver in assignments:
        await TripSubscription.publish(payload=trip, trip_id=trip.id)
        await DriverPoolSubscription.publish(payload=trip)
        logger.info(f"Driver {driver.id} assigned to Trip {trip.id}.")


