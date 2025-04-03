import graphene
from graph.accounts.types import UserNode
from graph.shipping.types import (
    ShippingZoneNode, 
    ShippingMethodNode, 
    ShippingMethodPostalCodeRuleNode,
    ShippingMethodChannelListingNode
)
from graphene import relay
from graphql import GraphQLError
from graphql_relay import from_global_id

from shipping.models import (
    ShippingZone, 
    ShippingMethod, 
    ShippingMethodPostalCodeRule,
    ShippingMethodChannelListing
)
from graphene_django_jwt.decorators import login_required

class ShippingMethodsPerCountry(graphene.ObjectType):
    country_code = graphene.Field(
        CountryCodeEnum, required=True, description="The country code."
    )
    shipping_methods = NonNullList(
        ShippingMethod, description="List of available shipping methods."
    )

class ShippingMethod(graphene.ObjectType):
    id = graphene.ID(
        required=True, description="Unique ID of ShippingMethod available for Order."
    )
    type = ShippingMethodTypeEnum(
        description="Type of the shipping method.",
        deprecation_reason=DEFAULT_DEPRECATION_REASON,
    )
    name = graphene.String(required=True, description="Shipping method name.")
    description = JSONString(description="Shipping method description." + RICH_CONTENT)
    maximum_delivery_days = graphene.Int(
        description="Maximum delivery days for this shipping method."
    )
    minimum_delivery_days = graphene.Int(
        description="Minimum delivery days for this shipping method."
    )
    maximum_order_weight = graphene.Field(
        Weight,
        description="Maximum order weight for this shipping method.",
        deprecation_reason=DEFAULT_DEPRECATION_REASON,
    )
    minimum_order_weight = graphene.Field(
        Weight,
        description="Minimum order weight for this shipping method.",
        deprecation_reason=DEFAULT_DEPRECATION_REASON,
    )
    translation = TranslationField(
        ShippingMethodTranslation,
        type_name="shipping method",
        resolver=resolve_shipping_translation,
    )
    price = graphene.Field(
        Money, required=True, description="The price of selected shipping method."
    )
    maximum_order_price = graphene.Field(
        Money, description="Maximum order price for this shipping method."
    )
    minimum_order_price = graphene.Field(
        Money, description="Minimal order price for this shipping method."
    )
    active = graphene.Boolean(
        required=True,
        description="Describes if this shipping method is active and can be selected.",
    )
    message = graphene.String(description="Message connected to this shipping method.")

    class Meta:
        interfaces = [relay.Node, ObjectWithMetadata]
        doc_category = DOC_CATEGORY_SHIPPING
        description = (
            "Shipping methods that can be used as means of shipping "
            "for orders and checkouts."
        )

    @staticmethod
    def resolve_id(root: ShippingMethodData, _info):
        return root.graphql_id

    @staticmethod
    def resolve_maximum_order_weight(root: ShippingMethodData, _info):
        return convert_weight_to_default_weight_unit(root.maximum_order_weight)

    @staticmethod
    def resolve_minimum_order_weight(root: ShippingMethodData, _info):
        return convert_weight_to_default_weight_unit(root.minimum_order_weight)

class ShippingMethodChannelListingAddInput(graphene.ObjectType):
    channel_id = graphene.ID(required=True, description="ID of a channel.")
    price = PositiveDecimal(
        description="Shipping price of the shipping method in this channel."
    )
    minimum_order_price = PositiveDecimal(
        description="Minimum order price to use this shipping method."
    )
    maximum_order_price = PositiveDecimal(
        description="Maximum order price to use this shipping method."
    )

    


class ShippingMethodChannelListingInput(graphene.ObjectType):
    add_channels = NonNullList(
        ShippingMethodChannelListingAddInput,
        description="List of channels to which the shipping method should be assigned.",
        required=False,
    )
    remove_channels = NonNullList(
        graphene.ID,
        description=(
            "List of channels from which the shipping method should be unassigned."
        ),
        required=False,
    )

    


