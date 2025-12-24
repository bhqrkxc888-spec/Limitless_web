/**
 * Admin Login API Endpoint
 * Vercel Serverless Function
 * 
 * Validates credentials and creates session token.
 * Supports both:
 * - Legacy mode: password-only authentication via ADMIN_PASSWORD env var
 * - Database mode: username/password authentication via web.admin_users table
 * 
 * The system automatically detects which mode to use based on request format.
 */

import { 
  checkRateLimit, 
  recordLoginAttempt, 
  clearRateLimit,
  authenticateUser, 
  createSessionValue,
  getClientIP
} from '../_lib/auth.js';
import { validateString } from '../_lib/validation.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const ip = getClientIP(req);

  // Check rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return res.status(429).json({ 
      error: 'Too many login attempts. Please wait and try again.',
      retryAfter: rateCheck.retryAfter
    });
  }

  try {
    const { username, password, rememberMe } = req.body;

    // Validate password is provided
    const passwordValidation = validateString(password, 'password', { minLength: 1, maxLength: 100 });
    if (!passwordValidation.valid) {
      recordLoginAttempt(ip);
      return res.status(400).json({ error: passwordValidation.error });
    }

    // Optional username validation (for database auth)
    if (username) {
      const usernameValidation = validateString(username, 'username', { 
        minLength: 3, 
        maxLength: 50, 
        required: false 
      });
      if (!usernameValidation.valid) {
        recordLoginAttempt(ip);
        return res.status(400).json({ error: usernameValidation.error });
      }
    }

    // Authenticate user
    const authResult = await authenticateUser(username || null, password);
    
    if (!authResult.success) {
      recordLoginAttempt(ip);
      return res.status(401).json({ error: authResult.error || 'Invalid credentials' });
    }

    // Clear rate limit on successful login
    clearRateLimit(ip);

    // Create session token with user ID
    const sessionValue = createSessionValue(authResult.user?.id);
    
    // Set session expiry: 7 days if rememberMe, 30 minutes otherwise
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 30 * 60;
    
    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `admin_session=${sessionValue}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`,
      `admin_session_active=true; Path=/; Max-Age=${maxAge}` // Non-httponly flag for client-side checks
    ]);

    return res.status(200).json({ 
      success: true,
      expiresIn: maxAge,
      user: authResult.user ? {
        username: authResult.user.username,
        displayName: authResult.user.displayName,
        role: authResult.user.role
      } : null
    });

  } catch (error) {
    console.error('Login error:', error);
    recordLoginAttempt(ip);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
