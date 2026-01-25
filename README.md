# Limitless Cruises Website

**Professional cruise travel agency website for Limitless Cruises - UK-based independent cruise specialist.**

[![Live Site](https://img.shields.io/badge/Live-www.limitlesscruises.com-blue)](https://www.limitlesscruises.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://www.limitlesscruises.com)
[![ABTA](https://img.shields.io/badge/ABTA-P7541-green)](https://www.abta.com)

---

## 📋 What This Is

The official website for **Limitless Cruises**, a UK-based independent cruise travel agency specialising in:

- **Personal cruise consultation** - One-to-one advice from CLIA Cruise Master certified consultant
- **All major cruise lines** - Expert booking services for P&O, Royal Caribbean, MSC, Norwegian, Disney, Celebrity, Cunard, Viking, and more
- **UK no-fly cruises** - Specialist in Southampton departures and regional UK ports
- **Worldwide fly-cruises** - Complete holiday packages including flights and transfers
- **Bucket list experiences** - World cruises, expeditions, Arctic/Antarctica, transatlantic crossings

**Trading Name:** Limitless Cruises Ltd (a trading name of Co-op Travel Services Ltd)  
**ABTA Member:** P7541  
**Location:** Sheffield, South Yorkshire, UK

---

## ✨ Key Features

### 🌍 Comprehensive Port Guides
- **Detailed cruise port information** for major destinations worldwide
- **Region-based organisation:** Mediterranean, Atlantic Coast, Atlantic Islands, Norwegian Fjords, UK
- **Practical information:** Things to do, shore excursions, restaurants, beaches, accessibility
- **Family-friendly content:** McDonald's, Ale Hop, parks, theme parks for Spanish/Canary Island ports
- **SEO optimised:** Full FAQ sections, structured data, rich snippets

### 🚢 Cruise Companion System
- **Ship-specific guides** for individual cruises (e.g., G606 - P&O Iona)
- **Day-by-day itineraries** with port information, sea days, embarkation/disembarkation
- **Live features:**
  - Real-time ship tracking (VesselFinder integration)
  - Live weather forecasts (OpenWeatherMap API)
  - Marine weather cache for ports (StormGlass API)
- **Consent-gated access** for private cruise groups
- **Feedback system** for continuous improvement

### 🎯 Bucket List Experiences
- **17 curated bucket list cruise experiences:** World Cruises, Antarctica, Northern Lights, Galápagos, Transatlantic Crossings, and more
- **Rich content:** Detailed narratives, destination highlights, trip facts, FAQs
- **Interactive maps** with port locations and route visualisation

### 🗺️ Destinations & Cruise Lines
- **16 destination guides:** Caribbean, Mediterranean, Norwegian Fjords, Alaska, Baltic, and more
- **16 cruise line profiles:** Detailed information, ship images, destinations served
- **7 cruise types:** Family, Adults-Only, Luxury, River, Expedition, UK Sailings, Budget

### 📰 Travel News & Offers
- **Dynamic content management** via Supabase CMS
- **Travel news articles** with categories and tags
- **Cruise offers** with filtering and search
- **Cruise guides** (published articles)

### 🖼️ Image Management System
- **Centralised admin interface** for all website images
- **Supabase Storage** for reliable, scalable image hosting
- **Automatic validation:** File size, dimensions, format, ALT text
- **Organised structure:** Site assets, destinations, cruise lines, ships, port guides, bucket list

### 🔒 Admin Dashboard
- **Protected admin area** with server-side authentication
- **Image management:** Upload, validate, and organise all website images
- **Content management:** Travel news, offers, cruise guides
- **Analytics:** Lighthouse scores, SEO monitoring, error tracking
- **Feedback management:** Port ratings, cruise guide feedback

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2 + Vite 7.4
- **Routing:** React Router DOM 7.1
- **Styling:** CSS Modules with design tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Maps:** Mapbox GL (interactive itinerary maps)

### Backend & Storage
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (images and assets)
- **Authentication:** Supabase Auth (admin access)
- **Deployment:** Vercel (serverless functions + static hosting)

### External APIs
- **Weather:** OpenWeatherMap API (forecasts)
- **Marine Weather:** StormGlass API (sea conditions)
- **Ship Tracking:** VesselFinder Widget API (live ship positions)
- **Maps:** Mapbox API (interactive maps)
- **Places:** Google Places API (port information)

### Development Tools
- **Linting:** ESLint 9
- **Build:** Vite with prerendering (Puppeteer)
- **Analytics:** Vercel Analytics, Google Analytics 4
- **Monitoring:** Lighthouse CI, custom SEO monitoring

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (recommended: 20+)
- **npm** or **pnpm**
- **Supabase account** (for database and storage)
- **Environment variables** (see `.env.example`)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Limitless_web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials and API keys

# Start development server
npm run dev
```

**Development URL:** `http://localhost:5173`

### Build for Production

```bash
# Standard build (client-side rendering)
npm run build

# SSG build with prerendering and sitemap
npm run build:ssg

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
Limitless_web/
├── api/                      # Vercel serverless functions
│   ├── admin/               # Admin authentication & session
│   └── go/                  # URL shortener
│
├── public/                  # Static assets
│   ├── robots.txt          # Search engine & AI bot configuration
│   ├── sitemap.xml         # Auto-generated sitemap
│   ├── llms.txt            # AI/LLM context file
│   └── .well-known/        # Security.txt
│
├── scripts/                 # Build & utility scripts
│   ├── generate-sitemap.js # Dynamic sitemap generator
│   ├── prerender.js        # SSG prerendering
│   └── *.sql              # Database setup scripts
│
├── src/
│   ├── components/         # React components
│   │   ├── admin/         # Admin dashboard components
│   │   ├── cruise/        # Cruise companion components
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── port/          # Port guide components
│   │   └── ui/            # Reusable UI components
│   │
│   ├── config/            # Configuration
│   │   ├── apiConfig.js   # External API settings
│   │   ├── assetUrls.js   # Image asset URLs
│   │   ├── publishStatus.js # Content publishing control
│   │   └── siteConfig.js  # Site-wide settings
│   │
│   ├── data/              # Static data files
│   │   ├── ports.js       # Port guide data (8000+ lines)
│   │   ├── portContent.js # Detailed port content
│   │   ├── cruises/       # Cruise companion data (G606)
│   │   ├── cruiseLines.js # Cruise line information
│   │   ├── destinations.js # Destination data
│   │   └── bucketList.js  # Bucket list experiences
│   │
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Third-party integrations
│   │   └── supabase.js    # Supabase client
│   │
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin dashboard pages
│   │   └── *.jsx         # Public pages
│   │
│   ├── services/          # API services
│   │   ├── weatherAPI.js  # Weather data
│   │   ├── marineAPI.js   # Marine weather
│   │   └── seoMonitoring.js # SEO tracking
│   │
│   ├── styles/            # Global styles & design tokens
│   ├── templates/         # Page templates (dynamic routes)
│   └── utils/             # Utility functions
│
├── supabase/
│   └── migrations/        # Database migrations (16 SQL files)
│
└── docs/                  # Project documentation
    ├── PORT_DATA_COLLECTION_GUIDE.md  # Single source for port expansion
    ├── IMAGE_MANAGEMENT_GUIDE.md      # Image upload & management guide
    ├── prompts/            # AI prompts for content generation
    ├── setup/              # Setup & deployment docs
    ├── supabase/           # Supabase-specific documentation
    └── archive/            # Historical documentation (completed work)
```

---

## 🔐 Environment Variables

Required environment variables (create `.env` from `.env.example`):

### Supabase (Required)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### External APIs (Optional - features work without these)
```bash
# Weather & Marine Weather
VITE_OPENWEATHER_API_KEY=your-key
VITE_STORMGLASS_API_KEY=your-key

# Maps & Places
VITE_MAPBOX_TOKEN=your-token
VITE_GOOGLE_PLACES_API_KEY=your-key
```

**Note:** The site works without external API keys, but features like live weather and interactive maps will be disabled.

---

## 📚 Documentation

### Key Documentation Files

- **`docs/PORT_DATA_COLLECTION_GUIDE.md`** - Complete guide for adding new port guides (single source of truth)
- **`docs/IMAGE_MANAGEMENT_GUIDE.md`** - Image upload, sizing, and management guide
- **`docs/prompts/PERPLEXITY_PORT_GUIDE_PROMPT.md`** - AI prompt for port data collection

### Documentation Structure

- **`docs/`** - Active documentation (guides, references)
- **`docs/archive/`** - Completed work, historical documentation
- **`docs/prompts/`** - AI prompts for content generation
- **`docs/setup/`** - Deployment and setup guides
- **`docs/supabase/`** - Database and storage documentation

**All documentation is version controlled** - no `.markdown/` folder (migrated to `docs/`)

---

## 🎯 Key Features in Detail

### Port Guides System

**Purpose:** Comprehensive, SEO-optimised guides for cruise ports worldwide.

**Current Status:**
- ✅ **6 ports complete** (G606 itinerary: Lisbon, Cádiz, La Coruña, Tenerife, Las Palmas, Lanzarote)
- ✅ **31 ports published** across all regions
- ✅ **Family-friendly sections** for Spanish/Canary Island ports
- ✅ **Rating & review system** with moderation workflow

**How It Works:**
- Data stored in `src/data/ports.js` (main port definitions)
- Detailed content in `src/data/portContent.js` (section-by-section content)
- Images managed via Admin → Port Guide Images
- Published pages at `/ports/[slug]` and `/ports/region/[slug]`

**Adding New Ports:**
See `docs/PORT_DATA_COLLECTION_GUIDE.md` for complete instructions.

---

### Cruise Companion System

**Purpose:** Ship-specific guides for individual cruises with day-by-day itineraries.

**Current Status:**
- ✅ **G606 (P&O Iona)** - Complete with all 15 days
- ✅ **Live ship tracking** via VesselFinder
- ✅ **Weather forecasts** for port days
- ✅ **Port guide integration** (pulls from shared port content)

**How It Works:**
- Cruise data in `src/data/cruises/[id].js` (e.g., `g606.js`)
- Port content automatically pulled from `portContent.js`
- Access at `/cruise/[id]` (e.g., `/cruise/g606`)
- **Privacy:** Pages set to `noindex, nofollow` (private for cruise groups)

**Adding New Cruises:**
1. Create cruise file in `src/data/cruises/[id].js` (reference `TEMPLATE.js`)
2. Add ship information (IMO, MMSI for tracking)
3. Define itinerary with day-by-day structure
4. Port guides automatically link via `portSlug` field

---

### Image Management System

**Purpose:** Centralised admin interface for all website images with automatic validation.

**Storage:** Supabase Storage buckets:
- `WEB_site/` - Site-wide assets (hero, logo, OG image, favicon)
- `WEB_destinations/[slug]/` - Destination images (hero, card, gallery)
- `WEB_cruise_lines/[slug]/` - Cruise line logos and ship images
- `WEB_ports/[slug]/` - Port guide images (hero, card, attractions, beach)
- `WEB_bucket_list/[slug]/` - Bucket list experience images

**Admin Access:** `/admin/images` (protected route)

**Validation:**
- File size limits (warnings/errors)
- Dimension checking (tolerance ±10%)
- Format validation (WebP preferred, JPEG/PNG allowed)
- ALT text requirements (5-125 characters)

**See:** `docs/IMAGE_MANAGEMENT_GUIDE.md` for complete details.

---

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Building
npm run build            # Standard production build
npm run build:ssg        # SSG build with prerendering + sitemap
npm run build:sitemap    # Build with sitemap regeneration

# Utilities
npm run sitemap          # Generate sitemap.xml
npm run validate:sitemap # Validate sitemap structure
npm run validate:seo     # Validate SEO configuration
npm run prerender        # Prerender static pages

# Code Quality
npm run lint             # Run ESLint

# Preview
npm run preview          # Preview production build locally
```

---

## 🗄️ Database (Supabase)

### Key Tables

- **`web.site_images`** - Image metadata and URLs
- **`web.travel_news`** - Travel news articles
- **`web.offers`** - Cruise offers
- **`web.cruise_guides`** - Published cruise guide articles
- **`web.website_enquiries`** - Contact form submissions
- **`web.admin_users`** - Admin authentication
- **`guide_feedback`** - Cruise companion feedback (Yes/No votes)
- **`port_guide_ratings`** - Port guide ratings & reviews (1-5 stars)
- **`weather_cache`** - Cached weather forecasts
- **`marine_weather_cache`** - Cached sea condition data

### Migrations

All migrations in `supabase/migrations/`:
- Run via Supabase Dashboard SQL Editor
- Or via `supabase db push` (if using Supabase CLI)

**See:** `docs/supabase/` for database documentation.

---

## 🚢 Current Cruise Companions

### G606 - P&O Iona (March 2026)
- **Route:** Southampton → Spain → Portugal → Canary Islands → Southampton
- **Duration:** 14 nights (15 days)
- **Ports:** La Coruña, Tenerife, Las Palmas, Lanzarote, Cádiz, Lisbon
- **Access:** `/cruise/g606`
- **Status:** ✅ Complete and live

**Adding More Cruises:**
Use `src/data/cruises/TEMPLATE.js` as reference. System supports unlimited cruises.

---

## 📊 SEO & Performance

### SEO Features
- ✅ **Structured data** (Schema.org) - Organization, WebSite, Breadcrumbs, Articles
- ✅ **Open Graph tags** - Social media sharing
- ✅ **Twitter Cards** - X/Twitter sharing
- ✅ **Sitemap** - Auto-generated with 111+ URLs (includes port guides)
- ✅ **robots.txt** - Search engine and AI bot configuration
- ✅ **llms.txt** - AI/LLM context file

### Performance Optimizations
- ✅ **Code splitting** - Lazy-loaded pages
- ✅ **Image optimization** - WebP format, responsive images, lazy loading
- ✅ **Font optimization** - Preload with fallback system fonts
- ✅ **Mobile-first** - Gradient hero on mobile (no image load) for instant LCP
- ✅ **Deferred analytics** - GA4 loads after page interaction

### Security
- ✅ **Security headers** - CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- ✅ **Input sanitization** - DOMPurify for all user-generated content
- ✅ **Admin authentication** - Server-side session validation
- ✅ **Rate limiting** - Login attempt protection

---

## 🌐 Deployment

### Production Deployment
- **Platform:** Vercel
- **URL:** https://www.limitlesscruises.com
- **Deployment:** Automatic from `main` branch
- **Environment:** Production environment variables set in Vercel dashboard

### Build Process
1. Install dependencies
2. Run linting (`npm run lint`)
3. Generate sitemap (`npm run sitemap`)
4. Build application (`vite build`)
5. Prerender static pages (`npm run prerender`)
6. Deploy to Vercel

**See:** `docs/setup/DEPLOYMENT_CHECKLIST.md` for detailed deployment guide.

---

## 🔍 Key URLs

### Public Pages
- Home: `/`
- Port Guides Hub: `/ports`
- Destinations: `/destinations`
- Cruise Lines: `/cruise-lines`
- Bucket List: `/bucket-list`
- Travel News: `/travel-news`
- Offers: `/offers`

### Admin (Protected)
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin`
- Image Management: `/admin/images`
- Port Ratings: `/admin/port-ratings`
- Cruise Feedback: `/admin/cruise-feedback`

### Cruise Companions (Private - noindex)
- G606: `/cruise/g606`

---

## 📝 Adding Content

### Port Guides
1. Follow `docs/PORT_DATA_COLLECTION_GUIDE.md`
2. Add port data to `src/data/ports.js`
3. Add detailed content to `src/data/portContent.js`
4. Upload images via Admin → Port Guide Images
5. Set status to `'published'` in ports.js

### Bucket List Experiences
1. Add experience to `src/data/bucketList.js`
2. Upload images via Admin → Bucket List Images
3. Page automatically generated at `/bucket-list/[slug]`

### Travel News / Offers / Cruise Guides
1. Add via Supabase Dashboard (CMS)
2. Or via Admin interface (if implemented)
3. Content automatically appears on site

---

## 🐛 Troubleshooting

### Images Not Loading
- Verify Supabase Storage bucket policies (public read access)
- Check bucket is public in Supabase Dashboard
- Verify correct Supabase project URL in asset URLs

### Build Errors
- Run `npm run lint` to check for code issues
- Verify all environment variables are set
- Check `package.json` scripts are correct

### Admin Access Issues
- Verify admin session cookie is set
- Check `/api/admin/session` endpoint is working
- Verify Supabase RLS policies allow admin access

**For more help:** See relevant guides in `docs/` folder.

---

## 📄 License & Credits

**Business:** Limitless Cruises Ltd (trading name of Co-op Travel Services Ltd)  
**ABTA:** P7541  
**Location:** Sheffield, South Yorkshire, UK

**Tech Credits:**
- React, Vite, Supabase, Vercel
- OpenWeatherMap, StormGlass, Mapbox, VesselFinder
- All dependencies listed in `package.json`

---

## 🤝 Contributing

This is a private commercial project. For questions or issues:
- **Email:** travel@limitlesscruises.com
- **Phone:** 0114 321 3208

---

## 📚 Additional Resources

- **Port Data Collection:** `docs/PORT_DATA_COLLECTION_GUIDE.md`
- **Image Management:** `docs/IMAGE_MANAGEMENT_GUIDE.md`
- **Setup Guide:** `docs/setup/DEPLOYMENT_CHECKLIST.md`
- **Database Docs:** `docs/supabase/`

---

**Last Updated:** January 17, 2026  
**Status:** Production Ready & Live  
**Version:** 2.0 (React 19 + Vite 7)
