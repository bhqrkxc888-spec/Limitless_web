/**
 * Admin Logout API Endpoint
 * Vercel Serverless Function
 * 
 * Clears session cookies
 */

export default async function handler(req, res) {
  // Allow both GET and POST for logout
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear cookies by setting them with expired date
    res.setHeader('Set-Cookie', [
      'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      'admin_session_active=; Path=/; Max-Age=0'
    ]);

    return res.status(200).json({ 
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

