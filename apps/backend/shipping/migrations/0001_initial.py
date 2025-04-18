# Generated by Django 5.0.7 on 2024-12-09 19:48

from decimal import Decimal

import django.contrib.postgres.indexes
import django.db.models.deletion
import django_countries.fields
import django_measurement.models
import measurement.measures.mass
from django.db import migrations, models

import core.utils.editorjs
import core.utils.json_serializer
import core.weight


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("channel", "0001_initial"),
        ("product", "0001_initial"),
        ("tax", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ShippingZone",
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
                ("name", models.CharField(max_length=100)),
                (
                    "countries",
                    django_countries.fields.CountryField(
                        blank=True, default=[], max_length=749, multiple=True
                    ),
                ),
                ("default", models.BooleanField(default=False)),
                ("description", models.TextField(blank=True)),
                (
                    "channels",
                    models.ManyToManyField(
                        related_name="shipping_zones", to="channel.channel"
                    ),
                ),
            ],
            options={
                "permissions": (("manage_shipping", "Manage shipping."),),
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ShippingMethod",
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
                ("name", models.CharField(max_length=100)),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("price", "Price based shipping"),
                            ("weight", "Weight based shipping"),
                        ],
                        max_length=30,
                    ),
                ),
                (
                    "minimum_order_weight",
                    django_measurement.models.MeasurementField(
                        blank=True,
                        default=core.weight.zero_weight,
                        measurement=measurement.measures.mass.Mass,
                        null=True,
                    ),
                ),
                (
                    "maximum_order_weight",
                    django_measurement.models.MeasurementField(
                        blank=True,
                        measurement=measurement.measures.mass.Mass,
                        null=True,
                    ),
                ),
                (
                    "maximum_delivery_days",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                (
                    "minimum_delivery_days",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                (
                    "description",
                    models.JSONField(
                        blank=True,
                        default=core.utils.editorjs.clean_editor_js,
                        null=True,
                    ),
                ),
                (
                    "excluded_products",
                    models.ManyToManyField(blank=True, to="product.product"),
                ),
                (
                    "tax_class",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="shipping_methods",
                        to="tax.taxclass",
                    ),
                ),
                (
                    "shipping_zone",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="shipping_methods",
                        to="shipping.shippingzone",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ShippingMethodChannelListing",
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
                    "minimum_order_price_amount",
                    models.DecimalField(
                        blank=True,
                        decimal_places=3,
                        default=Decimal("0.0"),
                        max_digits=12,
                        null=True,
                    ),
                ),
                ("currency", models.CharField(max_length=3)),
                (
                    "maximum_order_price_amount",
                    models.DecimalField(
                        blank=True, decimal_places=3, max_digits=12, null=True
                    ),
                ),
                (
                    "price_amount",
                    models.DecimalField(
                        decimal_places=3, default=Decimal("0.0"), max_digits=12
                    ),
                ),
                (
                    "channel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="shipping_method_listings",
                        to="channel.channel",
                    ),
                ),
                (
                    "shipping_method",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="channel_listings",
                        to="shipping.shippingmethod",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "unique_together": {("shipping_method", "channel")},
            },
        ),
        migrations.CreateModel(
            name="ShippingMethodPostalCodeRule",
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
                ("start", models.CharField(max_length=32)),
                ("end", models.CharField(blank=True, max_length=32, null=True)),
                (
                    "inclusion_type",
                    models.CharField(
                        choices=[
                            (
                                "include",
                                "Shipping method should include postal code rule",
                            ),
                            (
                                "exclude",
                                "Shipping method should exclude postal code rule",
                            ),
                        ],
                        default="exclude",
                        max_length=32,
                    ),
                ),
                (
                    "shipping_method",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="postal_code_rules",
                        to="shipping.shippingmethod",
                    ),
                ),
            ],
            options={
                "unique_together": {("shipping_method", "start", "end")},
            },
        ),
        migrations.CreateModel(
            name="ShippingMethodTranslation",
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
                ("language_code", models.CharField(max_length=35)),
                ("name", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "description",
                    models.JSONField(
                        blank=True,
                        default=core.utils.editorjs.clean_editor_js,
                        null=True,
                    ),
                ),
                (
                    "shipping_method",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="translations",
                        to="shipping.shippingmethod",
                    ),
                ),
            ],
            options={
                "unique_together": {("language_code", "shipping_method")},
            },
        ),
        migrations.AddIndex(
            model_name="shippingzone",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["private_metadata"], name="shippingzone_p_meta_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="shippingzone",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["metadata"], name="shippingzone_meta_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="shippingzone",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["countries"],
                name="s_z_countries_idx",
                opclasses=["gin_trgm_ops"],
            ),
        ),
        migrations.AddIndex(
            model_name="shippingmethod",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["private_metadata"], name="shippingmethod_p_meta_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="shippingmethod",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["metadata"], name="shippingmethod_meta_idx"
            ),
        ),
    ]
