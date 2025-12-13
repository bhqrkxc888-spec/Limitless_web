# Em Dash Cleanup - December 13, 2025

## ✅ Removed All Em Dashes (—)

Replaced all em dashes (—) with standard hyphens (-) or commas throughout the site to remove AI-generated text markers.

---

## 📝 Files Updated

### Pages:
1. **`src/pages/ContactPage.jsx`** - 4 replacements
   - Opening hours list (Monday-Sunday)

2. **`src/pages/FindCruisePage.jsx`** - 1 replacement
   - Lead paragraph description

3. **`src/pages/BookingTerms.jsx`** - 1 replacement
   - "Changes by the supplier" section

4. **`src/pages/PrivacyPolicy.jsx`** - 2 replacements
   - Data update notice
   - Third-party links notice

### Components:
5. **`src/templates/CruiseLinePage.jsx`** - 1 replacement
   - Kids club subtitle

### Data:
6. **`src/data/cruiseLines.js`** - 10 replacements
   - P&O Cruises descriptions (2)
   - MSC Cruises descriptions (3)
   - MSC Voyagers Club intro (1)
   - Norwegian Cruise Line descriptions (1)
   - Virgin Voyages descriptions (2)
   - DataTable placeholder (kept as-is for tables)

---

## 📊 Total Changes

- **Files Modified:** 6
- **Em Dashes Removed:** 19
- **Build Status:** ✅ Successful
- **Bundle Size:** 560.96 KB (unchanged)

---

## ✅ What Was Changed

### Before:
```
Wednesday to Friday — 10:00 AM to 8:00 PM
to find the perfect sailing for you—whether you're looking for
Ages 6 months to 17 years—all included
```

### After:
```
Wednesday to Friday - 10:00 AM to 8:00 PM
to find the perfect sailing for you, whether you're looking for
Ages 6 months to 17 years, all included
```

---

## 🔍 What Was Kept

**Table placeholders** (in data tables):
- Kept `—` in age group tables where it indicates "not available"
- Example: `morning: '—'` for Night Nursery in kids club schedules

These are legitimate uses of the em dash as a data placeholder, not AI text.

---

## ✨ Result

All AI-generated text markers removed. The site now uses standard British English punctuation:
- Hyphens (-) for ranges and clarifications
- Commas (,) for clause separation
- No em dashes (—) in customer-facing text

---

## 🚀 Ready to Deploy

```bash
git add .
git commit -m "Remove em dashes from all content"
git push
```

Build verified successful ✅

---

## 📋 Verification

Search for remaining em dashes:
```bash
grep -r "—" src/pages src/components src/data --exclude="*.css"
```

Result: Only legitimate table placeholders remain in data structures.

---

**All em dashes cleaned up!** 🎉

