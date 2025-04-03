from datetime import datetime
from typing import Optional

import pytz
from django.contrib.postgres.aggregates import StringAgg
from django.db import models
from django.db.models import (
    Case,
    Count,
    Exists,
    ExpressionWrapper,
    F,
    OuterRef,
    Q,
    Subquery,
    Sum,
    Value,
    When,
)
from django.db.models.functions import Coalesce

from accounts.models import User
from channel.models import Channel


class ProductsQueryset(models.QuerySet):
    def published(self, channel: Channel):
        from .models import ProductChannelListing

        if not channel.is_active:
            return self.none()

        today = datetime.now(pytz.UTC)
        channel_listings = (
            ProductChannelListing.objects.using(self.db)
            .filter(
                Q(published_at__lte=today) | Q(published_at__isnull=True),
                channel_id=channel.id,
                is_published=True,
            )
            .values("id")
        )
        return self.filter(Exists(channel_listings.filter(product_id=OuterRef("pk"))))

    def not_published(self, channel: Channel):
        today = datetime.now(pytz.UTC)
        return self.annotate_publication_info(channel).filter(
            Q(published_at__gt=today) & Q(is_published=True)
            | Q(is_published=False)
            | Q(is_published__isnull=True)
        )

    def published_with_variants(self, channel: Channel):
        from .models import ProductVariant, ProductVariantChannelListing

        if not channel.is_active:
            return self.none()

        variant_channel_listings = (
            ProductVariantChannelListing.objects.using(self.db)
            .filter(
                channel_id=channel.id,
                price_amount__isnull=False,
            )
            .values("id")
        )
        variants = ProductVariant.objects.using(self.db).filter(
            Exists(variant_channel_listings.filter(variant_id=OuterRef("pk")))
        )
        return self.published(channel).filter(
            Exists(variants.filter(product_id=OuterRef("pk")))
        )

    def visible_to_user(
        self,
        requestor: Optional[User],
        channel: Optional[Channel],
        limited_channel_access: bool,
    ):
        """Determine which products should be visible to the user."""
        if requestor and requestor.has_perm("product.manage_products"):
            if limited_channel_access:
                if channel:
                    channel_listings = (
                        ProductChannelListing.objects.using(self.db)
                        .filter(channel_id=channel.id)
                        .values("id")
                    )
                    return self.filter(
                        Exists(channel_listings.filter(product_id=OuterRef("pk")))
                    )
                return self.none()
            return self.all()

        if not channel or not channel.is_active:
            return self.none()

        return self.published_with_variants(channel)

    def annotate_publication_info(self, channel: Channel):
        return self.annotate_is_published(channel).annotate_published_at(channel)

    def annotate_is_published(self, channel: Channel):
        from .models import ProductChannelListing

        query = Subquery(
            ProductChannelListing.objects.using(self.db)
            .filter(product_id=OuterRef("pk"), channel_id=channel.id)
            .values_list("is_published")[:1]
        )
        return self.annotate(
            is_published=ExpressionWrapper(query, output_field=models.BooleanField())
        )

    def annotate_published_at(self, channel: Channel):
        from .models import ProductChannelListing

        query = Subquery(
            ProductChannelListing.objects.using(self.db)
            .filter(product_id=OuterRef("pk"), channel_id=channel.id)
            .values_list("published_at")[:1]
        )
        return self.annotate(
            published_at=ExpressionWrapper(query, output_field=models.DateTimeField())
        )

    def annotate_visible_in_listings(self, channel: Optional[Channel]):
        from .models import ProductChannelListing

        if not channel:
            return self.annotate(
                visible_in_listings=Value(False, output_field=models.BooleanField())
            )
        query = Subquery(
            ProductChannelListing.objects.using(self.db)
            .filter(product_id=OuterRef("pk"), channel_id=channel.id)
            .values_list("visible_in_listings")[:1]
        )
        return self.annotate(
            visible_in_listings=ExpressionWrapper(
                query, output_field=models.BooleanField()
            )
        )

    def sort_by_attribute(self, attribute_pk: int, descending: bool = False):
        """Sort a query set by the values of the given product attribute."""
        from ..attribute.models import (
            AssignedProductAttributeValue,
            AttributeProduct,
            AttributeValue,
        )

        if not isinstance(attribute_pk, int) and not str(attribute_pk).isnumeric():
            return self.annotate(
                concatenated_values_order=Value(None, output_field=models.IntegerField()),
                concatenated_values=Value(None, output_field=models.CharField()),
            )

        return self.annotate(
            grouped_ids=Count("id"),
            concatenated_values=Case(
                When(
                    Exists(
                        AttributeProduct.objects.using(self.db).filter(
                            product_type_id=OuterRef("product_type_id"),
                            attribute_id=attribute_pk,
                        )
                    )
                    & ~Exists(
                        AssignedProductAttributeValue.objects.using(self.db).filter(
                            product_id=OuterRef("id"),
                            value__attribute_id=attribute_pk,
                        )
                    ),
                    then=Value(""),
                ),
                default=StringAgg(
                    F("attributevalues__value__name"),
                    filter=Q(attributevalues__value__attribute_id=attribute_pk),
                    delimiter=",",
                    ordering=[
                        f"attributevalues__value__{field_name}"
                        for field_name in AttributeValue._meta.ordering or []
                    ],
                ),
                output_field=models.CharField(),
            ),
            concatenated_values_order=Case(
                When(concatenated_values=None, then=2),
                When(concatenated_values="", then=1),
                default=0,
                output_field=models.IntegerField(),
            ),
        ).order_by(
            f"{'-' if descending else ''}concatenated_values_order",
            f"{'-' if descending else ''}concatenated_values",
            f"{'-' if descending else ''}name",
        )

    def prefetched_for_webhook(self, single_object=True):
        common_fields = (
            "media",
            "variants__attributes__values",
            "variants__attributes__assignment__attribute",
            "variants__variant_media__media",
            "variants__stocks__allocations",
            "variants__channel_listings__channel",
            "channel_listings__channel",
            "product_type__attributeproduct",
        )
        if single_object:
            return self.prefetch_related(*common_fields)
        return self.prefetch_related("collections", "category", *common_fields)


