/**
 * Performance Metrics API Endpoint
 * Accepts Core Web Vitals metrics from the frontend
 * 
 * Note: Currently logs to console. In production, you may want to:
 * - Store in Supabase analytics table
 * - Forward to external analytics service (Google Analytics, etc.)
 * - Aggregate and report via admin dashboard
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { metric_name, metric_value, page_url, user_agent } = req.body;

    // Validate required fields
    if (!metric_name || metric_value === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log the metric (in production, you'd store this in a database)
    console.log('Performance Metric:', {
      metric_name,
      metric_value,
      page_url,
      user_agent,
      timestamp: new Date().toISOString()
    });

    // TODO: Store in Supabase analytics table when configured
    // await supabase.from('performance_metrics').insert({
    //   metric_name,
    //   metric_value,
    //   page_url,
    //   user_agent,
    //   created_at: new Date().toISOString()
    // });

    // Return 204 No Content (success, no response body needed)
    return res.status(204).end();
  } catch (error) {
    console.error('Error processing performance metric:', error);
    // Still return 204 to prevent frontend errors
    return res.status(204).end();
  }
}

