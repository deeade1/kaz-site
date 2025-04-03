import graphene

from ...permission.enums import PluginsPermissions
from ..core import ResolveInfo
from ..core.connection import create_connection_slice
from ..core.fields import ConnectionField, PermissionsField
from ..core.tracing import traced_resolver
from .dataloaders import plugin_manager_promise_callback
from .filters import PluginFilterInput
from .mutations import PluginUpdate
from .resolvers import resolve_plugin, resolve_plugins
from .sorters import PluginSortingInput
from .types import Plugin, PluginCountableConnection


class PluginsQueries(graphene.ObjectType):
    plugin = PermissionsField(
        Plugin,
        id=graphene.Argument(
            graphene.ID, description="ID of the plugin.", required=True
        ),
        description="Look up a plugin by ID.",
        permissions=[
            PluginsPermissions.MANAGE_PLUGINS,
        ],
    )

    plugins = ConnectionField(
        PluginCountableConnection,
        filter=PluginFilterInput(description="Filtering options for plugins."),
        sort_by=PluginSortingInput(description="Sort plugins."),
        description="List of plugins.",
        permissions=[
            PluginsPermissions.MANAGE_PLUGINS,
        ],
    )

    @staticmethod
    @traced_resolver
    @plugin_manager_promise_callback
    def resolve_plugin(_root, _info: ResolveInfo, manager, **data):
        return resolve_plugin(data.get("id"), manager)

    @staticmethod
    @traced_resolver
    @plugin_manager_promise_callback
    def resolve_plugins(_root, info: ResolveInfo, manager, **kwargs):
        qs = resolve_plugins(manager, **kwargs)
        return create_connection_slice(qs, info, kwargs, PluginCountableConnection)


def hide_private_configuration_fields(configuration, config_structure):
    if not config_structure:
        return

    for field in configuration:
        name = field["name"]
        value = field["value"]
        if value is None:
            continue
        field_type = config_structure.get(name, {}).get("type")
        if field_type == ConfigurationTypeField.PASSWORD:
            field["value"] = "" if value else None

        if field_type in [
            ConfigurationTypeField.SECRET,
            ConfigurationTypeField.SECRET_MULTILINE,
        ]:
            if not value:
                field["value"] = None
            elif len(value) > 4:
                field["value"] = value[-4:]
            else:
                field["value"] = value[-1:]


def aggregate_plugins_configuration(
    manager,
) -> Tuple[Dict[str, BasePlugin], Dict[str, List[BasePlugin]]]:
    plugins_per_channel: Dict[str, List[BasePlugin]] = defaultdict(list)
    global_plugins: Dict[str, BasePlugin] = {}

    for plugin in manager.all_plugins:
        hide_private_configuration_fields(plugin.configuration, plugin.CONFIG_STRUCTURE)
        if plugin.HIDDEN is True:
            continue
        if not getattr(plugin, "CONFIGURATION_PER_CHANNEL", False):
            global_plugins[plugin.PLUGIN_ID] = plugin
        else:
            plugins_per_channel[plugin.PLUGIN_ID].append(plugin)
    return global_plugins, plugins_per_channel


def resolve_plugin(id, manager):
    global_plugins, plugins_per_channel = aggregate_plugins_configuration(manager)
    plugin: BasePlugin = manager.get_plugin(id)
    if not plugin or plugin.HIDDEN is True:
        return None

    return Plugin(
        id=plugin.PLUGIN_ID,
        global_configuration=global_plugins.get(plugin.PLUGIN_ID),
        channel_configurations=plugins_per_channel.get(plugin.PLUGIN_ID),
        description=plugin.PLUGIN_DESCRIPTION,
        name=plugin.PLUGIN_NAME,
    )


def resolve_plugins(manager, sort_by=None, **kwargs):
    global_plugins, plugins_per_channel = aggregate_plugins_configuration(manager)
    plugin_filter = kwargs.get("filter", {})
    search_query = plugin_filter.get("search")
    filter_status_in_channel = plugin_filter.get("status_in_channels")
    filter_plugin_type = plugin_filter.get("type")

    plugins = [
        Plugin(
            id=plugin.PLUGIN_ID,
            global_configuration=plugin,
            channel_configurations=None,
            description=plugin.PLUGIN_DESCRIPTION,
            name=plugin.PLUGIN_NAME,
        )
        for _, plugin in global_plugins.items()
    ]

    plugins.extend(
        [
            Plugin(
                id=plugin_id,
                global_configuration=None,
                channel_configurations=plugins,
                description=plugins[0].PLUGIN_DESCRIPTION,
                name=plugins[0].PLUGIN_NAME,
            )
            for plugin_id, plugins in plugins_per_channel.items()
        ]
    )

    if filter_status_in_channel is not None:
        plugins = filter_plugin_status_in_channels(plugins, filter_status_in_channel)
    if filter_plugin_type is not None:
        plugins = filter_plugin_by_type(plugins, filter_plugin_type)
    plugins = filter_plugin_search(plugins, search_query)
    plugins = sort_plugins(plugins, sort_by)

    return plugins
