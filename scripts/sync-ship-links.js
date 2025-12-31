/**
 * Sync Ship Links from CRM Database
 * 
 * Fetches ship_info_url from crm.cruise_ships and updates
 * src/config/shipLinks.js
 * 
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/sync-ship-links.js
 * 
 * Or add to package.json:
 *   "sync:ship-links": "node scripts/sync-ship-links.js"
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ADMIN_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncShipLinks() {
  console.log('Fetching ship links from CRM database...');
  
  try {
    // Fetch all active ships with their info URLs
    const { data: ships, error } = await supabase
      .schema('crm')
      .from('cruise_ships')
      .select('ship_name, ship_info_url')
      .eq('is_active', true)
      .is('archived_at', null)
      .not('ship_info_url', 'is', null);
    
    if (error) {
      throw error;
    }
    
    if (!ships || ships.length === 0) {
      console.log('No ships with info URLs found in CRM database.');
      return;
    }
    
    console.log(`Found ${ships.length} ships with info URLs`);
    
    // Build ship links object
    const shipLinks = {};
    ships.forEach(ship => {
      if (ship.ship_name && ship.ship_info_url) {
        // Extract slug from URL if it's a full Widgety URL
        // Format: https://.../ships/{slug}.widget or just {slug}
        let slug = ship.ship_info_url;
        
        // If it's a full URL, extract the slug
        const urlMatch = ship.ship_info_url.match(/ships\/([^\/\?]+)/);
        if (urlMatch) {
          slug = urlMatch[1].replace('.widget', '');
        } else if (ship.ship_info_url.includes('widgety-state')) {
          // Extract from widgety-state parameter
          const stateMatch = ship.ship_info_url.match(/widgety-state=.*?ships%2F([^%]+)/);
          if (stateMatch) {
            slug = decodeURIComponent(stateMatch[1]).replace('.widget', '');
          }
        }
        
        shipLinks[ship.ship_name] = slug;
      }
    });
    
    // Read current config file
    const configPath = join(rootDir, 'src/config/shipLinks.js');
    let configContent = readFileSync(configPath, 'utf8');
    
    // Build the shipLinks object as a formatted string
    const entries = Object.entries(shipLinks)
      .map(([name, slug]) => `  '${name.replace(/'/g, "\\'")}': '${slug}',`)
      .join('\n');
    
    const newShipLinksObject = `export const shipLinks = {\n${entries}\n};`;
    
    // Replace the shipLinks export
    const exportRegex = /export const shipLinks = \{[\s\S]*?\};/;
    configContent = configContent.replace(exportRegex, newShipLinksObject);
    
    // Write updated config
    writeFileSync(configPath, configContent, 'utf8');
    
    console.log(`✅ Synced ${Object.keys(shipLinks).length} ship links to ${configPath}`);
    console.log('\nShip links synced:');
    Object.entries(shipLinks).forEach(([name, slug]) => {
      console.log(`  ${name}: ${slug}`);
    });
    
  } catch (error) {
    console.error('Error syncing ship links:', error);
    process.exit(1);
  }
}

// Run sync
syncShipLinks();

