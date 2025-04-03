from django.contrib import admin

from .models import (
    Category,
    CategoryTranslation,
    Collection,
    CollectionChannelListing,
    CollectionProduct,
    CollectionTranslation,
    DigitalContent,
    DigitalContentUrl,
    Product,
    ProductChannelListing,
    ProductMedia,
    ProductTranslation,
    ProductType,
    ProductVariant,
    ProductVariantChannelListing,
    ProductVariantTranslation,
    VariantMedia,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    model = Category


@admin.register(CategoryTranslation)
class CategoryTranslationAdmin(admin.ModelAdmin):
    model = CategoryTranslation


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    model = ProductType


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(ProductTranslation)
class ProductTranslationAdmin(admin.ModelAdmin):
    model = ProductTranslation


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    model = ProductVariant


@admin.register(ProductVariantTranslation)
class ProductVariantTranslationAdmin(admin.ModelAdmin):
    model = ProductVariantTranslation


@admin.register(ProductVariantChannelListing)
class ProductVariantChannelListingAdmin(admin.ModelAdmin):
    model = ProductVariantChannelListing


@admin.register(DigitalContent)
class DigitalContentAdmin(admin.ModelAdmin):
    model = DigitalContent


@admin.register(DigitalContentUrl)
class DigitalContentUrlAdmin(admin.ModelAdmin):
    model = DigitalContentUrl


@admin.register(ProductMedia)
class ProductMediaAdmin(admin.ModelAdmin):
    model = ProductMedia


@admin.register(VariantMedia)
class VariantMediaAdmin(admin.ModelAdmin):
    model = VariantMedia


@admin.register(CollectionProduct)
class CollectionProductAdmin(admin.ModelAdmin):
    model = CollectionProduct


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    model = Collection


@admin.register(CollectionChannelListing)
class CollectionChannelListingAdmin(admin.ModelAdmin):
    model = CollectionChannelListing


@admin.register(CollectionTranslation)
class CollectionTranslationAdmin(admin.ModelAdmin):
    model = CollectionTranslation
