/**
 * Google Places API Proxy
 * Handles CORS by proxying requests through serverless function
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Places API key not configured' });
  }

  try {
    // Search for tourist attractions nearby
    const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    url.searchParams.set('location', `${lat},${lng}`);
    url.searchParams.set('radius', radius.toString());
    url.searchParams.set('type', 'tourist_attraction');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === 'ZERO_RESULTS') {
      return res.status(200).json({ results: [], status: 'OK' });
    }

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data.status, data.error_message);
      return res.status(500).json({ error: data.error_message || data.status });
    }

    // Filter and format results - prioritize by rating
    const attractions = (data.results || [])
      .filter(place => place.rating >= 3.5 && place.user_ratings_total >= 20)
      .sort((a, b) => {
        // Sort by rating * log(reviews) for balanced ranking
        const scoreA = a.rating * Math.log(a.user_ratings_total + 1);
        const scoreB = b.rating * Math.log(b.user_ratings_total + 1);
        return scoreB - scoreA;
      })
      .slice(0, 10)
      .map(place => ({
        id: place.place_id,
        name: place.name,
        rating: place.rating || 0,
        ratingCount: place.user_ratings_total || 0,
        address: place.vicinity || '',
        types: place.types || [],
        photo: place.photos?.[0]?.photo_reference || null
      }));

    // Set cache headers - cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return res.status(200).json({ 
      results: attractions,
      status: 'OK',
      total: data.results?.length || 0
    });

  } catch (error) {
    console.error('Places API proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch places data' });
  }
}

