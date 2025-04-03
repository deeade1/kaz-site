from django.contrib import admin

from .models import (
    ShippingMethod,
    ShippingMethodChannelListing,
    ShippingMethodPostalCodeRule,
    ShippingMethodTranslation,
    ShippingZone,
)


@admin.register(ShippingZone)
class SeoModelAdmin(admin.ModelAdmin):
    model = ShippingZone


@admin.register(ShippingMethod)
class ShippingMethodAdmin(admin.ModelAdmin):
    model = ShippingMethod


@admin.register(ShippingMethodPostalCodeRule)
class ShippingMethodPostalCodeRuleAdmin(admin.ModelAdmin):
    model = ShippingMethodPostalCodeRule


@admin.register(ShippingMethodChannelListing)
class ShippingMethodChannelListingAdmin(admin.ModelAdmin):
    model = ShippingMethodChannelListing


@admin.register(ShippingMethodTranslation)
class ShippingMethodTranslationAdmin(admin.ModelAdmin):
    model = ShippingMethodTranslation
