/**
 * usePlaces Hook
 * React hook for fetching port attractions/places to do
 */

import { useState, useEffect } from 'react';
import { searchPlaces, calculateDistance } from '../services/placesAPI';
import { apiConfig } from '../config/apiConfig';

export function usePlaces(lat, lon, query = '', type = 'tourist_attraction', maxResults = 10, radius = 5000) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    if (!apiConfig.places.enabled) {
      setLoading(false);
      setError('Places API not configured');
      return;
    }

    async function fetchPlaces() {
      try {
        setLoading(true);
        setError(null);

        // Build search query - include destination name if provided
        const searchQuery = query || `attractions near cruise port ${lat},${lon}`;
        
        const results = await searchPlaces(lat, lon, searchQuery, type, radius);
        
        // Calculate distances and sort
        const placesWithDistance = results
          .slice(0, maxResults)
          .map(place => {
            const placeLat = place.geometry?.location?.lat;
            const placeLon = place.geometry?.location?.lng;
            const distance = placeLat && placeLon 
              ? calculateDistance(lat, lon, placeLat, placeLon)
              : null;

            return {
              ...place,
              distance
            };
          })
          .sort((a, b) => {
            // Sort by rating (desc) first, then distance
            if (b.rating && a.rating) {
              return b.rating - a.rating;
            }
            if (a.distance && b.distance) {
              return a.distance - b.distance;
            }
            return 0;
          });

        setPlaces(placesWithDistance);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [lat, lon, query, type, maxResults, radius]);

  return { places, loading, error };
}

