import graphene
from graphene import relay

from graphq.checkout.types import CheckoutLineNode, CheckoutNode
from graphq.order.types import OrderNode

from .models import Tag


class CheckoutAddPromoCode(relay.ClientIDMutation):
    checkout = graphene.Field(
        CheckoutNode, description="The checkout with the added gift card or voucher."
    )

    class Input:
        id = graphene.ID(
            required=False,
        )
        checkout_id = graphene.ID(
            required=False,
        )
        token = UUID(
            required=False,
        )
        promo_code = graphene.String(
            description="Gift card code or voucher code.", required=True
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        manager = get_plugin_manager_promise(info.context).get()
        lines, unavailable_variant_pks = fetch_checkout_lines(checkout)

        if unavailable_variant_pks:
            not_available_variants_ids = {
                graphene.Node.to_global_id("ProductVariant", pk)
                for pk in unavailable_variant_pks
            }
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Some of the checkout lines variants are unavailable.",
                        code=CheckoutErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
                        params={"variants": not_available_variants_ids},
                    )
                }
            )

        shipping_channel_listings = checkout.channel.shipping_method_listings.all()
        checkout_info = fetch_checkout_info(
            checkout, lines, manager, shipping_channel_listings
        )

        add_promo_code_to_checkout(
            manager,
            checkout_info,
            lines,
            promo_code,
        )

        update_delivery_method_lists_for_checkout_info(
            checkout_info,
            checkout_info.checkout.shipping_method,
            checkout_info.checkout.collection_point,
            checkout_info.shipping_address,
            lines,
            manager,
            shipping_channel_listings,
        )

        update_checkout_shipping_method_if_invalid(checkout_info, lines)
        invalidate_checkout_prices(
            checkout_info,
            lines,
            manager,
            recalculate_discount=False,
            save=True,
        )
        cls.call_event(manager.checkout_updated, checkout)

        return CheckoutAddPromoCode(checkout=checkout)


class CheckoutShippingAddressUpdate(relay.ClientIDMutation, I18nMixin):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(
            description="The checkout's ID." + ADDED_IN_34,
            required=False,
        )
        token = UUID(
            description=f"Checkout token.{DEPRECATED_IN_3X_INPUT} Use `id` instead.",
            required=False,
        )
        checkout_id = graphene.ID(
            required=False,
            description=(
                f"The ID of the checkout. {DEPRECATED_IN_3X_INPUT} Use `id` instead."
            ),
        )
        shipping_address = AddressInput(
            required=True,
            description="The mailing address to where the checkout will be shipped.",
        )
        validation_rules = CheckoutAddressValidationRules(
            required=False,
            description=(
                "The rules for changing validation for received shipping address data."
            ),
        )

    @classmethod
    def process_checkout_lines(
        cls,
        info,
        lines: Iterable["CheckoutLineInfo"],
        country: str,
        channel_slug: str,
        delivery_method_info: "DeliveryMethodBase",
    ) -> None:
        variants = []
        quantities = []
        for line_info in lines:
            variants.append(line_info.variant)
            quantities.append(line_info.line.quantity)
        site = get_site_promise(info.context).get()
        check_lines_quantity(
            variants,
            quantities,
            country,
            channel_slug,
            site.settings.limit_quantity_per_checkout,
            delivery_method_info=delivery_method_info,
            # Set replace=True to avoid existing_lines and quantities from
            # being counted twice by the check_stock_quantity_bulk
            replace=True,
            existing_lines=lines,
            check_reservations=is_reservation_enabled(site.settings),
        )

    @classmethod
    def mutate_and_get_payload(self, info, id):
        checkout = get_checkout(
            cls,
            info,
            checkout_id=checkout_id,
            token=token,
            id=id,
            qs=models.Checkout.objects.prefetch_related(
                "lines__variant__product__product_type"
            ),
        )

        lines, _ = fetch_checkout_lines(checkout)
        if not is_shipping_required(lines):
            raise ValidationError(
                {
                    "shipping_address": ValidationError(
                        ERROR_DOES_NOT_SHIP,
                        code=CheckoutErrorCode.SHIPPING_NOT_REQUIRED.value,
                    )
                }
            )
        address_validation_rules = validation_rules or {}
        shipping_address_instance = cls.validate_address(
            shipping_address,
            address_type=AddressType.SHIPPING,
            instance=checkout.shipping_address,
            info=info,
            format_check=address_validation_rules.get("check_fields_format", True),
            required_check=address_validation_rules.get("check_required_fields", True),
            enable_normalization=address_validation_rules.get(
                "enable_fields_normalization", True
            ),
        )
        shipping_channel_listings = checkout.channel.shipping_method_listings.all()
        checkout_info = fetch_checkout_info(checkout, lines, shipping_channel_listings)

        country = shipping_address_instance.country.code
        checkout.set_country(country, commit=True)

        # Resolve and process the lines, validating variants quantities
        if lines:
            cls.process_checkout_lines(
                info,
                lines,
                country,
                checkout_info.channel.slug,
                checkout_info.delivery_method_info,
            )

        update_checkout_shipping_method_if_invalid(checkout_info, lines)

        shipping_address_updated_fields = []
        with traced_atomic_transaction():
            shipping_address_instance.save()
            shipping_address_updated_fields = change_shipping_address_in_checkout(
                checkout_info,
                shipping_address_instance,
                lines,
                manager,
                shipping_channel_listings,
            )
        invalidate_prices_updated_fields = invalidate_checkout_prices(
            checkout_info, lines, manager, save=False
        )
        checkout.save(
            update_fields=shipping_address_updated_fields
            + invalidate_prices_updated_fields
        )

        cls.call_event(manager.checkout_updated, checkout)

        return CheckoutShippingAddressUpdate(checkout=checkout)


