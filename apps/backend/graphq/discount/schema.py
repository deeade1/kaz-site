import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphq.discount.types import SaleNode, VoucherNode, PromotionNode, PromotionRuleNode

from permission.enums import DiscountPermissions

from ..core.doc_category import DOC_CATEGORY_DISCOUNTS


from ..core.utils import from_global_id_or_error
from ..translations.mutations import SaleTranslate, VoucherTranslate
from .filters import SaleFilter, VoucherFilter



class VoucherFilterInput(FilterInputObjectType):
    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS
        filterset_class = VoucherFilter


class SaleFilterInput(FilterInputObjectType):
    class Meta:
        doc_category = DOC_CATEGORY_DISCOUNTS
        filterset_class = SaleFilter


class DiscountQueries(graphene.ObjectType):
    sale = Node.Field(
        SaleNode,
        id=graphene.Argument(graphene.ID, description="ID of the sale.", required=True),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="Look up a sale by ID.",
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
        doc_category=DOC_CATEGORY_DISCOUNTS,
    )
    sales = DjangoFilterConnectionField(
        SaleNode,
        filter=SaleFilterInput(description="Filtering options for sales."),
        sort_by=SaleSortingInput(description="Sort sales."),
        query=graphene.String(
            description=(
                "Search sales by name, value or type. "
                f"{DEPRECATED_IN_3X_INPUT} Use `filter.search` input instead."
            )
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="List of the shop's sales.",
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
        doc_category=DOC_CATEGORY_DISCOUNTS,
    )
    voucher = Node.Field(
        VoucherNode,
        id=graphene.Argument(
            graphene.ID, description="ID of the voucher.", required=True
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="Look up a voucher by ID.",
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
        doc_category=DOC_CATEGORY_DISCOUNTS,
    )
    vouchers = DjangoFilterConnectionField(
        VoucherNode,
        filter=VoucherFilterInput(description="Filtering options for vouchers."),
        sort_by=VoucherSortingInput(description="Sort vouchers."),
        query=graphene.String(
            description=(
                "Search vouchers by name or code. "
                f"{DEPRECATED_IN_3X_INPUT} Use `filter.search` input instead."
            )
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="List of the shop's vouchers.",
        permissions=[DiscountPermissions.MANAGE_DISCOUNTS],
        doc_category=DOC_CATEGORY_DISCOUNTS,
    )
    promotion = Node.Field()
    promotions = DjangoFilterConnectionField()

    @staticmethod
    def resolve_sale(root, info, id, channel=None):
        _, id = from_global_id_or_error(id, Sale)
        return resolve_sale(id, channel)

    @staticmethod
    def resolve_sales(root, info, channel=None, **kwargs):
        qs = resolve_sales(info, channel_slug=channel, **kwargs)
        kwargs["channel"] = channel
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs)

    @staticmethod
    def resolve_voucher(root, info, id, channel=None):
        _, id = from_global_id_or_error(id, Voucher)
        return resolve_voucher(id, channel)

    @staticmethod
    def resolve_vouchers(root, info, channel=None, **kwargs):
        qs = resolve_vouchers(info, channel_slug=channel, **kwargs)
        kwargs["channel"] = channel
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs)

    def resolve_voucher(id, channel):
        sale = models.Voucher.objects.filter(id=id).first()
        return ChannelContext(node=sale, channel_slug=channel) if sale else None

    def resolve_vouchers(info, channel_slug, **kwargs) -> ChannelQsContext:
        qs = models.Voucher.objects.all()
        if channel_slug:
            qs = qs.filter(channel_listings__channel__slug=channel_slug)

        # DEPRECATED: remove filtering by `query` argument when it's removed from the schema
        if query := kwargs.get("query"):
            qs = filter_voucher_search(qs, None, query)

        return ChannelQsContext(qs=qs, channel_slug=channel_slug)

    def resolve_sale(id, channel):
        sale = models.Sale.objects.filter(id=id).first()
        return ChannelContext(node=sale, channel_slug=channel) if sale else None

    def resolve_sales(info, channel_slug, **kwargs) -> ChannelQsContext:
        qs = models.Sale.objects.all()
        if channel_slug:
            qs = qs.filter(channel_listings__channel__slug=channel_slug)

        # DEPRECATED: remove filtering by `query` argument when it's removed from the schema
        if query := kwargs.get("query"):
            qs = filter_sale_search(qs, None, query)

        return ChannelQsContext(qs=qs, channel_slug=channel_slug)
