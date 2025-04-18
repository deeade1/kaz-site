import logging
import traceback
from contextlib import contextmanager

from django.conf import settings
from django.db import connections
from django.db.backends.base.base import BaseDatabaseWrapper

logger = logging.getLogger(__name__)

# Default database alias
default_db_alias = "default"

# Limit the number of frames in the traceback in `log_writer_usage_middleware` to avoid
# excessive log size.
TRACEBACK_LIMIT = 20

UNSAFE_WRITER_ACCESS_MSG = (
    "Unsafe access to the writer DB detected. Call `using()` on the `QuerySet` "
    "to utilize a replica DB, or employ the `allow_writer` context manager to "
    "explicitly permit access to the writer."
)


class UnsafeWriterAccessError(Exception):
    pass


@contextmanager
def allow_writer():
    """Context manager that allows write access to the default database connection.

    This context manager works in conjunction with the `restrict_writer_middleware` and
    `log_writer_usage_middleware` middlewares. If any of these middlewares are enabled,
    use the `allow_writer` context manager to allow write access to the default
    database. Otherwise an error will be raised or a log message will be emitted.
    """

    default_connection = connections[default_db_alias]

    # Check if we are already in an allow_writer block. If so, we don't need to do
    # anything and we don't have to close access to the writer at the end.
    in_allow_writer_block = getattr(default_connection, "_allow_writer", False)
    if not in_allow_writer_block:
        setattr(default_connection, "_allow_writer", True)
    try:
        yield
    finally:
        if not in_allow_writer_block:
            # Close writer access when exiting the outermost allow_writer block.
            setattr(default_connection, "_allow_writer", False)


def restrict_writer_middleware(get_response):
    """Middleware that restricts write access to the default database connection.

    This middleware will raise an error if a write operation is attempted on the default
    database connection. To allow writes, use the `allow_writer` context manager. Make
    sure that writer is not used accidentally and always use the `using` queryset method
    with proper database connection name.
    """

    def middleware(request):
        with connections[default_db_alias].execute_wrapper(restrict_writer):
            return get_response(request)

    return middleware


def restrict_writer(execute, sql, params, many, context):
    conn: BaseDatabaseWrapper = context["connection"]
    allow_writer = getattr(conn, "_allow_writer", False)
    if conn.alias == default_db_alias and not allow_writer:
        raise UnsafeWriterAccessError(f"{UNSAFE_WRITER_ACCESS_MSG} SQL: {sql}")
    return execute(sql, params, many, context)


def log_writer_usage_middleware(get_response):
    """Middleware that logs write access to the default database connection.

    This is similar to the `restrict_writer_middleware` middleware, but instead of
    raising an error, it logs a message when a write operation is attempted on the
    default database connection.
    """

    def middleware(request):
        with connections[default_db_alias].execute_wrapper(log_writer_usage):
            return get_response(request)

    return middleware


def log_writer_usage(execute, sql, params, many, context):
    conn: BaseDatabaseWrapper = context["connection"]
    allow_writer = getattr(conn, "_allow_writer", False)
    if conn.alias == default_db_alias and not allow_writer:
        stack_trace = traceback.extract_stack(limit=TRACEBACK_LIMIT)
        error_msg = f"NOTICE: {UNSAFE_WRITER_ACCESS_MSG}"
        log_msg = (
            f"{error_msg} SQL: {sql} \n"
            f"Traceback: \n{''.join(traceback.format_list(stack_trace))}"
        )
        logger.warning(log_msg)
    return execute(sql, params, many, context)
