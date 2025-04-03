from django.contrib import admin

from .models import GiftCard, GiftCardEvent, GiftCardTag


@admin.register(GiftCardTag)
class GiftCardTagAdmin(admin.ModelAdmin):
    model = GiftCardTag


@admin.register(GiftCard)
class GiftCardAdmin(admin.ModelAdmin):
    model = GiftCard


@admin.register(GiftCardEvent)
class GiftCardEventAdmin(admin.ModelAdmin):
    model = GiftCardEvent
