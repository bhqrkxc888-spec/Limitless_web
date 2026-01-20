/**
 * API Endpoint: Upload Cruise Guide from Markdown
 * 
 * Accepts a Markdown file and parses it into the cruise_guides database.
 * POST /api/admin/upload-guide-markdown
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Parse Markdown content into cruise guide data object
 */
function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const guide = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    guide_type: 'general',
    category: '',
    cruise_line_slug: '',
    destination_slug: '',
    tags: [],
    featured: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    status: 'draft',
    view_count: 0,
    organisation_id: 'bae24ccd-1485-4101-8630-fc114f12abf0' // Canonical org ID
  };

  let currentSection = '';
  let contentLines = [];
  let inMainContent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Get the title from first heading
    if (line.startsWith('# ') && !guide.title) {
      guide.title = line.slice(2).trim();
      continue;
    }

    // Main section headers (## )
    if (trimmed.startsWith('## ')) {
      // If we were capturing main content, save it
      if (inMainContent && contentLines.length > 0) {
        guide.content = contentLines.join('\n').trim();
        contentLines = [];
        inMainContent = false;
      }

      currentSection = trimmed.slice(3).trim();
      
      if (currentSection === 'Main Content') {
        inMainContent = true;
      }
      continue;
    }

    // If we're in main content section, capture everything
    if (inMainContent) {
      // Stop at the next major section
      if (trimmed.startsWith('## Images') || trimmed.startsWith('## SEO') || trimmed.startsWith('## Checklist')) {
        guide.content = contentLines.join('\n').trim();
        contentLines = [];
        inMainContent = false;
        currentSection = trimmed.slice(3).trim();
      } else {
        contentLines.push(line);
      }
      continue;
    }

    // Parse based on current section
    switch (currentSection) {
      case 'Basic Information':
        if (trimmed.startsWith('- Slug:')) {
          guide.slug = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Guide Type:')) {
          const type = trimmed.split(':')[1].trim().toLowerCase().replace(/\s+/g, '_');
          guide.guide_type = type || 'general';
        } else if (trimmed.startsWith('- Category:')) {
          guide.category = trimmed.split(':')[1].trim().toLowerCase().replace(/\s+/g, '-');
        } else if (trimmed.startsWith('- Cruise Line Slug:')) {
          const cruiseLine = trimmed.split(':')[1].trim();
          if (cruiseLine && cruiseLine !== 'optional' && !cruiseLine.includes('[')) {
            guide.cruise_line_slug = cruiseLine;
          }
        } else if (trimmed.startsWith('- Destination Slug:')) {
          const destination = trimmed.split(':')[1].trim();
          if (destination && destination !== 'optional' && !destination.includes('[')) {
            guide.destination_slug = destination;
          }
        }
        break;

      case 'Overview':
        if (trimmed.startsWith('- Excerpt:')) {
          guide.excerpt = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Featured:')) {
          guide.featured = trimmed.split(':')[1].trim().toLowerCase() === 'true';
        } else if (trimmed.startsWith('- Tags:')) {
          const tagsStr = trimmed.split(':')[1].trim();
          guide.tags = tagsStr.split(',').map(t => t.trim()).filter(t => t && !t.includes('['));
        }
        break;

      case 'SEO Metadata':
        if (trimmed.startsWith('- Meta Title:')) {
          guide.meta_title = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Meta Description:')) {
          guide.meta_description = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Keywords:')) {
          const keywordsStr = trimmed.split(':')[1].trim();
          guide.meta_keywords = keywordsStr.split(',').map(k => k.trim()).filter(k => k && !k.includes('['));
        }
        break;
    }
  }

  // If content wasn't captured yet (maybe no ## Main Content header)
  if (!guide.content && contentLines.length > 0) {
    guide.content = contentLines.join('\n').trim();
  }

  // If no content found, try to extract everything between Basic Information/Overview and Images/SEO
  if (!guide.content) {
    let capturing = false;
    let contentBuffer = [];
    
    for (const line of lines) {
      if (line.startsWith('## Main Content') || line.startsWith('### Introduction')) {
        capturing = true;
        continue;
      }
      if (capturing && (line.startsWith('## Images') || line.startsWith('## SEO') || line.startsWith('## Checklist'))) {
        break;
      }
      if (capturing) {
        contentBuffer.push(line);
      }
    }
    
    if (contentBuffer.length > 0) {
      guide.content = contentBuffer.join('\n').trim();
    }
  }

  // Set meta defaults if not provided
  if (!guide.meta_title && guide.title) {
    guide.meta_title = `${guide.title} | Limitless Cruises`;
  }
  if (!guide.meta_description && guide.excerpt) {
    guide.meta_description = guide.excerpt;
  }

  return guide;
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
    const { markdown, action = 'upsert' } = req.body;

    if (!markdown) {
      return res.status(400).json({ error: 'No markdown content provided' });
    }

    // Parse the markdown
    const guideData = parseMarkdown(markdown);

    if (!guideData.slug) {
      return res.status(400).json({ 
        error: 'Could not parse slug from markdown. Ensure "- Slug: guide-slug" is in Basic Information section.' 
      });
    }

    if (!guideData.title) {
      return res.status(400).json({ 
        error: 'Could not parse title. Ensure first line is "# Guide Title"' 
      });
    }

    // Preview mode - return parsed data without saving
    if (action === 'preview') {
      return res.status(200).json({
        success: true,
        preview: true,
        guide: guideData
      });
    }

    // Save to Supabase
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if guide exists
    const { data: existingGuide } = await supabase
      .from('cruise_guides')
      .select('id, title')
      .eq('slug', guideData.slug)
      .single();

    const isUpdate = !!existingGuide;

    // Upsert the guide
    const { data, error } = await supabase
      .from('cruise_guides')
      .upsert(guideData, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      action: isUpdate ? 'updated' : 'created',
      guide: {
        id: data.id,
        slug: data.slug,
        title: data.title,
        guide_type: data.guide_type,
        category: data.category,
        status: data.status
      }
    });

  } catch (error) {
    console.error('Upload guide error:', error);
    return res.status(500).json({ error: error.message });
  }
}
