/**
 * API Endpoint: Upload Port from Markdown
 * 
 * Accepts a Markdown file and parses it into the ports database.
 * POST /api/admin/upload-port
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Parse Markdown content into port data object
 */
function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const port = {
    // Basic fields
    name: '',
    slug: '',
    country: '',
    region: '',
    coordinates: { lat: 0, lon: 0 },
    tagline: '',
    port_character: '',
    description: '',
    about_port: {},
    quick_facts: {},
    transport_connections: {},
    getting_around: {},
    must_see_sights: [],
    shore_excursions: [],
    nearest_beach: {},
    food_and_drink: [],
    insider_tips: [],
    weather: {},
    faq: [],
    practical_info: {},
    content_overview: {},
    content_stay_local: {},
    content_go_further: {},
    content_with_kids: {},
    content_accessibility: {},
    content_medical: {},
    content_food_drink: {},
    meta_title: '',
    meta_description: '',
    status: 'draft',
    show_in_menu: false,
    is_complete: false
  };

  let currentSection = '';
  let currentSubsection = '';
  let currentItem = null;
  let descriptionLines = [];
  let sectionContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Main section headers (## )
    if (trimmed.startsWith('## ')) {
      // Save previous section content
      if (currentSection === 'Description' && descriptionLines.length > 0) {
        port.description = descriptionLines.join('\n\n').trim();
      }
      if (currentSection === 'About Port' && sectionContent.length > 0) {
        port.about_port = { text: sectionContent.join('\n').trim() };
      }
      if (currentSection === 'Transport Connections' && sectionContent.length > 0) {
        port.transport_connections = { details: sectionContent.join('\n').trim() };
      }
      if (currentSection === 'Getting Around' && sectionContent.length > 0) {
        port.getting_around = { details: sectionContent.join('\n').trim() };
      }

      currentSection = trimmed.slice(3).trim();
      currentSubsection = '';
      currentItem = null;
      descriptionLines = [];
      sectionContent = [];
      continue;
    }

    // Subsection headers (### )
    if (trimmed.startsWith('### ')) {
      currentSubsection = trimmed.slice(4).trim();
      sectionContent = [];
      continue;
    }

    // Parse based on current section
    switch (currentSection) {
      case 'Port Name':
        // First line is the port name
        if (line.startsWith('# ')) {
          port.name = line.slice(2).trim();
          port.display_name = port.name;
        }
        break;

      case 'Basic Information':
        if (trimmed.startsWith('- Slug:')) {
          port.slug = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Country:')) {
          port.country = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Region:')) {
          port.region = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Coordinates:')) {
          const coords = trimmed.split(':')[1].trim().split(',');
          if (coords.length >= 2) {
            port.coordinates = {
              lat: parseFloat(coords[0].trim()) || 0,
              lon: parseFloat(coords[1].trim()) || 0
            };
          }
        } else if (trimmed.startsWith('- Tagline:')) {
          port.tagline = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Port Character:')) {
          port.port_character = trimmed.split(':')[1].trim();
        }
        break;

      case 'Description':
        if (trimmed) {
          descriptionLines.push(trimmed);
        } else if (descriptionLines.length > 0) {
          descriptionLines.push(''); // Preserve paragraph breaks
        }
        break;

      case 'About Port':
        if (trimmed) {
          sectionContent.push(trimmed);
        }
        break;

      case 'Quick Facts':
        if (trimmed.startsWith('- ')) {
          const parts = trimmed.slice(2).split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim().toLowerCase().replace(/\s+/g, '_');
            const value = parts.slice(1).join(':').trim();
            port.quick_facts[key] = value;
          }
        }
        break;

      case 'Transport Connections':
        if (trimmed) {
          sectionContent.push(trimmed);
        }
        break;

      case 'Getting Around':
        if (trimmed) {
          sectionContent.push(trimmed);
        }
        break;

      case 'Must-See Sights':
        if (trimmed.match(/^\d+\.\s+\*\*/)) {
          // Save previous item
          if (currentItem) {
            port.must_see_sights.push(currentItem);
          }
          // Parse: 1. **Sight Name** (category: landmark)
          const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
          const categoryMatch = trimmed.match(/\(category:\s*(.+?)\)/);
          currentItem = {
            name: nameMatch ? nameMatch[1] : '',
            category: categoryMatch ? categoryMatch[1] : '',
            description: '',
            duration: '',
            tips: '',
            highlights: [],
            goodFor: []
          };
        } else if (currentItem && trimmed.startsWith('- Description:')) {
          currentItem.description = trimmed.split(':').slice(1).join(':').trim();
        } else if (currentItem && trimmed.startsWith('- Duration:')) {
          currentItem.duration = trimmed.split(':')[1].trim();
        } else if (currentItem && trimmed.startsWith('- Tips:')) {
          currentItem.tips = trimmed.split(':').slice(1).join(':').trim();
        } else if (currentItem && trimmed.startsWith('- Highlights:')) {
          currentItem.highlights = trimmed.split(':')[1].trim().split(',').map(h => h.trim());
        } else if (currentItem && trimmed.startsWith('- Good For:')) {
          currentItem.goodFor = trimmed.split(':')[1].trim().split(',').map(g => g.trim());
        }
        break;

      case 'Shore Excursions':
        if (trimmed.match(/^\d+\.\s+\*\*/)) {
          if (currentItem) {
            port.shore_excursions.push(currentItem);
          }
          const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
          currentItem = {
            name: nameMatch ? nameMatch[1] : '',
            description: '',
            duration: '',
            bookWith: '',
            notes: ''
          };
        } else if (currentItem && trimmed.startsWith('- Description:')) {
          currentItem.description = trimmed.split(':').slice(1).join(':').trim();
        } else if (currentItem && trimmed.startsWith('- Duration:')) {
          currentItem.duration = trimmed.split(':')[1].trim();
        } else if (currentItem && trimmed.startsWith('- Book With:')) {
          currentItem.bookWith = trimmed.split(':').slice(1).join(':').trim();
        } else if (currentItem && trimmed.startsWith('- Notes:')) {
          currentItem.notes = trimmed.split(':').slice(1).join(':').trim();
        }
        break;

      case 'Nearest Beach':
        if (trimmed.startsWith('- Name:')) {
          port.nearest_beach.name = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Distance:')) {
          port.nearest_beach.distance = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Description:')) {
          port.nearest_beach.description = trimmed.split(':').slice(1).join(':').trim();
        }
        break;

      case 'Food & Drink':
        if (trimmed.match(/^\d+\.\s+\*\*/)) {
          if (currentItem) {
            port.food_and_drink.push(currentItem);
          }
          const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
          currentItem = {
            name: nameMatch ? nameMatch[1] : '',
            type: '',
            description: ''
          };
        } else if (currentItem && trimmed.startsWith('- Type:')) {
          currentItem.type = trimmed.split(':')[1].trim();
        } else if (currentItem && trimmed.startsWith('- Description:')) {
          currentItem.description = trimmed.split(':').slice(1).join(':').trim();
        }
        break;

      case 'Insider Tips':
        if (trimmed.startsWith('- ')) {
          port.insider_tips.push(trimmed.slice(2).trim());
        }
        break;

      case 'Weather':
        if (trimmed.startsWith('- Intro:')) {
          port.weather.intro = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Best Time:')) {
          port.weather.bestTime = trimmed.split(':').slice(1).join(':').trim();
        }
        break;

      case 'FAQ':
        if (trimmed.match(/^\d+\.\s+\*\*/)) {
          if (currentItem) {
            port.faq.push(currentItem);
          }
          const questionMatch = trimmed.match(/\*\*(.+?)\*\*/);
          currentItem = {
            question: questionMatch ? questionMatch[1] : '',
            answer: ''
          };
        } else if (currentItem && trimmed && !trimmed.startsWith('-')) {
          currentItem.answer = (currentItem.answer ? currentItem.answer + ' ' : '') + trimmed;
        }
        break;

      case 'Practical Information':
        if (trimmed.startsWith('- ')) {
          const parts = trimmed.slice(2).split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim().toLowerCase().replace(/\s+/g, '_');
            const value = parts.slice(1).join(':').trim();
            port.practical_info[key] = value;
          }
        }
        break;

      case 'Content Sections':
        // Handle subsections
        if (currentSubsection === 'Overview') {
          if (trimmed.startsWith('- Hook:')) {
            port.content_overview.hook = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Description:')) {
            port.content_overview.description = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Weather Seasonal:')) {
            port.content_overview.weatherSeasonal = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Port Info:')) {
            port.content_overview.portInfo = trimmed.split(':').slice(1).join(':').trim();
          }
        } else if (currentSubsection === 'Stay Local' && trimmed) {
          port.content_stay_local.text = (port.content_stay_local.text || '') + trimmed + '\n';
        } else if (currentSubsection === 'Go Further' && trimmed) {
          port.content_go_further.text = (port.content_go_further.text || '') + trimmed + '\n';
        } else if (currentSubsection === 'With Kids' && trimmed) {
          port.content_with_kids.text = (port.content_with_kids.text || '') + trimmed + '\n';
        } else if (currentSubsection.includes('Accessibility') && trimmed) {
          port.content_accessibility.text = (port.content_accessibility.text || '') + trimmed + '\n';
        } else if (currentSubsection.includes('Medical') && trimmed) {
          port.content_medical.text = (port.content_medical.text || '') + trimmed + '\n';
        } else if (currentSubsection.includes('Food & Drink') && trimmed) {
          port.content_food_drink.text = (port.content_food_drink.text || '') + trimmed + '\n';
        }
        break;

      case 'Meta':
        if (trimmed.startsWith('- Title:')) {
          port.meta_title = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Description:')) {
          port.meta_description = trimmed.split(':').slice(1).join(':').trim();
        }
        break;
    }
  }

  // Handle the first line (# Port Name)
  if (!port.name && lines[0]?.startsWith('# ')) {
    port.name = lines[0].slice(2).trim();
    port.display_name = port.name;
  }

  // Push any remaining items
  if (currentSection === 'Must-See Sights' && currentItem) {
    port.must_see_sights.push(currentItem);
  }
  if (currentSection === 'Shore Excursions' && currentItem) {
    port.shore_excursions.push(currentItem);
  }
  if (currentSection === 'Food & Drink' && currentItem) {
    port.food_and_drink.push(currentItem);
  }
  if (currentSection === 'FAQ' && currentItem) {
    port.faq.push(currentItem);
  }

  // Final cleanup
  if (currentSection === 'Description' && descriptionLines.length > 0) {
    port.description = descriptionLines.filter(l => l).join('\n\n').trim();
  }

  // Trim text fields
  if (port.content_stay_local.text) {
    port.content_stay_local.text = port.content_stay_local.text.trim();
  }
  if (port.content_go_further.text) {
    port.content_go_further.text = port.content_go_further.text.trim();
  }
  if (port.content_with_kids.text) {
    port.content_with_kids.text = port.content_with_kids.text.trim();
  }
  if (port.content_accessibility.text) {
    port.content_accessibility.text = port.content_accessibility.text.trim();
  }
  if (port.content_medical.text) {
    port.content_medical.text = port.content_medical.text.trim();
  }
  if (port.content_food_drink.text) {
    port.content_food_drink.text = port.content_food_drink.text.trim();
  }

  // Set meta defaults if not provided
  if (!port.meta_title && port.name) {
    port.meta_title = `${port.name} Cruise Port Guide | Limitless Cruises`;
  }
  if (!port.meta_description && port.description) {
    port.meta_description = port.description.slice(0, 160);
  }

  return port;
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
    const portData = parseMarkdown(markdown);

    if (!portData.slug) {
      return res.status(400).json({ 
        error: 'Could not parse slug from markdown. Ensure "- Slug: port-slug" is in Basic Information section.' 
      });
    }

    if (!portData.name) {
      return res.status(400).json({ 
        error: 'Could not parse port name. Ensure first line is "# Port Name"' 
      });
    }

    // Preview mode - return parsed data without saving
    if (action === 'preview') {
      return res.status(200).json({
        success: true,
        preview: true,
        port: portData
      });
    }

    // Save to Supabase
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if port exists
    const { data: existingPort } = await supabase
      .from('ports')
      .select('id, name')
      .eq('slug', portData.slug)
      .single();

    const isUpdate = !!existingPort;

    // Upsert the port
    const { data, error } = await supabase
      .from('ports')
      .upsert(portData, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      action: isUpdate ? 'updated' : 'created',
      port: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        region: data.region,
        country: data.country,
        status: data.status
      }
    });

  } catch (error) {
    console.error('Upload port error:', error);
    return res.status(500).json({ error: error.message });
  }
}