class ShippingMethodChannelListingUpdate(relay.ClientIDMutation, ChannelListingMutation):
    shipping_method = graphene.Field(
        ShippingMethodNode, description="An updated shipping method instance."
    )

    class Input:
        id = graphene.ID(
            required=True, description="ID of a shipping method to update."
        )
        input = ShippingMethodChannelListingInput(
            required=True,
            description="Fields required to update shipping method channel listings.",
        )

    
    @classmethod
    def add_channels(
        cls, shipping_method: "ShippingMethodModel", add_channels: List[Dict]
    ):
        for add_channel in add_channels:
            channel = add_channel["channel"]
            defaults = {"currency": channel.currency_code}
            if "minimum_order_price_amount" in add_channel.keys():
                defaults["minimum_order_price_amount"] = add_channel.get(
                    "minimum_order_price_amount", None
                )
            if "maximum_order_price_amount" in add_channel.keys():
                defaults["maximum_order_price_amount"] = add_channel.get(
                    "maximum_order_price_amount", None
                )
            if "price_amount" in add_channel.keys():
                defaults["price_amount"] = add_channel.get("price_amount")
            ShippingMethodChannelListing.objects.update_or_create(
                shipping_method=shipping_method,
                channel=add_channel["channel"],
                defaults=defaults,
            )

    @classmethod
    def remove_channels(
        cls, shipping_method: "ShippingMethodModel", remove_channels: List[int]
    ):
        ShippingMethodChannelListing.objects.filter(
            shipping_method=shipping_method, channel_id__in=remove_channels
        ).delete()
        drop_invalid_shipping_methods_relations_for_given_channels.delay(
            [shipping_method.id], remove_channels
        )

    @classmethod
    def save(
        cls,
        info,
        shipping_method: "ShippingMethodModel",
        cleaned_input: Dict,
    ):
        # transaction ensures consistent channels data
        with traced_atomic_transaction():
            cls.add_channels(shipping_method, cleaned_input.get("add_channels", []))
            cls.remove_channels(
                shipping_method, cleaned_input.get("remove_channels", [])
            )

    @classmethod
    def get_shipping_method_channel_listing_to_update(
        cls,
        shipping_method_id,
        input,
    ):
        channels = [data.get("channel") for data in input]
        channel_listings = ShippingMethodChannelListing.objects.filter(
            shipping_method_id=shipping_method_id, channel_id__in=channels
        ).values_list("channel_id", flat=True)
        return [
            data["channel_id"]
            for data in input
            if data["channel"].id in channel_listings
        ]

    @classmethod
    def clean_input(cls, data, shipping_method, errors):
        cleaned_input = data.get("add_channels")
        cls.clean_add_channels(shipping_method, cleaned_input)
        channel_listing_to_update = cls.get_shipping_method_channel_listing_to_update(
            shipping_method.id, cleaned_input
        )
        for channel_input in cleaned_input:
            channel_id = channel_input.get("channel_id")
            price_amount = channel_input.pop("price", None)
            if price_amount is not None:
                try:
                    validate_price_precision(
                        price_amount, channel_input["channel"].currency_code
                    )
                    validate_decimal_max_value(price_amount)
                    channel_input["price_amount"] = price_amount
                except ValidationError as error:
                    error.code = ShippingErrorCode.INVALID.value
                    error.params = {
                        "channels": [channel_id],
                    }
                    errors["price"].append(error)
            else:
                if channel_id not in channel_listing_to_update:
                    errors["price"].append(
                        ValidationError(
                            "This field is required.",
                            code=ShippingErrorCode.REQUIRED.value,
                            params={"channels": [channel_id]},
                        )
                    )

            min_price = None
            max_price = None
            if "minimum_order_price" in channel_input:
                min_price = channel_input.pop("minimum_order_price")
                channel_input["minimum_order_price_amount"] = min_price
            if min_price is not None:
                try:
                    validate_price_precision(
                        min_price, channel_input["channel"].currency_code
                    )
                    validate_decimal_max_value(min_price)
                except ValidationError as error:
                    error.code = ShippingErrorCode.INVALID.value
                    error.params = {
                        "channels": [channel_id],
                    }
                    errors["minimum_order_price"].append(error)

            if "maximum_order_price" in channel_input:
                max_price = channel_input.pop("maximum_order_price")
                channel_input["maximum_order_price_amount"] = max_price
            if max_price is not None:
                try:
                    validate_price_precision(
                        max_price, channel_input["channel"].currency_code
                    )
                    validate_decimal_max_value(max_price)
                except ValidationError as error:
                    error.code = ShippingErrorCode.INVALID.value
                    error.params = {
                        "channels": [channel_id],
                    }
                    errors["maximum_order_price"].append(error)

            if (
                min_price is not None
                and max_price is not None
                and max_price <= min_price
            ):
                errors["maximum_order_price"].append(
                    ValidationError(
                        (
                            "Maximum order price should be larger than "
                            "the minimum order price."
                        ),
                        code=ShippingErrorCode.MAX_LESS_THAN_MIN.value,
                        params={"channels": [channel_id]},
                    )
                )

        return data

    @classmethod
    def clean_add_channels(cls, shipping_method, input):
        """Ensure that only channels allowed in the method's shipping zone are added."""
        channels = {data.get("channel").id for data in input}
        available_channels = set(
            shipping_method.shipping_zone.channels.values_list("id", flat=True)
        )
        not_valid_channels = channels - available_channels
        if not_valid_channels:
            channel_ids = [
                graphene.Node.to_global_id("Channel", id) for id in not_valid_channels
            ]
            raise ValidationError(
                {
                    "add_channels": ValidationError(
                        "Cannot add channels that are not assigned "
                        "to the method's shipping zone.",
                        code=ShippingErrorCode.INVALID.value,
                        params={"channels": channel_ids},
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        shipping_method = get_shipping_model_by_object_id(id)

        errors: defaultdict[str, List[ValidationError]] = defaultdict(list)
        clean_channels = cls.clean_channels(
            info, input, errors, ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
        )
        cleaned_input = cls.clean_input(clean_channels, shipping_method, errors)

        if errors:
            raise ValidationError(errors)

        cls.save(info, shipping_method, cleaned_input)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_updated, shipping_method)

        return ShippingMethodChannelListingUpdate(
            shipping_method=ChannelContext(node=shipping_method, channel_slug=None)
        )


class ShippingPostalCodeRulesCreateInputRange(graphene.ObjectType):
    start = graphene.String(
        required=True, description="Start range of the postal code."
    )
    end = graphene.String(required=False, description="End range of the postal code.")

 


class ShippingPriceInput(graphene.ObjectType):
    name = graphene.String(description="Name of the shipping method.")
    description = JSONString(description="Shipping method description.")
    minimum_order_weight = WeightScalar(
        description="Minimum order weight to use this shipping method."
    )
    maximum_order_weight = WeightScalar(
        description="Maximum order weight to use this shipping method."
    )
    maximum_delivery_days = graphene.Int(
        description="Maximum number of days for delivery."
    )
    minimum_delivery_days = graphene.Int(
        description="Minimal number of days for delivery."
    )
    type = ShippingMethodTypeEnum(description="Shipping type: price or weight based.")
    shipping_zone = graphene.ID(
        description="Shipping zone this method belongs to.", name="shippingZone"
    )
    add_postal_code_rules = NonNullList(
        ShippingPostalCodeRulesCreateInputRange,
        description="Postal code rules to add.",
    )
    delete_postal_code_rules = NonNullList(
        graphene.ID,
        description="Postal code rules to delete.",
    )
    inclusion_type = PostalCodeRuleInclusionTypeEnum(
        description="Inclusion type for currently assigned postal code rules.",
    )
    tax_class = graphene.ID(
        description=(
            "ID of a tax class to assign to this shipping method. If not provided, "
            "the default tax class will be used."
        ),
        required=False,
    )

    


class ShippingZoneCreateInput(graphene.ObjectType):
    name = graphene.String(
        description="Shipping zone's name. Visible only to the staff."
    )
    description = graphene.String(description="Description of the shipping zone.")
    countries = NonNullList(
        graphene.String, description="List of countries in this shipping zone."
    )
    default = graphene.Boolean(
        description=(
            "Default shipping zone will be used for countries not covered by other "
            "zones."
        )
    )
    add_warehouses = NonNullList(
        graphene.ID,
        description="List of warehouses to assign to a shipping zone",
    )
    add_channels = NonNullList(
        graphene.ID,
        description="List of channels to assign to the shipping zone.",
    )

    

class ShippingZoneUpdateInput(ShippingZoneCreateInput):
    remove_warehouses = NonNullList(
        graphene.ID,
        description="List of warehouses to unassign from a shipping zone",
    )
    remove_channels = NonNullList(
        graphene.ID,
        description="List of channels to unassign from the shipping zone.",
    )

   


class ShippingZoneMixin:
    @classmethod
    def clean_input(cls, info, instance, data, **kwargs):
        errors: defaultdict[str, List[ValidationError]] = defaultdict(list)
        cls.check_duplicates(
            errors, data, "add_warehouses", "remove_warehouses", "warehouses"
        )
        cls.check_duplicates(
            errors, data, "add_channels", "remove_channels", "channels"
        )

        if errors:
            raise ValidationError(errors)

        cleaned_input = super().clean_input(  # type: ignore[misc] # mixin
            info, instance, data, **kwargs
        )
        if add_warehouses := cleaned_input.get("add_warehouses"):
            cls.clean_add_warehouses(instance, add_warehouses, cleaned_input)
        cleaned_input = cls.clean_default(instance, cleaned_input)
        return cleaned_input

    @classmethod
    def check_duplicates(
        cls,
        errors: dict,
        input_data: dict,
        add_field: str,
        remove_field: str,
        error_class_field: str,
    ):
        """Check if any items are on both input field.

        Raise error if some of items are duplicated.
        """
        error = check_for_duplicates(
            input_data, add_field, remove_field, error_class_field
        )
        if error:
            error.code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
            errors[error_class_field].append(error)

    @classmethod
    def clean_add_warehouses(cls, shipping_zone, warehouses, cleaned_input):
        """Check if all warehouses to add has common channel with shipping zone.

        Raise and error when the condition is not fulfilled.
        """
        warehouse_ids = [warehouse.id for warehouse in warehouses]

        remove_channel_ids = set()
        if remove_channels := cleaned_input.get("remove_channels"):
            remove_channel_ids = {channel.id for channel in remove_channels}

        add_channel_ids = set()
        if add_channels := cleaned_input.get("add_channels"):
            add_channel_ids = {channel.id for channel in add_channels}

        ChannelWarehouse = channel_models.Channel.warehouses.through  # type: ignore[attr-defined] # raw access to the through model # noqa: E501
        channel_warehouses = ChannelWarehouse.objects.filter(
            warehouse_id__in=warehouse_ids
        )

        # any warehouse from the list cannot be assigned when:
        # 1) where there are no channels assigned to any warehouse
        # 2) any channel is will be not assigned to the shipping zone
        if not channel_warehouses or (not shipping_zone.id and not add_channel_ids):
            invalid_warehouse_ids = warehouse_ids

        warehouse_to_channel_mapping = defaultdict(set)
        for warehouse_id, channel_id in channel_warehouses.values_list(
            "warehouse_id", "channel_id"
        ):
            warehouse_to_channel_mapping[warehouse_id].add(channel_id)

        # if the shipping zone does not exist yet, all zone channels will be channels
        # provided in `add_channels` field
        shipping_zone_channel_ids = (
            add_channel_ids
            if not shipping_zone.id
            else cls._get_shipping_zone_channel_ids(
                shipping_zone, remove_channel_ids, add_channel_ids
            )
        )

        invalid_warehouse_ids = cls._find_invalid_warehouses(
            warehouse_to_channel_mapping, warehouse_ids, shipping_zone_channel_ids
        )

        if invalid_warehouse_ids:
            invalid_warehouses = {
                graphene.Node.to_global_id("Warehouse", pk)
                for pk in invalid_warehouse_ids
            }
            raise ValidationError(
                {
                    "add_warehouses": ValidationError(
                        "Only warehouses that have common channel with shipping zone "
                        "can be assigned.",
                        code=ShippingErrorCode.INVALID.value,
                        params={
                            "warehouses": invalid_warehouses,
                        },
                    )
                }
            )

    @staticmethod
    def _get_shipping_zone_channel_ids(
        shipping_zone, remove_channel_ids, add_channel_ids
    ):
        # get shipping zone channels
        ShippingZoneChannel = models.ShippingZone.channels.through
        shipping_zone_channel_ids = set(
            ShippingZoneChannel.objects.filter(shippingzone_id=shipping_zone.id)
            .exclude(channel_id__in=remove_channel_ids)
            .values_list("channel_id", flat=True)
        )
        # shipping zone channels set need to be updated with channels
        # that will be removed and added to shipping zone
        return shipping_zone_channel_ids | add_channel_ids

    @staticmethod
    def _find_invalid_warehouses(
        warehouse_to_channel_mapping, warehouse_ids, zone_channel_ids
    ):
        invalid_warehouse_ids = []
        for warehouse_id in warehouse_ids:
            warehouse_channels = warehouse_to_channel_mapping.get(warehouse_id)
            # warehouse cannot be added if it hasn't got any channel assigned
            # or if it does not have common channel with shipping zone
            if not warehouse_channels or not warehouse_channels.intersection(
                zone_channel_ids
            ):
                invalid_warehouse_ids.append(warehouse_id)
        return invalid_warehouse_ids

    @classmethod
    def clean_default(cls, instance, data):
        default = data.get("default")
        if default:
            if default_shipping_zone_exists(instance.pk):
                raise ValidationError(
                    {
                        "default": ValidationError(
                            "Default shipping zone already exists.",
                            code=ShippingErrorCode.ALREADY_EXISTS.value,
                        )
                    }
                )
            else:
                cls._extend_shipping_zone_countries(data)
        else:
            data["default"] = False
        return data

    @classmethod
    def _save_m2m(cls, info: ResolveInfo, instance, cleaned_data):
        with traced_atomic_transaction():
            super()._save_m2m(info, instance, cleaned_data)  # type: ignore[misc] # mixin # noqa: E501

            add_warehouses = cleaned_data.get("add_warehouses")
            if add_warehouses:
                instance.warehouses.add(*add_warehouses)

            remove_warehouses = cleaned_data.get("remove_warehouses")
            if remove_warehouses:
                instance.warehouses.remove(*remove_warehouses)

            add_channels = cleaned_data.get("add_channels")
            if add_channels:
                instance.channels.add(*add_channels)

            remove_channels = cleaned_data.get("remove_channels")
            if remove_channels:
                instance.channels.remove(*remove_channels)
                shipping_channel_listings = (
                    models.ShippingMethodChannelListing.objects.filter(
                        shipping_method__shipping_zone=instance,
                        channel__in=remove_channels,
                    )
                )
                shipping_method_ids = list(
                    shipping_channel_listings.values_list(
                        "shipping_method_id", flat=True
                    )
                )
                shipping_channel_listings.delete()
                channel_ids = [channel.id for channel in remove_channels]
                cls.delete_invalid_shipping_zone_to_warehouse_relation(instance)
                drop_invalid_shipping_methods_relations_for_given_channels.delay(
                    shipping_method_ids, channel_ids
                )

    @classmethod
    def delete_invalid_shipping_zone_to_warehouse_relation(cls, shipping_zone):
        """Drop zone-warehouse relations that becomes invalid after channels deletion.

        Remove all shipping zone to warehouse relations that will not have common
        channel after removing given channels from the shipping zone.
        """
        WarehouseShippingZone = models.ShippingZone.warehouses.through  # type: ignore[attr-defined] # raw access to the through model # noqa: E501
        ChannelWarehouse = channel_models.Channel.warehouses.through  # type: ignore[attr-defined] # raw access to the through model # noqa: E501
        ShippingZoneChannel = models.ShippingZone.channels.through

        warehouse_shipping_zones = WarehouseShippingZone.objects.filter(
            shippingzone_id=shipping_zone.id
        )

        channel_warehouses = ChannelWarehouse.objects.filter(
            Exists(
                warehouse_shipping_zones.filter(warehouse_id=OuterRef("warehouse_id"))
            )
        )

        warehouse_to_channel_mapping = defaultdict(set)
        for warehouse_id, channel_id in channel_warehouses.values_list(
            "warehouse_id", "channel_id"
        ):
            warehouse_to_channel_mapping[warehouse_id].add(channel_id)

        shipping_zone_channel_ids = set(
            ShippingZoneChannel.objects.filter(
                shippingzone_id=shipping_zone.id
            ).values_list("channel_id", flat=True)
        )

        shipping_zone_warehouses_to_delete = []
        for id, warehouse_id in warehouse_shipping_zones.values_list(
            "id", "warehouse_id"
        ):
            warehouse_channels = warehouse_to_channel_mapping.get(warehouse_id, set())
            # if there is no common channels between shipping zone and warehouse
            # the relation should be deleted
            if not warehouse_channels or not warehouse_channels.intersection(
                shipping_zone_channel_ids
            ):
                shipping_zone_warehouses_to_delete.append(id)

        WarehouseShippingZone.objects.filter(
            id__in=shipping_zone_warehouses_to_delete
        ).delete()

    @classmethod
    def _extend_shipping_zone_countries(cls, data):
        countries = get_countries_without_shipping_zone()
        try:
            data["countries"].extend([country for country in countries])
        except (KeyError, AttributeError):
            data["countries"] = [country for country in countries]


class ShippingZoneCreate(relay.ClientIDMutation, ShippingZoneMixin):
    class Input:
        input = ShippingZoneCreateInput(
            description="Fields required to create a shipping zone.", required=True
        )

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_zone_created, instance)

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(instance)

        return response


class ShippingZoneUpdate(relay.ClientIDMutation, ShippingZoneMixin):
    class Input:
        id = graphene.ID(description="ID of a shipping zone to update.", required=True)
        input = ShippingZoneUpdateInput(
            description="Fields required to update a shipping zone.", required=True
        )

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_zone_updated, instance)

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(instance)

        return response


