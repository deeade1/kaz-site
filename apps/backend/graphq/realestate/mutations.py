import logging
from django.shortcuts import get_object_or_404
from django.db import transaction
from graphql import GraphQLError
from graphql_relay import from_global_id, to_global_id
import graphene
from graphene import relay, ObjectType
from graphene_django_jwt.decorators import login_required

from realestate.models import (
    Client,
    Agent,
    Listing,
    ListingType,
    ListingImage,
    ListingFile,
)
from graphq.realestate.types import (
    ListingFileNode,
    ListingImageNode,
    ListingNode,
    ListingTypeNode,
)
from graphq.accounts.types import AddressNode
from accounts.models import Address
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)
User = get_user_model()

# --- Utility Function ---
def get_instance_from_global_id(model, global_id, required=True):
    try:
        instance_id = from_global_id(global_id)[1]
        return get_object_or_404(model, pk=instance_id) if required else model.objects.filter(pk=instance_id).first()
    except Exception:
        raise GraphQLError(f"Invalid ID provided for {model.__name__}.")


# --- Abstract Location Update Mutation ---
class UpdateLocationMixin:
    success = graphene.Boolean()

    @classmethod
    def update_location(cls, model, instance_id, latitude, longitude):
        try:
            instance = get_instance_from_global_id(model, instance_id)
            instance.update_location(latitude, longitude)
            return cls(success=True)
        except model.DoesNotExist:
            raise GraphQLError(f"{model.__name__} not found.")
        except Exception as e:
            logger.error(f"Error updating location for {model.__name__}: {e}")
            return cls(success=False)


class UpdateClientLocation(UpdateLocationMixin, relay.ClientIDMutation):
    class Input:
        client_id = graphene.ID(required=True)
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, client_id, latitude, longitude):
        return cls.update_location(Client, client_id, latitude, longitude)


class UpdateAgentLocation(UpdateLocationMixin, relay.ClientIDMutation):
    class Input:
        agent_id = graphene.ID(required=True)
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, agent_id, latitude, longitude):
        return cls.update_location(Agent, agent_id, latitude, longitude)


# --- Create ListingType ---
class CreateListingType(relay.ClientIDMutation):
    success = graphene.Boolean()
    listing_type = graphene.Field(ListingTypeNode)

    class Input:
        property_type = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, property_type):
        try:
            listing_type = ListingType.objects.create(property_type=property_type)
            return cls(success=True, listing_type=listing_type)
        except Exception as e:
            logger.error(f"Error creating ListingType: {e}")
            return cls(success=False)


# --- Add Listing Image ---
class AddListingImage(relay.ClientIDMutation):
    success = graphene.Boolean()
    listing_image = graphene.Field(ListingImageNode)

    class Input:
        listing_id = graphene.ID(required=True)
        short_description = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, listing_id, short_description=""):
        try:
            listing = get_instance_from_global_id(Listing, listing_id)
            image_file = info.context.FILES.get("image")
            if not image_file:
                raise GraphQLError("Image file is required.")

            listing_image = ListingImage.objects.create(
                listing=listing,
                image=image_file,
                short_description=short_description,
            )
            return cls(success=True, listing_image=listing_image)
        except Exception as e:
            logger.error(f"Error adding ListingImage: {e}")
            return cls(success=False)


# --- Add Listing File ---
class AddListingFile(relay.ClientIDMutation):
    success = graphene.Boolean()
    listing_file = graphene.Field(ListingFileNode)

    class Input:
        listing_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        short_description = graphene.String()
        for_customer = graphene.Boolean(default_value=True)

    @classmethod
    def mutate_and_get_payload(
        cls, root, info, listing_id, name, short_description="", for_customer=True
    ):
        try:
            listing = get_instance_from_global_id(Listing, listing_id)
            file_obj = info.context.FILES.get("file")
            if not file_obj:
                raise GraphQLError("File is required.")

            listing_file = ListingFile.objects.create(
                listing=listing,
                name=name,
                file=file_obj,
                short_description=short_description,
                for_customer=for_customer,
            )
            return cls(success=True, listing_file=listing_file)
        except Exception as e:
            logger.error(f"Error adding ListingFile: {e}")
            return cls(success=False)


