#!/usr/bin/env node
/**
 * Port Upload Script (via API)
 * 
 * Uploads port markdown files to Supabase via the deployed admin API.
 * No local service role key required - uses server-side authentication.
 * 
 * Usage:
 *   node scripts/upload-ports-via-api.js                           # Upload all ports
 *   node scripts/upload-ports-via-api.js content/ports/lisbon.md   # Upload specific file
 *   node scripts/upload-ports-via-api.js --preview                 # Preview without saving
 *   node scripts/upload-ports-via-api.js --local                   # Use localhost:3000 instead of production
 * 
 * The API handles duplicates via upsert (slug-based) - existing ports are updated, new ones created.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PRODUCTION_API = 'https://www.limitlesscruises.com/api/admin/upload-port';
const LOCAL_API = 'http://localhost:3000/api/admin/upload-port';

async function uploadPort(markdown, apiUrl, preview = false) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      markdown,
      action: preview ? 'preview' : 'upsert'
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

async function processFile(filePath, apiUrl, preview) {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Processing: ${fileName}`);
  
  try {
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const result = await uploadPort(markdown, apiUrl, preview);
    
    if (result.preview) {
      console.log(`   🔍 Preview: ${result.port.name} (${result.port.slug})`);
      console.log(`   Region: ${result.port.region}, Country: ${result.port.country}`);
    } else {
      const action = result.action === 'updated' ? '🔄 Updated' : '✅ Created';
      console.log(`   ${action}: ${result.port.name} (${result.port.slug})`);
    }
    
    return { success: true, port: result.port };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function processAllPorts(apiUrl, preview) {
  const contentDir = path.join(__dirname, '..', 'content', 'ports');
  
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    console.log('   Create port MD files in content/ports/ directory');
    return;
  }

  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentDir, f));

  if (files.length === 0) {
    console.log('📭 No markdown files found in content/ports/');
    return;
  }

  console.log(`\n🚀 Processing ${files.length} port file(s)...`);
  if (preview) console.log('🔍 PREVIEW MODE - No changes will be saved\n');
  
  let success = 0;
  let failed = 0;
  const results = [];

  for (const file of files) {
    const result = await processFile(file, apiUrl, preview);
    results.push({ file: path.basename(file), ...result });
    if (result.success) success++;
    else failed++;
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 Summary: ${success} successful, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\n❌ Failed uploads:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.file}: ${r.error}`);
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const preview = args.includes('--preview');
  const useLocal = args.includes('--local');
  const files = args.filter(a => a.endsWith('.md'));

  const apiUrl = useLocal ? LOCAL_API : PRODUCTION_API;

  console.log('🌍 Port Upload Script (via API)');
  console.log('═'.repeat(50));
  console.log(`📡 API: ${apiUrl}`);
  if (preview) console.log('🔍 Mode: Preview (no changes saved)');
  console.log('');

  if (files.length > 0) {
    // Process specific files
    let success = 0;
    let failed = 0;
    for (const file of files) {
      const result = await processFile(file, apiUrl, preview);
      if (result.success) success++;
      else failed++;
    }
    console.log(`\n📊 Summary: ${success} successful, ${failed} failed`);
  } else {
    // Process all ports in content/ports/
    await processAllPorts(apiUrl, preview);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
