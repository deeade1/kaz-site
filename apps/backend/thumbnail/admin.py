from django.contrib import admin

from .models import Thumbnail


@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    model = Thumbnail
