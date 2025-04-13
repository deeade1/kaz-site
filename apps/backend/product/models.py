from datetime import datetime
from decimal import Decimal
from typing import Optional
from uuid import uuid4

import graphene
import pytz
from django.conf import settings
from django.contrib.postgres.indexes import BTreeIndex, GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.core.validators import MinValueValidator
from django.db import models, transaction
from django.db.models import JSONField, TextField
from django.urls import reverse
from django.utils import timezone
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from measurement.measures import Weight
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from prices import Money

from channel.models import Channel
from core.models import (
    ModelWithExternalReference,
    ModelWithMetadata,
    PublishableModel,
    SortableModel,
)
from core.units import WeightUnits
from core.utils import build_absolute_uri
from core.utils.editorjs import clean_editor_js
from core.utils.translations import Translation, get_translation
from core.weight import zero_weight
from discount.models import PromotionRule
from seo.models import SeoModel, SeoModelTranslationWithSlug
from tax.models import TaxClass

from . import ProductMediaTypes, ProductTypeKind, managers


class Category(ModelWithMetadata, MPTTModel, SeoModel):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)
    description_plaintext = TextField(blank=True)
    background_image = models.ImageField(
        upload_to="category-backgrounds", blank=True, null=True
    )
    background_image_alt = models.CharField(max_length=128, blank=True)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )
    search_vector = SearchVectorField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    objects = models.Manager()
    tree = TreeManager()

    class Meta:
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                fields=["name", "slug", "description_plaintext"],
                name="category_search_name_slug_gin",
                opclasses=["gin_trgm_ops"] * 3,
            ),
            GinIndex(fields=["search_vector"], name="category_search_vector_gin"),
            BTreeIndex(fields=["updated_at"], name="updated_at_idx"),
        ]
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class CategoryTranslation(SeoModelTranslationWithSlug):
    category = models.ForeignKey(
        Category, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128, blank=True, null=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language_code", "slug"],
                name="uniq_lang_slug_categorytransl",
            ),
        ]
        unique_together = (("language_code", "category"),)

    def __str__(self) -> str:
        return self.name or str(self.pk)

    def get_translated_object_id(self):
        return "Category", self.category_id

    def get_translated_keys(self):
        return {
            **super().get_translated_keys(),
            "name": self.name,
            "description": self.description,
        }


class ProductType(ModelWithMetadata):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    kind = models.CharField(max_length=32, choices=ProductTypeKind.CHOICES)
    has_variants = models.BooleanField(default=True)
    is_shipping_required = models.BooleanField(default=True)
    is_digital = models.BooleanField(default=False)
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        default=zero_weight,
    )
    tax_class = models.ForeignKey(
        TaxClass,
        related_name="product_types",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        app_label = "product"
        permissions = (
            ("manage_product_types_and_attributes", "Manage product types and attributes."),
        )
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                fields=["name", "slug"],
                name="product_type_search_gin",
                opclasses=["gin_trgm_ops"] * 2,
            ),
        ]

    def __str__(self) -> str:
        return self.name


class Product(SeoModel, ModelWithMetadata, ModelWithExternalReference):
    product_type = models.ForeignKey(
        ProductType, related_name="products", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)
    description_plaintext = TextField(blank=True)
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        blank=True,
        null=True,
    )
    default_variant = models.OneToOneField(
        "ProductVariant",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    rating = models.FloatField(null=True, blank=True)
    tax_class = models.ForeignKey(
        TaxClass,
        related_name="products",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    search_document = models.TextField(blank=True, default="")
    search_vector = SearchVectorField(blank=True, null=True)
    search_index_dirty = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    objects = managers.ProductManager()

    class Meta:
        app_label = "product"
        ordering = ("slug",)
        permissions = (("manage_products", "Manage products."),)
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(fields=["search_document"], name="product_search_gin", opclasses=["gin_trgm_ops"]),
            GinIndex(fields=["search_vector"], name="product_tsearch"),
            GinIndex(fields=["name", "slug"], name="product_gin", opclasses=["gin_trgm_ops"] * 2),
            models.Index(fields=["category_id", "slug"]),
        ]

    def __str__(self) -> str:
        return self.name

    def get_first_image(self):
        images = [m for m in self.media.all() if m.type == ProductMediaTypes.IMAGE]
        return images[0] if images else None

    @staticmethod
    def sort_by_attribute_fields() -> list:
        return ["concatenated_values_order", "concatenated_values", "name"]


class ProductTranslation(SeoModelTranslationWithSlug):
    product = models.ForeignKey(
        Product, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250, blank=True, null=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language_code", "slug"],
                name="uniq_lang_slug_producttransl",
            ),
        ]
        unique_together = (("language_code", "product"),)

    def __str__(self) -> str:
        return self.name or str(self.pk)

    def get_translated_object_id(self):
        return "Product", self.product_id

    def get_translated_keys(self):
        return {
            **super().get_translated_keys(),
            "name": self.name,
            "description": self.description,
        }


