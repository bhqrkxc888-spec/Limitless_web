/**
 * Admin Authentication Hook
 * 
 * Handles admin session state and authentication
 */

import { useState, useEffect, useCallback } from 'react';

// Check if we have an active session cookie (client-side flag)
function hasSessionCookie() {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes('admin_session_active=true');
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate session with server
  const validateSession = useCallback(async () => {
    // Quick check - if no cookie, don't bother calling API
    if (!hasSessionCookie()) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch('/api/admin/session', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok && data.authenticated) {
        setIsAuthenticated(true);
        setError(null);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (err) {
      console.error('Session validation error:', err);
      setIsAuthenticated(false);
      setError('Failed to validate session');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password, rememberMe })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setError(null);
        return { success: true };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = 'Network error. Please try again.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setError(null);
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    validateSession();
  }, [validateSession]);

  // Set up inactivity timeout (30 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimeout;
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        logout();
      }, INACTIVITY_LIMIT);
    };

    // Track user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimeout, { passive: true });
    });

    // Initial timeout
    resetTimeout();

    return () => {
      clearTimeout(inactivityTimeout);
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [isAuthenticated, logout]);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    validateSession
  };
}

export default useAdminAuth;

