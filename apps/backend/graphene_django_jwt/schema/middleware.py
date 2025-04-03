from django.contrib.auth.models import AnonymousUser

from graphene_django_jwt.blacklist import Blacklist
from graphene_django_jwt.shortcuts import get_user_by_token
from graphene_django_jwt.utils import get_credentials, get_payload


def load_user_from_request(request):
    """
    Extract and validate JWT token from the request.
    Returns the authenticated user or None.
    """
    token = get_credentials(request)
    if not token:
        return None

    try:
        payload = get_payload(token)
        refresh_token = payload.get("refresh_token")
        if refresh_token and Blacklist.is_blacklisted(refresh_token):
            return None

        return get_user_by_token(token)

    except Exception:
        # Silently fail to prevent token errors from crashing app
        return None


class JSONWebTokenMiddleware:
    """
    Middleware to authenticate users via JWT in GraphQL context.
    """

    def __init__(self, *args, **kwargs):
        self._skip = False

    def resolve(self, next, root, info, **kwargs):
        if not self._skip and not info.context.user.is_authenticated:
            user = load_user_from_request(info.context)
            info.context.user = user or AnonymousUser()
            self._skip = True

        return next(root, info, **kwargs)
    
    
# middleware.py
class CrawlerLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        if 'googlebot' in user_agent.lower():
            logger.info(f"Googlebot visited: {request.path}")
        return self.get_response(request)
