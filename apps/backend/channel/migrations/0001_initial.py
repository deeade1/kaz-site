# Generated by Django 5.0.7 on 2024-12-09 19:48

import datetime

import django.contrib.postgres.indexes
import django_countries.fields
from django.db import migrations, models

import core.utils.json_serializer


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Channel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "private_metadata",
                    models.JSONField(
                        blank=True,
                        default=dict,
                        encoder=core.utils.json_serializer.CustomJsonEncoder,
                        null=True,
                    ),
                ),
                (
                    "metadata",
                    models.JSONField(
                        blank=True,
                        default=dict,
                        encoder=core.utils.json_serializer.CustomJsonEncoder,
                        null=True,
                    ),
                ),
                ("name", models.CharField(max_length=250)),
                ("is_active", models.BooleanField(default=False)),
                ("slug", models.SlugField(max_length=255, unique=True)),
                ("currency_code", models.CharField(max_length=3)),
                ("default_country", django_countries.fields.CountryField(max_length=2)),
                (
                    "allocation_strategy",
                    models.CharField(
                        choices=[
                            ("prioritize-sorting-order", "Prioritize sorting order"),
                            ("prioritize-high-stock", "Prioritize high stock"),
                        ],
                        default="prioritize-sorting-order",
                        max_length=255,
                    ),
                ),
                (
                    "order_mark_as_paid_strategy",
                    models.CharField(
                        choices=[
                            ("transaction_flow", "Use transaction"),
                            ("payment_flow", "Use payment"),
                        ],
                        default="payment_flow",
                        max_length=255,
                    ),
                ),
                (
                    "default_transaction_flow_strategy",
                    models.CharField(
                        choices=[("authorization", "Authorize"), ("charge", "Charge")],
                        default="charge",
                        max_length=255,
                    ),
                ),
                (
                    "automatically_confirm_all_new_orders",
                    models.BooleanField(default=True, null=True),
                ),
                ("allow_unpaid_orders", models.BooleanField(default=False)),
                (
                    "automatically_fulfill_non_shippable_gift_card",
                    models.BooleanField(default=True, null=True),
                ),
                (
                    "expire_orders_after",
                    models.IntegerField(blank=True, default=None, null=True),
                ),
                (
                    "delete_expired_orders_after",
                    models.DurationField(default=datetime.timedelta(days=60)),
                ),
                (
                    "include_draft_order_in_voucher_usage",
                    models.BooleanField(default=False),
                ),
                (
                    "use_legacy_error_flow_for_checkout",
                    models.BooleanField(default=True),
                ),
            ],
            options={
                "ordering": ("slug",),
                "permissions": (("manage_channels.", "Manage channels."),),
                "abstract": False,
                "indexes": [
                    django.contrib.postgres.indexes.GinIndex(
                        fields=["private_metadata"], name="channel_p_meta_idx"
                    ),
                    django.contrib.postgres.indexes.GinIndex(
                        fields=["metadata"], name="channel_meta_idx"
                    ),
                ],
            },
        ),
    ]
