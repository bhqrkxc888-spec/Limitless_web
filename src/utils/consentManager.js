/**
 * Cookie Consent Manager
 * Handles cookie consent state and provides utilities to check consent before loading scripts
 * 
 * Storage:
 * - localStorage: For immediate UX (client-side, persists across sessions)
 * - Supabase: For legal compliance (server-side, audit trail)
 * 
 * GDPR Requirements:
 * - Consent records must be stored server-side for legal proof
 * - Keep records for 1-2 years minimum
 * - Store IP address, timestamp, consent status
 */

import { supabase } from '../lib/supabase';

const CONSENT_KEY = 'cookie-consent';
const CONSENT_DATE_KEY = 'cookie-consent-date';

/**
 * Get current consent status
 * @returns {string|null} 'accepted', 'rejected', or null (no decision yet)
 */
export function getConsentStatus() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CONSENT_KEY);
}

/**
 * Check if user has accepted cookies
 * @returns {boolean}
 */
export function hasConsent() {
  return getConsentStatus() === 'accepted';
}

/**
 * Check if user has rejected cookies
 * @returns {boolean}
 */
export function hasRejectedConsent() {
  return getConsentStatus() === 'rejected';
}

/**
 * Check if user has made a consent decision
 * @returns {boolean}
 */
export function hasConsentDecision() {
  return getConsentStatus() !== null;
}

/**
 * Set consent status
 * @param {string} status - 'accepted' or 'rejected'
 * @param {Object} options - Optional: cookieCategories, consentMethod
 */
export async function setConsentStatus(status, options = {}) {
  if (typeof window === 'undefined') return;
  if (status !== 'accepted' && status !== 'rejected') return;
  
  const timestamp = new Date().toISOString();
  
  // Store in localStorage immediately (for UX - don't wait for server)
  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem(CONSENT_DATE_KEY, timestamp);
  
  // Store on server for GDPR compliance (fire and forget - don't block UX)
  if (supabase) {
    storeConsentOnServer(status, timestamp, options).catch(err => {
      // Silently fail - localStorage is primary, server is backup for legal compliance
      // Log in development only
      if (import.meta.env.DEV) {
        console.warn('Failed to store consent on server:', err);
      }
    });
  }
  
  // Dispatch event so components can react
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
    detail: { status } 
  }));
}

/**
 * Store consent record on server (Supabase)
 * This provides legal proof of consent for GDPR compliance
 * @private
 */
async function storeConsentOnServer(status, timestamp, options = {}) {
  if (!supabase) return;
  
  try {
    // Get user's IP address (via a simple service or from headers if available)
    // Note: In production, IP should come from server-side, but for client-side
    // we can use a service or leave null (server can capture it)
    const ipAddress = null; // Will be captured by Supabase if using edge functions
    
    const consentData = {
      consent_status: status,
      consent_date: timestamp,
      cookie_categories: options.cookieCategories || { 
        essential: true, 
        analytics: status === 'accepted',
        marketing: status === 'accepted',
        functional: status === 'accepted'
      },
      consent_method: options.consentMethod || 'banner',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    };
    
    // Use schema-qualified table name (crm.cookie_consents)
    // If table doesn't exist yet, this will fail gracefully
    const { error } = await supabase
      .from('cookie_consents')
      .insert([consentData]);
    
    // Note: If using schema-qualified name, you may need to use RPC or direct SQL
    // For now, this assumes the table is in the public schema or accessible via anon key
    
    if (error) {
      // If table doesn't exist yet, that's OK - we'll add it later
      // localStorage is still working, so UX is not affected
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        // Table doesn't exist - this is expected if not set up yet
        return;
      }
      throw error;
    }
  } catch (error) {
    // Don't throw - this is background storage for compliance
    // localStorage is the primary storage for UX
    throw error;
  }
}

/**
 * Clear consent (for testing or user preference changes)
 */
export function clearConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_DATE_KEY);
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
    detail: { status: null } 
  }));
}

/**
 * Load script only if consent is given
 * @param {string} src - Script source URL
 * @param {Object} options - Script options (async, defer, etc.)
 * @returns {Promise<boolean>} True if loaded, false if consent not given
 */
export function loadScriptWithConsent(src, options = {}) {
  if (!hasConsent()) {
    console.warn(`Script ${src} not loaded - consent not given`);
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async !== false;
    script.defer = options.defer || false;
    
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
}

/**
 * Load multiple scripts only if consent is given
 * @param {Array<string>} sources - Array of script source URLs
 * @param {Object} options - Script options
 * @returns {Promise<Array<boolean>>} Array of load results
 */
export async function loadScriptsWithConsent(sources, options = {}) {
  if (!hasConsent()) {
    console.warn('Scripts not loaded - consent not given');
    return sources.map(() => false);
  }

  return Promise.all(
    sources.map(src => loadScriptWithConsent(src, options))
  );
}

