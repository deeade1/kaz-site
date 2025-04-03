from typing import Dict, cast

import graphene
from account.models import User
from django.core.exceptions import ValidationError
from permission.enums import OrderPermissions

from core import JobStatus
from graphq.invoice.types import InvoiceNode
from graphq.order.types import OrderNode
from invoice import events, models
from invoice.error_codes import InvoiceErrorCode
from invoice.notifications import send_invoice
from order import events as order_events

from ..core.doc_category import DOC_CATEGORY_ORDERS
from ..core.mutations import ModelDeleteMutation, ModelMutation
from ..core.types import BaseInputObjectType, InvoiceError, NonNullList
from ..meta.mutations import MetadataInput
from ..plugins.dataloaders import get_plugin_manager_promise
from .utils import is_event_active_for_any_plugin


class InvoiceRequest(relay.ClientIDMutation):
    order = graphene.Field(OrderNode, description="Order related to an invoice.")

    class Input:
        order_id = graphene.ID(
            required=True, description="ID of the order related to invoice."
        )
        number = graphene.String(
            required=False,
            description="Invoice number, if not provided it will be generated.",
        )

    @staticmethod
    def clean_order(order):
        if order.is_draft() or order.is_unconfirmed() or order.is_expired():
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Cannot request an invoice for draft, "
                        "unconfirmed or expired order.",
                        code=InvoiceErrorCode.INVALID_STATUS.value,
                    )
                }
            )

        if not order.billing_address:
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Cannot request an invoice for order without billing address.",
                        code=InvoiceErrorCode.NOT_READY.value,
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(self, info, id):
        user = context.user
        order = cls.get_node_or_error(info, order_id, only_type=Order, field="orderId")
        cls.check_channel_permissions(info, [order.channel_id])
        cls.clean_order(order)
        manager = user
        shallow_invoice = models.Invoice.objects.create(
            order=order,
            number=number,
        )

        invoice = manager.invoice_request(
            order=order, invoice=shallow_invoice, number=number
        )
        if invoice and invoice.status == JobStatus.SUCCESS:
            order_events.invoice_generated_event(
                order=order,
                user=info.context.user,
                invoice_number=invoice.number,
            )
        else:
            order_events.invoice_requested_event(user=info.context.user, order=order)

        events.invoice_requested_event(
            user=info.context.user,
            order=order,
            number=number,
        )
        return InvoiceRequest(invoice=invoice, order=order)


class InvoiceCreateInput(InputObjectType):
    number = graphene.String(required=True, description="Invoice number.")
    url = graphene.String(required=True, description="URL of an invoice to download.")
    metadata = NonNullList(
        MetadataInput,
        description="Fields required to update the invoice metadata.",
        required=False,
    )
    private_metadata = NonNullList(
        MetadataInput,
        description=("Fields required to update the invoice private metadata."),
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class InvoiceCreate(relay.ClientIDMutation):
    class Input:
        order_id = graphene.ID(
            required=True, description="ID of the order related to invoice."
        )
        input = InvoiceCreateInput(
            required=True, description="Fields required when creating an invoice."
        )

    @classmethod
    def clean_input(cls, info, _instance, data):  # type: ignore[override]
        validation_errors = {}
        for field in ["url", "number"]:
            if data[field] == "":
                validation_errors[field] = ValidationError(
                    f"{field} cannot be empty.",
                    code=InvoiceErrorCode.REQUIRED.value,
                )
        if validation_errors:
            raise ValidationError(validation_errors)
        return data

    @classmethod
    def clean_order(cls, info, order):
        if order.is_draft() or order.is_unconfirmed() or order.is_expired():
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Cannot create an invoice for draft, "
                        "unconfirmed or expired order.",
                        code=InvoiceErrorCode.INVALID_STATUS.value,
                    )
                }
            )

        if not order.billing_address:
            raise ValidationError(
                {
                    "orderId": ValidationError(
                        "Cannot create an invoice for order without billing address.",
                        code=InvoiceErrorCode.NOT_READY.value,
                    )
                }
            )

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        order = cls.get_node_or_error(info, order_id, only_type=Order, field="orderId")
        cls.check_channel_permissions(info, [order.channel_id])
        cls.clean_order(info, order)
        cleaned_input = cls.clean_input(info, order, input)

        metadata_list = cleaned_input.pop("metadata", None)
        private_metadata_list = cleaned_input.pop("private_metadata", None)

        invoice = models.Invoice(**cleaned_input)
        invoice.order = order
        invoice.status = JobStatus.SUCCESS
        cls.validate_and_update_metadata(invoice, metadata_list, private_metadata_list)
        invoice.save()

        events.invoice_created_event(
            user=info.context.user,
            invoice=invoice,
            number=cleaned_input["number"],
            url=cleaned_input["url"],
        )
        order_events.invoice_generated_event(
            order=order,
            user=info.context.user,
            invoice_number=cleaned_input["number"],
        )
        return InvoiceCreate(invoice=invoice)


class InvoiceRequestDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(
            required=True, description="ID of an invoice to request the deletion."
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        invoice = cls.get_node_or_error(info, id, only_type=Invoice)
        cls.check_channel_permissions(info, [invoice.order.channel_id])
        invoice.status = JobStatus.PENDING
        invoice.save(update_fields=["status", "updated_at"])
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.invoice_delete, invoice)
        events.invoice_requested_deletion_event(user=info.context.user, invoice=invoice)
        return InvoiceRequestDelete(invoice=invoice)


class InvoiceDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of an invoice to delete.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        invoice = cls.get_instance(info, **data)
        cls.check_channel_permissions(info, [invoice.order.channel_id])
        response = super().perform_mutation(_root, info, **data)
        app = get_app_promise(info.context).get()
        events.invoice_deleted_event(
            user=info.context.user, app=app, invoice_id=invoice.pk
        )
        return response


class UpdateInvoiceInput(InputObjectType):
    number = graphene.String(description="Invoice number")
    url = graphene.String(description="URL of an invoice to download.")
    metadata = NonNullList(
        MetadataInput,
        description="Fields required to update the invoice metadata.",
        required=False,
    )
    private_metadata = NonNullList(
        MetadataInput,
        description=("Fields required to update the invoice private metadata."),
        required=False,
    )

    class Meta:
        doc_category = DOC_CATEGORY_ORDERS


class InvoiceUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of an invoice to update.")
        input = UpdateInvoiceInput(
            required=True, description="Fields to use when updating an invoice."
        )

    @classmethod
    def clean_input(cls, info, instance, data):  # type: ignore[override]
        number = instance.number or data.get("number")
        url = instance.external_url or data.get("url")

        validation_errors: Dict[str, ValidationError] = {}
        if not number:
            validation_errors["number"] = ValidationError(
                "Number need to be set after update operation.",
                code=InvoiceErrorCode.NUMBER_NOT_SET.value,
            )
        if not url:
            validation_errors["url"] = ValidationError(
                "URL need to be set after update operation.",
                code=InvoiceErrorCode.URL_NOT_SET.value,
            )

        if validation_errors:
            raise ValidationError(validation_errors)

        return data

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        instance = cls.get_instance(info, id=id)
        cls.check_channel_permissions(info, [instance.order.channel_id])
        cleaned_input = cls.clean_input(info, instance, input)
        metadata_list = cleaned_input.pop("metadata", None)
        private_metadata_list = cleaned_input.pop("private_metadata", None)
        cls.validate_and_update_metadata(instance, metadata_list, private_metadata_list)
        instance.update_invoice(
            number=cleaned_input.get("number"), url=cleaned_input.get("url")
        )
        instance.status = JobStatus.SUCCESS
        instance.save(
            update_fields=[
                "external_url",
                "number",
                "updated_at",
                "status",
                "metadata",
                "private_metadata",
            ]
        )
        order_events.invoice_updated_event(
            order=instance.order,
            user=info.context.user,
            invoice_number=instance.number,
            url=instance.url,
            status=instance.status,
        )
        return InvoiceUpdate(invoice=instance)


class InvoiceSendNotification(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of an invoice to be sent.")

    @classmethod
    def clean_instance(cls, info, instance):
        validation_errors = {}
        if instance.status != JobStatus.SUCCESS:
            validation_errors["invoice"] = ValidationError(
                "Provided invoice is not ready to be sent.",
                code=InvoiceErrorCode.NOT_READY.value,
            )
        if not instance.url:
            validation_errors["url"] = ValidationError(
                "Provided invoice needs to have an URL.",
                code=InvoiceErrorCode.URL_NOT_SET.value,
            )
        if not instance.number:
            validation_errors["number"] = ValidationError(
                "Provided invoice needs to have an invoice number.",
                code=InvoiceErrorCode.NUMBER_NOT_SET.value,
            )
        if not instance.order.get_customer_email():
            validation_errors["order"] = ValidationError(
                "Provided invoice order needs an email address.",
                code=InvoiceErrorCode.EMAIL_NOT_SET.value,
            )

        if validation_errors:
            raise ValidationError(validation_errors)

    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        user = info.context.user
        user = cast(User, user)
        instance = cls.get_instance(info, id=id)
        cls.check_channel_permissions(info, [instance.order.channel_id])
        cls.clean_instance(info, instance)
        manager = get_plugin_manager_promise(info.context).get()
        send_invoice(
            invoice=instance,
            staff_user=user,
            manager=manager,
        )
        return InvoiceSendNotification(invoice=instance)


class InvoiceMutations(graphene.ObjectType):
    invoice_request = InvoiceRequest.Field()
    invoice_request_delete = InvoiceRequestDelete.Field()
    invoice_create = InvoiceCreate.Field()
    invoice_delete = InvoiceDelete.Field()
    invoice_update = InvoiceUpdate.Field()
    invoice_send_notification = InvoiceSendNotification.Field()
