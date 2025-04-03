import os
from pathlib import Path
import datetime
from decouple import config
import logging
import warnings
from pytimeparse2 import parse 
import pkg_resources 
from typing import cast
from django.core.cache import CacheKeyWarning
# Base Directory
BASE_DIR = Path(__file__).resolve().parent.parent

logging.captureWarnings(True)

def get_bool_from_env(name, default_value):
    """Retrieve and convert an environment variable to a boolean object.

    Accepted values are 'true' (case-insensitive) and '1', any other value resolves to 'False'.
    """
    value = os.environ.get(name)
    if value is None:
        return default_value
    return value.lower() in ("true", "1")


# Explicitly set the GDAL path
GDAL_LIBRARY_PATH = "/usr/lib/x86_64-linux-gnu/libgdal.so.32"
# GDAL_LIBRARY_PATH = os.getenv('GDAL_LIBRARY_PATH', '/usr/lib/libgdal.so')


# Security Settings
SECRET_KEY = config(
    "DJANGO_SECRET_KEY",
    cast=str,
    default="django-insecure-#j-(rcm2aso-@_$@vr@qes*okz!kb(+fj%yn+o827^)$a!9ehm",
)

DEBUG = config("DEBUG", cast=bool, default=False)
ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS", cast=lambda v: [s.strip() for s in v.split(",")]
)
# Path to the GDAL library on Linux (inside Docker)

# Application definition

INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.sites",
    "django.contrib.postgres",
    "django.contrib.gis",
    "django.contrib.staticfiles",
    'robots',  # pip install django-robots
    'meta',    # pip install django-meta
    "accounts",
    #'app',
    "attribute",
    "blog",
    "channel",
    "checkout",
    "core",
    "csv",
    "discount",
    "giftcard",
    "invoice",
    "logistics",
    "menu",
    "order",
    "page",
    "payment",
    "plugins",
    "product",
    "realestate",
    "schedulers",
    "seo",
    "shipping",
    "site",
    "tax",
    "taxi",
    "thumbnail",
    "warehouse",
    
    # External apps
    "corsheaders",
    "debug_toolbar",
    "graphene_gis",
    "graphene_django_jwt",
    "graphene_django",
    "django_measurement",
    "django_prices",
    "django_celery_beat",
    "prices",
    "django_prices_openexchangerates",
    "django_prices_vatlayer",
    "mptt",
    "django_countries",
    "django_filters",
    "phonenumber_field",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"
#ASGI_APPLICATION = "backend.application"

# Authentication and Graphene Settings
AUTH_USER_MODEL = "accounts.User"
AUTHENTICATION_BACKENDS = [
    "graphene_django_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]

REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [REDIS_URL],
        },
    },
}
# your_project/settings.py
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

# Database
GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    "SCHEMA_OUTPUT": "backend/schema.graphql",
    "SCHEMA_INDENT": 2,
    "RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST": True,
    "RELAY_CONNECTION_MAX_LIMIT": 100,
    "ATOMIC_MUTATIONS": True,
    "MIDDLEWARE": [
        "graphene_django_jwt.schema.middleware.JSONWebTokenMiddleware",
    ],
}

GRAPHQL_PAGINATION_LIMIT = 100
GRAPHQL_MIDDLEWARE: list[str] = []

# Set GRAPHQL_QUERY_MAX_COMPLEXITY=0 in env to disable (not recommended)
GRAPHQL_QUERY_MAX_COMPLEXITY = int(
    os.environ.get("GRAPHQL_QUERY_MAX_COMPLEXITY", 50000)
)

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8081",
]
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8081",
]

# Database Configuration
POSTGRES_USER = config("POSTGRES_USER")
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD")
POSTGRES_DB = config("POSTGRES_DB")
PGHOST = config("PGHOST")
PGPORT = config("PGPORT", cast=int, default=5432)

if all([POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, PGHOST]):
    print("Using PostgreSQL")
    DATABASES = {
        "default": {
            "ENGINE": "django.contrib.gis.db.backends.postgis",
            "NAME": POSTGRES_DB,
            "USER": POSTGRES_USER,
            "PASSWORD": POSTGRES_PASSWORD,
            "HOST": PGHOST,
            "PORT": PGPORT,
        }
    }
else:
    raise ValueError(
        "Database configuration is incomplete. Please check your environment variables."
    )


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

