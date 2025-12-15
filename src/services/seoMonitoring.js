/**
 * SEO Monitoring Service
 * 
 * Analyzes SEO elements on each page and logs metrics to Supabase.
 * All metrics are sent to crm.website_seo_metrics and crm.website_seo_pages tables.
 */

import { supabase } from '../lib/supabase'

// Capability flags - track if RPC functions exist to avoid unnecessary 404s
const CAPABILITY_KEY_PAGE_UPDATE = 'seo_monitoring_page_update_available'
const CAPABILITY_KEY_METRIC_LOG = 'seo_monitoring_metric_log_available'

/**
 * Check if a capability is available (cached in sessionStorage)
 * @param {string} key - Capability key
 * @returns {boolean|null} - true if available, false if unavailable, null if unknown
 */
function getCapability(key) {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return null
  }
  const value = sessionStorage.getItem(key)
  if (value === null) return null
  return value === 'true'
}

/**
 * Set capability availability
 * @param {string} key - Capability key
 * @param {boolean} available - Whether the capability is available
 */
function setCapability(key, available) {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return
  }
  sessionStorage.setItem(key, String(available))
}

/**
 * Extracts page path from URL
 * @param {string} url - Full URL
 * @returns {string} Page path
 */
function getPagePath(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname + urlObj.search
  } catch {
    return url || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : null)
  }
}

/**
 * Determines page type from path
 * @param {string} path - Page path
 * @returns {string} Page type
 */
function getPageType(path) {
  if (!path) return 'other'
  
  const normalizedPath = path.toLowerCase()
  
  if (normalizedPath === '/' || normalizedPath === '') return 'home'
  if (normalizedPath.includes('/category/')) return 'category'
  if (normalizedPath.includes('/destination/')) return 'destination'
  if (normalizedPath.includes('/offer/')) return 'offer'
  if (normalizedPath.includes('/travel-news/')) return 'article'
  if (normalizedPath.includes('/bucket-list/')) return 'bucket_list'
  if (normalizedPath.includes('/about') || normalizedPath.includes('/contact') || normalizedPath.includes('/find-a-cruise')) return 'static'
  
  return 'other'
}

/**
 * Gets meta tag content
 * @param {string} name - Meta tag name or property
 * @param {string} attribute - 'name' or 'property'
 * @returns {string|null} Meta tag content
 */
function getMetaTag(name, attribute = 'name') {
  if (typeof document === 'undefined') return null
  const meta = document.querySelector(`meta[${attribute}="${name}"]`)
  return meta ? meta.getAttribute('content') : null
}

/**
 * Checks title tag
 * @returns {object} Title analysis
 */
function analyzeTitle() {
  if (typeof document === 'undefined') {
    return { status: 'info', value: null, length: 0, details: {} }
  }
  
  const title = document.title || ''
  const length = title.length
  let status = 'pass'
  const details = { actual_value: title }
  
  if (!title || length === 0) {
    status = 'fail'
    details.recommendation = 'Add a title tag'
  } else if (length < 30) {
    status = 'warning'
    details.recommendation = 'Title is too short (recommended: 30-60 characters)'
  } else if (length > 70) {
    status = 'warning'
    details.recommendation = 'Title is too long (recommended: 30-60 characters)'
  } else if (length >= 30 && length <= 60) {
    status = 'pass'
  }
  
  return { status, value: title, length, details }
}

/**
 * Checks meta description
 * @returns {object} Description analysis
 */
function analyzeDescription() {
  const description = getMetaTag('description')
  const length = description ? description.length : 0
  let status = 'pass'
  const details = {}
  
  if (!description || length === 0) {
    status = 'fail'
    details.recommendation = 'Add a meta description'
  } else {
    details.actual_value = description
    if (length < 120) {
      status = 'warning'
      details.recommendation = 'Description is too short (recommended: 120-160 characters)'
    } else if (length > 180) {
      status = 'warning'
      details.recommendation = 'Description is too long (recommended: 120-160 characters)'
    } else if (length >= 120 && length <= 160) {
      status = 'pass'
    }
  }
  
  return { status, value: description, length, details }
}

