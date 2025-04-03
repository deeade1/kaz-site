from collections import defaultdict

import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphql.tax.types import (
    TaxClassCountryRateNode,
    TaxClassNode,
    TaxConfigurationNode,
    TaxConfigurationPerCountryNode,
)

from . import models
from .enums import CountryCodeEnum
from .filters import (
    TaxClassFilterInput,
    TaxClassSortingInput,
    TaxConfigurationFilterInput,
)
from .permissions import AuthorizationFilters
from .types import TaxCountryConfiguration
from .utils import from_global_id_or_error


class TaxQueries(graphene.ObjectType):
    tax_configuration = Node.Field(
        TaxConfigurationNode,
        description="Look up a tax configuration." + ADDED_IN_39,
        id=graphene.Argument(
            graphene.ID, description="ID of a tax configuration.", required=True
        ),
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )
    tax_configurations = DjangoFilterConnectionField(
        TaxConfigurationNode,
        description="List of tax configurations." + ADDED_IN_39,
        filterset_class=TaxConfigurationFilterInput(
            description="Filtering options for tax configurations."
        ),
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )
    tax_class = Node.Field(
        TaxClassNode,
        description="Look up a tax class." + ADDED_IN_39,
        id=graphene.Argument(
            graphene.ID, description="ID of a tax class.", required=True
        ),
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )
    tax_classes = DjangoFilterConnectionField(
        TaxClassNode,
        description="List of tax classes." + ADDED_IN_39,
        sort_by=TaxClassSortingInput(description="Sort tax classes."),
        filterset_class=TaxClassFilterInput(
            description="Filtering options for tax classes."
        ),
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )
    tax_country_configuration = Node.Field(
        TaxConfigurationPerCountryNode,
        country_code=graphene.Argument(
            CountryCodeEnum,
            description="Country for which to return tax configuration.",
            required=True,
        ),
        description="Tax configuration specific to a country.",
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )
    tax_country_configurations = DjangoFilterConnectionField(
        TaxConfigurationPerCountryNode,
        description="List of tax configurations for all countries." + ADDED_IN_39,
        permissions=[
            AuthorizationFilters.AUTHENTICATED_STAFF_USER,
            AuthorizationFilters.AUTHENTICATED_APP,
        ],
        doc_category=DOC_CATEGORY_TAXES,
    )

    @staticmethod
    def resolve_tax_configuration(root, info, id):
        _, id = from_global_id_or_error(id, TaxConfiguration)
        return models.TaxConfiguration.objects.filter(id=id).first()

    @staticmethod
    def resolve_tax_configurations(root, info, **kwargs):
        return models.TaxConfiguration.objects.all()

    @staticmethod
    def resolve_tax_class(root, info, id):
        _, id = from_global_id_or_error(id, TaxClass)
        return models.TaxClass.objects.filter(id=id).first()

    @staticmethod
    def resolve_tax_classes(root, info, **kwargs):
        return models.TaxClass.objects.all()

    @staticmethod
    def resolve_tax_country_configuration(root, info, country_code):
        country_rates = models.TaxClassCountryRate.objects.filter(country=country_code)
        return TaxCountryConfiguration(
            country=country_code,
            tax_class_country_rates=country_rates,
        )

    @staticmethod
    def resolve_tax_country_configurations(root, info, **kwargs):
        country_rates = models.TaxClassCountryRate.objects.all()
        rates_per_country = defaultdict(list)
        for country_rate in country_rates:
            rates_per_country[country_rate.country].append(country_rate)
        return [
            TaxCountryConfiguration(
                country=country, tax_class_country_rates=rates_per_country[country]
            )
            for country in rates_per_country
        ]
