"""from typing import Optional

from django.http import HttpRequest

AUTH_HEADER = "HTTP_AUTHORIZATION_BEARER"
DEFAULT_AUTH_HEADER = "HTTP_AUTHORIZATION"
AUTH_HEADER_PREFIXES = ["JWT", "BEARER"]


def get_token_from_request(request: HttpRequest) -> Optional[str]:
    auth_token: Optional[str] = request.META.get(AUTH_HEADER)

    if not auth_token:
        auth = request.META.get(DEFAULT_AUTH_HEADER, "").split(maxsplit=1)

        if len(auth) == 2 and auth[0].upper() in AUTH_HEADER_PREFIXES:
            auth_token = auth[1]
    return auth_token"""
