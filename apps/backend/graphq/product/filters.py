# filters.py
import django_filters
from .models import Product, ProductType

class ProductTypeFilter(django_filters.FilterSet):
    class Meta:
        model = ProductType
        fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "kind": ["exact"],
        }

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "category": ["exact"],
            "created_at": ["exact", "gte", "lte"],
            "updated_at": ["exact", "gte", "lte"],
            "rating": ["exact", "gte", "lte"],
        }
