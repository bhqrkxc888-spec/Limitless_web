/**
 * Check Destination Images
 * 
 * Analyzes destination images in the database to:
 * 1. Verify hero and card images are in correct locations
 * 2. Flag any duplicates
 * 3. Check for missing required images
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
let supabaseUrl, supabaseKey;
try {
  const envFile = readFileSync(join(__dirname, '../.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (key === 'VITE_SUPABASE_URL') supabaseUrl = value;
      if (key === 'VITE_SUPABASE_ANON_KEY') supabaseKey = value;
    }
  });
} catch (err) {
  // Fallback to process.env
  supabaseUrl = process.env.VITE_SUPABASE_URL;
  supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDestinationImages() {
  console.log('🔍 Checking destination images...\n');

  try {
    // Fetch all destination images
    const { data: images, error } = await supabase
      .from('site_images')
      .select('*')
      .eq('entity_type', 'destination')
      .order('entity_id', { ascending: true })
      .order('image_type', { ascending: true });

    if (error) {
      throw error;
    }

    if (!images || images.length === 0) {
      console.log('⚠️  No destination images found in database');
      return;
    }

    console.log(`Found ${images.length} destination image records\n`);

    // Group by destination
    const byDestination = {};
    const byPath = {};
    const duplicates = [];

    images.forEach(img => {
      const key = `${img.entity_id}`;
      if (!byDestination[key]) {
        byDestination[key] = [];
      }
      byDestination[key].push(img);

      // Check for duplicate paths
      const pathKey = `${img.bucket}/${img.path}`;
      if (byPath[pathKey]) {
        duplicates.push({
          path: pathKey,
          existing: byPath[pathKey],
          duplicate: img
        });
      } else {
        byPath[pathKey] = img;
      }
    });

    // Report duplicates
    if (duplicates.length > 0) {
      console.log('🚨 DUPLICATES FOUND:\n');
      duplicates.forEach(dup => {
        console.log(`  Path: ${dup.path}`);
        console.log(`    Existing: ${dup.existing.entity_id}/${dup.existing.image_type} (ID: ${dup.existing.id})`);
        console.log(`    Duplicate: ${dup.duplicate.entity_id}/${dup.duplicate.image_type} (ID: ${dup.duplicate.id})`);
        console.log('');
      });
    } else {
      console.log('✅ No duplicate paths found\n');
    }

    // Report by destination
    console.log('📊 Images by Destination:\n');
    const destinations = Object.keys(byDestination).sort();
    
    let totalHero = 0;
    let totalCard = 0;
    let missingHero = [];
    let missingCard = [];

    destinations.forEach(destSlug => {
      const destImages = byDestination[destSlug];
      const hasHero = destImages.some(img => img.image_type === 'hero');
      const hasCard = destImages.some(img => img.image_type === 'card');
      
      if (hasHero) totalHero++;
      else missingHero.push(destSlug);
      
      if (hasCard) totalCard++;
      else missingCard.push(destSlug);

      console.log(`  ${destSlug}:`);
      console.log(`    Hero: ${hasHero ? '✅' : '❌'} ${destImages.filter(img => img.image_type === 'hero').length} image(s)`);
      console.log(`    Card: ${hasCard ? '✅' : '❌'} ${destImages.filter(img => img.image_type === 'card').length} image(s)`);
      
      // List all image types
      const imageTypes = destImages.map(img => img.image_type).sort();
      const otherTypes = imageTypes.filter(t => t !== 'hero' && t !== 'card');
      if (otherTypes.length > 0) {
        console.log(`    Other: ${otherTypes.join(', ')}`);
      }
      
      // Show paths
      destImages.forEach(img => {
        const expectedPath = `${img.entity_id}/${img.image_type}.${img.format || 'webp'}`;
        const pathMatch = img.path === expectedPath ? '✅' : '⚠️';
        console.log(`      ${pathMatch} ${img.image_type}: ${img.path} (bucket: ${img.bucket})`);
      });
      console.log('');
    });

    // Summary
    console.log('📈 Summary:\n');
    console.log(`  Total destinations with images: ${destinations.length}`);
    console.log(`  Destinations with hero: ${totalHero} (missing: ${missingHero.length})`);
    console.log(`  Destinations with card: ${totalCard} (missing: ${missingCard.length})`);
    console.log(`  Total image records: ${images.length}`);
    console.log(`  Duplicate paths: ${duplicates.length}`);

    if (missingHero.length > 0) {
      console.log(`\n  ⚠️  Missing hero images: ${missingHero.join(', ')}`);
    }
    if (missingCard.length > 0) {
      console.log(`\n  ⚠️  Missing card images: ${missingCard.join(', ')}`);
    }

    // Check bucket consistency
    const buckets = [...new Set(images.map(img => img.bucket))];
    console.log(`\n  Buckets used: ${buckets.join(', ')}`);
    const expectedBucket = 'WEB_destinations';
    const wrongBucket = images.filter(img => img.bucket !== expectedBucket);
    if (wrongBucket.length > 0) {
      console.log(`\n  ⚠️  Images in wrong bucket (expected: ${expectedBucket}):`);
      wrongBucket.forEach(img => {
        console.log(`    ${img.entity_id}/${img.image_type}: ${img.bucket}`);
      });
    } else {
      console.log(`\n  ✅ All images in correct bucket: ${expectedBucket}`);
    }

  } catch (error) {
    console.error('❌ Error checking images:', error);
    process.exit(1);
  }
}

checkDestinationImages();

