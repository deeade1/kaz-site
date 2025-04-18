# Generated by Django 5.0.7 on 2024-12-09 19:48

import django.contrib.postgres.indexes
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("giftcard", "0001_initial"),
        ("order", "0001_initial"),
        ("product", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="giftcard",
            name="fulfillment_line",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="gift_cards",
                to="order.fulfillmentline",
            ),
        ),
        migrations.AddField(
            model_name="giftcard",
            name="product",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="gift_cards",
                to="product.product",
            ),
        ),
        migrations.AddField(
            model_name="giftcard",
            name="used_by",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="gift_cards",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="giftcardevent",
            name="gift_card",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="events",
                to="giftcard.giftcard",
            ),
        ),
        migrations.AddField(
            model_name="giftcardevent",
            name="order",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="order.order",
            ),
        ),
        migrations.AddField(
            model_name="giftcardevent",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="gift_card_events",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddIndex(
            model_name="giftcardtag",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["name"],
                name="gift_card_tag_search_gin",
                opclasses=["gin_trgm_ops"],
            ),
        ),
        migrations.AddField(
            model_name="giftcard",
            name="tags",
            field=models.ManyToManyField(
                related_name="gift_cards", to="giftcard.giftcardtag"
            ),
        ),
        migrations.AddIndex(
            model_name="giftcard",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["search_vector"], name="giftcard_tsearch"
            ),
        ),
        migrations.AddIndex(
            model_name="giftcard",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["private_metadata"], name="giftcard_p_meta_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="giftcard",
            index=django.contrib.postgres.indexes.GinIndex(
                fields=["metadata"], name="giftcard_meta_idx"
            ),
        ),
    ]
