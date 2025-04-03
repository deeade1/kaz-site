from django.contrib import admin

from .models import (
    Allocation,
    ChannelWarehouse,
    PreorderAllocation,
    PreorderReservation,
    Reservation,
    Stock,
    Warehouse,
)


@admin.register(ChannelWarehouse)
class ChannelWarehouseAdmin(admin.ModelAdmin):
    model = ChannelWarehouse


@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    model = Warehouse


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    model = Stock


@admin.register(Allocation)
class AllocationAdmin(admin.ModelAdmin):
    model = Allocation


@admin.register(PreorderAllocation)
class PreorderAllocationAdmin(admin.ModelAdmin):
    model = PreorderAllocation


@admin.register(PreorderReservation)
class PreorderReservationAdmin(admin.ModelAdmin):
    model = PreorderReservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    model = Reservation
