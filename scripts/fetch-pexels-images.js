#!/usr/bin/env node
/**
 * Pexels Image Fetcher for Port Guides
 * 
 * Fetches images from Pexels API and uploads to Supabase Storage
 * with proper attribution tracking.
 * 
 * Usage:
 *   node scripts/fetch-pexels-images.js --port=barcelona
 *   node scripts/fetch-pexels-images.js --port=barcelona --section=stay-local
 *   node scripts/fetch-pexels-images.js --port=all --dry-run
 * 
 * Environment Variables Required:
 *   PEXELS_API_KEY - Your Pexels API key
 *   SUPABASE_URL or VITE_SUPABASE_URL - Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (for storage upload)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: resolve(__dirname, '../.env.local') });
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { parseArgs } from 'util';

// ============================================================================
// CONFIGURATION
// ============================================================================

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://xrbusklskmeaamwynfmm.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET_NAME = 'WEB_port-guides';
const IMAGES_PER_SECTION = 3;
const RATE_LIMIT_DELAY_MS = 2000; // 2 seconds between requests (safe for 200/hour)

const SECTIONS = ['overview', 'stay-local', 'go-further', 'with-kids'];

// ============================================================================
// SUPABASE CLIENT
// ============================================================================

let supabase;

function initSupabase() {
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  }
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  });
  return supabase;
}

// ============================================================================
// PEXELS API
// ============================================================================

async function searchPexels(query, perPage = 5) {
  if (!PEXELS_API_KEY) {
    throw new Error('PEXELS_API_KEY environment variable is required');
  }

  // Enhance query to focus on destinations, not people
  const enhancedQuery = `${query} landscape architecture scenery -people -portrait -crowd`;

  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', enhancedQuery);
  url.searchParams.set('per_page', perPage.toString());
  url.searchParams.set('orientation', 'landscape');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': PEXELS_API_KEY
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pexels API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.photos || [];
}

// ============================================================================
// IMAGE PROCESSING
// ============================================================================

async function downloadAndConvertImage(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = await response.buffer();
  
  // Convert to WebP, resize to 600x400
  const webpBuffer = await sharp(buffer)
    .resize(600, 400, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toBuffer();

  return webpBuffer;
}

// ============================================================================
// SUPABASE STORAGE
// ============================================================================

async function uploadToStorage(buffer, path) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, buffer, {
      contentType: 'image/webp',
      upsert: false // Don't overwrite existing
    });

  if (error) {
    if (error.message?.includes('already exists')) {
      console.log(`  ⏭️  Skipping (already exists): ${path}`);
      return null;
    }
    throw error;
  }

  return data;
}

async function createImageMetadata(portSlug, section, pexelsPhoto, storagePath, searchQuery) {
  const { data, error } = await supabase
    .from('site_images')
    .insert({
      bucket: BUCKET_NAME,
      path: storagePath,
      entity_type: 'port-guide',
      entity_id: portSlug,
      image_type: section,
      alt_text: pexelsPhoto.alt || `${portSlug} ${section} image`,
      width: 600,
      height: 400,
      format: 'webp',
      source: 'pexels',
      photographer_name: pexelsPhoto.photographer,
      photographer_url: pexelsPhoto.photographer_url,
      search_query: searchQuery,
      external_id: pexelsPhoto.id.toString(),
      seo_compliant: true
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      console.log(`  ⏭️  Metadata already exists for: ${storagePath}`);
      return null;
    }
    throw error;
  }

  return data;
}

// ============================================================================
// SEARCH QUERY GENERATION
// ============================================================================

async function getPortData(portSlug) {
  const { data, error } = await supabase
    .from('ports')
    .select('*')
    .eq('slug', portSlug)
    .single();

  if (error) {
    throw new Error(`Port not found: ${portSlug}`);
  }

  return data;
}

function generateSearchQueries(port, section) {
  const portName = port.name || port.display_name;
  const country = port.country;
  const mustSeeSights = port.must_see_sights || [];

  switch (section) {
    case 'overview':
      // Focus on harbour, aerial, architecture - no people
      return [
        `${portName} harbour marina boats`,
        `${portName} aerial view cityscape`,
        `${portName} skyline architecture`
      ];

    case 'stay-local':
      // Extract local/walking attractions - focus on architecture/streets
      const localSights = mustSeeSights
        .filter(s => {
          const cat = (s.category || '').toLowerCase();
          return cat.includes('historic') || cat.includes('market') || cat.includes('walk');
        })
        .slice(0, 3);
      
      if (localSights.length > 0) {
        return localSights.map(s => `${s.name || s.title} architecture building`);
      }
      return [
        `${portName} old town cobblestone street`,
        `${portName} market stalls food`,
        `${portName} historic buildings architecture`
      ];

    case 'go-further':
      // Extract day trip attractions - focus on landscapes/monuments
      const dayTrips = mustSeeSights
        .filter(s => {
          const cat = (s.category || '').toLowerCase();
          return cat.includes('nature') || cat.includes('landmark') || cat.includes('attraction');
        })
        .slice(0, 3);
      
      if (dayTrips.length > 0) {
        return dayTrips.map(s => `${s.name || s.title} landmark monument`);
      }
      return [
        `${portName} scenic landscape nature`,
        `${country} mountain valley vista`,
        `${country} famous monument landmark`
      ];

    case 'with-kids':
      // Extract family-friendly attractions - focus on beaches/parks, not people
      const familySights = mustSeeSights
        .filter(s => {
          const cat = (s.category || '').toLowerCase();
          const name = (s.name || s.title || '').toLowerCase();
          return cat.includes('beach') || cat.includes('park') || 
                 name.includes('zoo') || name.includes('aquarium') || name.includes('park');
        })
        .slice(0, 3);
      
      if (familySights.length > 0) {
        return familySights.map(s => `${s.name || s.title} scenery`);
      }
      return [
        `${portName} beach sand sea turquoise`,
        `${portName} park gardens nature`,
        `${portName} playground equipment`
      ];

    default:
      return [`${portName} ${country}`];
  }
}

// ============================================================================
// CHECK EXISTING IMAGES
// ============================================================================

async function checkExistingImages(portSlug, section) {
  const { data, error } = await supabase
    .from('site_images')
    .select('id, external_id, source')
    .eq('entity_type', 'port-guide')
    .eq('entity_id', portSlug)
    .like('image_type', `${section}%`);

  if (error) {
    console.error('Error checking existing images:', error);
    return { manual: [], pexels: [] };
  }

  const images = data || [];
  return {
    manual: images.filter(img => img.source === 'manual' || !img.source),
    pexels: images.filter(img => img.source === 'pexels')
  };
}

async function checkPexelsImageExists(externalId) {
  const { data } = await supabase
    .from('site_images')
    .select('id')
    .eq('external_id', externalId.toString())
    .eq('source', 'pexels')
    .single();

  return !!data;
}

// ============================================================================
// MAIN PROCESSING
// ============================================================================

async function processSection(port, section, dryRun = false) {
  const portSlug = port.slug;
  console.log(`\n📁 Processing ${section} for ${port.name}...`);

  // Check existing images (manual and pexels separately)
  const existing = await checkExistingImages(portSlug, section);
  const manualCount = existing.manual.length;
  const pexelsCount = existing.pexels.length;
  const totalCount = manualCount + pexelsCount;
  
  // Calculate how many more images needed (manual images count first)
  const neededCount = IMAGES_PER_SECTION - totalCount;

  console.log(`  📊 Manual: ${manualCount} | Pexels: ${pexelsCount} | Total: ${totalCount}`);

  if (neededCount <= 0) {
    console.log(`  ✓ Already has ${totalCount} images (${manualCount} manual, ${pexelsCount} pexels), skipping`);
    return { fetched: 0, uploaded: 0, skipped: totalCount, manual: manualCount };
  }

  console.log(`  � Need ${neededCount} more images from Pexels`);

  // Generate search queries
  const queries = generateSearchQueries(port, section);
  console.log(`  🔍 Search queries: ${queries.join(', ')}`);

  let uploaded = 0;
  let imageIndex = totalCount + 1;

  for (const query of queries) {
    if (uploaded >= neededCount) break;

    // Rate limiting
    await sleep(RATE_LIMIT_DELAY_MS);

    try {
      console.log(`  🔎 Searching: "${query}"`);
      const photos = await searchPexels(query, 3);

      if (photos.length === 0) {
        console.log(`    ⚠️ No results for: ${query}`);
        continue;
      }

      // Try each photo until we find one that works
      for (const photo of photos) {
        if (uploaded >= neededCount) break;

        // Check if this Pexels image is already in our DB
        const alreadyExists = await checkPexelsImageExists(photo.id);
        if (alreadyExists) {
          console.log(`    ⏭️  Pexels image ${photo.id} already imported`);
          continue;
        }

        const filename = `pexels-${photo.id}.webp`;
        const storagePath = `${portSlug}/${section}/${filename}`;

        if (dryRun) {
          console.log(`    📸 [DRY RUN] Would upload: ${storagePath}`);
          console.log(`       Photographer: ${photo.photographer}`);
          uploaded++;
          imageIndex++;
          continue;
        }

        try {
          // Download and convert
          console.log(`    ⬇️  Downloading: ${photo.src.large}`);
          const webpBuffer = await downloadAndConvertImage(photo.src.large);

          // Upload to storage
          console.log(`    ⬆️  Uploading: ${storagePath}`);
          const uploadResult = await uploadToStorage(webpBuffer, storagePath);

          if (uploadResult) {
            // Create metadata entry
            await createImageMetadata(portSlug, section, photo, storagePath, query);
            console.log(`    ✅ Success: ${storagePath}`);
            console.log(`       📷 ${photo.photographer}`);
            uploaded++;
            imageIndex++;
          }
        } catch (err) {
          console.error(`    ❌ Error processing ${photo.id}:`, err.message);
        }
      }
    } catch (err) {
      console.error(`    ❌ Search error:`, err.message);
    }
  }

  return { fetched: queries.length, uploaded, skipped: totalCount, manual: manualCount };
}

async function processPort(portSlug, sections = SECTIONS, dryRun = false) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚢 Processing port: ${portSlug}`);
  console.log(`${'='.repeat(60)}`);

  const port = await getPortData(portSlug);
  console.log(`   Name: ${port.name}`);
  console.log(`   Country: ${port.country}`);
  console.log(`   Region: ${port.region}`);

  const results = {
    port: portSlug,
    sections: {},
    totalUploaded: 0,
    totalSkipped: 0
  };

  for (const section of sections) {
    const sectionResult = await processSection(port, section, dryRun);
    results.sections[section] = sectionResult;
    results.totalUploaded += sectionResult.uploaded;
    results.totalSkipped += sectionResult.skipped;
  }

  console.log(`\n📊 Summary for ${port.name}:`);
  console.log(`   Uploaded: ${results.totalUploaded} images`);
  console.log(`   Skipped: ${results.totalSkipped} (already exist)`);

  return results;
}

async function getAllPorts() {
  const { data, error } = await supabase
    .from('ports')
    .select('slug')
    .eq('status', 'published')
    .order('slug');

  if (error) {
    throw new Error(`Failed to fetch ports: ${error.message}`);
  }

  return data.map(p => p.slug);
}

// ============================================================================
// UTILITIES
// ============================================================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function printUsage() {
  console.log(`
Pexels Image Fetcher for Port Guides

Usage:
  node scripts/fetch-pexels-images.js --port=<slug> [options]

Options:
  --port=<slug>       Port slug to process (required, or 'all' for all ports)
  --section=<name>    Only process specific section (overview, stay-local, go-further, with-kids)
  --dry-run           Show what would be done without actually doing it
  --help              Show this help message

Environment Variables:
  PEXELS_API_KEY              Your Pexels API key (required)
  SUPABASE_URL                Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY   Supabase service role key (required)

Examples:
  node scripts/fetch-pexels-images.js --port=barcelona
  node scripts/fetch-pexels-images.js --port=barcelona --section=stay-local
  node scripts/fetch-pexels-images.js --port=all --dry-run
`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const { values } = parseArgs({
    options: {
      port: { type: 'string' },
      section: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      help: { type: 'boolean', default: false }
    }
  });

  if (values.help || !values.port) {
    printUsage();
    process.exit(values.help ? 0 : 1);
  }

  // Validate environment
  if (!PEXELS_API_KEY) {
    console.error('❌ Error: PEXELS_API_KEY environment variable is required');
    console.error('   Get your API key from: https://www.pexels.com/api/');
    process.exit(1);
  }

  if (!SUPABASE_SERVICE_KEY) {
    console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    process.exit(1);
  }

  // Initialize
  initSupabase();

  const dryRun = values['dry-run'];
  if (dryRun) {
    console.log('🏃 DRY RUN MODE - No changes will be made\n');
  }

  const sections = values.section ? [values.section] : SECTIONS;

  try {
    if (values.port === 'all') {
      const ports = await getAllPorts();
      console.log(`Found ${ports.length} published ports`);

      for (const portSlug of ports) {
        await processPort(portSlug, sections, dryRun);
      }
    } else {
      await processPort(values.port, sections, dryRun);
    }

    console.log('\n✅ Done!');
  } catch (err) {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
  }
}

main();
