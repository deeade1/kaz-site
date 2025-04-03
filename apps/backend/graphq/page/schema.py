import graphene

v
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from ..core import ResolveInfo
from ..core.connection import (create_connection_slice,
                               filter_connection_queryset)
from ..core.doc_category import DOC_CATEGORY_PAGES
from ..core.fields import BaseField, FilterConnectionField
from ..core.utils import from_global_id_or_error
from ..translations.mutations import PageTranslate
from .bulk_mutations import PageBulkDelete, PageBulkPublish, PageTypeBulkDelete
from .filters import PageFilterInput, PageTypeFilterInput
from .mutations import (PageAttributeAssign, PageAttributeUnassign, PageCreate,
                        PageDelete, PageReorderAttributeValues, PageTypeCreate,
                        PageTypeDelete, PageTypeReorderAttributes,
                        PageTypeUpdate, PageUpdate)
from .resolvers import (resolve_page, resolve_page_type, resolve_page_types,
                        resolve_pages)
from .sorters import PageSortingInput, PageTypeSortingInput
from .types import (Page, PageCountableConnection, PageType,
                    PageTypeCountableConnection)


class PageQueries(graphene.ObjectType):
    page = Node.Field(
        Page,
        id=graphene.Argument(graphene.ID, description="ID of the page."),
        slug=graphene.String(description="The slug of the page."),
        description="Look up a page by ID or slug.",
        doc_category=DOC_CATEGORY_PAGES,
    )
    pages = DjangoFilterConnectionField(
        PageCountableConnection,
        sort_by=PageSortingInput(description="Sort pages."),
        filter=PageFilterInput(description="Filtering options for pages."),
        description="List of the shop's pages.",
        doc_category=DOC_CATEGORY_PAGES,
    )
    page_type = Node.Field(
        PageType,
        id=graphene.Argument(
            graphene.ID, description="ID of the page type.", required=True
        ),
        description="Look up a page type by ID.",
        doc_category=DOC_CATEGORY_PAGES,
    )
    page_types = DjangoFilterConnectionField(
        PageTypeCountableConnection,
        sort_by=PageTypeSortingInput(description="Sort page types."),
        filter=PageTypeFilterInput(description="Filtering options for page types."),
        description="List of the page types.",
        doc_category=DOC_CATEGORY_PAGES,
    )

    @staticmethod
    def resolve_page(_root, info, id=None, slug=None):
        return resolve_page(info, id, slug)

    @staticmethod
    def resolve_pages(_root, info, **kwargs):
        qs = resolve_pages(info)
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs, PageCountableConnection)

    @staticmethod
    def resolve_page_type(_root, info, *, id):
        _, id = from_global_id_or_error(id, PageType)
        return resolve_page_type(id)

    @staticmethod
    def resolve_page_types(_root, info, **kwargs):
        qs = resolve_page_types(info)
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs, PageTypeCountableConnection)
    
    def resolve_page(info, global_page_id=None, slug=None):
        validate_one_of_args_is_in_query("id", global_page_id, "slug", slug)
        requestor = get_user_or_app_from_context(info.context)

        if slug is not None:
            page = models.Page.objects.visible_to_user(requestor).filter(slug=slug).first()
        else:
            _type, page_pk = from_global_id_or_error(global_page_id, Page)
            page = models.Page.objects.visible_to_user(requestor).filter(pk=page_pk).first()
        return page


    def resolve_pages(info):
        requestor = get_user_or_app_from_context(info.context)
        return models.Page.objects.visible_to_user(requestor)


    def resolve_page_type(id):
        return models.PageType.objects.filter(id=id).first()


    def resolve_page_types(_info):
        return models.PageType.objects.all()