class CheckoutBillingAddressUpdate(CheckoutShippingAddressUpdate):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(
            required=False,
        )
        token = UUID(
            required=False,
        )
        checkout_id = graphene.ID(
            required=False,
        )
        billing_address = AddressInput(
            required=True, description="The billing address of the checkout."
        )
        validation_rules = CheckoutAddressValidationRules(
            required=False,
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        address_validation_rules = validation_rules or {}
        billing_address = cls.validate_address(
            billing_address,
            address_type=AddressType.BILLING,
            instance=checkout.billing_address,
            info=info,
            format_check=address_validation_rules.get("check_fields_format", True),
            required_check=address_validation_rules.get("check_required_fields", True),
            enable_normalization=address_validation_rules.get(
                "enable_fields_normalization", True
            ),
        )

        with traced_atomic_transaction():
            billing_address.save()
            change_address_updated_fields = change_billing_address_in_checkout(
                checkout, billing_address
            )
            lines, _ = fetch_checkout_lines(checkout)
            checkout_info = fetch_checkout_info(checkout, lines)
            invalidate_prices_updated_fields = invalidate_checkout_prices(
                checkout_info,
                lines,
                recalculate_discount=False,
                save=False,
            )
            checkout.save(
                update_fields=change_address_updated_fields
                + invalidate_prices_updated_fields
            )

            cls.call_event(manager.checkout_updated, checkout)

        return CheckoutBillingAddressUpdate(checkout=checkout)


class CheckoutComplete(I18nMixin, relay.ClientIDMutation):
    order = graphene.Field(OrderNode, description="Placed order.")
    confirmation_needed = graphene.Boolean(
        required=True,
        default_value=False,
        description="True if payment needs confirmation before checkout completion.",
    )
    confirmation_data = JSONString(
        required=False,
        description="Data for additional authorization steps (if needed).",
    )

    class Input:
        id = graphene.ID(required=False)
        token = UUID(required=False)
        checkout_id = graphene.ID(required=False)
        store_source = graphene.Boolean(default_value=False)
        redirect_url = graphene.String(
            required=False,
            description=(
                "URL where users should be redirected to view order details. "
                "Format: RFC 1808."
            ),
        )
        payment_data = JSONString(
            required=False,
            description="Client-side data for payment finalization.",
        )
        metadata = NonNullList(
            MetadataInput,
            description="Fields to update checkout metadata.",
            required=False,
        )

    @classmethod
    def validate_checkout_addresses(cls, checkout_info, lines):
        """Validates both shipping and billing addresses in the checkout."""
        cls.validate_shipping_address_if_required(checkout_info, lines)
        cls.validate_billing_address(checkout_info)

    @classmethod
    def validate_shipping_address_if_required(cls, checkout_info, lines):
        """Validates the shipping address if the checkout requires shipping."""
        shipping_address = checkout_info.shipping_address
        if is_shipping_required(lines):
            clean_checkout_shipping(checkout_info, lines, CheckoutErrorCode)
            if shipping_address:
                cls.normalize_and_save_address(shipping_address, AddressType.SHIPPING)

    @classmethod
    def validate_billing_address(cls, checkout_info):
        """Validates the billing address for the checkout."""
        billing_address = checkout_info.billing_address
        if not billing_address:
            raise ValidationError(
                {
                    "billing_address": ValidationError(
                        "Billing address is not set.",
                        code=CheckoutErrorCode.BILLING_ADDRESS_NOT_SET.value,
                    )
                }
            )
        cls.normalize_and_save_address(billing_address, AddressType.BILLING)

    @staticmethod
    def normalize_and_save_address(address, address_type):
        """Normalizes and saves the address if needed."""
        address_data = address.as_data()
        CheckoutComplete.validate_address(
            address_data,
            address_type=address_type,
            format_check=True,
            required_check=True,
            enable_normalization=True,
            instance=address,
        )
        if address_data != address.as_data():
            address.save()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        checkout_id = input.get("checkout_id")
        token = input.get("token")
        id = input.get("id")
        metadata = input.get("metadata")
        payment_data = input.get("payment_data")
        store_source = input.get("store_source")
        redirect_url = input.get("redirect_url")

        validate_one_of_args_is_in_mutation(
            "checkout_id", checkout_id, "token", token, "id", id
        )
        tracking_code = analytics.get_client_id(info.context)

        checkout = cls.get_checkout(info, checkout_id, token, id)
        cls.check_metadata(info, metadata, checkout_id or token)
        validate_checkout_email(checkout)

        lines, unavailable_variant_pks = fetch_checkout_lines(checkout)
        cls.check_line_availability(unavailable_variant_pks)

        checkout_info = fetch_checkout_info(checkout, lines)
        cls.validate_checkout_addresses(checkout_info, lines)

        customer = cls.get_customer(info, checkout)
        site = get_site_promise(info.context).get()

        order, action_required, action_data = complete_checkout(
            checkout_info=checkout_info,
            lines=lines,
            payment_data=payment_data or {},
            store_source=store_source,
            user=customer,
            site_settings=site.settings,
            tracking_code=tracking_code,
            redirect_url=redirect_url,
            metadata_list=metadata,
        )

        return CheckoutComplete(
            order=order,
            confirmation_needed=action_required,
            confirmation_data=action_data,
        )

    @classmethod
    def get_checkout(cls, info, checkout_id, token, id):
        """Fetches checkout using id, token, or checkout_id."""
        try:
            return get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)
        except ValidationError as e:
            return cls.handle_checkout_errors(e, id, checkout_id, token)

    @staticmethod
    def handle_checkout_errors(error, id, checkout_id, token):
        """Handles errors related to checkout retrieval."""
        if id or checkout_id:
            id = id or checkout_id
            token = CheckoutComplete.get_global_id_or_error(
                id, only_type=Checkout, field="id" if id else "checkout_id"
            )
        order = order_models.Order.objects.get_by_checkout_token(token)
        if order:
            if not order.channel.is_active:
                raise ValidationError(
                    {
                        "channel": ValidationError(
                            "Cannot complete checkout with inactive channel.",
                            code=CheckoutErrorCode.CHANNEL_INACTIVE.value,
                        )
                    }
                )
            return CheckoutComplete(
                order=order, confirmation_needed=False, confirmation_data={}
            )
        raise error

    @staticmethod
    def check_metadata(info, metadata, checkout_id_or_token):
        """Checks metadata permissions and validates keys."""
        if metadata is not None:
            check_metadata_permissions(info, checkout_id_or_token)
            validate_metadata_keys(metadata)

    @staticmethod
    def check_line_availability(unavailable_variant_pks):
        """Raises an error if any checkout line variant is unavailable."""
        if unavailable_variant_pks:
            not_available_variants_ids = {
                graphene.Node.to_global_id("ProductVariant", pk)
                for pk in unavailable_variant_pks
            }
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Some checkout lines variants are unavailable.",
                        code=CheckoutErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
                        params={"variants": not_available_variants_ids},
                    )
                }
            )

    @staticmethod
    def get_customer(info, checkout):
        """Retrieves the customer, checking if impersonation is allowed."""
        requestor = get_user_or_app_from_context(info.context)
        if requestor and requestor.has_perm(AccountPermissions.IMPERSONATE_USER):
            return checkout.user
        return info.context.user


