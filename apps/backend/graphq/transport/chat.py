from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import ChatMessage

class TripChat:
    @staticmethod
    def send_message(trip, user, message):
        """Send and broadcast chat message"""
        msg = ChatMessage.objects.create(
            trip=trip,
            user=user,
            message=message
        )
        
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"trip_{trip.id}_chat",
            {
                "type": "chat.message",
                "message": message,
                "user": {
                    "id": user.id,
                    "name": user.get_full_name()
                },
                "timestamp": msg.timestamp.isoformat()
            }
        )
        
        return msg