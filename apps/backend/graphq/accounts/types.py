import graphene
from django.contrib.auth import get_user_model
from graphene import Node, ObjectType
from graphene_django.types import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType
from django.db import models

from .models import User, UserProfile, Role, UserRole, Friend, FriendRequest, Address

User = get_user_model()

class UserType(OptimizedDjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')
        interfaces = (graphene.relay.Node,)
    
    contact = graphene.String()
    friends = graphene.List(lambda: UserType)
    friend_requests = graphene.List(lambda: FriendRequestType)
    roles = graphene.List(lambda: UserRoleType)
    
    def resolve_roles(self, info):
        return self.app_roles.filter(is_active=True)
    
    def resolve_contact(self, info):
        return self.email or str(self.phone_number)
    
    def resolve_friends(self, info):
        # Get both sides of friendships
        friend_ids = Friend.objects.filter(
            models.Q(user=self) | models.Q(friend=self)
        ).values_list('user_id', 'friend_id')
        
        friends_ids = {id_ for pair in friend_ids for id_ in pair if id_ != self.id}
        return User.objects.filter(id__in=friends_ids)
    
    def resolve_friend_requests(self, info):
        if info.context.user != self:
            return []
        return FriendRequest.objects.filter(
            models.Q(receiver=self, status='pending') |
            models.Q(sender=self, status='pending')
        )

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = ('image', 'language_code', 'note')
        interfaces = (graphene.relay.Node,)

class RoleType(DjangoObjectType):
    class Meta:
        model = Role
        fields = '__all__'
        interfaces = (graphene.relay.Node,)

class UserRoleType(DjangoObjectType):
    class Meta:
        model = UserRole
        fields = '__all__'
        interfaces = (graphene.relay.Node,)

class FriendType(OptimizedDjangoObjectType):
    class Meta:
        model = Friend
        fields = '__all__'
        interfaces = (graphene.relay.Node,)
    
    friend = graphene.Field(UserType)
    
    def resolve_friend(self, info):
        return self.friend

class FriendRequestType(OptimizedDjangoObjectType):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        interfaces = (graphene.relay.Node,)
    
    sender = graphene.Field(UserType)
    receiver = graphene.Field(UserType)
    
    def resolve_sender(self, info):
        return self.sender
    
    def resolve_receiver(self, info):
        return self.receiver

class AddressType(OptimizedDjangoObjectType):
    country_code = graphene.String()
    country_name = graphene.String()

    class Meta:
        model = Address
        interfaces = (Node,)
        fields = "__all__"
        filter_fields = ["city", "user_addresses"]

    def resolve_country_code(self, info):
        return self.country.code if self.country else None

    def resolve_country_name(self, info):
        return self.country.name if self.country else None