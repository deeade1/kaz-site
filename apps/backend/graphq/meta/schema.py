from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField


class MetaQueries(graphene.ObjectType):
    meta = Node.Field(
        Menu,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        id=graphene.Argument(graphene.ID, description="ID of the menu."),
        name=graphene.Argument(graphene.String, description="The menu's name."),
        slug=graphene.Argument(graphene.String, description="The menu's slug."),
        description="Look up a navigation menu by ID or name.",
    )
    metas = DjangoFilterConnectionField(
        MenuCountableConnection,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        sort_by=MenuSortingInput(description="Sort menus."),
        filter=MenuFilterInput(),
        description="List of the storefront's menus.",
    )
    menu_item = Node.Field(
        MenuItem,
        id=graphene.Argument(
            graphene.ID, description="ID of the menu item.", required=True
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="Look up a menu item by ID.",
    )
    menu_items = DjangoFilterConnectionField(
        MenuItemCountableConnection,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        sort_by=MenuItemSortingInput(description="Sort menus items."),
        filter=MenuItemFilterInput(description="Filtering options for menu items."),
        description="List of the storefronts's menu items.",
    )

    @staticmethod
    def resolve_menu(root, info, channel=None, **data):
        if channel is None:
            channel = get_default_channel_slug_or_graphql_error()
        return resolve_menu(
            info, channel, data.get("id"), data.get("name"), data.get("slug")
        )

    @staticmethod
    def resolve_menus(root, info, channel=None, **kwargs):
        if channel is None:
            channel = get_default_channel_slug_or_graphql_error()
        qs = resolve_menus(info, channel)
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs, MenuCountableConnection)

    @staticmethod
    def resolve_menu_item(root, info, channel=None, ):
        if channel is None:
            channel = get_default_channel_slug_or_graphql_error()
        _, id = from_global_id_or_error(id, MenuItem)
        return resolve_menu_item(id, channel)

    @staticmethod
    def resolve_menu_items(root, info, channel=None, **kwargs):
        if channel is None:
            channel = get_default_channel_slug_or_graphql_error()
        menu_items = resolve_menu_items(info)
        qs = ChannelQsContext(qs=menu_items, channel_slug=channel)
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs, MenuItemCountableConnection)


 if isinstance(instance, ModelWithMetadata):
        MODEL_TO_TYPE_MAP = {
            account_models.Address: account_types.Address,
            account_models.User: account_types.User,
            app_models.App: app_types.App,
            attribute_models.Attribute: attribute_types.Attribute,
            checkout_models.Checkout: checkout_types.Checkout,
            checkout_models.CheckoutMetadata: checkout_types.Checkout,
            checkout_models.CheckoutLine: checkout_types.CheckoutLine,
            discount_models.Sale: discount_types.Sale,
            discount_models.Voucher: discount_types.Voucher,
            giftcard_models.GiftCard: giftcard_types.GiftCard,
            invoice_models.Invoice: invoice_types.Invoice,
            menu_models.Menu: menu_types.Menu,
            menu_models.MenuItem: menu_types.MenuItem,
            order_models.Fulfillment: order_types.Fulfillment,
            order_models.Order: order_types.Order,
            order_models.OrderLine: order_types.OrderLine,
            page_models.Page: page_types.Page,
            page_models.PageType: page_types.PageType,
            payment_models.Payment: payment_types.Payment,
            payment_models.TransactionItem: payment_types.TransactionItem,
            product_models.Category: product_types.Category,
            product_models.Collection: product_types.Collection,
            product_models.DigitalContent: product_types.DigitalContent,
            product_models.Product: product_types.Product,
            product_models.ProductMedia: product_types.ProductMedia,
            product_models.ProductType: product_types.ProductType,
            product_models.ProductVariant: product_types.ProductVariant,
            shipping_models.ShippingMethod: shipping_types.ShippingMethodType,
            shipping_models.ShippingZone: shipping_types.ShippingZone,
            tax_models.TaxClass: tax_types.TaxClass,
            tax_models.TaxConfiguration: tax_types.TaxConfiguration,
            warehouse_models.Warehouse: warehouse_types.Warehouse,
        }
        return MODEL_TO_TYPE_MAP.get(instance.__class__, None), instance.pk

    elif dataclasses.is_dataclass(instance):
        DATACLASS_TO_TYPE_MAP = {ShippingMethodData: shipping_types.ShippingMethod}
        return DATACLASS_TO_TYPE_MAP.get(instance.__class__, None), instance.id
    raise ValueError(f"Unknown type: {instance.__class__}")


def resolve_metadata(metadata: dict):
    return sorted(
        [{"key": k, "value": v} for k, v in metadata.items()],
        key=itemgetter("key"),
    )


def check_private_metadata_privilege(root: ModelWithMetadata, info: ResolveInfo):
    item_type, item_id = resolve_object_with_metadata_type(root)
    if not item_type:
        raise NotImplementedError(
            f"Model {type(root)} can't be mapped to type with metadata. "
            "Make sure that model exists inside MODEL_TO_TYPE_MAP."
        )

    get_required_permission = PRIVATE_META_PERMISSION_MAP.get(item_type.__name__)
    if not get_required_permission:
        raise PermissionDenied()

    required_permissions = get_required_permission(info, item_id)

    if not isinstance(required_permissions, list):
        raise PermissionDenied()

    requester = get_user_or_app_from_context(info.context)
    if not requester or not one_of_permissions_or_auth_filter_required(
        info.context, required_permissions
    ):
        raise PermissionDenied()


def resolve_private_metadata(root: ModelWithMetadata, info: ResolveInfo):
    check_private_metadata_privilege(root, info)
    return resolve_metadata(root.private_metadata)
