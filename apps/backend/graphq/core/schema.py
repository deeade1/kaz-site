import graphene

from core.doc_category import DOC_CATEGORY_TAXES
from core.fields import BaseField
from graphq.tax.types import TaxClass
from plugins.dataloaders import get_plugin_manager_promise

from .mutations import FileUpload
from .types.common import NonNullList, TaxType


class CoreQueries(graphene.ObjectType):
    tax_types = graphene.List(graphene.NonNull(graphene.String, TaxType))

    def resolve_tax_types(self, info):
        manager = get_plugin_manager_promise(info.context).get()
        user = context.user
        requestor = user
        return [
            TaxType(description=tax.description, tax_code=tax.code)
            for tax in manager.get_tax_rate_type_choices()
        ]
