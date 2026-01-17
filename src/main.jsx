import { StrictMode, lazy, Suspense, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { logError, logNetworkError, logApiError } from './services/errorTracking'
import { initSEOMonitoring } from './services/seoMonitoring'
import { initWebVitals } from './services/webVitals'
import { initEnvValidation } from './utils/envValidation'

// Lazy load Vercel Analytics - not needed for initial render
const Analytics = lazy(() => 
  import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics }))
)

/**
 * DeferredAnalytics - Loads analytics after page is interactive
 * This improves mobile performance by deferring non-critical JS
 */
// eslint-disable-next-line react-refresh/only-export-components
function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)
  
  useEffect(() => {
    // Load analytics after idle or user interaction (whichever comes first)
    const loadAnalytics = () => setShouldLoad(true)
    
    // Method 1: Load when browser is idle (after critical work done)
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadAnalytics, { timeout: 3000 })
      
      // Method 2: Also load on first user interaction
      const interactionEvents = ['scroll', 'click', 'touchstart', 'keydown']
      const handleInteraction = () => {
        cancelIdleCallback(idleId)
        loadAnalytics()
        interactionEvents.forEach(event => 
          window.removeEventListener(event, handleInteraction, { passive: true })
        )
      }
      
      interactionEvents.forEach(event => 
        window.addEventListener(event, handleInteraction, { once: true, passive: true })
      )
      
      return () => {
        cancelIdleCallback(idleId)
        interactionEvents.forEach(event => 
          window.removeEventListener(event, handleInteraction)
        )
      }
    } else {
      // Fallback for older browsers: load after 2s
      const timer = setTimeout(loadAnalytics, 2000)
      return () => clearTimeout(timer)
    }
  }, [])
  
  if (!shouldLoad) return null
  
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  )
}

// Validate environment variables on startup (dev only - production has them in Vercel)
if (import.meta.env.DEV) {
  initEnvValidation()
}

// Initialize global error handlers and monitoring
function initMonitoring() {
  // Initialize Web Vitals tracking (Core Web Vitals: LCP, INP, CLS, etc.)
  // Reports to console in dev, analytics in production
  initWebVitals()
  
  // Defer SEO monitoring until after page is interactive
  // This prevents blocking initial render
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      initSEOMonitoring()
    })
  } else {
    // Fallback: defer by 2 seconds for older browsers
    setTimeout(() => {
      initSEOMonitoring()
    }, 2000)
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

// CRITICAL: Force scroll to top on initial page load
// This prevents mobile browsers from restoring scroll position before React hydrates
// Combined with scrollRestoration = 'manual' in index.html
window.scrollTo(0, 0)

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
    <DeferredAnalytics />
  </StrictMode>,
)

// After React renders, scroll to top again to handle any content-induced scroll
// This catches cases where lazy-loaded content might shift the page
requestAnimationFrame(() => {
  window.scrollTo(0, 0)
})
