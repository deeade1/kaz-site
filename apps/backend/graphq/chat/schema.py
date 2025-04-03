import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from chat import models
from graphq.accounts.types import UserNode
from graphq.chat.types import MessageNode, ChatRoomNode


class Query(ObjectType):
    messages = DjangoFilterConnectionField(MessageNode,
                          chatroom=String(required=True),
                          limit=Int(default_value=100))
    
    chatrooms = DjangoFilterConnectionField(ChatRoomNode)
    
    async def resolve_messages(self, info, chatroom: str, limit: int):
        storage = info.context.storage
        return await storage.get_messages(chatroom, limit)
    
    @sync_to_async
    def resolve_chatrooms(self, info):
        return list(models.ChatRoom.objects.all())