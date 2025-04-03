# chat/schema.py
from graphene_django import DjangoObjectType
from .models import Message, ChatRoom

class MessageNode(DjangoObjectType):
    class Meta:
        model = Message
        fields = ('id', 'chatroom', 'text', 'sender', 'timestamp')
        interfaces = (graphene.relay.Node,)
    
    # Convert UUID to string for GraphQL
    id = graphene.String()
    
    def resolve_id(self, info):
        return str(self.id)

class ChatRoomNode(DjangoObjectType):
    class Meta:
        model = ChatRoom
        fields = ('name', 'created_at')