/**
 * Checks H1 tags
 * @returns {object} H1 analysis
 */
function analyzeH1() {
  if (typeof document === 'undefined') {
    return { status: 'info', count: 0, details: {} }
  }
  
  const h1Tags = document.querySelectorAll('h1')
  const count = h1Tags.length
  let status = 'pass'
  const details = { h1_texts: Array.from(h1Tags).map(h => h.textContent?.trim()).filter(Boolean) }
  
  if (count === 0) {
    status = 'warning'
    details.recommendation = 'Add an H1 tag to the page'
  } else if (count > 1) {
    status = 'warning'
    details.recommendation = 'Use only one H1 tag per page'
  }
  
  return { status, count, details }
}

/**
 * Analyzes heading structure
 * @returns {object} Heading structure analysis
 */
function analyzeHeadings() {
  if (typeof document === 'undefined') {
    return { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, details: {} }
  }
  
  const headings = {
    h1: document.querySelectorAll('h1').length,
    h2: document.querySelectorAll('h2').length,
    h3: document.querySelectorAll('h3').length,
    h4: document.querySelectorAll('h4').length,
    h5: document.querySelectorAll('h5').length,
    h6: document.querySelectorAll('h6').length
  }
  
  return { ...headings, details: {} }
}

/**
 * Analyzes content length
 * @returns {object} Content analysis
 */
function analyzeContent() {
  if (typeof document === 'undefined') {
    return { wordCount: 0, charCount: 0, status: 'info', details: {} }
  }
  
  // Get main content (try common content selectors)
  const mainContent = document.querySelector('main') || 
                      document.querySelector('article') || 
                      document.querySelector('[role="main"]') ||
                      document.body
  
  const text = mainContent.textContent || ''
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
  const charCount = text.length
  let status = 'pass'
  const details = {}
  
  if (wordCount < 200) {
    status = 'warning'
    details.recommendation = 'Add more content (recommended: 300+ words)'
  } else if (wordCount < 300) {
    status = 'warning'
  }
  
  return { wordCount, charCount, status, details }
}

/**
 * Analyzes images and alt text
 * @returns {object} Image analysis
 */
function analyzeImages() {
  if (typeof document === 'undefined') {
    return { total: 0, withAlt: 0, withoutAlt: 0, percentage: 0, status: 'info', details: {} }
  }
  
  const images = document.querySelectorAll('img')
  const total = images.length
  let withAlt = 0
  let withoutAlt = 0
  const missingAlt = []
  
  images.forEach(img => {
    const alt = img.getAttribute('alt')
    if (alt !== null && alt.trim() !== '') {
      withAlt++
    } else {
      withoutAlt++
      const src = img.getAttribute('src') || 'unknown'
      missingAlt.push(src.substring(0, 50)) // Store first 50 chars of src
    }
  })
  
  const percentage = total > 0 ? Math.round((withAlt / total) * 100) : 100
  let status = 'pass'
  const details = {}
  
  if (total === 0) {
    status = 'info'
  } else if (percentage < 70) {
    status = 'fail'
    details.recommendation = 'Add alt text to images'
    details.missing_alt_count = withoutAlt
  } else if (percentage < 90) {
    status = 'warning'
    details.recommendation = 'Some images are missing alt text'
    details.missing_alt_count = withoutAlt
  }
  
  if (missingAlt.length > 0 && missingAlt.length <= 10) {
    details.missing_alt_images = missingAlt
  }
  
  return { total, withAlt, withoutAlt, percentage, status, details }
}

/**
 * Analyzes internal and external links
 * @returns {object} Link analysis
 */
