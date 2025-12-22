import { supabase } from '../lib/supabase'

/**
 * Fetch all published cruise guides with optional filters
 * @param {Object} options - Filter options
 * @param {number} options.limit - Max number of guides to return
 * @param {number} options.offset - Pagination offset
 * @param {boolean} options.featured - Filter for featured guides only
 * @param {string} options.guideType - Filter by guide type
 * @param {string} options.cruiseLineSlug - Filter by cruise line
 * @param {string} options.destinationSlug - Filter by destination
 * @returns {Promise<{guides: Array, total: number}>}
 */
export async function getCruiseGuides(options = {}) {
  const { 
    limit = 50, 
    offset = 0, 
    featured = null,
    guideType = null,
    cruiseLineSlug = null,
    destinationSlug = null,
  } = options

  try {
    const { data, error } = await supabase.rpc('get_cruise_guides_public', {
      p_limit: limit,
      p_offset: offset,
      p_featured: featured,
      p_guide_type: guideType,
      p_cruise_line_slug: cruiseLineSlug,
      p_destination_slug: destinationSlug,
    })

    if (error) {
      console.error('Error fetching cruise guides:', error)
      return { guides: [], total: 0 }
    }

    if (!data) {
      return { guides: [], total: 0 }
    }

    return {
      guides: data.guides || [],
      total: data.total || 0,
    }
  } catch (err) {
    console.error('Error in getCruiseGuides:', err)
    return { guides: [], total: 0 }
  }
}

/**
 * Fetch a single guide by its slug
 * @param {string} slug - Guide slug
 * @returns {Promise<Object|null>}
 */
export async function getCruiseGuideBySlug(slug) {
  if (!slug) return null

  try {
    const { data, error } = await supabase.rpc('get_cruise_guide_by_slug_public', {
      p_slug: slug,
    })

    if (error) {
      console.error('Error fetching guide by slug:', error)
      return null
    }

    // Increment view count (fire and forget)
    if (data?.id) {
      supabase.rpc('increment_cruise_guide_view', { p_guide_id: data.id })
        .then(() => {})
        .catch((err) => console.error('Failed to increment view count:', err))
    }

    return data || null
  } catch (err) {
    console.error('Error in getCruiseGuideBySlug:', err)
    return null
  }
}

/**
 * Fetch cruise guides for a specific cruise line
 * @param {string} cruiseLineSlug - Cruise line slug
 * @param {number} limit - Max guides to return
 * @returns {Promise<Array>}
 */
export async function getCruiseGuidesByCruiseLine(cruiseLineSlug, limit = 6) {
  if (!cruiseLineSlug) return []

  const result = await getCruiseGuides({
    cruiseLineSlug,
    limit,
  })

  return result.guides || []
}

/**
 * Fetch cruise guides for a specific destination
 * @param {string} destinationSlug - Destination slug
 * @param {number} limit - Max guides to return
 * @returns {Promise<Array>}
 */
export async function getCruiseGuidesByDestination(destinationSlug, limit = 6) {
  if (!destinationSlug) return []

  const result = await getCruiseGuides({
    destinationSlug,
    limit,
  })

  return result.guides || []
}

/**
 * Fetch featured guides for homepage
 * @param {number} limit - Max guides to return
 * @returns {Promise<Array>}
 */
export async function getFeaturedCruiseGuides(limit = 3) {
  const result = await getCruiseGuides({
    featured: true,
    limit,
  })

  return result.guides || []
}

