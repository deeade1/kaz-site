from calendar import timegm
from datetime import datetime

import jwt
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from graphene_django_jwt.exceptions import (
    JSONWebTokenError,
    JSONWebTokenExpired,
    JSONRefreshTokenExpired,
)
from graphene_django_jwt.settings import jwt_settings

from django.core.exceptions import ValidationError
from graphql import GraphQLError
from .constants import Messages
from .settings import graphql_auth_settings as app_settings

# Check if async_email_func is configured
async_email_func = None
if app_settings.EMAIL_ASYNC_TASK and isinstance(app_settings.EMAIL_ASYNC_TASK, str):
    from django.utils.module_loading import import_string
    async_email_func = import_string(app_settings.EMAIL_ASYNC_TASK)


def send_email_async(user, email_method, *args):
    """
    Send an email asynchronously if async_email_func is configured.
    Otherwise, send the email synchronously.
    """
    if async_email_func:
        async_email_func(getattr(user.status, email_method), args)
    else:
        getattr(user.status, email_method)(*args)


def handle_token_errors(func):
    """
    Decorator to handle common token-related errors.
    """
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except (ValidationError, GraphQLError) as e:
            return Output(success=False, errors=str(e))
        except (SignatureExpired, BadSignature, TokenScopeError):
            return Output(success=False, errors=Messages.INVALID_TOKEN)
    return wrapper


def jwt_payload(user, **kwargs):
    """Create JWT payload with standard claims."""
    return {
        "id": str(user.id),
        "exp": datetime.utcnow() + jwt_settings.GRAPHENE_DJANGO_JWT_EXPIRATION_DELTA,
        "origIat": timegm(datetime.utcnow().utctimetuple()),
        **kwargs,
    }


def jwt_encode(payload):
    """Encode the payload into a JWT token."""
    return jwt.encode(
        payload,
        jwt_settings.GRAPHENE_DJANGO_JWT_SECRET_KEY,
        jwt_settings.GRAPHENE_DJANGO_JWT_ALGORITHM,
    )


def jwt_decode(token):
    """Decode and verify JWT token."""
    return jwt.decode(
        token,
        jwt_settings.GRAPHENE_DJANGO_JWT_SECRET_KEY,
        algorithms=[jwt_settings.GRAPHENE_DJANGO_JWT_ALGORITHM],
        options={"verify_exp": True},
    )


def get_authorization_header(request):
    """Extract token from Authorization header."""
    auth = request.META.get(
        jwt_settings.GRAPHENE_DJANGO_JWT_AUTH_HEADER_NAME, ""
    ).split()
    prefix = jwt_settings.GRAPHENE_DJANGO_JWT_AUTH_HEADER_PREFIX

    if len(auth) != 2 or auth[0].lower() != prefix.lower():
        return None
    return auth[1]


def get_credentials(request):
    """Get token credentials from request."""
    return get_authorization_header(request)


def get_payload(token):
    """Decode token and handle exceptions."""
    try:
        return jwt_decode(token)
    except jwt.ExpiredSignatureError:
        raise JSONWebTokenExpired()
    except jwt.DecodeError:
        raise JSONWebTokenError(_("Error decoding signature"))
    except jwt.InvalidTokenError:
        raise JSONWebTokenError(_("Invalid token"))


def get_user_by_payload(payload):
    """Get user object from JWT payload."""
    user_id = payload.get("id")
    if not user_id:
        raise JSONWebTokenError(_("Invalid JWT Payload"))

    user = get_user_model().objects.filter(id=user_id).first()
    if user and not user.is_active:
        raise JSONWebTokenError(_("User is disabled"))
    return user


def refresh_has_expired(orig_iat):
    """Check if refresh token has expired."""
    now = timegm(datetime.utcnow().utctimetuple())
    expires = orig_iat + jwt_settings.GRAPHENE_DJANGO_JWT_REFRESH_EXPIRATION_DELTA.total_seconds()
    return now > expires


def create_refresh_token(user):
    """Create refresh token instance."""
    from graphene_django_jwt.models import RefreshToken

    return RefreshToken.objects.create(user=user)
