from typing import Callable, Optional

from django.apps import AppConfig
from django.conf import settings
from django.db.models import CharField, TextField
from django.utils.module_loading import import_string


class CoreAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
