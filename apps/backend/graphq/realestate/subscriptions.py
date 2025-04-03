import asyncio
from datetime import datetime
from graphene import Field, ObjectType, Schema
from graphq.realestate.types import ListingNode
from realestate.models import Listing



# Subscription Class
class RealestateSubscriptions(ObjectType):
    listing_created = Field(ListingNode)
    listing_updated = Field(ListingNode)
    listing_deleted = Field(ListingNode)

    # Async generator for listing_created subscription
    async def subscribe_listing_created(root, info):
        while True:
            created_listings = (
                Listing.objects.filter()
            )  # Custom filter criteria if needed
            for listing in created_listings:
                yield {"listing_created": listing}
            await asyncio.sleep(1)  # Polling interval

    # Async generator for listing_updated subscription
    async def subscribe_listing_updated(root, info):
        while True:
            updated_listings = (
                Listing.objects.filter()
            )  # Add custom filtering as needed
            for listing in updated_listings:
                yield {"listing_updated": listing}
            await asyncio.sleep(1)

    # Async generator for listing_deleted subscription
    async def subscribe_listing_deleted(root, info):
        while True:
            deleted_listings = (
                Listing.objects.filter()
            )  # Modify if needed to get deleted instances
            for listing in deleted_listings:
                yield {"listing_deleted": listing}
            await asyncio.sleep(1)




import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphene_subscriptions.events import CREATED, UPDATED, DELETED
from .models import Listing, PropertySubscription



import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphene_subscriptions.events import CREATED, UPDATED, DELETED
from .models import Listing, PropertySubscription



class PropertyUpdateType(graphene.ObjectType):
    property_id = graphene.ID()
    field = graphene.String()
    old_value = graphene.String()
    new_value = graphene.String()
    timestamp = graphene.DateTime()

class Subscription(graphene.ObjectType):
    property_created = graphene.Field(ListingType)
    property_updated = graphene.Field(PropertyUpdateType, property_id=graphene.ID())
    property_subscription_updates = graphene.Field(PropertyUpdateType)
    
    def resolve_property_created(root, info):
        return root.filter(
            lambda event:
                event.operation == CREATED and
                isinstance(event.instance, Listing)
        ).map(lambda event: event.instance)
    
    def resolve_property_updated(root, info, property_id=None):
        def filter_events(event):
            if event.operation == UPDATED and isinstance(event.instance, Listing):
                if property_id:
                    return str(event.instance.id) == str(property_id)
                return True
            return False
        
        return root.filter(filter_events).map(lambda event: {
            'property_id': event.instance.id,
            'field': event.field_name,
            'old_value': event.old_value,
            'new_value': event.new_value,
            'timestamp': event.timestamp
        })
    
    def resolve_property_subscription_updates(root, info):
        # Get user's subscriptions
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required")
        
        subscriptions = PropertySubscription.objects.filter(user=user)
        if not subscriptions:
            return None
        
        # Filter events based on user's subscriptions
        def filter_subscribed_events(event):
            if event.operation == UPDATED and isinstance(event.instance, Listing):
                # Check if user is subscribed to this property type
                subscribed_types = {sub.property_type for sub in subscriptions if sub.property_type}
                if subscribed_types and event.instance.listing_type.property_type in subscribed_types:
                    return True
                
                # Check location-based subscriptions
                if event.instance.address and event.instance.address.location:
                    for sub in subscriptions:
                        if sub.location and sub.location.distance(event.instance.address.location) * 100 <= sub.radius_km:
                            return True
            return False
        
        return root.filter(filter_subscribed_events).map(lambda event: {
            'property_id': event.instance.id,
            'field': event.field_name,
            'old_value': event.old_value,
            'new_value': event.new_value,
            'timestamp': event.timestamp
        })