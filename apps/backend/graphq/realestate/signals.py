from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Listing, PropertySubscription

@receiver(post_save, sender=Listing)
def property_updated(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    
    if created:
        # Notify all users subscribed to new properties
        async_to_sync(channel_layer.group_send)(
            "all_properties",
            {
                "type": "property.created",
                "property": {
                    "id": instance.id,
                    "title": instance.title,
                    "price": str(instance.price),
                    "property_type": instance.listing_type.property_type
                },
                "timestamp": str(instance.created)
            }
        )
    else:
        # Get the most recent update log
        update_log = instance.propertyupdatelog_set.order_by('-timestamp').first()
        if not update_log:
            return
            
        # Prepare update data
        update_data = {
            "type": "property.update",
            "property_id": instance.id,
            "changes": update_log.changed_fields,
            "updated_by": update_log.updated_by.id if update_log.updated_by else None,
            "timestamp": str(update_log.timestamp)
        }
        
        # Notify users subscribed to this property type
        async_to_sync(channel_layer.group_send)(
            f"property_type_{instance.listing_type.property_type}",
            update_data
        )
        
        # Notify users subscribed to nearby locations
        if instance.address and instance.address.location:
            subscriptions = PropertySubscription.objects.filter(
                location__distance_lte=(
                    instance.address.location,
                    Distance(km=100)  # Max radius to check
                )
            ).exclude(user=update_log.updated_by)
            
            for sub in subscriptions:
                # Check if property is within the subscriber's radius
                if instance.address.location.distance(sub.location) * 100 <= sub.radius_km:
                    async_to_sync(channel_layer.group_send)(
                        f"user_{sub.user.id}",
                        update_data
                    )
                    
                    
# signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

@receiver(post_save, sender=Listing)
def update_proximity_on_listing_change(sender, instance, created, **kwargs):
    """Update proximity calculations when listing changes"""
    if instance.address and instance.address.location:
        instance.update_proximities()

@receiver(post_save, sender=BuyerProfile)
@receiver(post_save, sender=LocationPreference)
def update_proximity_on_buyer_change(sender, instance, created, **kwargs):
    """Update proximity calculations when buyer preferences change"""
    from .models import Listing
    
    # Get all properties near this buyer's locations
    listings = Listing.objects.filter(
        address__location__isnull=False,
        is_published=True
    )
    
    if isinstance(instance, BuyerProfile):
        if instance.search_location:
            listings = listings.filter(
                address__location__distance_lte=(
                    instance.search_location,
                    D(km=instance.search_radius_km)
                )
        )
    elif isinstance(instance, LocationPreference):
        listings = listings.filter(
            address__location__distance_lte=(
                instance.location,
                D(km=instance.radius_km)
            )
        )
    
    # Update proximity for each relevant property
    for listing in listings:
        listing.calculate_proximity_for_buyer(
            instance if isinstance(instance, BuyerProfile) else instance.buyer
        )