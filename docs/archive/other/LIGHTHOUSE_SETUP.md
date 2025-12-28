# Lighthouse Setup Checklist

## ✅ Step 1: Run Supabase Migration

Copy this SQL and run it in your Supabase SQL Editor:

1. Go to: https://supabase.com/dashboard/project/[your-project]/sql/new
2. Paste this entire script:

```sql
-- Create website_lighthouse table for storing Lighthouse audit results
CREATE TABLE IF NOT EXISTS website_lighthouse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  strategy TEXT NOT NULL CHECK (strategy IN ('desktop', 'mobile')),
  performance_score INTEGER NOT NULL CHECK (performance_score >= 0 AND performance_score <= 100),
  accessibility_score INTEGER NOT NULL CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  best_practices_score INTEGER NOT NULL CHECK (best_practices_score >= 0 AND best_practices_score <= 100),
  seo_score INTEGER NOT NULL CHECK (seo_score >= 0 AND seo_score <= 100),
  
  -- Core Web Vitals (in milliseconds)
  lcp NUMERIC,
  fid NUMERIC,
  cls NUMERIC,
  fcp NUMERIC,
  tti NUMERIC,
  speed_index NUMERIC,
  tbt NUMERIC,
  
  -- Opportunities and diagnostics (stored as JSONB)
  opportunities JSONB DEFAULT '[]'::jsonb,
  diagnostics JSONB DEFAULT '[]'::jsonb,
  
  -- Full raw data from PageSpeed Insights (for detailed analysis)
  raw_data JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_created_at ON website_lighthouse(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_strategy ON website_lighthouse(strategy);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_url ON website_lighthouse(url);

-- Add RLS policies (if RLS is enabled)
ALTER TABLE website_lighthouse ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all results
DROP POLICY IF EXISTS "Allow authenticated users to read lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow authenticated users to read lighthouse results"
  ON website_lighthouse
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role to insert (for API endpoints)
DROP POLICY IF EXISTS "Allow service role to insert lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow service role to insert lighthouse results"
  ON website_lighthouse
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow anon to read (for admin dashboard)
DROP POLICY IF EXISTS "Allow anon to read lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow anon to read lighthouse results"
  ON website_lighthouse
  FOR SELECT
  TO anon
  USING (true);

-- Add comment
COMMENT ON TABLE website_lighthouse IS 'Stores Lighthouse audit results from Google PageSpeed Insights API';
COMMENT ON COLUMN website_lighthouse.strategy IS 'Audit strategy: desktop or mobile';
COMMENT ON COLUMN website_lighthouse.opportunities IS 'JSON array of optimization opportunities';
COMMENT ON COLUMN website_lighthouse.diagnostics IS 'JSON array of diagnostic information';
COMMENT ON COLUMN website_lighthouse.raw_data IS 'Full raw response from PageSpeed Insights API';
```

3. Click "Run" to execute
4. You should see: "Success. No rows returned"

---

## ⚠️ Step 2: Get PageSpeed Insights API Key (Required!)

The "Performance: 0" issue is likely because you need a PageSpeed API key.

### Get Your Free API Key:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Copy the API key (format: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
4. (Optional) Click "Restrict Key" and limit to "PageSpeed Insights API"

### Add to Vercel:

1. Go to: https://vercel.com/[your-project]/settings/environment-variables
2. Add new variable:
   - **Name:** `PAGESPEED_API_KEY`
   - **Value:** Your API key from above
   - **Environment:** All (Production, Preview, Development)
3. Click "Save"
4. Redeploy your site

---

## ✅ Step 3: Verify Existing Environment Variables

Make sure these are set in Vercel:

### Already Set (Check these exist):
```
VITE_SUPABASE_URL = https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD = [your-admin-password]
CRON_SECRET = [your-cron-secret]
VITE_SITE_LAUNCHED = false
```

### Need to Add:
```
PAGESPEED_API_KEY = AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (from Step 2)
```

---

## 🧪 Step 4: Test After Deployment

After completing steps 1-3 and redeploying:

1. Go to: `https://www.limitlesscruises.com/admin`
2. Log in with your admin password
3. Click "Lighthouse" in the sidebar
4. Click "Run Audit Now" button
5. Wait 10-15 seconds for the audit to complete
6. You should see real performance scores!

---

## 🔍 Troubleshooting

### If you still see "Performance: 0":

1. **Check Vercel Logs:**
   - Go to: https://vercel.com/[your-project]/logs
   - Look for errors in the `/api/admin/lighthouse` function
   - Common errors:
     - "Invalid API key" → Check your PAGESPEED_API_KEY
     - "Quota exceeded" → You've hit the daily free limit (25,000 requests)
     - "URL not found" → The site might be returning an error

2. **Check Supabase Table:**
   - Go to Supabase → Table Editor
   - Check if `website_lighthouse` table exists
   - Check if any rows have been inserted

3. **Try Manual API Call:**
   - Use the "Run Audit Now" button in the admin
   - Check the browser console for errors (F12 → Console tab)

### If Supabase won't save results:

The warning "Supabase not configured - skipping storage" means:
- Supabase environment variables aren't accessible in the API route
- Or the table doesn't exist yet

**Fix:**
- Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Note: API routes use `process.env` not `import.meta.env`
- You may need to add non-VITE versions in Vercel:
  ```
  SUPABASE_URL = [same as VITE_SUPABASE_URL]
  SUPABASE_ANON_KEY = [same as VITE_SUPABASE_ANON_KEY]
  ```

---

## 📊 Expected Results

After successful setup, you should see:

### In Admin Dashboard (`/admin`):
- LCP: ~2.5s (Good)
- CLS: ~0.05 (Good)

### In Lighthouse Page (`/admin/lighthouse`):
- Performance: 85-95 (Good)
- Accessibility: 90-100 (Good)
- Best Practices: 90-100 (Good)
- SEO: 90-100 (Good)

### Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## ⏰ Cron Job (Already Configured)

Your Lighthouse audit will run automatically every day at 2 AM UTC.

**Configured in:** `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/cron/lighthouse",
      "schedule": "0 2 * * *"
    }
  ]
}
```

This means you'll get daily performance reports without doing anything!

---

## 🎯 Quick Start (TL;DR)

1. ✅ Run Supabase migration (SQL above)
2. ⚠️ Get PageSpeed API key: https://console.cloud.google.com/apis/credentials
3. ⚠️ Add `PAGESPEED_API_KEY` to Vercel env vars
4. 🚀 Redeploy
5. 🧪 Test in `/admin/lighthouse`

---

## 📞 Need Help?

If you get stuck:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Check Supabase logs
4. Make sure the API key is valid

The most common issue is missing the `PAGESPEED_API_KEY` - this is REQUIRED for Lighthouse to work!