class CheckoutCreateFromOrderUnavailableVariant(graphene.ObjectType):
    message = graphene.String(description="The error message.", required=True)
    code = CheckoutCreateFromOrderUnavailableVariantErrorCode(
        description="The error code.", required=True
    )
    variant_id = graphene.ID(
        description="Variant ID that is unavailable.", required=True
    )
    line_id = graphene.ID(
        description="Order line ID that is unavailable.", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutCreateFromOrderError(Error):
    code = CheckoutCreateFromOrderErrorCode(
        description="The error code.", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutCreateFromOrder(relay.ClientIDMutation):
    unavailable_variants = graphene.List(
        CheckoutCreateFromOrderUnavailableVariant, graphene.NonNull(graphene.String)
    )

    checkout = graphene.Field(CheckoutNode, description="Created checkout.")

    class Input:
        id = graphene.ID(
            required=True,
            description="ID of an order that will be used to create the checkout.",
        )

    @classmethod
    def _create_variant_errors(
        cls, error_code: str, msg: str, order_lines: list[order_models.OrderLine]
    ) -> list[dict[str, Any]]:
        return [
            {
                "message": msg,
                "code": error_code,
                "variant_id": line.product_variant_id,
                "line_id": graphene.Node.to_global_id("OrderLine", line.pk),
            }
            for line in order_lines
        ]

    @classmethod
    def _handle_variant_errors(
        cls,
        variant_ids_set: set[int],
        order_lines: list[order_models.OrderLine],
        variant_errors: list[dict[str, Any]],
        error_checks: list[callable],
    ) -> set[int]:
        """Generic handler to apply multiple error checks for variants."""
        for check in error_checks:
            variant_ids_set = check(variant_ids_set, order_lines, variant_errors)
        return variant_ids_set

    @classmethod
    def _filter_order_lines_by_variant(
        cls, order_lines: list[order_models.OrderLine], variant_ids_set: set[int]
    ) -> list[order_models.OrderLine]:
        """Return only the order lines whose variants are in the provided variant set."""
        return [line for line in order_lines if line.variant_id in variant_ids_set]

    @classmethod
    def _handle_variant_availability_checks(
        cls,
        variant_ids_set: set[int],
        channel_id: int,
        order_lines: list[order_models.OrderLine],
        variant_errors: list[dict[str, Any]],
    ) -> set[int]:
        error_checks = [
            lambda ids, lines, errors: cls.handle_not_available_variants_in_channel(
                ids, channel_id, lines, errors
            ),
            lambda ids, lines, errors: cls.handle_not_published_variants(
                ids, channel_id, lines, errors
            ),
            lambda ids, lines, errors: cls.handle_not_available_variants_for_purchase(
                ids, channel_id, lines, errors
            ),
        ]
        return cls._handle_variant_errors(
            variant_ids_set, order_lines, variant_errors, error_checks
        )

    @classmethod
    def exclude_lines_unavailable_to_purchase(
        cls,
        order: order_models.Order,
        order_lines: list[order_models.OrderLine],
        global_quantity_limit: Optional[int],
    ) -> tuple[set[int], list[order_models.OrderLine], list[dict[str, Any]]]:
        variant_errors = []
        variant_ids_set = {line.variant_id for line in order_lines if line.variant_id}
        channel_id = order.channel_id

        cls.handle_not_found_variants(order_lines, variant_errors)
        order_lines = [line for line in order_lines if line.variant_id]

        variant_ids_set = cls._handle_variant_availability_checks(
            variant_ids_set, channel_id, order_lines, variant_errors
        )
        order_lines = cls._filter_order_lines_by_variant(order_lines, variant_ids_set)

        variant_ids_set = cls.handle_variants_exceeding_quantity_limit(
            variant_ids_set, order_lines, variant_errors, global_quantity_limit
        )
        order_lines = cls._filter_order_lines_by_variant(order_lines, variant_ids_set)

        return variant_ids_set, order_lines, variant_errors

    @classmethod
    def clean_order_lines(
        cls,
        order: order_models.Order,
        order_lines: list[order_models.OrderLine],
        site: Site,
    ):
        variant_ids_set, available_order_lines, variant_errors = (
            cls.exclude_lines_unavailable_to_purchase(
                order=order,
                order_lines=order_lines,
                global_quantity_limit=site.settings.limit_quantity_per_checkout,
            )
        )

        variants = product_models.ProductVariant.objects.select_related(
            "product__product_type"
        ).filter(id__in=variant_ids_set)
        variants, quantities = get_variants_and_total_quantities(
            variants,
            [
                CheckoutLineData(
                    variant_id=str(line.variant_id), quantity=line.quantity
                )
                for line in available_order_lines
            ],
        )

        country = (
            order.shipping_address.country.code
            if order.shipping_address
            else order.channel.default_country
        )

        try:
            check_stock_and_preorder_quantity_bulk(
                variants,
                country,
                quantities,
                order.channel.slug,
                site.settings.limit_quantity_per_checkout,
                check_reservations=is_reservation_enabled(site.settings),
            )
            return variants, available_order_lines, variant_errors
        except InsufficientStock as e:
            return cls._handle_insufficient_stock_error(
                e, available_order_lines, variant_ids_set, variant_errors
            )

    @classmethod
    def _handle_insufficient_stock_error(
        cls,
        error: InsufficientStock,
        available_order_lines: list[order_models.OrderLine],
        variant_ids_set: set[int],
        variant_errors: list[dict[str, Any]],
    ):
        variants_with_insufficient_stock = {
            item.variant.pk: item for item in error.items if item.variant
        }
        variant_ids_set -= set(variants_with_insufficient_stock.keys())
        error_codes = CheckoutCreateFromOrderUnavailableVariantErrorCode

        for line in available_order_lines:
            variant_id = line.variant_id
            insufficient_stock_variant = variants_with_insufficient_stock.get(
                variant_id
            )
            if insufficient_stock_variant:
                msg = f"Could not add items {insufficient_stock_variant.variant}. Only {max(insufficient_stock_variant.available_quantity, 0)} remaining in stock."
                variant_errors.append(
                    {
                        "message": msg,
                        "code": error_codes.INSUFFICIENT_STOCK.value,
                        "variant_id": line.product_variant_id,
                        "line_id": graphene.Node.to_global_id("OrderLine", line.pk),
                    }
                )
        variants = product_models.ProductVariant.objects.filter(id__in=variant_ids_set)
        return (
            variants,
            [
                line
                for line in available_order_lines
                if line.variant_id in variant_ids_set
            ],
            variant_errors,
        )

    @classmethod
    def create_checkout(cls, info: ResolveInfo, order: order_models.Order):
        user = info.context.user
        checkout = checkout_models.Checkout(
            channel_id=order.channel_id,
            currency=order.currency,
            user=user if user else None,
            email=user.email if user else None,
        )
        checkout.save()
        return checkout

    @classmethod
    def mutate_and_get_payload(cls, info, **input):
        site = get_site_promise(info.context).get()
        order = cls.get_node_or_error(
            info,
            input.get("id"),
            field="id",
            only_type=Order,
            code=CheckoutCreateFromOrderErrorCode.ORDER_NOT_FOUND.value,
        )

        order_lines = order.lines.prefetch_related("variant").all()
        checkout = cls.create_checkout(info, order)

        variants, valid_order_lines, variant_errors = cls.clean_order_lines(
            order, order_lines, site
        )

        if variants and valid_order_lines:
            add_variants_to_checkout(
                checkout,
                variants,
                [
                    CheckoutLineData(
                        variant_id=str(line.variant_id), quantity=line.quantity
                    )
                    for line in valid_order_lines
                ],
                order.channel,
                site.settings.limit_quantity_per_checkout,
                reservation_length=get_reservation_length(
                    site=site, user=info.context.user
                ),
            )

        return CheckoutCreateFromOrder(
            checkout=checkout, unavailable_variants=variant_errors
        )


class CheckoutAddressValidationRules(InputObjectType):
    check_required_fields = graphene.Boolean(
        description=(
            "Determines if an error should be raised when the provided address doesn't "
            "have all the required fields. The list of required fields is dynamic and "
            "depends on the country code (use the `addressValidationRules` query to "
            "fetch them). Note: country code is mandatory for all addresses regardless "
            "of the rules provided in this input."
        ),
        default_value=True,
    )
    check_fields_format = graphene.Boolean(
        description=(
            "Determines if an error should be raised when the provided address doesn't "
            "match the expected format. Example: using letters for postal code when "
            "the numbers are expected."
        ),
        default_value=True,
    )
    enable_fields_normalization = graphene.Boolean(
        description=(
            "Determines if  should apply normalization on address fields. "
            "Example: converting city field to uppercase letters."
        ),
        default_value=True,
    )

    class Meta:
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutValidationRules(InputObjectType):
    shipping_address = CheckoutAddressValidationRules(
        description=(
            "The validation rules that can be applied to provided shipping address"
            " data."
        )
    )
    billing_address = CheckoutAddressValidationRules(
        description=(
            "The validation rules that can be applied to provided billing address"
            " data."
        )
    )

    class Meta:
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutLineInput(InputObjectType):
    quantity = graphene.Int(required=True, description="The number of items purchased.")
    variant_id = graphene.ID(required=True, description="ID of the product variant.")
    price = PositiveDecimal(
        required=False,
        description=(
            "Custom price of the item. Can be set only by apps "
            "with `HANDLE_CHECKOUTS` permission. When the line with the same variant "
            "will be provided multiple times, the last price will be used."
        ),
    )
    force_new_line = graphene.Boolean(
        required=False,
        default_value=False,
        description=(
            "Flag that allow force splitting the same variant into multiple lines "
            "by skipping the matching logic. "
        ),
    )
    metadata = graphene.List(MetadataInput, graphene.NonNull(graphene.String))


class CheckoutCreateInput(InputObjectType):
    channel = graphene.String(
        description="Slug of a channel in which to create a checkout."
    )
    lines = graphene.List(CheckoutLineInput, graphene.NonNull(graphene.String))

    email = graphene.String(description="The customer's email address.")
    shipping_address = AddressInput(
        description=(
            "The mailing address to where the checkout will be shipped. "
            "Note: the address will be ignored if the checkout "
            "doesn't contain shippable items."
        )
    )
    billing_address = AddressInput(description="Billing address of the customer.")
    language_code = graphene.Argument(
        LanguageCodeEnum, required=False, description="Checkout language code."
    )
    validation_rules = CheckoutValidationRules(
        required=False,
        description=("The checkout validation rules that can be changed."),
    )


class CheckoutCreate(relay.ClientIDMutation, I18nMixin):
    created = graphene.Field(
        graphene.Boolean,
        description=(
            "Whether the checkout was created or the current active one was returned. "
            "Refer to checkoutLinesAdd and checkoutLinesUpdate to merge a cart "
            "with an active checkout."
        ),
    )

    class Input:
        input = CheckoutCreateInput(
            required=True, description="Fields required to create checkout."
        )

    @classmethod
    def clean_checkout_lines(
        cls, info, lines, country, channel
    ) -> Tuple[List[product_models.ProductVariant], List["CheckoutLineData"]]:
        app, site = cls._get_app_and_site(info)
        check_permissions_for_custom_prices(app, lines)
        variants = cls._get_variants(lines)
        variant_db_ids = {variant.id for variant in variants}

        cls._validate_variants(variant_db_ids, channel)

        checkout_lines_data = group_lines_input_on_add(lines)
        variants, quantities = get_variants_and_total_quantities(
            variants, checkout_lines_data
        )

        cls._check_lines_quantity(variants, quantities, country, channel, site)
        return variants, checkout_lines_data

    @classmethod
    def _get_app_and_site(cls, info: ResolveInfo):
        """Helper function to retrieve app and site information."""
        return get_app_promise(info.context).get(), get_site_promise(info.context).get()

    @classmethod
    def _get_variants(cls, lines):
        """Helper function to retrieve product variants from input lines."""
        variant_ids = [line["variant_id"] for line in lines]
        return cls.get_nodes_or_error(
            variant_ids,
            "variant_id",
            ProductVariant,
            qs=product_models.ProductVariant.objects.prefetch_related(
                "product__product_type"
            ),
        )

    @classmethod
    def _validate_variants(cls, variant_db_ids, channel):
        """Helper function to validate variant availability."""
        validate_variants_available_for_purchase(variant_db_ids, channel.id)
        validate_variants_available_in_channel(
            variant_db_ids,
            channel.id,
            CheckoutErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
        )
        validate_variants_are_published(variant_db_ids, channel.id)

    @classmethod
    def _check_lines_quantity(cls, variants, quantities, country, channel, site):
        """Helper function to check stock and pre-order quantity."""
        check_lines_quantity(
            variants,
            quantities,
            country,
            channel.slug,
            site.settings.limit_quantity_per_checkout,
            check_reservations=is_reservation_enabled(site.settings),
        )

    @classmethod
    def _retrieve_address(cls, address_type: str, data: dict) -> Optional["Address"]:
        """Helper function to retrieve and validate an address (shipping or billing)."""
        address_validation_rules = data.get("validation_rules", {}).get(
            f"{address_type}_address", {}
        )
        address_data = data.get(f"{address_type}_address")
        if address_data is not None:
            return cls.validate_address(
                address_data,
                address_type=AddressType[ADDRESS_TYPE.upper()],
                format_check=address_validation_rules.get("check_fields_format", True),
                required_check=address_validation_rules.get(
                    "check_required_fields", True
                ),
                enable_normalization=address_validation_rules.get(
                    "enable_fields_normalization", True
                ),
            )
        return None

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance: models.Checkout, data, **kwargs):
        user = info.context.user
        channel = data.pop("channel")
        cleaned_input = super().clean_input(info, instance, data, **kwargs)

        cleaned_input.update(
            {
                "channel": channel,
                "currency": channel.currency_code,
                "shipping_address": cls._retrieve_address("shipping", data),
                "billing_address": cls._retrieve_address("billing", data),
                "language_code": data.get("language_code", settings.LANGUAGE_CODE),
            }
        )

        lines = data.pop("lines", None)
        if lines:
            country = (
                cleaned_input["shipping_address"].country.code
                if cleaned_input["shipping_address"]
                else channel.default_country
            )
            cleaned_input.update(
                cls.clean_checkout_lines(info, lines, country, channel)
            )

        # Use authenticated user's email as default email
        cleaned_input["email"] = data.pop("email", None) or (
            user.email if user else None
        )
        cleaned_input["country"] = (
            cleaned_input["shipping_address"].country.code
            if cleaned_input["shipping_address"]
            else channel.default_country
        )
        return cleaned_input

    @classmethod
    def save(cls, info, instance: models.Checkout, cleaned_input):
        with traced_atomic_transaction():
            instance.save()
            instance.set_country(cleaned_input["country"])

            if cleaned_input.get("variants") and cleaned_input.get("lines_data"):
                cls._add_variants_to_checkout(info, instance, cleaned_input)

            cls._save_addresses(instance, cleaned_input)
            instance.save()

    @classmethod
    def _add_variants_to_checkout(cls, info, instance: models.Checkout, cleaned_input):
        site = get_site_promise(info.context).get()
        add_variants_to_checkout(
            instance,
            cleaned_input["variants"],
            cleaned_input["lines_data"],
            cleaned_input["channel"],
            site.settings.limit_quantity_per_checkout,
            reservation_length=get_reservation_length(
                site=site, user=info.context.user
            ),
        )

    @classmethod
    def _save_addresses(cls, instance: models.Checkout, cleaned_input):
        """Helper function to save shipping and billing addresses."""
        shipping_address = cleaned_input.get("shipping_address")
        billing_address = cleaned_input.get("billing_address")

        if shipping_address and instance.is_shipping_required():
            shipping_address.save()
            instance.shipping_address = shipping_address.get_copy()

        if billing_address:
            billing_address.save()
            instance.billing_address = billing_address.get_copy()

    @classmethod
    def get_instance(cls, info, **data):
        instance = super().get_instance(info, **data)
        user = info.context.user
        if user:
            instance.user = user
        return instance

    @classmethod
    def mutate_and_get_payload(cls, info, **input):
        channel = clean_channel(input.get("channel"), error_class=CheckoutErrorCode)
        if channel:
            input["channel"] = channel

        return CheckoutCreate(channel=channel)


class CheckoutCustomerAttach(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(description="The checkout's ID.", required=False)
        token = UUID(description="Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            required=False, description="The ID of the checkout. Use `id` instead."
        )
        customer_id = graphene.ID(
            required=False,
            description=(
                "ID of customer to attach to checkout. "
                "Requires IMPERSONATE_USER permission when customerId is different "
                "than the logged-in user."
            ),
        )

    @classmethod
    def mutate_and_get_payload(cls, info, **input):
        checkout_id = input.get("checkout_id")
        token = input.get("token")
        id = input.get("id")
        customer_id = input.get("customer_id")

        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        # Raise error if checkout is already owned by another user
        if checkout.user_id:
            raise PermissionDenied(
                message="You cannot reassign a checkout that is already attached to a user."
            )

        user_id_from_request = None
        if user := info.context.user:
            user_id_from_request = graphene.Node.to_global_id("User", user.id)

        if customer_id and customer_id != user_id_from_request:
            requestor = get_user_or_app_from_context(info.context)
            if not requestor or not requestor.has_perm(
                AccountPermissions.IMPERSONATE_USER
            ):
                raise PermissionDenied(
                    permissions=[AccountPermissions.IMPERSONATE_USER]
                )
            customer = cls.get_node_or_error(info, customer_id, only_type=User)
        elif not info.context.user:
            raise ValidationError(
                {
                    "customer_id": ValidationError(
                        "The customerId value must be provided when running mutation as app.",
                        code=CheckoutErrorCode.REQUIRED.value,
                    )
                }
            )
        else:
            customer = info.context.user

        checkout.user = customer
        checkout.email = customer.email
        checkout.save(update_fields=["email", "user", "last_change"])

        return CheckoutCustomerAttach(checkout=checkout)


class CheckoutCustomerDetach(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(description="The checkout's ID.", required=False)
        token = UUID(description="Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            required=False, description="The ID of the checkout. Use `id` instead."
        )

    @classmethod
    def mutate_and_get_payload(cls, info, **input):
        checkout_id = input.get("checkout_id")
        token = input.get("token")
        id = input.get("id")

        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        requestor = get_user_or_app_from_context(info.context)
        if not requestor or not requestor.has_perm(AccountPermissions.IMPERSONATE_USER):
            # Raise error if the current user doesn't own the checkout
            if checkout.user and checkout.user != info.context.user:
                raise PermissionDenied(
                    permissions=[AccountPermissions.IMPERSONATE_USER]
                )

        checkout.user = None
        checkout.save(update_fields=["user", "last_change"])
        return CheckoutCustomerDetach(checkout=checkout)


class CheckoutDeliveryMethodUpdate(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(
            required=False,
        )
        token = UUID(
            required=False,
        )

        delivery_method_id = graphene.ID(
            description="Delivery Method ID (`Warehouse` ID or `ShippingMethod` ID).",
            required=False,
        )

    @classmethod
    def perform_on_shipping_method(
        cls,
        info,
        shipping_method_id,
        checkout_info,
        lines,
        checkout,
    ):
        shipping_method = cls.get_node_or_error(
            info,
            shipping_method_id,
            only_type=ShippingMethod,
            field="delivery_method_id",
            qs=shipping_models.ShippingMethod.objects.prefetch_related(
                "postal_code_rules"
            ),
        )

        listing = shipping_models.ShippingMethodChannelListing.objects.filter(
            shipping_method=shipping_method,
            channel=checkout_info.channel,
        ).first()
        if not listing:
            raise ValidationError(
                {
                    "delivery_method_id": ValidationError(
                        "This shipping method is not applicable in the given channel.",
                        code=CheckoutErrorCode.DELIVERY_METHOD_NOT_APPLICABLE.value,
                    )
                }
            )
        delivery_method = convert_to_shipping_method_data(shipping_method, listing)

        cls._check_delivery_method(
            checkout_info, lines, shipping_method=delivery_method, collection_point=None
        )

        cls._update_delivery_method(
            checkout_info,
            lines,
            shipping_method=shipping_method,
            external_shipping_method=None,
            collection_point=None,
        )
        return CheckoutDeliveryMethodUpdate(checkout=checkout)

    @classmethod
    def perform_on_external_shipping_method(
        cls,
        info,
        shipping_method_id,
        checkout_info,
        lines,
        checkout,
    ):
        delivery_method = get_shipping_method(
            checkout=checkout,
            channel_slug=checkout.channel.slug,
            shipping_method_id=shipping_method_id,
        )

        if delivery_method is None and shipping_method_id:
            raise ValidationError(
                {
                    "delivery_method_id": ValidationError(
                        f"Couldn't resolve to a node: ${shipping_method_id}",
                        code=CheckoutErrorCode.NOT_FOUND.value,
                    )
                }
            )

        cls._check_delivery_method(
            checkout_info, lines, shipping_method=delivery_method, collection_point=None
        )

        cls._update_delivery_method(
            checkout_info,
            lines,
            shipping_method=None,
            external_shipping_method=delivery_method,
            collection_point=None,
        )
        return CheckoutDeliveryMethodUpdate(checkout=checkout)

    @classmethod
    def perform_on_collection_point(
        cls,
        info,
        collection_point_id,
        checkout_info,
        lines,
        checkout,
    ):
        collection_point = cls.get_node_or_error(
            info,
            collection_point_id,
            only_type=Warehouse,
            field="delivery_method_id",
            qs=warehouse_models.Warehouse.objects.select_related("address"),
        )
        cls._check_delivery_method(
            checkout_info,
            lines,
            shipping_method=None,
            collection_point=collection_point,
        )
        cls._update_delivery_method(
            checkout_info,
            lines,
            shipping_method=None,
            external_shipping_method=None,
            collection_point=collection_point,
        )
        return CheckoutDeliveryMethodUpdate(checkout=checkout)

    @staticmethod
    def _check_delivery_method(
        checkout_info,
        lines,
        *,
        shipping_method: Optional[shipping_interface.ShippingMethodData],
        collection_point: Optional[Warehouse],
    ) -> None:
        delivery_method = shipping_method
        error_msg = "This shipping method is not applicable."

        if collection_point is not None:
            delivery_method = collection_point
            error_msg = "This pick up point is not applicable."

        delivery_method_is_valid = clean_delivery_method(
            checkout_info=checkout_info, lines=lines, method=delivery_method
        )
        if not delivery_method_is_valid:
            raise ValidationError(
                {
                    "delivery_method_id": ValidationError(
                        error_msg,
                        code=CheckoutErrorCode.DELIVERY_METHOD_NOT_APPLICABLE.value,
                    )
                }
            )

    @classmethod
    def _update_delivery_method(
        cls,
        checkout_info: "CheckoutInfo",
        lines: Iterable["CheckoutLineInfo"],
        *,
        shipping_method: Optional[ShippingMethod],
        external_shipping_method: Optional[shipping_interface.ShippingMethodData],
        collection_point: Optional[Warehouse],
    ) -> None:
        checkout = checkout_info.checkout
        if external_shipping_method:
            set_external_shipping_id(
                checkout=checkout, app_shipping_id=external_shipping_method.id
            )
        else:
            delete_external_shipping_id(checkout=checkout)
        checkout.shipping_method = shipping_method
        checkout.collection_point = collection_point
        invalidate_prices_updated_fields = invalidate_checkout_prices(
            checkout_info, lines, manager, save=False
        )
        checkout.save(
            update_fields=[
                "shipping_method",
                "collection_point",
            ]
            + invalidate_prices_updated_fields
        )
        get_or_create_checkout_metadata(checkout).save()

    @staticmethod
    def _resolve_delivery_method_type(id_) -> Optional[str]:
        if id_ is None:
            return None

        possible_types = ("Warehouse", "ShippingMethod", APP_ID_PREFIX)
        type_, id_ = from_global_id_or_error(id_)
        str_type = str(type_)

        if str_type not in possible_types:
            raise ValidationError(
                {
                    "delivery_method_id": ValidationError(
                        "ID does not belong to Warehouse or ShippingMethod",
                        code=CheckoutErrorCode.INVALID.value,
                    )
                }
            )

        return str_type

    @classmethod
    def mutate_and_get_payload(self, info, **input):
        checkout = get_checkout(cls, info, checkout_id=None, token=token, id=id)

        lines, unavailable_variant_pks = fetch_checkout_lines(checkout)
        if unavailable_variant_pks:
            not_available_variants_ids = {
                graphene.Node.to_global_id("ProductVariant", pk)
                for pk in unavailable_variant_pks
            }
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Some of the checkout lines variants are unavailable.",
                        code=CheckoutErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
                        params={"variants": not_available_variants_ids},
                    )
                }
            )

        if not is_shipping_required(lines):
            raise ValidationError(
                {
                    "delivery_method": ValidationError(
                        ERROR_DOES_NOT_SHIP,
                        code=CheckoutErrorCode.SHIPPING_NOT_REQUIRED.value,
                    )
                }
            )
        type_name = cls._resolve_delivery_method_type(delivery_method_id)

        checkout_info = fetch_checkout_info(checkout, lines, manager)
        if type_name == "Warehouse":
            return cls.perform_on_collection_point(
                info, delivery_method_id, checkout_info, lines, checkout, manager
            )
        if type_name == "ShippingMethod":
            return cls.perform_on_shipping_method(
                info, delivery_method_id, checkout_info, lines, checkout, manager
            )
        return cls.perform_on_external_shipping_method(
            info, delivery_method_id, checkout_info, lines, checkout, manager
        )


class CheckoutEmailUpdate(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(required=False)
        token = UUID(required=False)
        email = graphene.String(required=True, description="Email address.")

    @staticmethod
    def clean_email(email):
        if not email:
            raise ValidationError({"email": "This field cannot be blank."})

    @classmethod
    def mutate_and_get_payload(cls, info, id, **input):
        cls.clean_email(input["email"])

        checkout = get_checkout(
            cls, info, input.get("checkout_id"), input.get("token"), input.get("id")
        )
        checkout.email = input["email"]
        checkout.save(update_fields=["email", "last_change"])

        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.checkout_updated, checkout)

        return cls(checkout=checkout)


class CheckoutLanguageCodeUpdate(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(required=False)
        token = UUID(required=False)
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="New language code."
        )

    @classmethod
    def mutate_and_get_payload(cls, info, **input):
        checkout = get_checkout(
            cls, info, input.get("checkout_id"), input.get("token"), input.get("id")
        )
        checkout.language_code = input["language_code"]
        checkout.save(update_fields=["language_code", "last_change"])

        return CheckoutDeliveryMethodUpdate(checkout=checkout)


class CheckoutLineDelete(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(description=f"The checkout's ID.", required=False)
        token = UUID(description=f"Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            description=f"The ID of the checkout.  Use `id` instead.", required=False
        )
        line_id = graphene.ID(
            description="ID of the checkout line to delete.", required=True
        )

    @classmethod
    def mutate_and_get_payload(
        cls, info, id, checkout_id=None, token=None, line_id=None
    ):
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)
        line = cls.get_node_or_error(
            info, line_id, only_type=CheckoutLine, field="line_id"
        )

        if line and line in checkout.lines.all():
            line.delete()

        lines, _ = fetch_checkout_lines(checkout)
        checkout_info = fetch_checkout_info(checkout, lines)

        update_checkout_shipping_method_if_invalid(checkout_info, lines)
        invalidate_checkout_prices(checkout_info, lines, manager, save=True)
        cls.call_event(manager.checkout_updated, checkout)

        return CheckoutLineDelete(checkout=checkout)


class CheckoutLinesAdd(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(required=False)
        token = UUID(description=f"Checkout token.  Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            description=f"The ID of the checkout.  Use `id` instead.", required=False
        )
        lines = graphene.List(CheckoutLineInput, graphene.NonNull(graphene.String))

    @classmethod
    def validate_checkout_lines(
        cls,
        info,
        variants,
        checkout_lines_data,
        country,
        channel_slug,
        delivery_method_info,
        lines=None,
    ):
        variants, quantities = get_variants_and_total_quantities(
            variants, checkout_lines_data
        )
        site = get_site_promise(info.context).get()

        check_lines_quantity(
            variants,
            quantities,
            country,
            channel_slug,
            site.settings.limit_quantity_per_checkout,
            delivery_method_info=delivery_method_info,
            existing_lines=lines,
            check_reservations=is_reservation_enabled(site.settings),
        )

    @classmethod
    def clean_input(
        cls,
        info,
        checkout,
        variants,
        checkout_lines_data,
        checkout_info,
        lines,
        manager,
        replace,
    ):
        channel_slug = checkout_info.channel.slug

        cls.validate_checkout_lines(
            info,
            variants,
            checkout_lines_data,
            checkout.get_country(),
            channel_slug,
            checkout_info.delivery_method_info,
            lines=lines,
        )

        variants_ids_to_validate = {
            variant.id
            for variant, line_data in zip(variants, checkout_lines_data)
            if line_data.quantity_to_update and line_data.quantity != 0
        }

        if variants_ids_to_validate:
            validate_variants_available_for_purchase(
                variants_ids_to_validate, checkout.channel_id
            )
            validate_variants_available_in_channel(
                variants_ids_to_validate, checkout.channel_id
            )
            validate_variants_are_published(
                variants_ids_to_validate, checkout.channel_id
            )

        if variants and checkout_lines_data:
            site = get_site_promise(info.context).get()
            checkout = add_variants_to_checkout(
                checkout,
                variants,
                checkout_lines_data,
                checkout_info.channel,
                replace=replace,
                replace_reservations=True,
                reservation_length=get_reservation_length(
                    site=site, user=info.context.user
                ),
            )

        lines, _ = fetch_checkout_lines(checkout)
        shipping_channel_listings = checkout.channel.shipping_method_listings.all()
        update_delivery_method_lists_for_checkout_info(
            checkout_info,
            checkout_info.checkout.shipping_method,
            checkout_info.checkout.collection_point,
            checkout_info.shipping_address,
            lines,
            manager,
            shipping_channel_listings,
        )
        return lines

    @classmethod
    def mutate_and_get_payload(cls, info, id, checkout_id=None, token=None, lines=None):
        app = get_app_promise(info.context).get()
        check_permissions_for_custom_prices(app, lines)

        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)
        variants = cls._get_variants_from_lines_input(lines)

        shipping_channel_listings = checkout.channel.shipping_method_listings.all()
        checkout_info = fetch_checkout_info(
            checkout, [], manager, shipping_channel_listings
        )

        existing_lines_info, _ = fetch_checkout_lines(
            checkout, skip_lines_with_unavailable_variants=False
        )
        input_lines_data = cls._get_grouped_lines_data(lines, existing_lines_info)

        lines = cls.clean_input(
            info,
            checkout,
            variants,
            input_lines_data,
            checkout_info,
            existing_lines_info,
            manager,
            replace=False,
        )

        update_checkout_shipping_method_if_invalid(checkout_info, lines)
        invalidate_checkout_prices(checkout_info, lines, manager, save=True)
        cls.call_event(manager.checkout_updated, checkout)

        return CheckoutLinesAdd(checkout=checkout)

    @classmethod
    def _get_variants_from_lines_input(cls, lines):
        variant_ids = [line.get("variant_id") for line in lines]
        return cls.get_nodes_or_error(variant_ids, "variant_id", ProductVariant)

    @classmethod
    def _get_grouped_lines_data(cls, lines, existing_lines_info):
        return group_lines_input_on_add(lines, existing_lines_info)


class CheckoutLinesDelete(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(
            description="The checkout's ID.",
            required=False,
        )
        token = UUID(
            description=f"Checkout token. Use `id` instead.",
            required=False,
        )
        lines_ids = graphene.List(graphene.ID, graphene.NonNull(graphene.String))

    @classmethod
    def validate_lines(cls, checkout, lines_to_delete):
        lines = checkout.lines.all()
        all_lines_ids = [str(line.id) for line in lines]
        invalid_line_ids = list()
        for line_to_delete in lines_to_delete:
            if line_to_delete not in all_lines_ids:
                line_to_delete = graphene.Node.to_global_id(
                    "CheckoutLine", line_to_delete
                )
                invalid_line_ids.append(line_to_delete)

        if invalid_line_ids:
            raise ValidationError(
                {
                    "line_id": ValidationError(
                        "Provided line_ids aren't part of checkout.",
                        params={"lines": invalid_line_ids},
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(self, info, id):
        checkout = get_checkout(cls, info, checkout_id=None, token=token, id=id)

        _, lines_to_delete = resolve_global_ids_to_primary_keys(
            lines_ids, graphene_type="CheckoutLine", raise_error=True
        )
        cls.validate_lines(checkout, lines_to_delete)
        checkout.lines.filter(id__in=lines_to_delete).delete()

        lines, _ = fetch_checkout_lines(checkout)

        manager = get_plugin_manager_promise(info.context).get()
        checkout_info = fetch_checkout_info(checkout, lines, manager)
        update_checkout_shipping_method_if_invalid(checkout_info, lines)
        invalidate_checkout_prices(checkout_info, lines, manager, save=True)
        cls.call_event(manager.checkout_updated, checkout)

        return CheckoutLinesDelete(checkout=checkout)


class CheckoutLineUpdateInput(BaseInputObjectType):
    variant_id = graphene.ID(
        required=False,
        description=(f"ID of the product variant. Use `lineId` instead."),
    )
    quantity = graphene.Int(
        required=False,
        description=(
            "The number of items purchased. "
            "Optional for apps, required for any other users."
        ),
    )
    price = PositiveDecimal(
        required=False,
        description=(
            "Custom price of the item. Can be set only by apps "
            "with `HANDLE_CHECKOUTS` permission. When the line with the same variant "
            "will be provided multiple times, the last price will be used."
        ),
    )
    line_id = graphene.ID(
        description="ID of the line.",
        required=False,
    )


class CheckoutLinesUpdate(CheckoutLinesAdd):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(description="The checkout's ID.", required=False)
        token = UUID(description=f"Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            description=f"The ID of the checkout.  Use `id` instead.", required=False
        )
        lines = graphene.List(
            CheckoutLineUpdateInput, graphene.NonNull(graphene.String)
        )

    @classmethod
    def validate_checkout_lines(
        cls,
        info,
        variants,
        checkout_lines_data,
        country,
        channel_slug,
        delivery_method_info,
        lines=None,
    ):
        variants, quantities = get_variants_and_total_quantities(
            variants, checkout_lines_data, quantity_to_update_check=True
        )
        site = get_site_promise(info.context).get()

        check_lines_quantity(
            variants,
            quantities,
            country,
            channel_slug,
            site.settings.limit_quantity_per_checkout,
            delivery_method_info=delivery_method_info,
            allow_zero_quantity=True,
            existing_lines=lines,
            replace=True,
            check_reservations=is_reservation_enabled(site.settings),
        )

    @classmethod
    def clean_input(
        cls,
        info,
        checkout,
        variants,
        checkout_lines_data,
        checkout_info,
        lines,
        manager,
        replace,
    ):
        app = get_app_promise(info.context).get()

        if not app and any(
            line_data.quantity_to_update is False for line_data in checkout_lines_data
        ):
            raise ValidationError(
                {
                    "quantity": ValidationError(
                        "The quantity is required for all lines.",
                        code=CheckoutErrorCode.REQUIRED.value,
                    )
                }
            )

        return super().clean_input(
            info,
            checkout,
            variants,
            checkout_lines_data,
            checkout_info,
            lines,
            manager,
            replace,
        )

    @classmethod
    def mutate_and_get_payload(cls, info, id):
        for line in lines:
            validate_one_of_args_is_in_mutation(
                "line_id", line.get("line_id"), "variant_id", line.get("variant_id")
            )

        return CheckoutLinesDelete(
            lines=lines, checkout_id=checkout_id, token=token, id=id, replace=True
        )

    @classmethod
    def _get_variants_from_lines_input(cls, lines: List[Dict]) -> List[ProductVariant]:
        variant_ids = {
            line.get("variant_id") for line in lines if line.get("variant_id")
        }
        line_ids = [line.get("line_id") for line in lines if line.get("line_id")]

        if line_ids:
            lines_instances = cls.get_nodes_or_error(line_ids, "line_id", CheckoutLine)
            variant_ids.update(
                {
                    graphene.Node.to_global_id("ProductVariant", line.variant_id)
                    for line in lines_instances
                }
            )

        return cls.get_nodes_or_error(variant_ids, "variant_id", ProductVariant)

    @classmethod
    def _get_grouped_lines_data(cls, lines, existing_lines_info):
        return group_lines_input_data_on_update(lines, existing_lines_info)


class CheckoutRemovePromoCode(relay.ClientIDMutation):
    checkout = graphene.Field(
        CheckoutNode, description="The checkout with the removed gift card or voucher."
    )

    class Input:
        id = graphene.ID(description="The checkout's ID.", required=False)
        token = UUID(description=f"Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            description=f"The ID of the checkout. Use `id` instead.", required=False
        )
        promo_code = graphene.String(
            description="Gift card code or voucher code.", required=False
        )
        promo_code_id = graphene.ID(
            description="Gift card or voucher ID.", required=False
        )

    @classmethod
    def mutate_and_get_payload(cls, info, id):
        validate_one_of_args_is_in_mutation(
            "promo_code", promo_code, "promo_code_id", promo_code_id
        )

        object_type, promo_code_pk = cls.clean_promo_code_id(promo_code_id)
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        checkout_info = fetch_checkout_info(checkout, [])

        removed = False
        if promo_code:
            removed = remove_promo_code_from_checkout(checkout_info, promo_code)
        else:
            removed = cls.remove_promo_code_by_id(
                info, checkout, object_type, promo_code_pk
            )

        if removed:
            lines, _ = fetch_checkout_lines(checkout)
            invalidate_checkout_prices(
                checkout_info, lines, manager, recalculate_discount=False, save=True
            )
            cls.call_event(manager.checkout_updated, checkout)

        return CheckoutRemovePromoCode(checkout=checkout)

    @staticmethod
    def clean_promo_code_id(promo_code_id: Optional[str]):
        if promo_code_id is None:
            return None, None

        try:
            object_type, promo_code_pk = from_global_id_or_error(
                promo_code_id, raise_error=True
            )
        except GraphQLError as e:
            raise ValidationError(
                {
                    "promo_code_id": ValidationError(
                        str(e), code=CheckoutErrorCode.GRAPHQL_ERROR.value
                    )
                }
            )

        if object_type not in (str(Voucher), str(GiftCard)):
            raise ValidationError(
                {
                    "promo_code_id": ValidationError(
                        "Must receive Voucher or GiftCard id.",
                        code=CheckoutErrorCode.NOT_FOUND.value,
                    )
                }
            )

        return object_type, promo_code_pk

    @classmethod
    def remove_promo_code_by_id(cls, info, checkout, object_type, promo_code_pk):
        if object_type == str(Voucher) and checkout.voucher_code is not None:
            node = cls._get_node_by_pk(info, graphene_type=Voucher, pk=promo_code_pk)
            if node is None:
                raise ValidationError(
                    {
                        "promo_code_id": ValidationError(
                            f"Couldn't resolve to a node: {promo_code_pk}",
                            code=CheckoutErrorCode.NOT_FOUND.value,
                        )
                    }
                )
            if checkout.voucher_code == node.code:
                remove_voucher_from_checkout(checkout)
                return True
        else:
            checkout.gift_cards.remove(promo_code_pk)
            return True

        return False


class CheckoutShippingMethodUpdate(relay.ClientIDMutation):
    checkout = graphene.Field(CheckoutNode, description="An updated checkout.")

    class Input:
        id = graphene.ID(required=False)
        token = UUID(description=f"Checkout token. Use `id` instead.", required=False)
        checkout_id = graphene.ID(
            description=f"The ID of the checkout. Use `id` instead.", required=False
        )
        shipping_method_id = graphene.ID(required=True, description="Shipping method.")

    @staticmethod
    def _resolve_delivery_method_type(id_):
        if id_ is None:
            return None

        possible_types = ("ShippingMethod", APP_ID_PREFIX)
        type_, id_ = from_global_id_or_error(id_)
        if str(type_) not in possible_types:
            raise ValidationError(
                {
                    "shipping_method_id": ValidationError(
                        "ID does not belong to known shipping methods",
                        code=CheckoutErrorCode.INVALID.value,
                    )
                }
            )

        return str(type_)

    @classmethod
    def mutate_and_get_payload(cls, info, id):
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token, id=id)

        lines, unavailable_variant_pks = fetch_checkout_lines(checkout)
        if unavailable_variant_pks:
            not_available_variants_ids = {
                graphene.Node.to_global_id("ProductVariant", pk)
                for pk in unavailable_variant_pks
            }
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Some checkout lines variants are unavailable.",
                        code=CheckoutErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
                        params={"variants": not_available_variants_ids},
                    )
                }
            )

        checkout_info = fetch_checkout_info(checkout, lines, manager)
        if not is_shipping_required(lines):
            raise ValidationError(
                {
                    "shipping_method": ValidationError(
                        ERROR_DOES_NOT_SHIP,
                        code=CheckoutErrorCode.SHIPPING_NOT_REQUIRED.value,
                    )
                }
            )

        type_name = cls._resolve_delivery_method_type(shipping_method_id)
        if type_name == "ShippingMethod":
            return cls.perform_on_shipping_method(
                info, shipping_method_id, checkout_info, lines, checkout, manager
            )
        return cls.perform_on_external_shipping_method(
            info, shipping_method_id, checkout_info, lines, checkout, manager
        )

    @staticmethod
    def _check_delivery_method(checkout_info, lines, delivery_method):
        delivery_method_is_valid = clean_delivery_method(
            checkout_info=checkout_info, lines=lines, method=delivery_method
        )
        if not delivery_method_is_valid or not delivery_method:
            raise ValidationError(
                {
                    "shipping_method": ValidationError(
                        "This shipping method is not applicable.",
                        code=CheckoutErrorCode.SHIPPING_METHOD_NOT_APPLICABLE.value,
                    )
                }
            )

    @classmethod
    def perform_on_shipping_method(
        cls, info, shipping_method_id, checkout_info, lines, checkout, manager
    ):
        node = cls._get_node_by_pk(
            info, graphene_type=ShippingMethod, pk=shipping_method_id
        )
        if node is None:
            raise ValidationError(
                {
                    "shipping_method_id": ValidationError(
                        f"Couldn't resolve to a node: {shipping_method_id}",
                        code=CheckoutErrorCode.NOT_FOUND.value,
                    )
                }
            )

        delivery_method = convert_shipping_method_model_to_dataclass(node)
        cls._check_delivery_method(checkout_info, lines, delivery_method)

        checkout.shipping_method = node
        checkout.external_shipping_method_id = None
        update_checkout_shipping_method_if_invalid(checkout_info, node, lines, manager)
        checkout.save(
            update_fields=[
                "shipping_method",
                "external_shipping_method_id",
                "last_change",
            ]
        )

        recalculate_checkout_discount(manager, checkout_info, lines)
        manager.checkout_updated(checkout)
        return CheckoutShippingMethodUpdate(checkout=checkout)


class OrderCreateFromCheckoutError(Error):
    code = OrderCreateFromCheckoutErrorCode(
        description="The error code.", required=True
    )
    variants = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of variant IDs which causes the error.",
        required=False,
    )
    lines = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of line Ids which cause the error.",
        required=False,
    )


