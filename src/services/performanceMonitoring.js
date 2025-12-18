/**
 * Performance Monitoring Service
 * 
 * Tracks Core Web Vitals and other performance metrics,
 * sending them to Supabase for analysis.
 */

import { supabase } from '../lib/supabase'
import { siteConfig } from '../config/siteConfig'

// Check if performance tracking is enabled in config
function isEnabled() {
  return siteConfig.monitoring?.enabled && siteConfig.monitoring?.performanceTracking
}

// Capability flag - track if RPC function exists and works
const CAPABILITY_KEY = 'performance_monitoring_available'

/**
 * Check if performance monitoring is available (cached in sessionStorage)
 * @returns {boolean|null} - true if available, false if unavailable, null if unknown
 */
function getCapability() {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return null
  }
  const value = sessionStorage.getItem(CAPABILITY_KEY)
  if (value === null) return null
  return value === 'true'
}

/**
 * Set capability availability
 * @param {boolean} available - Whether the capability is available
 */
function setCapability(available) {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return
  }
  sessionStorage.setItem(CAPABILITY_KEY, String(available))
}

/**
 * Detects device type from user agent
 * @returns {string} Device type
 */
function getDeviceType() {
  if (typeof navigator === 'undefined') return 'desktop';
  
  const ua = navigator.userAgent.toLowerCase()
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

/**
 * Extracts browser name and version from user agent
 * @returns {object} Browser info
 */
function getBrowserInfo() {
  if (typeof navigator === 'undefined') return { browserName: 'unknown', browserVersion: 'unknown' };
  
  const ua = navigator.userAgent
  let browserName = 'unknown'
  let browserVersion = 'unknown'
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browserName = 'Chrome'
    const match = ua.match(/Chrome\/(\d+)/)
    if (match) browserVersion = match[1]
  } else if (ua.includes('Firefox')) {
    browserName = 'Firefox'
    const match = ua.match(/Firefox\/(\d+)/)
    if (match) browserVersion = match[1]
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browserName = 'Safari'
    const match = ua.match(/Version\/(\d+)/)
    if (match) browserVersion = match[1]
  } else if (ua.includes('Edg')) {
    browserName = 'Edge'
    const match = ua.match(/Edg\/(\d+)/)
    if (match) browserVersion = match[1]
  }
  
  return { browserName, browserVersion }
}

/**
 * Gets connection type if available
 * @returns {string|null} Connection type
 */
function getConnectionType() {
  if (typeof navigator === 'undefined') return null;
  
  if ('connection' in navigator) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (conn) {
      return conn.effectiveType || null // '4g', '3g', '2g', 'slow-2g'
    }
  }
  return null
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
 * Logs a performance metric to Supabase
 * @param {string} metricName - Name of the metric (e.g., 'LCP', 'FID', 'CLS', 'PageLoad')
 * @param {number} metricValue - Value in milliseconds or score
 * @param {string} metricType - Type of metric ('core_web_vital', 'page_load', 'api')
 * @param {object} options - Additional options
 * @returns {Promise<void>}
 */
export async function logPerformanceMetric(metricName, metricValue, metricType = null, options = {}) {
  // Check if monitoring is enabled
  if (!isEnabled()) {
    return;
  }

  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    return;
  }

  // Don't log if Supabase not configured
  if (!supabase) {
    return;
  }

  // Check if we know the function doesn't exist/work - skip to prevent 400 errors
  const capability = getCapability()
  if (capability === false) {
    return;
  }

  try {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null
    const pagePath = getPagePath(pageUrl)
    const deviceType = getDeviceType()
    const { browserName, browserVersion } = getBrowserInfo()
    const connectionType = getConnectionType()
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
    
    // Generate session ID for tracking
    const STORAGE_KEY = 'error_tracking_session_id'
    let sessionId = null
    if (typeof window !== 'undefined') {
      sessionId = sessionStorage.getItem(STORAGE_KEY)
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
        sessionStorage.setItem(STORAGE_KEY, sessionId)
      }
    }
    
    // Build additional_data object for API-specific info
    const additionalData = options.context || {}
    if (options.apiUrl) additionalData.apiUrl = options.apiUrl
    if (options.apiMethod) additionalData.apiMethod = options.apiMethod
    if (options.apiStatusCode) additionalData.apiStatusCode = options.apiStatusCode
    
    // Call Supabase RPC function
    // Note: Parameter order matches SQL function: required params first, then optional
    const { error: rpcError } = await supabase.rpc('log_website_performance', {
      p_metric_type: metricType || 'core_web_vital',
      p_metric_name: metricName,
      p_metric_value: metricValue,
      p_metric_unit: options.unit || 'ms',
      p_page_url: pageUrl,
      p_page_path: pagePath,
      p_user_agent: userAgent,
      p_session_id: sessionId,
      p_device_type: deviceType,
      p_connection_type: connectionType,
      p_browser_name: browserName,
      p_browser_version: browserVersion,
      p_viewport_width: typeof window !== 'undefined' ? window.innerWidth : null,
      p_viewport_height: typeof window !== 'undefined' ? window.innerHeight : null,
      p_additional_data: Object.keys(additionalData).length > 0 ? additionalData : null
    })
    
    if (rpcError) {
      // Check for function not found or schema mismatch errors
      const isNotFoundError = 
        rpcError.code === 'PGRST202' || 
        rpcError.code === '42883' ||
        rpcError.code === '42703' || // undefined column
        rpcError.message?.includes('not found') || 
        rpcError.message?.includes('function') || 
        rpcError.message?.includes('does not exist') ||
        rpcError.message?.includes('column') ||
        rpcError.message?.includes('relation')
      
      if (isNotFoundError) {
        // Function doesn't exist or schema mismatch - mark as unavailable
        setCapability(false)
        if (import.meta.env.DEV) {
          console.warn('[Performance Monitoring] RPC function not available. Database setup may be incomplete.')
        }
        return
      }
      // Log other errors (only in development)
      if (import.meta.env.DEV) {
        console.error('[Performance Monitoring] Failed to log metric:', rpcError)
      }
    } else {
      // Success - mark as available
      setCapability(true)
    }
  } catch (err) {
    // Silently fail - we don't want performance logging to cause errors
    if (import.meta.env.DEV) {
      console.error('[Performance Monitoring] Exception while logging metric:', err)
    }
  }
}

