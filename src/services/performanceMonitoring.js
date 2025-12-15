/**
 * Performance Monitoring Service
 * 
 * Tracks Core Web Vitals and other performance metrics,
 * sending them to Supabase for analysis.
 */

import { supabase } from '../lib/supabase'

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
  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    return;
  }

  // Don't log if Supabase not configured
  if (!supabase) {
    return;
  }

  try {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null
    const pagePath = getPagePath(pageUrl)
    const deviceType = getDeviceType()
    const { browserName, browserVersion } = getBrowserInfo()
    const connectionType = getConnectionType()
    
    // Call Supabase RPC function
    // Note: Parameter order matches SQL function: required params first, then optional
    const { error: rpcError } = await supabase.rpc('log_website_performance', {
      p_metric_name: metricName,
      p_metric_value: metricValue,
      p_metric_type: metricType,
      p_page_url: pageUrl,
      p_page_path: pagePath,
      p_device_type: deviceType,
      p_browser_name: browserName,
      p_browser_version: browserVersion,
      p_connection_type: connectionType,
      p_api_url: options.apiUrl || null,
      p_api_method: options.apiMethod || null,
      p_api_status_code: options.apiStatusCode || null,
      p_context: options.context || null
    })
    
    if (rpcError) {
      // Silently fail - we don't want performance logging to cause errors
      if (import.meta.env.DEV) {
        console.error('[Performance Monitoring] Failed to log metric:', rpcError)
      }
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
 * Tracks LCP, FID, and CLS automatically
 */
export function initCoreWebVitals() {
  // Only run if Web Vitals library is available
  if (typeof window === 'undefined') return
  
  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          logPerformanceMetric('LCP', lastEntry.renderTime || lastEntry.loadTime, 'core_web_vital')
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (err) {
      // LCP not supported
    }
    
    // FID (First Input Delay) - now called INP (Interaction to Next Paint) in newer versions
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime
            logPerformanceMetric('FID', fid, 'core_web_vital')
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (err) {
      // FID not supported
    }
    
    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        
        // Log CLS when page is unloaded or after a delay
        if (clsValue > 0) {
          logPerformanceMetric('CLS', clsValue, 'core_web_vital')
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      // Log final CLS on page unload
      window.addEventListener('beforeunload', () => {
        if (clsValue > 0) {
          logPerformanceMetric('CLS', clsValue, 'core_web_vital')
        }
      })
    } catch (err) {
      // CLS not supported
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
  } else {
    window.addEventListener('load', measurePageLoad)
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
  if (typeof window === 'undefined') return;
  if (import.meta.env.DEV) return; // Don't track in development
  
  // Initialize Core Web Vitals
  initCoreWebVitals()
  
  // Track page load metrics
  trackPageLoad()
}
