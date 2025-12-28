# 🚀 Deployment Checklist - Analytics & Lighthouse

## ✅ Ready to Deploy
- [x] Vercel Analytics installed
- [x] Google Analytics 4 configured (G-GNY4BEL0HQ)
- [x] Admin dashboard redesigned
- [x] New Analytics page created
- [x] New Search Console page created
- [x] Lighthouse cron job configured (daily at 2 AM UTC)
- [x] Build successful
- [x] All code changes complete

## ⚠️ Complete After Deployment

### 1. Run Supabase Migration (5 minutes)

Go to: https://supabase.com/dashboard/project/xrbusklskmeaamwynfmm/sql/new

Paste and run:
```sql
-- Create website_lighthouse table
CREATE TABLE IF NOT EXISTS website_lighthouse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  strategy TEXT NOT NULL CHECK (strategy IN ('desktop', 'mobile')),
  performance_score INTEGER NOT NULL CHECK (performance_score >= 0 AND performance_score <= 100),
  accessibility_score INTEGER NOT NULL CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  best_practices_score INTEGER NOT NULL CHECK (best_practices_score >= 0 AND best_practices_score <= 100),
  seo_score INTEGER NOT NULL CHECK (seo_score >= 0 AND seo_score <= 100),
  lcp NUMERIC,
  fid NUMERIC,
  cls NUMERIC,
  fcp NUMERIC,
  tti NUMERIC,
  speed_index NUMERIC,
  tbt NUMERIC,
  opportunities JSONB DEFAULT '[]'::jsonb,
  diagnostics JSONB DEFAULT '[]'::jsonb,
  raw_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_website_lighthouse_created_at ON website_lighthouse(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_strategy ON website_lighthouse(strategy);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_url ON website_lighthouse(url);

ALTER TABLE website_lighthouse ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow authenticated users to read lighthouse results"
  ON website_lighthouse FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow service role to insert lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow service role to insert lighthouse results"
  ON website_lighthouse FOR INSERT TO service_role WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon to read lighthouse results" ON website_lighthouse;
CREATE POLICY "Allow anon to read lighthouse results"
  ON website_lighthouse FOR SELECT TO anon USING (true);
```

### 2. Get PageSpeed API Key (5 minutes)

**This is REQUIRED for Lighthouse to work!**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Copy the key (starts with `AIzaSy...`)
4. (Optional) Restrict to "PageSpeed Insights API"

### 3. Add Environment Variable to Vercel (2 minutes)

Go to: https://vercel.com/settings/environment-variables

Add:
```
Name: PAGESPEED_API_KEY
Value: [your key from step 2]
Environments: Production, Preview, Development
```

Click "Save"

### 4. Redeploy (1 minute)

After adding the API key, trigger a redeploy:
- Go to Vercel Dashboard → Deployments
- Click "..." on latest deployment → "Redeploy"

Or just push a new commit to trigger automatic deployment.

### 5. Test Everything (5 minutes)

After deployment:

1. **Test GA4:**
   - Visit your site
   - Check Real-Time report in GA4: https://analytics.google.com
   - Should see 1 active user (you!)

2. **Test Vercel Analytics:**
   - Visit: https://vercel.com/[your-project]/analytics
   - Should start showing page views

3. **Test Lighthouse:**
   - Go to: https://www.limitlesscruises.com/admin
   - Log in
   - Click "Lighthouse" in sidebar
   - Click "Run Audit Now"
   - Wait 15 seconds
   - Should see real scores!

---

## 📊 What You'll See After Setup

### Admin Dashboard (`/admin`)
- Real LCP and CLS metrics
- Error tracking
- SEO scores
- Quick links to all tools

### Lighthouse Page (`/admin/lighthouse`)
- Performance: 85-95
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 90-100
- Core Web Vitals (LCP, CLS, FID, etc.)
- Optimization opportunities
- Daily automated audits

### Analytics Page (`/admin/analytics`)
- Quote requests tracking (when implemented)
- Form submissions
- Phone/email/WhatsApp clicks
- Popular destinations
- Setup instructions for full implementation

### Search Console Page (`/admin/search-console`)
- Search impressions (when API is set up)
- Click-through rates
- Search rankings
- Top queries
- Setup instructions

---

## 🎯 Quick Start Commands

```bash
# 1. Commit all changes
git add .
git commit -m "feat: Complete analytics dashboard with Lighthouse, GA4, and Vercel Analytics"

# 2. Push to trigger deployment
git push origin main

# 3. Wait for Vercel to build and deploy (2-3 minutes)
```

---

## 🐛 If Something Goes Wrong

### Lighthouse shows "Performance: 0"
- ❌ Missing `PAGESPEED_API_KEY` → Add it to Vercel
- ❌ Table doesn't exist → Run Supabase migration
- ❌ API quota exceeded → You've hit the daily limit (25,000 free requests)

### GA4 not tracking
- ❌ Wrong measurement ID → Check it's `G-GNY4BEL0HQ`
- ❌ Ad blocker → Disable and test
- ❌ Cache → Wait 24-48 hours for data to appear

### Vercel Analytics not showing
- ❌ Not deployed yet → Push changes
- ❌ Wait a few minutes for data to populate

---

## 📞 Support

Check these resources:
- **Vercel Logs:** https://vercel.com/[project]/logs
- **Supabase Logs:** https://supabase.com/dashboard/project/xrbusklskmeaamwynfmm/logs
- **Browser Console:** Press F12 → Console tab

---

## 🎉 You're All Set!

Once you complete steps 1-5, you'll have:
- ✅ Real-time traffic analytics
- ✅ Daily performance audits
- ✅ User behavior tracking
- ✅ SEO monitoring
- ✅ Error tracking
- ✅ Business insights

Deploy now and let's get it running! 🚀