/**
 * Initializes Core Web Vitals monitoring
 * Tracks LCP, FID, CLS, INP, and Long Tasks with attribution
 */
export function initCoreWebVitals() {
  // Only run if Web Vitals library is available
  if (typeof window === 'undefined') return
  
  if ('PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint) - with element attribution
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          // Build context with LCP element details
          const context = {}
          if (lastEntry.element) {
            context.element = lastEntry.element.tagName || 'unknown'
            if (lastEntry.element.id) context.elementId = lastEntry.element.id
            if (lastEntry.element.className) {
              context.elementClass = String(lastEntry.element.className).split(' ')[0] || null
            }
          }
          if (lastEntry.url) {
            // Extract just the filename from image URL
            context.imageUrl = lastEntry.url
            const urlParts = lastEntry.url.split('/')
            context.imageName = urlParts[urlParts.length - 1]?.split('?')[0] || null
          }
          if (lastEntry.size) context.size = lastEntry.size
          
          logPerformanceMetric('LCP', lastEntry.renderTime || lastEntry.loadTime, 'core_web_vital', {
            context: Object.keys(context).length > 0 ? context : null
          })
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch {
      // LCP not supported
    }
    
    // FID (First Input Delay) - legacy metric, still useful
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime
            logPerformanceMetric('FID', fid, 'core_web_vital', {
              context: {
                eventType: entry.name || 'unknown'
              }
            })
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch {
      // FID not supported
    }
    
    // INP (Interaction to Next Paint) - New Core Web Vital replacing FID
    try {
      let maxINP = 0
      let maxINPContext = null
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          // Only track interactions with meaningful duration
          if (entry.duration > maxINP) {
            maxINP = entry.duration
            maxINPContext = {
              interactionType: entry.name || 'unknown',
              target: entry.target?.tagName || 'unknown',
              targetId: entry.target?.id || null
            }
          }
        })
      })
      inpObserver.observe({ entryTypes: ['event'], durationThreshold: 40 })
      
      // Log worst INP on page unload
      window.addEventListener('beforeunload', () => {
        if (maxINP > 0) {
          logPerformanceMetric('INP', maxINP, 'core_web_vital', {
            context: maxINPContext
          })
        }
      })
    } catch {
      // INP not supported
    }
    
    // CLS (Cumulative Layout Shift) - with source attribution
    try {
      let clsValue = 0
      let worstShift = null
      let shiftCount = 0
      
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            shiftCount++
            
            // Track worst shift source for debugging
            if (entry.sources?.[0] && (!worstShift || entry.value > worstShift.value)) {
              const source = entry.sources[0]
              worstShift = {
                value: entry.value,
                element: source.node?.tagName || 'unknown',
                id: source.node?.id || null,
                class: source.node?.className ? String(source.node.className).split(' ')[0] : null
              }
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      // Log final CLS with attribution on page unload
      window.addEventListener('beforeunload', () => {
        if (clsValue > 0) {
          const context = {
            totalShifts: shiftCount
          }
          if (worstShift) {
            context.worstShift = worstShift
          }
          logPerformanceMetric('CLS', clsValue, 'core_web_vital', { context })
        }
      })
    } catch {
      // CLS not supported
    }
    
    // Long Tasks - Track JavaScript blocking the main thread (>50ms)
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          // Only log significant long tasks (>100ms to reduce noise)
          if (entry.duration > 100) {
            logPerformanceMetric('LongTask', entry.duration, 'javascript', {
              context: {
                startTime: Math.round(entry.startTime),
                attribution: entry.attribution?.[0]?.name || 'unknown'
              }
            })
          }
        })
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch {
      // Long tasks not supported
    }
  }
}

