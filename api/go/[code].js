/**
 * Short Link Redirect Handler
 * 
 * Handles www.limitlesscruises.com/go/abc123 redirects to original URLs
 * Reads from crm.short_links table and tracks clicks
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    return res.redirect(302, '/')
  }

  try {
    // Look up the short link in crm.short_links
    const { data: link, error } = await supabase
      .schema('crm')
      .from('short_links')
      .select('*')
      .eq('short_code', code)
      .single()

    if (error || !link) {
      console.warn(`[short-link] Code not found: ${code}`)
      // Redirect to homepage if not found
      return res.redirect(302, '/')
    }

    // Increment click count (fire and forget)
    supabase
      .schema('crm')
      .from('short_links')
      .update({ 
        click_count: (link.click_count || 0) + 1,
        last_clicked_at: new Date().toISOString()
      })
      .eq('id', link.id)
      .then(() => {})
      .catch(err => console.error('[short-link] Failed to update click count:', err))

    // Redirect to original URL
    return res.redirect(302, link.original_url)
  } catch (error) {
    console.error('[short-link] Error:', error)
    return res.redirect(302, '/')
  }
}

