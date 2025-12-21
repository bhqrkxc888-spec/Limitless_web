/**
 * Cloudflare Turnstile Component
 * 
 * Privacy-friendly invisible CAPTCHA that protects forms from bots
 * without requiring user interaction in most cases.
 * 
 * Requires:
 * - VITE_TURNSTILE_SITE_KEY environment variable
 * - Turnstile script loaded (handled by this component)
 * 
 * Setup:
 * 1. Create free account at https://dash.cloudflare.com
 * 2. Go to Turnstile and add your site
 * 3. Copy site key to VITE_TURNSTILE_SITE_KEY env var
 * 4. Copy secret key to TURNSTILE_SECRET_KEY env var (for server-side verification)
 */

import { useEffect, useRef, useCallback } from 'react';

// Turnstile script URL
const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

// Track if script is loading/loaded
let scriptLoading = false;
let scriptLoaded = false;
const loadCallbacks = [];

/**
 * Load Turnstile script dynamically
 */
function loadTurnstileScript() {
  return new Promise((resolve) => {
    if (scriptLoaded && window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    loadCallbacks.push(resolve);

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoaded = true;
      loadCallbacks.forEach(cb => cb(window.turnstile));
      loadCallbacks.length = 0;
    };

    script.onerror = () => {
      console.error('Failed to load Turnstile script');
      loadCallbacks.forEach(cb => cb(null));
      loadCallbacks.length = 0;
    };

    document.head.appendChild(script);
  });
}

/**
 * Turnstile CAPTCHA Component
 * 
 * @param {Function} onVerify - Callback when verification succeeds (receives token)
 * @param {Function} onError - Callback when verification fails
 * @param {Function} onExpire - Callback when token expires
 * @param {string} action - Action name for analytics (optional)
 * @param {'auto'|'managed'|'invisible'} mode - Widget appearance mode (default: invisible)
 */
function Turnstile({
  onVerify,
  onError,
  onExpire,
  action = 'contact_form',
  mode = 'invisible'
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  // Check if Turnstile is enabled
  const isEnabled = !!siteKey;

  const renderWidget = useCallback(async () => {
    if (!isEnabled || !containerRef.current) {
      return;
    }

    const turnstile = await loadTurnstileScript();

    if (!turnstile || !containerRef.current) {
      return;
    }

    // Remove any existing widget
    if (widgetIdRef.current !== null) {
      try {
        turnstile.remove(widgetIdRef.current);
      } catch {
        // Widget might already be removed
      }
    }

    // Render new widget
    try {
      widgetIdRef.current = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: action,
        appearance: mode === 'invisible' ? 'interaction-only' : mode,
        callback: (token) => {
          onVerify?.(token);
        },
        'error-callback': () => {
          onError?.();
        },
        'expired-callback': () => {
          onExpire?.();
        }
      });
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      onError?.();
    }
  }, [siteKey, action, mode, onVerify, onError, onExpire, isEnabled]);

  useEffect(() => {
    renderWidget();

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [renderWidget]);

  // If not enabled, render nothing
  if (!isEnabled) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="turnstile-container"
      style={{ minHeight: mode === 'invisible' ? 0 : 65 }}
    />
  );
}

export default Turnstile;

// Note: Server-side token verification should be done in API routes (api/admin/*.js)
// using the TURNSTILE_SECRET_KEY environment variable.
// See: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

