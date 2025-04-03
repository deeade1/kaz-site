import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser

class PropertyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if isinstance(self.scope['user'], AnonymousUser):
            await self.close()
            return
        
        self.user = self.scope['user']
        
        # Join user-specific group
        await self.channel_layer.group_add(
            f"user_{self.user.id}",
            self.channel_name
        )
        
        # Join groups for their property subscriptions
        subscriptions = await self.get_user_subscriptions()
        for sub in subscriptions:
            await self.channel_layer.group_add(
                f"property_type_{sub.property_type}" if sub.property_type else "all_properties",
                self.channel_name
            )
            if sub.location:
                await self.channel_layer.group_add(
                    f"location_{sub.location.x}_{sub.location.y}_{sub.radius_km}",
                    self.channel_name
                )
        
        await self.accept()

    async def disconnect(self, close_code):
        # Leave all groups
        if hasattr(self, 'user'):
            await self.channel_layer.group_discard(
                f"user_{self.user.id}",
                self.channel_name
            )
            
            subscriptions = await self.get_user_subscriptions()
            for sub in subscriptions:
                await self.channel_layer.group_discard(
                    f"property_type_{sub.property_type}" if sub.property_type else "all_properties",
                    self.channel_name
                )
                if sub.location:
                    await self.channel_layer.group_discard(
                        f"location_{sub.location.x}_{sub.location.y}_{sub.radius_km}",
                        self.channel_name
                    )

    @database_sync_to_async
    def get_user_subscriptions(self):
        from .models import PropertySubscription
        return list(PropertySubscription.objects.filter(user=self.user))

    async def property_update(self, event):
        """Send property updates to client"""
        # Don't send update to user who made the change
        if event.get('updated_by') != self.user.id:
            await self.send(text_data=json.dumps({
                'type': 'property.update',
                'property_id': event['property_id'],
                'changes': event['changes'],
                'timestamp': event['timestamp']
            }))

    async def property_created(self, event):
        """Send new property notifications"""
        await self.send(text_data=json.dumps({
            'type': 'property.created',
            'property': event['property'],
            'timestamp': event['timestamp']
        }))