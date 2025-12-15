/**
 * Error Tracking Service
 * Sends errors to Supabase for CRM visibility
 */

import { supabase } from '../lib/supabase';

/**
 * Get current page URL
 */
function getCurrentUrl() {
  if (typeof window === 'undefined') return null;
  return window.location.href;
}

/**
 * Get current page path
 */
function getCurrentPath() {
  if (typeof window === 'undefined') return null;
  return window.location.pathname;
}

/**
 * Generate or get session ID
 */
function getSessionId() {
  if (typeof window === 'undefined') return null;
  
  let sessionId = sessionStorage.getItem('limitless_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('limitless_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Parse user agent to extract browser info
 */
function parseUserAgent() {
  if (typeof navigator === 'undefined') return {};
  
  const ua = navigator.userAgent;
  const browserInfo = {
    userAgent: ua,
    browserName: 'unknown',
    browserVersion: 'unknown',
    deviceType: 'desktop',
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  };

  // Detect browser
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browserInfo.browserName = 'Chrome';
    const match = ua.match(/Chrome\/(\d+)/);
    if (match) browserInfo.browserVersion = match[1];
  } else if (ua.includes('Firefox')) {
    browserInfo.browserName = 'Firefox';
    const match = ua.match(/Firefox\/(\d+)/);
    if (match) browserInfo.browserVersion = match[1];
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browserInfo.browserName = 'Safari';
    const match = ua.match(/Version\/(\d+)/);
    if (match) browserInfo.browserVersion = match[1];
  } else if (ua.includes('Edg')) {
    browserInfo.browserName = 'Edge';
    const match = ua.match(/Edg\/(\d+)/);
    if (match) browserInfo.browserVersion = match[1];
  }

  // Detect device type
  if (/Mobile|Android|iPhone|iPad/.test(ua)) {
    browserInfo.deviceType = /iPad/.test(ua) ? 'tablet' : 'mobile';
  }

  return browserInfo;
}

/**
 * Log an error to Supabase
 * @param {Error|string} error - Error object or error message
 * @param {Object} options - Additional options
 * @param {string} options.errorType - Type of error ('javascript', 'api', 'network', 'form', 'other')
 * @param {string} options.severity - Severity level ('error', 'warning', 'critical')
 * @param {Object} options.context - Additional context data
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : null;
    const browserInfo = parseUserAgent();

    // Extract error location from stack trace
    let errorLine = null;
    let errorColumn = null;
    if (errorStack) {
      const stackLines = errorStack.split('\n');
      const firstLine = stackLines.find(line => line.includes(':'));
      if (firstLine) {
        const match = firstLine.match(/:(\d+):(\d+)/);
        if (match) {
          errorLine = parseInt(match[1], 10);
          errorColumn = parseInt(match[2], 10);
        }
      }
    }

    const errorData = {
      p_error_type: options.errorType || 'javascript',
      p_error_message: errorMessage.substring(0, 1000), // Limit message length
      p_error_stack: errorStack ? errorStack.substring(0, 5000) : null, // Limit stack length
      p_error_url: getCurrentUrl(),
      p_error_line: errorLine,
      p_error_column: errorColumn,
      p_user_agent: browserInfo.userAgent,
      p_session_id: getSessionId(),
      p_severity: options.severity || 'error',
      p_context: options.context || null
    };

    // Call RPC function to log error
    const { data, error: rpcError } = await supabase.rpc('log_website_error', errorData);

    if (rpcError) {
      // Silently fail - don't break the app if error logging fails
      if (import.meta.env.DEV) {
        console.warn('Failed to log error to Supabase:', rpcError);
      }
    }

    return data;
  } catch (err) {
    // Silently fail - don't break the app if error logging fails
    if (import.meta.env.DEV) {
      console.warn('Exception while logging error:', err);
    }
  }
}

/**
 * Log a performance metric to Supabase
 * @param {string} metricName - Name of the metric (e.g., 'LCP', 'FID', 'CLS')
 * @param {number} metricValue - Value of the metric
 * @param {Object} options - Additional options
 */
export async function logPerformanceMetric(metricName, metricValue, options = {}) {
  // Don't log in development (too noisy)
  if (import.meta.env.DEV) {
    return;
  }

  // Don't log if Supabase not configured
  if (!supabase) {
    return;
  }

  try {
    const browserInfo = parseUserAgent();

    const metricData = {
      p_metric_type: options.metricType || 'core_web_vital',
      p_metric_name: metricName,
      p_metric_value: metricValue,
      p_metric_unit: options.unit || 'ms',
      p_page_url: getCurrentUrl(),
      p_page_path: getCurrentPath(),
      p_user_agent: browserInfo.userAgent,
      p_session_id: getSessionId(),
      p_device_type: browserInfo.deviceType,
      p_browser_name: browserInfo.browserName,
      p_browser_version: browserInfo.browserVersion,
      p_viewport_width: browserInfo.viewportWidth,
      p_viewport_height: browserInfo.viewportHeight,
      p_additional_data: options.additionalData || null
    };

    // Call RPC function to log performance metric
    const { data, error: rpcError } = await supabase.rpc('log_website_performance', metricData);

    if (rpcError) {
      // Silently fail - don't break the app if performance logging fails
      if (import.meta.env.DEV) {
        console.warn('Failed to log performance metric to Supabase:', rpcError);
      }
    }

    return data;
  } catch (err) {
    // Silently fail - don't break the app if performance logging fails
    if (import.meta.env.DEV) {
      console.warn('Exception while logging performance metric:', err);
    }
  }
}

