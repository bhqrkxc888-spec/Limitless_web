import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { logError, logNetworkError, logApiError } from './services/errorTracking'
import { initPerformanceMonitoring } from './services/performanceMonitoring'
import { initSEOMonitoring } from './services/seoMonitoring'

// Initialize global error handlers and performance monitoring
function initMonitoring() {
  // Initialize performance monitoring (Core Web Vitals, page load times)
  initPerformanceMonitoring()
  
  // Initialize SEO monitoring (meta tags, content, structured data)
  initSEOMonitoring()
  
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
      
      if (!response.ok && response.status >= 400 && !shouldSkipLogging) {
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
      logNetworkError(error, {
        endpoint: args[0],
        method: args[1]?.method || 'GET'
      }).catch(() => {
        // Silently fail if error tracking fails
      })
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
