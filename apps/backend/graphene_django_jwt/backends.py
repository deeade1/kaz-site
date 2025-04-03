from django.contrib.auth import get_user_model
from django.db.models import Q

from .shortcuts import get_user_by_token
from .utils import get_credentials, get_payload

UserModel = get_user_model()


class JSONWebTokenBackend:
    """
    Custom Django authentication backend for JWT.
    """

    def authenticate(self, request=None, **kwargs):
        if request is None or getattr(request, "_jwt_token_auth", False):
            return None

        token = get_credentials(request)

        if token:
            payload = get_payload(token)
            user = self._get_user_from_payload(payload)
            return user

        return None

    def _get_user_from_payload(self, payload):
        email_or_phone = payload.get("email") or payload.get("phoneNumber")
        if not email_or_phone:
            return None

        return UserModel.objects.filter(
            Q(email=email_or_phone) | Q(phoneNumber=email_or_phone)
        ).first()

    def get_user(self, user_id):
        try:
            return UserModel._default_manager.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
