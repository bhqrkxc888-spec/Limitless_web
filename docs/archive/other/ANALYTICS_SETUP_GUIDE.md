# Analytics Setup Guide for Limitless Cruises

## ✅ What's Been Implemented

### 1. Vercel Analytics (✓ INSTALLED)
- **Status:** Installed and active
- **Package:** `@vercel/analytics`
- **Location:** Integrated in `src/main.jsx`
- **What it tracks:**
  - Page views (real-time)
  - Top pages
  - Traffic sources
  - Geographic data
  - Device breakdown
  - Bounce rates

**View your analytics:** https://vercel.com/[your-project]/analytics

### 2. Google Analytics 4 (⚠️ REQUIRES SETUP)
- **Status:** Code integrated, needs GA4 property ID
- **Location:** `index.html` (lines 63-69)
- **Current placeholder:** `G-XXXXXXXXXX`

**Setup steps:**
1. Go to https://analytics.google.com
2. Create a new GA4 property for `limitlesscruises.com`
3. Get your Measurement ID (starts with `G-`)
4. Replace `G-XXXXXXXXXX` in `index.html` with your ID
5. Deploy to Vercel

**What it will track:**
- All page views
- User sessions
- Traffic sources (organic, direct, social, referral)
- Conversion events
- User demographics
- Engagement metrics

### 3. Lighthouse Performance Audits (✓ WORKING)
- **Status:** Fully integrated and running
- **API Endpoint:** `/api/admin/lighthouse`
- **Cron Job:** Daily at 2 AM UTC
- **Database:** `website_lighthouse` table
- **Admin Page:** `/admin/lighthouse`

**What it tracks:**
- Performance score (0-100)
- Accessibility score (0-100)
- Best Practices score (0-100)
- SEO score (0-100)
- Core Web Vitals (LCP, CLS, FID, INP, FCP, TTFB)
- Opportunities for improvement
- Diagnostics

### 4. Admin Analytics Dashboard (✓ CREATED)
- **Status:** Created and ready for data
- **Admin Page:** `/admin/analytics`
- **What it shows:**
  - Quote requests tracking
  - Form submissions
  - Phone clicks
  - WhatsApp opens
  - Cruise searches
  - Popular destinations
  - Popular cruise lines
  - Top articles

**Note:** Currently shows placeholder data. Will populate automatically once:
- GA4 is configured
- Conversion tracking is enabled
- Business metrics are collected

### 5. Google Search Console Integration (⚠️ REQUIRES SETUP)
- **Status:** Dashboard created, API not yet implemented
- **Admin Page:** `/admin/search-console`
- **What it will track:**
  - Search impressions
  - Clicks from Google Search
  - Average position in search results
  - Click-through rate (CTR)
  - Top search queries
  - Top pages in search

**See setup instructions below**

---

## 🚀 Quick Start: Essential Setup (30 minutes)

### Step 1: Configure Google Analytics 4 (10 minutes)

1. **Create GA4 Property:**
   - Go to https://analytics.google.com
   - Click "Admin" (gear icon)
   - Click "Create Property"
   - Name: "Limitless Cruises"
   - Select timezone: "United Kingdom"
   - Select currency: "GBP"

2. **Get Measurement ID:**
   - In your new property, go to "Data Streams"
   - Click "Add stream" → "Web"
   - Enter: `limitlesscruises.com`
   - Copy the Measurement ID (format: `G-XXXXXXXXXX`)

3. **Update Code:**
   - Open `index.html`
   - Replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID
   - Commit and push to GitHub

