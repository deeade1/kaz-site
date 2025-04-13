import graphene
from django.db import transaction
from graphene import relay
from graphql import GraphQLError
from graphene_django_jwt.decorators import login_required
from django.core.exceptions import ValidationError
from collections import defaultdict
from typing import Dict, List, Optional

from shipping.models import (
    ShippingZone,
    ShippingMethod,
    ShippingMethodPostalCodeRule,
    ShippingMethodChannelListing
)
from graph.shipping.types import (
    ShippingZoneNode,
    ShippingMethodNode,
    ShippingMethodPostalCodeRuleNode,
    ShippingMethodChannelListingNode
)
from ..core.utils import from_global_id_strict_type
from ..core.types.common import ShippingError
from ..channel.utils import validate_channel
from ..warehouse.utils import validate_warehouse

class ShippingMethodChannelListingUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of shipping method to update")
        input = ShippingMethodChannelListingInput(
            required=True,
            description="Fields required to update channel listings"
        )

    shipping_method = graphene.Field(ShippingMethodNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **data):
        shipping_method_id = data.get("id")
        input_data = data.get("input", {})

        try:
            # Validate and get shipping method instance
            shipping_method = cls.validate_shipping_method(info, shipping_method_id)
            
            # Clean and validate input
            cleaned_input = cls.clean_input(info, shipping_method, input_data)
            
            # Process in atomic transaction
            with transaction.atomic():
                cls.process_channel_updates(shipping_method, cleaned_input)
                
                # Invalidate shipping methods cache
                cls.invalidate_cache(shipping_method)
                
                # Trigger events
                cls.trigger_events(info, shipping_method)

            return ShippingMethodChannelListingUpdate(
                shipping_method=shipping_method
            )

        except ValidationError as e:
            raise GraphQLError(str(e))

    @classmethod
    def validate_shipping_method(cls, info, shipping_method_id):
        """Validate and return shipping method instance."""
        try:
            return ShippingMethod.objects.get(
                pk=from_global_id_strict_type(
                    shipping_method_id, 
                    only_type=ShippingMethodNode, 
                    field="id"
                )
            )
        except ShippingMethod.DoesNotExist:
            raise ValidationError({
                "id": ValidationError(
                    "Shipping method not found",
                    code=ShippingError.NOT_FOUND
                )
            })

    @classmethod
    def clean_input(cls, info, shipping_method, input_data):
        """Validate and clean input data."""
        errors = defaultdict(list)
        cleaned_input = {}
        
        # Validate channels
        add_channels = input_data.get("add_channels", [])
        remove_channels = input_data.get("remove_channels", [])
        
        cls.validate_channels(
            shipping_method, 
            add_channels, 
            remove_channels, 
            errors
        )
        
        # Validate prices
        for channel_data in add_channels:
            cls.validate_channel_pricing(channel_data, errors)
        
        if errors:
            raise ValidationError(errors)
            
        cleaned_input.update({
            "add_channels": add_channels,
            "remove_channels": remove_channels
        })
        
        return cleaned_input

    @classmethod
    def validate_channels(cls, shipping_method, add_channels, remove_channels, errors):
        """Validate channel operations."""
        # Check for duplicates
        add_channel_ids = {c["channel_id"] for c in add_channels}
        remove_channel_ids = set(remove_channels)
        
        if duplicates := add_channel_ids & remove_channel_ids:
            errors["input"].append(ValidationError(
                f"Cannot add and remove same channels: {duplicates}",
                code=ShippingError.DUPLICATED_INPUT_ITEM
            ))
        
        # Validate channel existence and permissions
        for channel_id in add_channel_ids | remove_channel_ids:
            try:
                validate_channel(channel_id, ShippingError)
            except ValidationError as e:
                errors["input"].append(e)

    @classmethod
    def validate_channel_pricing(cls, channel_data, errors):
        """Validate channel pricing data."""
        channel_id = channel_data["channel_id"]
        price = channel_data.get("price")
        min_price = channel_data.get("minimum_order_price")
        max_price = channel_data.get("maximum_order_price")
        
        if price is None:
            errors["price"].append(ValidationError(
                "Price is required when adding a channel",
                code=ShippingError.REQUIRED,
                params={"channel": channel_id}
            ))
        
        if min_price is not None and max_price is not None and max_price <= min_price:
            errors["maximum_order_price"].append(ValidationError(
                "Maximum price must be greater than minimum price",
                code=ShippingError.MAX_LESS_THAN_MIN,
                params={"channel": channel_id}
            ))

    @classmethod
    def process_channel_updates(cls, shipping_method, cleaned_input):
        """Process channel additions and removals."""
        # Add new channels
        for channel_data in cleaned_input["add_channels"]:
            ShippingMethodChannelListing.objects.update_or_create(
                shipping_method=shipping_method,
                channel_id=channel_data["channel_id"],
                defaults={
                    "price_amount": channel_data["price"],
                    "minimum_order_price_amount": channel_data.get("minimum_order_price"),
                    "maximum_order_price_amount": channel_data.get("maximum_order_price"),
                    "currency": channel_data["currency"]
                }
            )
        
        # Remove channels
        if cleaned_input["remove_channels"]:
            ShippingMethodChannelListing.objects.filter(
                shipping_method=shipping_method,
                channel_id__in=cleaned_input["remove_channels"]
            ).delete()

    @classmethod
    def invalidate_cache(cls, shipping_method):
        """Invalidate cache for affected shipping methods."""
        # Implementation depends on your caching strategy
        pass

    @classmethod
    def trigger_events(cls, info, shipping_method):
        """Trigger any post-update events."""
        # Implementation depends on your event system
        pass


