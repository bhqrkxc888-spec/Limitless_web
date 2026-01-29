#!/usr/bin/env node
/**
 * Quick script to check port status and find duplicates
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPorts() {
  console.log('='.repeat(60));
  console.log('PORT STATUS CHECK');
  console.log('='.repeat(60));

  // Get all ports
  const { data: allPorts, error } = await supabase
    .from('ports')
    .select('id, slug, name, status, created_at, updated_at')
    .order('slug');

  if (error) {
    console.error('Error fetching ports:', error);
    return;
  }

  console.log(`\nTotal ports in database: ${allPorts.length}\n`);

  // Group by status
  const byStatus = {};
  for (const port of allPorts) {
    byStatus[port.status] = byStatus[port.status] || [];
    byStatus[port.status].push(port);
  }

  console.log('BY STATUS:');
  for (const [status, ports] of Object.entries(byStatus)) {
    console.log(`  ${status}: ${ports.length} ports`);
  }

  // Find potential duplicates (similar slugs)
  console.log('\n' + '='.repeat(60));
  console.log('POTENTIAL DUPLICATES (similar names):');
  console.log('='.repeat(60));

  const slugWords = {};
  for (const port of allPorts) {
    // Extract key word from slug
    const words = port.slug.split('-');
    for (const word of words) {
      if (word.length > 4) { // Skip short words
        slugWords[word] = slugWords[word] || [];
        slugWords[word].push(port);
      }
    }
  }

  for (const [word, ports] of Object.entries(slugWords)) {
    if (ports.length > 1) {
      console.log(`\n"${word}" appears in ${ports.length} ports:`);
      for (const port of ports) {
        console.log(`  - ${port.slug} (${port.status}) [${port.name}]`);
      }
    }
  }

  // List all non-published ports
  console.log('\n' + '='.repeat(60));
  console.log('NON-PUBLISHED PORTS:');
  console.log('='.repeat(60));

  const nonPublished = allPorts.filter(p => p.status !== 'published');
  if (nonPublished.length === 0) {
    console.log('  (none)');
  } else {
    for (const port of nonPublished) {
      console.log(`  - ${port.slug} (${port.status}) - ${port.name}`);
    }
  }

  // List all published ports
  console.log('\n' + '='.repeat(60));
  console.log('PUBLISHED PORTS:');
  console.log('='.repeat(60));

  const published = allPorts.filter(p => p.status === 'published');
  for (const port of published) {
    console.log(`  - ${port.slug}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Published: ${published.length}`);
  console.log(`Draft/Archived: ${nonPublished.length}`);
  console.log(`Total: ${allPorts.length}`);
}

checkPorts().catch(console.error);