class OrderCreateFromCheckout(relay.ClientIDMutation):
    order = graphene.Field(OrderNode, description="Placed order.")

    class Input:
        id = graphene.ID(
            required=True,
            description="ID of a checkout that will be converted to an order.",
        )
        remove_checkout = graphene.Boolean(
            description="Determines if checkout should be removed after creating an order. Default true.",
            default_value=True,
        )
        private_metadata = NonNullList(
            MetadataInput,
            description="Fields required to update the checkout private metadata."
            + ADDED_IN_38,
            required=False,
        )
        metadata = NonNullList(
            MetadataInput,
            description="Fields required to update the checkout metadata."
            + ADDED_IN_38,
            required=False,
        )

    @classmethod
    def check_permissions(cls, context, permissions=None, **data):
        """Check if the app has the required permissions to perform this mutation."""
        permissions = permissions or cls._meta.permissions
        app = getattr(context, "app", None)
        return app.has_perms(permissions) if app else False

    @classmethod
    def mutate_and_get_payload(cls, info, id, **input):
        user = info.context.user
        checkout = cls.get_node_or_error(
            info,
            id,
            field="id",
            only_type=Checkout,
            code=OrderCreateFromCheckoutErrorCode.CHECKOUT_NOT_FOUND.value,
        )

        # Validate and process metadata if applicable
        cls._process_metadata(
            info, checkout, data.get("metadata"), data.get("private_metadata")
        )

        # Get necessary data for order creation
        tracking_code = analytics.get_client_id(info.context)
        manager = get_plugin_manager_promise(info.context).get()
        checkout_lines, unavailable_variant_pks = fetch_checkout_lines(checkout)
        checkout_info = fetch_checkout_info(checkout, checkout_lines, manager)

        # Validate checkout and its lines
        cls._validate_checkout(
            checkout_info, checkout_lines, unavailable_variant_pks, manager
        )

        # Try creating the order
        return cls._create_order(
            checkout_info,
            manager,
            user,
            tracking_code,
            data.get("remove_checkout"),
            data.get("metadata"),
            data.get("private_metadata"),
            info.context,
        )

    @classmethod
    def _process_metadata(cls, info, checkout, metadata, private_metadata):
        """Process and validate metadata for the checkout."""
        if cls._meta.support_meta_field and metadata:
            cls.check_metadata_permissions(info, checkout.id)
            cls.validate_metadata_keys(metadata)

        if cls._meta.support_private_meta_field and private_metadata:
            cls.check_metadata_permissions(info, checkout.id, private=True)
            cls.validate_metadata_keys(private_metadata)

    @classmethod
    def _validate_checkout(
        cls, checkout_info, checkout_lines, unavailable_variant_pks, manager
    ):
        """Validate the checkout and its associated lines."""
        validate_checkout(
            checkout_info=checkout_info,
            lines=checkout_lines,
            unavailable_variant_pks=unavailable_variant_pks,
        )

    @classmethod
    def _create_order(
        cls,
        checkout_info,
        manager,
        user,
        tracking_code,
        remove_checkout,
        metadata,
        private_metadata,
        context,
    ):
        """Create an order from the provided checkout information."""
        app = get_app_promise(context).get()

        try:
            order = create_order_from_checkout(
                checkout_info=checkout_info,
                user=user,
                app=app,
                tracking_code=tracking_code,
                delete_checkout=remove_checkout,
                metadata_list=metadata,
                private_metadata_list=private_metadata,
            )
        except NotApplicable:
            raise ValidationError(
                {
                    "voucher_code": ValidationError(
                        "Voucher not applicable",
                        code=OrderCreateFromCheckoutErrorCode.VOUCHER_NOT_APPLICABLE.value,
                    )
                }
            )
        except InsufficientStock as e:
            raise prepare_insufficient_stock_checkout_validation_error(e)
        except GiftCardNotApplicable as e:
            raise ValidationError({"gift_cards": e})

        return OrderCreateFromCheckout(order=order)


