# Generated by Django 5.0.7 on 2024-12-09 19:48

import uuid

import django.contrib.postgres.indexes
import django.db.models.deletion
from django.db import migrations, models

import core.utils.json_serializer


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
        ("channel", "0001_initial"),
        ("checkout", "0001_initial"),
        ("order", "0001_initial"),
        ("product", "0001_initial"),
        ("shipping", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ChannelWarehouse",
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
                    "sort_order",
                    models.IntegerField(db_index=True, editable=False, null=True),
                ),
                (
                    "channel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="channelwarehouse",
                        to="channel.channel",
                    ),
                ),
            ],
            options={
                "ordering": ("sort_order", "pk"),
            },
        ),
        migrations.CreateModel(
            name="Warehouse",
            fields=[
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
                    "external_reference",
                    models.CharField(
                        blank=True,
                        db_index=True,
                        max_length=250,
                        null=True,
                        unique=True,
                    ),
                ),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, primary_key=True, serialize=False
                    ),
                ),
                ("name", models.CharField(max_length=250)),
                (
                    "slug",
                    models.SlugField(allow_unicode=True, max_length=255, unique=True),
                ),
                ("email", models.EmailField(blank=True, default="", max_length=254)),
                (
                    "click_and_collect_option",
                    models.CharField(
                        choices=[
                            ("disabled", "Disabled"),
                            ("local", "Local stock only"),
                            ("all", "All warehouses"),
                        ],
                        default="disabled",
                        max_length=30,
                    ),
                ),
                ("is_private", models.BooleanField(default=True)),
                (
                    "address",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="accounts.address",
                    ),
                ),
                (
                    "channels",
                    models.ManyToManyField(
                        related_name="warehouses",
                        through="warehouse.ChannelWarehouse",
                        to="channel.channel",
                    ),
                ),
                (
                    "shipping_zones",
                    models.ManyToManyField(
                        blank=True,
                        related_name="warehouses",
                        to="shipping.shippingzone",
                    ),
                ),
            ],
            options={
                "ordering": ("-slug",),
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Stock",
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
                ("quantity", models.IntegerField(default=0)),
                ("quantity_allocated", models.IntegerField(default=0)),
                (
                    "product_variant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="stocks",
                        to="product.productvariant",
                    ),
                ),
                (
                    "warehouse",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="warehouse.warehouse",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
            },
        ),
        migrations.AddField(
            model_name="channelwarehouse",
            name="warehouse",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="channelwarehouse",
                to="warehouse.warehouse",
            ),
        ),
        migrations.CreateModel(
            name="PreorderAllocation",
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
                ("quantity", models.PositiveIntegerField(default=0)),
                (
                    "order_line",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="preorder_allocations",
                        to="order.orderline",
                    ),
                ),
                (
                    "product_variant_channel_listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="preorder_allocations",
                        to="product.productvariantchannellisting",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "unique_together": {("order_line", "product_variant_channel_listing")},
            },
        ),
        migrations.CreateModel(
            name="PreorderReservation",
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
                ("quantity_reserved", models.PositiveIntegerField(default=0)),
                ("reserved_until", models.DateTimeField()),
                (
                    "checkout_line",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="preorder_reservations",
                        to="checkout.checkoutline",
                    ),
                ),
                (
                    "product_variant_channel_listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="preorder_reservations",
                        to="product.productvariantchannellisting",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "indexes": [
                    models.Index(
                        fields=["checkout_line", "reserved_until"],
                        name="warehouse_p_checkou_3abf41_idx",
                    )
                ],
                "unique_together": {
                    ("checkout_line", "product_variant_channel_listing")
                },
            },
        ),
        migrations.CreateModel(
            name="Reservation",
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
                ("quantity_reserved", models.PositiveIntegerField(default=0)),
                ("reserved_until", models.DateTimeField()),
                (
                    "checkout_line",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reservations",
                        to="checkout.checkoutline",
                    ),
                ),
                (
                    "stock",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reservations",
                        to="warehouse.stock",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "indexes": [
                    models.Index(
                        fields=["checkout_line", "reserved_until"],
                        name="warehouse_r_checkou_b66369_idx",
                    )
                ],
                "unique_together": {("checkout_line", "stock")},
            },
        ),
        migrations.CreateModel(
            name="Allocation",
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
                ("quantity_allocated", models.PositiveIntegerField(default=0)),
                (
                    "order_line",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="allocations",
                        to="order.orderline",
                    ),
                ),
                (
                    "stock",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="allocations",
                        to="warehouse.stock",
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
                "unique_together": {("order_line", "stock")},
            },
        ),
        migrations.AddIndex(
            model_name="warehouse",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["private_metadata"], name="warehouse_p_meta_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="warehouse",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["metadata"], name="warehouse_meta_idx"
            ),
        ),
        migrations.AlterUniqueTogether(
            name="stock",
            unique_together={("warehouse", "product_variant")},
        ),
        migrations.AlterUniqueTogether(
            name="channelwarehouse",
            unique_together={("channel", "warehouse")},
        ),
    ]
