from django.contrib import admin

from .models import (
    BaseDiscount,
    CheckoutDiscount,
    CheckoutLineDiscount,
    OrderDiscount,
    Promotion,
    PromotionEvent,
    PromotionRule,
    PromotionRule_Variants,
    PromotionRuleTranslation,
    PromotionTranslation,
    Voucher,
    VoucherChannelListing,
    VoucherCode,
    VoucherCustomer,
    VoucherTranslation,
)


@admin.register(Voucher)
class VoucherAdmin(admin.ModelAdmin):
    model = Voucher


@admin.register(VoucherChannelListing)
class VoucherChannelListingAdmin(admin.ModelAdmin):
    model = VoucherChannelListing


@admin.register(VoucherCustomer)
class VoucherCustomerAdmin(admin.ModelAdmin):
    model = VoucherCustomer


@admin.register(VoucherCode)
class VoucherCodeAdmin(admin.ModelAdmin):
    model = VoucherCode


@admin.register(VoucherTranslation)
class VoucherTranslationAdmin(admin.ModelAdmin):
    model = VoucherTranslation


@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    model = Promotion


@admin.register(PromotionTranslation)
class PromotionTranslationAdmin(admin.ModelAdmin):
    model = PromotionTranslation


@admin.register(PromotionRule)
class PromotionRuleAdmin(admin.ModelAdmin):
    model = PromotionRule


@admin.register(PromotionRule_Variants)
class PromotionRule_VariantsAdmin(admin.ModelAdmin):
    model = PromotionRule_Variants


@admin.register(PromotionRuleTranslation)
class PromotionRuleTranslationAdmin(admin.ModelAdmin):
    model = PromotionRuleTranslation


@admin.register(OrderDiscount)
class OrderDiscountAdmin(admin.ModelAdmin):
    model = OrderDiscount


@admin.register(CheckoutDiscount)
class CheckoutDiscountAdmin(admin.ModelAdmin):
    model = CheckoutDiscount


@admin.register(CheckoutLineDiscount)
class CheckoutLineDiscountAdmin(admin.ModelAdmin):
    model = CheckoutLineDiscount


@admin.register(PromotionEvent)
class PromotionEventAdmin(admin.ModelAdmin):
    model = PromotionEvent
