import asyncio
from datetime import datetime
from graphene import ID, DateTime, Field, ObjectType, String
from graphql import GraphQLError
from logistics.dispatcher import run_dispatch


class LogisticsSubscriptions(ObjectType):
    dispatch_status = Field(
        String, description="Status updates for the dispatch process."
    )
    courier_state_update = Field(
        String,
        courier_id=ID(required=True),
        description="Updates on the courier's state.",
    )
    package_state_update = Field(
        String,
        package_id=ID(required=True),
        description="Updates on the package's state.",
    )

    async def subscribe_dispatch_status(root, info):
        # Asynchronously send dispatch status updates
        while True:
            await asyncio.sleep(60)  # Adjust the frequency as needed
            yield {
                "dispatch_status": f"Dispatch completed at {datetime.now().isoformat()}"
            }

    async def subscribe_courier_state_update(root, info, courier_id):
        # Monitor and stream courier state updates
        courier = await Courier.objects.filter(id=courier_id).afirst()
        if not courier:
            raise GraphQLError("Courier not found.")
        last_state = courier.state
        while True:
            await asyncio.sleep(1)  # Polling interval
            courier.refresh_from_db()
            if courier.state != last_state:
                last_state = courier.state
                yield {
                    "courier_state_update": f"Courier {courier_id} state changed to {last_state} at {datetime.now().isoformat()}"
                }

    async def subscribe_package_state_update(root, info, package_id):
        # Monitor and stream package state updates
        package = await Package.objects.filter(id=package_id).afirst()
        if not package:
            raise GraphQLError("Package not found.")
        last_state = package.state
        while True:
            await asyncio.sleep(1)  # Polling interval
            package.refresh_from_db()
            if package.state != last_state:
                last_state = package.state
                yield {
                    "package_state_update": f"Package {package_id} state changed to {last_state} at {datetime.now().isoformat()}"
                }
