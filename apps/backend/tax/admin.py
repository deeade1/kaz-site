from django.contrib import admin

from .models import (
    TaxClass,
    TaxClassCountryRate,
    TaxConfiguration,
    TaxConfigurationPerCountry,
)


@admin.register(TaxClass)
class TaxClassAdmin(admin.ModelAdmin):
    model = TaxClass


@admin.register(TaxClassCountryRate)
class TaxClassCountryRatessAdmin(admin.ModelAdmin):
    model = TaxClassCountryRate


@admin.register(TaxConfiguration)
class TaxConfigurationAdmin(admin.ModelAdmin):
    model = TaxConfiguration


@admin.register(TaxConfigurationPerCountry)
class TaxConfigurationPerCountryAdmin(admin.ModelAdmin):
    model = TaxConfigurationPerCountry
