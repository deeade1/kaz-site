import graphene
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query, resolver_hints
from promise import Promise

from checkout.calculations import (
    calculate_undiscounted_base_line_total_price,
    calculate_undiscounted_base_line_unit_price,
    checkout_line_total,
    checkout_line_unit_price,
)
from checkout.utils import (
    CheckoutByToken,
    CheckoutInfoByCheckoutToken,
    CheckoutLinesInfoByCheckoutToken,
    PregeneratedCheckoutTaxPayloadsByCheckoutToken,
    get_plugin_manager_promise,
)
from tax import Money, TaxedMoney

from .models import Checkout, CheckoutLine


class CheckoutNode(OptimizedDjangoObjectType):
    class Meta:
        model = Checkout
        interfaces = (graphene.relay.Node,)
        fields = "__all__"
        description = "Represents a shopping checkout."

    id = graphene.ID(
        required=True,
        description="The ID of the checkout.",
    )
    created_at = graphene.DateTime(
        required=True, description="The date and time when the checkout was created."
    )
    updated_at = graphene.DateTime(
        required=True, description="The date and time of the last checkout update."
    )
    user = graphene.Field(
        "graphq.account.types.UserNode",
        description="The user assigned to the checkout, if any.",
    )
    email = graphene.String(
        description="The email address of the customer associated with this checkout."
    )
    token = graphene.UUID(
        required=True,
        description="The token representing the checkout, used for identification.",
    )
    channel = graphene.Field(
        "graphq.channel.types.ChannelNode",
        required=True,
        description="The sales channel associated with the checkout.",
    )
    billing_address = graphene.Field(
        "graphq.account.types.Address",
        description="The billing address for the checkout.",
    )
    shipping_address = graphene.Field(
        "graphq.account.types.Address",
        description="The shipping address for the checkout.",
    )
    shipping_method = graphene.Field(
        "graphq.shipping.types.ShippingMethod",
        description="The selected shipping method for the checkout.",
    )
    collection_point = graphene.Field(
        "graphq.warehouse.types.Warehouse",
        description="The collection point selected for this checkout.",
    )
    note = graphene.String(
        description="A note added by the customer or admin about the checkout."
    )
    total_price = graphene.Field(
        "graphq.pricing.types.TaxedMoney",
        description="The total price of the checkout, including taxes and discounts.",
    )
    subtotal_price = graphene.Field(
        "graphq.pricing.types.TaxedMoney",
        description="The subtotal price of the checkout, excluding shipping and discounts.",
    )
    shipping_price = graphene.Field(
        "graphq.pricing.types.TaxedMoney",
        description="The total shipping price for the checkout.",
    )
    discount = graphene.Field(
        "graphq.pricing.types.Money",
        description="The total discount applied to the checkout.",
    )
    gift_cards = graphene.List(
        "graphq.gift_card.types.GiftCard",
        description="The list of gift cards associated with the checkout.",
    )
    voucher_code = graphene.String(
        description="The code of the voucher applied to the checkout, if any."
    )
    lines = graphene.List(
        "graphq.checkout.types.CheckoutLine",
        description="A list of items added to the checkout.",
    )
    is_shipping_required = graphene.Boolean(
        description="Returns true if the checkout contains items requiring shipping."
    )
    language_code = graphene.String(
        description="The language code set for this checkout."
    )
    country = graphene.String(description="The country for the checkout.")
    tax_exemption = graphene.Boolean(
        description="Returns true if the checkout is exempt from taxes."
    )

    @staticmethod
    def resolve_is_shipping_required(root, info):
        return root.is_shipping_required()

    @staticmethod
    def resolve_total_price(root, info):
        return root.total

    @staticmethod
    def resolve_subtotal_price(root, info):
        return root.subtotal

    @staticmethod
    def resolve_shipping_price(root, info):
        return root.shipping_price

    @staticmethod
    def resolve_discount(root, info):
        return root.discount

    @staticmethod
    def resolve_lines(root, info):
        return query(root.lines.all(), info)


