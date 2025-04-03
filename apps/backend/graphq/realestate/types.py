import graphene
from graphene.relay import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType, query

from realestate.models import Listing, ListingFile, ListingImage, ListingType

# Common filters for timestamps
DATE_FILTERS = ["exact", "lt", "gt"]


# --- ListingType Node ---
class ListingTypeNode(OptimizedDjangoObjectType):
    class Meta:
        model = ListingType
        fields = "__all__"
        filter_fields = {
            "property_type": ["exact", "icontains"],
            "created": DATE_FILTERS,
            "updated": DATE_FILTERS,
        }
        interfaces = (Node,)


# --- Listing Node ---
class ListingNode(OptimizedDjangoObjectType):
    class Meta:
        model = Listing
        fields = "__all__"
        filter_fields = {
            "price": ["exact", "lt", "gt"],
            "address": ["exact", "icontains"],  # Assuming address as a CharField
            "property_area": ["exact"],
            "property_status": ["exact"],
            "property_for": ["exact"],
            "is_published": ["exact"],
            "agent__agent": ["exact"],  # Agent relation (filter by FK user)
            "owner__first_name": ["exact", "icontains"],
            "created": DATE_FILTERS,
            "updated": DATE_FILTERS,
        }
        interfaces = (Node,)


# --- ListingImage Node ---
class ListingImageNode(OptimizedDjangoObjectType):
    class Meta:
        model = ListingImage
        fields = "__all__"
        filter_fields = {
            "listing__id": ["exact"],
            "short_description": ["icontains"],
            "created": DATE_FILTERS,
        }
        interfaces = (Node,)


# --- ListingFile Node ---
class ListingFileNode(OptimizedDjangoObjectType):
    class Meta:
        model = ListingFile
        fields = "__all__"
        filter_fields = {
            "listing__id": ["exact"],
            "name": ["exact", "icontains"],
            "created": DATE_FILTERS,
            "updated": DATE_FILTERS,
            "for_customer": ["exact"],
        }
        interfaces = (Node,)
        
class PropertySubscriptionType(DjangoObjectType):
    class Meta:
        model = PropertySubscription
        fields = "__all__" 
    
# schema.py
class ProximityType(DjangoObjectType):
    class Meta:
        model = PropertyProximity
        fields = "__all__"

class PropertyWithProximityType(DjangoObjectType):
    proximity = graphene.Field(ProximityType)
    distance_km = graphene.Float()
    is_near_preferred = graphene.Boolean()
    
    class Meta:
        model = Listing
        fields = "__all__"
    
    def resolve_proximity(self, info):
        buyer = info.context.user.buyer_profile
        return self.proximities.filter(buyer=buyer).first()
    
    def resolve_distance_km(self, info):
        proximity = self.resolve_proximity(info)
        return proximity.distance_km if proximity else None
    
    def resolve_is_near_preferred(self, info):
        proximity = self.resolve_proximity(info)
        return proximity.is_in_preferred_location if proximity else False

