# Generated by Django 5.0.7 on 2024-12-09 19:48

import django.contrib.postgres.search
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models

import core.utils.json_serializer


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="GiftCardEvent",
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
                    "date",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[
                            (
                                "issued",
                                "The gift card was created be staff user or app.",
                            ),
                            ("bought", "The gift card was bought by customer."),
                            ("updated", "The gift card was updated."),
                            ("activated", "The gift card was activated."),
                            ("deactivated", "The gift card was deactivated."),
                            ("balance_reset", "The gift card balance was reset."),
                            (
                                "expiry_date_updated",
                                "The gift card expiry date was updated.",
                            ),
                            ("tags_updated", "The gift card tags were updated."),
                            (
                                "sent_to_customer",
                                "The gift card was sent to the customer.",
                            ),
                            ("resent", "The gift card was resent to the customer."),
                            ("note_added", "A note was added to the gift card."),
                            ("used_in_order", "The gift card was used in order."),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "parameters",
                    models.JSONField(
                        blank=True,
                        default=dict,
                        encoder=core.utils.json_serializer.CustomJsonEncoder,
                    ),
                ),
            ],
            options={
                "ordering": ("date",),
            },
        ),
        migrations.CreateModel(
            name="GiftCardTag",
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
                ("name", models.CharField(max_length=255, unique=True)),
            ],
            options={
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="GiftCard",
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
                (
                    "code",
                    models.CharField(
                        db_index=True,
                        max_length=16,
                        unique=True,
                        validators=[django.core.validators.MinLengthValidator(8)],
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                (
                    "created_by_email",
                    models.EmailField(blank=True, max_length=254, null=True),
                ),
                (
                    "used_by_email",
                    models.EmailField(blank=True, max_length=254, null=True),
                ),
                ("expiry_date", models.DateField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("last_used_on", models.DateTimeField(blank=True, null=True)),
                ("currency", models.CharField(default="USD", max_length=3)),
                (
                    "initial_balance_amount",
                    models.DecimalField(decimal_places=3, max_digits=12),
                ),
                (
                    "current_balance_amount",
                    models.DecimalField(decimal_places=3, max_digits=12),
                ),
                (
                    "search_vector",
                    django.contrib.postgres.search.SearchVectorField(
                        blank=True, null=True
                    ),
                ),
                ("search_index_dirty", models.BooleanField(default=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="+",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("code",),
                "permissions": (("manage_gift_card", "Manage gift cards."),),
                "abstract": False,
            },
        ),
    ]
