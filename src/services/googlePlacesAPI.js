/**
 * Google Places API Service
 * Fetches port information and nearby attractions for cruise ports
 */

import { apiConfig } from '../config/apiConfig';

/**
 * Search for nearby attractions with specific type
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in meters
 * @param {string} type - Place type (e.g., 'tourist_attraction')
 * @returns {Promise<Array>} Array of places
 */
export async function searchNearbyAttractions(lat, lng, radius = 5000, type = 'tourist_attraction') {
  if (!apiConfig.googlePlaces.enabled) {
    console.warn('Google Places API not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: radius.toString(),
      type: type,
      key: apiConfig.googlePlaces.apiKey
    });

    const response = await fetch(
      `${apiConfig.googlePlaces.baseUrl}/nearbysearch/json?${params}`
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.status === 'ZERO_RESULTS') {
      return [];
    }
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.warn(`Google Places API returned status: ${data.status}`);
      return [];
    }

    return data.results || [];
  } catch (error) {
    console.error('Error fetching nearby attractions:', error);
    return [];
  }
}

/**
 * Get premium/luxury attractions near a port
 * Focuses on high-end experiences, fine dining, luxury shopping
 */
export async function getPremiumAttractions(lat, lng) {
  // Search for luxury hotels, fine dining, upscale shopping
  const [luxury, fineDining, shopping] = await Promise.all([
    searchNearbyAttractions(lat, lng, 5000, 'tourist_attraction'),
    searchNearbyAttractions(lat, lng, 3000, 'restaurant'),
    searchNearbyAttractions(lat, lng, 3000, 'shopping_mall')
  ]);

  // Combine and filter by rating (4.0+)
  const allPlaces = [...luxury, ...fineDining, ...shopping];
  
  // Filter for premium experiences (high ratings, more reviews)
  const premiumPlaces = allPlaces
    .filter(place => place.rating >= 4.0 && place.user_ratings_total >= 100)
    .sort((a, b) => {
      // Sort by rating first, then by number of reviews
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.user_ratings_total - a.user_ratings_total;
    })
    .slice(0, 5);

  return premiumPlaces;
}

/**
 * Get family-friendly/kids attractions near a port
 */
export async function getKidsAttractions(lat, lng) {
  const [parks, aquariums, zoos] = await Promise.all([
    searchNearbyAttractions(lat, lng, 5000, 'park'),
    searchNearbyAttractions(lat, lng, 8000, 'aquarium'),
    searchNearbyAttractions(lat, lng, 8000, 'zoo')
  ]);

  const allPlaces = [...parks, ...aquariums, ...zoos];
  
  // Filter and sort by rating
  const kidsPlaces = allPlaces
    .filter(place => place.rating >= 3.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return kidsPlaces;
}

/**
 * Get fun/entertainment attractions near a port
 */
export async function getFunAttractions(lat, lng) {
  const [attractions, entertainment, museums] = await Promise.all([
    searchNearbyAttractions(lat, lng, 5000, 'tourist_attraction'),
    searchNearbyAttractions(lat, lng, 5000, 'night_club'),
    searchNearbyAttractions(lat, lng, 5000, 'museum')
  ]);

  const allPlaces = [...attractions, ...entertainment, ...museums];
  
  // Filter and sort by rating and popularity
  const funPlaces = allPlaces
    .filter(place => place.rating >= 3.8 && place.user_ratings_total >= 50)
    .sort((a, b) => {
      // Prioritize high ratings with decent review counts
      const scoreA = a.rating * Math.log(a.user_ratings_total + 1);
      const scoreB = b.rating * Math.log(b.user_ratings_total + 1);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  return funPlaces;
}

/**
 * Get comprehensive port attractions (all categories)
 */
export async function getPortAttractions(lat, lng) {
  try {
    const [premium, kids, fun] = await Promise.all([
      getPremiumAttractions(lat, lng),
      getKidsAttractions(lat, lng),
      getFunAttractions(lat, lng)
    ]);

    return {
      premium: premium.slice(0, 3),
      kids: kids.slice(0, 3),
      fun: fun.slice(0, 3)
    };
  } catch (error) {
    console.error('Error fetching port attractions:', error);
    return {
      premium: [],
      kids: [],
      fun: []
    };
  }
}

/**
 * Get photo URL from place photo reference
 */
export function getPhotoUrl(photoReference, maxWidth = 400) {
  if (!apiConfig.googlePlaces.enabled || !photoReference) {
    return null;
  }

  return `${apiConfig.googlePlaces.baseUrl}/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiConfig.googlePlaces.apiKey}`;
}

/**
 * Format place for display
 */
export function formatPlace(place) {
  return {
    id: place.place_id,
    name: place.name,
    rating: place.rating || 0,
    ratingCount: place.user_ratings_total || 0,
    address: place.vicinity || place.formatted_address || '',
    photo: place.photos?.[0] ? getPhotoUrl(place.photos[0].photo_reference) : null,
    types: place.types || []
  };
}

