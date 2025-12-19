#!/usr/bin/env node

/**
 * SEO Validation Script
 * 
 * Validates that prerendered HTML files contain correct SEO meta tags.
 * Run after building with prerendering to verify SEO compliance.
 * 
 * Usage:
 *   node scripts/validate-seo.js
 * 
 * Outputs:
 *   - reports/seo-validation-report.json
 *   - Console summary
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const DIST_DIR = join(__dirname, '../dist');
const REPORTS_DIR = join(__dirname, '../reports');
const SITE_URL = 'https://limitlesscruises.com';

// Import route classification
async function loadRouteClassification() {
  try {
    // Use file:// URL for ESM import to ensure proper resolution
    const policyPath = new URL('../src/utils/seoPolicy.js', import.meta.url);
    const policyModule = await import(policyPath.href);
    return policyModule.ROUTE_CLASSIFICATION;
  } catch (error) {
    console.log('ℹ️  Using built-in noindex patterns (SEO policy not loaded)');
    return {
      indexable: { static: [], dynamic: [] },
      noindex: [],
      blocked: [],
    };
  }
}

// Built-in noindex patterns (matches seoPolicy.js)
const NOINDEX_PATTERNS = [
  /^\/travel-news\/category\/.*/,
  /^\/travel-news\/tag\/.*/,
  /^\/admin(\/.*)?$/,
  /^\/preview(\/.*)?$/,
  /^\/search(\/.*)?$/,
  /^\/account(\/.*)?$/,
  /^\/login(\/.*)?$/,
  /^\/register(\/.*)?$/,
  /^\/cart(\/.*)?$/,
  /^\/checkout(\/.*)?$/,
];

// Load sitemap URLs
function loadSitemapUrls() {
  const sitemapPath = join(DIST_DIR, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.log('⚠️  sitemap.xml not found in dist/');
    return [];
  }

  const content = readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const locMatches = content.matchAll(/<loc>([^<]+)<\/loc>/g);
  for (const match of locMatches) {
    urls.push(match[1].replace(SITE_URL, ''));
  }
  return urls;
}

// Find all HTML files in dist
function findHtmlFiles(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip assets directory
      if (item !== 'assets') {
        findHtmlFiles(fullPath, files);
      }
    } else if (item === 'index.html') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Parse HTML and extract SEO elements
function parseHtml(html) {
  const result = {
    title: null,
    description: null,
    canonical: null,
    robots: null,
    ogTitle: null,
    ogDescription: null,
    ogUrl: null,
    ogImage: null,
    twitterCard: null,
    twitterTitle: null,
    jsonLd: [],
  };

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) result.title = titleMatch[1];

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                   html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  if (descMatch) result.description = descMatch[1];

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                        html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  if (canonicalMatch) result.canonical = canonicalMatch[1];

  // Robots
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i) ||
                     html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']robots["']/i);
  if (robotsMatch) result.robots = robotsMatch[1];

  // Open Graph
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  if (ogTitleMatch) result.ogTitle = ogTitleMatch[1];

  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  if (ogDescMatch) result.ogDescription = ogDescMatch[1];

  const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i);
  if (ogUrlMatch) result.ogUrl = ogUrlMatch[1];

  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  if (ogImageMatch) result.ogImage = ogImageMatch[1];

  // Twitter
  const twitterCardMatch = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i);
  if (twitterCardMatch) result.twitterCard = twitterCardMatch[1];

  const twitterTitleMatch = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']*)["']/i);
  if (twitterTitleMatch) result.twitterTitle = twitterTitleMatch[1];

  // JSON-LD
  const jsonLdMatches = html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of jsonLdMatches) {
    try {
      const data = JSON.parse(match[1]);
      result.jsonLd.push(data);
    } catch {
      // Invalid JSON-LD
    }
  }

  return result;
}

// Check for tracking params in URL
function hasTrackingParams(url) {
  const trackingParams = ['utm_', 'gclid', 'fbclid', 'msclkid', 'dclid'];
  return trackingParams.some(param => url.includes(param));
}

// Validate a single page
function validatePage(filePath, path) {
  const html = readFileSync(filePath, 'utf-8');
  const seo = parseHtml(html);
  
  const issues = [];
  const warnings = [];
  
  // Determine if this should be indexable using built-in patterns
  const shouldBeNoindex = NOINDEX_PATTERNS.some(p => p.test(path));
  
  if (shouldBeNoindex) {
    // Noindex page validation
    if (!seo.robots || !seo.robots.toLowerCase().includes('noindex')) {
      issues.push('Missing noindex in robots meta');
    }
  } else {
    // Indexable page validation
    if (!seo.title) {
      issues.push('Missing title tag');
    } else if (seo.title.length < 30) {
      warnings.push('Title too short (< 30 chars)');
    } else if (seo.title.length > 70) {
      warnings.push('Title too long (> 70 chars)');
    }

    if (!seo.description) {
      issues.push('Missing meta description');
    } else if (seo.description.length < 100) {
      warnings.push('Description too short (< 100 chars)');
    } else if (seo.description.length > 160) {
      warnings.push('Description too long (> 160 chars)');
    }

    if (!seo.canonical) {
      issues.push('Missing canonical link');
    } else if (hasTrackingParams(seo.canonical)) {
      issues.push('Canonical contains tracking parameters');
    }

    if (seo.robots && seo.robots.toLowerCase().includes('noindex')) {
      issues.push('Indexable page has noindex');
    }

    if (!seo.ogTitle) {
      warnings.push('Missing og:title');
    }

    if (!seo.ogDescription) {
      warnings.push('Missing og:description');
    }

    if (!seo.ogUrl) {
      warnings.push('Missing og:url');
    }

    if (!seo.twitterCard) {
      warnings.push('Missing twitter:card');
    }
  }

  return {
    path,
    filePath: relative(DIST_DIR, filePath),
    seo,
    issues,
    warnings,
    isValid: issues.length === 0,
    shouldBeNoindex,
  };
}

