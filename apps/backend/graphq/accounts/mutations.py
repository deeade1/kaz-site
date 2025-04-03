import re
from calendar import timegm
import graphene
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.db import transaction, models
from graphene import ID, String, relay, List, NonNull
from graphene.types.generic import GenericScalar
from graphql import GraphQLError
from graphql_relay import from_global_id
from graphene_django_jwt import signals
from graphene_django_jwt.blacklist import Blacklist
from graphene_django_jwt.decorators import login_required
from graphene_django_jwt.models import RefreshToken
from graphene_django_jwt.shortcuts import get_refresh_token
from graphene_django_jwt.signals import refresh_finished
from graphene_django_jwt.utils import create_refresh_token, get_payload, jwt_encode, jwt_payload

from .models import User, UserProfile, Role, UserRole, Friend, FriendRequest, Address
from .types import UserType, FriendRequestType, FriendType

UserModel = get_user_model()
MIN_PASSWORD_LENGTH = 8

class RevokeAllTokensMutation(relay.ClientIDMutation):
    revoked_tokens = List(NonNull(String), required=True)

    class Input:
        pass

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("User is not authenticated.")

        refresh_tokens = RefreshToken.objects.filter(
            user_id=user.id, 
            revoked__isnull=True
        )
        
        revoked_tokens = []
        for rt in refresh_tokens:
            rt.revoke()
            revoked_tokens.append(rt.get_token())

        return cls(revoked_tokens=revoked_tokens)

class ObtainJSONWebTokenMutation(relay.ClientIDMutation):
    token = String(required=True)
    refresh_token = String(required=True)
    user = graphene.Field(UserType)

    class Input:
        contact = String(required=True)
        password = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        contact = input["contact"]
        password = input["password"]
        is_email = "@" in contact

        user = UserModel.objects.filter(
            email=contact if is_email else None,
            phone_number=contact if not is_email else None
        ).first()

        if not user or not user.check_password(password):
            raise GraphQLError("Invalid credentials")
        if not user.is_active:
            raise GraphQLError("Account inactive")

        refresh_token = create_refresh_token(user).get_token()
        token = jwt_encode(jwt_payload(user, refresh_token=refresh_token))
        user_logged_in.send(sender=cls, request=info.context, user=user)
        
        return cls(token=token, refresh_token=refresh_token, user=user)

class RefreshMutation(relay.ClientIDMutation):
    token = String(required=True)
    payload = GenericScalar(required=True)
    refresh_token = String(required=True)

    class Input:
        refresh_token = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            refresh_token = get_refresh_token(input["refresh_token"])
            if refresh_token.revoked:
                raise GraphQLError("Refresh token revoked")
            
            refreshed_token = refresh_token.rotate()
            payload = jwt_payload(refresh_token.user, refresh_token=refreshed_token.get_token())
            token = jwt_encode(payload)
            refresh_finished.send(sender=RefreshToken, user=refresh_token.user, request=info.context)
            
            return cls(token=token, payload=payload, refresh_token=refreshed_token.get_token())
        except Exception as e:
            raise GraphQLError(str(e))

class RevokeMutation(relay.ClientIDMutation):
    revoked = graphene.Int(required=True)

    class Input:
        refresh_token = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            refresh_token = get_refresh_token(input["refresh_token"])
            refresh_token.revoke()
            return cls(revoked=timegm(refresh_token.revoked.timetuple()))
        except Exception as e:
            raise GraphQLError(str(e))

class VerifyMutation(relay.ClientIDMutation):
    payload = GenericScalar(required=True)

    class Input:
        token = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            payload = get_payload(input["token"])
            if Blacklist.is_blacklisted(payload["refresh_token"]):
                raise GraphQLError("Token blacklisted")
            return cls(payload=payload)
        except Exception as e:
            raise GraphQLError(str(e))

class LogoutMutation(relay.ClientIDMutation):
    success = graphene.Boolean(required=True)

    class Input:
        refresh_token = String(required=False)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        if refresh_token := input.get("refresh_token"):
            get_refresh_token(refresh_token).revoke()
        user_logged_out.send(sender=cls, request=info.context, user=info.context.user)
        return cls(success=True)

def validate_password(password, email=None):
    if len(password) < MIN_PASSWORD_LENGTH:
        raise GraphQLError(f"Password must be at least {MIN_PASSWORD_LENGTH} characters")
    if not (re.search(r"\d", password) and re.search(r"[a-zA-Z]", password)):
        raise GraphQLError("Password must contain letters and numbers")
    if email and password.lower() in email.lower():
        raise GraphQLError("Password too similar to email")

class UserRoleInput(graphene.InputObjectType):
    app_name = graphene.String(required=True)
    role_name = graphene.String(required=True)

