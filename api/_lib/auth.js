/**
 * Admin Authentication Library
 * 
 * Provides secure authentication utilities for admin API routes.
 * Supports both legacy (env password) and new (database users) authentication.
 */

import { createClient } from '@supabase/supabase-js';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

// Initialize Supabase admin client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Rate limiting (in-memory, per-instance)
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Check if IP is rate limited
 * @param {string} ip - Client IP address
 * @returns {{ allowed: boolean, retryAfter?: number }}
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  
  // Filter out old attempts
  const recentAttempts = attempts.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    const oldestAttempt = Math.min(...recentAttempts);
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - oldestAttempt)) / 1000);
    return { allowed: false, retryAfter };
  }
  
  return { allowed: true };
}

/**
 * Record a login attempt for rate limiting
 * @param {string} ip - Client IP address
 */
export function recordLoginAttempt(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  attempts.push(now);
  loginAttempts.set(ip, attempts.filter(time => now - time < RATE_LIMIT_WINDOW));
}

/**
 * Clear rate limit for IP (after successful login)
 * @param {string} ip - Client IP address
 */
export function clearRateLimit(ip) {
  loginAttempts.delete(ip);
}

/**
 * Hash password using scrypt
 * @param {string} password - Plain text password
 * @returns {string} - Format: salt:hash (hex encoded)
 */
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored hash
 * @param {string} password - Plain text password to verify
 * @param {string} storedHash - Stored hash in format salt:hash
 * @returns {boolean}
 */
export function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    
    const testHash = scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(hash, 'hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(testHash, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Generate secure session token
 * @returns {string}
 */
export function generateSessionToken() {
  return randomBytes(32).toString('hex');
}

/**
 * Authenticate user with username and password
 * Supports both database users and legacy env password
 * 
 * @param {string} username - Username or empty for legacy auth
 * @param {string} password - Password
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export async function authenticateUser(username, password) {
  // Legacy auth: if no username provided, use ADMIN_PASSWORD
  if (!username) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      return {
        success: true,
        user: {
          id: 'legacy',
          username: 'admin',
          role: 'admin',
          displayName: 'Administrator'
        }
      };
    }
    return { success: false, error: 'Invalid credentials' };
  }
  
  // Database auth
  if (!supabase) {
    // Fall back to legacy if Supabase not configured
    return authenticateUser(null, password);
  }
  
  try {
    // Get user from database
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, username, password_hash, email, display_name, role, is_active, locked_until, failed_login_attempts')
      .eq('username', username)
      .maybeSingle();
    
    if (error) {
      console.error('Database error during auth:', error.message);
      // Fall back to legacy auth on database error
      return authenticateUser(null, password);
    }
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Check if account is active
    if (!user.is_active) {
      return { success: false, error: 'Account is disabled' };
    }
    
    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const unlockTime = new Date(user.locked_until);
      return { 
        success: false, 
        error: `Account locked until ${unlockTime.toLocaleTimeString()}` 
      };
    }
    
    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      // Increment failed attempts
      const newAttempts = (user.failed_login_attempts || 0) + 1;
      const updates = { failed_login_attempts: newAttempts };
      
      // Lock account after 5 failed attempts
      if (newAttempts >= 5) {
        updates.locked_until = new Date(Date.now() + LOCKOUT_DURATION).toISOString();
      }
      
      await supabase
        .from('admin_users')
        .update(updates)
        .eq('id', user.id);
      
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Successful login - reset failed attempts and update last login
    await supabase
      .from('admin_users')
      .update({
        failed_login_attempts: 0,
        locked_until: null,
        last_login_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.display_name,
        role: user.role
      }
    };
  } catch (err) {
    console.error('Auth error:', err);
    // Fall back to legacy auth on error
    return authenticateUser(null, password);
  }
}

/**
 * Validate session from cookie
 * @param {string} sessionCookie - Session cookie value
 * @returns {{ valid: boolean, expired?: boolean, userId?: string }}
 */
export function validateSession(sessionCookie) {
  if (!sessionCookie) {
    return { valid: false };
  }
  
  try {
    const [token, timestampStr, userId] = sessionCookie.split('|');
    
    if (!token || !timestampStr) {
      return { valid: false };
    }
    
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days max
    
    if (now - timestamp > maxAge) {
      return { valid: false, expired: true };
    }
    
    return { valid: true, userId: userId || 'legacy' };
  } catch {
    return { valid: false };
  }
}

/**
 * Create session cookie value
 * @param {string} userId - User ID to store in session
 * @returns {string}
 */
export function createSessionValue(userId = 'legacy') {
  const token = generateSessionToken();
  const timestamp = Date.now();
  return `${token}|${timestamp}|${userId}`;
}

/**
 * Get client IP from request
 * @param {object} req - Request object
 * @returns {string}
 */
export function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.socket?.remoteAddress ||
         'unknown';
}

/**
 * Parse cookies from request
 * @param {string} cookieHeader - Cookie header string
 * @returns {object}
 */
export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = value;
    }
  });
  
  return cookies;
}

export default {
  checkRateLimit,
  recordLoginAttempt,
  clearRateLimit,
  hashPassword,
  verifyPassword,
  generateSessionToken,
  authenticateUser,
  validateSession,
  createSessionValue,
  getClientIP,
  parseCookies
};

