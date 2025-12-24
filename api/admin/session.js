/**
 * Admin Session Validation API Endpoint
 * Vercel Serverless Function
 * 
 * Validates session cookie and returns session status.
 */

import { validateSession, parseCookies } from '../_lib/auth.js';

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

    // Validate the session
    const sessionResult = validateSession(sessionCookie);

    if (!sessionResult.valid) {
      // Clear invalid/expired cookies
      res.setHeader('Set-Cookie', [
        'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
        'admin_session_active=; Path=/; Max-Age=0'
      ]);
      
      return res.status(401).json({ 
        authenticated: false,
        error: sessionResult.expired ? 'Session expired' : 'Invalid session'
      });
    }

    // Session is valid
    return res.status(200).json({ 
      authenticated: true,
      userId: sessionResult.userId
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(500).json({ 
      authenticated: false,
      error: 'Internal server error' 
    });
  }
}
