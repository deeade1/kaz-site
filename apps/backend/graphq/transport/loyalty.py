from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from .models import LoyaltyReward

class LoyaltyProgram:
    POINT_RATES = {
        'shared': 1.5,
        'standard': 1.0
    }
    
    @classmethod
    def award_points(cls, trip):
        """Award points for completed trip"""
        base_points = trip.distance_km * 0.1
        multiplier = cls.POINT_RATES.get(trip.service_type, 1.0)
        
        points = round(base_points * multiplier)
        trip.customer.loyalty_points += points
        trip.customer.save()
        
        return points
    
    @classmethod
    def check_rewards(cls, user):
        """Check and award any eligible rewards"""
        rewards = []
        points = user.loyalty_points
        
        if points >= 1000 and not user.rewards.filter(reward_type='gold').exists():
            reward = LoyaltyReward.objects.create(
                user=user,
                reward_type='gold',
                discount_percent=10,
                expires=timezone.now() + timedelta(days=365)
            )
            rewards.append(reward)
            
        # Add more reward tiers as needed
        
        return rewards