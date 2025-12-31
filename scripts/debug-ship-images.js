/**
 * Debug Ship Images Script
 * Check what entityIds are stored in the database for ship images
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ADMIN_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugShipImages() {
  console.log('🔍 Checking ship images in database...\n');

  // Get all ship images
  const { data: shipImages, error } = await supabase
    .from('site_images')
    .select('id, entity_id, entity_type, image_type, path, bucket, alt_text')
    .eq('entity_type', 'ship')
    .order('entity_id');

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  if (!shipImages || shipImages.length === 0) {
    console.log('❌ No ship images found in database.');
    return;
  }

  console.log(`📦 Found ${shipImages.length} ship image(s):\n`);

  shipImages.forEach((img, index) => {
    console.log(`${index + 1}. EntityId: ${img.entity_id}`);
    console.log(`   Type: ${img.image_type}`);
    console.log(`   Path: ${img.path}`);
    console.log(`   Alt: ${img.alt_text || 'N/A'}`);
    console.log('');
  });

  // Group by entityId
  const grouped = {};
  shipImages.forEach(img => {
    if (!grouped[img.entity_id]) {
      grouped[img.entity_id] = [];
    }
    grouped[img.entity_id].push(img);
  });

  console.log('\n📊 Grouped by EntityId:');
  Object.keys(grouped).sort().forEach(entityId => {
    console.log(`\n${entityId}:`);
    grouped[entityId].forEach(img => {
      console.log(`  - ${img.image_type}: ${img.path}`);
    });
  });
}

debugShipImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