class CreateUser(relay.ClientIDMutation):
    class Input:
        contact = String(required=True)
        password = String(required=True)
        roles = List(UserRoleInput)
        language_code = String()
    
    user = graphene.Field(UserType)
    token = String()
    
    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, **input):
        contact = input["contact"]
        password = input["password"]
        is_email = "@" in contact

        if is_email:
            email, phone_number = contact, None
        else:
            email, phone_number = None, contact

        if UserModel.objects.filter(
            email=email if email else None,
            phone_number=phone_number if phone_number else None
        ).exists():
            raise GraphQLError("User already exists")

        validate_password(password, email)
        
        user = UserModel.objects.create_user(
            email=email,
            phone_number=phone_number,
            password=password
        )
        
        UserProfile.objects.create(
            user=user,
            language_code=input.get("language_code", settings.LANGUAGE_CODE)
        )
        
        if roles := input.get("roles"):
            for role_input in roles:
                role = Role.objects.get(name=role_input.role_name)
                UserRole.objects.create(
                    user=user,
                    role=role,
                    app_name=role_input.app_name,
                    created_by=info.context.user if info.context.user.is_authenticated else None
                )
        
        refresh_token = create_refresh_token(user)
        token = jwt_encode(jwt_payload(user, refresh_token=refresh_token.token))
        user_logged_in.send(sender=cls, request=info.context, user=user)
        
        return cls(user=user, token=token)

class UpdateUserRoles(relay.ClientIDMutation):
    class Input:
        user_id = ID(required=True)
        roles = List(UserRoleInput, required=True)
    
    user = graphene.Field(UserType)
    
    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, user_id, roles):
        user = relay.Node.get_node_from_global_id(info, user_id)
        if not user:
            raise GraphQLError("User not found")
        
        user.app_roles.all().delete()
        
        for role_input in roles:
            role = Role.objects.get(name=role_input.role_name)
            UserRole.objects.create(
                user=user,
                role=role,
                app_name=role_input.app_name,
                created_by=info.context.user
            )
        
        return cls(user=user)

class UpdateUser(relay.ClientIDMutation):
    user = graphene.Field(UserType)
    success = String()

    class Input:
        user_id = ID(required=True)
        first_name = String()
        last_name = String()
        group = String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, user_id, **input):
        user = relay.Node.get_node_from_global_id(info, user_id)
        if not user:
            raise GraphQLError("User not found")

        if first_name := input.get("first_name"):
            user.first_name = first_name
        if last_name := input.get("last_name"):
            user.last_name = last_name
        
        if group_name := input.get("group"):
            group, _ = Group.objects.get_or_create(name=group_name)
            user.groups.set([group])
        
        user.save()
        return cls(user=user, success="User updated")

class AddressMutation(relay.ClientIDMutation):
    address = graphene.Field(AddressType)

    class Input:
        street = String()
        city = String()
        state = String()
        postal_code = String()
        country = String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        address = Address.objects.create(
            user=info.context.user,
            **{k: v for k, v in input.items() if v}
        )
        return cls(address=address)

class SendFriendRequest(relay.ClientIDMutation):
    class Input:
        friend_id = ID(required=True)
    
    request = graphene.Field(FriendRequestType)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, friend_id):
        sender = info.context.user
        receiver = relay.Node.get_node_from_global_id(info, friend_id)
        
        if not receiver:
            raise GraphQLError("User not found")
        if sender == receiver:
            raise GraphQLError("Cannot friend yourself")
        if Friend.objects.filter(
            models.Q(user=sender, friend=receiver) |
            models.Q(user=receiver, friend=sender)
        ).exists():
            raise GraphQLError("Already friends")
        
        request, created = FriendRequest.objects.get_or_create(
            sender=sender,
            receiver=receiver,
            defaults={'status': 'pending'}
        )
        
        if not created and request.status != 'pending':
            request.status = 'pending'
            request.save()
        
        return cls(request=request)

class RespondToFriendRequest(relay.ClientIDMutation):
    class Input:
        request_id = ID(required=True)
        accept = Boolean(required=True)
    
    request = graphene.Field(FriendRequestType)
    friendship = graphene.Field(FriendType)
    
    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, request_id, accept):
        request = relay.Node.get_node_from_global_id(info, request_id)
        if not request or request.receiver != info.context.user:
            raise GraphQLError("Invalid request")
        if request.status != 'pending':
            raise GraphQLError("Request already processed")
        
        request.status = 'accepted' if accept else 'rejected'
        request.save()
        
        friendship = None
        if accept:
            friendship = Friend.objects.create(user=request.sender, friend=request.receiver)
            Friend.objects.get_or_create(user=request.receiver, friend=request.sender)
        
        return cls(request=request, friendship=friendship)

class RemoveFriend(relay.ClientIDMutation):
    class Input:
        friend_id = ID(required=True)
    
    success = Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, friend_id):
        friend = relay.Node.get_node_from_global_id(info, friend_id)
        if not friend:
            raise GraphQLError("User not found")
        
        deleted, _ = Friend.objects.filter(
            models.Q(user=info.context.user, friend=friend) |
            models.Q(user=friend, friend=info.context.user)
        ).delete()
        
        return cls(success=deleted > 0)

class AccountMutations(graphene.ObjectType):
    sign_in = ObtainJSONWebTokenMutation.Field()
    create_user = CreateUser.Field()
    logout = LogoutMutation.Field()
    refresh_token = RefreshMutation.Field()
    revoke_token = RevokeMutation.Field()
    verify_token = VerifyMutation.Field()
    revoke_all_tokens = RevokeAllTokensMutation.Field()
    update_user = UpdateUser.Field()
    create_address = AddressMutation.Field()
    update_user_roles = UpdateUserRoles.Field()
    send_friend_request = SendFriendRequest.Field()
    respond_to_friend_request = RespondToFriendRequest.Field()
    remove_friend = RemoveFriend.Field()