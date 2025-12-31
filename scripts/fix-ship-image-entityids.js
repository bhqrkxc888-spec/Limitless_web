/**
 * Fix Ship Image EntityIds Script
 * 
 * Updates ship image entityIds in the database to match the new slug format.
 * This fixes images that were uploaded before the slug generation was standardized.
 * 
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/fix-ship-image-entityids.js
 * 
 * Or: npm run fix:ship-entityids
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ADMIN_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Simple slug generation (matches getShipSlug logic)
 */
function generateShipSlug(shipName) {
  if (!shipName) return '';
  return shipName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Load cruise lines data
 */
function loadCruiseLines() {
  try {
    const cruiseLinesPath = join(rootDir, 'src', 'data', 'cruiseLines.js');
    const content = readFileSync(cruiseLinesPath, 'utf-8');
    
    // Extract the cruiseLines array using regex
    const match = content.match(/export\s+(?:const|let)\s+cruiseLines\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error('Could not find cruiseLines export');
    }
    
    // Safely evaluate the array
    const cruiseLines = eval(match[1]);
    return cruiseLines;
  } catch (error) {
    console.error('Error loading cruise lines:', error);
    return [];
  }
}

/**
 * Fix ship image entityIds
 */
async function fixShipImageEntityIds() {
  console.log('🔍 Fetching all ship images from database...\n');

  const cruiseLines = loadCruiseLines();
  if (cruiseLines.length === 0) {
    console.error('❌ Could not load cruise lines data');
    process.exit(1);
  }

  // Get all ship images
  const { data: shipImages, error: fetchError } = await supabase
    .from('site_images')
    .select('id, entity_id, entity_type, image_type, path, bucket')
    .eq('entity_type', 'ship');

  if (fetchError) {
    console.error('❌ Error fetching ship images:', fetchError);
    process.exit(1);
  }

  if (!shipImages || shipImages.length === 0) {
    console.log('✅ No ship images found in database.');
    return;
  }

  console.log(`📦 Found ${shipImages.length} ship image(s) to check.\n`);

  let fixed = 0;
  let skipped = 0;
  let errors = 0;

  for (const image of shipImages) {
    const entityId = image.entity_id;
    
    // Extract cruise line slug and ship slug
    const parts = entityId.split('/ships/');
    if (parts.length !== 2) {
      console.log(`⚠️  Skipping invalid entityId format: ${entityId}`);
      skipped++;
      continue;
    }

    const [cruiseLineSlug, oldShipSlug] = parts;
    
    // Find the cruise line
    const cruiseLine = cruiseLines.find(cl => cl.slug === cruiseLineSlug);
    if (!cruiseLine) {
      console.log(`⚠️  Cruise line not found for slug: ${cruiseLineSlug}`);
      skipped++;
      continue;
    }

    // Find the ship by matching the old slug
    const shipList = cruiseLine.fleet || (cruiseLine.ships ? cruiseLine.ships.map(name => ({ name })) : []);
    let shipName = null;
    
    for (const ship of shipList) {
      const shipObj = typeof ship === 'string' ? { name: ship } : ship;
      // Check if old slug matches this ship (try both old and new slug generation)
      const newSlug = generateShipSlug(shipObj.name);
      const oldSlugSimple = shipObj.name.toLowerCase().replace(/\s+/g, '-');
      
      if (oldShipSlug === newSlug || oldShipSlug === oldSlugSimple || oldShipSlug === (shipObj.slug || '')) {
        shipName = shipObj.name;
        break;
      }
    }

    if (!shipName) {
      console.log(`⚠️  Could not match ship for slug: ${oldShipSlug} in ${cruiseLineSlug}`);
      skipped++;
      continue;
    }

    // Generate correct slug using new function
    const correctShipSlug = generateShipSlug(shipName);
    const correctEntityId = `${cruiseLineSlug}/ships/${correctShipSlug}`;

    // Check if entityId needs fixing
    if (entityId === correctEntityId) {
      console.log(`✅ ${shipName} (${cruiseLineSlug}) - Already correct: ${entityId}`);
      skipped++;
      continue;
    }

    // Update the entityId
    console.log(`🔧 Fixing ${shipName} (${cruiseLineSlug}):`);
    console.log(`   Old: ${entityId}`);
    console.log(`   New: ${correctEntityId}`);

    const { error: updateError } = await supabase
      .from('site_images')
      .update({ entity_id: correctEntityId })
      .eq('id', image.id);

    if (updateError) {
      console.error(`   ❌ Error updating: ${updateError.message}`);
      errors++;
    } else {
      console.log(`   ✅ Updated successfully\n`);
      fixed++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Fixed: ${fixed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📦 Total: ${shipImages.length}\n`);

  if (fixed > 0) {
    console.log('✨ Ship image entityIds have been fixed!');
  } else {
    console.log('✨ No fixes needed - all entityIds are correct.');
  }
}

// Run the fix
fixShipImageEntityIds()
  .then(() => {
    console.log('\n✅ Script completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
