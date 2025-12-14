/**
 * Places API Service
 * Google Places API integration for port attractions and things to do
 * 
 * Uses Vercel serverless function proxy to avoid CORS issues.
 * 
 * Documentation: https://developers.google.com/maps/documentation/places/web-service
 */

import { apiConfig } from '../config/apiConfig';

// Extended cache duration for development to prevent API hammering
const IS_DEV = import.meta.env.DEV;
const PLACES_CACHE_DURATION = IS_DEV ? 86400000 : 3600000; // 24 hours in dev, 1 hour in production

// Simple in-memory cache
const cache = {
  search: new Map(),
  details: new Map()
};

/**
 * Get cache key for search
 */
function getSearchCacheKey(lat, lon, query, type, radius) {
  return `places_${lat}_${lon}_${query}_${type}_${radius}`;
}

/**
 * Search for places (attractions) near a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} query - Search query (optional)
 * @param {string} type - Place type (tourist_attraction, point_of_interest, etc.)
 * @param {number} radius - Search radius in meters (default: 5000 = 5km)
 * @returns {Promise<Array>} Array of places
 */
export async function searchPlaces(lat, lon, query = '', type = 'tourist_attraction', radius = 5000) {
  if (!apiConfig.places.enabled) {
    console.warn('Places API not configured');
    return [];
  }

  // Check cache
  const cacheKey = getSearchCacheKey(lat, lon, query, type, radius);
  const cached = cache.search.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < PLACES_CACHE_DURATION) {
    return cached.data;
  }

  try {
    // For local dev: Check if we're in development and proxy isn't available
    // In production/Vercel, this will use the serverless function
    const isDevelopment = import.meta.env.DEV;
    const proxyUrl = isDevelopment 
      ? `/api/places-proxy` // Will use Vite proxy or vercel dev
      : `/api/places-proxy`; // Production uses Vercel serverless function
    
    const params = new URLSearchParams({
      action: 'search',
      lat: lat.toString(),
      lon: lon.toString(),
      type: type,
      radius: radius.toString()
    });

    if (query) {
      params.append('query', query);
    }

    const response = await fetch(`${proxyUrl}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(data.message || `Places API error: ${data.status}`);
    }

    const results = data.results || [];

    // Calculate distances for each place
    const placesWithDistance = results.map(place => {
      if (place.geometry && place.geometry.location) {
        const placeLat = place.geometry.location.lat;
        const placeLon = place.geometry.location.lng;
        place.distance = calculateDistance(lat, lon, placeLat, placeLon);
      }
      return place;
    });

    // Sort by distance
    placesWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

    // Cache the results
    cache.search.set(cacheKey, {
      data: placesWithDistance,
      timestamp: Date.now()
    });

    return placesWithDistance;
  } catch (error) {
    console.error('Error fetching places:', error);
    // Return empty array on error (graceful degradation)
    return [];
  }
}

/**
 * Get place details (more information about a specific place)
 * @param {string} placeId - Google Place ID
 * @param {string} fields - Comma-separated list of fields to return
 * @returns {Promise<Object>} Place details
 */
export async function getPlaceDetails(placeId, fields = 'name,rating,formatted_address,formatted_phone_number,website,photos,opening_hours,geometry') {
  if (!apiConfig.places.enabled) {
    console.warn('Places API not configured');
    return null;
  }

  // Check cache
  const cacheKey = `place_${placeId}_${fields}`;
  const cached = cache.details.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < PLACES_CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Call our Vercel serverless function proxy
    const params = new URLSearchParams({
      action: 'details',
      placeId: placeId,
      fields: fields
    });

    const response = await fetch(`/api/places-proxy?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.message || `Places API error: ${data.status}`);
    }

    const result = data.result;

    // Cache the result
    cache.details.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error fetching place details:', error);
    // Return null on error (graceful degradation)
    return null;
  }
}

/**
 * Get photo URL from Google Places photo reference
 * Uses proxy endpoint to keep API key secure
 * @param {string} photoReference - Photo reference from API
 * @param {number} maxWidth - Maximum width (default: 400)
 * @returns {string} Photo URL via proxy
 */
export function getPlacePhotoUrl(photoReference, maxWidth = 400) {
  if (!apiConfig.places.enabled || !photoReference) {
    return null;
  }
  
  // Use proxy endpoint to keep API key secure
  return `/api/places-proxy?action=photo&photo_reference=${encodeURIComponent(photoReference)}&maxwidth=${maxWidth}`;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Format distance for display
 * @param {number} distanceKm - Distance in kilometers
 * @returns {string} Formatted distance
 */
export function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m from port`;
  }
  return `${distanceKm.toFixed(1)}km from port`;
}

/**
 * Get place category/type for display
 * @param {Array} types - Place types array from API
 * @returns {string} Main category
 */
export function getPlaceCategory(types) {
  if (!types || types.length === 0) return 'Attraction';
  
  // Filter out generic types
  const displayTypes = types.filter(type => 
    !['point_of_interest', 'establishment', 'place'].includes(type)
  );
  
  if (displayTypes.length > 0) {
    // Convert to readable format
    return displayTypes[0]
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  return 'Attraction';
}