class ShippingZoneMutations:
    @classmethod
    def clean_input(cls, info, instance, data):
        """Optimized input cleaning for shipping zones."""
        errors = defaultdict(list)
        
        # Validate warehouses
        add_warehouses = data.get("add_warehouses", [])
        remove_warehouses = data.get("remove_warehouses", [])
        
        cls.validate_warehouses(
            instance, 
            add_warehouses, 
            remove_warehouses, 
            errors
        )
        
        # Validate countries if needed
        if "countries" in data:
            cls.validate_countries(data["countries"], errors)
            
        if errors:
            raise ValidationError(errors)
            
        return data

    @classmethod
    def validate_warehouses(cls, shipping_zone, add_warehouses, remove_warehouses, errors):
        """Validate warehouse operations."""
        # Check for duplicates
        duplicates = set(add_warehouses) & set(remove_warehouses)
        if duplicates:
            errors["warehouses"].append(ValidationError(
                f"Cannot add and remove same warehouses: {duplicates}",
                code=ShippingError.DUPLICATED_INPUT_ITEM
            ))
        
        # Validate warehouse existence and permissions
        for warehouse_id in set(add_warehouses) | set(remove_warehouses):
            try:
                validate_warehouse(warehouse_id, ShippingError)
            except ValidationError as e:
                errors["warehouses"].append(e)

    @classmethod
    def validate_countries(cls, countries, errors):
        """Validate country codes."""
        # Implementation depends on your country validation logic
        pass


class ShippingZoneCreate(relay.ClientIDMutation, ShippingZoneMutations):
    class Input:
        input = ShippingZoneCreateInput(required=True)

    shipping_zone = graphene.Field(ShippingZoneNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **data):
        try:
            input_data = data.get("input", {})
            cleaned_input = cls.clean_input(info, None, input_data)
            
            with transaction.atomic():
                shipping_zone = ShippingZone.objects.create(
                    name=cleaned_input["name"],
                    description=cleaned_input.get("description", ""),
                    countries=cleaned_input.get("countries", []),
                    default=cleaned_input.get("default", False)
                )
                
                # Process M2M relationships
                cls.process_relationships(shipping_zone, cleaned_input)
                
                return ShippingZoneCreate(shipping_zone=shipping_zone)
                
        except ValidationError as e:
            raise GraphQLError(str(e))

    @classmethod
    def process_relationships(cls, shipping_zone, cleaned_input):
        """Process warehouses and channels."""
        if "add_warehouses" in cleaned_input:
            shipping_zone.warehouses.add(*cleaned_input["add_warehouses"])
            
        if "add_channels" in cleaned_input:
            shipping_zone.channels.add(*cleaned_input["add_channels"])


class ShippingZoneUpdate(relay.ClientIDMutation, ShippingZoneMutations):
    class Input:
        id = graphene.ID(required=True)
        input = ShippingZoneUpdateInput(required=True)

    shipping_zone = graphene.Field(ShippingZoneNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **data):
        shipping_zone_id = data.get("id")
        input_data = data.get("input", {})
        
        try:
            shipping_zone = ShippingZone.objects.get(
                pk=from_global_id_strict_type(
                    shipping_zone_id,
                    only_type=ShippingZoneNode,
                    field="id"
                )
            )
            
            cleaned_input = cls.clean_input(info, shipping_zone, input_data)
            
            with transaction.atomic():
                # Update fields
                for field, value in cleaned_input.items():
                    if field in ["name", "description", "countries", "default"]:
                        setattr(shipping_zone, field, value)
                
                shipping_zone.save()
                
                # Process M2M relationships
                cls.process_relationships(shipping_zone, cleaned_input)
                
                return ShippingZoneUpdate(shipping_zone=shipping_zone)
                
        except (ShippingZone.DoesNotExist, ValidationError) as e:
            raise GraphQLError(str(e))

    @classmethod
    def process_relationships(cls, shipping_zone, cleaned_input):
        """Process warehouse and channel updates."""
        if "add_warehouses" in cleaned_input:
            shipping_zone.warehouses.add(*cleaned_input["add_warehouses"])
            
        if "remove_warehouses" in cleaned_input:
            shipping_zone.warehouses.remove(*cleaned_input["remove_warehouses"])
            
        if "add_channels" in cleaned_input:
            shipping_zone.channels.add(*cleaned_input["add_channels"])
            
        if "remove_channels" in cleaned_input:
            shipping_zone.channels.remove(*cleaned_input["remove_channels"])


class ShippingZoneDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    shipping_zone = graphene.Field(ShippingZoneNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **data):
        shipping_zone_id = data.get("id")
        
        try:
            shipping_zone = ShippingZone.objects.get(
                pk=from_global_id_strict_type(
                    shipping_zone_id,
                    only_type=ShippingZoneNode,
                    field="id"
                )
            )
            
            with transaction.atomic():
                shipping_zone.delete()
                return ShippingZoneDelete(shipping_zone=shipping_zone)
                
        except ShippingZone.DoesNotExist:
            raise GraphQLError("Shipping zone not found")


class ShippingMutations(graphene.ObjectType):
    shipping_zone_create = ShippingZoneCreate.Field()
    shipping_zone_update = ShippingZoneUpdate.Field()
    shipping_zone_delete = ShippingZoneDelete.Field()
    shipping_method_channel_listing_update = ShippingMethodChannelListingUpdate.Field()