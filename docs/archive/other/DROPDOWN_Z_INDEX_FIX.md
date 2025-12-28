# Dropdown Z-Index Fix - December 28, 2024

## Problem Summary

The navigation dropdown menus were appearing **behind page content** on certain pages (Offers, Travel News, Cruise Guides, etc.). This was a z-index stacking context issue that has been resolved.

## Root Cause

The problem was a **z-index hierarchy conflict**:

1. **Header** had `z-index: 1100` (using `--z-sticky`)
2. **Dropdown menus** had `z-index: 1000` (using `--z-dropdown`)
3. **Page sticky filters** had `z-index: 1100` (also using `--z-sticky`)

Because the dropdowns (z-index: 1000) were **lower** than the page sticky sections (z-index: 1100), the dropdowns would render behind those page elements.

## Solution Implemented

### 1. Updated Z-Index Token Hierarchy (`src/styles/tokens.css`)

Created a proper z-index hierarchy with clear separation:

```css
--z-base: 0;
--z-content: 10;          /* Page content sections */
--z-sticky-content: 900;  /* Sticky page filters (below header) */
--z-header: 1000;         /* Sticky header (contains dropdowns) */
--z-dropdown: 1050;       /* Dropdowns and mega menus (must be above header) */
--z-fixed: 1100;          /* Fixed position elements (mobile toggle, WhatsApp) */
--z-modal-backdrop: 1300; /* Modal backdrops */
--z-modal: 1400;          /* Modals and overlays */
--z-popover: 1500;        /* Popovers */
--z-tooltip: 1600;        /* Tooltips (highest) */

/* Legacy alias for backward compatibility */
--z-sticky: var(--z-header);
```

### 2. Updated Page Sticky Filters

Changed all page sticky filter sections to use the new `--z-sticky-content` token (900) instead of `--z-sticky` (1100):

**Files Updated:**
- `src/pages/OffersPage.css` - `.offers-filter-section`
- `src/pages/TravelNewsPage.css` - `.news-filter-section`
- `src/pages/CruiseGuidesPage.css` - `.guides-filter-section`
- `src/pages/CruiseTypesPage.css` - sticky filter section

### 3. Fixed Other Z-Index Issues

**`src/pages/FindCruisePage.css`**
- Changed `.finder-widget-section` from `z-index: 10` to `z-index: var(--z-content)`

**`src/components/admin/AdminLayout.css`**
- Changed `.admin-header-mobile` from `z-index: 100` to `z-index: 900`
- Changed `.admin-sidebar` from `z-index: 200` to `z-index: 950`
- Changed `.admin-sidebar-overlay` from `z-index: 150` to `z-index: 940`

## How It Works Now

The new hierarchy ensures:

1. **Page content** (z-index: 10) is at the bottom
2. **Sticky page filters** (z-index: 900) float above page content but below header
3. **Header** (z-index: 1000) is above page filters
4. **Dropdown menus** (z-index: 1050) are **above the header**, so they never go behind anything
5. **Fixed elements** like WhatsApp button (z-index: 1100) are above dropdowns
6. **Modals and overlays** (z-index: 1300-1600) are at the top

## Testing Checklist

Test dropdown menus on these pages to ensure they appear correctly:

- [x] Home page
- [ ] Explore dropdown on all pages
- [ ] Book dropdown on all pages  
- [ ] Resources dropdown on all pages
- [ ] Offers page (with sticky filters)
- [ ] Travel News page (with sticky filters)
- [ ] Cruise Guides page (with sticky filters)
- [ ] Cruise Types page (with sticky filters)
- [ ] Find Cruise page
- [ ] About page
- [ ] Contact page
- [ ] Mobile menu (all pages)

## Key Learnings

1. **Dropdowns must have higher z-index than their parent container** to appear above sticky page elements
2. **Use CSS custom properties (tokens)** for consistent z-index management
3. **Document the z-index hierarchy** to prevent future conflicts
4. **Test across all pages** when making z-index changes

## Future Recommendations

1. **Never use arbitrary z-index values** (like 10, 100, 9999) - always use tokens
2. **Keep z-index tokens in one place** (`tokens.css`) for easy management
3. **Use meaningful token names** that describe the element's layer in the stacking context
4. **Leave gaps between z-index values** to allow for future additions

## Files Modified

1. `/src/styles/tokens.css` - Updated z-index tokens
2. `/src/pages/OffersPage.css` - Updated filter section z-index
3. `/src/pages/TravelNewsPage.css` - Updated filter section z-index
4. `/src/pages/CruiseGuidesPage.css` - Updated filter section z-index
5. `/src/pages/CruiseTypesPage.css` - Updated sticky section z-index
6. `/src/pages/FindCruisePage.css` - Updated widget section z-index
7. `/src/components/admin/AdminLayout.css` - Updated admin layout z-indexes

## Notes

- The header's `--z-sticky` alias is maintained for backward compatibility
- DevModeIndicator and PreviewGate correctly use z-index: 9999 as they should be above all content
- Admin modals correctly use high z-index values as they should overlay everything

