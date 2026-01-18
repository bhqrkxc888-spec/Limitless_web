#!/usr/bin/env node
/**
 * Migrate Existing Ports to Supabase
 * 
 * Reads current port data from static JS files and uploads to Supabase.
 * This is a one-time migration script.
 * 
 * Usage:
 *   node scripts/migrate-existing-ports.js
 *   node scripts/migrate-existing-ports.js --dry-run
 */

import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import of port data
async function loadPortData() {
  const portsModule = await import('../src/data/ports.js');
  const portContentModule = await import('../src/data/portContent.js');
  
  return {
    ports: portsModule.ports || portsModule.default?.ports || [],
    getPortContent: portContentModule.getPortContent || portContentModule.default?.getPortContent
  };
}

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:');
  console.error('   SUPABASE_URL or VITE_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Transform port data from current JS format to Supabase format
 */
function transformPort(port, content) {
  return {
    slug: port.slug,
    name: port.name,
    display_name: port.displayName || port.name,
    country: port.country || '',
    region: port.region || 'unknown',
    
    coordinates: {
      lat: port.coordinates?.lat || port.lat || 0,
      lon: port.coordinates?.lng || port.coordinates?.lon || port.lon || 0
    },
    
    tagline: port.tagline || '',
    description: port.description || '',
    port_character: port.portCharacter || '',
    
    // Structured data
    about_port: port.aboutPort || {},
    quick_facts: port.quickFacts || {},
    transport_connections: port.transportConnections || {},
    getting_around: port.gettingAround || {},
    must_see_sights: port.mustSeeSights || [],
    shore_excursions: port.shoreExcursions || [],
    nearest_beach: port.nearestBeach || {},
    food_and_drink: port.foodAndDrink || [],
    insider_tips: port.insiderTips || [],
    faq: port.faq || [],
    weather: port.weather || {},
    practical_info: port.practicalInfo || {},
    
    // Content sections (from portContent.js)
    content_overview: content?.overview || {},
    content_stay_local: content?.stayLocal || {},
    content_go_further: content?.goFurther || {},
    content_with_kids: content?.withKids || {},
    content_accessibility: content?.send || content?.accessibility || {},
    content_medical: content?.medical || {},
    content_food_drink: content?.foodAndDrink || {},
    content_practical: content?.practical || {},
    
    // Family friendly data
    family_friendly: port.familyFriendly || {},
    
    // SEO
    meta_title: port.meta?.title || `${port.name} Cruise Port Guide | Limitless Cruises`,
    meta_description: port.meta?.description || port.description || '',
    meta_keywords: port.meta?.keywords || [],
    
    // Status
    status: 'published',
    source_file: 'migrated-from-js'
  };
}

/**
 * Upload a single port to Supabase
 */
async function uploadPort(data, dryRun = false) {
  if (dryRun) {
    console.log(`🔍 [DRY RUN] Would upload: ${data.name} (${data.slug})`);
    console.log(`   Country: ${data.country}, Region: ${data.region}`);
    console.log(`   Coordinates: ${data.coordinates.lat}, ${data.coordinates.lon}`);
    console.log(`   Has overview: ${Object.keys(data.content_overview).length > 0}`);
    console.log(`   Has stayLocal: ${Object.keys(data.content_stay_local).length > 0}`);
    return true;
  }

  try {
    const { error } = await supabase
      .from('ports')
      .upsert(data, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Failed to upload ${data.name}:`, error.message);
      return false;
    }

    console.log(`✅ Uploaded: ${data.name} (${data.slug})`);
    return true;
  } catch (err) {
    console.error(`❌ Error uploading ${data.name}:`, err.message);
    return false;
  }
}

/**
 * Main migration function
 */
async function migrate(dryRun = false) {
  console.log('🌍 Port Migration Script');
  console.log('========================');
  if (dryRun) console.log('🔍 DRY RUN MODE - No changes will be made\n');

  try {
    const { ports, getPortContent } = await loadPortData();

    if (!ports || ports.length === 0) {
      console.log('📭 No ports found in src/data/ports.js');
      return;
    }

    console.log(`\n📊 Found ${ports.length} ports to migrate\n`);

    let success = 0;
    let failed = 0;

    for (const port of ports) {
      // Get detailed content if available
      let content = {};
      if (getPortContent && port.slug) {
        try {
          content = getPortContent(port.slug) || {};
        } catch (e) {
          // Content not available for this port
        }
      }

      const transformed = transformPort(port, content);
      const result = await uploadPort(transformed, dryRun);
      
      if (result) success++;
      else failed++;
    }

    console.log(`\n📊 Summary: ${success} uploaded, ${failed} failed`);
    
    if (!dryRun && success > 0) {
      console.log('\n✅ Migration complete!');
      console.log('   Ports are now available via Supabase');
      console.log('   Frontend can be updated to fetch from API');
    }

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.error(err.stack);
  }
}

// Run migration
const dryRun = process.argv.includes('--dry-run');
migrate(dryRun);