// Main validation function
async function validateSEO() {
  console.log('🔍 SEO Validation Script\n');
  console.log('='.repeat(60));

  // Check if dist folder exists
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ folder not found. Run "npm run build:ssg" first.');
    process.exit(1);
  }

  // Load route classification
  const routeClassification = await loadRouteClassification();

  // Load sitemap
  const sitemapUrls = loadSitemapUrls();
  console.log(`📄 Sitemap contains ${sitemapUrls.length} URLs\n`);

  // Find all HTML files
  const htmlFiles = findHtmlFiles(DIST_DIR);
  console.log(`📁 Found ${htmlFiles.length} HTML files in dist/\n`);

  // Validate each file
  const results = [];
  const indexableResults = [];
  const noindexResults = [];

  for (const filePath of htmlFiles) {
    // Determine the route path
    let path = relative(DIST_DIR, dirname(filePath));
    path = path ? `/${path}` : '/';
    
    const result = validatePage(filePath, path);
    results.push(result);

    if (result.shouldBeNoindex) {
      noindexResults.push(result);
    } else {
      indexableResults.push(result);
    }
  }

  // Check sitemap compliance
  const sitemapIssues = [];

  // Check for noindex pages in sitemap
  for (const url of sitemapUrls) {
    if (NOINDEX_PATTERNS.some(p => p.test(url))) {
      sitemapIssues.push(`Noindex page in sitemap: ${url}`);
    }
  }

  // Check for duplicate URLs in sitemap
  const urlSet = new Set();
  for (const url of sitemapUrls) {
    if (urlSet.has(url)) {
      sitemapIssues.push(`Duplicate URL in sitemap: ${url}`);
    }
    urlSet.add(url);
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: results.length,
      indexablePages: indexableResults.length,
      noindexPages: noindexResults.length,
      pagesWithIssues: results.filter(r => r.issues.length > 0).length,
      pagesWithWarnings: results.filter(r => r.warnings.length > 0).length,
      sitemapUrls: sitemapUrls.length,
      sitemapIssues: sitemapIssues.length,
    },
    indexablePages: indexableResults,
    noindexPages: noindexResults,
    sitemapIssues,
  };

  // Write report
  if (!existsSync(REPORTS_DIR)) {
    mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const reportPath = join(REPORTS_DIR, 'seo-validation-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Console summary
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));
  console.log(`📄 Total pages validated: ${results.length}`);
  console.log(`   ├─ Indexable: ${indexableResults.length}`);
  console.log(`   └─ Noindex: ${noindexResults.length}`);
  console.log('');

  const pagesWithIssues = results.filter(r => r.issues.length > 0);
  const pagesWithWarnings = results.filter(r => r.warnings.length > 0);

  if (pagesWithIssues.length === 0) {
    console.log('✅ All pages pass SEO validation!');
  } else {
    console.log(`❌ ${pagesWithIssues.length} page(s) have issues:`);
    pagesWithIssues.forEach(p => {
      console.log(`   ${p.path}`);
      p.issues.forEach(i => console.log(`      ❌ ${i}`));
    });
  }

  console.log('');

  if (pagesWithWarnings.length > 0) {
    console.log(`⚠️  ${pagesWithWarnings.length} page(s) have warnings:`);
    pagesWithWarnings.slice(0, 5).forEach(p => {
      console.log(`   ${p.path}`);
      p.warnings.forEach(w => console.log(`      ⚠️  ${w}`));
    });
    if (pagesWithWarnings.length > 5) {
      console.log(`   ... and ${pagesWithWarnings.length - 5} more`);
    }
  }

  console.log('');
  console.log('🗺️  SITEMAP VALIDATION');
  console.log('='.repeat(60));
  console.log(`📄 Sitemap URLs: ${sitemapUrls.length}`);
  
  if (sitemapIssues.length === 0) {
    console.log('✅ Sitemap is valid!');
  } else {
    console.log(`❌ ${sitemapIssues.length} sitemap issue(s):`);
    sitemapIssues.forEach(i => console.log(`   ❌ ${i}`));
  }

  console.log('');
  console.log(`📁 Full report: ${reportPath}`);
  console.log('='.repeat(60));

  // Exit with error code if there are issues
  if (pagesWithIssues.length > 0 || sitemapIssues.length > 0) {
    process.exit(1);
  }
}

// Run validation
validateSEO().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

