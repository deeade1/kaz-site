
class SaleBaseCatalogueMutation(relay.ClientIDMutation, BaseDiscountCatalogueMutation):
    sale = graphene.Field(
        Sale, description="Sale of which catalogue IDs will be modified."
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a sale.")
        input = CatalogueInput(
            required=True,
            description="Fields required to modify catalogue IDs of sale.",
        )

    class Meta:
        abstract = True


class SaleAddCatalogues(relay.ClientIDMutation, SaleBaseCatalogueMutation):
    

    @classmethod
    def mutate_and_get_payload(self, info, id):
        sale = cast(
            models.Sale,
            cls.get_node_or_error(info, id, only_type=Sale, field="sale_id"),
        )
        previous_catalogue = fetch_catalogue_info(sale)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            cls.add_catalogues_to_node(sale, input)
            current_catalogue = fetch_catalogue_info(sale)
            previous_cat_converted = convert_catalogue_info_to_global_ids(
                previous_catalogue
            )
            current_cat_converted = convert_catalogue_info_to_global_ids(
                current_catalogue
            )

            def sale_update_event():
                return manager.sale_updated(
                    sale,
                    previous_catalogue=previous_cat_converted,
                    current_catalogue=current_cat_converted,
                )

            cls.call_event(sale_update_event)

        return SaleAddCatalogues(sale=ChannelContext(node=sale, channel_slug=None))


class SaleChannelListingAddInput(InputObjectType):
    channel_id = graphene.ID(required=True, description="ID of a channel.")
    discount_value = PositiveDecimal(
        required=True, description="The value of the discount."
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class SaleChannelListingInput(InputObjectType):
    add_channels = NonNullList(
        SaleChannelListingAddInput,
        description="List of channels to which the sale should be assigned.",
        required=False,
    )
    remove_channels = NonNullList(
        graphene.ID,
        description="List of channels from which the sale should be unassigned.",
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class SaleChannelListingUpdate(relay.ClientIDMutation, ChannelListingMutation):
    sale = graphene.Field(Sale, description="An updated sale instance.")

    class Input:
        id = graphene.ID(required=True, description="ID of a sale to update.")
        input = SaleChannelListingInput(
            required=True,
            description="Fields required to update sale channel listings.",
        )

    class Meta:
        description = "Manage sale's availability in channels."
        doc_category = DOC_CATEGORY_DISCOUNTS
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def add_channels(cls, sale: "SaleModel", add_channels: List[Dict]):
        for add_channel in add_channels:
            channel = add_channel["channel"]
            defaults = {"currency": channel.currency_code}
            channel = add_channel["channel"]
            if "discount_value" in add_channel.keys():
                defaults["discount_value"] = add_channel.get("discount_value")
            SaleChannelListing.objects.update_or_create(
                sale=sale,
                channel=channel,
                defaults=defaults,
            )

    @classmethod
    def clean_discount_values(
        cls,
        cleaned_channels,
        sale_type,
        errors: defaultdict[str, List[ValidationError]],
        error_code,
    ):
        channels_with_invalid_value_precision = []
        channels_with_invalid_percentage_value = []
        for cleaned_channel in cleaned_channels.get("add_channels", []):
            channel = cleaned_channel["channel"]
            currency_code = channel.currency_code
            discount_value = cleaned_channel.get("discount_value")
            if not discount_value:
                continue
            if sale_type == DiscountValueType.FIXED:
                try:
                    validate_price_precision(discount_value, currency_code)
                except ValidationError:
                    channels_with_invalid_value_precision.append(
                        cleaned_channel["channel_id"]
                    )
            elif sale_type == DiscountValueType.PERCENTAGE:
                if discount_value > 100:
                    channels_with_invalid_percentage_value.append(
                        cleaned_channel["channel_id"]
                    )

        if channels_with_invalid_value_precision:
            errors["input"].append(
                ValidationError(
                    "Invalid amount precision.",
                    code=error_code,
                    params={"channels": channels_with_invalid_value_precision},
                )
            )
        if channels_with_invalid_percentage_value:
            errors["input"].append(
                ValidationError(
                    "Invalid percentage value.",
                    code=error_code,
                    params={"channels": channels_with_invalid_percentage_value},
                )
            )
        return cleaned_channels

    @classmethod
    def remove_channels(cls, sale: "SaleModel", remove_channels: List[int]):
        sale.channel_listings.filter(channel_id__in=remove_channels).delete()

    @classmethod
    def save(cls, info: ResolveInfo, sale: "SaleModel", cleaned_input: Dict):
        with traced_atomic_transaction():
            cls.add_channels(sale, cleaned_input.get("add_channels", []))
            cls.remove_channels(sale, cleaned_input.get("remove_channels", []))
            update_products_discounted_prices_of_sale_task.delay(sale.pk)

    @classmethod
    def mutate_and_get_payload(self, info, id):
        sale = cls.get_node_or_error(info, id, only_type=Sale, field="id")
        errors: defaultdict[str, List[ValidationError]] = defaultdict(list)
        cleaned_channels = cls.clean_channels(
            info, input, errors, DiscountErrorCode.DUPLICATED_INPUT_ITEM.value
        )
        cleaned_input = cls.clean_discount_values(
            cleaned_channels, sale.type, errors, DiscountErrorCode.INVALID.value
        )

        if errors:
            raise ValidationError(errors)

        cls.save(info, sale, cleaned_input)

        # Invalidate dataloader for channel listings
        SaleChannelListingBySaleIdLoader(info.context).clear(sale.id)

        return SaleChannelListingUpdate(
            sale=ChannelContext(node=sale, channel_slug=None)
        )


class SaleInput(InputObjectType):
    name = graphene.String(description="Voucher name.")
    type = DiscountValueTypeEnum(description="Fixed or percentage.")
    value = PositiveDecimal(description="Value of the voucher.")
    products = NonNullList(
        graphene.ID, description="Products related to the discount.", name="products"
    )
    variants = NonNullList(
        graphene.ID,
        descriptions="Product variant related to the discount." + ADDED_IN_31,
        name="variants",
    )
    categories = NonNullList(
        graphene.ID,
        description="Categories related to the discount.",
        name="categories",
    )
    collections = NonNullList(
        graphene.ID,
        description="Collections related to the discount.",
        name="collections",
    )
    start_date = graphene.types.datetime.DateTime(
        description="Start date of the voucher in ISO 8601 format."
    )
    end_date = graphene.types.datetime.DateTime(
        description="End date of the voucher in ISO 8601 format."
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class SaleCreate(relay.ClientIDMutation):
    class Input:
        input = SaleInput(
            required=True, description="Fields required to create a sale."
        )

    class Meta:
        description = "Creates a new sale."
        model = models.Sale
        object_type = Sale
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def clean_instance(cls, info: ResolveInfo, instance):
        super().clean_instance(info, instance)
        start_date = instance.start_date
        end_date = instance.end_date
        try:
            validate_end_is_after_start(start_date, end_date)
        except ValidationError as error:
            error.code = DiscountErrorCode.INVALID.value
            raise ValidationError({"end_date": error})

    @classmethod
    def success_response(cls, instance):
        return super().success_response(
            ChannelContext(node=instance, channel_slug=None)
        )

    @classmethod
    def mutate_and_get_payload(self, info, id):
        with traced_atomic_transaction():
            response = super().perform_mutation(_root, info, **data)
            instance = getattr(response, cls._meta.return_field_name).node
            manager = get_plugin_manager_promise(info.context).get()
            cls.send_sale_notifications(manager, instance)
            update_products_discounted_prices_of_sale_task.delay(instance.pk)
        return response

    @classmethod
    def send_sale_notifications(cls, manager, instance):
        current_catalogue = convert_catalogue_info_to_global_ids(
            fetch_catalogue_info(instance)
        )

        cls.call_event(manager.sale_created, instance, current_catalogue)
        cls.send_sale_toggle_notification(manager, instance, current_catalogue)

    @staticmethod
    def send_sale_toggle_notification(manager, instance, catalogue):
        """Send a notification about starting or ending sale if it hasn't been sent yet.

        Send the notification when the start date is before the current date and the
        sale is not already finished.
        """
        now = datetime.now(pytz.utc)

        start_date = instance.start_date
        end_date = instance.end_date

        if (start_date and start_date <= now) and (not end_date or not end_date <= now):
            manager.sale_toggle(instance, catalogue)
            instance.notification_sent_datetime = now
            instance.save(update_fields=["notification_sent_datetime"])


class SaleDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a sale to delete.")

    class Meta:
        description = "Deletes a sale."
        model = models.Sale
        object_type = Sale
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def mutate_and_get_payload(self, info, id):
        instance = cls.get_node_or_error(info, id, only_type=Sale)
        previous_catalogue = fetch_catalogue_info(instance)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            response = super().perform_mutation(root, info, id=id)
            cls.call_event(
                lambda: manager.sale_deleted(
                    instance, convert_catalogue_info_to_global_ids(previous_catalogue)
                )
            )
            update_products_discounted_prices_of_catalogues_task.delay(
                product_ids=list(previous_catalogue["products"]),
                category_ids=list(previous_catalogue["categories"]),
                collection_ids=list(previous_catalogue["collections"]),
                variant_ids=list(previous_catalogue["variants"]),
            )
        response.sale = ChannelContext(node=instance, channel_slug=None)

        return response


class SaleRemoveCatalogues(relay.ClientIDMutation, SaleBaseCatalogueMutation):
    class Meta:
        description = "Removes products, categories, collections from a sale."
        doc_category = DOC_CATEGORY_DISCOUNTS
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def mutate_and_get_payload(self, info, id):
        sale = cast(
            models.Sale,
            cls.get_node_or_error(info, id, only_type=Sale, field="sale_id"),
        )
        previous_catalogue = fetch_catalogue_info(sale)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            cls.remove_catalogues_from_node(sale, input)
            current_catalogue = fetch_catalogue_info(sale)
            cls.call_event(
                lambda: manager.sale_updated(
                    sale,
                    previous_catalogue=convert_catalogue_info_to_global_ids(
                        previous_catalogue
                    ),
                    current_catalogue=convert_catalogue_info_to_global_ids(
                        current_catalogue
                    ),
                )
            )

        return SaleRemoveCatalogues(sale=ChannelContext(node=sale, channel_slug=None))


class SaleUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a sale to update.")
        input = SaleInput(
            required=True, description="Fields required to update a sale."
        )

    class Meta:
        description = "Updates a sale."
        model = models.Sale
        object_type = Sale
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def mutate_and_get_payload(self, info, id):
        instance = cls.get_instance(info, **data)
        previous_catalogue = fetch_catalogue_info(instance)
        previous_end_date = instance.end_date
        data = data.get("input")
        manager = get_plugin_manager_promise(info.context).get()
        cleaned_input = cls.clean_input(info, instance, data)
        with traced_atomic_transaction():
            instance = cls.construct_instance(instance, cleaned_input)
            cls.clean_instance(info, instance)
            cls.save(info, instance, cleaned_input)
            cls._save_m2m(info, instance, cleaned_input)
            current_catalogue = fetch_catalogue_info(instance)
            cls.send_sale_notifications(
                manager,
                instance,
                cleaned_input,
                previous_catalogue,
                current_catalogue,
                previous_end_date,
            )

            cls.update_products_discounted_prices(
                cleaned_input, previous_catalogue, current_catalogue
            )
        return cls.success_response(ChannelContext(node=instance, channel_slug=None))

    @classmethod
    def send_sale_notifications(
        cls,
        manager,
        instance,
        cleaned_input,
        previous_catalogue,
        current_catalogue,
        previous_end_date,
    ):
        current_catalogue = convert_catalogue_info_to_global_ids(current_catalogue)
        cls.call_event(
            manager.sale_updated,
            instance,
            convert_catalogue_info_to_global_ids(previous_catalogue),
            current_catalogue,
        )

        cls.send_sale_toggle_notification(
            manager, instance, cleaned_input, current_catalogue, previous_end_date
        )

    @staticmethod
    def send_sale_toggle_notification(
        manager, instance, clean_input, catalogue, previous_end_date
    ):
        """Send the notification about starting or ending sale if it wasn't sent yet.

        Send notification if the notification when the start or end date already passed
        and the notification_date is not set or the last notification was sent
        before start or end date.
        """
        now = datetime.now(pytz.utc)

        notification_date = instance.notification_sent_datetime
        start_date = clean_input.get("start_date")
        end_date = clean_input.get("end_date")

        if not start_date and not end_date:
            return

        send_notification = False
        for date in [start_date, end_date]:
            if (
                date
                and date <= now
                and (notification_date is None or notification_date < date)
            ):
                send_notification = True

        # we always need to notify if the end_date is in the past and previously
        # the end date was not set
        if end_date and end_date <= now and previous_end_date is None:
            send_notification = True

        if send_notification:
            manager.sale_toggle(instance, catalogue)
            instance.notification_sent_datetime = now
            instance.save(update_fields=["notification_sent_datetime"])

    @staticmethod
    def update_products_discounted_prices(
        cleaned_input, previous_catalogue, current_catalogue
    ):
        catalogues_to_recalculate = defaultdict(set)
        for catalogue_field in CATALOGUE_FIELDS:
            if any(
                [
                    field in cleaned_input
                    for field in [
                        catalogue_field,
                        "start_date",
                        "end_date",
                        "type",
                        "value",
                    ]
                ]
            ):
                catalogues_to_recalculate[catalogue_field] = previous_catalogue[
                    catalogue_field
                ].union(current_catalogue[catalogue_field])

        if catalogues_to_recalculate:
            update_products_discounted_prices_of_catalogues_task.delay(
                product_ids=list(catalogues_to_recalculate["products"]),
                category_ids=list(catalogues_to_recalculate["categories"]),
                collection_ids=list(catalogues_to_recalculate["collections"]),
                variant_ids=list(catalogues_to_recalculate["variants"]),
            )


class BaseDiscountCatalogueMutation(relay.ClientIDMutation):
    class Meta:
        abstract = True

    @classmethod
    def recalculate_discounted_prices(cls, products, categories, collections, variants):
        update_products_discounted_prices_of_catalogues_task.delay(
            product_ids=[p.pk for p in products],
            category_ids=[c.pk for c in categories],
            collection_ids=[c.pk for c in collections],
            variant_ids=[v.pk for v in variants],
        )

    @classmethod
    def add_catalogues_to_node(cls, node, input):
        products = input.get("products", [])
        if products:
            products = cls.get_nodes_or_error(products, "products", Product)
            cls.clean_product(products)
            node.products.add(*products)
        categories = input.get("categories", [])
        if categories:
            categories = cls.get_nodes_or_error(categories, "categories", Category)
            node.categories.add(*categories)
        collections = input.get("collections", [])
        if collections:
            collections = cls.get_nodes_or_error(collections, "collections", Collection)
            node.collections.add(*collections)
        variants = input.get("variants", [])
        if variants:
            variants = cls.get_nodes_or_error(variants, "variants", ProductVariant)
            node.variants.add(*variants)
        # Updated the db entries, recalculating discounts of affected products
        if products or categories or collections or variants:
            cls.recalculate_discounted_prices(
                products, categories, collections, variants
            )

    @classmethod
    def clean_product(cls, products):
        products_ids_without_variants = get_products_ids_without_variants(products)
        if products_ids_without_variants:
            raise ValidationError(
                {
                    "products": ValidationError(
                        "Cannot manage products without variants.",
                        code=DiscountErrorCode.CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT.value,
                        params={"products": products_ids_without_variants},
                    )
                }
            )

    @classmethod
    def remove_catalogues_from_node(cls, node, input):
        products = input.get("products", [])
        if products:
            products = cls.get_nodes_or_error(products, "products", Product)
            node.products.remove(*products)
        categories = input.get("categories", [])
        if categories:
            categories = cls.get_nodes_or_error(categories, "categories", Category)
            node.categories.remove(*categories)
        collections = input.get("collections", [])
        if collections:
            collections = cls.get_nodes_or_error(collections, "collections", Collection)
            node.collections.remove(*collections)
        variants = input.get("variants", [])
        if variants:
            variants = cls.get_nodes_or_error(variants, "variants", ProductVariant)
            node.variants.remove(*variants)
        # Updated the db entries, recalculating discounts of affected products
        cls.recalculate_discounted_prices(products, categories, collections, variants)


class VoucherUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a voucher to update.")
        input = VoucherInput(
            required=True, description="Fields required to update a voucher."
        )

    class Meta:
        description = "Updates a voucher."
        model = models.Voucher
        object_type = Voucher
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.voucher_updated, instance)


class VoucherChannelListingAddInput(InputObjectType):
    channel_id = graphene.ID(required=True, description="ID of a channel.")
    discount_value = PositiveDecimal(description="Value of the voucher.")
    min_amount_spent = PositiveDecimal(
        description="Min purchase amount required to apply the voucher."
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class VoucherChannelListingInput(InputObjectType):
    add_channels = NonNullList(
        VoucherChannelListingAddInput,
        description="List of channels to which the voucher should be assigned.",
        required=False,
    )
    remove_channels = NonNullList(
        graphene.ID,
        description="List of channels from which the voucher should be unassigned.",
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class VoucherChannelListingUpdate(relay.ClientIDMutation, ChannelListingMutation):
    voucher = graphene.Field(Voucher, description="An updated voucher instance.")

    class Input:
        id = graphene.ID(required=True, description="ID of a voucher to update.")
        input = VoucherChannelListingInput(
            required=True,
            description="Fields required to update voucher channel listings.",
        )

    class Meta:
        description = "Manage voucher's availability in channels."
        doc_category = DOC_CATEGORY_DISCOUNTS
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def clean_discount_values_per_channel(cls, cleaned_input, voucher, error_dict):
        channel_slugs_assigned_to_voucher = voucher.channel_listings.values_list(
            "channel__slug", flat=True
        )

        for cleaned_channel in cleaned_input.get("add_channels", []):
            channel = cleaned_channel.get("channel", None)
            if not channel:
                continue
            discount_value = cleaned_channel.get("discount_value", "")
            # New channel listing requires discout value. It raises validation error for
            # `discout_value` == `None`.
            # Updating channel listing doesn't require to pass `discout_value`.
            should_create = channel.slug not in channel_slugs_assigned_to_voucher
            missing_required_value = not discount_value and should_create
            if missing_required_value or discount_value is None:
                error_dict["channels_without_value"].append(
                    cleaned_channel["channel_id"]
                )
            # Validate value precision if it is fixed amount voucher
            if voucher.discount_value_type == DiscountValueType.FIXED:
                try:
                    validate_price_precision(discount_value, channel.currency_code)
                except ValidationError:
                    error_dict["channels_with_invalid_value_precision"].append(
                        cleaned_channel["channel_id"]
                    )
            elif voucher.discount_value_type == DiscountValueType.PERCENTAGE:
                if discount_value > 100:
                    error_dict["channels_with_invalid_percentage_value"].append(
                        cleaned_channel["channel_id"]
                    )

            min_amount_spent = cleaned_channel.get("min_amount_spent", None)
            if min_amount_spent:
                try:
                    validate_price_precision(min_amount_spent, channel.currency_code)
                except ValidationError:
                    error_dict[
                        "channels_with_invalid_min_amount_spent_precision"
                    ].append(cleaned_channel["channel_id"])

    @classmethod
    def clean_discount_values(
        cls, cleaned_input, voucher, errors: defaultdict[str, List[ValidationError]]
    ):
        error_dict: Dict[str, List[ValidationError]] = {
            "channels_without_value": [],
            "channels_with_invalid_value_precision": [],
            "channels_with_invalid_percentage_value": [],
            "channels_with_invalid_min_amount_spent_precision": [],
        }
        cls.clean_discount_values_per_channel(
            cleaned_input,
            voucher,
            error_dict,
        )
        channels_without_value = error_dict["channels_without_value"]
        if channels_without_value:
            errors["discount_value"].append(
                ValidationError(
                    "Value is required for voucher.",
                    code=DiscountErrorCode.REQUIRED.value,
                    params={"channels": channels_without_value},
                )
            )

        channels_with_invalid_value_precision = error_dict[
            "channels_with_invalid_value_precision"
        ]
        if channels_with_invalid_value_precision:
            errors["discount_value"].append(
                ValidationError(
                    "Invalid amount precision.",
                    code=DiscountErrorCode.INVALID.value,
                    params={"channels": channels_with_invalid_value_precision},
                )
            )

        channels_with_invalid_percentage_value = error_dict[
            "channels_with_invalid_percentage_value"
        ]
        if channels_with_invalid_percentage_value:
            errors["discount_value"].append(
                ValidationError(
                    "Invalid percentage value.",
                    code=DiscountErrorCode.INVALID.value,
                    params={"channels": channels_with_invalid_percentage_value},
                )
            )

        channels_with_invalid_min_amount_spent_precision = error_dict[
            "channels_with_invalid_min_amount_spent_precision"
        ]
        if channels_with_invalid_min_amount_spent_precision:
            errors["min_amount_spent"].append(
                ValidationError(
                    "Invalid amount precision.",
                    code=DiscountErrorCode.INVALID.value,
                    params={
                        "channels": channels_with_invalid_min_amount_spent_precision
                    },
                )
            )
        return cleaned_input

    @classmethod
    def add_channels(cls, voucher, add_channels):
        for add_channel in add_channels:
            channel = add_channel["channel"]
            defaults = {"currency": channel.currency_code}
            if "discount_value" in add_channel.keys():
                defaults["discount_value"] = add_channel.get("discount_value")
            if "min_amount_spent" in add_channel.keys():
                defaults["min_spent_amount"] = add_channel.get("min_amount_spent", None)
            models.VoucherChannelListing.objects.update_or_create(
                voucher=voucher,
                channel=channel,
                defaults=defaults,
            )

    @classmethod
    def remove_channels(cls, voucher, remove_channels):
        voucher.channel_listings.filter(channel_id__in=remove_channels).delete()

    @classmethod
    def save(cls, voucher, cleaned_input):
        with traced_atomic_transaction():
            cls.add_channels(voucher, cleaned_input.get("add_channels", []))
            cls.remove_channels(voucher, cleaned_input.get("remove_channels", []))

    @classmethod
    def mutate_and_get_payload(self, info, id):
        voucher = cls.get_node_or_error(info, id, only_type=Voucher, field="id")
        errors: defaultdict[str, List[ValidationError]] = defaultdict(list)
        cleaned_input = cls.clean_channels(
            info, input, errors, DiscountErrorCode.DUPLICATED_INPUT_ITEM.value
        )
        cleaned_input = cls.clean_discount_values(cleaned_input, voucher, errors)

        if errors:
            raise ValidationError(errors)

        cls.save(voucher, cleaned_input)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.voucher_updated, voucher)

        return VoucherChannelListingUpdate(
            voucher=ChannelContext(node=voucher, channel_slug=None)
        )


class CatalogueInput(InputObjectType):
    products = NonNullList(
        graphene.ID, description="Products related to the discount.", name="products"
    )
    categories = NonNullList(
        graphene.ID,
        description="Categories related to the discount.",
        name="categories",
    )
    collections = NonNullList(
        graphene.ID,
        description="Collections related to the discount.",
        name="collections",
    )
    variants = NonNullList(
        graphene.ID,
        description="Product variant related to the discount." + ADDED_IN_31,
        name="variants",
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class VoucherBaseCatalogueMutation(BaseDiscountCatalogueMutation):
    voucher = graphene.Field(
        Voucher, description="Voucher of which catalogue IDs will be modified."
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a voucher.")
        input = CatalogueInput(
            required=True,
            description="Fields required to modify catalogue IDs of voucher.",
        )

    class Meta:
        abstract = True

    @classmethod
    def mutate_and_get_payload(self, info, id):
        response = super().mutate(root, info, **data)
        if response.voucher:
            response.voucher = ChannelContext(node=response.voucher, channel_slug=None)
        return response


class VoucherAddCatalogues(VoucherBaseCatalogueMutation):
    class Meta:
        description = "Adds products, categories, collections to a voucher."
        doc_category = DOC_CATEGORY_DISCOUNTS
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def mutate_and_get_payload(self, info, id):
        voucher = cls.get_node_or_error(
            info, data.get("id"), only_type=Voucher, field="voucher_id"
        )
        input_data = data.get("input", {})
        cls.add_catalogues_to_node(voucher, input_data)

        if input_data:
            manager = get_plugin_manager_promise(info.context).get()
            cls.call_event(manager.voucher_updated, voucher)

        return VoucherAddCatalogues(voucher=voucher)


class VoucherInput(InputObjectType):
    type = VoucherTypeEnum(
        description="Voucher type: PRODUCT, CATEGORY SHIPPING or ENTIRE_ORDER."
    )
    name = graphene.String(description="Voucher name.")
    code = graphene.String(description="Code to use the voucher.")
    start_date = DateTime(required=True, datetime_input=DateTime(required=True))

    end_date = DateTime(required=True, datetime_input=DateTime(required=True))

    discount_value_type = DiscountValueTypeEnum(
        description="Choices: fixed or percentage."
    )
    products = NonNullList(
        graphene.ID, description="Products discounted by the voucher.", name="products"
    )
    variants = NonNullList(
        graphene.ID,
        description="Variants discounted by the voucher.",
        name="variants",
    )
    collections = NonNullList(
        graphene.ID,
        description="Collections discounted by the voucher.",
        name="collections",
    )
    categories = NonNullList(
        graphene.ID,
        description="Categories discounted by the voucher.",
        name="categories",
    )
    min_checkout_items_quantity = graphene.Int(
        description="Minimal quantity of checkout items required to apply the voucher."
    )
    countries = NonNullList(
        graphene.String,
        description="Country codes that can be used with the shipping voucher.",
    )
    apply_once_per_order = graphene.Boolean(
        description="Voucher should be applied to the cheapest item or entire order."
    )
    apply_once_per_customer = graphene.Boolean(
        description="Voucher should be applied once per customer."
    )
    only_for_staff = graphene.Boolean(
        description="Voucher can be used only by staff user."
    )
    usage_limit = graphene.Int(
        description="Limit number of times this voucher can be used in total."
    )

    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS


class VoucherCreate(relay.ClientIDMutation):
    class Input:
        input = VoucherInput(
            required=True, description="Fields required to create a voucher."
        )

    class Meta:
        description = "Creates a new voucher."
        model = models.Voucher
        object_type = Voucher
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def clean_input(cls, info, instance, data, **kwargs):
        code = data.get("code", None)
        if code == "":
            data["code"] = generate_promo_code()
        elif not is_available_promo_code(code):
            raise ValidationError(
                {
                    "code": ValidationError(
                        "Promo code already exists.",
                        code=DiscountErrorCode.ALREADY_EXISTS.value,
                    )
                }
            )
        cleaned_input = super().clean_input(info, instance, data, **kwargs)

        return cleaned_input

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        return super().success_response(instance)

    @classmethod
    def clean_instance(cls, info, instance):
        super().clean_instance(info, instance)
        start_date = instance.start_date
        end_date = instance.end_date
        try:
            validate_end_is_after_start(start_date, end_date)
        except ValidationError as error:
            error.code = DiscountErrorCode.INVALID.value
            raise ValidationError({"end_date": error})

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.voucher_created, instance)


class VoucherDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a voucher to delete.")

    class Meta:
        description = "Deletes a voucher."
        model = models.Voucher
        object_type = Voucher
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        response = super().success_response(instance)
        return response

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.voucher_deleted, instance)


class VoucherRemoveCatalogues(relay.ClientIDMutation, VoucherBaseCatalogueMutation):
    class Meta:
        description = "Removes products, categories, collections from a voucher."
        doc_category = DOC_CATEGORY_DISCOUNTS
        permissions = (DiscountPermissions.MANAGE_DISCOUNTS,)
        error_type_class = DiscountError
        error_type_field = "discount_errors"

    @classmethod
    def mutate_and_get_payload(self, info, id):
        voucher = cls.get_node_or_error(
            info, data.get("id"), only_type=Voucher, field="voucher_id"
        )
        input_data = data.get("input", {})
        cls.remove_catalogues_from_node(voucher, input_data)

        if input_data:
            manager = get_plugin_manager_promise(info.context).get()
            cls.call_event(manager.voucher_updated, voucher)

        return VoucherRemoveCatalogues(voucher=voucher)

class PromotionCreate(relay.ClientIDMutation):
    class Input:
        id = graphene.UUID()
        name = graphene.String(required=True, description="Name of the promotion.")
        type = graphene.String(
            required=True,
            description="Type of the promotion (e.g., catalogue, order, etc.)."
        )
        description = graphene.JSONString(description="Description of the promotion.")
        old_sale_id = graphene.Int(description="ID of the old sale linked to promotion.")
        start_date = graphene.DateTime(
            required=True, description="Start date of the promotion."
        )
        end_date = graphene.DateTime(
            description="End date of the promotion."
        )
        last_notification_scheduled_at = graphene.DateTime(
            description="Date of the last scheduled notification."
        )

    promotion = graphene.Field(
        PromotionNode, description="The created promotion instance."
    )

    @classmethod
    def clean_input(cls, info, instance: models.Promotion, data: dict, **kwargs):
        """
        Clean and validate input data for promotion creation.
        """
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        errors: defaultdict[str, list[ValidationError]] = defaultdict(list)

        # Validate start_date and end_date
        start_date = cleaned_input.get("start_date") or instance.start_date
        end_date = cleaned_input.get("end_date")
        try:
            validate_end_is_after_start(start_date, end_date)
        except ValidationError as error:
            error.code = PromotionCreateErrorCode.INVALID.value
            errors["end_date"].append(error)

        # Additional rules validation if provided
        promotion_type = cleaned_input.get("type")
        if rules := cleaned_input.get("rules"):
            cleaned_rules, errors = cls.clean_rules(info, rules, promotion_type, errors)
            cleaned_input["rules"] = cleaned_rules

        if errors:
            raise ValidationError(errors)

        return cleaned_input

    @classmethod
    def clean_rules(cls, info, rules_data: list, promotion_type: str, errors: defaultdict):
        """
        Validate and clean promotion rules.
        """
        cleaned_rules = []
        if promotion_type == PromotionType.ORDER:
            rules_limit = settings.ORDER_RULES_LIMIT
            current_rule_count = models.PromotionRule.objects.filter(~Q(order_predicate={})).count()
            exceed_by = current_rule_count + len(rules_data) - int(rules_limit)
            if exceed_by > 0:
                raise ValidationError(
                    {
                        "rules": ValidationError(
                            "Number of rules with orderPredicate has reached the limit.",
                            code=PromotionCreateErrorCode.RULES_NUMBER_LIMIT.value,
                            params={
                                "rules_limit": rules_limit,
                                "rules_limit_exceed_by": exceed_by,
                            },
                        )
                    }
                )

        for index, rule_data in enumerate(rules_data):
            if channel_ids := rule_data.get("channels"):
                channels = cls.clean_channels(info, channel_ids, index, errors)
                rule_data["channels"] = channels
            if gift_ids := rule_data.get("gifts"):
                instances = cls.get_nodes_or_error(
                    gift_ids, "gifts", schema=info.schema
                )
                rule_data["gifts"] = instances

            clean_promotion_rule(
                rule_data, promotion_type, errors, PromotionCreateErrorCode, index
            )
            cleaned_rules.append(rule_data)

        return cleaned_rules, errors

    @classmethod
    def clean_channels(cls, info, channel_ids: list[str], index: int, errors: defaultdict):
        """
        Validate and fetch channels for the rules.
        """
        try:
            channels = get_nodes(channel_ids, Channel, schema=info.schema)
        except GraphQLError as e:
            errors["channels"].append(
                ValidationError(
                    str(e),
                    code=PromotionCreateErrorCode.GRAPHQL_ERROR.value,
                    params={"index": index},
                )
            )
            return []
        return channels

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        """
        Create and save a new promotion.
        """
        instance = cls.get_instance(info, **data)
        cleaned_input = cls.clean_input(info, instance, data["input"])
        instance = cls.construct_instance(instance, cleaned_input)
        cls.clean_instance(info, instance)
        with transaction.atomic():
            cls.save(info, instance, cleaned_input)
            rules = cls._save_m2m(info, instance, cleaned_input)
            cls.post_save_actions(info, instance, rules)

        return PromotionCreate(promotion=instance)

    @classmethod
    def _save_m2m(cls, info, instance: models.Promotion, cleaned_data: dict):
        """
        Save many-to-many relationships for the promotion.
        """
        rules_with_channels = []
        rules = []
        if rules_data := cleaned_data.get("rules"):
            for rule_data in rules_data:
                channels = rule_data.pop("channels", None)
                gifts = rule_data.pop("gifts", None)
                rule = models.PromotionRule(promotion=instance, **rule_data)
                if promotion_rule_should_be_marked_with_dirty_variants(
                    rule, instance.type, channels
                ):
                    rule.variants_dirty = True
                if gifts:
                    rule.gifts.set(gifts)
                if channels:
                    rules_with_channels.append((rule, channels))
                rules.append(rule)
            models.PromotionRule.objects.bulk_create(rules)

        for rule, channels in rules_with_channels:
            rule.channels.set(channels)

        return rules

    @classmethod
    def post_save_actions(cls, info, instance: models.Promotion, rules: list):
        """
        Perform additional actions after saving the promotion.
        """
        manager = get_plugin_manager_promise(info.context).get()
        has_started = cls.has_started(instance)
        cls.save_promotion_events(info, instance, rules, has_started)
        cls.call_event(manager.promotion_created, instance)
        if has_started:
            cls.send_promotion_started_webhook(manager, instance)

    @classmethod
    def has_started(cls, instance: models.Promotion) -> bool:
        """
        Check if the promotion has started based on its start_date.
        """
        now = datetime.datetime.now(tz=datetime.UTC)
        return instance.start_date and instance.start_date <= now and (
            not instance.end_date or instance.end_date > now
        )

class PromotionDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.UUID(required=True, description="ID of the promotion to delete.")
    
    success = graphene.Boolean(description="Indicates whether the operation was successful.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        promotion_id = input.get("id")
        try:
            promotion = models.Promotion.objects.get(id=promotion_id)
        except models.Promotion.DoesNotExist:
            raise ValidationError(
                {"id": ValidationError("Promotion not found.", code="NOT_FOUND")}
            )

        # Perform any necessary cleanup or validations before deletion
        cls.perform_deletion(promotion)

        return PromotionDelete(success=True)

class PromotionUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.UUID(required=True, description="ID of the promotion to update.")
        name = graphene.String(description="Updated name of the promotion.")
        type = graphene.String(description="Updated type of the promotion.")
        description = graphene.JSONString(description="Updated description of the promotion.")
        start_date = graphene.DateTime(description="Updated start date of the promotion.")
        end_date = graphene.DateTime(description="Updated end date of the promotion.")
        last_notification_scheduled_at = graphene.DateTime(
            description="Updated last notification scheduled date."
        )

    promotion = graphene.Field(PromotionNode, description="The updated promotion instance.")

    @classmethod
    def clean_input(cls, info, instance: models.Promotion, data: dict, **kwargs):
        """
        Clean and validate input data for promotion updates.
        """
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        errors: defaultdict[str, list[ValidationError]] = defaultdict(list)

        # Validate start_date and end_date
        start_date = cleaned_input.get("start_date") or instance.start_date
        end_date = cleaned_input.get("end_date")
        try:
            validate_end_is_after_start(start_date, end_date)
        except ValidationError as error:
            error.code = "INVALID"
            errors["end_date"].append(error)

        if errors:
            raise ValidationError(errors)

        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        promotion_id = input.pop("id")
        try:
            instance = models.Promotion.objects.get(id=promotion_id)
        except models.Promotion.DoesNotExist:
            raise ValidationError(
                {"id": ValidationError("Promotion not found.", code="NOT_FOUND")}
            )

        cleaned_input = cls.clean_input(info, instance, input)
        instance = cls.construct_instance(instance, cleaned_input)
        cls.clean_instance(info, instance)
        
        with transaction.atomic():
            cls.save(info, instance, cleaned_input)

        return PromotionUpdate(promotion=instance)

class PromotionRuleCreate(relay.ClientIDMutation):
    class Input:
        name = graphene.String(description="Name of the promotion rule.")
        description = graphene.JSONString(description="Description of the promotion rule.")
        promotion_id = graphene.UUID(required=True, description="ID of the related promotion.")
        channel_ids = graphene.List(
            graphene.UUID, description="List of IDs of the related channels."
        )
        catalogue_predicate = graphene.JSONString(description="Catalogue predicate for the rule.")
        order_predicate = graphene.JSONString(description="Order predicate for the rule.")
        reward_value_type = graphene.String(description="Type of reward value.")
        reward_value = graphene.Decimal(description="Value of the reward.")
        reward_type = graphene.String(description="Type of the reward.")
        gift_ids = graphene.List(
            graphene.UUID, description="List of IDs of the gift product variants."
        )

    promotion_rule = graphene.Field("path.to.PromotionRuleNode", description="The created promotion rule.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        promotion_id = input.get("promotion_id")
        try:
            promotion = models.Promotion.objects.get(id=promotion_id)
        except models.Promotion.DoesNotExist:
            raise ValidationError(
                {"promotion_id": ValidationError("Promotion not found.", code="NOT_FOUND")}
            )

        cleaned_input = cls.clean_input(info, input)
        promotion_rule = models.PromotionRule(**cleaned_input, promotion=promotion)
        promotion_rule.save()

        if channel_ids := input.get("channel_ids"):
            channels = cls.get_nodes_or_error(channel_ids, "channels", Channel)
            promotion_rule.channels.set(channels)

        if gift_ids := input.get("gift_ids"):
            gifts = cls.get_nodes_or_error(gift_ids, "gifts", "product.ProductVariant")
            promotion_rule.gifts.set(gifts)

        return PromotionRuleCreate(promotion_rule=promotion_rule)

    @classmethod
    def clean_input(cls, info, input_data):
        # Implement additional cleaning logic if necessary
        return input_data

class PromotionRuleUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.UUID(required=True, description="ID of the promotion rule to update.")
        name = graphene.String(description="Updated name of the promotion rule.")
        description = graphene.JSONString(description="Updated description of the promotion rule.")
        channel_ids = graphene.List(
            graphene.UUID, description="List of IDs of the updated channels."
        )
        catalogue_predicate = graphene.JSONString(description="Updated catalogue predicate.")
        order_predicate = graphene.JSONString(description="Updated order predicate.")
        reward_value_type = graphene.String(description="Updated type of reward value.")
        reward_value = graphene.Decimal(description="Updated value of the reward.")
        reward_type = graphene.String(description="Updated type of the reward.")
        gift_ids = graphene.List(
            graphene.UUID, description="List of IDs of the updated gift product variants."
        )

    promotion_rule = graphene.Field("path.to.PromotionRuleNode", description="The updated promotion rule.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            promotion_rule = models.PromotionRule.objects.get(id=input.get("id"))
        except models.PromotionRule.DoesNotExist:
            raise ValidationError(
                {"id": ValidationError("Promotion rule not found.", code="NOT_FOUND")}
            )

        cleaned_input = cls.clean_input(info, input)
        for key, value in cleaned_input.items():
            setattr(promotion_rule, key, value)

        promotion_rule.save()

        if channel_ids := input.get("channel_ids"):
            channels = cls.get_nodes_or_error(channel_ids, "channels", Channel)
            promotion_rule.channels.set(channels)

        if gift_ids := input.get("gift_ids"):
            gifts = cls.get_nodes_or_error(gift_ids, "gifts", "product.ProductVariant")
            promotion_rule.gifts.set(gifts)

        return PromotionRuleUpdate(promotion_rule=promotion_rule)

    @classmethod
    def clean_input(cls, info, input_data):
        # Implement additional cleaning logic if necessary
        return input_data

class PromotionRuleDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.UUID(required=True, description="ID of the promotion rule to delete.")

    success = graphene.Boolean(description="Indicates whether the deletion was successful.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            promotion_rule = models.PromotionRule.objects.get(id=input.get("id"))
        except models.PromotionRule.DoesNotExist:
            raise ValidationError(
                {"id": ValidationError("Promotion rule not found.", code="NOT_FOUND")}
            )

        promotion_rule.delete()
        return PromotionRuleDelete(success=True)

class DiscountMutations(graphene.ObjectType):
    sale_create = SaleCreate.Field()
    sale_delete = SaleDelete.Field()
    sale_update = SaleUpdate.Field()
    sale_catalogues_add = SaleAddCatalogues.Field()
    sale_catalogues_remove = SaleRemoveCatalogues.Field()
    sale_translate = SaleTranslate.Field()
    sale_channel_listing_update = SaleChannelListingUpdate.Field()

    voucher_create = VoucherCreate.Field()
    voucher_delete = VoucherDelete.Field()
    voucher_update = VoucherUpdate.Field()
    voucher_catalogues_add = VoucherAddCatalogues.Field()
    voucher_catalogues_remove = VoucherRemoveCatalogues.Field()
    voucher_translate = VoucherTranslate.Field()
    voucher_channel_listing_update = VoucherChannelListingUpdate.Field()
    promotion_create = PromotionCreate.Field()
    promotion_delete = PromotionDelete.Field()
    promotion_update = PromotionUpdate.Field()
    promotion_rule_create = PromotionRuleCreate.Field()
    promotion_rule_update = PromotionRuleUpdate.Field()
    promotion_rule_delete = PromotionRuleDelete.Field()