4. **Verify Installation:**
   - After deployment, install [Google Tag Assistant](https://tagassistant.google.com/)
   - Visit your site
   - Check that GA4 tag is firing

### Step 2: Set Up Vercel Analytics Pro (Optional, $10/month)

**Free tier includes:**
- Page views
- Top pages
- Visitors
- Countries

**Pro tier adds:**
- Detailed referrer data
- Device breakdown
- Real-time analytics
- More historical data
- Custom events

**To enable:**
1. Go to https://vercel.com/[your-project]/analytics
2. Click "Enable Analytics" or "Upgrade to Pro"

### Step 3: Configure Conversion Tracking (10 minutes)

Add event tracking to key actions:

**In Google Analytics 4:**
1. Go to Admin → Events
2. Click "Create Event"
3. Create these events:
   - `form_submission` (contact form, price match)
   - `phone_click` (tel: links)
   - `email_click` (mailto: links)
   - `whatsapp_click` (WhatsApp button)
   - `cruise_search` (widget interaction)

**In your code (future enhancement):**
```javascript
// Example: Track form submissions
gtag('event', 'form_submission', {
  form_type: 'contact',
  page_path: window.location.pathname
});
```

---

## 📊 Advanced Setup: Google Search Console (2 hours)

### Prerequisites
- Verified ownership of `limitlesscruises.com` in Search Console
- Google Cloud project with Search Console API enabled
- Service account with permissions

### Step 1: Verify Site in Search Console (15 minutes)

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://www.limitlesscruises.com`
4. Verify using **HTML tag method**:
   - Copy the verification meta tag
   - Already added to your `index.html` (you can add it if missing)
   - Click "Verify"

### Step 2: Enable Search Console API (10 minutes)

1. Go to https://console.cloud.google.com
2. Create new project (or use existing): "Limitless Cruises Analytics"
3. Go to "APIs & Services" → "Library"
4. Search for "Google Search Console API"
5. Click "Enable"

### Step 3: Create Service Account (20 minutes)

1. In Cloud Console, go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name: "search-console-reader"
4. Grant role: "Viewer"
5. Click "Done"
6. Click on the service account
7. Go to "Keys" tab
8. Click "Add Key" → "Create new key"
9. Choose "JSON" format
10. Download the key file

### Step 4: Grant Access in Search Console (5 minutes)

1. Go back to https://search.google.com/search-console
2. Select your property
3. Click "Settings" → "Users and permissions"
4. Click "Add user"
5. Enter the service account email (from JSON file)
6. Set permission: "Full" or "Restricted"
7. Click "Add"

### Step 5: Add Credentials to Vercel (10 minutes)

1. Open the downloaded JSON key file
2. Copy these values:
   - `client_email`
   - `private_key`
3. Go to https://vercel.com/[your-project]/settings/environment-variables
4. Add these variables:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL = [client_email from JSON]
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = [private_key from JSON]
   SEARCH_CONSOLE_SITE_URL = https://www.limitlesscruises.com
   ```
5. Redeploy your site

### Step 6: Create API Endpoint (30 minutes)

Create `/api/admin/search-console.js`:

```javascript
import { google } from 'googleapis';

const searchconsole = google.searchconsole('v1');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Query Search Console
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28); // Last 28 days

    const response = await searchconsole.searchanalytics.query({
      siteUrl: process.env.SEARCH_CONSOLE_SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query', 'page'],
        rowLimit: 100
      }
    });

    // Store in Supabase (implement this part)
    // ...

    res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Search Console API error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

### Step 7: Create Database Table (10 minutes)

Create migration: `supabase/migrations/YYYYMMDD_create_search_console_table.sql`

```sql
CREATE TABLE IF NOT EXISTS website_search_console (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  query TEXT NOT NULL,
  page TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr DECIMAL(5,4) DEFAULT 0,
  position DECIMAL(5,2) DEFAULT 0,
  date DATE NOT NULL,
  UNIQUE(query, page, date)
);

CREATE INDEX idx_search_console_date ON website_search_console(date DESC);
CREATE INDEX idx_search_console_query ON website_search_console(query);
CREATE INDEX idx_search_console_page ON website_search_console(page);
```

### Step 8: Set Up Daily Cron Job (10 minutes)

Create `/api/cron/search-console.js`:

```javascript
export const config = {
  maxDuration: 60
};

export default async function handler(req, res) {
  // Verify cron secret
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Call the Search Console API
    const response = await fetch(`${process.env.SITE_URL}/api/admin/search-console`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cron-Secret': process.env.CRON_SECRET
      }
    });

    const data = await response.json();
    res.status(200).json({ success: true, message: 'Search Console data updated', data });
  } catch (error) {
    console.error('Search Console cron error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/search-console",
      "schedule": "0 3 * * *"
    }
  ]
}
```

---

## 📈 What You Can Track Now

