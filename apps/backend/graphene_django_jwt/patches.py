import json
import logging
import traceback

from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from graphene_django.views import GraphQLView
from graphql.error import GraphQLError, GraphQLSyntaxError
from graphene_django_jwt.exceptions import GrapheneDjangoJWTBaseException

logger = logging.getLogger("api.patches")


class BaseException(Exception):
    default_message = _("A server error occurred. A bug report was created.")
    code = 500


def format_internal_error(error, code=None):
    """
    Format errors consistently for GraphQL responses.
    """
    message = str(error) or getattr(error, "default_message", "")
    ret = {
        "message": message,
        "payload": getattr(error, "payload", None),
        "code": code or getattr(error, "code", 500),
    }
    if settings.DEBUG:
        ret["exception"] = type(error).__name__
        ret["trace"] = traceback.format_list(traceback.extract_tb(error.__traceback__))

    logger.info(json.dumps(ret, indent=2))
    return ret


class PatchedGraphQLView(GraphQLView):
    """
    Customized GraphQL view with better error handling.
    """

    @staticmethod
    def format_error(original_error):
        error = getattr(original_error, "original_error", original_error)

        # sentry_sdk.capture_exception(original_error)  # Uncomment if using Sentry

        if isinstance(original_error, (GraphQLError,)):
            if isinstance(error, ValidationError):
                return format_internal_error(error, code=400)
            if isinstance(error, GrapheneDjangoJWTBaseException):
                return format_internal_error(error)
            if settings.DEBUG:
                return format_internal_error(error)
            return format_internal_error(BaseException())

        if isinstance(error, GraphQLSyntaxError):
            return format_internal_error(error, code=400)

        # For all other cases
        if settings.DEBUG:
            return format_internal_error(error)
        return format_internal_error(BaseException())

    def execute_graphql_request(
        self, request, data, query, variables, operation_name, show_graphiql=False
    ):
        logger.info(f"OPERATION: {operation_name}")
        return super().execute_graphql_request(
            request,
            data,
            query,
            variables,
            operation_name,
            show_graphiql=show_graphiql,
        )
