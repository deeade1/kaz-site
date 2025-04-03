import graphene
from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query, resolver_hints

from .models import (
    Channel,
    Voucher,
    VoucherCode,
    VoucherChannelListing,
    VoucherCustomer,
    VoucherTranslation,
    Promotion,
    PromotionRule,
    PromotionRuleTranslation,
    PromotionRule_Variants,
    BaseDiscount,
    OrderDiscount,
    OrderLineDiscount,
    CheckoutDiscount,
    CheckoutLineDiscount,
    PromotionEvent,
)


class VoucherNode(OptimizedDjangoObjectType):
    discount_amount = graphene.Field(
        MoneyType,
        description="The discount amount applied by the voucher for a given channel.",
        channel_id=graphene.Argument(graphene.ID, required=True),
    )
    discount_percentage = graphene.Field(
        graphene.Float,
        description="The percentage discount applied by the voucher for a given channel.",
        channel_id=graphene.Argument(graphene.ID, required=True),
    )
    is_valid_for_staff = graphene.Boolean(
        description="Indicates if the voucher is valid only for staff users."
    )

    class Meta:
        model = Voucher
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "code": ["exact"],
            "type": ["exact"],
            "is_active": ["exact"],
            "start_date": ["exact", "lte", "gte"],
            "end_date": ["exact", "lte", "gte"],
        }
        interfaces = (Node,)

    @staticmethod
    @resolver_hints(model_field="channel_listings", only=["channel__id", "discount_value"])
    def resolve_discount_amount(root, info, channel_id):
        """Resolve the fixed discount amount applied by the voucher for the specified channel."""
        channel = query(Channel.objects.filter(id=channel_id), info).first()
        return root.get_discount_amount_for(Money(0, channel.currency), channel)

    @staticmethod
    @resolver_hints(model_field="channel_listings", only=["channel__id", "discount_value"])
    def resolve_discount_percentage(root, info, channel_id):
        """Resolve the percentage discount applied by the voucher for the specified channel."""
        channel = query(Channel.objects.filter(id=channel_id), info).first()
        if root.discount_value_type == DiscountValueType.PERCENTAGE:
            voucher_channel_listing = query(
                root.channel_listings.filter(channel=channel), info
            ).first()
            return voucher_channel_listing.discount_value if voucher_channel_listing else 0
        return None

    @staticmethod
    def resolve_is_valid_for_staff(root, info):
        """Resolve whether the voucher is valid only for staff users."""
        return root.only_for_staff


class VoucherCodeNode(OptimizedDjangoObjectType):
    discount_amount = graphene.Field(
        MoneyType,
        description="The discount amount applied by the voucher for a given channel.",
        channel_id=graphene.Argument(graphene.ID, required=True),
    )
    discount_percentage = graphene.Field(
        graphene.Float,
        description="The percentage discount applied by the voucher for a given channel.",
        channel_id=graphene.Argument(graphene.ID, required=True),
    )
    is_valid_for_staff = graphene.Boolean(
        description="Indicates if the voucher is valid only for staff users."
    )

    class Meta:
        model = VoucherCode
        fields = "__all__"
        filterset_fields = {
            "code": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
            "used": ["exact", "lte", "gte"],
            "created_at": ["exact", "lte", "gte"],
            "voucher": ["exact"],
        }
        interfaces = (Node,)

    @staticmethod
    @resolver_hints(model_field="voucher__channel_listings", only=["channel__id", "discount_value"])
    def resolve_discount_amount(root, info, channel_id):
        """Resolve the fixed discount amount applied by the voucher for the specified channel."""
        channel = query(Channel.objects.filter(id=channel_id), info).first()
        voucher = root.voucher
        if voucher:
            return voucher.get_discount_amount_for(Money(0, channel.currency), channel)
        return None

    @staticmethod
    @resolver_hints(model_field="voucher__channel_listings", only=["channel__id", "discount_value"])
    def resolve_discount_percentage(root, info, channel_id):
        """Resolve the percentage discount applied by the voucher for the specified channel."""
        channel = query(Channel.objects.filter(id=channel_id), info).first()
        voucher = root.voucher
        if voucher and voucher.discount_value_type == DiscountValueType.PERCENTAGE:
            voucher_channel_listing = query(
                voucher.channel_listings.filter(channel=channel), info
            ).first()
            return voucher_channel_listing.discount_value if voucher_channel_listing else 0
        return None

    @staticmethod
    def resolve_is_valid_for_staff(root, info):
        """Resolve whether the voucher is valid only for staff users."""
        voucher = root.voucher
        return voucher.only_for_staff if voucher else False


