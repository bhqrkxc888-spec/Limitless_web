#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator - SEO Policy Compliant
 * 
 * Generates sitemap.xml based on:
 * - Static routes defined in code
 * - Dynamic routes from data files (cruise lines, destinations, etc.)
 * - Dynamic content from Supabase (travel news, offers, cruise guides)
 * 
 * Only includes canonical, indexable URLs per the central SEO policy.
 * Automatically excludes noindex pages (category/tag archives, admin, etc.)
 * 
 * Usage:
 *   node scripts/generate-sitemap.js
 * 
 * Environment variables (REQUIRED for complete sitemap with dynamic content):
 *   SUPABASE_URL - Supabase project URL (e.g., https://xxx.supabase.co)
 *   SUPABASE_ANON_KEY - Supabase anonymous/public key
 * 
 * For production builds, ensure these are set:
 *   export SUPABASE_URL="your_url"
 *   export SUPABASE_ANON_KEY="your_key"
 *   npm run sitemap
 * 
 * Without credentials, the sitemap will include:
 *   - All static routes (18)
 *   - All data file routes (56: destinations, cruise lines, bucket list, cruise types)
 *   - But NOT dynamic content from Supabase (travel news, offers, cruise guides)
 * 
 * With credentials, the sitemap will be complete with all published content.
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { shouldIncludeDetailPages, shouldIncludeInSitemap } from '../src/config/publishStatus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SITE_URL = 'https://limitlesscruises.com';
const today = new Date().toISOString().split('T')[0];

// ============================================================================
// STATIC ROUTES (always included)
// ============================================================================

const STATIC_ROUTES = [
  // Core pages
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/find-a-cruise', priority: '0.9', changefreq: 'weekly' },
  
  // Hub pages
  { url: '/offers', priority: '0.9', changefreq: 'daily' },
  { url: '/travel-news', priority: '0.7', changefreq: 'daily' },
  { url: '/cruise-guides', priority: '0.7', changefreq: 'weekly' },
  { url: '/destinations', priority: '0.8', changefreq: 'weekly' },
  { url: '/cruise-lines', priority: '0.8', changefreq: 'weekly' },
  { url: '/cruise-types', priority: '0.8', changefreq: 'weekly' },
  { url: '/bucket-list', priority: '0.8', changefreq: 'weekly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  
  // Legal pages (lower priority)
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/booking-terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/website-terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/price-match-guarantee', priority: '0.5', changefreq: 'yearly' },
];

// ============================================================================
// EXCLUDED PATTERNS (noindex pages - never include in sitemap)
// ============================================================================

const EXCLUDED_PATTERNS = [
  /^\/travel-news\/category\//,  // Category archives
  /^\/travel-news\/tag\//,       // Tag archives
  /^\/admin/,                    // Admin pages
  /^\/preview/,                  // Preview pages
  /^\/api/,                      // API endpoints
];

function isExcluded(url) {
  return EXCLUDED_PATTERNS.some(pattern => pattern.test(url));
}

// ============================================================================
// DATA LOADERS
// ============================================================================

async function loadLocalData() {
  try {
    const cruiseLinesModule = await import('../src/data/cruiseLines.js');
    const destinationsModule = await import('../src/data/destinations.js');
    const bucketListModule = await import('../src/data/bucketList.js');
    const cruiseTypesModule = await import('../src/data/cruiseTypes.js');

    return {
      cruiseLines: cruiseLinesModule.cruiseLines || [],
      destinations: destinationsModule.destinations || [],
      bucketList: bucketListModule.bucketListExperiences || [],
      cruiseTypes: cruiseTypesModule.cruiseTypes || [],
    };
  } catch (error) {
    console.error('⚠️  Error loading local data files:', error.message);
    return { cruiseLines: [], destinations: [], bucketList: [], cruiseTypes: [] };
  }
}

async function loadSupabaseData() {
  // Check for environment variables
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('   ℹ️  Supabase credentials not found. Skipping dynamic content.');
    console.log('      Set SUPABASE_URL and SUPABASE_ANON_KEY to include dynamic content.');
    return { travelNews: [], offers: [], cruiseGuides: [] };
  }

  try {
    // Dynamic import of Supabase client
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results = { travelNews: [], offers: [], cruiseGuides: [] };

    // Fetch travel news articles
    try {
      const { data: newsData } = await supabase
        .from('travel_news')
        .select('slug, updated_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (newsData) {
        results.travelNews = newsData;
        console.log(`   📰 Found ${newsData.length} travel news articles`);
      }
    } catch (e) {
      console.log('   ⚠️  Could not fetch travel news:', e.message);
    }

    // Fetch offers
    try {
      const { data: offersData } = await supabase
        .from('offers')
        .select('slug, updated_at')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (offersData) {
        results.offers = offersData;
        console.log(`   🎁 Found ${offersData.length} offers`);
      }
    } catch (e) {
      console.log('   ⚠️  Could not fetch offers:', e.message);
    }

    // Fetch cruise guides
    try {
      const { data: guidesData } = await supabase
        .from('cruise_guides')
        .select('slug, updated_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (guidesData) {
        results.cruiseGuides = guidesData;
        console.log(`   📚 Found ${guidesData.length} cruise guides`);
      }
    } catch (e) {
      console.log('   ⚠️  Could not fetch cruise guides:', e.message);
    }

    return results;
  } catch (error) {
    console.log('   ⚠️  Error connecting to Supabase:', error.message);
    return { travelNews: [], offers: [], cruiseGuides: [] };
  }
}

// ============================================================================
// SITEMAP GENERATION
// ============================================================================

function generateUrlEntry(url, priority = '0.5', changefreq = 'weekly', lastmod = today) {
  // Ensure no trailing slash except for root
  const cleanUrl = url === '/' ? url : url.replace(/\/$/, '');
  
  // Skip excluded URLs
  if (isExcluded(cleanUrl)) {
    return null;
  }

  return `  <url>
    <loc>${SITE_URL}${cleanUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap (SEO Policy Compliant)...\n');

  const urls = [];
  let totalCount = 0;

  // 1. Add static routes (filtered by publish status)
  console.log('📋 Adding static routes...');
  STATIC_ROUTES.forEach(route => {
    if (shouldIncludeInSitemap(route.url)) {
      const entry = generateUrlEntry(route.url, route.priority, route.changefreq);
      if (entry) {
        urls.push(entry);
        totalCount++;
      }
    }
  });
  console.log(`   Added ${totalCount} static routes`);

  // 2. Load and add local data routes (ONLY if published)
  console.log('\n📦 Loading local data files...');
  const localData = await loadLocalData();

  // Cruise lines (only if published)
  if (shouldIncludeDetailPages('cruiseLines') && localData.cruiseLines.length > 0) {
    console.log(`   Adding ${localData.cruiseLines.length} cruise lines (PUBLISHED)...`);
    localData.cruiseLines.forEach(line => {
      const urlPath = `/cruise-lines/${line.slug}`;
      if (shouldIncludeInSitemap(urlPath)) {
        const entry = generateUrlEntry(urlPath, '0.8', 'weekly');
        if (entry) {
          urls.push(entry);
          totalCount++;
        }
      }
    });
  } else if (localData.cruiseLines.length > 0) {
    console.log(`   ⏭️  Skipping ${localData.cruiseLines.length} cruise lines (DRAFT)`);
  }

  // Destinations (only if published)
  if (shouldIncludeDetailPages('destinations') && localData.destinations.length > 0) {
    console.log(`   Adding ${localData.destinations.length} destinations (PUBLISHED)...`);
    localData.destinations.forEach(dest => {
      const urlPath = `/destinations/${dest.slug}`;
      if (shouldIncludeInSitemap(urlPath)) {
        const entry = generateUrlEntry(urlPath, '0.8', 'weekly');
        if (entry) {
          urls.push(entry);
          totalCount++;
        }
      }
    });
  } else if (localData.destinations.length > 0) {
    console.log(`   ⏭️  Skipping ${localData.destinations.length} destinations (DRAFT)`);
  }

  // Bucket list experiences (only if published)
  if (shouldIncludeDetailPages('bucketList') && localData.bucketList.length > 0) {
    console.log(`   Adding ${localData.bucketList.length} bucket list experiences (PUBLISHED)...`);
    localData.bucketList.forEach(exp => {
      const urlPath = `/bucket-list/${exp.slug}`;
      if (shouldIncludeInSitemap(urlPath)) {
        const entry = generateUrlEntry(urlPath, '0.7', 'weekly');
        if (entry) {
          urls.push(entry);
          totalCount++;
        }
      }
    });
  } else if (localData.bucketList.length > 0) {
    console.log(`   ⏭️  Skipping ${localData.bucketList.length} bucket list experiences (DRAFT)`);
  }

  // Cruise types (only if published)
  // Note: The app routes use /cruises/:slug, not /cruise-types/:slug for detail pages
  if (shouldIncludeDetailPages('cruiseTypes') && localData.cruiseTypes.length > 0) {
    console.log(`   Adding ${localData.cruiseTypes.length} cruise types as /cruises/:slug (PUBLISHED)...`);
    localData.cruiseTypes.forEach(type => {
      const urlPath = `/cruises/${type.slug}`;
      if (shouldIncludeInSitemap(urlPath)) {
        const entry = generateUrlEntry(urlPath, '0.7', 'weekly');
        if (entry) {
          urls.push(entry);
          totalCount++;
        }
      }
    });
  } else if (localData.cruiseTypes.length > 0) {
    console.log(`   ⏭️  Skipping ${localData.cruiseTypes.length} cruise types (DRAFT)`);
  }

  // 3. Load and add dynamic Supabase data
  console.log('\n🌐 Loading dynamic content from Supabase...');
  const supabaseData = await loadSupabaseData();

  // Travel news articles
  if (supabaseData.travelNews.length > 0) {
    supabaseData.travelNews.forEach(article => {
      const lastmod = article.updated_at ? article.updated_at.split('T')[0] : today;
      const entry = generateUrlEntry(`/travel-news/${article.slug}`, '0.6', 'weekly', lastmod);
      if (entry) {
        urls.push(entry);
        totalCount++;
      }
    });
  }

  // Offers
  if (supabaseData.offers.length > 0) {
    supabaseData.offers.forEach(offer => {
      const lastmod = offer.updated_at ? offer.updated_at.split('T')[0] : today;
      const entry = generateUrlEntry(`/offers/${offer.slug}`, '0.8', 'daily', lastmod);
      if (entry) {
        urls.push(entry);
        totalCount++;
      }
    });
  }

  // Cruise guides
  if (supabaseData.cruiseGuides.length > 0) {
    supabaseData.cruiseGuides.forEach(guide => {
      const lastmod = guide.updated_at ? guide.updated_at.split('T')[0] : today;
      const entry = generateUrlEntry(`/cruise-guides/${guide.slug}`, '0.7', 'weekly', lastmod);
      if (entry) {
        urls.push(entry);
        totalCount++;
      }
    });
  }

  // 4. Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>`;

  // 5. Write to public directory
  const publicDir = join(__dirname, '../public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = join(publicDir, 'sitemap.xml');
  writeFileSync(outputPath, sitemap);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ SITEMAP GENERATED');
  console.log('='.repeat(60));
  console.log(`📄 Total URLs: ${totalCount}`);
  console.log(`📁 Output: public/sitemap.xml`);
  console.log('');
  console.log('❌ EXCLUDED (noindex patterns):');
  console.log('   - /travel-news/category/* (category archives)');
  console.log('   - /travel-news/tag/* (tag archives)');
  console.log('   - /admin/* (admin pages)');
  console.log('   - /preview (preview pages)');
  console.log('='.repeat(60));
}

// Run the generator
generateSitemap().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
