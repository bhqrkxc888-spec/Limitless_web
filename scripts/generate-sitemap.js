/**
 * Dynamic Sitemap Generator
 * 
 * Generates sitemap.xml based on current content data files.
 * Run with: node scripts/generate-sitemap.js
 * 
 * This script reads from data files and creates a comprehensive sitemap
 * including all dynamic routes from cruise lines, destinations, bucket list, etc.
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URL
const SITE_URL = 'https://limitlesscruises.com';

// Current date in W3C format
const today = new Date().toISOString().split('T')[0];

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/find-a-cruise', priority: '0.9', changefreq: 'weekly' },
  { url: '/offers', priority: '0.9', changefreq: 'daily' },
  { url: '/travel-news', priority: '0.7', changefreq: 'daily' },
  { url: '/bucket-list', priority: '0.8', changefreq: 'weekly' },
  { url: '/destinations', priority: '0.8', changefreq: 'weekly' },
  { url: '/cruise-types', priority: '0.8', changefreq: 'weekly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/booking-terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/website-terms', priority: '0.3', changefreq: 'yearly' },
];

// Import data files dynamically
async function loadData() {
  try {
    // These imports need the full path
    const cruiseLinesModule = await import('../src/data/cruiseLines.js');
    const destinationsModule = await import('../src/data/destinations.js');
    const bucketListModule = await import('../src/data/bucketList.js');
    const cruiseTypesModule = await import('../src/data/cruiseTypes.js');
    
    return {
      cruiseLines: cruiseLinesModule.cruiseLines || [],
      destinations: destinationsModule.destinations || [],
      bucketList: bucketListModule.bucketListExperiences || [],
      cruiseTypes: cruiseTypesModule.cruiseTypes || []
    };
  } catch (error) {
    console.error('Error loading data files:', error);
    return { cruiseLines: [], destinations: [], bucketList: [], cruiseTypes: [] };
  }
}

// Generate XML for a single URL entry
function generateUrlEntry(url, priority = '0.5', changefreq = 'weekly', lastmod = today) {
  return `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Main generation function
async function generateSitemap() {
  console.log('🗺️  Generating sitemap...');
  
  const data = await loadData();
  const urls = [];
  
  // Add static pages
  console.log(`   Adding ${staticPages.length} static pages...`);
  staticPages.forEach(page => {
    urls.push(generateUrlEntry(page.url, page.priority, page.changefreq));
  });
  
  // Add cruise line pages
  console.log(`   Adding ${data.cruiseLines.length} cruise line pages...`);
  data.cruiseLines.forEach(line => {
    urls.push(generateUrlEntry(`/cruise-lines/${line.slug}`, '0.8', 'weekly'));
  });
  
  // Add destination pages
  console.log(`   Adding ${data.destinations.length} destination pages...`);
  data.destinations.forEach(dest => {
    urls.push(generateUrlEntry(`/destinations/${dest.slug}`, '0.8', 'weekly'));
  });
  
  // Add bucket list pages
  console.log(`   Adding ${data.bucketList.length} bucket list pages...`);
  data.bucketList.forEach(exp => {
    urls.push(generateUrlEntry(`/bucket-list/${exp.slug}`, '0.7', 'weekly'));
  });
  
  // Add cruise type pages
  console.log(`   Adding ${data.cruiseTypes.length} cruise type pages...`);
  data.cruiseTypes.forEach(type => {
    urls.push(generateUrlEntry(`/cruise-types/${type.slug}`, '0.7', 'weekly'));
  });
  
  // Generate full XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>`;
  
  // Write to public directory
  const outputPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, sitemap);
  
  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`   Output: public/sitemap.xml`);
}

// Run the generator
generateSitemap().catch(console.error);

