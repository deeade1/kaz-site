import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import ServiceRequest, SharedTrip


class BaseConsumer(AsyncWebsocketConsumer):
    """Base consumer with common functionality"""
    
    async def verify_user_authentication(self):
        """Verify user is authenticated (not AnonymousUser)"""
        self.user = self.scope['user']
        if isinstance(self.user, AnonymousUser) or not self.user.is_authenticated:
            await self.close()
            return False
        return True
    
    async def join_group(self, group_name):
        """Join channel layer group"""
        await self.channel_layer.group_add(
            group_name,
            self.channel_name
        )
        await self.accept()
    
    async def leave_group(self, group_name):
        """Leave channel layer group"""
        await self.channel_layer.group_discard(
            group_name,
            self.channel_name
        )


class ServiceConsumer(BaseConsumer):
    """Handles WebSocket connections for service requests"""
    
    async def connect(self):
        if not await self.verify_user_authentication():
            return
        
        self.service_id = self.scope['url_route']['kwargs']['service_id']
        self.service_group = f'service_{self.service_id}'
        
        # Verify user has access to this service
        service = await self.get_service()
        if not await self.is_participant(service):
            await self.close()
            return
        
        await self.join_group(self.service_group)
    
    async def disconnect(self, close_code):
        await self.leave_group(self.service_group)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get('type')
        
        if event_type == 'location.update':
            await self.handle_location_update(data)
        elif event_type == 'service.status':
            await self.handle_status_update(data)
    
    @database_sync_to_async
    def get_service(self):
        return ServiceRequest.objects.get(id=self.service_id)
    
    @database_sync_to_async
    def is_participant(self, service):
        return (service.customer == self.user or 
                (service.provider and service.provider.user == self.user))
    
    async def handle_location_update(self, data):
        if not await self.is_provider():
            return
        
        await self.channel_layer.group_send(
            self.service_group,
            {
                'type': 'location.update',
                'latitude': data['latitude'],
                'longitude': data['longitude']
            }
        )
    
    async def handle_status_update(self, data):
        new_status = data['status']
        await self.update_service_status(new_status)
        
        await self.channel_layer.group_send(
            self.service_group,
            {
                'type': 'service.status',
                'status': new_status,
                'timestamp': data.get('timestamp')
            }
        )
    
    @database_sync_to_async
    def is_provider(self):
        return hasattr(self.user, 'service_provider')
    
    @database_sync_to_async
    def update_service_status(self, new_status):
        service = ServiceRequest.objects.get(id=self.service_id)
        service.status = new_status
        service.save()
    
    async def service_status(self, event):
        await self.send(text_data=json.dumps({
            'type': 'service.status',
            'status': event['status'],
            'timestamp': event['timestamp']
        }))
    
    async def location_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'location.update',
            'latitude': event['latitude'],
            'longitude': event['longitude']
        }))


class SharedTripConsumer(BaseConsumer):
    """Handles WebSocket connections for shared trips"""
    
    async def connect(self):
        if not await self.verify_user_authentication():
            return
        
        self.shared_trip_id = self.scope['url_route']['kwargs']['shared_trip_id']
        self.shared_trip_group = f'shared_trip_{self.shared_trip_id}'
        
        # Verify access
        if not await self.has_access():
            await self.close()
            return
        
        await self.join_group(self.shared_trip_group)
    
    async def disconnect(self, close_code):
        await self.leave_group(self.shared_trip_group)
    
    @database_sync_to_async
    def has_access(self):
        shared_trip = SharedTrip.objects.get(id=self.shared_trip_id)
        return (shared_trip.trip.customer == self.user or 
                self.user in [entry.user for entry in shared_trip.waitlist.all()])
    
    async def seat_available(self, event):
        """Notify when a seat becomes available"""
        await self.send(text_data=json.dumps({
            'type': 'seat.available',
            'message': 'A seat has become available',
            'trip_id': event['trip_id']
        }))
    
    async def status_update(self, event):
        """Notify when trip status changes"""
        await self.send(text_data=json.dumps({
            'type': 'status.update',
            'status': event['status'],
            'timestamp': event['timestamp']
        }))