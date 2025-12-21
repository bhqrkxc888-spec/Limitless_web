/**
 * Admin Asset Upload API
 * Handles image uploads to Vercel Blob and stores metadata in Supabase
 */

import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key for admin operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration');
}

const supabase = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export const config = {
  api: {
    bodyParser: false, // Handle multipart form data
  },
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check authentication (simple session check)
    const session = req.cookies['admin_session'];
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse form data
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Must be multipart/form-data' });
    }

    // Get the file from the request
    // Note: In Vercel, we need to handle the multipart data differently
    // For now, we'll use the blob upload directly from the client

    const { assetType, entityKey, file, fileName, fileType, metadata } = req.body;

    if (!assetType || !file || !fileName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build the path for Vercel Blob
    let blobPath = '';
    if (assetType.startsWith('site_')) {
      blobPath = `site/${fileName}`;
    } else if (assetType.startsWith('destination_')) {
      blobPath = `destinations/${entityKey}-${fileName}`;
    } else if (assetType.startsWith('cruise_line_')) {
      blobPath = `cruise-lines/${entityKey}-${fileName}`;
    } else if (assetType.startsWith('ship_')) {
      blobPath = `ships/${entityKey}-${fileName}`;
    }

    // Upload to Vercel Blob
    const blob = await put(blobPath, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: fileType,
    });

    // Store metadata in Supabase
    if (supabase) {
      const assetData = {
        asset_type: assetType,
        entity_key: entityKey || null,
        url: blob.url,
        width: metadata?.width || null,
        height: metadata?.height || null,
        bytes: metadata?.bytes || null,
        mime: fileType,
        has_alpha: metadata?.hasAlpha || null,
        updated_at: new Date().toISOString()
      };

      const { error: upsertError } = await supabase
        .from('site_assets')
        .upsert(assetData, {
          onConflict: 'asset_type,entity_key'
        });

      if (upsertError) {
        console.error('Error storing asset metadata:', upsertError);
        // Continue anyway - blob is uploaded
      }
    }

    return res.status(200).json({
      success: true,
      url: blob.url,
      path: blobPath
    });

  } catch (error) {
    console.error('Error uploading asset:', error);
    return res.status(500).json({ 
      error: 'Failed to upload asset',
      message: error.message 
    });
  }
}

