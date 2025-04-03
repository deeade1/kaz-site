from typing import TYPE_CHECKING, Optional

import graphene
from promise import Promise

from checkout import calculations, models
from checkout.base_calculations import (
    calculate_undiscounted_base_line_total_price,
    calculate_undiscounted_base_line_unit_price,
)
from checkout.calculations import fetch_checkout_data
from checkout.utils import get_valid_collection_points_for_checkout
from core.taxes import zero_money, zero_taxed_money
from core.utils.lazyobjects import unwrap_lazy
from graphq.core.types import Money, TaxedMoney
from graphq.giftcard.types import GiftCardNode
from graphq.payment.types import TransactionItemNode
from graphq.product.types import ProductTypeNode
from graphq.shipping.types import ShippingMethodNode
from graphq.tax.types import (
    TaxClassNode,
    TaxConfigurationNode,
    TaxConfigurationPerCountryNode,
)
from graphq.warehouse.types import WarehouseNode
from shipping.interface import ShippingMethodData
from tax.utils import get_display_gross_prices
from warehouse import models as warehouse_models
from warehouse.reservations import is_reservation_enabled

from ...permission.enums import (
    AccountPermissions,
    CheckoutPermissions,
    PaymentPermissions,
)
from ..account.dataloaders import AddressByIdLoader
from ..account.utils import check_is_owner_or_has_one_of_perms
from ..channel import ChannelContext
from ..channel.types import Channel
from ..core.doc_category import DOC_CATEGORY_CHECKOUT, DOC_CATEGORY_PAYMENTS
from ..core.enums import LanguageCodeEnum
from ..core.scalars import UUID
from ..core.tracing import traced_resolver
from ..core.utils import str_to_enum
from ..decorators import one_of_permissions_required
from ..giftcard.dataloaders import GiftCardsByCheckoutIdLoader
from ..meta import resolvers as MetaResolvers
from ..meta.types import ObjectWithMetadata, _filter_metadata
from ..plugins.dataloaders import (
    get_plugin_manager_promise,
    plugin_manager_promise_callback,
)
from ..site.dataloaders import load_site_callback
from ..utils import get_user_or_app_from_context
from ..warehouse.dataloaders import StocksReservationsByCheckoutTokenLoader
from .enums import CheckoutAuthorizeStatusEnum, CheckoutChargeStatusEnum
from .utils import prevent_sync_event_circular_query

if TYPE_CHECKING:
    from account.models import Address

    from checkout.fetch import CheckoutInfo, CheckoutLineInfo

    from ...plugins.manager import PluginsManager


class CheckoutLineProblemInsufficientStock(
    graphene.ObjectType,
):
    available_quantity = graphene.Int(description="Available quantity of a variant.")
    line = graphene.Field(
        "graphq.checkout.types.CheckoutLine",
        description="The line that has variant with insufficient stock.",
        required=True,
    )
    variant = graphene.Field(
        "graphq.product.types.ProductVariant",
        description="The variant with insufficient stock.",
        required=True,
    )

    class Meta:
        description = (
            "Indicates insufficient stock for a given checkout line."
            "Placing the order will not be possible until solving this problem."
        )
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutLineProblemVariantNotAvailable(graphene.ObjectType):
    line = graphene.Field(
        "graphq.checkout.types.CheckoutLine",
        description="The line that has variant that is not available.",
        required=True,
    )

    class Meta:
        description = (
            "The variant assigned to the checkout line is not available."
            "Placing the order will not be possible until solving this problem."
        )
        doc_category = DOC_CATEGORY_CHECKOUT


class CheckoutLineProblem(graphene.Union):
    class Meta:
        types = (
            CheckoutLineProblemInsufficientStock,
            CheckoutLineProblemVariantNotAvailable,
        )
        description = "Represents an problem in the checkout line."
        doc_category = DOC_CATEGORY_CHECKOUT

    @classmethod
    def resolve_type(cls, instance: problems.CHECKOUT_PROBLEM_TYPE, info):
        if isinstance(instance, problems.CheckoutLineProblemInsufficientStock):
            return CheckoutLineProblemInsufficientStock
        if isinstance(instance, problems.CheckoutLineProblemVariantNotAvailable):
            return CheckoutLineProblemVariantNotAvailable
        return super().resolve_type(instance, info)


class CheckoutProblem(graphene.Union):
    class Meta:
        types = [] + list(CheckoutLineProblem._meta.types)
        description = "Represents an problem in the checkout."
        doc_category = DOC_CATEGORY_CHECKOUT

    @classmethod
    def resolve_type(cls, instance: problems.CHECKOUT_LINE_PROBLEM_TYPE, info):
        if isinstance(instance, problems.CheckoutLineProblemInsufficientStock):
            return CheckoutLineProblemInsufficientStock
        if isinstance(instance, problems.CheckoutLineProblemVariantNotAvailable):
            return CheckoutLineProblemVariantNotAvailable
        return super().resolve_type(instance, info)


