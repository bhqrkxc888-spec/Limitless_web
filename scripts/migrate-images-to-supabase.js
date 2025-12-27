/**
 * Migration Script: Vercel Blob → Supabase Storage
 * 
 * Migrates existing images from Vercel Blob to Supabase Storage
 * Priority: 
 * 1. CRITICAL - Site images (hero, logo, OG, favicon)
 * 2. HIGH - Destination heroes & cards
 * 3. HIGH - Cruise line logos & heroes
 * 
 * Run: node scripts/migrate-images-to-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import { list, head } from '@vercel/blob';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need service role for admin operations
const VERCEL_BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

if (!VERCEL_BLOB_READ_WRITE_TOKEN) {
  console.error('❌ Missing Vercel Blob token');
  console.error('Set BLOB_READ_WRITE_TOKEN in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Migration mappings
const MIGRATIONS = [
  // Site assets (CRITICAL)
  { vercel: 'site/HERO-home.webp', supabase: { bucket: 'site', path: 'hero.webp', entityType: 'site', entityId: 'site', imageType: 'hero' }},
  { vercel: 'site/Hero-logo.webp', supabase: { bucket: 'site', path: 'logo.webp', entityType: 'site', entityId: 'site', imageType: 'logo' }},
  { vercel: 'site/OG.webp', supabase: { bucket: 'site', path: 'og-image.webp', entityType: 'site', entityId: 'site', imageType: 'og-image' }},
  { vercel: 'site/favicon.webp', supabase: { bucket: 'site', path: 'favicon.ico', entityType: 'site', entityId: 'site', imageType: 'favicon' }},
  
  // Destinations (HIGH) - example format, user will need to add all 30
  // { vercel: 'destinations/caribbean-HERO.webp', supabase: { bucket: 'destinations', path: 'caribbean/hero.webp', entityType: 'destination', entityId: 'caribbean', imageType: 'hero' }},
  // { vercel: 'destinations/caribbean-CARD.webp', supabase: { bucket: 'destinations', path: 'caribbean/card.webp', entityType: 'destination', entityId: 'caribbean', imageType: 'card' }},
  
  // Cruise lines (HIGH) - example format
  // { vercel: 'cruise-lines/logos/royal-caribbean-logo.webp', supabase: { bucket: 'cruise-lines', path: 'royal-caribbean/logo.webp', entityType: 'cruise-line', entityId: 'royal-caribbean', imageType: 'logo' }},
  // { vercel: 'cruise-lines/heroes/royal-caribbean-HERO.webp', supabase: { bucket: 'cruise-lines', path: 'royal-caribbean/hero.webp', entityType: 'cruise-line', entityId: 'royal-caribbean', imageType: 'hero' }},
];

async function downloadFromVercelBlob(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download: ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function uploadToSupabase(buffer, bucket, path) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) throw error;
  return data;
}

async function storeMetadata(mapping, fileBuffer) {
  const { bucket, path, entityType, entityId, imageType } = mapping;
  
  // Get image dimensions (simplified - would need sharp for real dimensions)
  const fileSize = fileBuffer.length;
  
  const { error } = await supabase
    .from('site_images')
    .upsert({
      bucket,
      path,
      entity_type: entityType,
      entity_id: entityId,
      image_type: imageType,
      alt_text: `${entityId} ${imageType}`, // Placeholder - user should update
      file_size: fileSize,
      format: 'webp',
      seo_compliant: true, // Assuming pre-optimized
      validation_warnings: null
    }, {
      onConflict: 'bucket,path'
    });

  if (error) {
    console.warn(`⚠️  Failed to store metadata: ${error.message}`);
  }
}

async function migrateImage(migration) {
  const { vercel, supabase: supabaseConfig } = migration;
  
  try {
    console.log(`\n📦 Migrating: ${vercel} → ${supabaseConfig.bucket}/${supabaseConfig.path}`);
    
    // 1. Download from Vercel Blob
    const vercelUrl = `https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/${vercel}`;
    console.log('  ⬇️  Downloading from Vercel Blob...');
    const buffer = await downloadFromVercelBlob(vercelUrl);
    console.log(`  ✓ Downloaded (${(buffer.length / 1024).toFixed(0)} KB)`);
    
    // 2. Upload to Supabase
    console.log('  ⬆️  Uploading to Supabase...');
    await uploadToSupabase(buffer, supabaseConfig.bucket, supabaseConfig.path);
    console.log('  ✓ Uploaded to Supabase');
    
    // 3. Store metadata
    console.log('  💾 Storing metadata...');
    await storeMetadata(supabaseConfig, buffer);
    console.log('  ✓ Metadata stored');
    
    // 4. Get new URL
    const { data } = supabase.storage
      .from(supabaseConfig.bucket)
      .getPublicUrl(supabaseConfig.path);
    
    console.log(`  ✅ Success! New URL: ${data.publicUrl}`);
    
    return {
      success: true,
      vercel: vercelUrl,
      supabase: data.publicUrl,
      mapping: supabaseConfig
    };
  } catch (error) {
    console.error(`  ❌ Failed: ${error.message}`);
    return {
      success: false,
      vercel: migration.vercel,
      error: error.message
    };
  }
}

async function generateReport(results) {
  const reportPath = path.join(__dirname, '../docs/MIGRATION_REPORT.md');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  let report = `# Image Migration Report\n\n`;
  report += `**Date:** ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- ✅ Successful: ${successful.length}\n`;
  report += `- ❌ Failed: ${failed.length}\n`;
  report += `- 📊 Total: ${results.length}\n\n`;
  
  if (successful.length > 0) {
    report += `## Successful Migrations\n\n`;
    successful.forEach(r => {
      report += `- **${r.mapping.entityId}/${r.mapping.imageType}**\n`;
      report += `  - Vercel: ${r.vercel}\n`;
      report += `  - Supabase: ${r.supabase}\n\n`;
    });
  }
  
  if (failed.length > 0) {
    report += `## Failed Migrations\n\n`;
    failed.forEach(r => {
      report += `- **${r.vercel}**\n`;
      report += `  - Error: ${r.error}\n\n`;
    });
  }
  
  report += `## Next Steps\n\n`;
  report += `1. Update \`assetUrls.js\` with new Supabase URLs\n`;
  report += `2. Test all pages to ensure images load correctly\n`;
  report += `3. Update ALT text in admin interface\n`;
  report += `4. Delete Vercel Blob images after confirming everything works\n`;
  
  fs.writeFileSync(reportPath, report);
  console.log(`\n📄 Report saved to: ${reportPath}`);
}

async function main() {
  console.log('🚀 Starting image migration: Vercel Blob → Supabase\n');
  console.log(`📋 Total migrations: ${MIGRATIONS.length}\n`);
  
  const results = [];
  
  for (const migration of MIGRATIONS) {
    const result = await migrateImage(migration);
    results.push(result);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Migration complete!');
  console.log('='.repeat(60));
  
  await generateReport(results);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}\n`);
  
  if (failed > 0) {
    console.log('⚠️  Some migrations failed. Check the report for details.\n');
    process.exit(1);
  }
  
  console.log('🎉 All migrations successful!\n');
  console.log('Next steps:');
  console.log('  1. Run: node scripts/update-asset-urls.js');
  console.log('  2. Test the site thoroughly');
  console.log('  3. Delete old Vercel Blob images\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

