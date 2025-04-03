import uuid
from decimal import Decimal
from typing import TYPE_CHECKING, Dict, List, Optional, Union, cast

import graphene
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.db import transaction
from django.db.models import Model, QuerySet
from django.utils import timezone
from graphql import GraphQLError

from graphq.payment.types import (
    PaymentInitialized,
    PaymentNode,
    TransactionEventNode,
    TransactionItemNode,
)

from ...app.models import App
from ...channel import TransactionFlowStrategy
from ...channel.models import Channel
from ...checkout import models as checkout_models
from ...checkout.actions import transaction_amounts_for_checkout_updated
from ...checkout.calculations import (
    calculate_checkout_total_with_gift_cards,
    fetch_checkout_data,
)
from ...checkout.checkout_cleaner import clean_billing_address, clean_checkout_shipping
from ...checkout.fetch import fetch_checkout_info, fetch_checkout_lines
from ...checkout.utils import cancel_active_payments
from ...core.error_codes import MetadataErrorCode
from ...core.exceptions import PermissionDenied
from ...core.tracing import traced_atomic_transaction
from ...core.utils import get_client_ip
from ...core.utils.url import validate_storefront_url
from ...order import OrderStatus
from ...order import models as order_models
from ...order.actions import order_refunded, order_transaction_updated
from ...order.events import transaction_event as order_transaction_event
from ...order.fetch import fetch_order_info
from ...order.models import Order
from ...order.search import update_order_search_vector
from ...order.utils import updates_amounts_for_order
from ...payment import (
    PaymentError,
    StorePaymentMethod,
    TransactionAction,
    TransactionEventType,
    TransactionKind,
    gateway,
)
from ...payment import models as payment_models
from ...payment.error_codes import (
    PaymentErrorCode,
    TransactionCreateErrorCode,
    TransactionProcessErrorCode,
    TransactionRequestActionErrorCode,
    TransactionUpdateErrorCode,
)
from ...payment.gateway import (
    request_cancelation_action,
    request_charge_action,
    request_refund_action,
)
from ...payment.interface import PaymentGatewayData
from ...payment.transaction_item_calculations import (
    calculate_transaction_amount_based_on_events,
    recalculate_transaction_amounts,
)
from ...payment.utils import (
    authorization_success_already_exists,
    create_failed_transaction_event,
    create_manual_adjustment_events,
    create_payment,
    get_already_existing_event,
    get_final_session_statuses,
    handle_transaction_initialize_session,
    handle_transaction_process_session,
    is_currency_supported,
)
from ...permission.auth_filters import AuthorizationFilters
from ...permission.enums import OrderPermissions, PaymentPermissions
from ..account.i18n import I18nMixin
from ..app.dataloaders import get_app_promise
from ..channel.enums import TransactionFlowStrategyEnum
from ..channel.utils import validate_channel
from ..checkout.mutations.utils import get_checkout
from ..checkout.types import Checkout
from ..core import ResolveInfo
from ..core.descriptions import (
    ADDED_IN_31,
    ADDED_IN_34,
    ADDED_IN_313,
    DEPRECATED_IN_3X_INPUT,
    PREVIEW_FEATURE,
    PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT,
)
from ..core.doc_category import DOC_CATEGORY_CHECKOUT, DOC_CATEGORY_PAYMENTS
from ..core.enums import (
    PaymentGatewayInitializeErrorCode,
    TransactionEventReportErrorCode,
    TransactionInitializeErrorCode,
)
from ..core.fields import JSONString
from ..core.mutations import BaseMutation, ModelMutation
from ..core.scalars import JSON, UUID, PositiveDecimal
from ..core.types import BaseInputObjectType, BaseObjectType
from ..core.types import common as common_types
from ..core.utils import from_global_id_or_error
from ..meta.mutations import MetadataInput
from ..plugins.dataloaders import get_plugin_manager_promise
from ..utils import get_user_or_app_from_context
from .enums import (
    StorePaymentMethodEnum,
    TransactionActionEnum,
    TransactionEventStatusEnum,
    TransactionEventTypeEnum,
)
from .utils import check_if_requestor_has_access, metadata_contains_empty_key

if TYPE_CHECKING:
    from account.models import User

    from plugins.manager import PluginsManager


