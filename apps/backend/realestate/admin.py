from django.conf import settings
from django.contrib import admin
from django.contrib.admin.widgets import AdminFileWidget
from django.contrib.gis.admin import GISModelAdmin
from django.db import models
from django.forms import ClearableFileInput
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.indexes import GinIndex, BTreeIndex
from mptt.admin import MPTTModelAdmin

from .models import Listing, ListingFile, ListingImage, ListingType, ListingCategory


# Custom admin actions
def set_online(modeladmin, request, queryset):
    queryset.update(is_published=True)


def set_offline(modeladmin, request, queryset):
    queryset.update(is_published=False)


# Inline admin for ListingImage
class ListingImageInline(admin.StackedInline):
    model = ListingImage
    formfield_overrides = {models.ImageField: {"widget": ClearableFileInput}}
    extra = 1  # Number of empty forms to display


# Admin for ListingImage
@admin.register(ListingImage)
class ListingImageAdmin(admin.ModelAdmin):
    list_display = ("listing", "get_image", "short_description", "created")
    list_filter = ("listing",)
    search_fields = ("listing__title", "short_description")
    readonly_fields = ("get_image", "headshot_image")

    def get_image(self, obj):
        return obj.get_image()

    get_image.short_description = _("Image")

    def headshot_image(self, obj):
        return obj.headshot_image()

    headshot_image.short_description = _("Preview")
    headshot_image.allow_tags = True

    fieldsets = (
        (None, {"fields": ("listing", "image", "short_description")}),
        (_("Preview"), {"fields": ("get_image", "headshot_image")}),
    )

    def has_add_permission(self, request, obj=None):
        return False


# Admin for Listing
@admin.register(Listing)
class ListingAdmin(GISModelAdmin):
    list_display = (
        "agent",
        "owner",
        "address",
        "listing_type",
        "property_for",
        "price",
        "property_status",
    )
    list_filter = (
        "listing_type",
        "property_for",
        "property_status",
    )
    search_fields = (
        "description",
        "address__street",
        "address__city",
        "address__state",
        "address__country",
    )
    readonly_fields = (
        "created",
        "updated",
        "coordinates",
        "price_with_currency",
        "sqft_formatted",
        "ceiling_height_formatted",
        "total_rooms",
        "free_date",
    )
    inlines = [ListingImageInline]  # Add inline for ListingImage

    def num_images(self, obj):
        return obj.images.count()

    num_images.short_description = "Number of Images"

    fieldsets = (
        (None, {"fields": ("description", "address", "listing_type")}),
        (
            "Property Details",
            {
                "fields": (
                    "property_for",
                    "price",
                    "bedrooms",
                    "bathrooms",
                    "garage",
                    "square_feet",
                    "lot_size",
                    "ceiling_height",
                    "year_built",
                )
            },
        ),
        (
            "Status and Publication",
            {"fields": ("property_status", "free_from", "agent", "reviewer")},
        ),
        ("Images and Files", {"fields": ("image", "num_images", "num_files")}),
        (
            "Read-Only Fields",
            {
                "fields": (
                    "created",
                    "updated",
                    "coordinates",
                    "price_with_currency",
                    "sqft_formatted",
                    "ceiling_height_formatted",
                    "total_rooms",
                    "free_date",
                )
            },
        ),
    )


# Admin for ListingType
@admin.register(ListingType)
class ListingTypeAdmin(admin.ModelAdmin):
    list_display = ("property_type", "created", "updated")
    search_fields = ("property_type",)
    ordering = ("created",)


# Admin for ListingCategory
@admin.register(ListingCategory)
class ListingCategoryAdmin(MPTTModelAdmin):
    list_display = ("name", "slug", "updated_at", "parent")
    search_fields = ("name", "slug", "description_plaintext")
    list_filter = ("updated_at", "parent")
    ordering = ("name",)
    prepopulated_fields = {"slug": ("name",)}

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related("parent")

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if obj:  # Editing an existing object
            fields.remove("parent")  # Prevent changing the parent after creation
        return fields


# Admin for ListingFile
@admin.register(ListingFile)
class ListingFileAdmin(admin.ModelAdmin):
    search_fields = [
        "listing__title",
        "listing__agent__first_name",
        "listing__agent__last_name",
    ]
    autocomplete_fields = ["listing"]
    readonly_fields = ("updated", "created")
    list_display = ("listing", "name", "short_description", "for_customer", "created")

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related("listing")

    def get_listing_title(self, obj):
        return obj.listing.title

    get_listing_title.short_description = _("Listing")
    get_listing_title.admin_order_field = "listing__title"

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser