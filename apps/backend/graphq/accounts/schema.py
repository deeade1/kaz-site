import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from django.contrib.auth import get_user_model

from .types import AddressNode, UserNode, FriendNode
from .filters import AddressFilter, UserFilter, FriendFilter  

User = get_user_model()

class AccountQueries(graphene.ObjectType):
    # User
    user = Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode, filterset_class=UserFilter)

    # Address
    address = Node.Field(AddressNode)
    all_addresses = DjangoFilterConnectionField(AddressNode, filterset_class=AddressFilter)

    # Friend
    friend = Node.Field(FriendNode)
    all_friends = DjangoFilterConnectionField(FriendNode, user_id=graphene.ID(),
        description="Get a user's friends list")
    
    friend_requests = graphene.List(
        FriendRequestNode,
        incoming=graphene.Boolean(default_value=True),
        outgoing=graphene.Boolean(default_value=True),
        description="Get friend requests"
    )
    
    def resolve_friends(self, info, user_id=None):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        target_user = user
        if user_id:
            target_user = relay.Node.get_node_from_global_id(info, user_id, UserType)
            if not target_user:
                raise GraphQLError("User not found")
        
        # Get both sides of friendships
        friend_ids = Friend.objects.filter(
            models.Q(user=target_user) |
            models.Q(friend=target_user)
        ).values_list('user_id', 'friend_id')
        
        # Extract unique friend IDs excluding the user themselves
        friends_ids = {
            id_ 
            for pair in friend_ids 
            for id_ in pair 
            if id_ != target_user.id
        }
        
        return User.objects.filter(id__in=friends_ids)
    
    def resolve_friend_requests(self, info, incoming, outgoing):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        qs = FriendRequest.objects.none()
        
        if incoming:
            qs |= user.received_requests.filter(status='pending')
        if outgoing:
            qs |= user.sent_requests.filter(status='pending')
        
        return qs


  