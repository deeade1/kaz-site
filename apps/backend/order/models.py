from decimal import Decimal
from operator import attrgetter
from re import match
from typing import TYPE_CHECKING, Optional, cast
from uuid import uuid4

from django.conf import settings
from django.contrib.postgres.indexes import BTreeIndex, GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.core.validators import MinValueValidator
from django.db import connection, models
from django.db.models import F, JSONField, Max, Q
from django.db.models.expressions import Exists, OuterRef
from django.utils.timezone import now
from django_measurement.models import MeasurementField
from measurement.measures import Weight

from channel.models import Channel
from core.models import ModelWithExternalReference, ModelWithMetadata
from core.units import WeightUnits
from core.utils.json_serializer import CustomJsonEncoder
from core.weight import zero_weight
from discount import DiscountValueType
from discount.models import Voucher
from django_prices.models import MoneyField, TaxedMoneyField
from giftcard.models import GiftCard
from payment import ChargeStatus, TransactionKind
from payment.model_helpers import get_subtotal
from payment.models import Payment
from shipping.models import ShippingMethod

from . import (
    FulfillmentStatus,
    OrderAuthorizeStatus,
    OrderChargeStatus,
    OrderEvents,
    OrderGrantedRefundStatus,
    OrderOrigin,
    OrderStatus,
)

if TYPE_CHECKING:
    from accounts.models import User


class OrderQueryset(models.QuerySet["Order"]):
    def get_by_checkout_token(self, token):
        """Return non-draft order with matched checkout token using select_related."""
        return (
            self.non_draft()
            .select_related('user', 'billing_address', 'shipping_address', 'channel')
            .filter(checkout_token=token)
            .first()
        )

    def confirmed(self):
        """Return orders that aren't draft or unconfirmed with optimized query."""
        return self.exclude(status__in=[OrderStatus.DRAFT, OrderStatus.UNCONFIRMED])

    def non_draft(self):
        """Return orders that aren't draft with prefetch_related."""
        return (
            self.exclude(status=OrderStatus.DRAFT)
            .prefetch_related('payments')
        )

    def drafts(self):
        """Return draft orders with minimal fields."""
        return self.filter(status=OrderStatus.DRAFT).only('id', 'number', 'status')

    def ready_to_fulfill(self):
        """Optimized query for orders ready to fulfill."""
        statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        return (
            self.filter(
                status__in=statuses,
                total_gross_amount__lte=F("total_charged_amount"),
            )
            .filter(payments__is_active=True)
            .distinct()
            .prefetch_related('lines')
        )

    def ready_to_capture(self):
        """Optimized query for orders ready to capture."""
        return (
            self.exclude(status__in={
                OrderStatus.DRAFT, 
                OrderStatus.CANCELED, 
                OrderStatus.EXPIRED
            })
            .filter(payments__is_active=True, payments__charge_status=ChargeStatus.NOT_CHARGED)
            .distinct()
        )

    def ready_to_confirm(self):
        """Return unconfirmed orders with select_related."""
        return (
            self.filter(status=OrderStatus.UNCONFIRMED)
            .select_related('channel')
        )

    def with_related_data(self):
        """Optimized query for fetching orders with all related data."""
        return (
            self.select_related(
                'user',
                'billing_address',
                'shipping_address',
                'channel',
                'shipping_method',
                'collection_point',
                'voucher',
            )
            .prefetch_related(
                'lines',
                'payments',
                'fulfillments',
                'gift_cards',
            )
        )


OrderManager = models.Manager.from_queryset(OrderQueryset)


def get_order_number():
    """Optimized order number generation using a single query."""
    with connection.cursor() as cursor:
        cursor.execute("SELECT nextval('order_order_number_seq')")
        return cursor.fetchone()[0]


