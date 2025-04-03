from django.contrib import admin

from attribute.models import (
     Attribute,
    AttributeTranslation,
    AttributeValue,
    AttributeValueTranslation,
    AssignedProductAttributeValue, 
    AttributeProduct,
    AssignedVariantAttribute,
    AssignedVariantAttributeValue,
    AttributeVariant,
    AssignedPageAttributeValue,
    AttributePage
)


@admin.register(AttributeValueTranslation)
class AttributeValueTranslationAdmin(admin.ModelAdmin):
    model = AttributeValueTranslation


@admin.register(AttributeValue)
class AttributeValueAdmin(admin.ModelAdmin):
    model = AttributeValue


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    model = Attribute


@admin.register(AttributeTranslation)
class AttributeTranslationAdmin(admin.ModelAdmin):
    model = AttributeTranslation


@admin.register(AssignedPageAttributeValue)
class AssignedPageAttributeValueAdmin(admin.ModelAdmin):
    model = AssignedPageAttributeValue


@admin.register(AttributePage)
class AttributePageAdmin(admin.ModelAdmin):
    model = AttributePage


@admin.register(AssignedVariantAttributeValue)
class AssignedVariantAttributeValueAdmin(admin.ModelAdmin):
    model = AssignedVariantAttributeValue


@admin.register(AttributeVariant)
class AttributeVariantAdmin(admin.ModelAdmin):
    model = AttributeVariant


@admin.register(AssignedVariantAttribute)
class AssignedVariantAttributeAdmin(admin.ModelAdmin):
    model = AssignedVariantAttribute


@admin.register(AssignedProductAttributeValue)
class AssignedProductAttributeValueAdmin(admin.ModelAdmin):
    model = AssignedProductAttributeValue


@admin.register(AttributeProduct)
class AttributeProductAdmin(admin.ModelAdmin):
    model = AttributeProduct