# Static and Media Files
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


INTERNAL_IPS = [
    "127.0.0.1",
    "localhost",
]

# Logging Configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "django.log",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
        "django.db.backends": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}

DEFAULT_COUNTRY = os.environ.get("DEFAULT_COUNTRY", "US")
DEFAULT_DECIMAL_PLACES = 3
DEFAULT_MAX_DIGITS = 12
DEFAULT_CURRENCY_CODE_LENGTH = 3
COUNTRIES_OVERRIDE = {"EU": "European Union"}
DATABASE_CONNECTION_DEFAULT_NAME = "default"
MAX_USER_ADDRESSES = int(os.environ.get("MAX_USER_ADDRESSES", 100))
ORDER_RULES_LIMIT = os.environ.get("ORDER_RULES_LIMIT", 100)

# The max number of gits assigned to promotion rule
GIFTS_LIMIT_PER_RULE = os.environ.get("GIFTS_LIMIT_PER_RULE", 500)

# Expired checkouts settings - defines after what time checkouts will be deleted
ANONYMOUS_CHECKOUTS_TIMEDELTA = datetime.timedelta(
    seconds=parse(os.environ.get("ANONYMOUS_CHECKOUTS_TIMEDELTA", "30 days"))
)
USER_CHECKOUTS_TIMEDELTA = datetime.timedelta(
    seconds=parse(os.environ.get("USER_CHECKOUTS_TIMEDELTA", "90 days"))
)
EMPTY_CHECKOUTS_TIMEDELTA = datetime.timedelta(
    seconds=parse(os.environ.get("EMPTY_CHECKOUTS_TIMEDELTA", "6 hours"))
)

# Exports settings - defines after what time exported files will be deleted
EXPORT_FILES_TIMEDELTA = datetime.timedelta(
    seconds=parse(os.environ.get("EXPORT_FILES_TIMEDELTA", "30 days"))
)

# Slugs for menus precreated in Django migrations
DEFAULT_MENUS = {"top_menu_name": "navbar", "bottom_menu_name": "footer"}

# Slug for channel precreated in Django migrations
DEFAULT_CHANNEL_SLUG = os.environ.get("DEFAULT_CHANNEL_SLUG", "default-channel")

# Set this to `True` if you want to create default channel, warehouse, product type and
# category during migrations. It makes it easier for the users to create their first
# product.
POPULATE_DEFAULTS = get_bool_from_env("POPULATE_DEFAULTS", True)

BUILTIN_PLUGINS = [
    "plugins.avatax.plugin.AvataxPlugin",
    #"plugins.webhook.plugin.WebhookPlugin",
    "payment.gateways.dummy.plugin.DummyGatewayPlugin",
    "payment.gateways.dummy_credit_card.plugin.DummyCreditCardGatewayPlugin",
    "payment.gateways.stripe.deprecated.plugin.DeprecatedStripeGatewayPlugin",
    "payment.gateways.stripe.plugin.StripeGatewayPlugin",
    "payment.gateways.braintree.plugin.BraintreeGatewayPlugin",
    "payment.gateways.razorpay.plugin.RazorpayGatewayPlugin",
    "payment.gateways.adyen.plugin.AdyenGatewayPlugin",
    "payment.gateways.authorize_net.plugin.AuthorizeNetGatewayPlugin",
    "payment.gateways.np_atobarai.plugin.NPAtobaraiGatewayPlugin",
    "plugins.user_email.plugin.UserEmailPlugin",
    "plugins.admin_email.plugin.AdminEmailPlugin",
    "plugins.sendgrid.plugin.SendgridEmailPlugin",
    "plugins.openid_connect.plugin.OpenIDConnectPlugin",
]

# Plugin discovery
EXTERNAL_PLUGINS = []
installed_plugins = pkg_resources.iter_entry_points("plugins")
for entry_point in installed_plugins:
    plugin_path = f"{entry_point.module_name}.{entry_point.attrs[0]}"
    if plugin_path not in BUILTIN_PLUGINS and plugin_path not in EXTERNAL_PLUGINS:
        if entry_point.name not in INSTALLED_APPS:
            INSTALLED_APPS.append(entry_point.name)
        EXTERNAL_PLUGINS.append(plugin_path)

PLUGINS = BUILTIN_PLUGINS + EXTERNAL_PLUGINS

