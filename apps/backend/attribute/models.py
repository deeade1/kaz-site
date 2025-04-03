from typing import TYPE_CHECKING, TypeVar, Union
from django.contrib.postgres.indexes import GinIndex, BTreeIndex
from django.db import models, transaction
from django.db.models import Case, Exists, F, Max, OrderBy, OuterRef, Q, Value, When
from core.models import ModelWithExternalReference, ModelWithMetadata, SortableModel
from core.units import MeasurementUnits
from core.utils.editorjs import clean_editor_js
from core.utils.translations import Translation
from page.models import Page, PageType
from product.models import Product, ProductType, ProductVariant
from .base import AssociatedAttributeManager, BaseAssignedAttribute
from .. import AttributeEntityType, AttributeInputType, AttributeType

if TYPE_CHECKING:
    from accounts.models import User

T = TypeVar("T", bound=models.Model)

# --- Core Models ---
class BaseAssignedAttribute(models.Model):
    class Meta:
        abstract = True

    @property
    def attribute(self):
        return self.assignment.attribute

class BaseAttributeQuerySet(models.QuerySet[T]):
    def get_public_attributes(self):
        raise NotImplementedError

    def get_visible_to_user(self, requestor: Union["User", None]):
        return self.get_public_attributes()

class AssociatedAttributeQuerySet(BaseAttributeQuerySet[T]):
    def get_public_attributes(self):
        return self.filter(attribute__visible_in_storefront=True)

class AttributeQuerySet(BaseAttributeQuerySet[T]):
    def get_unassigned_product_type_attributes(self, product_type_pk: int):
        return self.product_type_attributes().exclude(
            Q(attributeproduct__product_type_id=product_type_pk) |
            Q(attributevariant__product_type_id=product_type_pk)
        )

    def get_unassigned_page_type_attributes(self, page_type_pk: int):
        return self.page_type_attributes().exclude(
            attributepage__page_type_id=page_type_pk
        )

    def get_assigned_product_type_attributes(self, product_type_pk: int):
        return self.product_type_attributes().filter(
            Q(attributeproduct__product_type_id=product_type_pk) |
            Q(attributevariant__product_type_id=product_type_pk)
        )

    def get_assigned_page_type_attributes(self, page_type_pk: int):
        return self.page_type_attributes().filter(
            attributepage__page_type_id=page_type_pk
        )

    def get_public_attributes(self):
        return self.filter(visible_in_storefront=True)

    def _get_sorted_m2m_field(self, m2m_field_name: str, asc: bool):
        sort_order_field = F(f"{m2m_field_name}__sort_order")
        id_field = F(f"{m2m_field_name}__id")
        if asc:
            sort_method = sort_order_field.asc(nulls_last=True)
            id_sort: Union[OrderBy, F] = id_field
        else:
            sort_method = sort_order_field.desc(nulls_first=True)
            id_sort = id_field.desc()

        return self.order_by(sort_method, id_sort)

    def product_attributes_sorted(self, asc=True):
        return self._get_sorted_m2m_field("attributeproduct", asc)

    def variant_attributes_sorted(self, asc=True):
        return self._get_sorted_m2m_field("attributevariant", asc)

    def product_type_attributes(self):
        return self.filter(type=AttributeType.PRODUCT_TYPE)

    def page_type_attributes(self):
        return self.filter(type=AttributeType.PAGE_TYPE)

AttributeManager = models.Manager.from_queryset(AttributeQuerySet)

