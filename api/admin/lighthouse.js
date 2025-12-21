/**
 * Lighthouse / PageSpeed Insights API Endpoint
 * 
 * Runs Lighthouse audit via Google PageSpeed Insights API
 * Stores results in Supabase for admin dashboard
 * 
 * Can be called:
 * - Manually via admin dashboard
 * - Automatically via cron job (every 24 hours)
 * 
 * Requires: GOOGLE_PAGESPEED_API_KEY environment variable (optional, but recommended)
 * Without API key: limited to 25 requests/day (shared quota)
 * With API key: 25,000 requests/day
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const pagespeedApiKey = process.env.GOOGLE_PAGESPEED_API_KEY;

// Initialize Supabase with service role key for admin operations
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

const SITE_URL = 'https://www.limitlesscruises.com';

/**
 * Run PageSpeed Insights audit
 */
async function runPageSpeedInsights(url, strategy = 'desktop') {
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('strategy', strategy); // 'desktop' or 'mobile'
  apiUrl.searchParams.set('category', 'PERFORMANCE');
  apiUrl.searchParams.set('category', 'ACCESSIBILITY');
  apiUrl.searchParams.set('category', 'BEST_PRACTICES');
  apiUrl.searchParams.set('category', 'SEO');
  
  if (pagespeedApiKey) {
    apiUrl.searchParams.set('key', pagespeedApiKey);
  }

  const response = await fetch(apiUrl.toString());
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PageSpeed Insights API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Extract Lighthouse scores and metrics from PageSpeed Insights response
 */
function extractLighthouseData(psiData) {
  const lighthouse = psiData.lighthouseResult;
  const audits = lighthouse.audits;
  
  // Scores (0-100)
  const scores = {
    performance: Math.round(lighthouse.categories.performance.score * 100),
    accessibility: Math.round(lighthouse.categories.accessibility.score * 100),
    bestPractices: Math.round(lighthouse.categories['best-practices'].score * 100),
    seo: Math.round(lighthouse.categories.seo.score * 100)
  };

  // Core Web Vitals
  const metrics = {
    lcp: audits['largest-contentful-paint']?.numericValue || null,
    fid: audits['max-potential-fid']?.numericValue || null,
    cls: audits['cumulative-layout-shift']?.numericValue || null,
    fcp: audits['first-contentful-paint']?.numericValue || null,
    tti: audits['interactive']?.numericValue || null,
    speedIndex: audits['speed-index']?.numericValue || null,
    tbt: audits['total-blocking-time']?.numericValue || null
  };

  // Opportunities (optimization suggestions)
  const opportunities = Object.entries(audits)
    .filter(([key, audit]) => 
      audit.details?.type === 'opportunity' && 
      audit.numericValue && 
      audit.numericValue > 0
    )
    .map(([key, audit]) => ({
      id: key,
      title: audit.title,
      description: audit.description,
      savings: audit.numericValue,
      savingsUnit: audit.numericUnit || 'ms',
      score: audit.score
    }))
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 10); // Top 10 opportunities

  // Diagnostics
  const diagnostics = Object.entries(audits)
    .filter(([key, audit]) => 
      audit.details?.type === 'diagnostic' &&
      audit.score !== null &&
      audit.score < 1
    )
    .map(([key, audit]) => ({
      id: key,
      title: audit.title,
      description: audit.description,
      score: audit.score
    }))
    .slice(0, 10); // Top 10 diagnostics

  return {
    scores,
    metrics,
    opportunities,
    diagnostics,
    fetchTime: lighthouse.fetchTime,
    requestedUrl: lighthouse.requestedUrl,
    finalUrl: lighthouse.finalUrl
  };
}

/**
 * Store Lighthouse results in Supabase
 */
async function storeLighthouseResults(data, strategy) {
  if (!supabase) {
    console.warn('Supabase not configured - skipping storage');
    return null;
  }

  try {
    const { data: result, error } = await supabase
      .from('website_lighthouse')
      .insert({
        url: data.finalUrl || data.requestedUrl,
        strategy: strategy, // 'desktop' or 'mobile'
        performance_score: data.scores.performance,
        accessibility_score: data.scores.accessibility,
        best_practices_score: data.scores.bestPractices,
        seo_score: data.scores.seo,
        lcp: data.metrics.lcp,
        fid: data.metrics.fid,
        cls: data.metrics.cls,
        fcp: data.metrics.fcp,
        tti: data.metrics.tti,
        speed_index: data.metrics.speedIndex,
        tbt: data.metrics.tbt,
        opportunities: data.opportunities,
        diagnostics: data.diagnostics,
        raw_data: data, // Store full data for detailed analysis
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error) {
    console.error('Error storing Lighthouse results:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url = SITE_URL, strategy = 'desktop' } = req.body;

    // Validate strategy
    if (!['desktop', 'mobile'].includes(strategy)) {
      return res.status(400).json({ error: 'Strategy must be "desktop" or "mobile"' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    console.log(`[Lighthouse] Running audit for ${url} (${strategy})...`);

    // Run PageSpeed Insights
    const psiData = await runPageSpeedInsights(url, strategy);
    
    // Extract Lighthouse data
    const lighthouseData = extractLighthouseData(psiData);
    
    // Store results
    const storedResult = await storeLighthouseResults(lighthouseData, strategy);

    console.log(`[Lighthouse] Audit complete. Performance: ${lighthouseData.scores.performance}`);

    return res.status(200).json({
      success: true,
      data: lighthouseData,
      stored: !!storedResult,
      id: storedResult?.id || null
    });

  } catch (error) {
    console.error('[Lighthouse] Error:', error);
    return res.status(500).json({
      error: 'Failed to run Lighthouse audit',
      message: error.message
    });
  }
}

