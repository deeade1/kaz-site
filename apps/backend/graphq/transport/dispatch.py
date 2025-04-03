import asyncio
import logging
from datetime import datetime, timedelta
from django.db import transaction
from geopy.distance import geodesic
from django.contrib.gis.geos import Point
from django.core.cache import cache
from .models import ServiceProviderProfile, ServiceRequest, Vehicle

logger = logging.getLogger('dispatch')

class UnifiedDispatcher:
    def __init__(self):
        self.provider_pool = []
        self.pending_requests = []
    
    async def update_provider_pool(self):
        """Refresh available providers from database"""
        self.provider_pool = await ServiceProviderProfile.objects.filter(
            is_available=True,
            is_online=True,
            last_active__gte=datetime.now() - timedelta(minutes=5)
        ).select_related('user').prefetch_related('current_vehicle').all()
    
    async def update_pending_requests(self):
        """Refresh pending requests from database"""
        self.pending_requests = await ServiceRequest.objects.filter(
            status='requested',
            created_at__gte=datetime.now() - timedelta(minutes=30)
        ).select_related('customer').all()
    
    def calculate_distance_score(self, provider, request):
        """Calculate distance score with caching"""
        cache_key = f'distance_{provider.id}_{request.id}'
        cached_score = cache.get(cache_key)
        
        if cached_score:
            return cached_score
        
        if not provider.location:
            return 0
        
        provider_point = (provider.location.y, provider.location.x)
        pickup_point = (request.pickup_location.y, request.pickup_location.x)
        distance = geodesic(provider_point, pickup_point).km
        
        cache.set(cache_key, distance, timeout=30)
        return distance
    
    def calculate_total_score(self, provider, request):
        """Composite score for provider-request matching"""
        distance_score = 1 - (self.calculate_distance_score(provider, request) / 50)
        rating_score = (provider.rating / 5) * 0.3
        return (distance_score * 0.7) + rating_score
    
    async def find_best_provider(self, request):
        """Find best provider for a given request"""
        if not self.provider_pool:
            return None
        
        scored_providers = []
        for provider in self.provider_pool:
            score = self.calculate_total_score(provider, request)
            scored_providers.append((provider, score))
        
        scored_providers.sort(key=lambda x: x[1], reverse=True)
        return scored_providers[0][0] if scored_providers else None
    
    async def assign_requests(self):
        """Main dispatch method to assign requests to providers"""
        await self.update_provider_pool()
        await self.update_pending_requests()
        
        assignments = []
        
        for request in self.pending_requests:
            best_provider = await self.find_best_provider(request)
            if best_provider:
                async with transaction.atomic():
                    # Get the provider with row lock
                    provider = await ServiceProviderProfile.objects.select_for_update().aget(pk=best_provider.pk)
                    if not provider.is_available:
                        continue
                    
                    # Assign request
                    request.provider = provider
                    request.status = 'accepted'
                    request.vehicle = provider.current_vehicle
                    await request.asave()
                    
                    provider.is_available = False
                    await provider.asave()
                    
                    assignments.append((request.id, provider.id))
        
        return assignments

async def run_dispatch_cycle():
    """Run the dispatch process in intervals"""
    dispatcher = UnifiedDispatcher()
    while True:
        try:
            assignments = await dispatcher.assign_requests()
            logger.info(f"Dispatch completed. Assignments: {assignments}")
        except Exception as e:
            logger.error(f"Dispatch error: {str(e)}")
        
        await asyncio.sleep(15)