function analyzeLinks() {
  if (typeof document === 'undefined') {
    return { internal: 0, external: 0, status: 'info', details: {} }
  }
  
  const links = document.querySelectorAll('a[href]')
  const currentDomain = window.location.hostname
  let internal = 0
  let external = 0
  
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (!href) return
    
    try {
      // Absolute URL
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const url = new URL(href)
        if (url.hostname === currentDomain || url.hostname.endsWith('.' + currentDomain)) {
          internal++
        } else {
          external++
        }
      } else if (href.startsWith('/') || href.startsWith('#') || !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        // Relative URL - internal
        internal++
      }
    } catch {
      // Invalid URL, skip
    }
  })
  
  let status = 'pass'
  const details = {}
  
  if (internal === 0) {
    status = 'warning'
    details.recommendation = 'Add internal links to improve SEO'
  } else if (internal < 3) {
    status = 'warning'
    details.recommendation = 'Consider adding more internal links'
  }
  
  return { internal, external, status, details }
}

/**
 * Checks for structured data (JSON-LD)
 * @returns {object} Structured data analysis
 */
function analyzeStructuredData() {
  if (typeof document === 'undefined') {
    return { present: false, count: 0, types: [], status: 'fail', details: {} }
  }
  
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  const count = scripts.length
  const types = []
  let isValid = true
  
  scripts.forEach(script => {
    try {
      const data = JSON.parse(script.textContent || '{}')
      if (data['@type']) {
        types.push(data['@type'])
      } else if (Array.isArray(data)) {
        data.forEach(item => {
          if (item['@type']) types.push(item['@type'])
        })
      }
    } catch {
      isValid = false
    }
  })
  
  let status = 'fail'
  const details = {}
  
  if (count === 0) {
    status = 'fail'
    details.recommendation = 'Add structured data (JSON-LD) to improve search visibility'
  } else if (!isValid) {
    status = 'warning'
    details.recommendation = 'Fix invalid structured data'
    details.types = types
  } else {
    status = 'pass'
    details.types = types
  }
  
  return { present: count > 0, count, types, status, details }
}

/**
 * Checks canonical URL
 * @returns {object} Canonical analysis
 */
function analyzeCanonical() {
  if (typeof document === 'undefined') {
    return { present: false, value: null, status: 'fail', details: {} }
  }
  
  const canonical = document.querySelector('link[rel="canonical"]')
  const value = canonical ? canonical.getAttribute('href') : null
  const present = !!canonical
  
  let status = present ? 'pass' : 'warning'
  const details = {}
  
  if (!present) {
    details.recommendation = 'Add a canonical URL to prevent duplicate content issues'
  } else {
    details.actual_value = value
  }
  
  return { present, value, status, details }
}

/**
 * Checks Open Graph tags
 * @returns {object} OG tags analysis
 */
function analyzeOpenGraph() {
  const requiredTags = ['og:title', 'og:description', 'og:url', 'og:type', 'og:image']
  const present = {}
  const missing = []
  
  requiredTags.forEach(tag => {
    const value = getMetaTag(tag, 'property')
    present[tag] = !!value
    if (!value) {
      missing.push(tag)
    }
  })
  
  let status = 'pass'
  const details = {}
  
  if (missing.length === requiredTags.length) {
    status = 'warning'
    details.recommendation = 'Add Open Graph tags for better social media sharing'
  } else if (missing.length > 0) {
    status = 'warning'
    details.recommendation = `Add missing Open Graph tags: ${missing.join(', ')}`
    details.missing_tags = missing
  }
  
  return { present, missing, status, details }
}

/**
 * Checks robots meta tag
 * @returns {object} Robots meta analysis
 */
function analyzeRobots() {
  const robots = getMetaTag('robots')
  const present = !!robots
  let status = 'info'
  const details = {}
  
  if (robots) {
    details.actual_value = robots
    if (robots.toLowerCase().includes('noindex')) {
      status = 'warning'
      details.recommendation = 'Page is set to noindex - will not appear in search results'
    }
  }
  
  return { present, value: robots, status, details }
}

