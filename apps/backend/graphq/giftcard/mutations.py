import datetime
from copy import deepcopy
from typing import Iterable

import graphene
from account.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from graphene import Date, Decimal
from permission.enums import GiftcardPermissions

from core.tracing import traced_atomic_transaction
from core.utils.promo_code import generate_promo_code, is_available_promo_code
from core.utils.validators import is_date_in_future
from giftcard import events, models
from giftcard.error_codes import GiftCardErrorCode
from giftcard.notifications import send_gift_card_notification
from giftcard.utils import (
    activate_gift_card,
    deactivate_gift_card,
    is_gift_card_expired,
)
from graphq.core.types.common import (
    BaseInputObjectType,
    GiftCardError,
    NonNullList,
    PriceInput,
)
from graphq.core.validators import (
    validate_price_precision,
    validate_required_string_field,
)
from graphq.giftcard.types import GiftCardEventNode, GiftCardNode
from graphq.utils.validators import check_for_duplicates

from ..core.scalars import Date, PositiveDecimal
from ..plugins.dataloaders import get_plugin_manager_promise


def clean_gift_card(gift_card: models.GiftCard) -> models.GiftCard:
    if is_gift_card_expired(gift_card):
        raise ValidationError(
            {
                "id": ValidationError(
                    "Expired gift card cannot be activated and resend.",
                    code=GiftCardErrorCode.EXPIRED_GIFT_CARD.value,
                )
            }
        )
    return gift_card


