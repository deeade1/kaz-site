# consumers.py
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import Trip

# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser

class TripConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if isinstance(self.user, AnonymousUser):
            await self.close()
            return
        
        self.trip_id = self.scope['url_route']['kwargs']['trip_id']
        self.trip_group = f'trip_{self.trip_id}'
        
        # Join trip group
        await self.channel_layer.group_add(
            self.trip_group,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave trip group
        await self.channel_layer.group_discard(
            self.trip_group,
            self.channel_name
        )
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get('type')
        
        if event_type == 'location.update':
            await self.handle_location_update(data)
        elif event_type == 'trip.status':
            await self.handle_status_update(data)
    
    async def handle_location_update(self, data):
        """Handle driver location updates"""
        if not await self.is_driver_for_trip():
            return
        
        # Broadcast to rider
        await self.channel_layer.group_send(
            self.trip_group,
            {
                'type': 'location.update',
                'latitude': data['latitude'],
                'longitude': data['longitude']
            }
        )
    
    async def handle_status_update(self, data):
        """Handle trip status changes"""
        if not await self.is_participant():
            return
        
        new_status = data['status']
        await self.update_trip_status(new_status)
        
        # Broadcast status change
        await self.channel_layer.group_send(
            self.trip_group,
            {
                'type': 'trip.status',
                'status': new_status,
                'timestamp': data.get('timestamp')
            }
        )
    
    @database_sync_to_async
    def is_driver_for_trip(self):
        from .models import Trip
        return Trip.objects.filter(
            id=self.trip_id,
            driver__user=self.user
        ).exists()
    
    @database_sync_to_async
    def is_participant(self):
        from .models import Trip
        return Trip.objects.filter(
            id=self.trip_id
        ).filter(
            models.Q(driver__user=self.user) | 
            models.Q(rider__user=self.user)
        ).exists()
    
    @database_sync_to_async
    def update_trip_status(self, new_status):
        from .models import Trip
        trip = Trip.objects.get(id=self.trip_id)
        trip.status = new_status
        trip.save()
    
    async def trip_status(self, event):
        """Send status update to client"""
        await self.send(text_data=json.dumps({
            'type': 'trip.status',
            'status': event['status'],
            'timestamp': event['timestamp']
        }))
    
    async def location_update(self, event):
        """Send location update to client"""
        await self.send(text_data=json.dumps({
            'type': 'location.update',
            'latitude': event['latitude'],
            'longitude': event['longitude']
        }))

class TripConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            await self.accept()
            
            # Add user to their personal group for direct messages
            await self.channel_layer.group_add(
                f"user_{self.scope['user'].id}",
                self.channel_name
            )
            
            # If driver, add to driver pool
            if self.scope["user"].is_driver:
                await database_sync_to_async(self.scope["user"].join_driver_pool)()

    async def disconnect(self, code):
        # Remove from all groups
        if not self.scope["user"].is_anonymous:
            # If driver, remove from driver pool
            if self.scope["user"].is_driver:
                await database_sync_to_async(self.scope["user"].leave_driver_pool)
                
                
    async def broadcast_assignment(self, event):
        await self.send_json({
            "type": "trip.assigned",
            "trip": event["trip"],
            "driver": event["driver"]
        })

    async def broadcast_rejection(self, event):
        await self.send_json({
            "type": "trip.rejected",
            "trip": event["trip"],
            "reason": event.get("reason", "No drivers available")
        })
