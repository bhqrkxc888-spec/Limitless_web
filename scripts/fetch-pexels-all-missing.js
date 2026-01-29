/**
 * Fetch Pexels images for ALL ports missing images
 * 
 * Checks which ports need hero, card, or gallery images
 * and runs fetch-pexels-images.js for each
 */

import { createClient } from '@supabase/supabase-js'
import { spawn } from 'child_process'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BUCKET_NAME = 'WEB_port-guides'

async function main() {
  console.log('🔍 Scanning ports for missing images...\n')

  // Get all ports
  const { data: ports, error } = await supabase
    .from('ports')
    .select('slug, name, status')
    .order('name')

  if (error) {
    console.error('Failed to fetch ports:', error)
    process.exit(1)
  }

  console.log(`📋 Found ${ports.length} total ports\n`)

  const portsNeedingImages = []

  for (const port of ports) {
    // Check for hero.webp
    const { data: heroFile } = await supabase.storage
      .from(BUCKET_NAME)
      .list(port.slug, { search: 'hero.webp' })

    const hasHero = heroFile && heroFile.length > 0

    // Check for card.webp
    const { data: cardFile } = await supabase.storage
      .from(BUCKET_NAME)
      .list(port.slug, { search: 'card.webp' })

    const hasCard = cardFile && cardFile.length > 0

    // Check for overview gallery images
    const { data: overviewImages } = await supabase
      .from('site_images')
      .select('id')
      .eq('port_slug', port.slug)
      .eq('section', 'overview')
      .limit(1)

    const hasOverview = overviewImages && overviewImages.length > 0

    if (!hasHero || !hasCard || !hasOverview) {
      portsNeedingImages.push({
        slug: port.slug,
        name: port.name,
        missing: {
          hero: !hasHero,
          card: !hasCard,
          overview: !hasOverview,
        }
      })
    }
  }

  console.log(`\n📊 ${portsNeedingImages.length} ports need images:\n`)
  
  portsNeedingImages.forEach(port => {
    const missing = []
    if (port.missing.hero) missing.push('hero')
    if (port.missing.card) missing.push('card')
    if (port.missing.overview) missing.push('overview')
    console.log(`  ⚠️  ${port.name} (${port.slug}) - missing: ${missing.join(', ')}`)
  })

  if (portsNeedingImages.length === 0) {
    console.log('\n✅ All ports have images!')
    return
  }

  console.log(`\n🚀 Starting batch fetch for ${portsNeedingImages.length} ports...\n`)

  let success = 0
  let failed = 0

  for (let i = 0; i < portsNeedingImages.length; i++) {
    const port = portsNeedingImages[i]
    console.log(`\n[${ i + 1}/${portsNeedingImages.length}] Processing: ${port.name}`)
    console.log('━'.repeat(60))

    try {
      await runPexelsFetch(port.slug)
      success++
      console.log(`✅ ${port.name} completed`)
    } catch (err) {
      failed++
      console.error(`❌ ${port.name} failed:`, err.message)
    }

    // Rate limiting between ports
    if (i < portsNeedingImages.length - 1) {
      console.log('\n⏳ Waiting 3 seconds before next port...')
      await sleep(3000)
    }
  }

  console.log('\n' + '━'.repeat(60))
  console.log(`📊 Summary: ${success} succeeded, ${failed} failed`)
  console.log('━'.repeat(60))
}

function runPexelsFetch(portSlug) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [
      'scripts/fetch-pexels-images.js',
      `--port=${portSlug}`
    ], {
      stdio: 'inherit'
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })

    child.on('error', reject)
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

main().catch(console.error)