### Available Now (Vercel Analytics)
✅ Page views and unique visitors
✅ Top pages
✅ Traffic geography
✅ Device types
✅ Referrer sources

### After GA4 Setup (10 min setup)
✅ Detailed traffic sources
✅ User behavior flow
✅ Session duration
✅ Bounce rate by page
✅ Demographics
✅ Real-time users

### After Search Console Setup (2 hours setup)
✅ Google search impressions
✅ Click-through rates
✅ Search rankings
✅ Top keywords
✅ Search performance trends

### Future Enhancements
⏱️ Conversion tracking (form submissions, clicks)
⏱️ Business metrics (quotes, popular destinations)
⏱️ Heat maps (optional third-party service)
⏱️ Session recordings (optional third-party service)

---

## 🎯 Recommended Next Steps

**Immediate (Today):**
1. ✅ Vercel Analytics is already working
2. ⚠️ Configure GA4 (10 minutes) - Replace `G-XXXXXXXXXX` in `index.html`
3. ⚠️ Verify GA4 is working after deployment

**This Week:**
1. Set up Google Search Console verification
2. Enable Search Console API
3. Create service account and add credentials to Vercel

**This Month:**
1. Implement conversion tracking events
2. Set up business metrics collection
3. Create custom GA4 reports
4. Configure alerts for important metrics

---

## 🛠️ Admin Dashboard Overview

Your new admin area includes:

### `/admin` - Dashboard
- Error count (24h)
- Performance metrics (LCP, CLS)
- SEO scores
- Recent errors
- Site pages status

### `/admin/errors`
- JavaScript error tracking
- API errors
- Network errors
- Error filtering and resolution

### `/admin/lighthouse`
- Performance audits
- Core Web Vitals
- Accessibility scores
- SEO scores
- Opportunities for improvement

### `/admin/analytics` (NEW)
- Traffic overview
- Conversion tracking
- Business metrics
- Popular content
- Setup instructions

### `/admin/search-console` (NEW)
- Search impressions
- Click-through rates
- Search rankings
- Top queries
- Top pages
- Setup instructions

### `/admin/seo`
- Page-by-page SEO analysis
- Meta tags
- Open Graph
- Structured data

---

## 📝 Environment Variables Reference

Add these to Vercel → Settings → Environment Variables:

```bash
# Supabase (already configured)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Admin Authentication (already configured)
VITE_ADMIN_PASSWORD=your_password

# Google Services (ADD THESE)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SEARCH_CONSOLE_SITE_URL=https://www.limitlesscruises.com

# Cron Jobs (already configured)
CRON_SECRET=your_secret

# PageSpeed Insights API (already configured)
PAGESPEED_API_KEY=your_key

# Site Configuration (already configured)
VITE_SITE_LAUNCHED=false
```

---

## 🎉 Summary

### ✅ What's Working Now
- Vercel Analytics (tracking page views)
- Lighthouse audits (daily performance checks)
- Error tracking
- SEO monitoring
- Admin dashboard

### ⚠️ Requires 10-Minute Setup
- Google Analytics 4 (replace placeholder ID)

### ⚠️ Requires 2-Hour Setup
- Google Search Console API
- Conversion tracking events
- Business metrics collection

### 💰 Cost Breakdown
- **Free:**
  - Vercel Analytics (basic)
  - Google Analytics 4
  - Google Search Console
  - Lighthouse audits
  
- **Optional Paid:**
  - Vercel Analytics Pro: $10/month
  - UptimeRobot Pro: $10/month
  - Heat maps (Hotjar/Clarity): $0-$39/month

---

## 🆘 Support & Resources

- **GA4 Help:** https://support.google.com/analytics
- **Search Console Help:** https://support.google.com/webmasters
- **Vercel Analytics:** https://vercel.com/docs/analytics
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse

---

## 📧 Questions?

Your admin area is ready to use! 

1. Deploy these changes to Vercel
2. Visit `/admin` and log in
3. Explore the new Analytics and Search Console pages
4. Follow the setup instructions for GA4
5. (Optional) Set up Search Console for deeper insights

**Next deployment will include:**
- GA4 tracking (after you add your ID)
- All new admin pages
- Vercel Analytics tracking