# --- Attribute Definitions ---
class Attribute(ModelWithMetadata, ModelWithExternalReference):
    slug = models.SlugField(max_length=250, unique=True, allow_unicode=True, db_index=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=AttributeType.CHOICES)
    input_type = models.CharField(
        max_length=50,
        choices=AttributeInputType.CHOICES,
        default=AttributeInputType.DROPDOWN,
    )
    entity_type = models.CharField(
        max_length=50, choices=AttributeEntityType.CHOICES, blank=True, null=True
    )

    product_types = models.ManyToManyField(
        ProductType,
        blank=True,
        related_name="product_attributes",
        through="attribute.AttributeProduct",
    )
    product_variant_types = models.ManyToManyField(
        ProductType,
        blank=True,
        related_name="variant_attributes",
        through="attribute.AttributeVariant",
    )
    page_types = models.ManyToManyField(
        PageType,
        blank=True,
        related_name="page_attributes",
        through="attribute.AttributePage",
    )

    unit = models.CharField(
        max_length=100,
        choices=MeasurementUnits.CHOICES,
        blank=True,
        null=True,
    )
    value_required = models.BooleanField(default=False)
    is_variant_only = models.BooleanField(default=False)
    visible_in_storefront = models.BooleanField(default=True)
    filterable_in_storefront = models.BooleanField(default=False)
    filterable_in_dashboard = models.BooleanField(default=False)
    storefront_search_position = models.IntegerField(default=0)
    available_in_grid = models.BooleanField(default=False)
    max_sort_order = models.IntegerField(null=True, blank=True)

    objects = AttributeManager()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("storefront_search_position", "slug")
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                name="attribute_gin",
                fields=["slug", "name", "type", "input_type", "entity_type", "unit"],
                opclasses=["gin_trgm_ops"] * 6,
            ),
        ]

    def __str__(self) -> str:
        return self.name

    def has_values(self) -> bool:
        return self.values.exists()

class AttributeValueManager(models.Manager):
    def _prepare_query_for_bulk_operation(self, objects_data):
        query_params = Q()
        for obj in objects_data:
            defaults = obj.pop("defaults")
            query_params |= Q(**obj)
            obj["defaults"] = defaults
        return self.filter(query_params)

    def _is_correct_record(self, record, obj):
        return all(
            getattr(record, field_name) == field_value
            for field_name, field_value in obj.items()
            if field_name != "defaults"
        )

    def bulk_get_or_create(self, objects_data):
        results = []
        objects_not_in_db = []
        objects_enumerated = list(enumerate(objects_data))
        query = self._prepare_query_for_bulk_operation(objects_data)

        for record in query.iterator():
            for index, obj in objects_enumerated[:]:
                if self._is_correct_record(record, obj):
                    results.append((index, record))
                    objects_enumerated.remove((index, obj))
                    break

        self._add_new_records(objects_enumerated, objects_not_in_db, results)
        results.sort()
        results = [obj for index, obj in results]

        if objects_not_in_db:
            self.bulk_create(objects_not_in_db, ignore_conflicts=True)

        return results

    def _add_new_records(self, objects_enumerated, objects_not_in_db, results):
        for index, obj in objects_enumerated:
            defaults = obj.pop("defaults")
            obj.update(defaults)
            record = self.model(**obj)
            objects_not_in_db.append(record)
            results.append((index, record))

