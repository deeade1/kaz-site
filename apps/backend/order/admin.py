from django.contrib import admin

from .models import (
    Fulfillment,
    FulfillmentLine,
    Order,
    OrderEvent,
    OrderGrantedRefund,
    OrderLine,
)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    model = Order


@admin.register(OrderLine)
class OrderLineAdmin(admin.ModelAdmin):
    model = OrderLine


@admin.register(Fulfillment)
class FulfillmentAdmin(admin.ModelAdmin):
    model = Fulfillment


@admin.register(FulfillmentLine)
class FulfillmentLineAdmin(admin.ModelAdmin):
    model = FulfillmentLine


@admin.register(OrderEvent)
class OrderEventAdmin(admin.ModelAdmin):
    model = OrderEvent


@admin.register(OrderGrantedRefund)
class OrderGrantedRefundAdmin(admin.ModelAdmin):
    model = OrderGrantedRefund
