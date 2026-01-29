#!/usr/bin/env node
/**
 * Emergency Fix Script for Damaged Port Guides
 * 
 * Restores detailed content sections for 9 ports that lost their content.
 * Uses template content to restore structure immediately.
 * Content can be regenerated via CRM Port Guides page later.
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Ports that need fixing
const DAMAGED_PORTS = [
  { id: '4d73d2e3-cb48-444e-9ca6-6fa395974aa7', slug: 'las-palmas-gran-canaria', name: 'Las Palmas de Gran Canaria', country: 'Spain' },
  { id: 'c6e8d0c2-4127-4a9b-919d-8ef98ba1df54', slug: 'santa-cruz-de-tenerife', name: 'Santa Cruz de Tenerife', country: 'Spain' },
  { id: 'f7e6dd89-3e41-4270-b72e-39e4de28a37a', slug: 'tangier', name: 'Tangier', country: 'Morocco' },
  { id: '6448aac5-a42e-4f22-904e-c2cab396342b', slug: 'agadir', name: 'Agadir', country: 'Morocco' },
  { id: 'b414e31d-b940-4642-840c-4b9cefd871c8', slug: 'dover', name: 'Dover', country: 'United Kingdom' },
  { id: '8be41680-4073-476c-aabd-3d27b3a4f6bb', slug: 'casablanca', name: 'Casablanca', country: 'Morocco' },
  { id: 'a47e5203-30aa-4180-802b-0cffd52a2156', slug: 'lanzarote', name: 'Lanzarote (Arrecife)', country: 'Spain' },
  { id: 'a25448e8-7794-42a2-9469-e3e89ff26bfd', slug: 'southampton', name: 'Southampton', country: 'United Kingdom' },
  { id: '963b4752-ab98-4542-b65f-6f3b19d09827', slug: 'ponta-delgada-azores', name: 'Ponta Delgada (Azores)', country: 'Portugal' },
];

// Template content based on A Coruña structure (fallback)
function getTemplateContent(portName, country) {
  return {
    content_overview: {
      hook: `Discover ${portName} - a fascinating cruise port in ${country} with rich culture and history.`,
      description: `${portName} welcomes cruise visitors with authentic local experiences. The port offers convenient access to the city centre, making independent exploration easy. Whether you prefer cultural attractions, local cuisine, or simply soaking up the atmosphere, this port has something for everyone.\n\nThe area around the cruise terminal provides immediate access to local life. You'll find cafés, shops, and attractions within walking distance, though some highlights may require transport.`,
      portInfo: {
        dockLocation: "Main Cruise Terminal",
        distanceToTown: "10-15 minutes walk",
        shuttleInfo: "Check with your cruise line for shuttle availability"
      },
      importantNotes: [
        "Siesta hours: Some shops close 2-5pm",
        "Sunday: Many shops closed",
        "Carry water and sun protection in summer"
      ],
      weatherSeasonal: "Mediterranean/Atlantic climate - check seasonal conditions before your visit."
    },
    content_stay_local: {
      tip: `${portName} rewards slow exploration. Don't try to rush - take time to wander, find a café, and soak up the local atmosphere. This is a real working city, not a tourist resort.`,
      quickWalk: [
        {
          title: "Port Area & Waterfront",
          content: "Immediate surroundings of the cruise terminal. Good for orientation and first impressions of the city.",
          terrain: "easy"
        },
        {
          title: "City Centre",
          content: "Main squares and pedestrian areas within easy reach of the port.",
          terrain: "easy"
        }
      ],
      longerWalk: [
        {
          title: "Historic Quarter",
          content: "Explore the old town with its narrow streets, historic buildings, and local shops.",
          terrain: "moderate"
        }
      ],
      coffee: [
        "Cafés around the main square - good for people watching",
        "Local coffee shops in the old town"
      ],
      bars: [
        "Waterfront bars with views",
        "Traditional local bars in the old town"
      ],
      shopping: [
        "Main shopping streets near the centre",
        "Local markets for authentic souvenirs"
      ],
      scenic: [
        "Waterfront promenade",
        "Main square and surrounding architecture"
      ],
      rainyDay: [
        "Local museums",
        "Covered markets",
        "Cafés and restaurants"
      ]
    },
    content_go_further: {
      ourTake: `Unless you've visited ${portName} before, the city itself has plenty to offer. Consider day trips only if you have a long port day and specific interests.`,
      attractions: [
        {
          name: "Nearby Landmark",
          description: "Major attraction in the wider region worth visiting if time permits.",
          terrain: "moderate",
          independent: "Accessible by local transport or taxi",
          cruiseLineOption: "Check cruise line for excursion options"
        }
      ]
    },
    content_with_kids: {
      easyDay: "Walk to the main attractions near port, find a family-friendly café for lunch, then explore at a relaxed pace before returning to the ship.",
      toddlers: [
        "Parks and open spaces for running around",
        "Waterfront areas with space to explore"
      ],
      olderKids: [
        "Local museums with interactive exhibits",
        "Beach areas if available"
      ],
      teens: [
        "Shopping areas",
        "Local food experiences"
      ],
      familyFood: [
        "Family-friendly restaurants near the port",
        "Ice cream shops"
      ],
      warnings: [
        "Cobblestones in old town - buggy unfriendly in places",
        "Spanish/local lunch hours - restaurants may close 4-8pm"
      ]
    },
    content_accessibility: {
      mobility: [
        "Port terminal generally accessible",
        "City centre varies - some cobblestones and slopes",
        "Main attractions have varying accessibility - check specific venues"
      ],
      sensory: [
        "Quieter areas available away from main tourist spots"
      ],
      quietSpots: [
        "Parks and gardens for peaceful breaks",
        "Quieter cafés away from main squares"
      ]
    },
    content_medical: {
      pharmacy: {
        name: "Local pharmacies (Farmacia)",
        location: "City centre - look for green cross signs"
      },
      hospital: {
        name: "Local hospital",
        hasEmergency: true
      },
      tips: [
        "Pharmacies can advise on minor ailments",
        "EU/UK health cards may provide coverage - check before travel",
        "Keep important medications in hand luggage"
      ]
    },
    content_food_drink: {
      localSpeciality: "Ask locally for regional specialities",
      restaurants: [
        {
          name: "Local restaurants",
          description: "Traditional cuisine in authentic settings"
        }
      ],
      drinkingWater: "Bottled water recommended in most destinations",
      tips: [
        "Lunch is typically the main meal",
        "Dinner is served late by UK standards",
        "Tipping varies by country - check local customs"
      ]
    }
  };
}

async function fixPort(port) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Fixing: ${port.name} (${port.slug})`);
  console.log(`${'='.repeat(50)}`);

  // Use template content - can be regenerated via CRM later
  console.log('  Creating content from template...');
  const content = getTemplateContent(port.name, port.country);

  // Update database
  const { error } = await supabase
    .from('ports')
    .update({
      ...content,
      status: 'draft',
      updated_at: new Date().toISOString()
    })
    .eq('id', port.id);

  if (error) {
    console.log(`  ❌ Error updating: ${error.message}`);
    return false;
  }

  console.log(`  ✅ Updated successfully`);
  return true;
}

async function main() {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║  PORT GUIDE EMERGENCY FIX SCRIPT               ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Ports to fix: ${DAMAGED_PORTS.length}`);
  console.log('Using template content - regenerate via CRM for custom content');

  let success = 0;
  let failed = 0;

  for (const port of DAMAGED_PORTS) {
    const result = await fixPort(port);
    if (result) success++;
    else failed++;
  }

  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  
  if (success > 0) {
    console.log('\n✅ Ports have been restored with content.');
    console.log('   Status set to DRAFT - review and publish as needed.');
  }
}

main().catch(console.error);
