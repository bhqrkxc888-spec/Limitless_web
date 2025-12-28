# Vercel → Supabase Migration Status

**Last Updated:** December 27, 2024

---

## ✅ COMPLETED Uploads (Site Assets)

| Asset | Status | Location |
|-------|--------|----------|
| Home Hero | ✅ Uploaded | `WEB_site/hero.webp` |
| Katherine Photos (3) | ✅ Uploaded | `WEB_site/katherine1.webp`, `katherine2.webp`, `katherine3.webp` |
| Site Logo | ✅ Uploaded | `WEB_site/logo.webp` |
| Favicon | ✅ Uploaded | `WEB_site/favicon.webp` |

---

## ✅ COMPLETED Uploads (Categories)

| Category | Status | Location |
|----------|--------|----------|
| River Cruises | ✅ Uploaded | `WEB_categories/river/card.webp` |
| Expedition Cruises | ✅ Uploaded | `WEB_categories/expedition/card.webp` |
| Family Cruises | ⚠️ Check | `WEB_categories/family/card.webp` |
| Adults-Only | ⚠️ Check | `WEB_categories/adults-only/card.webp` |
| UK Sailings | ⚠️ Check | `WEB_categories/uk-sailings/card.webp` |
| Luxury Cruises | ⚠️ Check | `WEB_categories/luxury/card.webp` |

---

## ✅ COMPLETED Uploads (Destinations - Partial)

| Destination | Status | Hero | Card |
|-------------|--------|------|------|
| Antarctica | ✅ Uploaded | `WEB_destinations/antarctica/hero.webp` | Need card |
| Alaska | ✅ Uploaded | `WEB_destinations/alaska/hero.webp` | Need card |
| Mediterranean | ⚠️ Check | Need upload | Need card |
| Caribbean | ⚠️ Check | Need upload | Need card |
| Norwegian Fjords | ⚠️ Check | Need upload | Need card |

**Note:** 16 total destinations in `destinations.js`, need to verify all have upload locations

---

## ⚠️ MISSING - Need Upload Locations Added

### Site Assets - NEW
- [ ] **Agency Logo** (Holiday Elite) - `WEB_site/agency-logo.png`
- [ ] **Trust Badge - ABTA** - `WEB_site/trust-abta.png`
- [ ] **Trust Badge - ATOL** - `WEB_site/trust-atol.png`
- [ ] **Trust Badge - CLIA** - `WEB_site/trust-clia.png`
- [ ] **Home Hero (Mobile)** - `WEB_site/hero-mobile.webp` (optional)
- [ ] **OG Image** - `WEB_site/og-image.webp` (social sharing)

---

## 🔍 BUCKET LIST Images (17 experiences)

**Status:** These are in `bucketList.js` but have NO admin upload interface yet.

Bucket list experiences include:
- World Cruises
- Antarctica (separate from destination)
- Japan & Asia
- Alaska (separate from destination)
- Galapagos
- Northern Lights
- South America
- Dubai & Middle East
- Australia & New Zealand
- Iceland
- European River Cruises
- **Great Barrier Reef** ✅ (Found in bucketList.js - NOT missing!)
- Polynesian Islands
- Midnight Sun
- Grand Voyages

**Decision needed:** Do bucket list images need an admin interface? Or will they remain in the data file as hardcoded Vercel URLs for now?

---

## 📋 Notes on Image Mismatches

### Great Barrier Reef
- ✅ **FOUND** in `bucketList.js` (line 928-990)
- NOT in `destinations.js` as a separate destination
- Mentioned in Australia destination description
- Has Vercel URL: `jl2lrfef2mjsop6t.../destinations/Australia/Great-barrier-reef.webp`

### Black Sea
- ❌ **DOES NOT EXIST** in destinations or bucket list
- Can be ignored

---

## 🎯 Current Priorities

1. ✅ **Fixed image replacement** - Images can now be replaced with `upsert: true`
2. ✅ **Added cache-busting** - Thumbnails update immediately after replacement
3. ✅ **Added trust badges & agency logo** - Upload locations now available
4. ⚠️ **Verify all 16 destinations** - Ensure hero + card images exist/uploaded
5. ⚠️ **Review category images** - Confirm all 6 are uploaded correctly
6. 🔜 **Bucket list decision** - Admin interface or leave as-is?

---

## 📊 Upload Stats

- **Site Images:** 8/12 uploaded (67%)
- **Category Images:** 2/6 confirmed (33%)
- **Destination Images:** ~2/16 hero images uploaded (~12%)
- **Bucket List Images:** 0/17 (no admin interface yet)

**Total Vercel URLs still in code:** ~100+ (mostly bucket list and destinations)

---

## 🚀 Next Steps

1. Upload missing site assets (OG image, mobile hero)
2. Upload agency logo and trust badges (when provided)
3. Complete all destination hero & card uploads (14 remaining)
4. Complete all category uploads (4 remaining)
5. Decide on bucket list image strategy
6. Update all data files to remove hardcoded Vercel URLs

