import graphene
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from graphql_jwt.decorators import token_auth
from graphql_jwt.exceptions import JSONWebTokenError, JSONWebTokenExpired

from .bases import Output
from .constants import Messages, TokenAction
from .decorators import password_confirmation_required, verification_required
from .exceptions import EmailAlreadyInUse, InvalidCredentials, UserNotVerified
from .forms import EmailForm, RegisterForm, SetPasswordForm
from .models import UserStatus
from .settings import graphql_auth_settings as app_settings
from .shortcuts import get_user_by_email, get_user_to_login
from .utils import get_token_payload, revoke_user_refresh_token, handle_token_errors, send_email_async

UserModel = get_user_model()


class RegisterMixin(Output):
    """
    Register a new user and optionally send activation or password set emails.
    """

    form = RegisterForm

    @classmethod
    def resolve_mutation(cls, root, info, **kwargs):
        try:
            with transaction.atomic():
                form = cls.form(kwargs)
                if form.is_valid():
                    user = form.save()
                    email = kwargs.get(UserModel.EMAIL_FIELD)

                    if app_settings.SEND_ACTIVATION_EMAIL and email:
                        user.status.send_activation_email(info)

                    if (
                        app_settings.ALLOW_PASSWORDLESS_REGISTRATION
                        and app_settings.SEND_PASSWORD_SET_EMAIL
                        and email
                    ):
                        user.status.send_password_set_email(info)

                    user_registered.send(sender=cls, user=user)

                    if app_settings.ALLOW_LOGIN_NOT_VERIFIED:
                        payload = cls.login_on_register(root, info, **kwargs)
                        return cls(**{field: getattr(payload, field) for field in cls._meta.fields})
                    return cls(success=True)
                return cls(success=False, errors=form.errors.get_json_data())
        except EmailAlreadyInUse:
            return cls(success=False, errors={UserModel.EMAIL_FIELD: Messages.EMAIL_IN_USE})
        except SMTPException:
            return cls(success=False, errors=Messages.EMAIL_FAIL)


class PasswordResetMixin(Output):
    """
    Reset a user's password using a token sent via email.
    """

    form = SetPasswordForm

    @classmethod
    def resolve_mutation(cls, root, info, **kwargs):
        try:
            token = kwargs.pop("token")
            payload = get_token_payload(token, TokenAction.PASSWORD_RESET, app_settings.EXPIRATION_PASSWORD_RESET_TOKEN)
            user = UserModel._default_manager.get(**payload)
            form = cls.form(user, kwargs)
            if form.is_valid():
                revoke_user_refresh_token(user)
                form.save()
                if not user.status.verified:
                    user.status.verified = True
                    user.status.save(update_fields=["verified"])
                return cls(success=True)
            return cls(success=False, errors=form.errors.get_json_data())
        except (SignatureExpired, BadSignature, TokenScopeError):
            return cls(success=False, errors=Messages.INVALID_TOKEN)