/**
 * Calculates overall SEO score (0-100)
 * @param {object} metrics - All analyzed metrics
 * @returns {number} SEO score
 */
function calculateOverallScore(metrics) {
  let score = 100
  let maxDeductions = 0
  
  // Title: -20 if fail, -10 if warning
  if (metrics.title.status === 'fail') score -= 20
  else if (metrics.title.status === 'warning') score -= 10
  maxDeductions += 20
  
  // Description: -20 if fail, -10 if warning
  if (metrics.description.status === 'fail') score -= 20
  else if (metrics.description.status === 'warning') score -= 10
  maxDeductions += 20
  
  // Structured data: -15 if fail, -5 if warning
  if (metrics.structuredData.status === 'fail') score -= 15
  else if (metrics.structuredData.status === 'warning') score -= 5
  maxDeductions += 15
  
  // H1: -10 if warning
  if (metrics.h1.status === 'warning') score -= 10
  maxDeductions += 10
  
  // Content: -10 if warning
  if (metrics.content.status === 'warning') score -= 10
  maxDeductions += 10
  
  // Images: -10 if fail, -5 if warning
  if (metrics.images.status === 'fail') score -= 10
  else if (metrics.images.status === 'warning') score -= 5
  maxDeductions += 10
  
  // Links: -5 if warning
  if (metrics.links.status === 'warning') score -= 5
  maxDeductions += 5
  
  // Canonical: -5 if warning
  if (metrics.canonical.status === 'warning') score -= 5
  maxDeductions += 5
  
  // Open Graph: -5 if warning
  if (metrics.openGraph.status === 'warning') score -= 5
  maxDeductions += 5
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score))
}

/**
 * Counts issues and warnings
 * @param {object} metrics - All analyzed metrics
 * @returns {object} Counts
 */
function countIssues(metrics) {
  let issues = 0
  let warnings = 0
  
  Object.values(metrics).forEach(metric => {
    if (metric.status === 'fail') issues++
    else if (metric.status === 'warning') warnings++
  })
  
  return { issues, warnings }
}

/**
 * Logs a single SEO metric to Supabase
 * @param {string} metricType - Type of metric
 * @param {string} metricName - Name of metric
 * @param {number|null} metricValue - Value
 * @param {string} metricUnit - Unit
 * @param {string} metricStatus - Status
 * @param {object} metricDetails - Additional details
 * @returns {Promise<void>}
 */
async function logSEOMetric(metricType, metricName, metricValue, metricUnit, metricStatus, metricDetails) {
  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    return
  }

  // Don't log if Supabase not configured
  if (!supabase) {
    return
  }

  // Check if we know the function doesn't exist - skip call to prevent 404
  const capability = getCapability(CAPABILITY_KEY_METRIC_LOG)
  if (capability === false) {
    // We know the function doesn't exist, don't call it
    return
  }

  try {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null
    const pagePath = getPagePath(pageUrl)
    
    const { error: rpcError } = await supabase.rpc('log_website_seo_metric', {
      p_page_url: pageUrl,
      p_page_path: pagePath,
      p_metric_type: metricType,
      p_metric_name: metricName,
      p_metric_value: metricValue,
      p_metric_unit: metricUnit,
      p_metric_status: metricStatus,
      p_metric_details: metricDetails || null
    })
    
    if (rpcError) {
      // Check for function not found errors (404, PGRST202, or various "not found" messages)
      const isNotFoundError = 
        rpcError.status === 404 || 
        rpcError.statusCode === 404 ||
        rpcError.code === 'PGRST202' || 
        rpcError.code === '42883' ||
        rpcError.message?.includes('not found') || 
        rpcError.message?.includes('function') || 
        rpcError.message?.includes('does not exist') ||
        rpcError.message?.includes('Searched for') ||
        rpcError.message?.includes('Could not find')
      
      if (isNotFoundError) {
        // Function doesn't exist - mark as unavailable and silently fail
        setCapability(CAPABILITY_KEY_METRIC_LOG, false)
        if (import.meta.env.DEV) {
          console.warn('[SEO Monitoring] RPC function not found. Run the database setup SQL script to enable SEO tracking.')
        }
        return
      }
      // Log other errors (only in development)
      if (import.meta.env.DEV) {
        console.error('[SEO Monitoring] Failed to log metric:', rpcError)
      }
    } else {
      // Success - mark as available
      setCapability(CAPABILITY_KEY_METRIC_LOG, true)
    }
  } catch (err) {
    // Silently fail - we don't want SEO logging to cause errors
    if (import.meta.env.DEV) {
      console.error('[SEO Monitoring] Exception while logging metric:', err)
    }
  }
}

