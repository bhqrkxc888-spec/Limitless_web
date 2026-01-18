#!/usr/bin/env node
/**
 * Port Upload Script
 * 
 * Parses Markdown port files and uploads to Supabase
 * 
 * Usage:
 *   node scripts/upload-ports.js                    # Process all ports
 *   node scripts/upload-ports.js content/ports/lisbon.md  # Single file
 *   node scripts/upload-ports.js --dry-run          # Preview without uploading
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ============================================
// MARKDOWN PARSER
// ============================================

/**
 * Parse a port markdown file into structured data
 */
function parsePortMarkdown(content, filePath) {
  const lines = content.split('\n');
  const data = {
    slug: '',
    name: '',
    display_name: '',
    country: '',
    region: '',
    coordinates: {},
    tagline: '',
    description: '',
    port_character: '',
    about_port: {},
    quick_facts: {},
    transport_connections: {},
    getting_around: {},
    must_see_sights: [],
    shore_excursions: [],
    nearest_beach: {},
    food_and_drink: [],
    insider_tips: [],
    faq: [],
    weather: {},
    practical_info: {},
    content_overview: {},
    content_stay_local: {},
    content_go_further: {},
    content_with_kids: {},
    content_accessibility: {},
    content_medical: {},
    content_food_drink: {},
    content_practical: {},
    family_friendly: {},
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    source_file: filePath
  };

  let currentSection = '';
  let currentSubSection = '';
  let buffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Main section headers (##)
    if (trimmed.startsWith('## ')) {
      // Process previous section
      if (currentSection && buffer.length > 0) {
        processSection(data, currentSection, currentSubSection, buffer);
      }
      currentSection = trimmed.substring(3).trim();
      currentSubSection = '';
      buffer = [];
      continue;
    }

    // Subsection headers (###)
    if (trimmed.startsWith('### ')) {
      // Process previous subsection
      if (currentSubSection && buffer.length > 0) {
        processSection(data, currentSection, currentSubSection, buffer);
      }
      currentSubSection = trimmed.substring(4).trim();
      buffer = [];
      continue;
    }

    // Port name from H1
    if (trimmed.startsWith('# ') && !data.name) {
      data.name = trimmed.substring(2).trim();
      data.display_name = data.name;
      continue;
    }

    // Collect content
    buffer.push(line);
  }

  // Process final section
  if (currentSection && buffer.length > 0) {
    processSection(data, currentSection, currentSubSection, buffer);
  }

  // Generate slug from name if not set
  if (!data.slug && data.name) {
    data.slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return data;
}

/**
 * Process a section's content
 */
function processSection(data, section, subSection, lines) {
  const content = lines.join('\n').trim();
  const sectionLower = section.toLowerCase();

  // Basic Information section
  if (sectionLower === 'basic information') {
    parseBasicInfo(data, content);
    return;
  }

  // Description
  if (sectionLower === 'description') {
    data.description = content;
    return;
  }

  // About Port
  if (sectionLower === 'about port') {
    data.about_port = { content };
    return;
  }

  // Quick Facts
  if (sectionLower === 'quick facts') {
    data.quick_facts = parseKeyValueList(content);
    return;
  }

  // Transport Connections
  if (sectionLower === 'transport connections') {
    data.transport_connections = { content };
    return;
  }

  // Getting Around
  if (sectionLower === 'getting around') {
    data.getting_around = { content };
    return;
  }

  // Must-See Sights
  if (sectionLower === 'must-see sights') {
    data.must_see_sights = parseNumberedItems(content);
    return;
  }

  // Shore Excursions
  if (sectionLower === 'shore excursions') {
    data.shore_excursions = parseNumberedItems(content);
    return;
  }

  // Nearest Beach
  if (sectionLower === 'nearest beach') {
    data.nearest_beach = parseKeyValueList(content);
    return;
  }

  // Food & Drink (top level)
  if (sectionLower === 'food & drink') {
    data.food_and_drink = parseNumberedItems(content);
    return;
  }

  // Insider Tips
  if (sectionLower === 'insider tips') {
    data.insider_tips = parseBulletList(content);
    return;
  }

  // Weather
  if (sectionLower === 'weather') {
    data.weather = parseWeatherSection(content);
    return;
  }

  // FAQ
  if (sectionLower === 'faq') {
    data.faq = parseFAQ(content);
    return;
  }

  // Practical Information
  if (sectionLower === 'practical information') {
    data.practical_info = parseKeyValueList(content);
    return;
  }

  // Content Sections
  if (sectionLower === 'content sections' || sectionLower.startsWith('content')) {
    if (subSection) {
      const subLower = subSection.toLowerCase();
      if (subLower === 'overview') {
        data.content_overview = parseContentSection(content);
      } else if (subLower === 'stay local') {
        data.content_stay_local = parseContentSection(content);
      } else if (subLower === 'go further') {
        data.content_go_further = parseContentSection(content);
      } else if (subLower === 'with kids') {
        data.content_with_kids = parseContentSection(content);
      } else if (subLower.includes('accessibility') || subLower.includes('send')) {
        data.content_accessibility = parseContentSection(content);
      } else if (subLower.includes('medical')) {
        data.content_medical = parseContentSection(content);
      } else if (subLower.includes('food')) {
        data.content_food_drink = parseContentSection(content);
      }
    }
    return;
  }

  // Meta section
  if (sectionLower === 'meta' || sectionLower === 'seo') {
    const meta = parseKeyValueList(content);
    data.meta_title = meta.Title || meta.title || '';
    data.meta_description = meta.Description || meta.description || '';
    if (meta.Keywords || meta.keywords) {
      data.meta_keywords = (meta.Keywords || meta.keywords).split(',').map(k => k.trim());
    }
    return;
  }
}

/**
 * Parse Basic Information section
 */
function parseBasicInfo(data, content) {
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^-\s*(.+?):\s*(.+)$/);
    if (match) {
      const key = match[1].toLowerCase().trim();
      const value = match[2].trim();

      if (key === 'slug') data.slug = value;
      if (key === 'country') data.country = value;
      if (key === 'region') data.region = value;
      if (key === 'tagline') data.tagline = value;
      if (key === 'port character') data.port_character = value;
      if (key === 'coordinates') {
        const coords = value.split(',').map(c => parseFloat(c.trim()));
        if (coords.length === 2) {
          data.coordinates = { lat: coords[0], lon: coords[1] };
        }
      }
    }
  }
}