class ShippingZoneDelete(relay.ClientIDMutation, ModelDeleteMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a shipping zone to delete.")

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_zone_deleted, instance)

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(instance)

        return response


class ShippingMethodTypeMixin:
    @classmethod
    def get_type_for_model(cls):
        return shipping_types.ShippingMethodType

    @classmethod
    def get_instance(cls, info, **data):
        object_id = data.get("id")
        if object_id:
            instance = cls.get_node_or_error(  # type: ignore[attr-defined] # mixin
                info, object_id, qs=models.ShippingMethod.objects
            )
        else:
            instance = cls._meta.model()  # type: ignore[attr-defined] # mixin
        return instance


class ShippingPriceMixin:
    @classmethod
    def get_type_for_model(cls):
        return ShippingMethodType

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        cleaned_input = super().clean_input(  # type: ignore[misc] # mixin
            info, instance, data, **kwargs
        )
        errors: Dict[str, ValidationError] = {}
        cls.clean_weight(cleaned_input, errors)
        if (
            "minimum_delivery_days" in cleaned_input
            or "maximum_delivery_days" in cleaned_input
        ):
            cls.clean_delivery_time(instance, cleaned_input, errors)
        if errors:
            raise ValidationError(errors)

        if cleaned_input.get("delete_postal_code_rules"):
            _, postal_code_rules_db_ids = resolve_global_ids_to_primary_keys(
                data["delete_postal_code_rules"], ShippingMethodPostalCodeRule
            )
            cleaned_input["delete_postal_code_rules"] = postal_code_rules_db_ids
        if cleaned_input.get("add_postal_code_rules") and not cleaned_input.get(
            "inclusion_type"
        ):
            raise ValidationError(
                {
                    "inclusion_type": ValidationError(
                        "This field is required.",
                        code=ShippingErrorCode.REQUIRED.value,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def clean_weight(cls, cleaned_input, errors):
        min_weight = cleaned_input.get("minimum_order_weight")
        max_weight = cleaned_input.get("maximum_order_weight")

        if min_weight and min_weight.value < 0:
            errors["minimum_order_weight"] = ValidationError(
                "Shipping can't have negative weight.",
                code=ShippingErrorCode.INVALID.value,
            )
        if max_weight and max_weight.value < 0:
            errors["maximum_order_weight"] = ValidationError(
                "Shipping can't have negative weight.",
                code=ShippingErrorCode.INVALID.value,
            )

        if errors:
            return

        if (
            min_weight is not None
            and max_weight is not None
            and max_weight <= min_weight
        ):
            raise ValidationError(
                {
                    "maximum_order_weight": ValidationError(
                        (
                            "Maximum order weight should be larger than the "
                            "minimum order weight."
                        ),
                        code=ShippingErrorCode.MAX_LESS_THAN_MIN.value,
                    )
                }
            )

    @classmethod
    def clean_delivery_time(cls, instance, cleaned_input, errors):
        """Validate delivery days.

        - check if minimum_delivery_days is not higher than maximum_delivery_days
        - check if minimum_delivery_days and maximum_delivery_days are positive values
        """
        min_delivery_days = (
            cleaned_input.get("minimum_delivery_days") or instance.minimum_delivery_days
        )
        max_delivery_days = (
            cleaned_input.get("maximum_delivery_days") or instance.maximum_delivery_days
        )

        if not min_delivery_days and not max_delivery_days:
            return

        error_occurred = False
        if min_delivery_days and min_delivery_days < 0:
            errors["minimum_delivery_days"] = ValidationError(
                "Minimum delivery days must be positive.",
                code=ShippingErrorCode.INVALID.value,
            )
            error_occurred = True
        if max_delivery_days and max_delivery_days < 0:
            errors["maximum_delivery_days"] = ValidationError(
                "Maximum delivery days must be positive.",
                code=ShippingErrorCode.INVALID.value,
            )
            error_occurred = True

        if error_occurred:
            return

        if (
            min_delivery_days is not None
            and max_delivery_days is not None
            and min_delivery_days > max_delivery_days
        ):
            if cleaned_input.get("minimum_delivery_days") is not None:
                error_msg = (
                    "Minimum delivery days should be lower "
                    "than maximum delivery days."
                )
                field = "minimum_delivery_days"
            else:
                error_msg = (
                    "Maximum delivery days should be higher than "
                    "minimum delivery days."
                )
                field = "maximum_delivery_days"
            errors[field] = ValidationError(
                error_msg, code=ShippingErrorCode.INVALID.value
            )

    @classmethod
    def save(cls, info, instance, cleaned_input):
        with traced_atomic_transaction():
            super().save(info, instance, cleaned_input)  # type: ignore[misc] # mixin

            delete_postal_code_rules = cleaned_input.get("delete_postal_code_rules")
            if delete_postal_code_rules:
                instance.postal_code_rules.filter(
                    id__in=delete_postal_code_rules
                ).delete()

            if cleaned_input.get("add_postal_code_rules"):
                inclusion_type = cleaned_input["inclusion_type"]
                for postal_code_rule in cleaned_input["add_postal_code_rules"]:
                    start = postal_code_rule["start"]
                    end = postal_code_rule.get("end")
                    try:
                        instance.postal_code_rules.create(
                            start=start, end=end, inclusion_type=inclusion_type
                        )
                    except IntegrityError:
                        raise ValidationError(
                            {
                                "addPostalCodeRules": ValidationError(
                                    f"Entry start: {start}, end: {end} already exists.",
                                    code=ShippingErrorCode.ALREADY_EXISTS.value,
                                )
                            }
                        )


class ShippingPriceCreate(
    relay.ClientIDMutation, ShippingPriceMixin, ShippingMethodTypeMixin
):
    shipping_zone = graphene.Field(
        ShippingZone,
        description="A shipping zone to which the shipping method belongs.",
    )
    shipping_method = graphene.Field(
        ShippingMethodType, description="A shipping method to create."
    )

    class Input:
        input = ShippingPriceInput(
            description="Fields required to create a shipping price.", required=True
        )

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_created, instance)

    @classmethod
    def success_response(cls, instance):
        shipping_method = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(shipping_method)
        response.shipping_zone = ChannelContext(
            node=instance.shipping_zone, channel_slug=None
        )
        return response


class ShippingPriceUpdate(
    relay.ClientIDMutation, ShippingPriceMixin, ShippingMethodTypeMixin
):
    shipping_zone = graphene.Field(
        ShippingZone,
        description="A shipping zone to which the shipping method belongs.",
    )
    shipping_method = graphene.Field(
        ShippingMethodType, description="A shipping method."
    )

    class Input:
        id = graphene.ID(description="ID of a shipping price to update.", required=True)
        input = ShippingPriceInput(
            description="Fields required to update a shipping price.", required=True
        )

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_updated, instance)

    @classmethod
    def success_response(cls, instance):
        shipping_method = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(shipping_method)

        response.shipping_zone = ChannelContext(
            node=instance.shipping_zone, channel_slug=None
        )
        return response


class ShippingPriceDelete(relay.ClientIDMutation):
    shipping_method = graphene.Field(
        ShippingMethodType, description="A shipping method to delete."
    )
    shipping_zone = graphene.Field(
        ShippingZone,
        description="A shipping zone to which the shipping method belongs.",
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a shipping price to delete.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        shipping_method = cast(
            models.ShippingMethod,
            cls.get_node_or_error(info, id, qs=models.ShippingMethod.objects),
        )
        shipping_method_id = shipping_method.id
        shipping_zone = shipping_method.shipping_zone
        shipping_method.delete()
        shipping_method.id = shipping_method_id
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_deleted, shipping_method)

        return ShippingPriceDelete(
            shipping_method=ChannelContext(node=shipping_method, channel_slug=None),
            shipping_zone=ChannelContext(node=shipping_zone, channel_slug=None),
        )


class ShippingPriceExcludeProductsInput(graphene.ObjectType):
    products = NonNullList(
        graphene.ID,
        description="List of products which will be excluded.",
        required=True,
    )

    


class ShippingPriceExcludeProducts(relay.ClientIDMutation):
    shipping_method = graphene.Field(
        ShippingMethodType,
        description="A shipping method with new list of excluded products.",
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a shipping price.")
        input = ShippingPriceExcludeProductsInput(
            description="Exclude products input.", required=True
        )

    

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        shipping_method = cls.get_node_or_error(
            info, id, qs=models.ShippingMethod.objects
        )
        product_ids = input.get("products", [])

        product_db_ids = cls.get_global_ids_or_error(
            product_ids, product_types.Product, field="products"
        )

        product_to_exclude = product_models.Product.objects.filter(
            id__in=product_db_ids
        )

        current_excluded_products = shipping_method.excluded_products.all()
        shipping_method.excluded_products.set(
            (current_excluded_products | product_to_exclude).distinct()
        )
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_updated, shipping_method)

        return ShippingPriceExcludeProducts(
            shipping_method=ChannelContext(node=shipping_method, channel_slug=None)
        )


class ShippingPriceRemoveProductFromExclude(relay.ClientIDMutation):
    shipping_method = graphene.Field(
        ShippingMethodType,
        description="A shipping method with new list of excluded products.",
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a shipping price.")
        products = NonNullList(
            graphene.ID,
            required=True,
            description="List of products which will be removed from excluded list.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        shipping_method = cast(
            models.ShippingMethod,
            cls.get_node_or_error(info, id, qs=models.ShippingMethod.objects),
        )

        if products:
            product_db_ids = cls.get_global_ids_or_error(
                products, product_types.Product, field="products"
            )
            shipping_method.excluded_products.set(
                shipping_method.excluded_products.exclude(id__in=product_db_ids)
            )
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.shipping_price_updated, shipping_method)

        return ShippingPriceExcludeProducts(
            shipping_method=ChannelContext(node=shipping_method, channel_slug=None)
        )


class ShippingMutations(graphene.ObjectType):
    shipping_method_channel_listing_update = ShippingMethodChannelListingUpdate.Field()
    shipping_price_create = ShippingPriceCreate.Field()
    shipping_price_delete = ShippingPriceDelete.Field()
    shipping_price_bulk_delete = ShippingPriceBulkDelete.Field()
    shipping_price_update = ShippingPriceUpdate.Field()
    shipping_price_translate = ShippingPriceTranslate.Field()
    shipping_price_exclude_products = ShippingPriceExcludeProducts.Field()
    shipping_price_remove_product_from_exclude = (
        ShippingPriceRemoveProductFromExclude.Field()
    )

    shipping_zone_create = ShippingZoneCreate.Field()
    shipping_zone_delete = ShippingZoneDelete.Field()
    shipping_zone_update = ShippingZoneUpdate.Field()
