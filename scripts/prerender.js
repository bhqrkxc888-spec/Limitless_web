#!/usr/bin/env node

/**
 * Prerender Script - Static Site Generation for React SPA
 * 
 * This script prerenders all indexable routes to static HTML files,
 * ensuring SEO meta tags and structured data are in the initial HTML response.
 * 
 * Usage:
 *   node scripts/prerender.js
 * 
 * Prerequisites:
 *   npm install puppeteer --save-dev
 * 
 * How it works:
 *   1. Starts a local server serving the built dist folder
 *   2. Uses Puppeteer to visit each route
 *   3. Waits for React to render and SEO component to inject meta tags
 *   4. Captures the final HTML with all meta tags in <head>
 *   5. Writes prerendered HTML to the appropriate path in dist/
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const DIST_DIR = join(__dirname, '../dist');
const TIMEOUT = 45000; // 45 seconds per page (increased for slow routes)
const MAX_RETRIES = 2; // Retry failed pages up to 2 times

// Dynamic port and base URL (set after server starts)
let BASE_URL = '';

// Load route data (ONLY published routes)
async function loadRoutes() {
  try {
    // Import publish status config
    const publishStatusModule = await import('../src/config/publishStatus.js');
    const { getPublishedRoutes, shouldIncludeDetailPages } = publishStatusModule;

    // Import data files
    const cruiseLinesModule = await import('../src/data/cruiseLines.js');
    const destinationsModule = await import('../src/data/destinations.js');
    const bucketListModule = await import('../src/data/bucketList.js');
    const cruiseTypesModule = await import('../src/data/cruiseTypes.js');

    const cruiseLines = cruiseLinesModule.cruiseLines || [];
    const destinations = destinationsModule.destinations || [];
    const bucketList = bucketListModule.bucketListExperiences || [];
    const cruiseTypes = cruiseTypesModule.cruiseTypes || [];

    // Get published static routes from config
    const staticRoutes = getPublishedRoutes();

    // Dynamic routes from data (ONLY if section is published)
    const dynamicRoutes = [];
    
    if (shouldIncludeDetailPages('cruiseLines')) {
      dynamicRoutes.push(...cruiseLines.map(line => `/cruise-lines/${line.slug}`));
    }
    
    if (shouldIncludeDetailPages('destinations')) {
      dynamicRoutes.push(...destinations.map(dest => `/destinations/${dest.slug}`));
    }
    
    if (shouldIncludeDetailPages('bucketList')) {
      dynamicRoutes.push(...bucketList.map(exp => `/bucket-list/${exp.slug}`));
    }
    
    if (shouldIncludeDetailPages('cruiseTypes')) {
      // Cruise types use /cruises/:slug route pattern (CategoryPage)
      dynamicRoutes.push(...cruiseTypes.map(type => `/cruises/${type.slug}`));
    }

    // Note: Travel news articles, offers, and cruise guides are dynamic from Supabase
    // They would need to be fetched from the API to include in prerendering
    // For now, we prerender the hub pages which are the most important for SEO

    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    console.log(`   ℹ️  Prerendering ${allRoutes.length} published routes (draft/preview excluded)`);
    
    return allRoutes;
  } catch (error) {
    console.error('Error loading routes:', error);
    return ['/'];
  }
}

// Simple static file server
function createStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      // Use URL constructor instead of deprecated url.parse
      const parsedUrl = new URL(req.url, BASE_URL);
      let pathname = parsedUrl.pathname;

      // Normalize pathname
      if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1);
      }

      // Try to serve the file directly
      let filePath = join(DIST_DIR, pathname);
      
      // If it's a directory or doesn't exist, serve index.html (SPA fallback)
      if (!existsSync(filePath) || !filePath.includes('.')) {
        filePath = join(DIST_DIR, 'index.html');
      }

      // Check for specific file extensions
      if (existsSync(filePath)) {
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'gif': 'image/gif',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon',
          'woff': 'font/woff',
          'woff2': 'font/woff2',
          'ttf': 'font/ttf',
          'webp': 'image/webp',
        };

        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.end(readFileSync(filePath));
      } else {
        res.statusCode = 404;
        res.end('Not found');
      }
    });

    // Use port 0 to let OS pick a free port
    server.listen(0, () => {
      const port = server.address().port;
      BASE_URL = `http://localhost:${port}`;
      console.log(`📦 Static server running on ${BASE_URL}`);
      resolve(server);
    });

    server.on('error', reject);
  });
}

// Prerender a single route with retry logic
async function prerenderRoute(browser, route, retryCount = 0) {
  const page = await browser.newPage();
  
  try {
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Disable images and fonts for faster rendering (optional optimization)
    // await page.setRequestInterception(true);
    // page.on('request', (req) => {
    //   if (['image', 'font'].includes(req.resourceType())) {
    //     req.abort();
    //   } else {
    //     req.continue();
    //   }
    // });

    // Navigate to the route
    const url = `${BASE_URL}${route}`;
    if (retryCount > 0) {
      console.log(`   🔄 Retry ${retryCount}/${MAX_RETRIES}: ${route}`);
    } else {
      console.log(`   Rendering: ${route}`);
    }
    
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: TIMEOUT,
    });

    // Wait for SEO component to set the data-seo-ready attribute
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-seo-ready') === 'true',
      { timeout: 10000 }
    ).catch(() => {
      console.log(`   ⚠️  SEO ready signal not received for ${route}, continuing anyway...`);
    });

    // Additional wait for any async content
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get the fully rendered HTML
    const html = await page.content();

    // Basic validation of rendered HTML
    if (!html.includes('<title>') || !html.includes('canonical')) {
      throw new Error('HTML appears incomplete (missing title or canonical)');
    }

    // Determine the output path
    let outputPath;
    if (route === '/') {
      outputPath = join(DIST_DIR, 'index.html');
    } else {
      // Create directory structure for the route
      const routeDir = join(DIST_DIR, route);
      if (!existsSync(routeDir)) {
        mkdirSync(routeDir, { recursive: true });
      }
      outputPath = join(routeDir, 'index.html');
    }

    // Write the prerendered HTML
    writeFileSync(outputPath, html);
    console.log(`   ✅ Saved: ${outputPath.replace(DIST_DIR, 'dist')}`);

    return { route, success: true, retries: retryCount };
  } catch (error) {
    // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Error on attempt ${retryCount + 1}, retrying...`);
      await page.close();
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
      return prerenderRoute(browser, route, retryCount + 1);
    }
    
    console.error(`   ❌ Error rendering ${route} (after ${retryCount} retries):`, error.message);
    return { route, success: false, error: error.message, retries: retryCount };
  } finally {
    if (page && !page.isClosed()) {
      await page.close();
    }
  }
}

// Main prerender function
async function prerender() {
  console.log('🚀 Starting prerender process...\n');

  // Check if dist folder exists
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Load routes to prerender
  console.log('📋 Loading routes...');
  const routes = await loadRoutes();
  console.log(`   Found ${routes.length} routes to prerender\n`);

  let server;
  let browser;

  try {
    // Start static server
    server = await createStaticServer();

    // Launch Puppeteer
    console.log('\n🌐 Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Prerender all routes
    console.log('\n📄 Prerendering routes...\n');
    const results = [];
    
    for (const route of routes) {
      const result = await prerenderRoute(browser, route);
      results.push(result);
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success);
    const withRetries = results.filter(r => r.success && r.retries > 0);

    console.log('\n' + '='.repeat(60));
    console.log('📊 PRERENDER SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successful}/${routes.length}`);
    
    if (withRetries.length > 0) {
      console.log(`🔄 Required retries: ${withRetries.length}`);
      withRetries.forEach(r => console.log(`   - ${r.route} (${r.retries} ${r.retries === 1 ? 'retry' : 'retries'})`));
    }
    
    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length}`);
      failed.forEach(f => console.log(`   - ${f.route}: ${f.error}`));
      console.log('\n💡 Tip: Failed routes may need longer timeout or manual investigation.');
    }

    console.log('\n✨ Prerendering complete!');
    console.log('   Your dist/ folder now contains prerendered HTML with SEO meta tags.');
    
    if (successful === routes.length) {
      console.log('   🎉 All routes prerendered successfully!\n');
    } else {
      console.log(`   ⚠️  ${failed.length} route(s) failed. Review errors above.\n`);
    }

    // Return exit code (0 if all succeeded, 1 if any failed)
    process.exit(failed.length > 0 ? 1 : 0);
  } finally {
    // Always close browser and server
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.close();
    }
  }
}

// Run the prerender
prerender().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

