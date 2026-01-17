/**
 * Cruise Search API Endpoint
 * Vercel Serverless Function
 * 
 * Calls Apify CruiseMapper scraper to search for cruises
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ship_name, start_date, end_date } = req.body;

  // Validate required fields
  if (!ship_name || !start_date || !end_date) {
    return res.status(400).json({ 
      error: 'Missing required fields: ship_name, start_date, end_date' 
    });
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
    return res.status(400).json({ 
      error: 'Invalid date format. Use YYYY-MM-DD' 
    });
  }

  // Get Apify API token from environment
  const apifyToken = process.env.APIFY_API_TOKEN;
  if (!apifyToken) {
    console.error('APIFY_API_TOKEN not configured');
    return res.status(500).json({ 
      error: 'Apify API token not configured' 
    });
  }

  try {
    // Call Apify CruiseMapper scraper
    const apifyUrl = `https://api.apify.com/v2/acts/vulnv~cruisemapper-cruises-scraper/run-sync-get-dataset-items?token=${apifyToken}`;
    
    console.log('Calling Apify with:', { ship_name, start_date, end_date });
    
    const apifyResponse = await fetch(apifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ship_name,
        start_date,
        end_date
      })
    });

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text();
      console.error('Apify API error:', errorText);
      return res.status(apifyResponse.status).json({ 
        error: `Apify API error: ${apifyResponse.statusText}`,
        details: errorText
      });
    }

    const cruises = await apifyResponse.json();
    
    console.log(`Found ${cruises?.length || 0} cruises`);

    return res.status(200).json({
      success: true,
      count: cruises?.length || 0,
      cruises: cruises || [],
      query: {
        ship_name,
        start_date,
        end_date
      }
    });

  } catch (error) {
    console.error('Cruise search error:', error);
    return res.status(500).json({ 
      error: 'Failed to search cruises',
      details: error.message 
    });
  }
}
