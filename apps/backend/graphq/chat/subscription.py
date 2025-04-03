class Subscription(ObjectType):
    message_sent = Field(MessageType, 
                        chatroom=String(required=True))

    async def subscribe_message_sent(root, info, chatroom: str):
        if not info.context.user.is_authenticated:
            raise Exception("Authentication required")
        
        storage = info.context.storage
        async for message in storage.subscribe(chatroom):
            if message.sender != info.context.user:  # Skip self-messages
                yield message