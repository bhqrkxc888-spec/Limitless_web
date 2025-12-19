# Build Scripts

This folder contains scripts for building and validating the Limitless Cruises website.

## Quick Start

```bash
# Full production build with SSG (recommended)
npm run build:ssg

# Run individual steps
npm run sitemap        # Generate sitemap.xml
npm run build          # Vite build
npm run prerender      # Prerender to static HTML
npm run validate:seo   # Validate SEO compliance
```

## Scripts

### `generate-sitemap.js`

Generates `sitemap.xml` with all indexable URLs.

**Features:**
- Includes all static routes
- Includes dynamic routes from data files (cruise lines, destinations, etc.)
- Fetches dynamic content from Supabase (if credentials provided)
- Excludes noindex pages (category/tag archives, admin, etc.)

**Environment variables (optional):**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### `prerender.js`

Prerenders all routes to static HTML using Puppeteer.

**Requirements:**
- Run `npm install` first (installs puppeteer)
- Run `npm run build` before prerendering

**How it works:**
1. Starts a local server serving `dist/`
2. Uses headless Chrome to visit each route
3. Waits for React to render and SEO component to inject meta tags
4. Captures the final HTML with all `<head>` tags
5. Writes to `dist/{route}/index.html`

### `validate-seo.js`

Validates SEO compliance of the prerendered HTML.

**Checks:**
- Title tag present and correct length
- Meta description present and correct length
- Canonical URL present and normalized
- Robots meta correct (index/noindex)
- OpenGraph tags present
- Twitter card tags present
- Sitemap contains only indexable URLs
- No duplicate URLs in sitemap

**Output:**
- Console summary
- `reports/seo-validation-report.json`

## Route Classification

### Indexable (in sitemap, robots=index)
- `/` - Homepage
- `/about`, `/contact`, `/find-a-cruise` - Core pages
- `/destinations`, `/cruise-lines`, etc. - Hub pages
- `/destinations/:slug`, `/cruise-lines/:slug`, etc. - Detail pages
- `/travel-news/:slug` - News articles
- Legal pages (privacy, terms, etc.)

### Noindex (not in sitemap, robots=noindex)
- `/travel-news/category/:category` - Category archives
- `/travel-news/tag/:tag` - Tag archives
- `/admin/*` - Admin pages
- `/preview` - Preview pages
- 404 page

### Blocked (robots.txt Disallow)
- `/admin/`
- `/api/`
- `/preview`

## Troubleshooting

### "puppeteer not found"
```bash
npm install puppeteer --save-dev
```

### "dist/ folder not found"
```bash
npm run build
```

### Prerender timeout
Edit `scripts/prerender.js` and increase `TIMEOUT`:
```javascript
const TIMEOUT = 60000; // 60 seconds
```

### Missing Supabase content in sitemap
Set environment variables before running:
```bash
export SUPABASE_URL=...
export SUPABASE_ANON_KEY=...
npm run sitemap
```

## Full Documentation

See `docs/SEO-IMPLEMENTATION.md` for complete technical documentation.

