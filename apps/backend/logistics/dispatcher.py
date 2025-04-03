import logging
from datetime import datetime, timedelta

from geopy.distance import geodesic
from django.db import transaction

from logistics.models import Courier, Dispatch, Package

logger = logging.getLogger("dispatch_logger")


def run_dispatch(timeout=120):
    now = datetime.now()
    timeout_threshold = now - timedelta(seconds=timeout)

    # Handle timed-out dispatches
    timed_out_dispatches = Dispatch.objects.filter(
        state=Dispatch.STATE_PENDING, date_created__lte=timeout_threshold
    ).select_related("package", "courier")

    if timed_out_dispatches.exists():
        logger.info(f"Timed out: {timed_out_dispatches.count()} dispatches")

        # Collect affected packages & couriers IDs
        package_ids = [dispatch.package.id for dispatch in timed_out_dispatches if dispatch.package]
        courier_ids = [dispatch.courier.id for dispatch in timed_out_dispatches if dispatch.courier]

        # Batch update package and courier states
        Package.objects.filter(id__in=package_ids).update(state=Package.STATE_NEW)
        Courier.objects.filter(id__in=courier_ids).update(state=Courier.STATE_IDLE)

        # Notify couriers
        for courier in Courier.objects.filter(id__in=courier_ids):
            push(courier, "TIMEOUT")

        # Update dispatches
        timed_out_dispatches.update(state=Dispatch.STATE_TIMED_OUT)

    # Assign new packages
    packages = list(
        Package.objects.filter(state=Package.STATE_NEW).prefetch_related("dispatch_set")
    )
    couriers = list(
        Courier.objects.filter(state=Courier.STATE_STANDING_BY).prefetch_related("dispatch_set")
    )

    if not packages or not couriers:
        logger.info("No new assignments.")
        return

    assignments = []

    # Use transaction to ensure consistency
    with transaction.atomic():
        for package in packages:
            try:
                # Find nearest courier
                nearest_courier = min(
                    couriers,
                    key=lambda c: geodesic(package.pickup_location, c.location).kilometers,
                    default=None,
                )
            except Exception as e:
                logger.error(f"Error assigning courier for package {package.id}: {e}")
                continue

            if nearest_courier:
                # Update states
                Courier.objects.filter(id=nearest_courier.id).update(state=Courier.STATE_PENDING)
                Package.objects.filter(id=package.id).update(state=Package.STATE_PENDING)

                # Create dispatch
                Dispatch.objects.create(courier=nearest_courier, package=package)

                assignments.append((nearest_courier, package))

    # Logging assignments summary
    if assignments:
        log_entries = "\n".join(
            [f"Courier: {c.id}, Package: {p.id}" for c, p in assignments]
        )
        logger.info(f"Assignments done:\n{log_entries}\nAt: {now.isoformat()}")
    else:
        logger.info("No new assignments.")
