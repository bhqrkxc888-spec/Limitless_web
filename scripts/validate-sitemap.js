#!/usr/bin/env node

/**
 * Sitemap Validation Script
 * 
 * Validates the generated sitemap.xml files to ensure they:
 * - Are valid XML
 * - Contain expected structure
 * - Have proper URL counts
 * - Use correct domain
 * - Both files are identical
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '../public');
const SITE_URL = 'https://www.limitlesscruises.com';

console.log('🔍 Validating Sitemap Files...\n');

let errors = 0;
let warnings = 0;

// Check if files exist
const sitemap1 = join(publicDir, 'sitemap.xml');
const sitemap2 = join(publicDir, 'sitemaps.xml');

if (!existsSync(sitemap1)) {
  console.error('❌ ERROR: sitemap.xml not found at', sitemap1);
  errors++;
} else {
  console.log('✅ sitemap.xml exists');
}

if (!existsSync(sitemap2)) {
  console.error('❌ ERROR: sitemaps.xml not found at', sitemap2);
  errors++;
} else {
  console.log('✅ sitemaps.xml exists');
}

if (errors > 0) {
  console.log('\n❌ Validation failed. Generate sitemaps first: npm run sitemap');
  process.exit(1);
}

// Read both files
const content1 = readFileSync(sitemap1, 'utf-8');
const content2 = readFileSync(sitemap2, 'utf-8');

// Check if identical
console.log('\n📋 Checking file identity...');
if (content1 === content2) {
  console.log('✅ sitemap.xml and sitemaps.xml are identical');
} else {
  console.error('❌ ERROR: Files are not identical');
  errors++;
}

// Validate XML structure
console.log('\n📋 Validating XML structure...');

// Check XML declaration
if (content1.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  console.log('✅ Valid XML declaration');
} else {
  console.error('❌ ERROR: Invalid XML declaration');
  errors++;
}

// Check for required XML elements
const requiredElements = [
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '</urlset>',
  '<url>',
  '</url>',
  '<loc>',
  '</loc>',
  '<lastmod>',
  '</lastmod>',
  '<changefreq>',
  '</changefreq>',
  '<priority>',
  '</priority>'
];

requiredElements.forEach(element => {
  if (content1.includes(element)) {
    console.log(`✅ Contains ${element.substring(0, 20)}...`);
  } else {
    console.error(`❌ ERROR: Missing ${element}`);
    errors++;
  }
});

// Check URL count
const urlMatches = content1.match(/<loc>/g);
const urlCount = urlMatches ? urlMatches.length : 0;
console.log(`\n📊 URL Statistics:`);
console.log(`   Total URLs: ${urlCount}`);

if (urlCount === 0) {
  console.error('❌ ERROR: No URLs found in sitemap');
  errors++;
} else if (urlCount < 10) {
  console.warn(`⚠️  WARNING: Only ${urlCount} URLs found (expected more)`);
  warnings++;
} else if (urlCount > 50000) {
  console.error('❌ ERROR: More than 50,000 URLs (need sitemap index)');
  errors++;
} else {
  console.log('✅ URL count within acceptable range');
}

// Validate URLs
console.log('\n📋 Validating URLs...');

const urlRegex = /<loc>(.*?)<\/loc>/g;
const urls = [];
let match;

while ((match = urlRegex.exec(content1)) !== null) {
  urls.push(match[1]);
}

// Check all URLs start with correct domain
let invalidUrls = 0;
urls.forEach(url => {
  if (!url.startsWith(SITE_URL)) {
    console.error(`❌ ERROR: Invalid URL domain: ${url}`);
    invalidUrls++;
    errors++;
  }
});

if (invalidUrls === 0) {
  console.log(`✅ All ${urls.length} URLs use correct domain`);
}

// Check for excluded patterns (should not be in sitemap)
const excludedPatterns = [
  '/admin/',
  '/preview',
  '/api/',
  '/travel-news/category/',
  '/travel-news/tag/'
];

let excludedFound = 0;
excludedPatterns.forEach(pattern => {
  const found = urls.filter(url => url.includes(pattern));
  if (found.length > 0) {
    console.error(`❌ ERROR: Found excluded pattern ${pattern}:`);
    found.forEach(url => console.error(`   ${url}`));
    excludedFound += found.length;
    errors++;
  }
});

if (excludedFound === 0) {
  console.log('✅ No excluded patterns found in sitemap');
}

// Check for homepage
if (urls.includes(`${SITE_URL}/`)) {
  console.log('✅ Homepage included');
} else {
  console.error('❌ ERROR: Homepage not found in sitemap');
  errors++;
}

// Check for duplicates
const uniqueUrls = [...new Set(urls)];
if (uniqueUrls.length === urls.length) {
  console.log('✅ No duplicate URLs');
} else {
  console.error(`❌ ERROR: Found ${urls.length - uniqueUrls.length} duplicate URLs`);
  errors++;
}

// Check lastmod dates
console.log('\n📋 Validating lastmod dates...');
const dateRegex = /<lastmod>(.*?)<\/lastmod>/g;
const dates = [];

while ((match = dateRegex.exec(content1)) !== null) {
  dates.push(match[1]);
}

let invalidDates = 0;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
dates.forEach(date => {
  if (!datePattern.test(date)) {
    invalidDates++;
  }
});

if (invalidDates === 0) {
  console.log(`✅ All ${dates.length} dates in valid format (YYYY-MM-DD)`);
} else {
  console.error(`❌ ERROR: ${invalidDates} dates in invalid format`);
  errors++;
}

// Check priorities
console.log('\n📋 Validating priority values...');
const priorityRegex = /<priority>(.*?)<\/priority>/g;
const priorities = [];

while ((match = priorityRegex.exec(content1)) !== null) {
  priorities.push(parseFloat(match[1]));
}

let invalidPriorities = 0;
priorities.forEach(priority => {
  if (priority < 0 || priority > 1) {
    invalidPriorities++;
  }
});

if (invalidPriorities === 0) {
  console.log(`✅ All ${priorities.length} priorities in valid range (0.0-1.0)`);
} else {
  console.error(`❌ ERROR: ${invalidPriorities} priorities outside valid range`);
  errors++;
}

// Check changefreq values
console.log('\n📋 Validating changefreq values...');
const changefreqRegex = /<changefreq>(.*?)<\/changefreq>/g;
const changefreqs = [];
const validChangefreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

while ((match = changefreqRegex.exec(content1)) !== null) {
  changefreqs.push(match[1]);
}

let invalidChangefreqs = 0;
changefreqs.forEach(freq => {
  if (!validChangefreqs.includes(freq)) {
    invalidChangefreqs++;
  }
});

if (invalidChangefreqs === 0) {
  console.log(`✅ All ${changefreqs.length} changefreq values are valid`);
} else {
  console.error(`❌ ERROR: ${invalidChangefreqs} invalid changefreq values`);
  errors++;
}

// File size check
const fileSize = Buffer.byteLength(content1, 'utf-8');
const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);
console.log(`\n📊 File Size: ${fileSizeMB} MB`);

if (fileSize > 50 * 1024 * 1024) {
  console.error('❌ ERROR: File size exceeds 50MB limit');
  errors++;
} else {
  console.log('✅ File size within limits');
}

// Summary
console.log('\n' + '='.repeat(60));
if (errors === 0 && warnings === 0) {
  console.log('✅ VALIDATION PASSED - Sitemap is valid and ready!');
} else if (errors === 0) {
  console.log(`⚠️  VALIDATION PASSED WITH ${warnings} WARNING(S)`);
} else {
  console.log(`❌ VALIDATION FAILED - ${errors} ERROR(S), ${warnings} WARNING(S)`);
}
console.log('='.repeat(60));

console.log(`\n📄 Total URLs: ${urlCount}`);
console.log(`📏 File Size: ${fileSizeMB} MB`);
console.log(`🔗 Both sitemap.xml and sitemaps.xml validated`);

if (errors === 0) {
  console.log('\n✅ Next steps:');
  console.log('   1. Deploy to production');
  console.log('   2. Verify URLs are accessible:');
  console.log('      - https://www.limitlesscruises.com/sitemap.xml');
  console.log('      - https://www.limitlesscruises.com/sitemaps.xml');
  console.log('   3. Submit to Google Search Console');
  console.log('   4. Validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
}

process.exit(errors > 0 ? 1 : 0);

