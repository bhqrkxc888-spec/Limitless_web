/**
 * Vercel Serverless Function - Google Places API Proxy
 * 
 * This function acts as a server-side proxy for Google Places API calls,
 * solving CORS issues and keeping the API key secure.
 * 
 * Endpoints:
 * - GET /api/places-proxy?action=search&lat=...&lon=...&query=...&type=...&radius=...
 * - GET /api/places-proxy?action=details&placeId=...
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variable (server-side only)
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error('Google Places API key not configured');
    return res.status(500).json({ 
      error: 'Places API not configured',
      message: 'Google Places API key is missing from server environment variables'
    });
  }

  const { action, ...params } = req.query;

  try {
    let url;
    let response;

    switch (action) {
      case 'search':
        // Nearby Search API
        const { lat, lon, query = '', type = 'tourist_attraction', radius = 5000 } = params;
        
        if (!lat || !lon) {
          return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        // Build URL with query parameter if provided
        const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        const searchParams = new URLSearchParams({
          location: `${lat},${lon}`,
          radius: radius.toString(),
          type: type,
          key: apiKey
        });

        // Add keyword if query is provided
        if (query) {
          searchParams.append('keyword', query);
        }

        url = `${baseUrl}?${searchParams.toString()}`;
        
        response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
        }

        const searchData = await response.json();
        
        // Handle API errors
        if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
          console.error('Google Places API error:', searchData.status, searchData.error_message);
          return res.status(400).json({
            error: 'Places API error',
            status: searchData.status,
            message: searchData.error_message || 'Unknown error'
          });
        }

        return res.status(200).json({
          status: 'OK',
          results: searchData.results || [],
          next_page_token: searchData.next_page_token || null
        });

      case 'details':
        // Place Details API
        const { placeId, fields = 'name,rating,formatted_address,formatted_phone_number,website,photos,opening_hours,geometry' } = params;
        
        if (!placeId) {
          return res.status(400).json({ error: 'Place ID is required' });
        }

        url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&key=${apiKey}`;
        
        response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
        }

        const detailsData = await response.json();
        
        if (detailsData.status !== 'OK') {
          console.error('Google Places API error:', detailsData.status, detailsData.error_message);
          return res.status(400).json({
            error: 'Places API error',
            status: detailsData.status,
            message: detailsData.error_message || 'Unknown error'
          });
        }

        return res.status(200).json({
          status: 'OK',
          result: detailsData.result
        });

      case 'photo':
        // Place Photo API - Proxy the image to avoid CORS and keep API key secure
        const { photo_reference, maxwidth = 400 } = params;
        
        if (!photo_reference) {
          return res.status(400).json({ error: 'Photo reference is required' });
        }

        url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${encodeURIComponent(photo_reference)}&key=${apiKey}`;
        
        try {
          const photoResponse = await fetch(url);
          
          if (!photoResponse.ok) {
            throw new Error(`Photo API error: ${photoResponse.status}`);
          }

          // Get the image data
          const imageBuffer = await photoResponse.arrayBuffer();
          const contentType = photoResponse.headers.get('content-type') || 'image/jpeg';

          // Set appropriate headers and return the image
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
          return res.status(200).send(Buffer.from(imageBuffer));
        } catch (error) {
          console.error('Error fetching photo:', error);
          return res.status(500).json({
            error: 'Failed to fetch photo',
            message: error.message
          });
        }

      default:
        return res.status(400).json({ error: 'Invalid action. Use "search", "details", or "photo"' });
    }
  } catch (error) {
    console.error('Places proxy error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