class GiftCardCreate(relay.ClientIDMutation):
    giftcard = graphene.Field(GiftCardNode)

    class Input:
        add_tags = graphene.List(graphene.NonNull(graphene.String))
        expiry_date = Date(required=True, date_input=Date(required=True))
        balance = graphene.Field(
            PriceInput, description="Balance of the gift card.", required=True
        )
        user_email = graphene.String(
            required=False,
            description="Email of the customer to whom gift card will be sent.",
        )
        channel = graphene.String(
            description=("Slug of a channel from which the email should be sent.")
        )
        is_active = graphene.Boolean(
            required=True,
            description=("Determine if gift card is active."),
        )

        note = graphene.String(
            description=("The gift card note from the staff member.")
        )
        remove_tags = NonNullList(
            graphene.String,
            description="The gift card tags to remove.",
        )
        balance_amount = Decimal(required=True, decimal_input=Decimal(required=True))

    @classmethod
    def clean_input(cls, info, instance, data, **kwargs):
        cleaned_input = super().clean_input(info, instance, data, **kwargs)

        # perform only when gift card is created
        if instance.pk is None:
            code = cleaned_input.get("code")
            if code and not is_available_promo_code(code):
                raise ValidationError(
                    {
                        "code": ValidationError(
                            "Promo code already exists.",
                            code=GiftCardErrorCode.ALREADY_EXISTS.value,
                        )
                    }
                )

            cleaned_input["code"] = code or generate_promo_code()
            cls.set_created_by_user(cleaned_input, info)

        cls.clean_expiry_date(cleaned_input, instance)
        cls.clean_balance(cleaned_input, instance)

        if email := data.get("user_email"):
            try:
                validate_email(email)
            except ValidationError:
                raise ValidationError(
                    {
                        "email": ValidationError(
                            "Provided email is invalid.",
                            code=GiftCardErrorCode.INVALID.value,
                        )
                    }
                )
            if not data.get("channel"):
                raise ValidationError(
                    {
                        "channel": ValidationError(
                            "Channel slug must be specified "
                            "when user_email is provided.",
                            code=GiftCardErrorCode.REQUIRED.value,
                        )
                    }
                )
            cleaned_input["customer_user"] = User.objects.filter(email=email).first()

        return cleaned_input

    @staticmethod
    def set_created_by_user(cleaned_input, info):
        user = info.context.user
        if user:
            cleaned_input["created_by"] = user
            cleaned_input["created_by_email"] = user.email
        cleaned_input["app"] = get_app_promise(info.context).get()

    @classmethod
    def clean_expiry_date(cls, cleaned_input, instance):
        expiry_date = cleaned_input.get("expiry_date")
        if expiry_date and not is_date_in_future(expiry_date):
            raise ValidationError(
                {
                    "expiry_date": ValidationError(
                        "Expiry date must be in the future.",
                        code=GiftCardErrorCode.INVALID.value,
                    )
                }
            )

    @staticmethod
    def clean_balance(cleaned_input, instance):
        balance = cleaned_input.pop("balance", None)
        if balance:
            amount = balance["amount"]
            currency = balance["currency"]
            try:
                validate_price_precision(amount, currency)
            except ValidationError as error:
                error.code = GiftCardErrorCode.INVALID.value
                raise ValidationError({"balance": error})
            if instance.pk:
                if currency != instance.currency:
                    raise ValidationError(
                        {
                            "balance": ValidationError(
                                "Cannot change gift card currency.",
                                code=GiftCardErrorCode.INVALID.value,
                            )
                        }
                    )
            if not amount > 0:
                raise ValidationError(
                    {
                        "balance": ValidationError(
                            "Balance amount have to be greater than 0.",
                            code=GiftCardErrorCode.INVALID.value,
                        )
                    }
                )
            cleaned_input["currency"] = currency
            cleaned_input["current_balance_amount"] = amount
            cleaned_input["initial_balance_amount"] = amount

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        user = info.context.user
        events.gift_card_issued_event(
            gift_card=instance,
            user=user,
        )
        manager = get_plugin_manager_promise(info.context).get()
        if note := cleaned_input.get("note"):
            events.gift_card_note_added_event(
                gift_card=instance, user=user, message=note
            )
        if email := cleaned_input.get("user_email"):
            send_gift_card_notification(
                cleaned_input.get("created_by"),
                cleaned_input.get("app"),
                cleaned_input["customer_user"],
                email,
                instance,
                manager,
                channel_slug=cleaned_input["channel"],
                resending=False,
            )
        cls.call_event(manager.gift_card_created, instance)

    @staticmethod
    def assign_gift_card_tags(instance: models.GiftCard, tags_values: Iterable[str]):
        add_tags = {tag.lower() for tag in tags_values}
        add_tags_instances = models.GiftCardTag.objects.filter(name__in=add_tags)
        tags_to_create = add_tags - set(
            add_tags_instances.values_list("name", flat=True)
        )
        models.GiftCardTag.objects.bulk_create(
            [models.GiftCardTag(name=tag) for tag in tags_to_create]
        )
        instance.tags.add(*add_tags_instances)

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        with traced_atomic_transaction():
            super()._save_m2m(info, instance, cleaned_data)
            tags = cleaned_data.get("add_tags")
            if tags:
                cls.assign_gift_card_tags(instance, tags)

    @classmethod
    def mutate_and_get_payload(self, info, **input):
        giftcard = GiftCard(
            expiry_date=input.get(),
            balance=input.get("balance"),
            user_email=input.get(),
            channel=input.get(),
            is_active=input.get(),
            note=input.get(),
            remove_tags=input.get(),
            balance_amount=input.get(),
        )
        return GiftCardCreate(giftcard=giftcard)


