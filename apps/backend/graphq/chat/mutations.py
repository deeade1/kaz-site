
class SendMessage(relay.ClientIDMutation):
    message = Field(MessageType)

    class Input:
        chatroom = String(required=True)
        text = String(required=True)

    async def mutate_and_get_payload(self, info, chatroom: str, text: str):
        if not info.context.user.is_authenticated:
            raise Exception("Authentication required")
        
        storage = info.context.storage
        message = await storage.add_message(
            chatroom=chatroom,
            text=text,
            sender=info.context.user
        )
        return SendMessage(message=message)
    
    
    
class SendChatMessage(graphene.Mutation, name="SendChatMessagePayload"):  # type: ignore
    """Send chat message."""

    ok = graphene.Boolean()

    class Arguments:
        """Mutation arguments."""

        chatroom = graphene.String()
        text = graphene.String()

    def mutate(self, info, chatroom, text):
        """Mutation "resolver" - store and broadcast a message."""

        # Here we identify the sender by `sessionid` cookie.
        user_session_key = info.context.session.session_key

        # Store a message.
        chats[chatroom].append(
            {"chatroom": chatroom, "text": text, "sender": user_session_key}
        )

        # Notify subscribers.
        OnNewChatMessage.new_chat_message(
            chatroom=chatroom, text=text, sender=user_session_key
        )

        return SendChatMessage(ok=True)


class Mutation(graphene.ObjectType):
    """Root GraphQL mutation."""

    send_chat_message = SendChatMessage.Field()


# ------------------------------------------------------------------------ SUBSCRIPTIONS


class OnNewChatMessage(channels_graphql_ws.Subscription):
    """Subscription triggers on a new chat message."""

    sender = graphene.String()
    chatroom = graphene.String()
    text = graphene.String()

    class Arguments:
        """Subscription arguments."""

        chatroom = graphene.String()

    def subscribe(self, info, chatroom=None):
        """Client subscription handler."""
        del info
        # Specify the subscription group client subscribes to.
        return [chatroom] if chatroom is not None else None

    def publish(self, info, chatroom=None):
        """Called to prepare the subscription notification message."""

        # The `self` contains payload delivered from the `broadcast()`.
        new_msg_chatroom = self["chatroom"]
        new_msg_text = self["text"]
        new_msg_sender = self["sender"]

        # Method is called only for events on which client explicitly
        # subscribed, by returning proper subscription groups from the
        # `subscribe` method. So he either subscribed for all events or
        # to particular chatroom.
        assert chatroom is None or chatroom == new_msg_chatroom

        # Avoid self-notifications.
        # The sender is identified by a `sessionid` cookie.
        user_session_key = info.context.channels_scope["session"].session_key
        if user_session_key == new_msg_sender:
            return None

        return OnNewChatMessage(
            chatroom=chatroom, text=new_msg_text, sender=new_msg_sender
        )

    @classmethod
    def new_chat_message(cls, chatroom, text, sender):
        cls.broadcast(
            group=chatroom,
            payload={"chatroom": chatroom, "text": text, "sender": sender},
        )


class Subscription(graphene.ObjectType):
    """GraphQL subscriptions."""

    on_new_chat_message = OnNewChatMessage.Field()


