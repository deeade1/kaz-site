# routing.py
import googlemaps
from datetime import datetime

class RouteOptimizer:
    def __init__(self, api_key):
        self.gmaps = googlemaps.Client(key=api_key)
    
    def optimize_route(self, stops, vehicle_type='car'):
        """Optimize delivery route with multiple stops"""
        if len(stops) < 2:
            return {'route': stops, 'distance': 0, 'duration': 0}
        
        # Get distance matrix
        distance_matrix = self.gmaps.distance_matrix(
            origins=stops,
            destinations=stops,
            mode='driving',
            departure_time=datetime.now(),
            traffic_model='best_guess'
        )
        
        # Implement traveling salesman algorithm
        optimized_route = self._solve_tsp(stops, distance_matrix)
        
        # Calculate total distance and duration
        total_distance = 0  # meters
        total_duration = 0  # seconds
        
        for i in range(len(optimized_route)-1):
            origin = optimized_route[i]
            dest = optimized_route[i+1]
            total_distance += distance_matrix['rows'][origin]['elements'][dest]['distance']['value']
            total_duration += distance_matrix['rows'][origin]['elements'][dest]['duration']['value']
        
        return {
            'route': optimized_route,
            'distance': total_distance,
            'duration': total_duration,
            'vehicle_type': vehicle_type
        }
    
    def _solve_tsp(self, stops, distance_matrix):
        """Basic implementation of nearest neighbor TSP algorithm"""
        unvisited = set(range(len(stops)))
        route = [0]  # Start at first stop
        unvisited.remove(0)
        
        while unvisited:
            last = route[-1]
            nearest = min(
                unvisited,
                key=lambda x: distance_matrix['rows'][last]['elements'][x]['distance']['value']
            )
            route.append(nearest)
            unvisited.remove(nearest)
        
        return route