class Order(ModelWithMetadata, ModelWithExternalReference):
    # UUID as primary key
    id = models.UUIDField(primary_key=True, editable=False, unique=True, default=uuid4)
    
    # Order identification
    number = models.IntegerField(unique=True, default=get_order_number, editable=False)
    use_old_id = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(default=now, editable=False, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, db_index=True)
    expired_at = models.DateTimeField(blank=True, null=True, db_index=True)

    # Status fields
    status = models.CharField(
        max_length=32, 
        default=OrderStatus.UNFULFILLED, 
        choices=OrderStatus.CHOICES,
        db_index=True
    )
    authorize_status = models.CharField(
        max_length=32,
        default=OrderAuthorizeStatus.NONE,
        choices=OrderAuthorizeStatus.CHOICES,
        db_index=True,
    )
    charge_status = models.CharField(
        max_length=32,
        default=OrderChargeStatus.NONE,
        choices=OrderChargeStatus.CHOICES,
        db_index=True,
    )

    # Customer information
    user = models.ForeignKey(
        "accounts.User",
        blank=True,
        null=True,
        related_name="orders",
        on_delete=models.SET_NULL,
        db_index=True,
    )
    user_email = models.EmailField(blank=True, default="", db_index=True)
    language_code = models.CharField(
        max_length=35, 
        choices=settings.LANGUAGES, 
        default=settings.LANGUAGE_CODE
    )
    tracking_client_id = models.CharField(max_length=36, blank=True, editable=False)

    # Address information
    billing_address = models.ForeignKey(
        "accounts.Address",
        related_name="+",
        editable=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    shipping_address = models.ForeignKey(
        "accounts.Address",
        related_name="+",
        editable=False,
        null=True,
        on_delete=models.SET_NULL,
    )

    # Order origin and reference
    original = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, db_index=True
    )
    origin = models.CharField(max_length=32, choices=OrderOrigin.CHOICES, db_index=True)

    # Currency
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
        db_index=True,
    )

    # Shipping information
    shipping_method = models.ForeignKey(
        ShippingMethod,
        blank=True,
        null=True,
        related_name="orders",
        on_delete=models.SET_NULL,
    )
    collection_point = models.ForeignKey(
        "warehouse.Warehouse",
        blank=True,
        null=True,
        related_name="orders",
        on_delete=models.SET_NULL,
    )
    shipping_method_name = models.CharField(
        max_length=255, null=True, default=None, blank=True, editable=False
    )
    collection_point_name = models.CharField(
        max_length=255, null=True, default=None, blank=True, editable=False
    )

    # Channel
    channel = models.ForeignKey(
        Channel,
        related_name="orders",
        on_delete=models.PROTECT,
        db_index=True,
    )

    # Shipping price fields
    shipping_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
        editable=False,
    )
    shipping_price_net = MoneyField(
        amount_field="shipping_price_net_amount", currency_field="currency"
    )

    shipping_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
        editable=False,
    )
    shipping_price_gross = MoneyField(
        amount_field="shipping_price_gross_amount", currency_field="currency"
    )

    shipping_price = TaxedMoneyField(
        net_amount_field="shipping_price_net_amount",
        gross_amount_field="shipping_price_gross_amount",
        currency_field="currency",
    )

    base_shipping_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    base_shipping_price = MoneyField(
        amount_field="base_shipping_price_amount", currency_field="currency"
    )
    undiscounted_base_shipping_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_base_shipping_price = MoneyField(
        amount_field="undiscounted_base_shipping_price_amount",
        currency_field="currency",
    )

    # Shipping tax information
    shipping_tax_rate = models.DecimalField(
        max_digits=5, decimal_places=4, blank=True, null=True
    )
    shipping_tax_class = models.ForeignKey(
        "tax.TaxClass",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    shipping_tax_class_name = models.CharField(max_length=255, blank=True, null=True)
    shipping_tax_class_private_metadata = JSONField(
        blank=True, null=True, default=dict, encoder=CustomJsonEncoder
    )
    shipping_tax_class_metadata = JSONField(
        blank=True, null=True, default=dict, encoder=CustomJsonEncoder
    )

    # Checkout token
    checkout_token = models.CharField(max_length=36, blank=True, db_index=True)

    # Total price fields
    total_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_total_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )

    total_net = MoneyField(amount_field="total_net_amount", currency_field="currency")
    undiscounted_total_net = MoneyField(
        amount_field="undiscounted_total_net_amount", currency_field="currency"
    )

    total_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_total_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )

    total_gross = MoneyField(
        amount_field="total_gross_amount", currency_field="currency"
    )
    undiscounted_total_gross = MoneyField(
        amount_field="undiscounted_total_gross_amount", currency_field="currency"
    )

    total = TaxedMoneyField(
        net_amount_field="total_net_amount",
        gross_amount_field="total_gross_amount",
        currency_field="currency",
    )
    undiscounted_total = TaxedMoneyField(
        net_amount_field="undiscounted_total_net_amount",
        gross_amount_field="undiscounted_total_gross_amount",
        currency_field="currency",
    )

    # Payment information
    total_charged_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    total_authorized_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    total_authorized = MoneyField(
        amount_field="total_authorized_amount", currency_field="currency"
    )
    total_charged = MoneyField(
        amount_field="total_charged_amount", currency_field="currency"
    )

    # Subtotal fields
    subtotal_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal(0),
    )
    subtotal_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal(0),
    )
    subtotal = TaxedMoneyField(
        net_amount_field="subtotal_net_amount",
        gross_amount_field="subtotal_gross_amount",
    )

    # Discounts and vouchers
    voucher = models.ForeignKey(
        Voucher, 
        blank=True, 
        null=True, 
        related_name="+", 
        on_delete=models.SET_NULL,
        db_index=True,
    )
    voucher_code = models.CharField(
        max_length=255, null=True, blank=True, db_index=True
    )
    gift_cards = models.ManyToManyField(GiftCard, blank=True, related_name="orders")

    # Additional fields
    display_gross_prices = models.BooleanField(default=True)
    customer_note = models.TextField(blank=True, default="")
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        default=zero_weight,
    )
    redirect_url = models.URLField(blank=True, null=True)
    search_document = models.TextField(blank=True, default="")
    search_vector = SearchVectorField(blank=True, null=True)
    should_refresh_prices = models.BooleanField(default=True)
    tax_exemption = models.BooleanField(default=False)
    tax_error = models.CharField(max_length=255, null=True, blank=True)

    objects = OrderManager()

    class Meta:
        ordering = ("-number",)
        permissions = (
            ("manage_orders", "Manage orders."),
            ("manage_orders_import", "Manage orders import."),
        )
        indexes = [
            GinIndex(
                name="order_search_gin",
                fields=["search_document"],
                opclasses=["gin_trgm_ops"],
            ),
            GinIndex(
                name="order_tsearch",
                fields=["search_vector"],
            ),
            BTreeIndex(fields=["created_at"], name="order_created_at_idx"),
            BTreeIndex(fields=["status"], name="order_status_idx"),
            BTreeIndex(fields=["user_email"], name="order_user_email_idx"),
            BTreeIndex(fields=["checkout_token"], name="order_checkout_token_idx"),
            BTreeIndex(fields=["voucher_code"], name="order_voucher_code_idx"),
            BTreeIndex(fields=["created_at", "status"], name="order_created_status_idx"),
        ]

    def __str__(self):
        return f"#{self.id}"

    def save(self, *args, **kwargs):
        """Optimize save by only updating search fields when needed."""
        if not self.pk or 'update_fields' not in kwargs or 'search_document' in kwargs['update_fields']:
            self.update_search_document()
        super().save(*args, **kwargs)

    def update_search_document(self):
        """Optimized search document generation."""
        parts = [
            str(self.number),
            self.user_email,
            self.customer_note,
        ]
        if self.user:
            parts.extend([self.user.email, self.user.first_name, self.user.last_name])
        if self.billing_address:
            parts.extend([
                self.billing_address.first_name,
                self.billing_address.last_name,
                self.billing_address.street_address_1,
                self.billing_address.street_address_2,
                self.billing_address.city,
                self.billing_address.postal_code,
            ])
        self.search_document = " ".join(p for p in parts if p)

    def is_fully_paid(self):
        """Optimized check for fully paid status."""
        return self.total_charged_amount >= self.total_gross_amount

    def is_partly_paid(self):
        """Optimized check for partial payment."""
        return self.total_charged_amount > 0

    def get_customer_email(self):
        """Optimized customer email retrieval."""
        return self.user.email if self.user_id else self.user_email

    def get_last_payment(self) -> Optional[Payment]:
        """Optimized last payment retrieval with caching."""
        if not hasattr(self, '_last_payment'):
            self._last_payment = (
                self.payments.exclude(partial=True)
                .order_by('-pk')
                .first()
            )
        return self._last_payment

    def is_pre_authorized(self):
        """Optimized pre-authorization check."""
        return (
            self.payments.filter(
                is_active=True,
                transactions__kind=TransactionKind.AUTH,
                transactions__action_required=False,
                transactions__is_success=True,
            ).exists()
        )

    def is_captured(self):
        """Optimized capture check."""
        return (
            self.payments.filter(
                is_active=True,
                transactions__kind=TransactionKind.CAPTURE,
                transactions__action_required=False,
                transactions__is_success=True,
            ).exists()
        )

    def get_subtotal(self):
        """Optimized subtotal calculation with cached lines."""
        if not hasattr(self, '_lines'):
            self._lines = list(self.lines.all())
        return get_subtotal(self._lines, self.currency)

    def is_shipping_required(self):
        """Optimized shipping requirement check."""
        if not hasattr(self, '_lines'):
            self._lines = list(self.lines.all())
        return any(line.is_shipping_required for line in self._lines)

    def get_total_quantity(self):
        """Optimized total quantity calculation."""
        if not hasattr(self, '_lines'):
            self._lines = list(self.lines.all())
        return sum(line.quantity for line in self._lines)

    def is_draft(self):
        return self.status == OrderStatus.DRAFT

    def is_unconfirmed(self):
        return self.status == OrderStatus.UNCONFIRMED

    def is_expired(self):
        return self.status == OrderStatus.EXPIRED

    def is_open(self):
        statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        return self.status in statuses

    def can_cancel(self):
        """Optimized cancel check with cached fulfillments."""
        if self.status in {OrderStatus.CANCELED, OrderStatus.DRAFT, OrderStatus.EXPIRED}:
            return False
            
        if not hasattr(self, '_fulfillments'):
            self._fulfillments = list(self.fulfillments.all())
            
        allowed_statuses = {
            FulfillmentStatus.CANCELED,
            FulfillmentStatus.REFUNDED,
            FulfillmentStatus.REPLACED,
            FulfillmentStatus.REFUNDED_AND_RETURNED,
            FulfillmentStatus.RETURNED,
        }
        return all(f.status in allowed_statuses for f in self._fulfillments)

    def can_capture(self, payment=None):
        """Optimized capture check."""
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        return (
            payment.can_capture() and 
            self.status not in {OrderStatus.DRAFT, OrderStatus.CANCELED, OrderStatus.EXPIRED}
        )

    def can_void(self, payment=None):
        """Optimized void check."""
        if not payment:
            payment = self.get_last_payment()
        return payment.can_void() if payment else False

    def can_refund(self, payment=None):
        """Optimized refund check."""
        if not payment:
            payment = self.get_last_payment()
        return payment.can_refund() if payment else False

    def can_mark_as_paid(self):
        """Optimized mark as paid check."""
        return not self.payments.exists()

    @property
    def total_balance(self):
        """Optimized balance calculation."""
        return Money(
            amount=self.total_charged_amount - self.total_gross_amount,
            currency=self.currency
        )


