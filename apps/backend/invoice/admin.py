from django.contrib import admin

from .models import Invoice, InvoiceEvent


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    model = Invoice


@admin.register(InvoiceEvent)
class InvoiceEventAdmin(admin.ModelAdmin):
    model = InvoiceEvent