/**
 * Updates SEO page summary in Supabase
 * @param {object} summary - Page summary data
 * @returns {Promise<void>}
 */
async function updatePageSummary(summary) {
  // Don't log in development
  if (import.meta.env.DEV) {
    return
  }

  if (!supabase) {
    return
  }

  // Check if we know the function doesn't exist - skip call to prevent 404
  const capability = getCapability(CAPABILITY_KEY_PAGE_UPDATE)
  if (capability === false) {
    // We know the function doesn't exist, don't call it
    return
  }

  try {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null
    const pagePath = getPagePath(pageUrl)
    
    const { error: rpcError } = await supabase.rpc('update_website_seo_page', {
      p_page_url: pageUrl,
      p_page_path: pagePath,
      p_page_title: summary.pageTitle,
      p_page_type: summary.pageType,
      p_overall_score: summary.overallScore,
      p_title_status: summary.titleStatus,
      p_description_status: summary.descriptionStatus,
      p_structured_data_status: summary.structuredDataStatus,
      p_content_status: summary.contentStatus,
      p_links_status: summary.linksStatus,
      p_technical_status: summary.technicalStatus,
      p_issues_count: summary.issuesCount,
      p_warnings_count: summary.warningsCount
    })
    
    if (rpcError) {
      // Check for function not found errors (404, PGRST202, or various "not found" messages)
      const isNotFoundError = 
        rpcError.status === 404 || 
        rpcError.statusCode === 404 ||
        rpcError.code === 'PGRST202' || 
        rpcError.code === '42883' ||
        rpcError.message?.includes('not found') || 
        rpcError.message?.includes('function') || 
        rpcError.message?.includes('does not exist') ||
        rpcError.message?.includes('Searched for') ||
        rpcError.message?.includes('Could not find')
      
      if (isNotFoundError) {
        // Function doesn't exist - mark as unavailable and silently fail
        setCapability(CAPABILITY_KEY_PAGE_UPDATE, false)
        if (import.meta.env.DEV) {
          console.warn('[SEO Monitoring] RPC function not found. Run the database setup SQL script to enable SEO tracking.')
        }
        return
      }
      // Log other errors (only in development)
      if (import.meta.env.DEV) {
        console.error('[SEO Monitoring] Failed to update page summary:', rpcError)
      }
    } else {
      // Success - mark as available
      setCapability(CAPABILITY_KEY_PAGE_UPDATE, true)
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[SEO Monitoring] Exception while updating page summary:', err)
    }
  }
}

/**
 * Analyzes current page and logs all SEO metrics
 * @returns {Promise<void>}
 */
