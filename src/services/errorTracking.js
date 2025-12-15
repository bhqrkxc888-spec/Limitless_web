/**
 * Error Tracking Service
 * 
 * Logs errors to Supabase for monitoring and debugging.
 * All errors are sent to crm.website_errors table via RPC function.
 */

import { supabase } from '../lib/supabase'

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
  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    console.error('Error (not logged to Supabase in dev):', error);
    return;
  }

  // Don't log if Supabase not configured
  if (!supabase) {
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
    const pagePath = getPagePath(pageUrl)
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
    const sessionId = getSessionId()
    
    // Get IP address (if available from headers, otherwise null)
    // Note: IP is typically captured server-side, but we'll try to get it if possible
    const ipAddress = null // Client-side IP detection is not reliable
    
    const errorType = getErrorType(error, options)
    const severity = getSeverity(error, options)
    
    // Call Supabase RPC function
    const { error: rpcError } = await supabase.rpc('log_website_error', {
      p_error_message: errorMessage,
      p_error_stack: errorStack,
      p_error_type: errorType,
      p_severity: severity,
      p_page_url: pageUrl,
      p_page_path: pagePath,
      p_line_number: lineNumber,
      p_column_number: columnNumber,
      p_user_agent: userAgent,
      p_ip_address: ipAddress,
      p_session_id: sessionId,
      p_context: options.context || null
    })
    
    if (rpcError) {
      // Log to console for debugging (only in development)
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
      // Success - log in development mode
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
