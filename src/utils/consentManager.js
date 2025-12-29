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
 * - Consent expires after 12 months (user must re-consent)
 * 
 * Consent Expiration:
 * - Client-side (localStorage): Expires after 12 months, banner reappears
 * - Server-side (database): Records kept for 2 years for audit purposes
 */

import { logger } from './logger';

const CONSENT_KEY = 'cookie-consent';
const CONSENT_DATE_KEY = 'cookie-consent-date';

// Consent expires after 12 months (GDPR best practice: 12-13 months)
// This ensures users are re-asked for consent periodically
const CONSENT_EXPIRY_MONTHS = 12;

/**
 * Check if consent has expired
 * @returns {boolean} True if consent exists but has expired
 */
function isConsentExpired() {
  if (typeof window === 'undefined') return false;
  
  const consentDate = localStorage.getItem(CONSENT_DATE_KEY);
  if (!consentDate) return false;
  
  const consentTimestamp = new Date(consentDate);
  const expiryDate = new Date(consentTimestamp);
  expiryDate.setMonth(expiryDate.getMonth() + CONSENT_EXPIRY_MONTHS);
  
  return new Date() > expiryDate;
}

/**
 * Get current consent status
 * Returns null if consent has expired or was never given
 * @returns {string|null} 'accepted', 'rejected', or null (no decision yet or expired)
 */
export function getConsentStatus() {
  if (typeof window === 'undefined') return null;
  
  // If consent has expired, clear it and return null
  if (isConsentExpired()) {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_DATE_KEY);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
      detail: { status: null } 
    }));
    return null;
  }
  
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
 */
export function setConsentStatus(status) {
  if (typeof window === 'undefined') return;
  if (status !== 'accepted' && status !== 'rejected') return;
  
  const timestamp = new Date().toISOString();
  
  // Store in localStorage immediately (for UX - don't wait for server)
  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem(CONSENT_DATE_KEY, timestamp);
  
  // Server-side storage disabled - localStorage is sufficient for most use cases
  // To enable GDPR audit trail storage, create the store_cookie_consent RPC in Supabase
  
  // Dispatch event so components can react
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
    detail: { status } 
  }));
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
    logger.warn(`Script ${src} not loaded - consent not given`);
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
 * @returns {Promise<Array<boolean>>} Array of load results (resolves even if some fail)
 */
export async function loadScriptsWithConsent(sources, options = {}) {
  if (!hasConsent()) {
    logger.warn('Scripts not loaded - consent not given');
    return sources.map(() => false);
  }

  // Use Promise.allSettled to ensure we get results even if some scripts fail
  const results = await Promise.allSettled(
    sources.map(src => loadScriptWithConsent(src, options))
  );
  
  // Convert settled results to boolean array
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : false
  );
}

