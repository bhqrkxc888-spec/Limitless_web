/**
 * Google Places API Proxy
 * Handles CORS by proxying requests through serverless function
 * Returns tourist-focused attractions near cruise ports
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 8000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Places API key not configured' });
  }

  try {
    // Fetch multiple types of tourist attractions in parallel
    const searchTypes = ['tourist_attraction', 'museum', 'point_of_interest'];
    
    const searchPromises = searchTypes.map(async (type) => {
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      url.searchParams.set('location', `${lat},${lng}`);
      url.searchParams.set('radius', radius.toString());
      url.searchParams.set('type', type);
      url.searchParams.set('key', apiKey);
      
      const response = await fetch(url.toString());
      if (!response.ok) return [];
      
      const data = await response.json();
      if (data.status !== 'OK') return [];
      
      return data.results || [];
    });

    const allResults = await Promise.all(searchPromises);
    const combinedResults = allResults.flat();
    
    // Deduplicate by place_id
    const seenIds = new Set();
    const uniquePlaces = combinedResults.filter(place => {
      if (seenIds.has(place.place_id)) return false;
      seenIds.add(place.place_id);
      return true;
    });

    // Filter for quality and tourist relevance
    const touristTypes = [
      'tourist_attraction', 'museum', 'art_gallery', 'church', 'castle',
      'landmark', 'historical_landmark', 'monument', 'palace', 'temple',
      'aquarium', 'zoo', 'amusement_park', 'park', 'point_of_interest'
    ];
    
    const filteredPlaces = uniquePlaces.filter(place => {
      // Must have good rating
      if (place.rating < 4.0 || place.user_ratings_total < 50) return false;
      
      // Must have tourist-relevant type
      const placeTypes = place.types || [];
      const hasTouristType = placeTypes.some(t => touristTypes.includes(t));
      
      // Exclude non-tourist places
      const excludeTypes = ['lodging', 'restaurant', 'cafe', 'store', 'gas_station', 'car_dealer'];
      const hasExcludedType = placeTypes.some(t => excludeTypes.includes(t));
      
      return hasTouristType && !hasExcludedType;
    });

    // Sort by quality score (rating * log(reviews))
    const sortedPlaces = filteredPlaces.sort((a, b) => {
      const scoreA = a.rating * Math.log(a.user_ratings_total + 1);
      const scoreB = b.rating * Math.log(b.user_ratings_total + 1);
      return scoreB - scoreA;
    });

    // Format results for frontend
    const attractions = sortedPlaces.slice(0, 12).map(place => {
      // Clean up types for display
      const displayTypes = (place.types || [])
        .filter(t => touristTypes.includes(t))
        .slice(0, 3);
      
      return {
        id: place.place_id,
        name: place.name,
        rating: place.rating || 0,
        ratingCount: place.user_ratings_total || 0,
        address: place.vicinity || '',
        types: displayTypes,
        photo: place.photos?.[0]?.photo_reference || null
      };
    });

    // Set cache headers - cache for 6 hours (tourist data doesn't change often)
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    
    return res.status(200).json({ 
      results: attractions,
      status: 'OK',
      total: sortedPlaces.length
    });

  } catch (error) {
    console.error('Places API proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch places data' });
  }
}