/**
 * Parse key-value list (- Key: Value format)
 */
function parseKeyValueList(content) {
  const result = {};
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^-\s*(.+?):\s*(.+)$/);
    if (match) {
      result[match[1].trim()] = match[2].trim();
    }
  }
  return result;
}

/**
 * Parse bullet list
 */
function parseBulletList(content) {
  const items = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^-\s+(.+)$/);
    if (match) {
      items.push(match[1].trim());
    }
  }
  return items;
}

/**
 * Parse numbered items (1. **Name** format)
 */
function parseNumberedItems(content) {
  const items = [];
  const lines = content.split('\n');
  let currentItem = null;

  for (const line of lines) {
    // New numbered item
    const numMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
    if (numMatch) {
      if (currentItem) items.push(currentItem);
      currentItem = { name: numMatch[1].trim() };
      continue;
    }

    // Properties of current item
    if (currentItem) {
      const propMatch = line.match(/^\s+-\s+(.+?):\s*(.+)$/);
      if (propMatch) {
        const key = propMatch[1].toLowerCase().replace(/\s+/g, '_');
        currentItem[key] = propMatch[2].trim();
      } else if (line.match(/^\s+-\s+(.+)$/)) {
        // Simple bullet under item
        const bulletMatch = line.match(/^\s+-\s+(.+)$/);
        if (!currentItem.details) currentItem.details = [];
        currentItem.details.push(bulletMatch[1].trim());
      }
    }
  }

  if (currentItem) items.push(currentItem);
  return items;
}

