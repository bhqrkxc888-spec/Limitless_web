/**
 * Port Management API
 * 
 * Handles port CRUD operations and data migration
 * 
 * GET /api/admin/ports - List all ports
 * POST /api/admin/ports - Create/update port
 * POST /api/admin/ports?action=migrate - Migrate from JS files
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // GET - List all ports
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('ports')
        .select('id, slug, name, country, region, status, show_in_menu, is_complete, created_at, updated_at')
        .order('name');

      if (error) throw error;
      return res.status(200).json({ ports: data });
    }

    // POST - Create/update port or migrate
    if (req.method === 'POST') {
      const { action } = req.query;

      // Migration action
      if (action === 'migrate') {
        return await handleMigration(supabase, res);
      }

      // Create/update port
      const portData = req.body;
      
      if (!portData.slug || !portData.name) {
        return res.status(400).json({ error: 'slug and name are required' });
      }

      const { data, error } = await supabase
        .from('ports')
        .upsert(portData, { onConflict: 'slug' })
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ port: data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Port API error:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * Handle migration from JS files to Supabase
 */
async function handleMigration(supabase, res) {
  // Import port data dynamically
  // Note: In Vercel serverless, we can't import local files
  // So we'll need to send the data from the client
  
  return res.status(200).json({ 
    message: 'Migration endpoint ready. Send port data in request body.',
    instructions: 'POST array of port objects to migrate'
  });
}