CHECKOUT_PRICES_TTL = datetime.timedelta(
    seconds=parse(os.environ.get("CHECKOUT_PRICES_TTL", "1 hour"))
)

CHECKOUT_TTL_BEFORE_RELEASING_FUNDS = datetime.timedelta(
    seconds=parse(os.environ.get("CHECKOUT_TTL_BEFORE_RELEASING_FUNDS", "6 hours"))
)
CHECKOUT_BATCH_FOR_RELEASING_FUNDS = os.environ.get(
    "CHECKOUT_BATCH_FOR_RELEASING_FUNDS", 30
)
TRANSACTION_BATCH_FOR_RELEASING_FUNDS = os.environ.get(
    "TRANSACTION_BATCH_FOR_RELEASING_FUNDS", 60
)


# The maximum SearchVector expression count allowed per index SQL statement
# If the count is exceeded, the expression list will be truncated
INDEX_MAXIMUM_EXPR_COUNT = 4000

# Maximum related objects that can be indexed in an order
SEARCH_ORDERS_MAX_INDEXED_TRANSACTIONS = 20
SEARCH_ORDERS_MAX_INDEXED_PAYMENTS = 20
SEARCH_ORDERS_MAX_INDEXED_DISCOUNTS = 20
SEARCH_ORDERS_MAX_INDEXED_LINES = 100

# Maximum related objects that can be indexed in a product
PRODUCT_MAX_INDEXED_ATTRIBUTES = 1000
PRODUCT_MAX_INDEXED_ATTRIBUTE_VALUES = 100
PRODUCT_MAX_INDEXED_VARIANTS = 1000
# Queue name for execution of collection product_updated events
COLLECTION_PRODUCT_UPDATED_QUEUE_NAME = os.environ.get(
    "COLLECTION_PRODUCT_UPDATED_QUEUE_NAME", None
)

# Queue name for execution of automatic checkout completion
AUTOMATIC_CHECKOUT_COMPLETION_QUEUE_NAME = os.environ.get(
    "AUTOMATIC_CHECKOUT_COMPLETION_QUEUE_NAME", None
)

# Lock time for request password reset mutation per user (seconds)
RESET_PASSWORD_LOCK_TIME = parse(
    os.environ.get("RESET_PASSWORD_LOCK_TIME", "15 minutes")
)

# Lock time for request confirmation email mutation per user
CONFIRMATION_EMAIL_LOCK_TIME = parse(
    os.environ.get("CONFIRMATION_EMAIL_LOCK_TIME", "15 minutes")
)
# Time threshold to update user last_login when using tokenCreate/tokenRefresh
# mutations.
TOKEN_UPDATE_LAST_LOGIN_THRESHOLD = parse(
    os.environ.get("TOKEN_UPDATE_LAST_LOGIN_THRESHOLD", "5 seconds")
)

# Max lock time for checkout processing.
# It prevents locking checkout when unhandled issue appears.
CHECKOUT_COMPLETION_LOCK_TIME: int = cast(
    int, parse(os.environ.get("CHECKOUT_COMPLETION_LOCK_TIME", "3 minutes"))
)
# The max number of rules with order_predicate defined
ORDER_RULES_LIMIT = os.environ.get("ORDER_RULES_LIMIT", 100)

# The max number of gits assigned to promotion rule
GIFTS_LIMIT_PER_RULE = os.environ.get("GIFTS_LIMIT_PER_RULE", 500)
# Transaction items limit for PaymentGatewayInitialize / TransactionInitialize.
# That setting limits the allowed number of transaction items for single entity.
TRANSACTION_ITEMS_LIMIT = 100


# Disable Django warnings regarding too long cache keys being incompatible with
# memcached to avoid leaking key values.
warnings.filterwarnings("ignore", category=CacheKeyWarning)

STATICFILES_FINDERS += ['compressor.finders.CompressorFinder']




# settings.py additions for SEO
INSTALLED_APPS += [
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'robots',
    'meta',
    'compressor',
]

MIDDLEWARE.insert(2, 'backend.middleware.CrawlerLogMiddleware')

# SEO-specific settings
SITE_ID = 1
SITE_URL = 'https://yourdomain.com'
ROBOTS_SITEMAP_URLS = [f'{SITE_URL}/sitemap.xml']

# Cache settings for SEO content
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'TIMEOUT': 60 * 15,  # 15 minutes
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}