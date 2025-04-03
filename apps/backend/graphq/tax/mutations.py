import graphene
from django.db import models
from graph.accounts.types import UserNode
from graph.blog.types import CommentNode, PostCategoryNode, PostNode
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_relay import from_global_id

from blog.models import Category, Comment, Post, PostView
from graphene_django_jwt.decorators import login_required

from .enums import CountryCodeEnum, TaxCalculationStrategy, TaxExemptionManageErrorCode
from .errors import error_codes
from .helpers import ValidationError, get_duplicates_items
from .inputs import TaxClassRateInput, TaxConfigurationUpdateInput, TaxSourceObject
from .models import TaxClassCountryRate, TaxConfiguration, TaxConfigurationPerCountry
from .utils import (
    fetch_checkout_info,
    fetch_checkout_lines,
    get_plugin_manager_promise,
    invalidate_checkout_prices,
)


class TaxClassCreateError(Error):
    code = TaxClassCreateErrorCode(description="The error code.", required=True)
    country_codes = NonNullList(
        graphene.String,
        description="List of country codes for which the configuration is invalid.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class CountryRateInput(InputObjectType):
    country_code = CountryCodeEnum(
        description="Country in which this rate applies.", required=True
    )
    rate = graphene.Float(
        description=(
            "Tax rate value provided as percentage. Example: provide `23` to "
            "represent `23%` tax rate."
        ),
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassCreateInput(InputObjectType):
    name = graphene.String(description="Name of the tax class.", required=True)
    create_country_rates = NonNullList(
        CountryRateInput,
        description="List of country-specific tax rates to create for this tax class.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassDeleteError(Error):
    code = TaxClassDeleteErrorCode(description="The error code.", required=True)

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class CountryRateUpdateInput(InputObjectType):
    country_code = CountryCodeEnum(
        description="Country in which this rate applies.", required=True
    )
    rate = graphene.Float(
        description=(
            "Tax rate value provided as percentage. Example: provide `23` to "
            "represent `23%` tax rate. Provide `null` to remove the particular rate."
        ),
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassUpdateError(Error):
    code = TaxClassUpdateErrorCode(description="The error code.", required=True)
    country_codes = NonNullList(
        graphene.String,
        description="List of country codes for which the configuration is invalid.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassUpdateInput(InputObjectType):
    name = graphene.String(description="Name of the tax class.")
    update_country_rates = NonNullList(
        CountryRateUpdateInput,
        description=(
            "List of country-specific tax rates to create or update for this tax class."
        ),
    )
    remove_country_rates = NonNullList(
        CountryCodeEnum,
        description=(
            "List of country codes for which to remove the tax class rates. Note: It "
            "removes all rates for given country code."
        ),
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxConfigurationPerCountryInput(InputObjectType):
    country_code = CountryCodeEnum(
        description="Country in which this configuration applies.", required=True
    )
    charge_taxes = graphene.Boolean(
        description="Determines whether taxes are charged in this country.",
        required=True,
    )
    tax_calculation_strategy = graphene.Field(
        TaxCalculationStrategy,
        required=False,
        description=(
            "A country-specific strategy to use for tax calculation. Taxes can be "
            "calculated either using user-defined flat rates or with a tax app. If "
            "not provided, use the value from the channel's tax configuration."
        ),
    )
    display_gross_prices = graphene.Boolean(
        description=(
            "Determines whether prices displayed in a storefront should include taxes "
            "for this country."
        ),
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxConfigurationUpdateInput(InputObjectType):
    charge_taxes = graphene.Boolean(
        description="Determines whether taxes are charged in the given channel."
    )
    tax_calculation_strategy = graphene.Field(
        TaxCalculationStrategy,
        required=False,
        description=(
            "The default strategy to use for tax calculation in the given channel. "
            "Taxes can be calculated either using user-defined flat rates or with "
            "a tax app. Empty value means that no method is selected and taxes are "
            "not calculated."
        ),
    )
    display_gross_prices = graphene.Boolean(
        description=(
            "Determines whether prices displayed in a storefront should include taxes."
        )
    )
    prices_entered_with_tax = graphene.Boolean(
        description="Determines whether prices are entered with the tax included."
    )
    update_countries_configuration = NonNullList(
        TaxConfigurationPerCountryInput,
        description=(
            "List of tax country configurations to create or update (identified by a "
            "country code)."
        ),
    )
    remove_countries_configuration = NonNullList(
        CountryCodeEnum,
        description="List of country codes for which to remove the tax configuration.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxConfigurationUpdateError(Error):
    code = TaxConfigurationUpdateErrorCode(description="The error code.", required=True)
    country_codes = NonNullList(
        graphene.String,
        description="List of country codes for which the configuration is invalid.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxCountryConfigurationDeleteError(Error):
    code = TaxCountryConfigurationDeleteErrorCode(
        description="The error code.", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxCountryConfigurationUpdateError(Error):
    code = TaxCountryConfigurationUpdateErrorCode(
        description="The error code.", required=True
    )
    tax_class_ids = NonNullList(
        graphene.String,
        description="List of tax class IDs for which the update failed.",
        required=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassRateInput(InputObjectType):
    tax_class_id = graphene.ID(
        description="ID of a tax class for which to update the tax rate", required=False
    )
    rate = graphene.Float(description="Tax rate value.", required=False)

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxExemptionManageError(Error):
    code = TaxExemptionManageErrorCode(description="The error code.", required=True)

    class Meta:
        doc_category = DOC_CATEGORY_TAXES


class TaxClassCreate(relay.ClientIDMutation):
    class Input:
        input = TaxClassCreateInput(
            description="Fields required to create a tax class.",
            required=True,
        )

    tax_class = graphene.Field(TaxClassNode, description="The created tax class.")

    @classmethod
    @handle_errors
    def mutate_and_get_payload(cls, root, info, **data):
        input_data = data.get("input", {})

        # Clean and validate the input data
        cleaned_input = clean_input(input_data)
        tax_class_instance = TaxClass(name=cleaned_input.get("name"))

        # Save the tax class instance and associated country rates
        cls.save(info, tax_class_instance, cleaned_input)

        return TaxClassCreate(tax_class=tax_class_instance)

    @classmethod
    def create_country_rates(cls, instance, country_rates):
        """Bulk create country-specific tax rates associated with this tax class."""
        to_create = [
            TaxClassCountryRate(
                tax_class=instance, country=item["country_code"], rate=item["rate"]
            )
            for item in country_rates
        ]
        TaxClassCountryRate.objects.bulk_create(to_create)

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()
        create_country_rates = cleaned_input.get("create_country_rates", [])

        # If country-specific rates are provided, create them
        if create_country_rates:
            cls.create_country_rates(instance, create_country_rates)


class TaxClassDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a tax class to delete.")

    success = graphene.Boolean(
        description="Indicates whether the tax class was successfully deleted."
    )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        _, id = from_global_id_or_error(input["id"], TaxClass)
        instance = TaxClass.objects.filter(id=id).first()

        if not instance:
            raise ValidationError("Tax class not found.")

        instance.delete()
        return TaxClassDelete(success=True)


class TaxClassUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(description="ID of the tax class.", required=True)
        input = TaxClassUpdateInput(
            description="Fields required to update a tax class.", required=True
        )

    tax_class = graphene.Field(TaxClassNode, description="The updated tax class.")

    @classmethod
    def clean_input(cls, info, instance, data, **kwargs):
        update_country_rates = data.get("update_country_rates", [])
        update_country_codes = [item["country_code"] for item in update_country_rates]
        remove_country_rates = data.get("remove_country_rates", [])

        # Ensure no duplicate country codes between updating and removing lists
        duplicated_country_codes = list(
            get_duplicates_items(update_country_codes, remove_country_rates)
        )
        if duplicated_country_codes:
            message = (
                "The same country code cannot be in both lists for updating and "
                "removing items: "
            ) + ", ".join(duplicated_country_codes)
            params = {"country_codes": duplicated_country_codes}
            code = error_codes.TaxClassUpdateErrorCode.DUPLICATED_INPUT_ITEM.value
            raise ValidationError(message=message, code=code, params=params)

        return super().clean_input(info, instance, data, **kwargs)

    @classmethod
    def update_country_rates(cls, instance, country_rates):
        input_data_by_country = {item["country_code"]: item for item in country_rates}

        # Update existing instances
        to_update = instance.country_rates.filter(
            country__in=input_data_by_country.keys()
        )
        updated_countries = []
        for obj in to_update:
            data = input_data_by_country[obj.country]
            rate = data.get("rate")
            if rate is not None:
                obj.rate = rate
                updated_countries.append(obj.country.code)
        TaxClassCountryRate.objects.bulk_update(to_update, fields=("rate",))

        # Create new instances
        to_create = [
            TaxClassCountryRate(
                tax_class=instance, country=item["country_code"], rate=item["rate"]
            )
            for item in country_rates
            if item["country_code"] not in updated_countries
            and item.get("rate") is not None
        ]
        TaxClassCountryRate.objects.bulk_create(to_create)

        # Delete instances where null rates were provided
        to_delete = [
            item["country_code"] for item in country_rates if item.get("rate") is None
        ]
        TaxClassCountryRate.objects.filter(
            country__in=to_delete,
            tax_class=instance,
        ).delete()

    @classmethod
    def remove_country_rates(cls, country_codes, instance):
        TaxClassCountryRate.objects.filter(
            country__in=country_codes, tax_class=instance
        ).delete()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        _, id = from_global_id_or_error(input["id"], TaxClass)
        instance = TaxClass.objects.filter(id=id).first()

        if not instance:
            raise ValidationError("Tax class not found.")

        # Process and clean the input data
        cleaned_input = cls.clean_input(info, instance, input.get("input", {}))

        # Update the TaxClass instance and save any changes
        cls.save(info, instance, cleaned_input)

        return TaxClassUpdate(tax_class=instance)

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.name = cleaned_input.get("name", instance.name)
        instance.save()

        # Manage country rates if present in cleaned_input
        update_country_rates = cleaned_input.get("update_country_rates", [])
        remove_country_rates = cleaned_input.get("remove_country_rates", [])

        if update_country_rates:
            cls.update_country_rates(instance, update_country_rates)
        if remove_country_rates:
            cls.remove_country_rates(remove_country_rates, instance)


class TaxConfigurationUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(description="ID of the tax configuration.", required=True)
        input = TaxConfigurationUpdateInput(
            description="Fields required to update the tax configuration.",
            required=True,
        )

    @classmethod
    def clean_input(cls, info, instance, data):
        update_countries_configuration = data.get("update_countries_configuration", [])
        update_country_codes = [
            item["country_code"] for item in update_countries_configuration
        ]
        remove_country_codes = data.get("remove_countries_configuration", [])

        duplicated_country_codes = list(
            get_duplicates_items(update_country_codes, remove_country_codes)
        )
        if duplicated_country_codes:
            raise ValidationError(
                message=(
                    "The same country code cannot be in both lists for updating and "
                    "removing items: " + ", ".join(duplicated_country_codes)
                ),
                code=error_codes.TaxConfigurationUpdateErrorCode.DUPLICATED_INPUT_ITEM.value,
                params={"country_codes": duplicated_country_codes},
            )

        return super().clean_input(info, instance, data)

    @classmethod
    def update_countries_configuration(cls, instance, countries_configuration):
        input_data_by_country = {
            item["country_code"]: item for item in countries_configuration
        }

        # Update existing instances
        to_update = instance.country_exceptions.filter(
            country__in=input_data_by_country.keys()
        )
        updated_countries = []
        for obj in to_update:
            data = input_data_by_country[obj.country]
            obj.charge_taxes = data["charge_taxes"]
            obj.display_gross_prices = data["display_gross_prices"]
            obj.tax_calculation_strategy = data.get("tax_calculation_strategy")
            updated_countries.append(obj.country.code)

        TaxConfigurationPerCountry.objects.bulk_update(
            to_update,
            fields=("charge_taxes", "display_gross_prices", "tax_calculation_strategy"),
        )

        # Create new instances
        to_create = [
            TaxConfigurationPerCountry(
                tax_configuration=instance,
                country=item["country_code"],
                charge_taxes=item["charge_taxes"],
                tax_calculation_strategy=item.get("tax_calculation_strategy"),
                display_gross_prices=item["display_gross_prices"],
            )
            for item in countries_configuration
            if item["country_code"] not in updated_countries
        ]
        TaxConfigurationPerCountry.objects.bulk_create(to_create)

    @classmethod
    def remove_countries_configuration(cls, country_codes):
        TaxConfigurationPerCountry.objects.filter(country__in=country_codes).delete()

    @classmethod
    def save(cls, _info, instance, cleaned_input):
        instance.save()
        cls.update_countries_configuration(
            instance, cleaned_input.get("update_countries_configuration", [])
        )
        cls.remove_countries_configuration(
            cleaned_input.get("remove_countries_configuration", [])
        )


class TaxCountryConfigurationUpdate(relay.ClientIDMutation):
    tax_country_configuration = graphene.Field(
        TaxCountryConfiguration,
        description="Updated tax class rates grouped by a country.",
    )

    class Input:
        country_code = CountryCodeEnum(
            description="Country for tax class rate updates.", required=True
        )
        update_tax_class_rates = graphene.List(
            TaxClassRateInput,
            description="List of tax rates per tax class to update.",
            required=True,
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        country_code = input["country_code"]
        cleaned_data = cls.clean_input(input)
        cls.update_default_rate(country_code, cleaned_data)
        cls.update_and_create_country_rates(country_code, cleaned_data)

        # Prepare response data
        all_rates = TaxClassCountryRate.objects.filter(country=country_code)
        country_config = TaxCountryConfiguration(
            country=Country(country_code),
            tax_class_country_rates=all_rates,
        )
        return TaxCountryConfigurationUpdate(tax_country_configuration=country_config)


class TaxCountryConfigurationDelete(relay.ClientIDMutation):
    tax_country_configuration = graphene.Field(
        TaxCountryConfiguration,
        description="Deleted tax class rates grouped by country.",
    )

    class Input:
        country_code = CountryCodeEnum(
            description="Country to delete tax class rates for.", required=True
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        country_code = input["country_code"]
        TaxClassCountryRate.objects.filter(country=country_code).delete()
        country_config = TaxCountryConfiguration(
            country=Country(country_code),
            tax_class_country_rates=[],
        )
        return TaxCountryConfigurationDelete(tax_country_configuration=country_config)


class TaxExemptionManage(relay.ClientIDMutation):
    taxable_object = graphene.Field(TaxSourceObject)

    class Input:
        id = graphene.ID(
            description="ID of the Checkout or Order object.", required=True
        )
        tax_exemption = graphene.Boolean(
            description="Determines if taxes should be exempt.", required=True
        )

    @classmethod
    def validate_input(cls, info, data):
        obj = cls.get_node_or_error(info, data["id"])
        if not isinstance(obj, (Order, Checkout)):
            raise ValidationError(
                {
                    "id": ValidationError(
                        message="Invalid object ID. Only Checkout and Order IDs are accepted.",
                        code=TaxExemptionManageErrorCode.NOT_FOUND.value,
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        cls.validate_input(info, input)
        obj = cls.get_object(info, input["id"])
        obj.tax_exemption = input["tax_exemption"]

        if isinstance(obj, Checkout):
            cls._invalidate_checkout_prices(info, obj)
            obj.save(update_fields=["tax_exemption", "price_expiration", "last_change"])

        if isinstance(obj, Order):
            cls.validate_order_status(obj)
            obj.should_refresh_prices = True
            obj.save(
                update_fields=["tax_exemption", "should_refresh_prices", "updated_at"]
            )

        return TaxExemptionManage(taxable_object=obj)


class TaxMutations(graphene.ObjectType):
    tax_class_create = TaxClassCreate.Field()
    tax_class_delete = TaxClassDelete.Field()
    tax_class_update = TaxClassUpdate.Field()
    tax_configuration_update = TaxConfigurationUpdate.Field()
    tax_country_configuration_update = TaxCountryConfigurationUpdate.Field()
    tax_country_configuration_delete = TaxCountryConfigurationDelete.Field()
    tax_exemption_manage = TaxExemptionManage.Field()
