from django.contrib import admin

from .models import SiteSettings, SiteSettingsTranslation


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    model = SiteSettings


min.register(SiteSettingsTranslation)


class SiteSettingsTranslationAdmin(admin.ModelAdmin):
    model = SiteSettingsTranslation