# --- Create Listing ---
class CreateListingMutation(relay.ClientIDMutation):
    id = graphene.String()
    listing = graphene.Field(ListingNode)
    listing_type = graphene.Field(ListingTypeNode)
    listing_image = graphene.Field(ListingImageNode)
    address = graphene.Field(AddressNode)
    success = graphene.String()

    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        price = graphene.Decimal(required=True)
        property_area = graphene.String(required=True)
        listing_type_id = graphene.ID(required=True)
        address_id = graphene.ID(required=True)
        bedrooms = graphene.Int()
        ceiling_height = graphene.Float()
        bathrooms = graphene.Int()
        garage = graphene.Int(default_value=0)
        square_feet = graphene.Float()
        lot_size = graphene.Float()
        property_status = graphene.String(default_value="draft")
        property_for = graphene.String(default_value="S")
        year_built = graphene.Int(default_value=0)
        agent_id = graphene.ID()
        owner_id = graphene.ID()
        reviewer_id = graphene.ID()
        free_from = graphene.Date(required=True)

    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        if input["price"] <= 0:
            raise GraphQLError("Price must be positive.")

        # Fetch related objects
        listing_type = get_instance_from_global_id(ListingType, input["listing_type_id"])
        address = get_instance_from_global_id(Address, input["address_id"])
        agent = get_instance_from_global_id(User, input["agent_id"], required=False)
        owner = get_instance_from_global_id(User, input["owner_id"], required=False)
        reviewer = get_instance_from_global_id(User, input["reviewer_id"], required=False)

        listing = Listing.objects.create(
            title=input["title"],
            description=input["description"],
            price=input["price"],
            property_area=input["property_area"],
            listing_type=listing_type,
            address=address,
            bedrooms=input.get("bedrooms"),
            ceiling_height=input.get("ceiling_height"),
            bathrooms=input.get("bathrooms"),
            garage=input.get("garage"),
            square_feet=input.get("square_feet"),
            lot_size=input.get("lot_size"),
            property_status=input.get("property_status"),
            property_for=input.get("property_for"),
            year_built=input.get("year_built"),
            agent=agent,
            owner=owner,
            reviewer=reviewer,
            free_from=input.get("free_from"),
        )

        # Handle optional image upload
        listing_image = None
        if "image" in info.context.FILES:
            listing_image = ListingImage.objects.create(
                listing=listing, image=info.context.FILES["image"]
            )

        return cls(
            id=to_global_id(ListingNode.__name__, listing.id),
            listing=listing,
            listing_type=listing_type,
            listing_image=listing_image,
            address=address,
            success="true",
        )


# --- Update Listing ---
class UpdateListingMutation(relay.ClientIDMutation):
    id = graphene.String()
    listing = graphene.Field(ListingNode)
    success = graphene.String()

    class Input:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        price = graphene.Decimal()
        property_area = graphene.String()
        listing_type_id = graphene.ID()
        address_id = graphene.ID()
        bedrooms = graphene.Int()
        ceiling_height = graphene.Float()
        bathrooms = graphene.Int()
        garage = graphene.Int()
        square_feet = graphene.Float()
        lot_size = graphene.Float()
        property_status = graphene.String()
        property_for = graphene.String()
        year_built = graphene.Int()
        agent_id = graphene.ID()
        owner_id = graphene.ID()
        reviewer_id = graphene.ID()
        free_from = graphene.Date()

    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        listing = get_instance_from_global_id(Listing, input["id"])

        if "price" in input and input["price"] <= 0:
            raise GraphQLError("Price must be positive.")

        # Update related objects
        if input.get("listing_type_id"):
            listing.listing_type = get_instance_from_global_id(ListingType, input["listing_type_id"])
        if input.get("address_id"):
            listing.address = get_instance_from_global_id(Address, input["address_id"])
        if input.get("agent_id"):
            listing.agent = get_instance_from_global_id(User, input["agent_id"], required=False)
        if input.get("owner_id"):
            listing.owner = get_instance_from_global_id(User, input["owner_id"], required=False)
        if input.get("reviewer_id"):
            listing.reviewer = get_instance_from_global_id(User, input["reviewer_id"], required=False)

        # Update fields dynamically
        updatable_fields = [
            "title", "description", "price", "property_area", "bedrooms",
            "ceiling_height", "bathrooms", "garage", "square_feet", "lot_size",
            "property_status", "property_for", "year_built", "free_from"
        ]
        for field in updatable_fields:
            if field in input:
                setattr(listing, field, input[field])

        listing.save()
        return cls(
            id=to_global_id(ListingNode.__name__, listing.id),
            listing=listing,
            success="Listing updated successfully.",
        )


# --- Delete Listing ---
class DeleteListingMutation(relay.ClientIDMutation):
    id = graphene.String()
    success = graphene.String()

    class Input:
        id = graphene.ID(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        listing = get_instance_from_global_id(Listing, input["id"])
        listing.delete()
        return cls(
            id=input["id"],
            success="Listing deleted successfully.",
        )


# --- Realestate Mutations ---
class RealestateMutations(ObjectType):
    create_listing = CreateListingMutation.Field()
    update_listing = UpdateListingMutation.Field()
    delete_listing = DeleteListingMutation.Field()
    update_client_location = UpdateClientLocation.Field()
    update_agent_location = UpdateAgentLocation.Field()
    create_listing_type = CreateListingType.Field()
    add_listing_image = AddListingImage.Field()
    add_listing_file = AddListingFile.Field()

class NearbyProperties(relay.ClientIDMutation):
    class Input:
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)
        radius_km = graphene.Int(default_value=10)
        max_results = graphene.Int(default_value=20)
    
    properties = graphene.List(PropertyWithProximityType)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user = info.context.user
        
        # Create or update buyer profile with search location
        buyer_profile, created = BuyerProfile.objects.get_or_create(user=user)
        buyer_profile.search_location = Point(kwargs['longitude'], kwargs['latitude'])
        buyer_profile.search_radius_km = kwargs['radius_km']
        buyer_profile.save()
        
        # Get nearby properties with proximity data
        properties = buyer_profile.find_nearby_properties(
            max_results=kwargs['max_results']
        )
        
        return NearbyProperties(properties=properties)

class RealestateMutations(ObjectType):
    # ... existing mutations ...
    find_nearby_properties = NearbyProperties.Field()