class AttributeValue(ModelWithExternalReference):
    name = models.CharField(max_length=250)
    value = models.CharField(max_length=255, blank=True, default="")
    slug = models.SlugField(max_length=255, allow_unicode=True)
    file_url = models.URLField(null=True, blank=True)
    content_type = models.CharField(max_length=50, null=True, blank=True)
    attribute = models.ForeignKey(
        Attribute, related_name="values", on_delete=models.CASCADE, db_index=True
    )
    rich_text = models.JSONField(blank=True, null=True, default=clean_editor_js)
    plain_text = models.TextField(blank=True, null=True)
    boolean = models.BooleanField(blank=True, null=True)
    date_time = models.DateTimeField(blank=True, null=True)
    reference_product = models.ForeignKey(
        Product,
        related_name="references",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    reference_variant = models.ForeignKey(
        ProductVariant,
        related_name="references",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    reference_page = models.ForeignKey(
        Page, related_name="references", on_delete=models.CASCADE, null=True, blank=True
    )
    sort_order = models.IntegerField(editable=False, db_index=True, null=True)

    objects = AttributeValueManager()

    class Meta:
        ordering = ("sort_order", "pk")
        unique_together = ("slug", "attribute")
        indexes = [
            GinIndex(
                name="attribute_search_gin",
                fields=["name", "slug"],
                opclasses=["gin_trgm_ops"] * 2,
            )
        ]

    @property
    def input_type(self):
        return self.attribute.input_type

    def get_ordering_queryset(self):
        return self.attribute.values.all()

    @transaction.atomic
    def save(self, *args, **kwargs):
        if self.pk is None or self.sort_order is None:
            self.set_current_sorting_order()
        super().save(*args, **kwargs)

    def set_current_sorting_order(self):
        if self.attribute.max_sort_order is None:
            value = SortableModel.get_max_sort_order(self.get_ordering_queryset()) or 0
            self.sort_order = value + 1
            self.attribute.max_sort_order = value + 1
            self.attribute.save(update_fields=["max_sort_order"])
        else:
            Attribute.objects.filter(pk=self.attribute.pk).update(
                max_sort_order=F("max_sort_order") + 1
            )
            self.attribute.refresh_from_db()
            self.sort_order = self.attribute.max_sort_order

# --- Assignment Models ---
class AssignedPageAttributeValue(models.Model):
    value = models.ForeignKey(
        "AttributeValue",
        on_delete=models.CASCADE,
        related_name="pagevalueassignment",
    )
    page = models.ForeignKey(
        Page,
        related_name="attributevalues",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = (("value", "page"),)
        indexes = [BTreeIndex(fields=["page"], name="assignedpageattrvalue_page_idx")]

class AttributePage(models.Model):
    attribute = models.ForeignKey(
        "Attribute", related_name="attributepage", on_delete=models.CASCADE
    )
    page_type = models.ForeignKey(
        PageType, related_name="attributepage", on_delete=models.CASCADE
    )

    objects = AssociatedAttributeManager()

    class Meta:
        unique_together = (("attribute", "page_type"),)

class AssignedProductAttributeValue(models.Model):
    value = models.ForeignKey(
        "AttributeValue",
        on_delete=models.CASCADE,
        related_name="productvalueassignment",
    )
    product = models.ForeignKey(
        Product,
        related_name="attributevalues",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = (("value", "product"),)
        indexes = [
            BTreeIndex(fields=["product"], name="assignedprodattrval_product_idx")
        ]

class AttributeProduct(models.Model):
    attribute = models.ForeignKey(
        "Attribute", related_name="attributeproduct", on_delete=models.CASCADE
    )
    product_type = models.ForeignKey(
        ProductType, related_name="attributeproduct", on_delete=models.CASCADE
    )

    objects = AssociatedAttributeManager()

    class Meta:
        unique_together = (("attribute", "product_type"),)

class AssignedVariantAttributeValue(SortableModel):
    value = models.ForeignKey(
        "AttributeValue",
        on_delete=models.CASCADE,
        related_name="variantvalueassignment",
    )
    assignment = models.ForeignKey(
        "AssignedVariantAttribute",
        on_delete=models.CASCADE,
        related_name="variantvalueassignment",
    )

    class Meta:
        unique_together = (("value", "assignment"),)
        ordering = ("sort_order", "pk")

    def get_ordering_queryset(self):
        return self.assignment.variantvalueassignment.all()

class AssignedVariantAttribute(BaseAssignedAttribute):
    variant = models.ForeignKey(
        ProductVariant, related_name="attributes", on_delete=models.CASCADE
    )
    assignment = models.ForeignKey(
        "AttributeVariant", on_delete=models.CASCADE, related_name="variantassignments"
    )
    values = models.ManyToManyField(
        AttributeValue,
        blank=True,
        related_name="variantassignments",
        through=AssignedVariantAttributeValue,
    )

    class Meta:
        unique_together = (("variant", "assignment"),)

class AttributeVariant(SortableModel):
    attribute = models.ForeignKey(
        "Attribute", related_name="attributevariant", on_delete=models.CASCADE
    )
    product_type = models.ForeignKey(
        ProductType, related_name="attributevariant", on_delete=models.CASCADE
    )
    variant_selection = models.BooleanField(default=False)

    objects = AssociatedAttributeManager()

    class Meta:
        unique_together = (("attribute", "product_type"),)
        ordering = ("sort_order", "pk")

    def get_ordering_queryset(self):
        return self.product_type.attributevariant.all()