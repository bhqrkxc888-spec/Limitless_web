/**
 * API Endpoint: Upload Ship Guide from Markdown
 * 
 * Accepts a Markdown file and parses it into the ship_guides database.
 * POST /api/admin/upload-ship-markdown
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Parse Markdown content into ship guide data object
 */
function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const ship = {
    // Basic fields
    name: '',
    slug: '',
    cruise_line_slug: '',
    cruise_line_name: '',
    year_built: null,
    year_refurbished: null,
    
    // Specifications
    gross_tonnage: null,
    length_meters: null,
    beam_meters: null,
    passenger_capacity: null,
    crew_count: null,
    deck_count: null,
    speed_knots: null,
    
    // Content
    tagline: '',
    display_name: '',
    description: '',
    highlights: [],
    overview_content: {},
    
    // Sections (stored as JSONB)
    cabins: {},
    deck_plans: [],
    onboard: {},
    dining: {},
    entertainment: {},
    activities: {},
    family: {},
    kids: {},
    accessibility: {},
    wellness: {},
    faq: [],
    
    // Meta
    meta: {},
    status: 'draft',
    featured: false
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
      if (currentSection === 'Ship Overview' && descriptionLines.length > 0) {
        ship.description = descriptionLines.join('\n\n').trim();
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
      // Save previous subsection
      if (currentSubsection === 'Description' && descriptionLines.length > 0) {
        ship.description = descriptionLines.join('\n\n').trim();
      }
      
      currentSubsection = trimmed.slice(4).trim();
      currentItem = null;
      descriptionLines = [];
      continue;
    }

    // Subsubsection headers (#### )
    if (trimmed.startsWith('#### ')) {
      const subsubsection = trimmed.slice(5).trim();
      
      // Handle cabin categories
      if (currentSection === 'Cabins') {
        if (!ship.cabins.categories) ship.cabins.categories = [];
        // Save previous cabin category
        if (currentItem) {
          ship.cabins.categories.push(currentItem);
        }
        currentItem = {
          name: subsubsection,
          description: '',
          types: []
        };
      }
      continue;
    }

    // Parse based on current section
    switch (currentSection) {
      case 'Basic Information':
        if (trimmed.startsWith('- Slug:')) {
          ship.slug = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Cruise Line Slug:')) {
          ship.cruise_line_slug = trimmed.split(':')[1].trim();
        } else if (trimmed.startsWith('- Cruise Line Name:')) {
          ship.cruise_line_name = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Year Built:')) {
          const year = parseInt(trimmed.split(':')[1].trim());
          if (!isNaN(year)) ship.year_built = year;
        } else if (trimmed.startsWith('- Year Refurbished:')) {
          const year = parseInt(trimmed.split(':')[1].trim());
          if (!isNaN(year)) ship.year_refurbished = year;
        }
        break;

      case 'Ship Specifications':
        if (trimmed.startsWith('- Gross Tonnage:')) {
          ship.gross_tonnage = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Length')) {
          ship.length_meters = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Beam')) {
          ship.beam_meters = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Passenger Capacity:')) {
          ship.passenger_capacity = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Crew Count:')) {
          ship.crew_count = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Deck Count:')) {
          ship.deck_count = parseInt(trimmed.split(':')[1].trim()) || null;
        } else if (trimmed.startsWith('- Speed')) {
          ship.speed_knots = parseFloat(trimmed.split(':')[1].trim()) || null;
        }
        break;

      case 'Ship Overview':
        if (trimmed.startsWith('- Tagline:')) {
          ship.tagline = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Display Name:')) {
          ship.display_name = trimmed.split(':').slice(1).join(':').trim();
        } else if (currentSubsection === 'Description') {
          if (trimmed) {
            descriptionLines.push(trimmed);
          } else if (descriptionLines.length > 0) {
            descriptionLines.push('');
          }
        } else if (currentSubsection === 'Highlights') {
          if (trimmed.startsWith('- ')) {
            ship.highlights.push(trimmed.slice(2).trim());
          }
        }
        break;

      case 'Cabins':
        if (currentSubsection === 'Cabin Categories' && currentItem) {
          if (trimmed.startsWith('- Description:')) {
            currentItem.description = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Size:')) {
            if (!currentItem.types) currentItem.types = [];
            currentItem.size = trimmed.split(':')[1].trim();
          } else if (trimmed.startsWith('- Sleeps:')) {
            currentItem.sleeps = trimmed.split(':')[1].trim();
          } else if (trimmed.startsWith('- Features:')) {
            currentItem.features = trimmed.split(':')[1].trim();
          }
        } else if (currentSubsection === 'Cabin Tips') {
          if (trimmed) {
            ship.cabins.tips = (ship.cabins.tips || '') + trimmed + '\n';
          }
        }
        break;

      case 'Dining':
        if (currentSubsection === 'Dining Overview') {
          if (trimmed) {
            ship.dining.introduction = (ship.dining.introduction || '') + trimmed + '\n';
          }
        } else if (currentSubsection.includes('Restaurants')) {
          if (trimmed.match(/^\d+\.\s+\*\*/)) {
            if (currentItem) {
              if (!ship.dining.restaurants) ship.dining.restaurants = [];
              ship.dining.restaurants.push(currentItem);
            }
            const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
            currentItem = {
              name: nameMatch ? nameMatch[1] : '',
              cuisine: '',
              description: '',
              dressCode: '',
              cost: currentSubsection.includes('Specialty') ? 'Extra' : 'Included'
            };
          } else if (currentItem) {
            if (trimmed.startsWith('- Cuisine:')) {
              currentItem.cuisine = trimmed.split(':')[1].trim();
            } else if (trimmed.startsWith('- Description:')) {
              currentItem.description = trimmed.split(':').slice(1).join(':').trim();
            } else if (trimmed.startsWith('- Dress Code:')) {
              currentItem.dressCode = trimmed.split(':').slice(1).join(':').trim();
            } else if (trimmed.startsWith('- Cost:')) {
              currentItem.cost = trimmed.split(':').slice(1).join(':').trim();
            }
          }
        } else if (currentSubsection === 'Bars & Lounges') {
          if (trimmed.match(/^\d+\.\s+\*\*/)) {
            if (currentItem && currentItem.type === 'bar') {
              if (!ship.dining.bars) ship.dining.bars = [];
              ship.dining.bars.push(currentItem);
            }
            const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
            currentItem = {
              type: 'bar',
              name: nameMatch ? nameMatch[1] : '',
              description: ''
            };
          } else if (currentItem && currentItem.type === 'bar') {
            if (trimmed.startsWith('- Description:')) {
              currentItem.description = trimmed.split(':').slice(1).join(':').trim();
            }
          }
        } else if (currentSubsection === 'Room Service') {
          if (trimmed) {
            ship.dining.roomService = (ship.dining.roomService || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Dietary Requirements') {
          if (trimmed) {
            ship.dining.dietary = (ship.dining.dietary || '') + trimmed + '\n';
          }
        }
        break;

      case 'Entertainment':
        if (currentSubsection === 'Entertainment Overview') {
          if (trimmed) {
            ship.entertainment.introduction = (ship.entertainment.introduction || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Main Venues') {
          if (trimmed.match(/^\d+\.\s+\*\*/)) {
            if (currentItem && currentItem.venueType) {
              if (!ship.entertainment.venues) ship.entertainment.venues = [];
              ship.entertainment.venues.push(currentItem);
            }
            const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
            currentItem = {
              venueType: true,
              name: nameMatch ? nameMatch[1] : '',
              description: '',
              capacity: ''
            };
          } else if (currentItem && currentItem.venueType) {
            if (trimmed.startsWith('- Capacity:')) {
              currentItem.capacity = trimmed.split(':')[1].trim();
            } else if (trimmed.startsWith('- Description:')) {
              currentItem.description = trimmed.split(':').slice(1).join(':').trim();
            }
          }
        } else if (currentSubsection === 'Shows & Performances') {
          if (trimmed.startsWith('- ')) {
            if (!ship.entertainment.shows) ship.entertainment.shows = [];
            ship.entertainment.shows.push(trimmed.slice(2).trim());
          }
        } else if (currentSubsection === 'Live Music') {
          if (trimmed) {
            ship.entertainment.liveMusic = (ship.entertainment.liveMusic || '') + trimmed + '\n';
          }
        }
        break;

      case 'Activities & Amenities':
        if (currentSubsection === 'Pools & Water Features') {
          if (trimmed.match(/^\d+\.\s+\*\*/)) {
            if (currentItem && currentItem.poolType) {
              if (!ship.activities.pools) ship.activities.pools = [];
              ship.activities.pools.push(currentItem);
            }
            const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
            currentItem = {
              poolType: true,
              name: nameMatch ? nameMatch[1] : '',
              description: ''
            };
          } else if (currentItem && currentItem.poolType) {
            if (trimmed.startsWith('- Description:')) {
              currentItem.description = trimmed.split(':').slice(1).join(':').trim();
            }
          }
        } else if (currentSubsection === 'Sports & Fitness') {
          if (trimmed.startsWith('- ')) {
            if (!ship.activities.sports) ship.activities.sports = [];
            ship.activities.sports.push(trimmed.slice(2).trim());
          }
        } else if (currentSubsection === 'Enrichment & Learning') {
          if (trimmed.startsWith('- ')) {
            if (!ship.activities.enrichment) ship.activities.enrichment = [];
            ship.activities.enrichment.push(trimmed.slice(2).trim());
          }
        }
        break;

      case 'Family Facilities':
        if (currentSubsection === 'Family Overview') {
          if (trimmed) {
            ship.family.introduction = (ship.family.introduction || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Kids Clubs') {
          if (trimmed.match(/^\d+\.\s+\*\*/)) {
            if (currentItem && currentItem.clubType) {
              if (!ship.kids.clubs) ship.kids.clubs = [];
              ship.kids.clubs.push(currentItem);
            }
            const nameMatch = trimmed.match(/\*\*(.+?)\*\*/);
            currentItem = {
              clubType: true,
              name: nameMatch ? nameMatch[1] : '',
              ages: '',
              description: '',
              hours: ''
            };
          } else if (currentItem && currentItem.clubType) {
            if (trimmed.startsWith('- Ages:')) {
              currentItem.ages = trimmed.split(':')[1].trim();
            } else if (trimmed.startsWith('- Description:')) {
              currentItem.description = trimmed.split(':').slice(1).join(':').trim();
            } else if (trimmed.startsWith('- Hours:')) {
              currentItem.hours = trimmed.split(':').slice(1).join(':').trim();
            }
          }
        } else if (currentSubsection === 'Teen Zone') {
          if (!ship.kids.teenZone) ship.kids.teenZone = {};
          if (trimmed.startsWith('- Ages:')) {
            ship.kids.teenZone.ages = trimmed.split(':')[1].trim();
          } else if (trimmed.startsWith('- Description:')) {
            ship.kids.teenZone.description = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Features:')) {
            ship.kids.teenZone.features = trimmed.split(':')[1].trim();
          }
        } else if (currentSubsection === 'Family Highlights') {
          if (trimmed.startsWith('- ')) {
            if (!ship.family.highlights) ship.family.highlights = [];
            ship.family.highlights.push(trimmed.slice(2).trim());
          }
        } else if (currentSubsection === 'Babysitting') {
          if (trimmed) {
            ship.kids.babysitting = (ship.kids.babysitting || '') + trimmed + '\n';
          }
        }
        break;

      case 'Spa & Wellness':
        if (currentSubsection === 'Spa Overview') {
          if (trimmed) {
            ship.wellness.introduction = (ship.wellness.introduction || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Spa Facilities') {
          if (trimmed.startsWith('- ')) {
            if (!ship.wellness.spa) ship.wellness.spa = { facilities: [] };
            if (!ship.wellness.spa.facilities) ship.wellness.spa.facilities = [];
            ship.wellness.spa.facilities.push(trimmed.slice(2).trim());
          }
        } else if (currentSubsection === 'Treatments') {
          if (trimmed.startsWith('- ')) {
            if (!ship.wellness.spa) ship.wellness.spa = {};
            if (!ship.wellness.spa.treatments) ship.wellness.spa.treatments = [];
            ship.wellness.spa.treatments.push(trimmed.slice(2).trim());
          }
        } else if (currentSubsection === 'Gym') {
          if (!ship.wellness.gym) ship.wellness.gym = {};
          if (trimmed.startsWith('- Description:')) {
            ship.wellness.gym.description = trimmed.split(':').slice(1).join(':').trim();
          } else if (trimmed.startsWith('- Classes:')) {
            ship.wellness.gym.classes = trimmed.split(':')[1].trim();
          } else if (trimmed.startsWith('- Hours:')) {
            ship.wellness.gym.hours = trimmed.split(':')[1].trim();
          }
        } else if (currentSubsection === 'Salon') {
          if (trimmed) {
            ship.wellness.salon = (ship.wellness.salon || '') + trimmed + '\n';
          }
        }
        break;

      case 'Accessibility':
        if (currentSubsection === 'Accessibility Overview') {
          if (trimmed) {
            ship.accessibility.introduction = (ship.accessibility.introduction || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Accessible Cabins') {
          if (trimmed) {
            ship.accessibility.cabins = (ship.accessibility.cabins || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Mobility') {
          if (trimmed) {
            ship.accessibility.mobility = (ship.accessibility.mobility || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Visual Impairments') {
          if (trimmed) {
            ship.accessibility.visual = (ship.accessibility.visual || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Hearing Impairments') {
          if (trimmed) {
            ship.accessibility.hearing = (ship.accessibility.hearing || '') + trimmed + '\n';
          }
        } else if (currentSubsection === 'Contact') {
          if (trimmed) {
            ship.accessibility.contact = (ship.accessibility.contact || '') + trimmed + '\n';
          }
        }
        break;

      case 'Deck Plans':
        if (trimmed.match(/^\d+\.\s+\*\*Deck/)) {
          if (currentItem && currentItem.deckType) {
            ship.deck_plans.push(currentItem);
          }
          const numberMatch = trimmed.match(/Deck\s+(\d+)/);
          const nameMatch = trimmed.match(/\*\*.*?-\s*(.+?)\*\*/);
          currentItem = {
            deckType: true,
            number: numberMatch ? parseInt(numberMatch[1]) : null,
            name: nameMatch ? nameMatch[1] : '',
            highlights: []
          };
        } else if (currentItem && currentItem.deckType && trimmed.startsWith('- Highlights:')) {
          currentItem.highlights = trimmed.split(':')[1].trim().split(',').map(h => h.trim());
        }
        break;

      case 'Frequently Asked Questions':
        if (trimmed.startsWith('**Q:')) {
          if (currentItem && currentItem.faqType) {
            ship.faq.push({ question: currentItem.question, answer: currentItem.answer.trim() });
          }
          currentItem = {
            faqType: true,
            question: trimmed.replace('**Q:', '').replace('**', '').trim(),
            answer: ''
          };
        } else if (trimmed.startsWith('A:') && currentItem && currentItem.faqType) {
          currentItem.answer = trimmed.replace('A:', '').trim();
        } else if (currentItem && currentItem.faqType && trimmed) {
          currentItem.answer += ' ' + trimmed;
        }
        break;

      case 'SEO Metadata':
        if (!ship.meta) ship.meta = {};
        if (trimmed.startsWith('- Title:')) {
          ship.meta.title = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Description:')) {
          ship.meta.description = trimmed.split(':').slice(1).join(':').trim();
        } else if (trimmed.startsWith('- Keywords:')) {
          ship.meta.keywords = trimmed.split(':')[1].trim().split(',').map(k => k.trim());
        }
        break;
    }
  }

  // Handle the first line (# Ship Name)
  if (!ship.name && lines[0]?.startsWith('# ')) {
    ship.name = lines[0].slice(2).trim();
  }
  if (!ship.display_name) {
    ship.display_name = ship.cruise_line_name ? `${ship.cruise_line_name} ${ship.name}` : ship.name;
  }

  // Push any remaining items
  if (currentItem) {
    if (currentSection === 'Cabins' && currentItem.name) {
      if (!ship.cabins.categories) ship.cabins.categories = [];
      ship.cabins.categories.push(currentItem);
    }
    if (currentSection === 'Dining' && currentItem.name && !currentItem.type) {
      if (!ship.dining.restaurants) ship.dining.restaurants = [];
      ship.dining.restaurants.push(currentItem);
    }
    if (currentSection === 'Dining' && currentItem.type === 'bar') {
      if (!ship.dining.bars) ship.dining.bars = [];
      ship.dining.bars.push(currentItem);
    }
    if (currentSection === 'Entertainment' && currentItem.venueType) {
      if (!ship.entertainment.venues) ship.entertainment.venues = [];
      ship.entertainment.venues.push(currentItem);
    }
    if (currentSection === 'Activities & Amenities' && currentItem.poolType) {
      if (!ship.activities.pools) ship.activities.pools = [];
      ship.activities.pools.push(currentItem);
    }
    if (currentSection === 'Family Facilities' && currentItem.clubType) {
      if (!ship.kids.clubs) ship.kids.clubs = [];
      ship.kids.clubs.push(currentItem);
    }
    if (currentSection === 'Deck Plans' && currentItem.deckType) {
      ship.deck_plans.push(currentItem);
    }
    if (currentSection === 'Frequently Asked Questions' && currentItem.faqType) {
      ship.faq.push({ question: currentItem.question, answer: currentItem.answer.trim() });
    }
  }

  // Clean up text fields
  const cleanText = (obj) => {
    if (!obj) return obj;
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    });
    return obj;
  };

  ship.dining = cleanText(ship.dining);
  ship.entertainment = cleanText(ship.entertainment);
  ship.family = cleanText(ship.family);
  ship.kids = cleanText(ship.kids);
  ship.wellness = cleanText(ship.wellness);
  ship.accessibility = cleanText(ship.accessibility);
  ship.cabins = cleanText(ship.cabins);

  // Set meta defaults if not provided
  if (!ship.meta.title && ship.name) {
    ship.meta.title = `${ship.name} Ship Guide | Cabins, Dining, Entertainment`;
  }
  if (!ship.meta.description && ship.description) {
    ship.meta.description = ship.description.slice(0, 160);
  }

  return ship;
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
    const shipData = parseMarkdown(markdown);

    if (!shipData.slug) {
      return res.status(400).json({ 
        error: 'Could not parse slug from markdown. Ensure "- Slug: ship-slug" is in Basic Information section.' 
      });
    }

    if (!shipData.name) {
      return res.status(400).json({ 
        error: 'Could not parse ship name. Ensure first line is "# Ship Name"' 
      });
    }

    // Preview mode - return parsed data without saving
    if (action === 'preview') {
      return res.status(200).json({
        success: true,
        preview: true,
        ship: shipData
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
      .eq('slug', shipData.slug)
      .single();

    const isUpdate = !!existingShip;

    // Upsert the ship
    const { data, error } = await supabase
      .from('ship_guides')
      .upsert(shipData, { onConflict: 'slug' })
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
        cruise_line_name: data.cruise_line_name,
        status: data.status
      }
    });

  } catch (error) {
    console.error('Upload ship error:', error);
    return res.status(500).json({ error: error.message });
  }
}
