/**
 * API Endpoint: Upload Ship Guide from JSON
 * 
 * Accepts a JSON file and saves it to the ship_guides database.
 * POST /api/admin/upload-ship
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Validate and transform ship data
 */
function validateAndTransform(data) {
  const errors = [];
  
  // Required fields
  if (!data.slug) errors.push('slug is required');
  if (!data.name) errors.push('name is required');
  if (!data.cruiseLineSlug) errors.push('cruiseLineSlug is required');
  if (!data.cruiseLineName) errors.push('cruiseLineName is required');
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  // Transform camelCase to snake_case for database
  const ship = {
    slug: data.slug,
    name: data.name,
    display_name: data.displayName || data.name,
    cruise_line_slug: data.cruiseLineSlug,
    cruise_line_name: data.cruiseLineName,
    
    // Specifications
    year_built: data.yearBuilt || null,
    year_refurbished: data.yearRefurbished || null,
    gross_tonnage: data.grossTonnage || null,
    length_meters: data.lengthMeters || null,
    beam_meters: data.beamMeters || null,
    passenger_capacity: data.passengerCapacity || null,
    crew_count: data.crewCount || null,
    deck_count: data.deckCount || null,
    speed_knots: data.speedKnots || null,
    
    // Images
    hero_image_url: data.heroImageUrl || null,
    card_image_url: data.cardImageUrl || null,
    gallery_images: data.galleryImages || [],
    
    // Overview
    tagline: data.tagline || '',
    description: data.description || '',
    highlights: data.highlights || [],
    overview_content: data.overviewContent || {},
    
    // Sections (all JSONB)
    cabins: data.cabins || {},
    deck_plans: data.deckPlans || [],
    onboard: data.onboard || {},
    dining: data.dining || {},
    entertainment: data.entertainment || {},
    activities: data.activities || {},
    family: data.family || {},
    kids: data.kids || {},
    accessibility: data.accessibility || {},
    wellness: data.wellness || {},
    faq: data.faq || [],
    
    // SEO
    meta_title: data.meta?.title || data.metaTitle || `${data.name} Ship Guide | Limitless Cruises`,
    meta_description: data.meta?.description || data.metaDescription || data.description?.slice(0, 160) || '',
    meta_keywords: data.meta?.keywords || data.metaKeywords || [],
    
    // Status
    status: data.status || 'draft',
    featured: data.featured || false
  };
  
  return { valid: true, ship };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: shipData, action = 'upsert' } = req.body;

    if (!shipData) {
      return res.status(400).json({ error: 'No ship data provided' });
    }

    // Validate and transform
    const result = validateAndTransform(shipData);
    
    if (!result.valid) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: result.errors 
      });
    }

    const ship = result.ship;

    // Preview mode - return transformed data without saving
    if (action === 'preview') {
      return res.status(200).json({
        success: true,
        preview: true,
        ship
      });
    }

    // Save to Supabase
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if ship exists
    const { data: existingShip } = await supabase
      .from('ship_guides')
      .select('id, name')
      .eq('slug', ship.slug)
      .single();

    const isUpdate = !!existingShip;

    // Upsert the ship
    const { data, error } = await supabase
      .from('ship_guides')
      .upsert(ship, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      action: isUpdate ? 'updated' : 'created',
      ship: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        cruiseLine: data.cruise_line_name,
        status: data.status
      }
    });

  } catch (error) {
    console.error('Upload ship error:', error);
    return res.status(500).json({ error: error.message });
  }
}
