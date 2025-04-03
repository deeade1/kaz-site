import graphene
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query

from graphq.channel.types import ChannelNode
from tax import models
from tax.models import (
    TaxClass,
    TaxClassCountryRate,
    TaxConfiguration,
    TaxConfigurationPerCountry,
)

from .enums import TaxCalculationStrategy


class TaxClassNode(OptimizedDjangoObjectType):
    countries = graphene.List(
        graphene.NonNull(graphene.String),
        description="List of countries with tax rates associated with this tax class.",
    )

    class Meta:
        model = TaxClass
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (graphene.relay.Node,)

    @staticmethod
    def resolve_countries(root, info):
        """Fetch country-specific tax rates for the given tax class instance."""
        return query(
            TaxClassCountryRate.objects.filter(tax_class=root).values_list(
                "country", flat=True
            ),
            info,
        )


class TaxClassCountryRateNode(OptimizedDjangoObjectType):
    country = graphene.Field(
        CountryDisplay,
        required=True,
        description="Country in which this tax rate applies.",
    )
    rate = graphene.Float(
        required=True, description="Tax rate value for the specified country."
    )
    tax_class = graphene.Field(
        TaxClassNode, description="Related tax class, if applicable."
    )

    class Meta:
        model = TaxClassCountryRate
        fields = "__all__"
        filter_fields = {
            "country": ["exact"],
            "rate": ["exact", "gte", "lte"],
            "tax_class": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    @staticmethod
    def resolve_country(root, info):
        """Resolves the country field, displaying code and name."""
        return CountryDisplay(code=root.country.code, name=root.country.name)

    @staticmethod
    def resolve_tax_class(root, info):
        """Fetches the related tax class if applicable."""
        return query(root.tax_class, info)


class TaxConfigurationNode(OptimizedDjangoObjectType):
    channel = graphene.Field(
        "graphql.channel.types.Channel",
        description="The channel to which this tax configuration applies.",
        required=True,
    )
    countries = graphene.List(
        graphene.NonNull(graphene.String),
        description="List of country-specific tax configurations for this channel.",
    )

    class Meta:
        model = TaxConfiguration
        fields = "__all__"
        filter_fields = {
            "channel": ["exact"],
            "charge_taxes": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    @staticmethod
    def resolve_channel(root, info):
        """Resolves the associated channel."""
        return query(root.channel, info)

    @staticmethod
    def resolve_countries(root, info):
        """Fetches the list of country-specific tax configurations."""
        return query(
            TaxConfigurationPerCountry.objects.filter(
                tax_configuration=root
            ).values_list("country", flat=True),
            info,
        )


class TaxConfigurationPerCountryNode(OptimizedDjangoObjectType):
    country = graphene.Field(
        CountryDisplay,
        required=True,
        description="Country for which this tax configuration applies.",
    )
    charge_taxes = graphene.Boolean(
        description="Specifies if taxes are charged for this country.",
        required=True,
    )
    tax_calculation_strategy = graphene.Field(
        TaxCalculationStrategy,
        required=False,
        description="A country-specific tax calculation strategy.",
    )
    display_gross_prices = graphene.Boolean(
        description="Specifies if storefront prices for this country should include taxes.",
        required=True,
    )

    class Meta:
        model = TaxConfigurationPerCountry
        fields = "__all__"
        filter_fields = {
            "country": ["exact"],
            "charge_taxes": ["exact"],
        }
        interfaces = (graphene.relay.Node,)

    @staticmethod
    def resolve_country(root, info):
        """Resolves the country field, displaying code and name."""
        return CountryDisplay(code=root.country.code, name=root.country.name)