class CheckoutPaymentCreate(relay.ClientIDMutation, I18nMixin):
    checkout = graphene.Field(Checkout, description="Related checkout object.")
    payment = graphene.Field(Payment, description="A newly created payment.")

    class Input:
        id = graphene.ID(
            description="The checkout's ID.",
            required=False,
        )
        token = UUID(
            description=f"Checkout token. Use `id` instead.",
            required=False,
        )
        checkout_id = graphene.ID(
            required=False, description=f"The ID of the checkout.  Use `id` instead."
        )
        input = PaymentInput(
            description="Data required to create a new payment.", required=True
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        # Extract inputs
        checkout_id = input.get("id")
        token = input.get("token")

        # Fetch checkout details
        checkout = get_checkout(cls, info, checkout_id=checkout_id, token=token)

        # Validate checkout email
        cls.validate_checkout_email(checkout)

        # Validate gateway and return URL
        gateway = input["gateway"]
        manager = get_plugin_manager_promise(info.context).get()
        cls.validate_gateway(manager, gateway, checkout)
        cls.validate_return_url(input)

        # Fetch checkout lines
        lines, unavailable_variant_pks = fetch_checkout_lines(checkout)
        if unavailable_variant_pks:
            raise ValidationError(
                {
                    "token": ValidationError(
                        "Some of the checkout lines variants are unavailable.",
                        code=PaymentErrorCode.UNAVAILABLE_VARIANT_IN_CHANNEL.value,
                        params={"variants": unavailable_variant_pks},
                    )
                }
            )

        if not lines:
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Cannot create payment for checkout without lines.",
                        code=PaymentErrorCode.NO_CHECKOUT_LINES.value,
                    )
                }
            )

        # Fetch checkout info and validate token
        checkout_info = fetch_checkout_info(checkout, lines, manager)
        cls.validate_token(manager, gateway, input, checkout_info.channel.slug)

        # Calculate total payment amount
        address = checkout.shipping_address or checkout.billing_address
        checkout_total = calculate_checkout_total_with_gift_cards(
            manager, checkout_info, lines, address
        )
        amount = input.get("amount", checkout_total.gross.amount)
        cls.clean_payment_amount(info, checkout_total, amount)

        # Create the payment
        payment = create_payment(
            gateway=gateway,
            payment_token=input.get("token", ""),
            total=amount,
            currency=checkout.currency,
            email=checkout.get_customer_email(),
            checkout=checkout,
            return_url=input.get("return_url"),
            store_payment_method=input.get(
                "store_payment_method", StorePaymentMethod.NONE
            ),
            metadata=input.get("metadata", {}),
        )

        return CheckoutPaymentCreate(payment=payment, checkout=checkout)


