from django.utils.translation import gettext_lazy as _


# Base Exception for GraphQL Auth Errors
class GraphQLAuthError(Exception):
    default_message = _("An authentication error occurred.")

    def __init__(self, message=None):
        super().__init__(message or self.default_message)


# Specific Auth Exceptions
class UserAlreadyVerified(GraphQLAuthError):
    default_message = _("User already verified.")


class InvalidCredentials(GraphQLAuthError):
    default_message = _("Invalid credentials.")


class UserNotVerified(GraphQLAuthError):
    default_message = _("User is not verified.")


class EmailAlreadyInUse(GraphQLAuthError):
    default_message = _("This email is already in use.")


class TokenScopeError(GraphQLAuthError):
    default_message = _("This token is for something else.")


class PasswordAlreadySetError(GraphQLAuthError):
    default_message = _("Password already set for account.")


class WrongUsage(GraphQLAuthError):
    default_message = _("Wrong usage, check your code!")  # Removed unnecessary docstring


# Base Exception for JWT Errors
class GrapheneDjangoJWTBaseException(Exception):
    default_message = _("You do not have permission to perform this action.")
    code = 401

    def __init__(self, message=None, code=None):
        self.code = code or self.code
        super().__init__(message or self.default_message)


# Specific JWT Exceptions
class JSONWebTokenError(GrapheneDjangoJWTBaseException):
    pass


class PermissionDenied(GrapheneDjangoJWTBaseException):
    pass


class JSONWebTokenExpired(GrapheneDjangoJWTBaseException):
    default_message = _("Signature has expired.")


class JSONRefreshTokenExpired(GrapheneDjangoJWTBaseException):
    default_message = _("Refresh token has expired.")
