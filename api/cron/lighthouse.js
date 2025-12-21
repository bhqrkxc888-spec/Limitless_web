/**
 * Cron Job: Run Lighthouse Audit
 * 
 * Runs automatically every 24 hours via Vercel Cron
 * Stores results in Supabase for admin dashboard
 * 
 * Schedule: Daily at 2 AM UTC (configured in vercel.json)
 * 
 * Note: This calls the lighthouse API endpoint internally
 */

export default async function handler(req, res) {
  // Verify cron secret (if set)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers['authorization'] !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('[Cron] Running scheduled Lighthouse audit...');

    // Get the base URL (Vercel provides this)
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://www.limitlesscruises.com';

    // Run both desktop and mobile audits
    const strategies = ['desktop', 'mobile'];
    const results = [];

    for (const strategy of strategies) {
      try {
        const response = await fetch(`${baseUrl}/api/admin/lighthouse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: 'https://www.limitlesscruises.com',
            strategy: strategy
          })
        });

        if (!response.ok) {
          const error = await response.text();
          console.error(`[Cron] Lighthouse ${strategy} failed:`, error);
          results.push({ strategy, success: false, error: error });
          continue;
        }

        const result = await response.json();
        results.push({ strategy, success: true, data: result });
        console.log(`[Cron] Lighthouse ${strategy} complete: Performance ${result.data.scores.performance}`);
      } catch (error) {
        console.error(`[Cron] Error running Lighthouse ${strategy}:`, error);
        results.push({ strategy, success: false, error: error.message });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Lighthouse audit completed',
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Cron] Lighthouse cron job error:', error);
    return res.status(500).json({
      error: 'Failed to run Lighthouse audit',
      message: error.message
    });
  }
}