class VoucherChannelListingNode(OptimizedDjangoObjectType):
    discount_amount = graphene.Field(
        MoneyType, description="The discount amount for this channel listing."
    )
    min_spent_amount = graphene.Field(
        MoneyType,
        description="The minimum spent amount required to apply the voucher for this channel.",
    )
    currency = graphene.String(description="The currency in which the voucher applies.")

    class Meta:
        model = VoucherChannelListing
        fields = "__all__"
        filterset_fields = {
            "voucher__name": ["exact", "icontains", "istartswith"],
            "channel__name": ["exact", "icontains", "istartswith"],
            "channel__is_active": ["exact"],
            "discount_value": ["exact", "gte", "lte"],
            "min_spent_amount": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_discount_amount(root, info):
        """Resolve the discount amount for the channel listing."""
        return root.discount

    @staticmethod
    def resolve_min_spent_amount(root, info):
        """Resolve the minimum spent amount required to apply the voucher for this channel."""
        return root.min_spent

    @staticmethod
    def resolve_currency(root, info):
        """Resolve the currency in which the voucher applies."""
        return root.currency


class VoucherCustomerNode(OptimizedDjangoObjectType):
    voucher_code = graphene.String(
        description="The code of the voucher associated with the customer."
    )
    customer_email = graphene.String(
        description="The email of the customer who used the voucher."
    )

    class Meta:
        model = VoucherCustomer
        fields = "__all__"
        filterset_fields = {
            "voucher__code": ["exact", "icontains"],
            "customer_email": ["exact", "icontains"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_voucher_code(root, info):
        """Resolve the code of the voucher associated with the customer."""
        return root.voucher.code

    @staticmethod
    def resolve_customer_email(root, info):
        """Resolve the email of the customer who used the voucher."""
        return root.customer_email


class VoucherTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = VoucherTranslation
        fields = "__all__"
        filterset_fields = {
            "name": ["exact"],
            "slug": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
        }
        interfaces = (Node,)


class PromotionNode(OptimizedDjangoObjectType):
    is_active = graphene.Boolean(
        description="Indicates if the promotion is currently active.",
        date=graphene.Argument(graphene.DateTime, required=False),
    )

    class Meta:
        model = Promotion
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "type": ["exact"],
            "start_date": ["exact", "lte", "gte"],
            "end_date": ["exact", "lte", "gte"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_is_active(root, info, date=None):
        """Resolve whether the promotion is currently active."""
        return root.is_active(date)


class PromotionRuleNode(OptimizedDjangoObjectType):
    discount_value = graphene.Float(
        description="The discount value of the promotion rule for a given currency.",
        currency=graphene.Argument(graphene.String, required=True),
    )

    class Meta:
        model = PromotionRule
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "promotion__name": ["exact", "icontains", "istartswith"],
            "channels__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_discount_value(root, info, currency):
        """Resolve the discount value for the promotion rule based on the given currency."""
        return root.get_discount(currency) if root.reward_value else None


class PromotionRuleTranslationNode(OptimizedDjangoObjectType):
    class Meta:
        model = PromotionRuleTranslation
        fields = "__all__"
        filterset_fields = {
            "language_code": ["exact"],
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class PromotionRule_VariantsNode(OptimizedDjangoObjectType):
    promotion_rule_name = graphene.String(description="The name of the promotion rule.")
    product_variant_name = graphene.String(description="The name of the product variant.")

    class Meta:
        model = PromotionRule_Variants
        fields = "__all__"
        filterset_fields = {
            "promotionrule__name": ["exact", "icontains", "istartswith"],
            "productvariant__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_promotion_rule_name(root, info):
        """Resolve the name of the related promotion rule."""
        return root.promotionrule.name

    @staticmethod
    def resolve_product_variant_name(root, info):
        """Resolve the name of the related product variant."""
        return root.productvariant.name


class BaseDiscountNode(OptimizedDjangoObjectType):
    class Meta:
        model = BaseDiscount
        fields = "__all__"
        filterset_fields = {
            "name": ["exact"],
            "slug": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
        }
        interfaces = (Node,)


class OrderDiscountNode(OptimizedDjangoObjectType):
    class Meta:
        model = OrderDiscount
        fields = "__all__"
        filterset_fields = {
            "name": ["exact"],
            "slug": ["exact", "icontains", "istartswith"],
            "is_active": ["exact"],
        }
        interfaces = (Node,)


class OrderLineDiscountNode(OptimizedDjangoObjectType):
    class Meta:
        model = OrderLineDiscount
        fields = "__all__"
        filterset_fields = {
            "line_id": ["exact"],
            "unique_type": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class CheckoutDiscountNode(OptimizedDjangoObjectType):
    class Meta:
        model = CheckoutDiscount
        fields = "__all__"
        filterset_fields = {
            "checkout_id": ["exact"],
            "promotion_rule": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class CheckoutLineDiscountNode(OptimizedDjangoObjectType):
    class Meta:
        model = CheckoutLineDiscount
        fields = "__all__"
        filterset_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class PromotionEventNode(OptimizedDjangoObjectType):
    promotion_name = graphene.String(description="The name of the associated promotion.")
    user_email = graphene.String(description="The email of the user associated with the event.")

    class Meta:
        model = PromotionEvent
        fields = "__all__"
        filterset_fields = {
            "type": ["exact", "icontains", "istartswith"],
            "date": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)

    @staticmethod
    def resolve_promotion_name(root, info):
        """Resolve the name of the related promotion."""
        return root.promotion.name if root.promotion else None

    @staticmethod
    def resolve_user_email(root, info):
        """Resolve the email of the user associated with the event."""
        return root.user.email if root.user else None