class GiftCardUpdate(relay.ClientIDMutation):
    gift_card = graphene.Field(GiftCardNode)

    class Input:
        id = graphene.ID(required=True, description="ID of a gift card to update.")
        expiry_date = graphene.Date(description="New expiry date for the gift card.")
        balance_amount = graphene.Float(description="New balance for the gift card.")
        add_tags = graphene.List(
            graphene.NonNull(graphene.String),
            description="Tags to add to the gift card.",
        )
        remove_tags = graphene.List(
            graphene.NonNull(graphene.String),
            description="Tags to remove from the gift card.",
        )

    @classmethod
    def clean_expiry_date(cls, cleaned_input, instance):
        expiry_date = cleaned_input.get("expiry_date")
        if expiry_date:
            if expiry_date <= now().date():
                raise ValidationError(
                    {
                        "expiry_date": ValidationError(
                            "Expiry date must be in the future.",
                            code=GiftCardErrorCode.INVALID.value,
                        )
                    }
                )
            if expiry_date == instance.expiry_date:
                del cleaned_input["expiry_date"]

    @staticmethod
    def clean_balance(cleaned_input, instance):
        amount = cleaned_input.pop("balance_amount", None)
        if amount is None:
            return

        currency = instance.currency
        try:
            validate_price_precision(amount, currency)
        except ValidationError as error:
            error.code = GiftCardErrorCode.INVALID.value
            raise ValidationError({"balance_amount": error})

        cleaned_input["current_balance_amount"] = amount
        cleaned_input["initial_balance_amount"] = amount

    @staticmethod
    def clean_tags(cleaned_input):
        error = check_for_duplicates(cleaned_input, "add_tags", "remove_tags", "tags")
        if error:
            error.code = GiftCardErrorCode.DUPLICATED_INPUT_ITEM.value
            raise ValidationError({"tags": error})

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        instance = cls.get_node_or_error(info, input["id"], only_type=GiftCard)

        old_instance = deepcopy(instance)

        cleaned_input = cls.clean_input(info, instance, input)

        tags_updated = "add_tags" in cleaned_input or "remove_tags" in cleaned_input
        if tags_updated:
            old_tags = list(
                old_instance.tags.order_by("name").values_list("name", flat=True)
            )

        instance = cls.construct_instance(instance, cleaned_input)
        cls.clean_instance(info, instance)
        cls.save(info, instance, cleaned_input)
        cls._save_m2m(info, instance, cleaned_input)

        user = info.context.user

        # Trigger balance reset event if updated
        if "initial_balance_amount" in cleaned_input:
            events.gift_card_balance_reset_event(instance, old_instance, user)

        # Trigger expiry date update event if updated
        if "expiry_date" in cleaned_input:
            events.gift_card_expiry_date_updated_event(instance, old_instance, user)

        # Handle tag updates
        if tags_updated:
            new_tags = list(
                instance.tags.order_by("name").values_list("name", flat=True)
            )
            events.gift_card_tags_updated_event(instance, old_tags, new_tags, user)

        return GiftCardUpdate(gift_card=instance)

    @classmethod
    def clean_input(cls, info, instance, data, **kwargs):
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        cls.clean_expiry_date(cleaned_input, instance)
        cls.clean_balance(cleaned_input, instance)
        cls.clean_tags(cleaned_input)
        return cleaned_input

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)

        remove_tags = cleaned_data.get("remove_tags")
        if remove_tags:
            remove_tags = {tag.lower() for tag in remove_tags}
            remove_tags_instances = GiftCardTag.objects.filter(name__in=remove_tags)
            instance.tags.remove(*remove_tags_instances)

            # Delete tags that are no longer assigned to any gift card
            remove_tags_instances.filter(gift_cards__isnull=True).delete()


class GiftCardDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(description="ID of the gift card to delete.", required=True)

    success = graphene.Boolean(
        description="Indicates whether the deletion was successful."
    )

    @classmethod
    def post_save_action(cls, info, instance):
        manager = get_plugin_manager_promise(info.context).get()
        events.gift_card_deleted_event(instance, user=info.context.user)
        manager.gift_card_deleted(instance)

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        gift_card = cls.get_node_or_error(info, id, only_type=GiftCard, field="id")
        gift_card.delete()

        # Post-deletion actions
        cls.post_save_action(info, gift_card)

        return GiftCardDelete(success=True)


class GiftCardDeactivate(relay.ClientIDMutation):
    gift_card = graphene.Field(GiftCardNode, description="Deactivated gift card.")

    class Input:
        id = graphene.ID(required=True, description="ID of a gift card to deactivate.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        gift_card = cls.get_node_or_error(
            info, input["id"], field="id", only_type=GiftCard
        )

        # Create event only if the gift card is currently active
        create_event = gift_card.is_active
        deactivate_gift_card(gift_card)

        # Log the deactivation event if the status changed
        if create_event:
            events.gift_card_deactivated_event(
                gift_card=gift_card,
                user=info.context.user,
                app=info.context.app,
            )

        # Notify plugins about the status change
        manager = get_plugin_manager_promise(info.context).get()
        manager.gift_card_status_changed(gift_card)

        return GiftCardDeactivate(gift_card=gift_card)


