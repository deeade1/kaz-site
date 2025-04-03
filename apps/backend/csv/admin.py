from django.contrib import admin

from .models import ExportEvent, ExportFile


@admin.register(ExportEvent)
class ExportEventAdmin(admin.ModelAdmin):
    model = ExportEvent


@admin.register(ExportFile)
class ExportFileAdmin(admin.ModelAdmin):
    model = ExportFile
