/**
 * Admin API: Port Guide Ratings
 * Fetches all ratings using service role (bypasses RLS)
 */

import { createClient } from '@supabase/supabase-js';

// Verify admin session
async function verifyAdminSession(req) {
  const cookies = req.headers.cookie || '';
  const sessionCookie = cookies.split(';').find(c => c.trim().startsWith('admin_session='));
  
  if (!sessionCookie) return false;
  
  const sessionToken = sessionCookie.split('=')[1];
  const expectedToken = process.env.ADMIN_SESSION_SECRET;
  
  return sessionToken === expectedToken;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify admin authentication
  const isAdmin = await verifyAdminSession(req);
  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Create Supabase client with service role key
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });

  try {
    if (req.method === 'GET') {
      // Fetch all ratings (bypasses RLS with service role)
      const { data, error } = await supabase
        .from('port_guide_ratings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json({ ratings: data || [] });
    }

    if (req.method === 'PUT') {
      // Update a rating (approve, feature, verify, etc.)
      const { id, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing rating id' });
      }

      // Add approved_at timestamp if approving
      if (updates.is_approved === true && !updates.approved_at) {
        updates.approved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('port_guide_ratings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ rating: data });
    }

    if (req.method === 'DELETE') {
      // Delete a rating
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing rating id' });
      }

      const { error } = await supabase
        .from('port_guide_ratings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Port ratings API error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}
