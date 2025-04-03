from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from logistics.models import Courier, Dispatch, LogisticsType, Package


@admin.register(Courier)
class CourierAdmin(GISModelAdmin):
    list_display = ("courier", "vehicle", "state", "location")
    list_filter = ("state", "location")


@admin.register(Package)
class PackageAdmin(GISModelAdmin):
    list_display = (
        "receiver_name",
        "pickup_location",
        "delivery_location",
        "state",
        "sender",
        "weight",
        "ref_code",
    )
    list_filter = ("state", "sender")
    readonly_fields = ("ref_code",)


"""@admin.register(Dispatch)
class DispatchAdmin(admin.ModelAdmin):
    list_display = ('courier__first_name', 'package__ref_code', 'state', 'date_created', 'date_updated')
    list_filter = ('courier', 'state')"""


@admin.register(Dispatch)
class DispatchAdmin(admin.ModelAdmin):
    list_display = (
        "get_courier_first_name",
        "get_package_ref_code",
        "state",
        "date_created",
        "date_updated",
    )
    list_filter = ("courier", "state")

    def get_courier_first_name(self, obj):
        return obj.courier.courier.first_name

    def get_package_ref_code(self, obj):
        return obj.package.ref_code

    get_courier_first_name.short_description = "Courier First Name"
    get_package_ref_code.short_description = "Package Reference Code"


admin.site.register(LogisticsType)
