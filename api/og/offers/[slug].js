/**
 * Dynamic OG Tags API for Offers
 * 
 * This Edge Function serves the website HTML with modified OG tags
 * for social media crawlers (Facebook, Twitter, etc.)
 * 
 * Vercel rewrites bot traffic to this endpoint, which:
 * 1. Fetches the offer data from Supabase
 * 2. Builds the HTML with correct OG tags
 * 3. Returns the modified HTML so crawlers see the right metadata
 */

import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'edge',
}

// Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Fetch offer by slug
async function fetchOffer(slug) {
  const supabase = getSupabaseClient()
  if (!supabase) return null
  
  try {
    const { data, error } = await supabase
      .from('website_offers')
      .select('id, title, slug, short_description, full_description, card_image_url, hero_image_url, meta_title, meta_description, price_from')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) {
      console.error('Error fetching offer:', error)
      return null
    }
    
    return data
  } catch (err) {
    console.error('Supabase fetch error:', err)
    return null
  }
}

// Generate minimal HTML with OG tags for crawlers
function generateOGHTML(offer, slug) {
  const title = offer.meta_title || `${offer.title} | Cruise Offer`
  const description = offer.meta_description || offer.short_description || 
    (offer.full_description ? offer.full_description.substring(0, 160) : 'Exclusive cruise offer from Limitless Cruises')
  const image = offer.card_image_url || offer.hero_image_url || 
    'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/og-image.jpeg'
  const url = `https://www.limitlesscruises.com/offers/${slug}`
  const siteName = 'Limitless Cruises'
  
  // Escape HTML entities
  const escapeHtml = (str) => {
    if (!str) return ''
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description.substring(0, 300))
  
  // Return full HTML page with OG tags and redirect for real users
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}" />
  <meta name="author" content="Limitless Cruises" />
  <meta name="robots" content="index, follow" />
  
  <!-- Canonical -->
  <link rel="canonical" href="${url}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${safeTitle}" />
  <meta property="og:site_name" content="${siteName}" />
  <meta property="og:locale" content="en_GB" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${image}" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/favicon.webp" />
  
  <!-- Redirect non-bot users to the real page -->
  <script>
    // Bots don't execute JS, so this only runs for real users
    window.location.replace('${url}');
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=${url}" />
  </noscript>
</head>
<body>
  <p>Redirecting to <a href="${url}">${safeTitle}</a>...</p>
</body>
</html>`
}

// Default HTML for not found
function generateNotFoundHTML(slug) {
  const url = `https://www.limitlesscruises.com/offers/${slug}`
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <title>Offer Not Found | Limitless Cruises</title>
  <meta name="robots" content="noindex" />
  <script>window.location.replace('${url}');</script>
  <noscript><meta http-equiv="refresh" content="0;url=${url}" /></noscript>
</head>
<body><p>Redirecting...</p></body>
</html>`
}

export default async function handler(request) {
  const url = new URL(request.url)
  const slug = url.pathname.split('/').pop()
  
  if (!slug) {
    return new Response(generateNotFoundHTML(''), {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  }
  
  try {
    const offer = await fetchOffer(slug)
    
    if (!offer) {
      return new Response(generateNotFoundHTML(slug), {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    }
    
    const html = generateOGHTML(offer, slug)
    
    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('OG handler error:', error)
    return new Response(generateNotFoundHTML(slug), {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  }
}
