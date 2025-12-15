/**
 * Admin Session Validation API Endpoint
 * Vercel Serverless Function
 * 
 * Validates session cookie and checks expiry
 */

// Session expiry times (in milliseconds)
const SHORT_SESSION = 30 * 60 * 1000; // 30 minutes
const LONG_SESSION = 7 * 24 * 60 * 60 * 1000; // 7 days

function parseCookies(cookieHeader) {
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

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionCookie = cookies.admin_session;

    if (!sessionCookie) {
      return res.status(401).json({ 
        authenticated: false,
        error: 'No session found'
      });
    }

    // Parse token payload: token|timestamp
    const [token, timestampStr] = sessionCookie.split('|');
    
    if (!token || !timestampStr) {
      // Invalid cookie format - clear it
      res.setHeader('Set-Cookie', [
        'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
        'admin_session_active=; Path=/; Max-Age=0'
      ]);
      return res.status(401).json({ 
        authenticated: false,
        error: 'Invalid session format'
      });
    }

    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    const age = now - timestamp;

    // Check if session has expired (use long session as max for cookie-based expiry)
    // Actual expiry is handled by cookie Max-Age, this is a double-check
    if (age > LONG_SESSION) {
      res.setHeader('Set-Cookie', [
        'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
        'admin_session_active=; Path=/; Max-Age=0'
      ]);
      return res.status(401).json({ 
        authenticated: false,
        error: 'Session expired'
      });
    }

    // Session is valid
    return res.status(200).json({ 
      authenticated: true,
      sessionAge: age,
      // Return remaining time (approximate, based on long session max)
      expiresIn: Math.max(0, LONG_SESSION - age)
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(500).json({ 
      authenticated: false,
      error: 'Internal server error' 
    });
  }
}