class CheckoutMutations(graphene.ObjectType):
    checkout_add_promo_code = CheckoutAddPromoCode.Field()
    checkout_billing_address_update = CheckoutBillingAddressUpdate.Field()
    checkout_complete = CheckoutComplete.Field()
    checkout_create = CheckoutCreate.Field()
    checkout_create_from_order = CheckoutCreateFromOrder.Field()
    checkout_customer_attach = CheckoutCustomerAttach.Field()
    checkout_customer_detach = CheckoutCustomerDetach.Field()
    checkout_email_update = CheckoutEmailUpdate.Field()
    checkout_line_delete = CheckoutLineDelete.Field(
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use `checkoutLinesDelete` instead."
        )
    )
    checkout_lines_delete = CheckoutLinesDelete.Field()
    checkout_lines_add = CheckoutLinesAdd.Field()
    checkout_lines_update = CheckoutLinesUpdate.Field()
    checkout_remove_promo_code = CheckoutRemovePromoCode.Field()
    checkout_payment_create = CheckoutPaymentCreate.Field()
    checkout_shipping_address_update = CheckoutShippingAddressUpdate.Field()
    checkout_shipping_method_update = CheckoutShippingMethodUpdate.Field(
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use `checkoutDeliveryMethodUpdate` instead."
        )
    )
    checkout_delivery_method_update = CheckoutDeliveryMethodUpdate.Field()
    checkout_language_code_update = CheckoutLanguageCodeUpdate.Field()

    order_create_from_checkout = OrderCreateFromCheckout.Field()
