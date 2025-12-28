# Required Vercel Environment Variables

**CRITICAL**: These environment variables MUST be set in Vercel for the site to function correctly.

## Production Environment Variables (Required)

### Supabase Configuration
```bash
SUPABASE_URL=https://xrbusklskmeaamwynfmm.supabase.co
SUPABASE_ANON_KEY=<your_anon_key>
```

**Why Required**:
- Contact forms will not work without these
- Sitemap generation will be INCOMPLETE (missing all offers, news, cruise guides)
- Dynamic content (offers, news, guides) will not load

**Where to Set**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add both variables for "Production", "Preview", and "Development" environments
3. Redeploy after adding

---

## Build-Time Requirements

### For Complete Sitemap Generation

The `generate-sitemap.js` script requires Supabase credentials to fetch dynamic content.

**Without credentials**:
- ✅ Static routes will be included (18 pages)
- ✅ Data file routes will be included (56 pages: destinations, cruise lines, bucket list, cruise types)
- ❌ Dynamic Supabase content will be SKIPPED (offers, travel news, cruise guides)

**With credentials**:
- ✅ All static routes
- ✅ All data file routes  
- ✅ All dynamic content (~100+ additional URLs)

**Expected total**: ~200-250 URLs with complete sitemap

---

## Client-Side Variables (VITE_ prefix)

These variables are exposed to the browser (intentional):

```bash
VITE_SUPABASE_URL=https://xrbusklskmeaamwynfmm.supabase.co
VITE_SUPABASE_ANON_KEY=<your_anon_key>
```

**Security Note**:
- ✅ This is SAFE - Supabase anon keys are designed to be public
- ✅ RLS (Row Level Security) policies protect your data
- ❌ NEVER use `VITE_` prefix for secret keys

**Verify RLS is Enabled**:
1. Check Supabase Dashboard → Authentication → Policies
2. Ensure policies exist on all tables:
   - `offers`
   - `travel_news`
   - `cruise_guides`
   - `website_enquiries`

---

## Verification Steps

### After Setting Env Vars:

1. **Test Contact Form**:
   - Visit `/contact`
   - Submit a test enquiry
   - Check Supabase Dashboard → Tables → `website_enquiries`

2. **Test Sitemap Completeness**:
   ```bash
   npm run sitemap
   ```
   - Check for "Found X offers" message (should not be 0)
   - Verify `public/sitemap.xml` has 200+ URLs

3. **Test Dynamic Content**:
   - Visit `/offers` - should show offers from database
   - Visit `/travel-news` - should show articles
   - Visit `/cruise-guides` - should show guides

---

## Troubleshooting

### "Supabase not configured" errors
**Symptom**: Forms show error, console shows warning  
**Fix**: Verify env vars are set in Vercel and redeploy

### Sitemap missing dynamic content
**Symptom**: Only ~74 URLs in sitemap  
**Fix**: 
1. Check Vercel build logs for "Skipping dynamic content" message
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to Vercel env vars
3. Rebuild

### Dynamic content not loading on site
**Symptom**: Offers/News pages empty  
**Fix**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set (with VITE_ prefix)

---

## Google Places API (Optional - Port Attractions)

Shows attractions and experiences for cruise ports on the itinerary map.

### Server-Side (Required for proxy)
```bash
GOOGLE_PLACES_API_KEY=<your_api_key>
```

**Setup**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Places API (New)" 
3. Create an API key with HTTP referrer restrictions
4. Add to Vercel as `GOOGLE_PLACES_API_KEY`

**Note**: 
- If not set, the attractions panel shows "No attractions data available"
- API requests go through `/api/places` serverless function to avoid CORS
- Google Places API is pay-per-use (see [pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing))

---

## Cloudflare Turnstile (Optional - Bot Protection)

Turnstile is a free, privacy-friendly invisible CAPTCHA that protects forms from bots.

### Client-Side (Browser)
```bash
VITE_TURNSTILE_SITE_KEY=<your_site_key>
```

### Server-Side (For verification - future enhancement)
```bash
TURNSTILE_SECRET_KEY=<your_secret_key>
```

**Setup Instructions**:
1. Create free account at https://dash.cloudflare.com (if you don't have one)
2. **Important**: You do NOT need to add your domain to Cloudflare's DNS/CDN. Turnstile works independently.
3. In the Cloudflare dashboard, look for **Turnstile** in the sidebar under **"Protect & Connect"** section, OR use the search bar (⌘K) and type "Turnstile"
4. Click **"Add Site"** or **"Create"** button in Turnstile
5. Enter your domain: `www.limitlesscruises.com` (this is just for Turnstile registration, not DNS)
6. Choose **"Invisible"** widget type (recommended - no user interaction needed)
7. Click **"Create"** - Cloudflare will generate your keys
8. Copy the **Site Key** → Add to Vercel as `VITE_TURNSTILE_SITE_KEY`
9. Copy the **Secret Key** → Add to Vercel as `TURNSTILE_SECRET_KEY`

**Adding to Vercel Environment Variables:**
1. In Vercel dashboard → Your Project → Settings → Environment Variables
2. Click **"Add New"** button
3. For `VITE_TURNSTILE_SITE_KEY`:
   - **Key**: `VITE_TURNSTILE_SITE_KEY`
   - **Value**: Paste your Site Key from Cloudflare
   - **Environments**: Select **Production**, **Preview**, and **Development** (or just Production if you prefer)
   - Click **Save**
4. For `TURNSTILE_SECRET_KEY`:
   - **Key**: `TURNSTILE_SECRET_KEY`
   - **Value**: Paste your Secret Key from Cloudflare
   - **Environments**: Select **Production**, **Preview**, and **Development** (or just Production if you prefer)
   - Click **Save**
5. **Redeploy** your site for the changes to take effect

**Note**: 
- If these are not set, forms work normally without CAPTCHA protection
- You don't need to change your DNS or hosting - Turnstile works with any domain
- The domain you enter is just for Turnstile's records, not for Cloudflare DNS management
- **Environment Selection**: Choose "Production" for live site, "Preview" for PR previews, "Development" for local dev (optional)

---

## Current Status

✅ ESLint already checks for env vars in `lib/supabase.js`  
✅ Site gracefully handles missing credentials (shows empty state)  
✅ Turnstile is optional - forms work without it  
⚠️ **ACTION REQUIRED**: Set Supabase vars in Vercel before next deployment  
📋 **RECOMMENDED**: Set Turnstile vars for bot protection

---

## Quick Setup Command (for reference)

```bash
# Add to Vercel via CLI (if you have vercel CLI installed)
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Or use Vercel Dashboard (recommended)
# https://vercel.com/[your-team]/[your-project]/settings/environment-variables
```