class DeliveryMethod(graphene.Union):
    class Meta:
        description = (
            "Represents a delivery method chosen for the checkout. "
            '`Warehouse` type is used when checkout is marked as "click and collect" '
            "and `ShippingMethod` otherwise."
        )
        types = (WarehouseNode, ShippingMethodNode)

    @classmethod
    def resolve_type(cls, instance, info):
        if isinstance(instance, ShippingMethodData):
            return ShippingMethod
        if isinstance(instance, warehouse_models.Warehouse):
            return Warehouse

        return super().resolve_type(instance, info)


class CheckoutQueries(graphene.ObjectType):
    checkout = Node.Field(
        CheckoutNode,
        description="Look up a checkout by ID, token, or slug of the channel.",
        id=graphene.Argument(graphene.ID, description="The checkout's ID."),
        token=graphene.Argument(UUID, description="Checkout token for lookup."),
    )

    checkouts = DjangoFilterConnectionField(
        CheckoutNode,
        sort_by=CheckoutSortingInput(description="Sort checkouts."),
        filter=CheckoutFilterInput(description="Filtering options for checkouts."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        permissions=[CheckoutPermissions.MANAGE_CHECKOUTS],
        description="List of checkouts.",
    )

    checkout_lines = DjangoFilterConnectionField(
        CheckoutLineNode,
        description="List of checkout lines.",
        permissions=[CheckoutPermissions.MANAGE_CHECKOUTS],
    )

    checkout_line_problems = graphene.List(
        CheckoutLineProblem,
        checkout_id=graphene.ID(description="The ID of the checkout."),
        description="List of problems associated with checkout lines.",
    )

    checkout_problems = graphene.List(
        CheckoutProblem,
        checkout_id=graphene.ID(description="The ID of the checkout."),
        description="List of problems associated with the checkout.",
    )

    delivery_method = graphene.Field(
        DeliveryMethod,
        checkout_id=graphene.ID(description="The ID of the checkout."),
        description="The delivery method chosen for the checkout.",
    )

    @staticmethod
    def resolve_checkout(root, info, token=None, id=None):
        """Allow lookup by either token or ID."""
        return resolve_checkout(info, token=token, id=id)

    @staticmethod
    def resolve_checkouts(root, info, channel=None, **kwargs):
        """Resolve checkouts filtered by channel and additional filters."""
        qs = resolve_checkouts(info, channel=channel)
        return queryset(qs, kwargs)

    @staticmethod
    def resolve_checkout_lines(root, info, **kwargs):
        """Resolve checkout lines with provided filters."""
        qs = resolve_checkout_lines(info)
        return queryset(qs, kwargs)

    @staticmethod
    def resolve_checkout_line_problems(root, info, checkout_id):
        """Resolve problems associated with checkout lines."""
        checkout = resolve_checkout(info, id=checkout_id)
        if not checkout:
            raise Exception("Checkout not found.")
        return resolve_checkout_line_problems(checkout)

    @staticmethod
    def resolve_checkout_problems(root, info, checkout_id):
        """Resolve problems associated with the checkout."""
        checkout = resolve_checkout(info, id=checkout_id)
        if not checkout:
            raise Exception("Checkout not found.")
        return resolve_checkout_problems(checkout)

    @staticmethod
    def resolve_delivery_method(root, info, checkout_id):
        """Resolve the delivery method chosen for the checkout."""
        checkout = resolve_checkout(info, id=checkout_id)
        if not checkout:
            raise Exception("Checkout not found.")
        return resolve_delivery_method(checkout)

    def resolve_checkout_lines():
        queryset = models.CheckoutLine.objects.all()
        return queryset

    def resolve_checkouts(channel_slug):
        queryset = models.Checkout.objects.all()
        if channel_slug:
            queryset = queryset.filter(channel__slug=channel_slug)
        return queryset

    @traced_resolver
    def resolve_checkout(info, token, id):
        validate_one_of_args_is_in_query("id", id, "token", token)

        if id:
            _, token = from_global_id_or_error(id, only_type="Checkout")
        checkout = models.Checkout.objects.filter(token=token).first()

        if checkout is None:
            return None

        # resolve checkout in active channel
        if checkout.channel.is_active:
            # resolve checkout for anonymous customer
            if not checkout.user:
                return checkout

            # resolve checkout for logged-in customer
            user = info.context.user
            if user and checkout.user == user:
                return checkout

        # resolve checkout for staff user
        requester = get_user_or_app_from_context(info.context)

        if not requester:
            return None

        has_manage_checkout = requester.has_perm(CheckoutPermissions.MANAGE_CHECKOUTS)
        has_impersonate_user = requester.has_perm(AccountPermissions.IMPERSONATE_USER)
        if has_manage_checkout or has_impersonate_user:
            return checkout

        return None
