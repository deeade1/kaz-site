from django.test import TestCase
from django.contrib.postgres.search import SearchQuery
from .models import Category

class CategorySearchTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Electronics",
            slug="electronics",
            description_plaintext="All electronic gadgets."
        )

    def test_search_vector_populated(self):
        self.category.refresh_from_db()
        self.assertIsNotNone(self.category.search_vector)

    def test_category_search(self):
        query = SearchQuery("gadgets")
        results = Category.objects.filter(search_vector=query)
        self.assertIn(self.category, results)
