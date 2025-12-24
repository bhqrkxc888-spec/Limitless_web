/**
 * Web Vitals Performance Tracking
 * 
 * Monitors Core Web Vitals (LCP, FID, CLS, FCP, TTFB) and reports
 * to analytics/monitoring services.
 * 
 * Based on web-vitals library (already installed in package.json)
 */

import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { siteConfig } from '../config/siteConfig';

// Feature flag - enable once monitoring is fully set up
const ENABLE_WEB_VITALS_TRACKING = siteConfig.monitoring?.performanceTracking ?? false;

// Thresholds for Core Web Vitals (based on Google's recommendations)
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },   // Largest Contentful Paint (ms)
  FID: { good: 100, needsImprovement: 300 },     // First Input Delay (ms)
  CLS: { good: 0.1, needsImprovement: 0.25 },    // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 },   // First Contentful Paint (ms)
  TTFB: { good: 800, needsImprovement: 1800 },   // Time to First Byte (ms)
  INP: { good: 200, needsImprovement: 500 }      // Interaction to Next Paint (ms)
};

/**
 * Get rating based on metric value and thresholds
 * @param {string} name - Metric name
 * @param {number} value - Metric value
 * @returns {'good' | 'needs-improvement' | 'poor'}
 */
function getRating(name, value) {
  const threshold = THRESHOLDS[name];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Format metric for logging/display
 * @param {Object} metric - Web Vitals metric object
 * @returns {Object}
 */
function formatMetric(metric) {
  return {
    name: metric.name,
    value: metric.value,
    rating: metric.rating || getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    entries: metric.entries?.map(e => ({
      name: e.name,
      startTime: e.startTime,
      duration: e.duration
    }))
  };
}

/**
 * Report metric to console (development)
 * @param {Object} metric
 */
function reportToConsole(metric) {
  const formatted = formatMetric(metric);
  const color = formatted.rating === 'good' ? '🟢' : 
                formatted.rating === 'needs-improvement' ? '🟡' : '🔴';
  
  console.log(
    `[Web Vitals] ${color} ${formatted.name}: ${formatted.value.toFixed(2)} (${formatted.rating})`
  );
}

/**
 * Report metric to analytics (production)
 * Can be extended to send to Supabase, Google Analytics, etc.
 * @param {Object} metric
 */
function reportToAnalytics(metric) {
  const formatted = formatMetric(metric);
  
  // Send to Google Analytics 4 (if available)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', formatted.name, {
      event_category: 'Web Vitals',
      event_label: formatted.id,
      value: Math.round(formatted.name === 'CLS' ? formatted.value * 1000 : formatted.value),
      metric_rating: formatted.rating,
      non_interaction: true
    });
  }

  // Could also send to Supabase for custom dashboard
  // This is disabled by default - enable when ready
  // sendToSupabase(formatted);
}

/**
 * Combined reporter - handles both dev and prod
 * @param {Object} metric
 */
function handleMetric(metric) {
  // Always log in development
  if (import.meta.env.DEV) {
    reportToConsole(metric);
  }
  
  // Report to analytics in production
  if (import.meta.env.PROD && ENABLE_WEB_VITALS_TRACKING) {
    reportToAnalytics(metric);
  }
}

/**
 * Initialize Web Vitals tracking
 * Call this once in your app entry point (main.jsx)
 */
export function initWebVitals() {
  // Skip if in non-browser environment
  if (typeof window === 'undefined') return;
  
  // Register all Core Web Vitals observers
  onCLS(handleMetric);    // Cumulative Layout Shift
  onFID(handleMetric);    // First Input Delay (deprecated but still useful)
  onFCP(handleMetric);    // First Contentful Paint
  onLCP(handleMetric);    // Largest Contentful Paint
  onTTFB(handleMetric);   // Time to First Byte
  onINP(handleMetric);    // Interaction to Next Paint (replaces FID)
  
  if (import.meta.env.DEV) {
    console.log('[Web Vitals] Monitoring initialized');
  }
}

/**
 * Get current Core Web Vitals thresholds
 * Useful for displaying in admin dashboard
 */
export function getThresholds() {
  return { ...THRESHOLDS };
}

/**
 * Check if a metric value passes the "good" threshold
 * @param {string} name - Metric name (LCP, FID, CLS, etc.)
 * @param {number} value - Metric value
 * @returns {boolean}
 */
export function isGoodMetric(name, value) {
  return getRating(name, value) === 'good';
}

export default {
  initWebVitals,
  getThresholds,
  isGoodMetric,
  getRating
};

