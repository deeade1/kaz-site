from functools import wraps
from typing import Any, Callable, List, Union

from graphql.execution.execute import GraphQLResolveInfo

from graphene_django_jwt.exceptions import PermissionDenied
from .constants import Messages
from .exceptions import WrongUsage


def context(f: Callable) -> Callable:
    """
    Decorator to inject `info.context` into a resolver function.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        info = next((arg for arg in args if isinstance(arg, GraphQLResolveInfo)), None)
        if info is None:
            raise ValueError("GraphQLResolveInfo argument not found.")
        return f(info.context, *args, **kwargs)

    return wrapper


def user_passes_test(test_func: Callable[[Any], bool]) -> Callable:
    """
    Decorator to check if a user passes a specific test function.
    Raises PermissionDenied if the test fails.
    """

    def decorator(f: Callable) -> Callable:
        @wraps(f)
        @context
        def wrapper(context, *args, **kwargs):
            if test_func(context.user):
                return f(*args, **kwargs)
            raise PermissionDenied(Messages.UNAUTHORIZED)
        return wrapper

    return decorator


login_required = user_passes_test(lambda u: u.is_authenticated)
staff_member_required = user_passes_test(lambda u: u.is_active and u.is_staff)
superuser_required = user_passes_test(lambda u: u.is_active and u.is_superuser)


def permission_required(perm: Union[str, List[str]]) -> Callable:
    """
    Decorator to check if the user has required permissions.
    Accepts a single permission or a list of permissions.
    """

    def check_perms(user):
        perms = (perm,) if isinstance(perm, str) else perm
        return user.has_perms(perms)

    return user_passes_test(check_perms)


def authenticated_required(fn: Callable) -> Callable:
    """
    Ensures the user is authenticated before resolving the function.
    """

    @wraps(fn)
    def wrapper(cls: Any, root: Any, info: GraphQLResolveInfo, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            return cls(success=False, errors=Messages.UNAUTHENTICATED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def verification_required(fn: Callable) -> Callable:
    """
    Ensures the user is verified before resolving the function.
    """

    @wraps(fn)
    @authenticated_required
    def wrapper(cls: Any, root: Any, info: GraphQLResolveInfo, **kwargs):
        user = info.context.user
        if not getattr(user.status, "verified", False):
            return cls(success=False, errors=Messages.NOT_VERIFIED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def secondary_email_required(fn: Callable) -> Callable:
    """
    Ensures the user has a secondary email before resolving the function.
    """

    @wraps(fn)
    @verification_required
    def wrapper(cls: Any, root: Any, info: GraphQLResolveInfo, **kwargs):
        user = info.context.user
        if not getattr(user.status, "secondary_email", None):
            return cls(success=False, errors=Messages.SECONDARY_EMAIL_REQUIRED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def password_confirmation_required(fn: Callable) -> Callable:
    """
    Ensures the user provides password confirmation for critical operations.
    """

    @wraps(fn)
    @authenticated_required
    def wrapper(cls: Any, root: Any, info: GraphQLResolveInfo, **kwargs):
        user = info.context.user
        password = kwargs.get("password_confirmation")

        if not password:
            return cls(success=False, errors=Messages.PASSWORD_CONFIRMATION_REQUIRED)
        if not user.check_password(password):
            return cls(success=False, errors=Messages.INVALID_PASSWORD)
        return fn(cls, root, info, **kwargs)

    return wrapper


def password_match_required(fn: Callable) -> Callable:
    """
    Ensures the provided password matches user's password.
    Meant for mutations with 'password' or 'old_password' field.
    """

    @wraps(fn)
    @authenticated_required
    def wrapper(cls: Any, root: Any, info: GraphQLResolveInfo, **kwargs):
        user = info.context.user
        try:
            field_name = next(
                key for key in kwargs if key in ("password", "old_password")
            )
            password = kwargs[field_name]
        except StopIteration:
            raise WrongUsage(
                "@password_match_required should be used on mutations "
                "with 'password' or 'old_password' field."
            )

        if not user.check_password(password):
            return cls(success=False, errors={field_name: Messages.INVALID_PASSWORD})
        return fn(cls, root, info, **kwargs)

    return wrapper
