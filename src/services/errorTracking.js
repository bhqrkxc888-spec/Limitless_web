/**
 * Error Tracking Service
 * 
 * Logs errors to Supabase for monitoring and debugging.
 * All errors are sent to crm.website_errors table via RPC function.
 */

import { supabase } from '../lib/supabase'
import { siteConfig } from '../config/siteConfig'

// Check if error tracking is enabled in config
function isEnabled() {
  return siteConfig.monitoring?.enabled && siteConfig.monitoring?.errorTracking
}

// Capability flag - track if RPC function exists and works
const CAPABILITY_KEY = 'error_tracking_available'

/**
 * Check if error tracking is available (cached in sessionStorage)
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
 * Generates an anonymous session ID for tracking errors across page loads
 * @returns {string} Session ID
 */
function getSessionId() {
  if (typeof window === 'undefined') return null;
  
  const STORAGE_KEY = 'error_tracking_session_id'
  let sessionId = sessionStorage.getItem(STORAGE_KEY)
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    sessionStorage.setItem(STORAGE_KEY, sessionId)
  }
  
  return sessionId
}


/**
 * Determines error type from error object
 * @param {Error} error - Error object
 * @param {object} options - Additional options
 * @returns {string} Error type
 */
function getErrorType(error, options = {}) {
  if (options.errorType) return options.errorType
  
  if (error?.name === 'NetworkError' || error?.message?.includes('fetch')) {
    return 'network'
  }
  
  if (error?.name === 'TypeError' || error?.name === 'ReferenceError') {
    return 'javascript'
  }
  
  if (options.context?.endpoint || options.context?.api) {
    return 'api'
  }
  
  if (options.context?.form) {
    return 'form'
  }
  
  return 'javascript'
}

/**
 * Determines severity level from error
 * @param {Error} error - Error object
 * @param {object} options - Additional options
 * @returns {string} Severity level
 */
function getSeverity(error, options = {}) {
  if (options.severity) return options.severity
  
  const message = error?.message || String(error)
  
  if (message.includes('critical') || message.includes('fatal')) {
    return 'critical'
  }
  
  if (message.includes('warning') || message.includes('deprecated')) {
    return 'warning'
  }
  
  return 'error'
}

/**
 * Logs an error to Supabase
 * @param {Error|string} error - Error object or message
 * @param {object} options - Additional options
 * @param {string} options.errorType - Type of error ('javascript', 'api', 'network', 'form')
 * @param {string} options.severity - Severity level ('info', 'warning', 'error', 'critical')
 * @param {object} options.context - Additional context data
 * @returns {Promise<void>}
 */
export async function logError(error, options = {}) {
  // Check if monitoring is enabled
  if (!isEnabled()) {
    return;
  }

  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    console.error('Error (not logged to Supabase in dev):', error);
    return;
  }
  
  // Skip known non-actionable errors
  const errorMessage = error?.message || String(error);
  
  // MIME type errors happen when browser has stale cache after deploy - not a real bug
  if (errorMessage.includes('MIME type') || errorMessage.includes('not a valid JavaScript')) {
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
    const errorMessage = error?.message || String(error)
    const errorStack = error?.stack || null
    
    // Extract error location from stack trace
    let lineNumber = null
    let columnNumber = null
    
    if (errorStack) {
      const stackLines = errorStack.split('\n')
      const firstLine = stackLines.find(line => line.includes(':'))
      if (firstLine) {
        const match = firstLine.match(/:(\d+):(\d+)/)
        if (match) {
          lineNumber = parseInt(match[1], 10)
          columnNumber = parseInt(match[2], 10)
        }
      }
    }
    
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null
    const pagePath = typeof window !== 'undefined' ? window.location.pathname : null
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
    const sessionId = getSessionId()
    
    const errorType = getErrorType(error, options)
    const severity = getSeverity(error, options)
    
    // Call Supabase RPC function
    const { error: rpcError } = await supabase.rpc('log_website_error', {
      p_error_type: errorType,
      p_error_message: errorMessage,
      p_error_stack: errorStack,
      p_error_url: pageUrl,
      p_error_line: lineNumber,
      p_error_column: columnNumber,
      p_page_path: pagePath,
      p_user_agent: userAgent,
      p_session_id: sessionId,
      p_severity: severity,
      p_context: options.context || null
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
          console.warn('[Error Tracking] RPC function not available. Database setup may be incomplete.')
        }
        return
      }
      // Log other errors to console for debugging (only in development)
      if (import.meta.env.DEV) {
        console.error('[Error Tracking] Failed to log error to Supabase:', rpcError)
        console.error('[Error Tracking] Error details:', {
          message: errorMessage,
          code: rpcError.code,
          details: rpcError.details,
          hint: rpcError.hint
        })
      }
    } else {
      // Success - mark as available
      setCapability(true)
      if (import.meta.env.DEV) {
        console.log('[Error Tracking] Error logged successfully to Supabase')
      }
    }
  } catch (err) {
    // Log to console for debugging (only in development)
    if (import.meta.env.DEV) {
      console.error('[Error Tracking] Exception while logging error:', err)
    }
  }
}

/**
 * Logs a network error
 * @param {Error} error - Network error
 * @param {object} context - Additional context (endpoint, method, etc.)
 * @returns {Promise<void>}
 */
export async function logNetworkError(error, context = {}) {
  return logError(error, {
    errorType: 'network',
    severity: 'error',
    context
  })
}

/**
 * Logs an API error
 * @param {Error} error - API error
 * @param {object} context - Additional context (endpoint, status code, etc.)
 * @returns {Promise<void>}
 */
export async function logApiError(error, context = {}) {
  // Don't log expected auth errors (failed login attempts are not bugs)
  const endpoint = context?.endpoint || '';
  const statusCode = context?.statusCode;
  
  if (endpoint.includes('/api/admin/login') && statusCode === 401) {
    // This is just a failed login attempt, not an error
    return;
  }
  if (endpoint.includes('/api/admin/session') && statusCode === 401) {
    // Session expired or not authenticated - expected
    return;
  }
  
  return logError(error, {
    errorType: 'api',
    severity: 'error',
    context
  })
}

/**
 * Logs a form submission error
 * @param {Error} error - Form error
 * @param {object} context - Additional context (form name, fields, etc.)
 * @returns {Promise<void>}
 */
export async function logFormError(error, context = {}) {
  return logError(error, {
    errorType: 'form',
    severity: 'error',
    context: { ...context, form: true }
  })
}

/**
 * Logs a critical error
 * @param {Error} error - Critical error
 * @param {object} context - Additional context
 * @returns {Promise<void>}
 */
export async function logCriticalError(error, context = {}) {
  return logError(error, {
    severity: 'critical',
    context
  })
}
