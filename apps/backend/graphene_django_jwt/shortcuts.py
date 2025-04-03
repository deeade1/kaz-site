from django.contrib.auth import get_user_model

from graphene_django_jwt.exceptions import JSONRefreshTokenExpired
from graphene_django_jwt.utils import get_payload, jwt_encode, jwt_payload


UserModel = get_user_model()


def get_token(user, **extra):
    """Generate JWT token."""
    payload = jwt_payload(user)
    payload.update(extra)
    return jwt_encode(payload)


def get_user_by_token(token):
    """Get user from token."""
    payload = get_payload(token)
    email = payload.get("email")
    phone_number = payload.get("phone_number")

    filters = {}
    if email:
        filters["email"] = email
    elif phone_number:
        filters["phone_number"] = phone_number

    return UserModel.objects.filter(**filters).first() if filters else None


def get_refresh_token(token):
    """Get refresh token object or raise."""
    from .models import RefreshToken

    try:
        return RefreshToken.objects.get(token=token, revoked__isnull=True)
    except RefreshToken.DoesNotExist:
        raise JSONRefreshTokenExpired