class GiftCardActivate(relay.ClientIDMutation):
    gift_card = graphene.Field(GiftCardNode, description="Activated gift card.")

    class Input:
        id = graphene.ID(required=True, description="ID of a gift card to activate.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        gift_card = cls.get_node_or_error(
            info, input["id"], field="id", only_type=GiftCard
        )

        # Validate the gift card before activation
        clean_gift_card(gift_card)

        # Create event only if the gift card is currently inactive
        create_event = not gift_card.is_active
        activate_gift_card(gift_card)

        # Log the activation event if the status changed
        if create_event:
            events.gift_card_activated_event(
                gift_card=gift_card,
                user=info.context.user,
                app=info.context.app,
            )

        # Notify plugins about the status change
        manager = get_plugin_manager_promise(info.context).get()
        manager.gift_card_status_changed(gift_card)

        return GiftCardActivate(gift_card=gift_card)


class GiftCardResend(relay.ClientIDMutation):
    gift_card = graphene.Field(
        GiftCardNode, description="Gift card which has been sent."
    )

    class Input:
        id = graphene.ID(required=True, description="ID of a gift card to resend.")
        email = graphene.String(
            required=False, description="Email to which the gift card should be sent."
        )
        channel = graphene.String(
            required=True,
            description="Slug of a channel from which the email should be sent.",
        )

    @classmethod
    def clean_input(cls, data):
        if email := data.get("email"):
            try:
                validate_email(email)
            except ValidationError:
                raise ValidationError(
                    {
                        "email": ValidationError(
                            "Provided email is invalid.",
                            code=GiftCardErrorCode.INVALID.value,
                        )
                    }
                )
        return data

    @classmethod
    def get_target_email(cls, data, gift_card):
        return (
            data.get("email") or gift_card.used_by_email or gift_card.created_by_email
        )

    @classmethod
    def get_customer_user(cls, email):
        return User.objects.filter(email=email).first()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        gift_card = cls.get_node_or_error(
            info, input["id"], field="id", only_type=GiftCard
        )

        # Validate input and clean email
        data = cls.clean_input(input)
        clean_gift_card(gift_card)

        # Resolve target email and customer user
        target_email = cls.get_target_email(data, gift_card)
        customer_user = cls.get_customer_user(target_email)

        # Send notification
        manager = get_plugin_manager_promise(info.context).get()
        send_gift_card_notification(
            user=info.context.user or None,
            customer_user=customer_user,
            target_email=target_email,
            gift_card=gift_card,
            manager=manager,
            channel_slug=data.get("channel"),
            resending=True,
        )

        return GiftCardResend(gift_card=gift_card)


class GiftCardAddNote(relay.ClientIDMutation):
    gift_card = graphene.Field(
        GiftCardNode, description="Gift card with the note added."
    )
    event = graphene.Field(GiftCardEventNode, description="Gift card note created.")

    class Input:
        id = graphene.ID(
            required=True, description="ID of the gift card to add a note for."
        )
        message = graphene.String(description="Note message.", required=True)

    @classmethod
    def clean_input(cls, info, _instance, data):
        try:
            cleaned_input = validate_required_string_field(data, "message")
        except ValidationError:
            raise ValidationError(
                {
                    "message": ValidationError(
                        "Message can't be empty.",
                        code=GiftCardErrorCode.REQUIRED.value,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        # Retrieve and validate the gift card instance
        gift_card = cls.get_node_or_error(info, input["id"], only_type=GiftCard)

        # Clean input and validate message
        cleaned_input = cls.clean_input(info, gift_card, input)

        # Create a note event for the gift card
        app = get_app_promise(info.context).get()
        event = events.gift_card_note_added_event(
            gift_card=gift_card,
            user=info.context.user,
            app=app,
            message=cleaned_input["message"],
        )

        # Notify plugins about the update
        manager = get_plugin_manager_promise(info.context).get()
        manager.gift_card_updated(gift_card)

        return GiftCardAddNote(gift_card=gift_card, event=event)


class GiftCardMutations(graphene.ObjectType):
    gift_card_activate = GiftCardActivate.Field()
    gift_card_create = GiftCardCreate.Field()
    gift_card_delete = GiftCardDelete.Field()
    gift_card_deactivate = GiftCardDeactivate.Field()
    gift_card_update = GiftCardUpdate.Field()
    gift_card_resend = GiftCardResend.Field()
    gift_card_add_note = GiftCardAddNote.Field()
