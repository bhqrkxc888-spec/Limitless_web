import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { logError, logNetworkError, logApiError } from './services/errorTracking'
import { initSEOMonitoring } from './services/seoMonitoring'
import { Analytics } from '@vercel/analytics/react'

// Initialize global error handlers and monitoring
// Note: Performance monitoring disabled - using Lighthouse instead
function initMonitoring() {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
