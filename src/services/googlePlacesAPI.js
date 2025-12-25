/**
 * Google Places API Service
 * Fetches port attractions via serverless proxy to avoid CORS issues
 */

/**
 * Get attractions near a port using the serverless proxy
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in meters (default 5000)
 * @returns {Promise<Array>} Array of formatted places
 */
export async function getPortAttractions(lat, lng, radius = 5000) {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString()
    });

    const response = await fetch(`/api/places?${params}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.results || [];
  } catch (error) {
    console.error('Error fetching port attractions:', error);
    return [];
  }
}

/**
 * Get photo URL from photo reference
 * Note: Photos also need to go through a proxy to avoid CORS
 */
export function getPhotoUrl(photoReference, maxWidth = 400) {
  if (!photoReference) return null;
  
  // Use Google's direct photo URL (works for display)
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY || ''}`;
}
