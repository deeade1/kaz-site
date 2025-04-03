from geopy.distance import great_circle
import numpy as np
from scipy.spatial import distance_matrix
from .models import StopPoint

class RouteOptimizer:
    @staticmethod
    def calculate_distance_matrix(points):
        """Create distance matrix from list of points"""
        return distance_matrix(points, points)

    @staticmethod
    def optimize_route(trip):
        """Optimize stop sequence using TSP approximation"""
        stops = list(trip.stops.order_by('sequence').values_list('lat', 'lon'))
        
        if len(stops) < 3:
            return stops
            
        dist_matrix = RouteOptimizer.calculate_distance_matrix(stops)
        
        # Implement nearest neighbor algorithm
        path = [0]
        unvisited = set(range(1, len(stops)))
        
        while unvisited:
            last = path[-1]
            next_node = min(unvisited, key=lambda x: dist_matrix[last][x])
            path.append(next_node)
            unvisited.remove(next_node)
            
        # Reorder stops in database
        for i, stop_idx in enumerate(path):
            StopPoint.objects.filter(
                trip=trip,
                lat=stops[stop_idx][0],
                lon=stops[stop_idx][1]
            ).update(sequence=i)
            
        return path