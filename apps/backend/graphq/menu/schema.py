import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from ..channel import ChannelQsContext
from ..channel.utils import get_default_channel_slug_or_graphql_error
from ..core import ResolveInfo
from ..core.connection import create_connection_slice, filter_connection_queryset
from ..core.descriptions import DEPRECATED_IN_3X_FIELD
from ..core.fields import FilterConnectionField
from ..core.utils import from_global_id_or_error
from ..translations.mutations import MenuItemTranslate
from .filters import MenuFilterInput, MenuItemFilterInput
from .resolvers import (
    resolve_menu,
    resolve_menu_item,
    resolve_menu_items,
    resolve_menus,
)
from .sorters import MenuItemSortingInput, MenuSortingInput
from .types import Menu, MenuCountableConnection, MenuItem, MenuItemCountableConnection


class MenuQueries(graphene.ObjectType):
    menu = Node.Field(
        Menu,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        id=graphene.Argument(graphene.ID, description="ID of the menu."),
        name=graphene.Argument(graphene.String, description="The menu's name."),
        slug=graphene.Argument(graphene.String, description="The menu's slug."),
        description="Look up a navigation menu by ID or name.",
    )
    menus = DjangoFilterConnectionField(
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
    def resolve_menu_item(
        root,
        info,
        channel=None,
    ):
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

    def resolve_menu(_info, channel, menu_id=None, name=None, slug=None):
        validate_one_of_args_is_in_query("id", menu_id, "name", name, "slug", slug)
        menu = None
        if menu_id:
            _, id = from_global_id_or_error(menu_id, Menu)
            menu = models.Menu.objects.filter(id=id).first()
        if name:
            menu = models.Menu.objects.filter(name=name).first()
        if slug:
            menu = models.Menu.objects.filter(slug=slug).first()
        return ChannelContext(node=menu, channel_slug=channel) if menu else None

    def resolve_menus(_info, channel):
        return ChannelQsContext(qs=models.Menu.objects.all(), channel_slug=channel)

    def resolve_menu_item(id, channel):
        menu_item = models.MenuItem.objects.filter(pk=id).first()
        return (
            ChannelContext(node=menu_item, channel_slug=channel) if menu_item else None
        )

    def resolve_menu_items(_info):
        return models.MenuItem.objects.all()
