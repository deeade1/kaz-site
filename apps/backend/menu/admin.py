from django.contrib import admin

from .models import Menu, MenuItem, MenuItemTranslation


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    model = Menu


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    model = MenuItem


@admin.register(MenuItemTranslation)
class MenuItemTranslationAdmin(admin.ModelAdmin):
    model = MenuItemTranslation