/**
 * Parse FAQ section
 */
function parseFAQ(content) {
  const faqs = [];
  const lines = content.split('\n');
  let currentQ = null;
  let answerBuffer = [];

  for (const line of lines) {
    const qMatch = line.match(/^\d+\.\s+\*\*(.+?)\?\*\*$/);
    if (qMatch) {
      if (currentQ) {
        faqs.push({ question: currentQ, answer: answerBuffer.join(' ').trim() });
      }
      currentQ = qMatch[1].trim() + '?';
      answerBuffer = [];
      continue;
    }

    if (currentQ && line.trim()) {
      answerBuffer.push(line.trim());
    }
  }

  if (currentQ) {
    faqs.push({ question: currentQ, answer: answerBuffer.join(' ').trim() });
  }

  return faqs;
}

/**
 * Parse weather section
 */
function parseWeatherSection(content) {
  const weather = { intro: '', monthly: [], bestTime: '' };
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.startsWith('- Intro:')) {
      weather.intro = line.replace('- Intro:', '').trim();
    } else if (line.startsWith('- Best Time:')) {
      weather.bestTime = line.replace('- Best Time:', '').trim();
    }
  }

  return weather;
}

/**
 * Parse content section (overview, stay local, etc.)
 */
function parseContentSection(content) {
  // Return as structured object with raw content
  return { content };
}

// ============================================
// VALIDATION
// ============================================

function validatePortData(data) {
  const errors = [];

  if (!data.slug) errors.push('Missing slug');
  if (!data.name) errors.push('Missing name');
  if (!data.country) errors.push('Missing country');
  if (!data.region) errors.push('Missing region');
  if (!data.coordinates?.lat || !data.coordinates?.lon) {
    errors.push('Missing or invalid coordinates');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================
// UPLOAD FUNCTIONS
// ============================================

async function uploadPort(data, dryRun = false) {
  const validation = validatePortData(data);
  
  if (!validation.valid) {
    console.error(`❌ Validation failed for ${data.name || 'unknown'}:`);
    validation.errors.forEach(e => console.error(`   - ${e}`));
    return false;
  }

  if (dryRun) {
    console.log(`🔍 [DRY RUN] Would upload: ${data.name} (${data.slug})`);
    console.log(`   Country: ${data.country}, Region: ${data.region}`);
    console.log(`   Coordinates: ${data.coordinates.lat}, ${data.coordinates.lon}`);
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

async function processFile(filePath, dryRun = false) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = parsePortMarkdown(content, filePath);
    return await uploadPort(data, dryRun);
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
    return false;
  }
}

async function processAllPorts(dryRun = false) {
  const contentDir = path.join(__dirname, '..', 'content', 'ports');
  
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    console.log('   Create port MD files in content/ports/ directory');
    return;
  }

  const files = fs.readdirSync(contentDir, { recursive: true })
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentDir, f));

  if (files.length === 0) {
    console.log('📭 No markdown files found in content/ports/');
    console.log('   Create port files using the template');
    return;
  }

  console.log(`\n🚀 Processing ${files.length} port file(s)...`);
  
  let success = 0;
  let failed = 0;

  for (const file of files) {
    const result = await processFile(file, dryRun);
    if (result) success++;
    else failed++;
  }

  console.log(`\n📊 Summary: ${success} uploaded, ${failed} failed`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const files = args.filter(a => a.endsWith('.md'));

  console.log('🌍 Port Upload Script');
  console.log('=====================');
  if (dryRun) console.log('🔍 DRY RUN MODE - No changes will be made\n');

  if (files.length > 0) {
    // Process specific files
    for (const file of files) {
      await processFile(file, dryRun);
    }
  } else {
    // Process all ports in content/ports/
    await processAllPorts(dryRun);
  }
}

main().catch(console.error);
