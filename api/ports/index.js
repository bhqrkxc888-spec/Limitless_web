/**
 * Ports List API
 * 
 * GET /api/ports - List all published ports (for menu/navigation)
 * 
 * Query params:
 * - menu=true: Only return ports marked for menu display
 * - region=xxx: Filter by region
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Cache for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { menu, region } = req.query;

  try {
    let query = supabase
      .from('ports')
      .select('id, slug, name, country, region, tagline, coordinates, show_in_menu, is_complete')
      .eq('status', 'published')
      .order('name');

    // Filter for menu items only
    if (menu === 'true') {
      query = query.eq('show_in_menu', true);
    }

    // Filter by region
    if (region) {
      query = query.eq('region', region);
    }

    const { data, error } = await query;

    if (error) throw error;

    return res.status(200).json({ ports: data });
  } catch (error) {
    console.error('Ports API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
