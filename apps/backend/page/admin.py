from django.contrib import admin

from .models import Page, PageTranslation, PageType


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    model = Page


@admin.register(PageTranslation)
class PageTranslationAdmin(admin.ModelAdmin):
    model = PageTranslation


@admin.register(PageType)
class PageTypeAdmin(admin.ModelAdmin):
    model = PageType