class ProductChannelListing(PublishableModel):
    product = models.ForeignKey(
        Product,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        related_name="product_listings",
        on_delete=models.CASCADE,
    )
    currency = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    price = MoneyField(amount_field="price_amount", currency_field="currency")
    discounted_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    discounted_price = MoneyField(
        amount_field="discounted_price_amount", currency_field="currency"
    )
    visible_in_listings = models.BooleanField(default=False)
    available_for_purchase_at = models.DateTimeField(blank=True, null=True)
    discounted_price_dirty = models.BooleanField(default=False)

    class Meta:
        unique_together = [["product", "channel"]]
        ordering = ("pk",)
        indexes = [
            models.Index(fields=["published_at"]),
            BTreeIndex(fields=["discounted_price_amount"]),
        ]

    def is_available_for_purchase(self):
        return (
            self.available_for_purchase_at is not None
            and datetime.now(pytz.UTC) >= self.available_for_purchase_at
        )


class ProductVariant(SortableModel, ModelWithMetadata, ModelWithExternalReference):
    product = models.ForeignKey(
        Product, related_name="variants", on_delete=models.CASCADE
    )
    sku = models.CharField(max_length=255, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255, blank=True)
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        blank=True,
        null=True,
    )
    track_inventory = models.BooleanField(default=True)
    is_preorder = models.BooleanField(default=False)
    preorder_end_date = models.DateTimeField(null=True, blank=True)
    preorder_global_threshold = models.IntegerField(blank=True, null=True)
    quantity_limit_per_customer = models.IntegerField(
        blank=True, null=True, validators=[MinValueValidator(1)]
    )
    media = models.ManyToManyField("ProductMedia", through="VariantMedia")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    objects = managers.ProductVariantManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("sort_order", "sku")
        app_label = "product"

    def __str__(self) -> str:
        return self.name or self.sku or f"ID:{self.pk}"

    def get_global_id(self):
        return graphene.Node.to_global_id("ProductVariant", self.id)

    def get_base_price(self, channel_listing, price_override=None):
        return (
            channel_listing.price
            if price_override is None
            else Money(price_override, channel_listing.currency)
        )

    def get_price(self, channel_listing, price_override=None, promotion_rules=None):
        from discount.utils.promotion import calculate_discounted_price_for_rules

        if price_override is None:
            return channel_listing.discounted_price or channel_listing.price
        price = self.get_base_price(channel_listing, price_override)
        rules = promotion_rules or []
        return calculate_discounted_price_for_rules(
            price=price, rules=rules, currency=channel_listing.currency
        )

    def get_weight(self):
        return self.weight or self.product.weight or self.product.product_type.weight

    def is_shipping_required(self) -> bool:
        return self.product.product_type.is_shipping_required

    def is_gift_card(self) -> bool:
        return self.product.product_type.kind == ProductTypeKind.GIFT_CARD

    def is_digital(self) -> bool:
        return not self.is_shipping_required() and self.product.product_type.is_digital

    def display_product(self, translated=False) -> str:
        if translated:
            product = get_translation(self.product).name
            variant_display = get_translation(self).name
        else:
            variant_display = str(self)
            product = self.product
        return f"{product} ({variant_display})" if variant_display else str(product)

    def get_ordering_queryset(self):
        return self.product.variants.all()

    def is_preorder_active(self):
        return self.is_preorder and (
            self.preorder_end_date is None or timezone.now() <= self.preorder_end_date
        )


class ProductVariantTranslation(Translation):
    product_variant = models.ForeignKey(
        ProductVariant, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255, blank=True)

    class Meta:
        unique_together = (("language_code", "product_variant"),)

    def __str__(self):
        return self.name or str(self.product_variant)

    def get_translated_object_id(self):
        return "ProductVariant", self.product_variant_id

    def get_translated_keys(self):
        return {"name": self.name}


class ProductVariantChannelListing(models.Model):
    variant = models.ForeignKey(
        ProductVariant,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        related_name="variant_listings",
        on_delete=models.CASCADE,
    )
    currency = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    price = MoneyField(amount_field="price_amount", currency_field="currency")
    cost_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    cost_price = MoneyField(amount_field="cost_price_amount", currency_field="currency")
    discounted_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    discounted_price = MoneyField(
        amount_field="discounted_price_amount", currency_field="currency"
    )
    preorder_quantity_threshold = models.IntegerField(blank=True, null=True)
    promotion_rules = models.ManyToManyField(
        PromotionRule,
        through="VariantChannelListingPromotionRule",
        blank=True,
    )

    objects = managers.ProductVariantChannelListingManager()

    class Meta:
        unique_together = [["variant", "channel"]]
        ordering = ("pk",)
        indexes = [
            BTreeIndex(fields=["price_amount", "channel"], name="product_price_btree_idx"),
        ]