ProductManager = models.Manager.from_queryset(ProductsQueryset)


class ProductVariantQueryset(models.QuerySet):
    def annotate_quantities(self):
        """Annotate the queryset with quantity-related fields."""
        from warehouse.models import Allocation

        allocations_subquery = (
            Allocation.objects.using(self.db)
            .filter(stock__product_variant=OuterRef("pk"))
            .values("stock__product_variant")
            .annotate(total_allocated=Coalesce(Sum("quantity_allocated"), 0))
            .values("total_allocated")
        )

        return self.annotate(
            quantity=Coalesce(Sum("stocks__quantity"), Value(0)),
            quantity_allocated=Coalesce(
                Subquery(allocations_subquery, output_field=models.IntegerField()),
                Value(0),
            ),
            available_quantity=Case(
                When(quantity_allocated=None, then=F("quantity")),
                default=F("quantity")
                - Coalesce(
                    Subquery(allocations_subquery, output_field=models.IntegerField()),
                    Value(0),
                ),
                output_field=models.IntegerField(),
            ),
        )

    def available_in_channel(self, channel: Optional[Channel]):
        from .models import ProductVariantChannelListing

        if not channel:
            return self.none()
        channel_listings = (
            ProductVariantChannelListing.objects.using(self.db)
            .filter(price_amount__isnull=False, channel_id=channel.id)
            .values("id")
        )
        return self.filter(Exists(channel_listings.filter(variant_id=OuterRef("pk"))))

    def prefetched_for_webhook(self):
        return self.prefetch_related(
            "attributes__values",
            "attributes__assignment__attribute",
            "variant_media__media",
        )

    def visible_to_user(
        self,
        requestor: Optional[User],
        channel: Optional[Channel],
        limited_channel_access: bool,
    ):
        """Determine which product variants should be visible to the user."""
        if requestor and requestor.has_perm("product.manage_products"):
            if limited_channel_access:
                if channel:
                    return self.filter(product__channel_listings__channel_id=channel.id)
                return self.none()
            return self.all()

        if not channel or not channel.is_active:
            return self.none()

        today = datetime.now(pytz.UTC)
        return self.filter(
            channel_listings__channel_id=channel.id,
            channel_listings__price_amount__isnull=False,
            product__channel_listings__published_at__lte=today,
            product__channel_listings__is_published=True,
            product__channel_listings__visible_in_listings=True,
        )


ProductVariantManager = models.Manager.from_queryset(ProductVariantQueryset)


class ProductVariantChannelListingQuerySet(models.QuerySet):
    def annotate_preorder_quantity_allocated(self):
        return self.annotate(
            preorder_quantity_allocated=Coalesce(
                Sum("preorder_allocations__quantity"), 0
            ),
        )


ProductVariantChannelListingManager = models.Manager.from_queryset(
    ProductVariantChannelListingQuerySet
)


class CollectionsQueryset(models.QuerySet):
    def published(self, channel_slug: str):
        today = datetime.now(pytz.UTC)
        return self.filter(
            Q(channel_listings__published_at__lte=today)
            | Q(channel_listings__published_at__isnull=True),
            channel_listings__channel__slug=str(channel_slug),
            channel_listings__channel__is_active=True,
            channel_listings__is_published=True,
        )

    def visible_to_user(self, requestor: Optional[User], channel_slug: Optional[str]):
        """Determine which collections should be visible to the user."""
        if requestor and requestor.has_perm("product.manage_products"):
            if channel_slug:
                return self.filter(channel_listings__channel__slug=str(channel_slug))
            return self.all()

        if not channel_slug:
            return self.none()

        return self.published(channel_slug)


CollectionManager = models.Manager.from_queryset(CollectionsQueryset)