class PaymentCapture(relay.ClientIDMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Input:
        payment_id = graphene.ID(required=True, description="Payment ID.")
        amount = PositiveDecimal(description="Transaction amount.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        # Retrieve payment by ID
        payment = cls.get_node_or_error(
            info, input.get("payment_id"), field="payment_id", only_type=Payment
        )
        amount = input.get("amount")

        # Get the channel slug from the payment
        channel = payment.order.channel if payment.order else payment.checkout.channel
        cls.check_channel_permissions(info, [channel.id])

        # Capture the payment
        manager = get_plugin_manager_promise(info.context).get()
        try:
            gateway.capture(payment, manager, amount=amount, channel_slug=channel.slug)
            payment.refresh_from_db()
        except PaymentError as e:
            raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR.value)

        return PaymentCapture(payment=payment)


class PaymentRefund(relay.ClientIDMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Input:
        payment_id = graphene.ID(required=True, description="Payment ID.")
        amount = PositiveDecimal(description="Refund amount.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        payment = cls.get_node_or_error(
            info, input.get("payment_id"), field="payment_id", only_type=Payment
        )
        amount = input.get("amount")

        # Get the channel slug
        channel = payment.order.channel if payment.order else payment.checkout.channel
        cls.check_channel_permissions(info, [channel.id])

        # Refund the payment
        manager = get_plugin_manager_promise(info.context).get()
        try:
            payment_transaction = gateway.refund(
                payment, manager, amount=amount, channel_slug=channel.slug
            )
            payment.refresh_from_db()
        except PaymentError as e:
            raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR.value)

        # Trigger order refund event
        if (
            payment.order_id
            and payment_transaction
            and payment_transaction.kind == TransactionKind.REFUND
        ):
            order_refunded(
                order=payment.order,
                user=info.context.user,
                amount=amount,
                payment=payment,
                manager=manager,
            )

        return PaymentRefund(payment=payment)


class PaymentVoid(relay.ClientIDMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Input:
        payment_id = graphene.ID(required=True, description="Payment ID.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        payment_id = input.get("payment_id")
        payment = cls.get_node_or_error(
            info, payment_id, field="payment_id", only_type=Payment
        )

        channel = payment.order.channel if payment.order else payment.checkout.channel
        cls.check_channel_permissions(info, [channel.id])
        channel_slug = channel.slug

        manager = get_plugin_manager_promise(info.context).get()

        try:
            gateway.void(payment, manager, channel_slug=channel_slug)
            payment.refresh_from_db()
        except PaymentError as e:
            raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR.value)

        return PaymentVoid(payment=payment)


class PaymentInitialize(relay.ClientIDMutation):
    initialized_payment = graphene.Field(PaymentInitialized, required=False)

    class Input:
        gateway = graphene.String(
            description="A gateway name used to initialize the payment.",
            required=True,
        )
        channel = graphene.String(
            description="Slug of a channel for which the data should be returned.",
            required=True,
        )
        payment_data = JSONString(
            required=False,
            description="Client-side generated data required to initialize the payment.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        gateway = input.get("gateway")
        channel_slug = input.get("channel")
        payment_data = input.get("payment_data", None)

        # Validate channel
        cls.validate_channel(channel_slug=channel_slug)

        manager = get_plugin_manager_promise(info.context).get()

        try:
            response = manager.initialize_payment(
                gateway, payment_data, channel_slug=channel_slug
            )
        except PaymentError as e:
            raise ValidationError(
                {
                    "payment_data": ValidationError(
                        str(e), code=PaymentErrorCode.INVALID.value
                    )
                }
            )

        return PaymentInitialize(initialized_payment=response)


class MoneyInput(graphene.InputObjectType):
    currency = graphene.String(description="Currency code.", required=True)
    amount = PositiveDecimal(description="Amount of money.", required=True)


class CardInput(graphene.InputObjectType):
    code = graphene.String(
        description=(
            "Payment method nonce, a token returned "
            "by the appropriate provider's SDK."
        ),
        required=True,
    )
    cvc = graphene.String(description="Card security code.", required=False)
    money = MoneyInput(
        description="Information about currency and amount.", required=True
    )


class PaymentCheckBalanceInput(InputObjectType):
    gateway_id = graphene.types.String(
        description="An ID of a payment gateway to check.", required=True
    )
    method = graphene.types.String(description="Payment method name.", required=True)
    channel = graphene.String(
        description="Slug of a channel for which the data should be returned.",
        required=True,
    )
    card = CardInput(description="Information about card.", required=True)

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class PaymentCheckBalance(relay.ClientIDMutation):
    data = JSONString(description="Response from the gateway.")

    class Input:
        input = PaymentCheckBalanceInput(
            description="Fields required to check payment balance.", required=True
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, input):
        manager = get_plugin_manager_promise(info.context).get()
        gateway_id = input["gateway_id"]
        channel_slug = input["channel"]
        card_info = input["card"]
        currency = card_info["money"]["currency"]

        # Validate gateway and currency
        cls.validate_gateway(gateway_id, manager)
        cls.validate_currency(currency, gateway_id, manager)

        # Validate channel
        validate_channel(channel_slug, PaymentErrorCode)

        try:
            response_data = manager.check_payment_balance(input, channel_slug)
        except PaymentError as e:
            raise ValidationError(
                str(e), code=PaymentErrorCode.BALANCE_CHECK_ERROR.value
            )

        return PaymentCheckBalance(data=response_data)

    @classmethod
    def validate_gateway(cls, gateway_id, manager):
        available_gateways = [gateway.id for gateway in manager.list_payment_gateways()]

        if gateway_id not in available_gateways:
            raise ValidationError(
                {
                    "gateway_id": ValidationError(
                        f"The gateway_id '{gateway_id}' is not available.",
                        code=PaymentErrorCode.NOT_SUPPORTED_GATEWAY.value,
                    )
                }
            )

    @classmethod
    def validate_currency(cls, currency, gateway_id, manager):
        if not is_currency_supported(currency, gateway_id, manager):
            raise ValidationError(
                {
                    "currency": ValidationError(
                        f"The currency '{currency}' is not available for gateway '{gateway_id}'.",
                        code=PaymentErrorCode.NOT_SUPPORTED_GATEWAY.value,
                    )
                }
            )


class TransactionUpdateInput(InputObjectType):
    status = graphene.String(
        description=(
            "Status of the transaction."
            + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
            + " The `status` is not needed. The amounts can be used to define "
            "the current status of transactions."
        ),
    )
    type = graphene.String(
        description="Payment type used for this transaction."
        + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
        + " Use `name` and `message` instead.",
    )
    name = graphene.String(
        description="Payment name of the transaction." + ADDED_IN_313
    )
    message = graphene.String(
        description="The message of the transaction." + ADDED_IN_313
    )

    reference = graphene.String(
        description=(
            "Reference of the transaction. "
            + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
            + " Use `pspReference` instead."
        )
    )
    psp_reference = graphene.String(
        description=("PSP Reference of the transaction. " + ADDED_IN_313)
    )
    available_actions = graphene.List(
        graphene.NonNull(TransactionActionEnum),
        description="List of all possible actions for the transaction",
    )
    amount_authorized = MoneyInput(description="Amount authorized by this transaction.")
    amount_charged = MoneyInput(description="Amount charged by this transaction.")
    amount_refunded = MoneyInput(description="Amount refunded by this transaction.")
    amount_voided = MoneyInput(
        description="Amount voided by this transaction."
        + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
        + " Use `amountCanceled` instead."
    )
    amount_canceled = MoneyInput(
        description="Amount canceled by this transaction." + ADDED_IN_313
    )

    metadata = graphene.List(
        graphene.NonNull(MetadataInput),
        description="Payment public metadata.",
        required=False,
    )
    private_metadata = graphene.List(
        graphene.NonNull(MetadataInput),
        description="Payment private metadata.",
        required=False,
    )
    external_url = graphene.String(
        description=(
            "The url that will allow to redirect user to "
            "payment provider page with transaction event details." + ADDED_IN_313
        )
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class TransactionCreateInput(TransactionUpdateInput):
    ...

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class TransactionEventInput(InputObjectType):
    status = graphene.Field(
        TransactionEventStatusEnum,
        required=False,
        description="Current status of the payment transaction."
        + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
        + " Status will be calculated by.",
    )
    reference = graphene.String(
        description="Reference of the transaction. "
        + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
        + " Use `pspReference` instead."
    )
    psp_reference = graphene.String(
        description="PSP Reference related to this action." + ADDED_IN_313
    )
    name = graphene.String(
        description="Name of the transaction."
        + PREVIEW_FEATURE_DEPRECATED_IN_313_INPUT
        + " Use `message` instead. `name` field will be added to `message`."
    )
    message = graphene.String(
        description="The message related to the event." + ADDED_IN_313
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class TransactionCreate(relay.ClientIDMutation):
    transaction = graphene.Field(TransactionItem)

    class Input:
        id = graphene.ID(description="The ID of the checkout or order.", required=True)
        transaction = TransactionCreateInput(
            required=True,
            description="Input data required to create a new transaction object.",
        )
        transaction_event = TransactionEventInput(
            description="Data that defines a transaction event."
        )

    @classmethod
    def validate_external_url(cls, external_url: Optional[str], error_code: str):
        if external_url:
            validator = URLValidator()
            try:
                validator(external_url)
            except ValidationError:
                raise ValidationError(
                    {
                        "transaction": ValidationError(
                            "Invalid format of `externalUrl`.", code=error_code
                        )
                    }
                )

    @classmethod
    def validate_metadata_keys(cls, metadata_list: List[dict], field_name, error_code):
        if metadata_contains_empty_key(metadata_list):
            raise ValidationError(
                {
                    "transaction": ValidationError(
                        f"{field_name} key cannot be empty.", code=error_code
                    )
                }
            )

    @classmethod
    def get_money_data_from_input(cls, cleaned_data: dict) -> Dict[str, Decimal]:
        money_data = {}
        for field_name in [
            "authorized_value",
            "charged_value",
            "refunded_value",
            "canceled_value",
        ]:
            if field := cleaned_data.pop(field_name, None):
                money_data[field_name] = field["amount"]
        return money_data

    @classmethod
    def validate_instance(
        cls, instance: Model, instance_id
    ) -> Union[checkout_models.Checkout, order_models.Order]:
        if not isinstance(instance, (checkout_models.Checkout, order_models.Order)):
            raise ValidationError(
                {
                    "id": ValidationError(
                        f"Couldn't resolve to Checkout or Order: {instance_id}",
                        code=TransactionCreateErrorCode.NOT_FOUND.value,
                    )
                }
            )
        return instance

    @classmethod
    def validate_money_input(
        cls, transaction_data: dict, currency: str, error_code: str
    ):
        for money_field_name in [
            "amount_authorized",
            "amount_charged",
            "amount_refunded",
            "amount_canceled",
        ]:
            field = transaction_data.get(money_field_name)
            if field and field["currency"] != currency:
                raise ValidationError(
                    {
                        money_field_name: ValidationError(
                            f"Currency must match order currency: {currency}",
                            code=error_code,
                        )
                    }
                )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        instance = cls.get_node_or_error(info, input["id"])
        instance = cls.validate_instance(instance, input["id"])

        cls.validate_money_input(
            input["transaction"],
            instance.currency,
            TransactionCreateErrorCode.INCORRECT_CURRENCY.value,
        )
        cls.validate_metadata_keys(
            input["transaction"].get("metadata", []),
            "metadata",
            TransactionCreateErrorCode.METADATA_KEY_REQUIRED.value,
        )

        user = info.context.user
        manager = get_plugin_manager_promise(info.context).get()

        new_transaction = cls.create_transaction(input["transaction"], user=user)
        if money_data := cls.get_money_data_from_input(input["transaction"]):
            create_manual_adjustment_events(
                new_transaction, money_data=money_data, user=user
            )
            recalculate_transaction_amounts(new_transaction)

        if input.get("transaction_event"):
            cls.create_transaction_event(
                input["transaction_event"], new_transaction, user
            )
        return TransactionCreate(transaction=new_transaction)


def get_transaction_item(id: str) -> payment_models.TransactionItem:
    """Get transaction based on global ID.

    The transactions created before 3.13 used the `id` field as a GraphQL ID.
    From 3.13, the `token` is used as a GraphQL ID. Transactions created
    before 3.13 use an `int` id as an identifier.
    """
    _, db_id = from_global_id_or_error(
        global_id=id, only_type=TransactionItem, raise_error=True
    )
    query_params = (
        {"id": db_id, "use_old_id": True} if db_id.isdigit() else {"token": db_id}
    )

    instance = payment_models.TransactionItem.objects.filter(**query_params).first()
    if not instance:
        raise ValidationError(
            {
                "id": ValidationError(
                    f"Couldn't resolve to a node: {id}",
                    code=TransactionUpdateErrorCode.NOT_FOUND.value,
                )
            }
        )
    return instance


class TransactionUpdate(relay.ClientIDMutation, TransactionCreate):
    transaction = graphene.Field(TransactionItem)

    class Input:
        id = graphene.ID(description="The ID of the transaction.", required=True)
        transaction = TransactionUpdateInput(
            description="Input data required to create a new transaction object."
        )
        transaction_event = TransactionEventInput(
            description="Data that defines a transaction event."
        )

    @classmethod
    def check_can_update(cls, transaction: payment_models.TransactionItem, user):
        if not check_if_requestor_has_access(transaction=transaction, user=user):
            raise PermissionDenied(
                permissions=[
                    AuthorizationFilters.OWNER,
                    PaymentPermissions.HANDLE_PAYMENTS,
                ]
            )

    @classmethod
    def validate_transaction_input(cls, instance, transaction_data):
        currency = instance.currency
        if available_actions := transaction_data.get("available_actions"):
            transaction_data["available_actions"] = list(set(available_actions))

        cls.validate_money_input(
            transaction_data,
            currency,
            TransactionUpdateErrorCode.INCORRECT_CURRENCY.value,
        )
        cls.validate_metadata_keys(
            transaction_data.get("metadata", []),
            field_name="metadata",
            error_code=TransactionUpdateErrorCode.METADATA_KEY_REQUIRED.value,
        )
        cls.validate_metadata_keys(
            transaction_data.get("private_metadata", []),
            field_name="privateMetadata",
            error_code=TransactionUpdateErrorCode.METADATA_KEY_REQUIRED.value,
        )
        cls.validate_external_url(
            transaction_data.get("external_url"),
            error_code=TransactionCreateErrorCode.INVALID.value,
        )
        if "void" in available_actions and "cancel" not in available_actions:
            available_actions.append("cancel")

    @classmethod
    def update_transaction(cls, instance, transaction_data, money_data, user):
        psp_reference = transaction_data.get(
            "psp_reference", transaction_data.pop("reference", None)
        )
        if psp_reference and instance.psp_reference != psp_reference:
            if payment_models.TransactionItem.objects.filter(
                psp_reference=psp_reference
            ).exists():
                raise ValidationError(
                    {
                        "transaction": ValidationError(
                            "Transaction with provided `pspReference` already exists.",
                            code=TransactionUpdateErrorCode.UNIQUE.value,
                        )
                    }
                )
        transaction_data["name"] = transaction_data.get(
            "name", transaction_data.pop("type", None)
        )
        transaction_data["psp_reference"] = psp_reference
        instance = cls.construct_instance(instance, transaction_data)
        instance.save()
        if money_data:
            calculate_transaction_amount_based_on_events(transaction=instance)
            create_manual_adjustment_events(
                transaction=instance, money_data=money_data, user=user, app=app
            )
            recalculate_transaction_amounts(instance)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        id = input.get("id")
        transaction_data = input.get("transaction")
        transaction_event = input.get("transaction_event")

        user = info.context.user
        instance = get_transaction_item(id)
        manager = get_plugin_manager_promise(info.context).get()

        cls.check_can_update(transaction=instance, user=user)
        money_data = {}
        if transaction_data:
            cls.validate_transaction_input(instance, transaction_data)
            cls.assign_app_to_transaction_data_if_missing(instance, transaction_data)
            cls.cleanup_metadata_data(transaction_data)
            money_data = cls.get_money_data_from_input(transaction_data)
            cls.update_transaction(instance, transaction_data, money_data, user)

        if transaction_event:
            event = cls.create_transaction_event(transaction_event, instance, user)
            if instance.order:
                reference = transaction_event.pop("reference", None)
                psp_reference = transaction_event.get("psp_reference", reference)
                order_transaction_event(
                    order=instance.order,
                    user=user,
                    reference=psp_reference or "",
                    status=transaction_event["status"],
                    message=cls.create_event_message(transaction_event),
                )

        return TransactionUpdate(transaction=instance)


class TransactionRequestAction(relay.ClientIDMutation):
    transaction = graphene.Field(TransactionItem)

    class Input:
        id = graphene.ID(
            description="The ID of the transaction.",
            required=True,
        )
        action_type = graphene.Argument(
            TransactionActionEnum,
            required=True,
            description="Determines the action type.",
        )
        amount = PositiveDecimal(
            description=(
                "Transaction request amount. If empty for refund or capture, maximal "
                "possible amount will be used."
            )
        )

    @classmethod
    def check_permissions(cls, context, permissions=None, **data):
        required_permissions = permissions or cls._meta.permissions
        requestor = get_user_or_app_from_context(context)
        for required_permission in required_permissions:
            # Permission check for manage_orders or handle_payments
            if requestor and requestor.has_perm(required_permission):
                return True
        return False

    @classmethod
    def handle_transaction_action(
        cls,
        action,
        action_kwargs,
        action_value: Optional[Decimal],
        user: Optional["User"],
    ):
        transaction = action_kwargs["transaction"]
        if action in [TransactionAction.VOID, TransactionAction.CANCEL]:
            request_event = cls.create_transaction_event_requested(
                transaction, 0, action, user=user, app=app
            )
            request_cancelation_action(
                **action_kwargs,
                cancel_value=action_value,
                request_event=request_event,
                action=action,
            )
        elif action == TransactionAction.CHARGE:
            action_value = action_value or transaction.authorized_value
            action_value = min(action_value, transaction.authorized_value)
            request_event = cls.create_transaction_event_requested(
                transaction, action_value, TransactionAction.CHARGE, user=user
            )
            request_charge_action(
                **action_kwargs, charge_value=action_value, request_event=request_event
            )
        elif action == TransactionAction.REFUND:
            action_value = action_value or transaction.charged_value
            action_value = min(action_value, transaction.charged_value)
            request_event = cls.create_transaction_event_requested(
                transaction, action_value, TransactionAction.REFUND, user=user
            )
            request_refund_action(
                **action_kwargs, refund_value=action_value, request_event=request_event
            )

    @classmethod
    def create_transaction_event_requested(
        cls, transaction, action_value, action, user=None, app=None
    ):
        event_type_mapping = {
            TransactionAction.CANCEL: TransactionEventType.CANCEL_REQUEST,
            TransactionAction.VOID: TransactionEventType.CANCEL_REQUEST,
            TransactionAction.CHARGE: TransactionEventType.CHARGE_REQUEST,
            TransactionAction.REFUND: TransactionEventType.REFUND_REQUEST,
        }
        event_type = event_type_mapping.get(action)
        if not event_type:
            raise ValidationError(
                {
                    "actionType": ValidationError(
                        "Incorrect action.",
                        code=TransactionRequestActionErrorCode.INVALID.value,
                    )
                }
            )
        return transaction.events.create(
            amount_value=action_value,
            currency=transaction.currency,
            type=event_type,
            user=user,
            app=app,
            app_identifier=app.identifier if app else None,
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            transaction = get_transaction_item(input["id"])
            user = info.context.user
            manager = get_plugin_manager_promise(info.context).get()
            cls.check_channel_permissions(info, [transaction.channel.id])
            cls.handle_transaction_action(
                input["action_type"],
                {"transaction": transaction, "user": user, "manager": manager},
                input.get("amount"),
                user,
                app,
            )
            return TransactionRequestAction(transaction=transaction)
        except PaymentError as e:
            raise ValidationError(
                {
                    "error": str(e),
                    "code": TransactionRequestActionErrorCode.MISSING_TRANSACTION_ACTION_REQUEST_WEBHOOK.value,
                }
            )


class TransactionEventReport(relay.ClientIDMutation):
    already_processed = graphene.Boolean(
        description="Defines if the reported event hasn't been processed earlier."
    )
    transaction = graphene.Field(
        TransactionItem, description="The transaction related to the reported event."
    )
    transaction_event = graphene.Field(
        TransactionEvent,
        description=(
            "The event assigned to this report. if `alreadyProcessed` is set to `true`,"
            " the previously processed event will be returned."
        ),
    )

    class Input:
        id = graphene.ID(description="The ID of the transaction.", required=True)
        psp_reference = graphene.String(
            description="PSP Reference of the event to report.", required=True
        )
        type = graphene.Argument(
            TransactionEventTypeEnum,
            required=True,
            description="Current status of the event to report.",
        )
        amount = PositiveDecimal(
            description="The amount of the event to report.", required=True
        )
        time = graphene.DateTime(
            description="The time of the event to report. If not provided, the current time will be used."
        )
        external_url = graphene.String(
            description="URL for payment provider event details."
        )
        message = graphene.String(description="Message related to the event.")
        available_actions = graphene.List(
            graphene.NonNull(TransactionActionEnum),
            description="List of all possible actions for the transaction",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            transaction = get_transaction_item(input["id"])
            user = info.context.user
            transaction_event_data = {
                "psp_reference": input["psp_reference"],
                "type": input["type"],
                "amount_value": input["amount"],
                "currency": transaction.currency,
                "created_at": input.get("time", timezone.now()),
                "external_url": input.get("external_url", ""),
                "message": input.get("message", ""),
                "transaction": transaction,
                "user": user,
                "include_in_calculations": True,
            }
            transaction_event = cls.construct_instance(
                transaction.events.create(), transaction_event_data
            )
            already_processed = (
                get_already_existing_event(transaction_event) is not None
            )

            if not already_processed:
                cls.update_transaction(
                    transaction, transaction_event, input.get("available_actions"), app
                )
            return cls(
                already_processed=already_processed,
                transaction=transaction,
                transaction_event=transaction_event,
            )

        except ValidationError as error:
            create_failed_transaction_event(transaction_event, cause=str(error))
            raise error


class PaymentGatewayConfig(InputObjectType):
    id = graphene.String(required=True, description="The app identifier.")
    data = graphene.Field(
        JSON, description="The JSON data required to initialize the payment gateway."
    )
    errors = common_types.NonNullList(common_types.PaymentGatewayConfigError)

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class PaymentGatewayToInitialize(InputObjectType):
    id = graphene.String(
        required=True,
        description="The identifier of the payment gateway app to initialize.",
    )
    data = graphene.Field(
        JSON, description="The data that will be passed to the payment gateway."
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAYMENTS


class TransactionSessionBase(relay.ClientIDMutation):
    class Meta:
        abstract = True

    @classmethod
    def clean_source_object(
        cls,
        info,
        id: str,
        incorrect_type_error_code: str,
        not_found_error: str,
        manager: "PluginsManager",
    ) -> Union[checkout_models.Checkout, order_models.Order]:
        source_object_type, source_object_id = from_global_id_or_error(
            id, raise_error=False
        )
        if not source_object_type or not source_object_id:
            raise GraphQLError(f"Couldn't resolve id: {id}.")

        if source_object_type not in ["Checkout", "Order"]:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Must receive a `Checkout` or `Order` id.",
                        code=incorrect_type_error_code,
                    )
                }
            )

        source_object: Optional[Union[checkout_models.Checkout, order_models.Order]]
        source_object = cls.fetch_source_object(source_object_type, source_object_id)

        if not source_object:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "`Order` or `Checkout` not found.",
                        code=not_found_error,
                    )
                }
            )
        return source_object

    @classmethod
    def fetch_source_object(cls, source_object_type: str, source_object_id: str):
        if source_object_type == "Checkout":
            source_object = (
                checkout_models.Checkout.objects.select_related("channel")
                .prefetch_related("payment_transactions")
                .filter(pk=source_object_id)
                .first()
            )
            if source_object:
                lines, _ = fetch_checkout_lines(source_object)
                checkout_info = fetch_checkout_info(source_object, lines, manager)
                checkout_info, _ = fetch_checkout_data(checkout_info, manager, lines)
                return checkout_info.checkout
        else:
            return (
                order_models.Order.objects.select_related("channel")
                .prefetch_related("payment_transactions")
                .filter(pk=source_object_id)
                .first()
            )

    @classmethod
    def get_amount(
        cls,
        source_object: Union[checkout_models.Checkout, order_models.Order],
        input_amount: Optional[Decimal],
    ) -> Decimal:
        amount = (
            input_amount
            if input_amount is not None
            else source_object.total_gross_amount
        )
        for transaction in source_object.payment_transactions.all():
            amount = cls.reduce_transaction_amount(amount, transaction)
        return max(amount, Decimal(0))

    @staticmethod
    def reduce_transaction_amount(amount: Decimal, transaction):
        for attr in [
            "authorized_value",
            "charged_value",
            "authorize_pending_value",
            "charge_pending_value",
        ]:
            amount -= getattr(transaction, attr)
        return amount


class PaymentGatewayInitialize(relay.ClientIDMutation, TransactionSessionBase):
    gateway_configs = common_types.NonNullList(PaymentGatewayConfig)

    class Input:
        id = graphene.ID(
            description="The ID of the checkout or order.",
            required=True,
        )
        amount = graphene.Argument(
            PositiveDecimal,
            description=(
                "The amount requested for initializing the payment gateway. "
                "If not provided, the difference between checkout.total - "
                "transactions that are already processed will be sent."
            ),
        )
        payment_gateways = graphene.List(
            graphene.NonNull(PaymentGatewayToInitialize),
            description="List of payment gateways to initialize.",
            required=False,
        )

    @classmethod
    def prepare_response(
        cls,
        payment_gateways_input: list[PaymentGatewayData],
        payment_gateways_response: list[PaymentGatewayData],
    ) -> list[PaymentGatewayConfig]:
        response = []
        payment_gateways_response_dict = {
            gateway.app_identifier: gateway for gateway in payment_gateways_response
        }
        input_dict = (
            {gateway.app_identifier: gateway for gateway in payment_gateways_input}
            if payment_gateways_input
            else payment_gateways_response_dict
        )

        for identifier, gateway in input_dict.items():
            errors, data_to_return = cls.handle_gateway_response(
                identifier, gateway, payment_gateways_response_dict
            )
            response.append(
                PaymentGatewayConfig(id=identifier, data=data_to_return, errors=errors)
            )
        return response

    @staticmethod
    def handle_gateway_response(identifier, gateway, response_dict):
        if identifier in response_dict:
            response_data = response_dict[identifier].data
            errors = (
                [
                    {
                        "field": "id",
                        "message": response_dict[identifier].error,
                        "code": common_types.PaymentGatewayConfigErrorCode.INVALID.value,
                    }
                ]
                if response_dict[identifier].error
                else []
            )
        else:
            response_data, errors = None, [
                {
                    "field": "id",
                    "message": "Active app with `HANDLE_PAYMENT` permissions or app webhook not found.",
                    "code": common_types.PaymentGatewayConfigErrorCode.NOT_FOUND.value,
                }
            ]
        return errors, response_data.get("data") if response_data else None

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        manager = get_plugin_manager_promise(info.context).get()
        source_object = cls.clean_source_object(
            info,
            input.get("id"),
            PaymentGatewayInitializeErrorCode.INVALID.value,
            PaymentGatewayInitializeErrorCode.NOT_FOUND.value,
            manager=manager,
        )
        payment_gateways_data = [
            PaymentGatewayData(app_identifier=gateway["id"], data=gateway.get("data"))
            for gateway in input.get("payment_gateways", [])
        ]
        amount = cls.get_amount(source_object, input.get("amount"))
        response_data = manager.payment_gateway_initialize_session(
            amount, payment_gateways_data, source_object
        )
        return cls(
            gateway_configs=cls.prepare_response(payment_gateways_data, response_data),
            errors=[],
        )


class TransactionInitialize(relay.ClientIDMutation, TransactionSessionBase):
    transaction = graphene.Field(
        TransactionItem, description="The initialized transaction."
    )
    transaction_event = graphene.Field(
        TransactionEvent,
        description="The event created for the initialized transaction.",
    )
    data = graphene.Field(
        JSON, description="The JSON data required to finalize the payment."
    )

    class Input:
        id = graphene.ID(
            description="The ID of the checkout or order.",
            required=True,
        )
        amount = graphene.Argument(
            PositiveDecimal,
            description=(
                "The amount requested for initializing the payment gateway. "
                "If not provided, the difference between checkout.total - "
                "processed transactions will be sent."
            ),
        )
        action = graphene.Argument(
            TransactionFlowStrategyEnum,
            description=(
                "The expected action called for the transaction. By default, the "
                "`channel.defaultTransactionFlowStrategy` will be used. The field "
                "can be used only by an app that has `HANDLE_PAYMENTS` permission."
            ),
        )
        payment_gateway = graphene.Argument(
            PaymentGatewayToInitialize,
            description="Payment gateway used to initialize the transaction.",
            required=True,
        )

    @classmethod
    def clean_action(cls, info, action: Optional[str], channel: "Channel"):
        if not action:
            return channel.default_transaction_flow_strategy
        return action

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        manager = get_plugin_manager_promise(info.context).get()
        payment_gateway_data = PaymentGatewayData(
            data=input["payment_gateway"].get("data")
        )
        source_object = cls.clean_source_object(
            info,
            input["id"],
            TransactionInitializeErrorCode.INVALID.value,
            TransactionInitializeErrorCode.NOT_FOUND.value,
            manager=manager,
        )
        action = cls.clean_action(info, input.get("action"), source_object.channel)
        amount = cls.get_amount(source_object, input.get("amount"))
        transaction, event, data = handle_transaction_initialize_session(
            source_object=source_object,
            payment_gateway=payment_gateway_data,
            amount=amount,
            action=action,
            manager=manager,
        )
        return cls(transaction=transaction, transaction_event=event, data=data)


class TransactionProcess(relay.ClientIDMutation):
    transaction = graphene.Field(
        TransactionItem, description="The processed transaction."
    )
    transaction_event = graphene.Field(
        TransactionEvent,
        description="The event created for the processed transaction.",
    )
    data = graphene.Field(
        JSON, description="The JSON data required to finalize the payment."
    )

    class Input:
        id = graphene.ID(
            description="The ID of the transaction to process.",
            required=True,
        )
        data = graphene.Argument(
            JSON, description="The data that will be passed to the payment gateway."
        )

    @classmethod
    def get_action(cls, event: payment_models.TransactionEvent, channel: "Channel"):
        return (
            TransactionFlowStrategy.AUTHORIZATION
            if event.type == TransactionEventType.AUTHORIZATION_REQUEST
            else (
                TransactionFlowStrategy.CHARGE
                if event.type == TransactionEventType.CHARGE_REQUEST
                else channel.default_transaction_flow_strategy
            )
        )

    @classmethod
    def get_source_object(
        cls, transaction_item: payment_models.TransactionItem
    ) -> Union[checkout_models.Checkout, order_models.Order]:
        if transaction_item.checkout_id:
            return cast(checkout_models.Checkout, transaction_item.checkout)
        elif transaction_item.order_id:
            return cast(order_models.Order, transaction_item.order)
        raise ValidationError(
            {
                "id": ValidationError(
                    "Transaction has no attached order or checkout.",
                    code=TransactionProcessErrorCode.INVALID.value,
                )
            }
        )

    @classmethod
    def get_request_event(cls, events: QuerySet) -> payment_models.TransactionEvent:
        for event in events:
            if (
                event.type
                in [
                    TransactionEventType.AUTHORIZATION_REQUEST,
                    TransactionEventType.CHARGE_REQUEST,
                ]
                and not event.include_in_calculations
            ):
                return event
        raise ValidationError(
            {
                "id": ValidationError(
                    "Missing call of `transactionInitialize` mutation.",
                    code=TransactionProcessErrorCode.INVALID.value,
                )
            }
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        transaction_item = cls.get_node_or_error(
            info, input["id"], only_type="TransactionItem", field="token"
        )
        transaction_item = cast(payment_models.TransactionItem, transaction_item)
        events = transaction_item.events.all()
        if processed_event := cls.get_already_processed_event(events):
            return cls(
                transaction=transaction_item,
                transaction_event=processed_event,
                data=None,
            )
        request_event = cls.get_request_event(events)
        source_object = cls.get_source_object(transaction_item)
        action = cls.get_action(request_event, source_object.channel)
        manager = get_plugin_manager_promise(info.context).get()
        event, data = handle_transaction_process_session(
            transaction_item=transaction_item,
            source_object=source_object,
            payment_gateway=PaymentGatewayData(data=input.get("data")),
            action=action,
            manager=manager,
            request_event=request_event,
        )

        transaction_item.refresh_from_db()
        return cls(transaction=transaction_item, transaction_event=event, data=data)


class PaymentMutations(graphene.ObjectType):
    payment_capture = PaymentCapture.Field()
    payment_refund = PaymentRefund.Field()
    payment_void = PaymentVoid.Field()
    payment_initialize = PaymentInitialize.Field()
    payment_check_balance = PaymentCheckBalance.Field()

    transaction_create = TransactionCreate.Field()
    transaction_update = TransactionUpdate.Field()
    transaction_request_action = TransactionRequestAction.Field()
    transaction_event_report = TransactionEventReport.Field()

    payment_gateway_initialize = PaymentGatewayInitialize.Field()
    transaction_initialize = TransactionInitialize.Field()
    transaction_process = TransactionProcess.Field()