class OrderLineQueryset(models.QuerySet["OrderLine"]):
    def digital(self):
        """Optimized digital products query."""
        return self.filter(variant__is_digital=True, variant__digital_content__isnull=False)

    def physical(self):
        """Optimized physical products query."""
        return self.filter(Q(variant__is_digital=False) | Q(variant__digital_content__isnull=True))

    def with_related_data(self):
        """Optimized query for fetching lines with related data."""
        return self.select_related('variant', 'variant__product', 'order')


OrderLineManager = models.Manager.from_queryset(OrderLineQueryset)


class OrderLine(ModelWithMetadata):
    id = models.UUIDField(primary_key=True, editable=False, unique=True, default=uuid4)
    old_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    order = models.ForeignKey(
        Order,
        related_name="lines",
        editable=False,
        on_delete=models.CASCADE,
        db_index=True,
    )
    
    variant = models.ForeignKey(
        "product.ProductVariant",
        related_name="order_lines",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        db_index=True,
    )
    
    # Product information
    product_name = models.CharField(max_length=386)
    variant_name = models.CharField(max_length=255, default="", blank=True)
    translated_product_name = models.CharField(max_length=386, default="", blank=True)
    translated_variant_name = models.CharField(max_length=255, default="", blank=True)
    product_sku = models.CharField(max_length=255, null=True, blank=True, db_index=True)
    product_variant_id = models.CharField(max_length=255, null=True, blank=True)
    
    # Line characteristics
    is_shipping_required = models.BooleanField(db_index=True)
    is_gift_card = models.BooleanField(db_index=True)
    is_gift = models.BooleanField(default=False, db_index=True)
    
    # Quantity information
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    quantity_fulfilled = models.IntegerField(
        validators=[MinValueValidator(0)], 
        default=0
    )

    # Currency
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
        db_index=True,
    )

    # Pricing fields
    unit_discount_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    unit_discount = MoneyField(
        amount_field="unit_discount_amount", currency_field="currency"
    )
    unit_discount_type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        null=True,
        blank=True,
    )
    unit_discount_reason = models.TextField(blank=True, null=True)
    unit_discount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )

    # Price fields
    unit_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    unit_price_net = MoneyField(
        amount_field="unit_price_net_amount", currency_field="currency"
    )

    unit_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    unit_price_gross = MoneyField(
        amount_field="unit_price_gross_amount", currency_field="currency"
    )

    unit_price = TaxedMoneyField(
        net_amount_field="unit_price_net_amount",
        gross_amount_field="unit_price_gross_amount",
        currency="currency",
    )

    # Total price fields
    total_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    total_price_net = MoneyField(
        amount_field="total_price_net_amount",
        currency_field="currency",
    )

    total_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    total_price_gross = MoneyField(
        amount_field="total_price_gross_amount",
        currency_field="currency",
    )

    total_price = TaxedMoneyField(
        net_amount_field="total_price_net_amount",
        gross_amount_field="total_price_gross_amount",
        currency="currency",
    )

    # Undiscounted prices
    undiscounted_unit_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_unit_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_unit_price = TaxedMoneyField(
        net_amount_field="undiscounted_unit_price_net_amount",
        gross_amount_field="undiscounted_unit_price_gross_amount",
        currency="currency",
    )

    undiscounted_total_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_total_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_total_price = TaxedMoneyField(
        net_amount_field="undiscounted_total_price_net_amount",
        gross_amount_field="undiscounted_total_price_gross_amount",
        currency="currency",
    )

    # Base prices
    base_unit_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    base_unit_price = MoneyField(
        amount_field="base_unit_price_amount", currency_field="currency"
    )

    undiscounted_base_unit_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    undiscounted_base_unit_price = MoneyField(
        amount_field="undiscounted_base_unit_price_amount", currency_field="currency"
    )

    # Tax information
    tax_rate = models.DecimalField(
        max_digits=5, decimal_places=4, blank=True, null=True
    )
    tax_class = models.ForeignKey(
        "tax.TaxClass",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    tax_class_name = models.CharField(max_length=255, blank=True, null=True)
    tax_class_private_metadata = JSONField(
        blank=True, null=True, default=dict, encoder=CustomJsonEncoder
    )
    tax_class_metadata = JSONField(
        blank=True, null=True, default=dict, encoder=CustomJsonEncoder
    )

    is_price_overridden = models.BooleanField(null=True, blank=True)

    # Discount references
    voucher_code = models.CharField(max_length=255, null=True, blank=True, db_index=True)
    sale_id = models.CharField(max_length=255, null=True, blank=True, db_index=True)

    objects = OrderLineManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("created_at", "id")
        indexes = [
            BTreeIndex(fields=["order"], name="orderline_order_idx"),
            BTreeIndex(fields=["product_sku"], name="orderline_sku_idx"),
            BTreeIndex(fields=["is_shipping_required"], name="orderline_shipping_idx"),
            BTreeIndex(fields=["is_gift_card"], name="orderline_giftcard_idx"),
            BTreeIndex(fields=["created_at"], name="orderline_created_idx"),
        ]

    def __str__(self):
        return (
            f"{self.product_name} ({self.variant_name})"
            if self.variant_name
            else self.product_name
        )

    @property
    def quantity_unfulfilled(self):
        return self.quantity - self.quantity_fulfilled

    @property
    def is_digital(self) -> bool:
        """Optimized digital check with cached variant."""
        if not hasattr(self, '_variant'):
            self._variant = self.variant
        return bool(
            self._variant and 
            self._variant.is_digital() and 
            hasattr(self._variant, "digital_content")
        )


class FulfillmentQueryset(models.QuerySet["Fulfillment"]):
    def with_related_data(self):
        """Optimized query for fetching fulfillments with related data."""
        return self.select_related('order').prefetch_related('lines', 'lines__order_line')


FulfillmentManager = models.Manager.from_queryset(FulfillmentQueryset)


class Fulfillment(ModelWithMetadata):
    fulfillment_order = models.PositiveIntegerField(editable=False)
    order = models.ForeignKey(
        Order,
        related_name="fulfillments",
        editable=False,
        on_delete=models.CASCADE,
        db_index=True,
    )
    status = models.CharField(
        max_length=32,
        default=FulfillmentStatus.FULFILLED,
        choices=FulfillmentStatus.CHOICES,
        db_index=True,
    )
    tracking_number = models.CharField(max_length=255, default="", blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    # Refund amounts
    shipping_refund_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        null=True,
        blank=True,
    )
    total_refund_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        null=True,
        blank=True,
    )

    objects = FulfillmentManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("pk",)
        indexes = [
            BTreeIndex(fields=["order"], name="fulfillment_order_idx"),
            BTreeIndex(fields=["status"], name="fulfillment_status_idx"),
            BTreeIndex(fields=["tracking_number"], name="fulfillment_tracking_idx"),
            BTreeIndex(fields=["created_at"], name="fulfillment_created_idx"),
        ]

    def __str__(self):
        return f"Fulfillment #{self.composed_id}"

    def save(self, *args, **kwargs):
        """Optimized save with fulfillment order assignment."""
        if not self.pk:
            max_order = self.order.fulfillments.aggregate(Max("fulfillment_order"))
            self.fulfillment_order = (max_order.get("fulfillment_order__max") or 0) + 1
        super().save(*args, **kwargs)

    @property
    def composed_id(self):
        return f"{self.order.number}-{self.fulfillment_order}"

    def can_edit(self):
        return self.status != FulfillmentStatus.CANCELED

    def get_total_quantity(self):
        """Optimized total quantity calculation with cached lines."""
        if not hasattr(self, '_lines'):
            self._lines = list(self.lines.all())
        return sum(line.quantity for line in self._lines)

    @property
    def is_tracking_number_url(self):
        """Optimized URL check."""
        return bool(self.tracking_number) and match(r"^[-\w]+://", self.tracking_number)