/**
 * Tracks page load performance metrics
 */
export function trackPageLoad() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  
  // Wait for page to fully load
  if (document.readyState === 'complete') {
    measurePageLoad()
    measureResourceTiming()
  } else {
    window.addEventListener('load', () => {
      measurePageLoad()
      measureResourceTiming()
    })
  }
}

/**
 * Measures and logs slow resource loading (images, scripts, etc.)
 * Helps identify which assets are impacting performance
 */
function measureResourceTiming() {
  try {
    // Small delay to ensure all resources are recorded
    setTimeout(() => {
      const resources = performance.getEntriesByType('resource')
      
      // Find slow images (>500ms) - these often impact LCP
      const slowImages = resources
        .filter(r => r.initiatorType === 'img' && r.duration > 500)
        .map(r => ({
          name: r.name.split('/').pop()?.split('?')[0] || r.name,
          duration: Math.round(r.duration),
          size: r.transferSize || 0
        }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5) // Top 5 slowest
      
      if (slowImages.length > 0) {
        logPerformanceMetric('SlowImages', slowImages.length, 'resources', {
          context: {
            images: slowImages,
            slowestImage: slowImages[0]?.name,
            slowestDuration: slowImages[0]?.duration
          }
        })
      }
      
      // Track overall resource summary
      const resourceSummary = {
        total: resources.length,
        images: resources.filter(r => r.initiatorType === 'img').length,
        scripts: resources.filter(r => r.initiatorType === 'script').length,
        css: resources.filter(r => r.initiatorType === 'css' || r.initiatorType === 'link').length,
        fonts: resources.filter(r => r.initiatorType === 'css' && r.name.includes('font')).length
      }
      
      // Calculate total transfer size
      const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
      
      // Only log if there are many resources or large total size (>1MB)
      if (resources.length > 50 || totalSize > 1024 * 1024) {
        logPerformanceMetric('ResourceLoad', resources.length, 'resources', {
          context: {
            ...resourceSummary,
            totalSizeKB: Math.round(totalSize / 1024)
          }
        })
      }
    }, 100)
  } catch {
    // Silently fail
  }
}

/**
 * Measures and logs page load metrics
 */
function measurePageLoad() {
  try {
    const navigation = performance.getEntriesByType('navigation')[0]
    if (!navigation) return
    
    // TTFB (Time to First Byte)
    const ttfb = navigation.responseStart - navigation.requestStart
    if (ttfb > 0) {
      logPerformanceMetric('TTFB', ttfb, 'page_load')
    }
    
    // FCP (First Contentful Paint)
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
    if (fcpEntry) {
      logPerformanceMetric('FCP', fcpEntry.startTime, 'page_load')
    }
    
    // DOMContentLoaded
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
    if (domContentLoaded > 0) {
      logPerformanceMetric('DOMContentLoaded', domContentLoaded, 'page_load')
    }
    
    // Full page load time
    const pageLoad = navigation.loadEventEnd - navigation.fetchStart
    if (pageLoad > 0) {
      logPerformanceMetric('PageLoad', pageLoad, 'page_load')
    }
  } catch (err) {
    // Silently fail
    if (import.meta.env.DEV) {
      console.error('[Performance Monitoring] Error measuring page load:', err)
    }
  }
}

/**
 * Tracks API response times
 * Wraps fetch to automatically track API performance
 * @param {string} url - API URL
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
export async function trackApiCall(url, options = {}) {
  const startTime = performance.now()
  const method = options.method || 'GET'
  
  try {
    const response = await fetch(url, options)
    const endTime = performance.now()
    const responseTime = endTime - startTime
    
    // Log API performance
    logPerformanceMetric('APIResponseTime', responseTime, 'api', {
      apiUrl: url,
      apiMethod: method,
      apiStatusCode: response.status
    })
    
    return response
  } catch (error) {
    const endTime = performance.now()
    const responseTime = endTime - startTime
    
    // Log failed API call
    logPerformanceMetric('APIResponseTime', responseTime, 'api', {
      apiUrl: url,
      apiMethod: method,
      apiStatusCode: 0, // Network error
      context: { error: error.message }
    })
    
    throw error
  }
}

/**
 * Initializes all performance monitoring
 */
export function initPerformanceMonitoring() {
  // Check if monitoring is enabled
  if (!isEnabled()) {
    return;
  }

  if (typeof window === 'undefined') return;
  if (import.meta.env.DEV) return; // Don't track in development
  
  // Check if we know the function doesn't work - skip initialization entirely
  const capability = getCapability()
  if (capability === false) {
    return;
  }
  
  // Initialize Core Web Vitals
  initCoreWebVitals()
  
  // Track page load metrics
  trackPageLoad()
}
