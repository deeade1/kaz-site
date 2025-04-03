from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from taxi.models import SharedTrip, Trip, Vehicle


@admin.register(Trip)
class TripAdmin(GISModelAdmin):
    fields = (
        "id",
        "pickup_location",
        "drop_off_location",
        "status",
        "driver",
        "rider",
        "departure_time",
        "date",
        "created",
        "updated",
    )
    list_display = (
        "id",
        "pickup_location",
        "drop_off_location",
        "status",
        "driver",
        "rider",
        "departure_time",
        "date",
        "created",
        "updated",
    )
    list_filter = ("status",)
    readonly_fields = (
        "id",
        "created",
        "updated",
    )


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    model = Vehicle


@admin.register(SharedTrip)
class SharedTripAdmin(admin.ModelAdmin):
    model = SharedTrip
