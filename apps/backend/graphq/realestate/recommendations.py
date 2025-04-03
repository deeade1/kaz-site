# recommendations.py
from django.contrib.gis.geos import Point
from django.db.models import Q, F
import math

class PropertyRecommender:
    def __init__(self, buyer_profile):
        self.buyer = buyer_profile
    
    def get_recommendations(self, max_results=10):
        """Get personalized property recommendations"""
        base_query = self._get_base_query()
        
        # Score properties based on multiple factors
        scored_properties = base_query.annotate(
            # Proximity score (0-100)
            proximity_score=F('proximities__score'),
            
            # Price match score (0-50)
            price_score=self._get_price_score(),
            
            # Property type preference (0-30)
            type_score=self._get_type_score(),
            
            # Combined score
            total_score=(
                F('proximity_score') +
                F('price_score') +
                F('type_score')
            )
        ).order_by('-total_score')[:max_results]
        
        return scored_properties
    
    def _get_base_query(self):
        """Base query for properties within search radius"""
        from .models import Listing
        
        return Listing.objects.filter(
            address__location__distance_lte=(
                self.buyer.search_location,
                D(km=self.buyer.search_radius_km)
            ),
            is_published=True
        ).prefetch_related(
            models.Prefetch(
                'proximities',
                queryset=PropertyProximity.objects.filter(buyer=self.buyer),
                to_attr='buyer_proximity'
            )
        )
    
    def _get_price_score(self):
        """Calculate score based on price match to buyer's budget"""
        from django.db.models import Case, When, Value, IntegerField
        
        if not hasattr(self.buyer, 'price_range_min') or not hasattr(self.buyer, 'price_range_max'):
            return Value(0, output_field=IntegerField())
        
        min_price = self.buyer.price_range_min or 0
        max_price = self.buyer.price_range_max or float('inf')
        
        return Case(
            When(
                price__gte=min_price,
                price__lte=max_price,
                then=Value(50)
            ),
            When(
                price__lt=min_price,
                then=Value(30)
            ),
            When(
                price__gt=max_price,
                then=Value(
                    Greatest(
                        0,
                        50 - ((F('price') - max_price) / max_price * 100),
                        output_field=IntegerField()
                    )
                )
            ),
            default=Value(0),
            output_field=IntegerField()
        )
    
    def _get_type_score(self):
        """Calculate score based on property type preferences"""
        from django.db.models import Case, When, Value, IntegerField
        
        if not hasattr(self.buyer, 'preferred_property_types'):
            return Value(0, output_field=IntegerField())
        
        cases = []
        for i, prop_type in enumerate(self.buyer.preferred_property_types):
            # Higher score for higher preference
            score = 30 - (i * 5)  # 30 for first choice, 25 for second, etc.
            cases.append(
                When(listing_type__property_type=prop_type, then=Value(score))
            )
        
        return Case(
            *cases,
            default=Value(0),
            output_field=IntegerField()
        )
        
mutation {
  findNearbyProperties(
    latitude: 40.7484,
    longitude: -73.9857,
    radiusKm: 10,
    maxResults: 10
  ) {
    properties {
      id
      title
      price
      distanceKm
      isNearPreferred
      proximity {
        score
      }
    }
  }
}


# recommendations.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class AIPropertyRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def train(self, properties):
        """Train recommendation model on property features"""
        features = [
            f"{p.title} {p.description} {p.listing_type} {', '.join([t.name for t in p.tags.all()])}"
            for p in properties
        ]
        self.tfidf_matrix = self.vectorizer.fit_transform(features)
        self.property_ids = [p.id for p in properties]
        
    def recommend(self, property_id, num_recommendations=5):
        """Get similar properties based on content"""
        idx = self.property_ids.index(property_id)
        sim_scores = cosine_similarity(self.tfidf_matrix[idx], self.tfidf_matrix)
        sim_scores = sim_scores.flatten()
        rec_indices = sim_scores.argsort()[-num_recommendations-1:-1][::-1]
        return [self.property_ids[i] for i in rec_indices]