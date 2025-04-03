from django.contrib.auth import get_user_model
from django.test import TestCase
from graphene.test import Client
from graphql_jwt.testcases import JSONWebTokenTestCase

from logistics.schema import schema
from logistics.models import LogisticsType, Courier, Package, Dispatch
from taxi.models import Vehicle


def create_test_user(is_staff=False):
    User = get_user_model()
    return User.objects.create_user(
        username="testuser",
        email="test@example.com",
        password="password123",
        is_staff=is_staff
    )

class LogisticsTypeMutationTests(JSONWebTokenTestCase):
    def setUp(self):
        self.user = create_test_user()
        self.client.authenticate(self.user)

    def test_create_logistics_type(self):
        mutation = '''
            mutation {
              createLogisticsType(input: {vehicleType: "Truck"}) {
                logisticsType {
                  id
                  vehicleType
                }
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertIsNone(response.get('errors'))
        data = response['data']['createLogisticsType']['logisticsType']
        self.assertEqual(data['vehicleType'], "Truck")

    def test_update_logistics_type(self):
        logistics_type = LogisticsType.objects.create(vehicle_type="Bike")
        mutation = f'''
            mutation {{
              updateLogisticsType(input: {{
                logisticsTypeId: "{logistics_type.id}"
                vehicleType: "Van"
              }}) {{
                logisticsType {{
                  id
                  vehicleType
                }}
              }}
            }}
        '''
        response = self.client.execute(mutation)
        data = response['data']['updateLogisticsType']['logisticsType']
        self.assertEqual(data['vehicleType'], "Van")


    def test_delete_logistics_type(self):
        logistics_type = LogisticsType.objects.create(vehicle_type="Bus")
        mutation = f'''
            mutation {{
              deleteLogisticsType(input: {{
                logisticsTypeId: "{logistics_type.id}"
              }}) {{
                success
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['deleteLogisticsType']['success'])
        self.assertFalse(LogisticsType.objects.filter(id=logistics_type.id).exists())

class CourierMutationTests(JSONWebTokenTestCase):
    def setUp(self):
        self.staff_user = create_test_user(is_staff=True)
        self.client.authenticate(self.staff_user)
        self.vehicle = Vehicle.objects.create(make="Toyota", model="Hiace", license_plate="XYZ123")

    def test_create_courier(self):
        mutation = f'''
            mutation {{
              createCourier(input: {{
                licensePlate: "ABC123"
                vehicleId: "{self.vehicle.id}"
              }}) {{
                courier {{
                  id
                  licensePlate
                }}
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertIsNone(response.get('errors'))
        courier = response['data']['createCourier']['courier']
        self.assertEqual(courier['licensePlate'], "ABC123")

    def test_update_courier(self):
        courier = Courier.objects.create(
            courier=self.staff_user,
            vehicle=self.vehicle,
            license_plate="OLD123"
        )
        mutation = f'''
            mutation {{
              updateCourier(input: {{
                courierId: "{courier.id}"
                licensePlate: "NEW456"
              }}) {{
                courier {{
                  id
                  licensePlate
                }}
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertEqual(response['data']['updateCourier']['courier']['licensePlate'], "NEW456")

    def test_delete_courier(self):
        courier = Courier.objects.create(
            courier=self.staff_user,
            vehicle=self.vehicle,
            license_plate="TODELETE"
        )
        mutation = f'''
            mutation {{
              deleteCourier(input: {{
                courierId: "{courier.id}"
              }}) {{
                success
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['deleteCourier']['success'])
        self.assertFalse(Courier.objects.filter(id=courier.id).exists())

class PackageMutationTests(JSONWebTokenTestCase):
    def setUp(self):
        self.user = create_test_user()
        self.client.authenticate(self.user)
        self.vehicle_type = LogisticsType.objects.create(vehicle_type="Bike")

    def test_create_package(self):
        mutation = f'''
            mutation {{
              createPackage(input: {{
                receiverName: "John Doe"
                receiverPhoneNumber: "123456789"
                pickupLocation: "Location A"
                deliveryLocation: "Location B"
                pickupTime: "12:00"
                vehicleTypeId: "{self.vehicle_type.id}"
              }}) {{
                package {{
                  id
                  receiverName
                }}
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertIsNone(response.get('errors'))
        self.assertEqual(response['data']['createPackage']['package']['receiverName'], "John Doe")

    def test_update_package(self):
        package = Package.objects.create(
            sender=self.user,
            vehicle_type=self.vehicle_type,
            receiver_name="Jane",
            pickup_location="Old Location",
            delivery_location="Old Delivery",
            pickup_time="12:00"
        )
        mutation = f'''
            mutation {{
              updatePackage(input: {{
                packageId: "{package.id}"
                receiverName: "Updated Name"
                pickupLocation: "New Location"
              }}) {{
                package {{
                  id
                  receiverName
                  pickupLocation
                }}
              }}
            }}
        '''
        response = self.client.execute(mutation)
        data = response['data']['updatePackage']['package']
        self.assertEqual(data['receiverName'], "Updated Name")
        self.assertEqual(data['pickupLocation'], "New Location")


    def test_delete_package(self):
        package = Package.objects.create(
            sender=self.user,
            vehicle_type=self.vehicle_type,
            receiver_name="Delete Me",
            pickup_location="Loc",
            delivery_location="Del",
            pickup_time="12:00"
        )
        mutation = f'''
            mutation {{
              deletePackage(input: {{
                packageId: "{package.id}"
              }}) {{
                success
              }}
            }}
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['deletePackage']['success'])
        self.assertFalse(Package.objects.filter(id=package.id).exists())


class CourierStateMutationTests(JSONWebTokenTestCase):
    def setUp(self):
        self.staff_user = create_test_user(is_staff=True)
        self.client.authenticate(self.staff_user)
        self.vehicle = Vehicle.objects.create(make="Toyota", model="Hiace", license_plate="XYZ123")
        self.courier = Courier.objects.create(
            courier=self.staff_user,
            vehicle=self.vehicle,
            license_plate="ABC123",
            state=Courier.IDLE,
            is_available=True
        )

        # Create Package
        self.package = Package.objects.create(
            sender=self.staff_user,
            receiver_name="Receiver",
            pickup_location="Loc A",
            delivery_location="Loc B",
            pickup_time="12:00",
            vehicle_type=LogisticsType.objects.create(vehicle_type="Bike"),
        )

        # Create Dispatch (Pending)
        self.dispatch = Dispatch.objects.create(
            courier=self.courier,
            package=self.package,
            state=Dispatch.PENDING
        )

    def test_check_in(self):
        mutation = '''
            mutation {
              checkIn {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['checkIn']['success'])
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.STANDING_BY)

    def test_leave(self):
        mutation = '''
            mutation {
              leave {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['leave']['success'])
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.IDLE)

    def test_decline(self):
        mutation = '''
            mutation {
              decline {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['decline']['success'])
        self.dispatch.refresh_from_db()
        self.assertEqual(self.dispatch.state, Dispatch.REJECTED)
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.STANDING_BY)

    def test_accept(self):
        mutation = '''
            mutation {
              accept {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['accept']['success'])
        self.dispatch.refresh_from_db()
        self.assertEqual(self.dispatch.state, Dispatch.SHIPPING)
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.SHIPPING)

    def test_complete(self):
        # First, move to SHIPPING
        self.dispatch.state = Dispatch.SHIPPING
        self.dispatch.save()
        self.courier.state = Courier.SHIPPING
        self.courier.save()

        mutation = '''
            mutation {
              complete {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['complete']['success'])
        self.dispatch.refresh_from_db()
        self.assertEqual(self.dispatch.state, Dispatch.SHIPPED)
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.IDLE)
        self.package.refresh_from_db()
        self.assertEqual(self.package.state, Package.DELIVERED)
    def test_fail(self):
        # First, move to SHIPPING
        self.dispatch.state = Dispatch.SHIPPING
        self.dispatch.save()
        self.courier.state = Courier.SHIPPING
        self.courier.save()

        mutation = '''
            mutation {
              fail {
                success
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertTrue(response['data']['fail']['success'])
        self.dispatch.refresh_from_db()
        self.assertEqual(self.dispatch.state, Dispatch.FAILED)
        self.courier.refresh_from_db()
        self.assertEqual(self.courier.state, Courier.IDLE)
        self.package.refresh_from_db()
        self.assertEqual(self.package.state, Package.FAILED)

    def test_get_package_info(self):
        mutation = '''
            mutation {
              get {
                packageInfo
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertIn("Receiver", response['data']['get']['packageInfo'])
    def test_get_package_info(self):
        mutation = '''
            mutation {
              get {
                packageInfo
              }
            }
        '''
        response = self.client.execute(mutation)
        self.assertIn("Receiver", response['data']['get']['packageInfo'])


import pytest
import asyncio
from logistics.models import Courier, Dispatch, Package, LogisticsType
from datetime import datetime
from graphql.execution.executors.asyncio import AsyncioExecutor
from graphql import subscribe
from logistics.schema import schema
from django.contrib.auth import get_user_model
from taxi.models import Vehicle

@pytest.mark.django_db
@pytest.mark.asyncio
class TestLogisticsSubscriptions:

    async def test_dispatch_status_subscription(self):
        # Subscription query
        subscription = '''
            subscription {
                dispatchStatus
            }
        '''

        # Subscribe
        result = await subscribe(
            schema,
            {"query": subscription},
            executor=AsyncioExecutor()
        )

        # Wait to receive message (simulate event loop)
        gen = result.__anext__()
        response = await asyncio.wait_for(gen, timeout=65)

        assert 'dispatchStatus' in response.data

    async def test_courier_state_update_subscription(self):
        # Setup courier
        User = get_user_model()
        user = User.objects.create(username="courier1")
        vehicle = Vehicle.objects.create(make="Toyota", model="Hiace", license_plate="ABC123")
        courier = Courier.objects.create(courier=user, vehicle=vehicle)

        subscription = f'''
            subscription {{
                courierStateUpdate(courierId: "{courier.id}") {{
                    courierId
                    state
                    timestamp
                }}
            }}
        '''

        # Subscribe
        result = await subscribe(
            schema,
            {"query": subscription},
            executor=AsyncioExecutor()
        )

        # Trigger courier state change
        courier.state = Courier.SHIPPING
        courier.save()

        # Receive message
        gen = result.__anext__()
        response = await asyncio.wait_for(gen, timeout=2)

        data = response.data['courierStateUpdate']
        assert data['courierId'] == str(courier.id)
        assert data['state'] == Courier.SHIPPING

    async def test_package_state_update_subscription(self):
        # Setup package
        User = get_user_model()
        user = User.objects.create(username="sender1")
        logistics_type = LogisticsType.objects.create(vehicle_type="Bike")
        package = Package.objects.create(
            sender=user,
            receiver_name="Receiver",
            pickup_location="Loc A",
            delivery_location="Loc B",
            pickup_time="12:00",
            vehicle_type=logistics_type,
        )

        subscription = f'''
            subscription {{
                packageStateUpdate(packageId: "{package.id}") {{
                    packageId
                    state
                    timestamp
                }}
            }}
        '''

        # Subscribe
        result = await subscribe(
            schema,
            {"query": subscription},
            executor=AsyncioExecutor()
        )

        # Trigger package state change
        package.state = Package.IN_TRANSIT
        package.save()

        # Receive message
        gen = result.__anext__()
        response = await asyncio.wait_for(gen, timeout=2)

        data = response.data['packageStateUpdate']
        assert data['packageId'] == str(package.id)
        assert data['state'] == Package.IN_TRANSIT