class FulfillmentLine(models.Model):
    order_line = models.ForeignKey(
        OrderLine,
        related_name="fulfillment_lines",
        on_delete=models.CASCADE,
        db_index=True,
    )
    fulfillment = models.ForeignKey(
        Fulfillment, 
        related_name="lines", 
        on_delete=models.CASCADE,
        db_index=True,
    )
    quantity = models.PositiveIntegerField()
    stock = models.ForeignKey(
        "warehouse.Stock",
        related_name="fulfillment_lines",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta:
        indexes = [
            BTreeIndex(fields=["order_line"], name="fulfillmentline_orderline_idx"),
            BTreeIndex(fields=["fulfillment"], name="fulfillmentline_fulfillment_idx"),
        ]


class OrderEventQueryset(models.QuerySet["OrderEvent"]):
    def with_related_data(self):
        """Optimized query for fetching events with related data."""
        return self.select_related('order', 'user')


OrderEventManager = models.Manager.from_queryset(OrderEventQueryset)


class OrderEvent(models.Model):
    date = models.DateTimeField(default=now, editable=False, db_index=True)
    type = models.CharField(
        max_length=255,
        choices=[(type_name.upper(), type_name) for type_name, _ in OrderEvents.CHOICES],
        db_index=True,
    )
    order = models.ForeignKey(
        Order, 
        related_name="events", 
        on_delete=models.CASCADE,
        db_index=True,
    )
    parameters = JSONField(blank=True, default=dict, encoder=CustomJsonEncoder)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    related = models.ForeignKey(
        "self",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="related_events",
    )

    objects = OrderEventManager()

    class Meta:
        ordering = ("date",)
        indexes = [
            BTreeIndex(fields=["type"], name="orderevent_type_idx"),
            BTreeIndex(fields=["order"], name="orderevent_order_idx"),
            BTreeIndex(fields=["date"], name="orderevent_date_idx"),
            BTreeIndex(fields=["user"], name="orderevent_user_idx"),
            BTreeIndex(fields=["related"], name="orderevent_related_idx"),
        ]

    def __repr__(self):
        return f"{self.__class__.__name__}(type={self.type!r}, user={self.user!r})"


class OrderGrantedRefundQueryset(models.QuerySet["OrderGrantedRefund"]):
    def with_related_data(self):
        """Optimized query for fetching refunds with related data."""
        return self.select_related(
            'order', 
            'user', 
            'transaction_item'
        ).prefetch_related('lines')


OrderGrantedRefundManager = models.Manager.from_queryset(OrderGrantedRefundQueryset)


class OrderGrantedRefund(models.Model):
    created_at = models.DateTimeField(default=now, editable=False, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, db_index=True)

    amount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0"),
    )
    amount = MoneyField(amount_field="amount_value", currency_field="currency")
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )
    reason = models.TextField(blank=True, default="")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    order = models.ForeignKey(
        Order, 
        related_name="granted_refunds", 
        on_delete=models.CASCADE,
        db_index=True,
    )
    shipping_costs_included = models.BooleanField(default=False)

    transaction_item = models.ForeignKey(
        "payment.TransactionItem",
        related_name="granted_refund",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    status = models.CharField(
        choices=OrderGrantedRefundStatus.CHOICES,
        default=OrderGrantedRefundStatus.NONE,
        max_length=128,
        db_index=True,
    )

    objects = OrderGrantedRefundManager()

    class Meta:
        ordering = ("created_at", "id")
        indexes = [
            BTreeIndex(fields=["order"], name="orderrefund_order_idx"),
            BTreeIndex(fields=["status"], name="orderrefund_status_idx"),
            BTreeIndex(fields=["created_at"], name="orderrefund_created_idx"),
            BTreeIndex(fields=["updated_at"], name="orderrefund_updated_idx"),
        ]


class OrderGrantedRefundLine(models.Model):
    order_line = models.ForeignKey(
        OrderLine, 
        related_name="granted_refund_lines", 
        on_delete=models.CASCADE,
        db_index=True,
    )
    quantity = models.PositiveIntegerField()
    reason = models.TextField(blank=True, null=True, default="")

    granted_refund = models.ForeignKey(
        OrderGrantedRefund, 
        related_name="lines", 
        on_delete=models.CASCADE,
        db_index=True,
    )

    class Meta:
        indexes = [
            BTreeIndex(fields=["order_line"], name="orderrefundline_orderline_idx"),
            BTreeIndex(fields=["granted_refund"], name="orderrefundline_refund_idx"),
        ]