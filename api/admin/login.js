/**
 * Admin Login API Endpoint
 * Vercel Serverless Function
 * 
 * Validates password and creates session token
 */

// Simple in-memory rate limiting (per instance)
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  
  // Filter out old attempts
  const recentAttempts = attempts.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return false;
  }
  
  recentAttempts.push(now);
  loginAttempts.set(ip, recentAttempts);
  return true;
}

function generateToken() {
  // Generate a secure random token
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
             req.headers['x-real-ip'] || 
             'unknown';

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ 
      error: 'Too many login attempts. Please wait a minute and try again.',
      retryAfter: 60
    });
  }

  try {
    const { password, rememberMe } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Validate password
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate session token
    const token = generateToken();
    const timestamp = Date.now();
    
    // Token payload: token|timestamp (for server-side validation)
    const tokenPayload = `${token}|${timestamp}`;
    
    // Set session expiry: 7 days if rememberMe, 30 minutes otherwise
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 30 * 60;
    
    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `admin_session=${tokenPayload}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`,
      `admin_session_active=true; Path=/; Max-Age=${maxAge}` // Non-httponly flag for client-side checks
    ]);

    return res.status(200).json({ 
      success: true,
      expiresIn: maxAge
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