class CheckoutLineNode(OptimizedDjangoObjectType):
    quantity = graphene.Int(
        required=True,
        description="The quantity of product variant assigned to the checkout line.",
    )
    unit_price = graphene.Field(
        TaxedMoney,
        description="The unit price of the checkout line, with taxes and discounts.",
        required=True,
    )
    undiscounted_unit_price = graphene.Field(
        Money,
        description="The unit price of the checkout line, without discounts.",
        required=True,
    )
    total_price = graphene.Field(
        TaxedMoney,
        description="The total price of the checkout line, including taxes and discounts.",
        required=True,
    )
    undiscounted_total_price = graphene.Field(
        Money,
        description="The total price of the checkout line, without discounts.",
        required=True,
    )
    requires_shipping = graphene.Boolean(
        description="Indicates whether the item needs to be delivered.",
        required=True,
    )
    problems = graphene.List(graphene.NonNull(graphene.String))

    is_gift = graphene.Boolean(
        description="Determine if the line is a gift.",
        required=True,
    )

    class Meta:
        model = CheckoutLine
        fields = "__all__"
        interfaces = (graphene.relay.Node,)

    @staticmethod
    @resolver_hints(
        model_field="checkout",
        only=["checkout__token", "variant__is_shipping_required"],
    )
    def resolve_unit_price(root, info):
        def with_checkout(data):
            checkout, manager = data
            checkout_info = CheckoutInfoByCheckoutToken(info.context)(checkout.token)
            lines = CheckoutLinesInfoByCheckoutToken(info.context)(checkout.token)
            payloads = PregeneratedCheckoutTaxPayloadsByCheckoutToken(info.context)(
                checkout.token
            )

            @allow_writer_in_context(info.context)
            def calculate_line_unit_price(data):
                checkout_info, lines, payloads = data
                for line_info in lines:
                    if line_info.line.pk == root.pk:
                        return checkout_line_unit_price(
                            manager=manager,
                            checkout_info=checkout_info,
                            lines=lines,
                            checkout_line_info=line_info,
                            pregenerated_subscription_payloads=payloads,
                        )
                return None

            return Promise.all([checkout_info, lines, payloads]).then(
                calculate_line_unit_price
            )

        return Promise.all(
            [
                query(CheckoutByToken(info.context)(root.checkout_id), info),
                get_plugin_manager_promise(info.context),
            ]
        ).then(with_checkout)

    @staticmethod
    @resolver_hints(
        model_field="checkout",
        only=["checkout__token", "variant__price"],
    )
    def resolve_undiscounted_unit_price(root, info):
        def with_checkout(checkout):
            checkout_info = CheckoutInfoByCheckoutToken(info.context)(checkout.token)
            lines = CheckoutLinesInfoByCheckoutToken(info.context)(checkout.token)

            def calculate_undiscounted_unit_price(data):
                checkout_info, lines = data
                for line_info in lines:
                    if line_info.line.pk == root.pk:
                        return calculate_undiscounted_base_line_unit_price(
                            line_info, checkout_info.channel
                        )
                return None

            return Promise.all([checkout_info, lines]).then(
                calculate_undiscounted_unit_price
            )

        return query(CheckoutByToken(info.context)(root.checkout_id), info).then(
            with_checkout
        )

    @staticmethod
    @resolver_hints(
        model_field="checkout",
        only=["checkout__token", "variant__price"],
    )
    def resolve_total_price(root, info):
        def with_checkout(data):
            checkout, manager = data
            checkout_info = CheckoutInfoByCheckoutToken(info.context)(checkout.token)
            lines = CheckoutLinesInfoByCheckoutToken(info.context)(checkout.token)
            payloads = PregeneratedCheckoutTaxPayloadsByCheckoutToken(info.context)(
                checkout.token
            )

            @allow_writer_in_context(info.context)
            def calculate_line_total_price(data):
                checkout_info, lines, payloads = data
                for line_info in lines:
                    if line_info.line.pk == root.pk:
                        return checkout_line_total(
                            manager=manager,
                            checkout_info=checkout_info,
                            lines=lines,
                            checkout_line_info=line_info,
                            pregenerated_subscription_payloads=payloads,
                        )
                return None

            return Promise.all([checkout_info, lines, payloads]).then(
                calculate_line_total_price
            )

        return Promise.all(
            [
                query(CheckoutByToken(info.context)(root.checkout_id), info),
                get_plugin_manager_promise(info.context),
            ]
        ).then(with_checkout)

    @staticmethod
    def resolve_requires_shipping(root, info):
        return root.variant.is_shipping_required()

    @staticmethod
    @traced_resolver
    def resolve_problems(root, info):
        problems = CheckoutLinesProblemsByCheckout(info.context)(root.checkout_id)
        return problems.get(str(root.pk), [])