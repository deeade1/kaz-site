from django.db.models import Q
from accounts.models import UserProfile

class RiderCompatibility:
    @staticmethod
    def calculate_score(user1, user2):
        """Calculate compatibility score (0-100) between two users"""
        try:
            p1 = UserProfile.objects.get(user=user1)
            p2 = UserProfile.objects.get(user=user2)
            
            score = 0
            
            # Preference matching
            if p1.music_preference == p2.music_preference:
                score += 20
            if p1.conversation_level == p2.conversation_level:
                score += 30
                
            # Rating proximity
            score += 50 - abs(p1.rating - p2.rating) * 10
            
            return min(100, max(0, score))
        except UserProfile.DoesNotExist:
            return 50  # Default score if no profile

    @classmethod
    def find_compatible_groups(cls, trip):
        """Group riders by compatibility on a shared trip"""
        from itertools import combinations
        
        bookings = trip.bookings.select_related('user').all()
        if len(bookings) < 2:
            return []
            
        pairs = combinations(bookings, 2)
        scored_pairs = []
        
        for b1, b2 in pairs:
            score = cls.calculate_score(b1.user, b2.user)
            scored_pairs.append({
                'users': {b1.user, b2.user},
                'score': score
            })
            
        # Implement clustering algorithm here
        # This is simplified version
        return sorted(scored_pairs, key=lambda x: -x['score'])