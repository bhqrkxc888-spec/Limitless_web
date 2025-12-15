/**
 * Performance Monitoring Service
 * Tracks Core Web Vitals and other performance metrics
 * Sends data to Supabase for CRM visibility
 */

import { logPerformanceMetric } from './errorTracking';

/**
 * Initialize performance monitoring
 * Tracks Core Web Vitals (LCP, FID, CLS) and other metrics
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  if (import.meta.env.DEV) return; // Don't track in development

  // Track Core Web Vitals using Web Vitals library if available
  // Otherwise, use native browser APIs
  trackCoreWebVitals();
  trackPageLoad();
  trackAPIResponseTimes();
}

/**
 * Track Core Web Vitals
 * LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
 */
function trackCoreWebVitals() {
  // LCP - Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        logPerformanceMetric('LCP', lastEntry.renderTime || lastEntry.loadTime, {
          metricType: 'core_web_vital',
          unit: 'ms'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          logPerformanceMetric('FID', entry.processingStart - entry.startTime, {
            metricType: 'core_web_vital',
            unit: 'ms',
            additionalData: {
              eventType: entry.name,
              target: entry.target?.tagName
            }
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support FID
    }

    // CLS - Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        // Log CLS when page is unloaded or after a delay
        if (document.visibilityState === 'hidden') {
          logPerformanceMetric('CLS', clsValue, {
            metricType: 'core_web_vital',
            unit: 'score'
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Log CLS on page unload
      window.addEventListener('beforeunload', () => {
        if (clsValue > 0) {
          logPerformanceMetric('CLS', clsValue, {
            metricType: 'core_web_vital',
            unit: 'score'
          });
        }
      });
    } catch (e) {
      // Browser doesn't support CLS
    }
  }
}

/**
 * Track page load performance
 */
function trackPageLoad() {
  if ('performance' in window && 'timing' in window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        
        // Time to First Byte (TTFB)
        const ttfb = timing.responseStart - timing.requestStart;
        logPerformanceMetric('TTFB', ttfb, {
          metricType: 'page_load',
          unit: 'ms'
        });

        // First Contentful Paint (FCP)
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          logPerformanceMetric('FCP', fcpEntry.startTime, {
            metricType: 'page_load',
            unit: 'ms'
          });
        }

        // DOM Content Loaded
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        logPerformanceMetric('DOMContentLoaded', domContentLoaded, {
          metricType: 'page_load',
          unit: 'ms'
        });

        // Page Load Time
        const pageLoad = timing.loadEventEnd - timing.navigationStart;
        logPerformanceMetric('PageLoad', pageLoad, {
          metricType: 'page_load',
          unit: 'ms'
        });
      }, 0);
    });
  }
}

/**
 * Track API response times
 * Wraps fetch to measure API call performance
 */
function trackAPIResponseTimes() {
  if (typeof fetch === 'undefined') return;

  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const startTime = performance.now();
    const url = args[0]?.toString() || 'unknown';

    try {
      const response = await originalFetch.apply(this, args);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Only log if it's an external API call (not internal)
      if (url.includes('api.') || url.includes('supabase.co') || url.includes('openweathermap.org') || url.includes('stormglass.io')) {
        logPerformanceMetric('APIResponseTime', duration, {
          metricType: 'api_call',
          unit: 'ms',
          additionalData: {
            url: url.substring(0, 200), // Limit URL length
            status: response.status,
            method: args[1]?.method || 'GET'
          }
        });
      }

      return response;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      logPerformanceMetric('APIResponseTime', duration, {
        metricType: 'api_call',
        unit: 'ms',
        additionalData: {
          url: url.substring(0, 200),
          error: true,
          errorMessage: error.message
        }
      });

      throw error;
    }
  };
}