export async function analyzePageSEO() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  // Wait a bit for page to fully render
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const pageUrl = window.location.href
    const pagePath = getPagePath(pageUrl)
    const pageType = getPageType(pagePath)
    const pageTitle = document.title

    // Analyze all SEO elements
    const title = analyzeTitle()
    const description = analyzeDescription()
    const h1 = analyzeH1()
    const headings = analyzeHeadings()
    const content = analyzeContent()
    const images = analyzeImages()
    const links = analyzeLinks()
    const structuredData = analyzeStructuredData()
    const canonical = analyzeCanonical()
    const openGraph = analyzeOpenGraph()
    const robots = analyzeRobots()

    const metrics = {
      title,
      description,
      h1,
      headings,
      content,
      images,
      links,
      structuredData,
      canonical,
      openGraph,
      robots
    }

    // Calculate overall score
    const overallScore = calculateOverallScore(metrics)
    const { issues, warnings } = countIssues(metrics)

    // Determine status for each category
    const titleStatus = title.status
    const descriptionStatus = description.status
    const structuredDataStatus = structuredData.status
    const contentStatus = content.status
    const linksStatus = links.status
    const technicalStatus = canonical.status === 'warning' || robots.status === 'warning' ? 'warning' : 'pass'

    // Log all metrics
    await Promise.all([
      logSEOMetric('meta_tags', 'title_length', title.length, 'chars', title.status, title.details),
      logSEOMetric('meta_tags', 'title_present', title.value ? 1 : 0, 'count', title.status, title.details),
      logSEOMetric('meta_tags', 'description_length', description.length, 'chars', description.status, description.details),
      logSEOMetric('meta_tags', 'description_present', description.value ? 1 : 0, 'count', description.status, description.details),
      logSEOMetric('meta_tags', 'canonical_present', canonical.present ? 1 : 0, 'count', canonical.status, canonical.details),
      logSEOMetric('meta_tags', 'og_tags_complete', openGraph.missing.length === 0 ? 1 : 0, 'count', openGraph.status, openGraph.details),
      logSEOMetric('meta_tags', 'robots_meta', robots.present ? 1 : 0, 'count', robots.status, robots.details),
      
      logSEOMetric('structured_data', 'structured_data_present', structuredData.present ? 1 : 0, 'count', structuredData.status, structuredData.details),
      logSEOMetric('structured_data', 'structured_data_count', structuredData.count, 'count', structuredData.status, structuredData.details),
      
      logSEOMetric('content', 'h1_count', h1.count, 'count', h1.status, h1.details),
      logSEOMetric('content', 'word_count', content.wordCount, 'count', content.status, content.details),
      logSEOMetric('content', 'char_count', content.charCount, 'count', 'info', {}),
      logSEOMetric('content', 'image_alt_coverage', images.percentage, 'percentage', images.status, images.details),
      logSEOMetric('content', 'image_count', images.total, 'count', 'info', {}),
      
      logSEOMetric('links', 'internal_links', links.internal, 'count', links.status, links.details),
      logSEOMetric('links', 'external_links', links.external, 'count', 'info', {}),
      
      logSEOMetric('technical', 'canonical_url', canonical.present ? 1 : 0, 'count', canonical.status, canonical.details)
    ])

    // Update page summary
    await updatePageSummary({
      pageTitle,
      pageType,
      overallScore,
      titleStatus,
      descriptionStatus,
      structuredDataStatus,
      contentStatus,
      linksStatus,
      technicalStatus,
      issuesCount: issues,
      warningsCount: warnings
    })

    if (import.meta.env.DEV) {
      console.log('[SEO Monitoring] Page analyzed:', {
        pagePath,
        overallScore,
        issues,
        warnings
      })
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[SEO Monitoring] Error analyzing page:', err)
    }
  }
}

/**
 * Initializes SEO monitoring
 * Analyzes page on load and route changes
 */
export function initSEOMonitoring() {
  if (typeof window === 'undefined') return
  if (import.meta.env.DEV) return // Don't track in development

  // Analyze on initial load
  analyzePageSEO()

  // Analyze on route changes (for SPA)
  let lastPath = window.location.pathname
  const checkRouteChange = () => {
    const currentPath = window.location.pathname
    if (currentPath !== lastPath) {
      lastPath = currentPath
      // Wait a bit for new page to render
      setTimeout(() => {
        analyzePageSEO()
      }, 1000)
    }
  }

  // Check for route changes periodically
  setInterval(checkRouteChange, 1000)

  // Also listen to popstate (back/forward navigation)
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      analyzePageSEO()
    }, 1000)
  })
}

