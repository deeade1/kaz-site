from graphene import ObjectType, relay
from graphene_django.filter import DjangoFilterConnectionField

from .types import ListingTypeNode, ListingNode, ListingImageNode, ListingFileNode


class RealestateQueries(ObjectType):
    # --- Single Item Queries by Global ID ---
    listing_type = relay.Node.Field(ListingTypeNode)
    listing = relay.Node.Field(ListingNode)
    listing_image = relay.Node.Field(ListingImageNode)
    listing_file = relay.Node.Field(ListingFileNode)

    # --- List Queries with Filters ---
    all_listing_types = DjangoFilterConnectionField(ListingTypeNode, description="Retrieve all listing types with filters.")
    all_listings = DjangoFilterConnectionField(ListingNode, description="Retrieve all listings with filters.")
    all_listing_images = DjangoFilterConnectionField(ListingImageNode, description="Retrieve all listing images with filters.")
    all_listing_files = DjangoFilterConnectionField(ListingFileNode, description="Retrieve all listing files with filters.")