class VariantChannelListingPromotionRule(models.Model):
    variant_channel_listing = models.ForeignKey(
        ProductVariantChannelListing,
        related_name="variantlistingpromotionrule",
        on_delete=models.CASCADE,
    )
    promotion_rule = models.ForeignKey(
        PromotionRule,
        related_name="variantlistingpromotionrule",
        on_delete=models.CASCADE,
    )
    currency = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    discount_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=Decimal("0.0"),
    )
    discount = MoneyField(amount_field="discount_amount", currency_field="currency")

    class Meta:
        unique_together = [["variant_channel_listing", "promotion_rule"]]


class DigitalContent(ModelWithMetadata):
    FILE = "file"
    TYPE_CHOICES = ((FILE, "digital_product"),)

    product_variant = models.OneToOneField(
        ProductVariant, related_name="digital_content", on_delete=models.CASCADE
    )
    use_default_settings = models.BooleanField(default=True)
    automatic_fulfillment = models.BooleanField(default=False)
    content_type = models.CharField(max_length=128, default=FILE, choices=TYPE_CHOICES)
    content_file = models.FileField(upload_to="digital_contents", blank=True)
    max_downloads = models.IntegerField(blank=True, null=True)
    url_valid_days = models.IntegerField(blank=True, null=True)

    def create_new_url(self):
        return self.urls.create()


class DigitalContentUrl(models.Model):
    content = models.ForeignKey(
        DigitalContent, related_name="urls", on_delete=models.CASCADE
    )
    line = models.OneToOneField(
        "order.OrderLine",
        related_name="digital_content_url",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    token = models.UUIDField(editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    download_num = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = str(uuid4()).replace("-", "")
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        url = reverse("digital-product", kwargs={"token": str(self.token)})
        return build_absolute_uri(url)


class ProductMedia(SortableModel, ModelWithMetadata):
    product = models.ForeignKey(
        Product,
        related_name="media",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    image = models.ImageField(upload_to="products", blank=True, null=True)
    alt = models.CharField(max_length=250, blank=True)
    type = models.CharField(
        max_length=32,
        choices=ProductMediaTypes.CHOICES,
        default=ProductMediaTypes.IMAGE,
    )
    external_url = models.CharField(max_length=256, blank=True, null=True)
    oembed_data = JSONField(blank=True, default=dict)
    to_remove = models.BooleanField(default=False)

    class Meta(ModelWithMetadata.Meta):
        ordering = ("sort_order", "pk")
        app_label = "product"

    def get_ordering_queryset(self):
        return self.product.media.all() if self.product else ProductMedia.objects.none()

    @transaction.atomic
    def delete(self, *args, **kwargs):
        super(SortableModel, self).delete(*args, **kwargs)


class VariantMedia(models.Model):
    variant = models.ForeignKey(
        ProductVariant, related_name="variant_media", on_delete=models.CASCADE
    )
    media = models.ForeignKey(
        ProductMedia, related_name="variant_media", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("variant", "media")


class CollectionProduct(SortableModel):
    collection = models.ForeignKey(
        Collection, related_name="collectionproduct", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="collectionproduct", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (("collection", "product"),)

    def get_ordering_queryset(self):
        return self.product.collectionproduct.all()


class Collection(SeoModel, ModelWithMetadata):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)
    background_image = models.ImageField(
        upload_to="collection-backgrounds", blank=True, null=True
    )
    background_image_alt = models.CharField(max_length=128, blank=True)
    products = models.ManyToManyField(
        Product,
        blank=True,
        related_name="collections",
        through=CollectionProduct,
    )

    objects = managers.CollectionManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                fields=["name", "slug"],
                name="collection_search_gin",
                opclasses=["gin_trgm_ops"] * 2,
            ),
        ]

    def __str__(self) -> str:
        return self.name


class CollectionChannelListing(PublishableModel):
    collection = models.ForeignKey(
        Collection,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        related_name="collection_listings",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = [["collection", "channel"]]
        ordering = ("pk",)


class CollectionTranslation(SeoModelTranslationWithSlug):
    collection = models.ForeignKey(
        Collection, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128, blank=True, null=True)
    description = models.JSONField(blank=True, null=True, default=clean_editor_js)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language_code", "slug"],
                name="uniq_lang_slug_collectiontransl",
            ),
        ]
        unique_together = (("language_code", "collection"),)

    def __str__(self) -> str:
        return self.name or str(self.pk)

    def get_translated_object_id(self):
        return "Collection", self.collection_id

    def get_translated_keys(self):
        return {
            **super().get_translated_keys(),
            "name": self.name,
            "description": self.description,
        }