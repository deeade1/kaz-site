import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from datetime import datetime, timedelta

from geopy.distance import geodesic

from trips.models import Trip, SharedTrip, Vehicle
from trips.services import (
    reset_timed_out_trips,
    filter_nearby_vehicles,
    assign_driver_to_trip,
    handle_shared_trip_availability,
)


@pytest.mark.asyncio
@patch("trips.services.Trip")
async def test_reset_timed_out_trips_resets_pending_trips_exceeding_timeout(mock_trip_model):
    """
    Test that reset_timed_out_trips resets trips with status PENDING
    that have exceeded the specified timeout.
    """
    mock_trip_instance = MagicMock()
    mock_trip_model.objects.filter.return_value.all.return_value = [
        mock_trip_instance
    ]

    await reset_timed_out_trips(timeout=120)

    mock_trip_instance.asave.assert_called_once()
    assert mock_trip_instance.status == Trip.REQUESTED


@pytest.mark.asyncio
def test_filter_nearby_vehicles_returns_sorted_vehicles_within_max_distance():
    """
    Test that filter_nearby_vehicles returns vehicles sorted by distance
    that are within the specified maximum distance.
    """
    rider_location = (10.0, 10.0)

    vehicle1 = MagicMock()
    vehicle1.current_location_latitude = 10.01
    vehicle1.current_location_longitude = 10.01

    vehicle2 = MagicMock()
    vehicle2.current_location_latitude = 20.0
    vehicle2.current_location_longitude = 20.0

    vehicles = [vehicle1, vehicle2]

    filtered = filter_nearby_vehicles(vehicles, rider_location, max_distance_km=5)

    assert vehicle1 in filtered
    assert vehicle2 not in filtered


@pytest.mark.asyncio
def test_filter_nearby_vehicles_skips_vehicle_if_distance_calculation_fails():
    """
    Test that filter_nearby_vehicles skips a vehicle if distance calculation fails.
    """
    rider_location = (10.0, 10.0)

    vehicle = MagicMock()
    vehicle.current_location_latitude = None
    vehicle.current_location_longitude = None

    vehicles = [vehicle]

    filtered = filter_nearby_vehicles(vehicles, rider_location, max_distance_km=5)

    assert vehicle not in filtered


@pytest.mark.asyncio
def test_filter_nearby_vehicles_returns_empty_list_if_no_vehicle_within_distance():
    """
    Test that filter_nearby_vehicles returns an empty list if no vehicle is within the specified distance.
    """
    rider_location = (10.0, 10.0)

    vehicle = MagicMock()
    vehicle.current_location_latitude = 50.0
    vehicle.current_location_longitude = 50.0

    vehicles = [vehicle]

    filtered = filter_nearby_vehicles(vehicles, rider_location, max_distance_km=5)

    assert len(filtered) == 0


@pytest.mark.asyncio
async def test_assign_driver_to_trip_assigns_driver_and_updates_status():
    """
    Test that assign_driver_to_trip assigns a driver to the trip and updates the status to STARTED.
    """
    trip = MagicMock()
    vehicle = MagicMock()
    vehicle.driver = MagicMock()

    await assign_driver_to_trip(trip, vehicle)

    assert trip.driver == vehicle.driver
    assert trip.status == Trip.STARTED
    trip.asave.assert_called_once()


@pytest.mark.asyncio
async def test_handle_shared_trip_availability_rejects_trip_when_no_seats_available():
    """
    Test that handle_shared_trip_availability rejects the trip when no seats are available.
    """
    trip = MagicMock()
    shared_trip = MagicMock()
    shared_trip.available_seats = 0

    result = await handle_shared_trip_availability(shared_trip, trip)

    assert result is False
    assert trip.status == Trip.REJECTED
    trip.asave.assert_called_once()


@pytest.mark.asyncio
async def test_handle_shared_trip_availability_decrements_seats_when_available():
    """
    Test that handle_shared_trip_availability decrements the available seats when seats are available.
    """
    trip = MagicMock()
    shared_trip = MagicMock()
    shared_trip.available_seats = 2

    result = await handle_shared_trip_availability(shared_trip, trip)

    assert result is True
    assert shared_trip.available_seats == 1
    shared_trip.asave.assert_called_once()


@pytest.mark.asyncio
async def test_handle_shared_trip_availability_returns_true_when_no_shared_trip():
    """
    Test that handle_shared_trip_availability returns True when no shared trip is provided.
    """
    trip = MagicMock()
    shared_trip = None

    result = await handle_shared_trip_availability(shared_trip, trip)

    assert result is True
    trip.asave.assert_not_called()
