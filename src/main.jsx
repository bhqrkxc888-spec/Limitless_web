import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { logError, logNetworkError, logApiError } from './services/errorTracking'
import { initPerformanceMonitoring } from './services/performanceMonitoring'
import { initSEOMonitoring } from './services/seoMonitoring'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

// Initialize global error handlers and performance monitoring
function initMonitoring() {
  // Defer performance monitoring until after page is interactive
  // This prevents blocking initial render
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      initPerformanceMonitoring()
      initSEOMonitoring()
      initWebVitals()
    })
  } else {
    // Fallback: defer by 2 seconds for older browsers
    setTimeout(() => {
      initPerformanceMonitoring()
      initSEOMonitoring()
      initWebVitals()
    }, 2000)
  }
  
  // Initialize Core Web Vitals tracking
  function initWebVitals() {
    // Skip in development
    if (import.meta.env.DEV) return;
    
    // Track Core Web Vitals
    onCLS((metric) => {
      // Log to performance monitoring
      fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_name: 'CLS',
          metric_value: metric.value,
          page_url: window.location.pathname,
          user_agent: navigator.userAgent
        })
      }).catch(() => {
        // Silently fail if tracking fails
      });
    });
    
    onINP((metric) => {
      fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_name: 'INP',
          metric_value: metric.value,
          page_url: window.location.pathname,
          user_agent: navigator.userAgent
        })
      }).catch(() => {});
    });
    
    onLCP((metric) => {
      fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_name: 'LCP',
          metric_value: metric.value,
          page_url: window.location.pathname,
          user_agent: navigator.userAgent
        })
      }).catch(() => {});
    });
    
    onFCP((metric) => {
      fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_name: 'FCP',
          metric_value: metric.value,
          page_url: window.location.pathname,
          user_agent: navigator.userAgent
        })
      }).catch(() => {});
    });
    
    onTTFB((metric) => {
      fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_name: 'TTFB',
          metric_value: metric.value,
          page_url: window.location.pathname,
          user_agent: navigator.userAgent
        })
      }).catch(() => {});
    });
  }
  
  // Global error handler for unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), {
      errorType: 'javascript',
      severity: 'error',
      context: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    }).catch(() => {
      // Silently fail if error tracking fails
    })
  })
  
  // Global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason || new Error('Unhandled promise rejection'), {
      errorType: 'javascript',
      severity: 'error',
      context: {
        type: 'unhandledrejection'
      }
    }).catch(() => {
      // Silently fail if error tracking fails
    })
  })
  
  // Track network errors (fetch failures)
  const originalFetch = window.fetch
  window.fetch = async function(...args) {
    try {
      const response = await originalFetch.apply(this, args)
      
      // Log API errors (4xx, 5xx status codes)
      // Skip logging 404s from Supabase RPC endpoints - these are expected when RPC functions don't exist
      // and are handled silently by the service layer
      const url = String(args[0] || '')
      const method = args[1]?.method || 'GET'
      const isSupabaseRpc = url.includes('/rest/v1/rpc/') && method === 'POST'
      const shouldSkipLogging = isSupabaseRpc && response.status === 404
      
      // Skip bot probe URLs - these are not real errors
      const botProbePatterns = ['/wp-', '/.well-known/', '/apple-app', '/xmlrpc', '/phpmyadmin']
      const isBotProbe = botProbePatterns.some(pattern => url.includes(pattern))
      
      if (!response.ok && response.status >= 400 && !shouldSkipLogging && !isBotProbe) {
        logApiError(new Error(`API Error: ${response.status} ${response.statusText}`), {
          endpoint: args[0],
          method: method,
          statusCode: response.status,
          statusText: response.statusText
        }).catch(() => {
          // Silently fail if error tracking fails
        })
      }
      
      return response
    } catch (error) {
      // Log network errors (connection failures, timeouts, etc.)
      // Skip bot probes
      const url = String(args[0] || '')
      const botProbePatterns = ['/wp-', '/.well-known/', '/apple-app', '/xmlrpc', '/phpmyadmin']
      const isBotProbe = botProbePatterns.some(pattern => url.includes(pattern))
      
      if (!isBotProbe) {
        logNetworkError(error, {
          endpoint: args[0],
          method: args[1]?.method || 'GET'
        }).catch(() => {
          // Silently fail if error tracking fails
        })
      }
      throw error
    }
  }
}

// Initialize monitoring before rendering
initMonitoring()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
