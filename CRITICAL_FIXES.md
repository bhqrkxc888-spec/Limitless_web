# Critical Fixes - Image Flicker & Click Blocking

## Issues Identified

### 1. Image Flicker on Hero Sections ❌
**Problem:** When navigating between pages with hero images, users saw a blue gradient flash before the image loaded.

**Root Cause:**
- `usePortGuideImage` hook was setting a placeholder FIRST, then loading the real image
- `.hero-placeholder` CSS had a blue gradient background
- This caused a visible flash: Blue → Real Image

### 2. Click Blocking After Navigation ❌
**Problem:** After navigating away from certain pages, users couldn't click links (but could scroll) until hard refresh.

**Root Cause:**
- Modal overlays (`.enquiry-modal-overlay`) with `z-index: 9999` weren't being properly cleaned up
- `document.body.style.overflow = 'hidden'` sometimes persisted after modal close
- Lingering overlays blocked all click events

---

## Fixes Applied

### Fix 1: Optimized Image Loading ✅

**File:** `/src/hooks/useImageUrl.js`

**Changes:**
```javascript
// BEFORE: Always showed placeholder first
const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);

// Load placeholder
setImageUrl(smartPlaceholder);

// Then load real image
getImageUrlFromDb().then(url => setImageUrl(url));

// AFTER: Check database first, only show placeholder if no real image
const [imageUrl, setImageUrl] = useState(null);

// Try real image FIRST
getImageUrlFromDb().then(url => {
  if (url && !url.includes('placeholder')) {
    // Real image exists - use immediately
    setImageUrl(url);
    setIsPlaceholder(false);
  } else {
    // No real image - load placeholder
    setImageUrl(smartPlaceholder);
    setIsPlaceholder(true);
  }
});
```

**Result:**
- ✅ No flicker when real images exist
- ✅ Smooth loading experience
- ✅ Placeholder only shows when genuinely needed

---

### Fix 2: Removed Blue Hero Background ✅

**File:** `/src/components/HeroSection.css`

**Changes:**
```css
/* BEFORE */
.hero-placeholder {
  background: linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-light) 100%);
}

/* AFTER */
.hero-placeholder {
  background: var(--clr-bg-alt, #F8F5F0);
}

.hero-image {
  /* Added neutral background while loading */
  background: var(--clr-bg-alt, #F8F5F0);
}
```

**Result:**
- ✅ No blue flash
- ✅ Neutral beige background matches site design
- ✅ Seamless transition to image

---

### Fix 3: Overlay Cleanup System ✅

**New File:** `/src/utils/cleanupOverlays.js`

**Purpose:** Automatically clean up lingering overlays and body styles that block clicks

**Features:**
```javascript
export function cleanupOverlays() {
  // 1. Reset body overflow
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
  
  // 2. Remove orphaned modal overlays
  const overlays = document.querySelectorAll('.enquiry-modal-overlay');
  overlays.forEach(overlay => {
    if (!overlay.querySelector('.enquiry-modal')) {
      overlay.remove();
    }
  });
}

// Auto-cleanup on:
// - Route changes (React Router)
// - Browser back/forward (popstate)
// - Periodic check (every 500ms)
```

**Integration:** `/src/App.jsx`
```javascript
import { cleanupOverlays } from './utils/cleanupOverlays';

function ScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    cleanupOverlays(); // ← Added here
  }, [pathname]);
}
```

**Result:**
- ✅ Overlays automatically removed on navigation
- ✅ Body overflow reset on every page change
- ✅ No more click-blocking issues
- ✅ Works with browser back/forward buttons

---

## Testing Checklist

### Image Flicker
- [x] Navigate to port guide with hero image
- [x] Check for blue flash (should be gone)
- [x] Navigate between multiple port guides
- [x] Verify smooth image transitions

### Click Blocking
- [x] Open enquiry modal
- [x] Close modal
- [x] Navigate to another page
- [x] Verify all links are clickable
- [x] Test browser back button
- [x] Verify no lingering overlays

---

## Technical Details

### Image Loading Strategy

**Old Flow:**
1. Component mounts
2. Show placeholder immediately
3. Fetch from database
4. Replace placeholder with real image
5. **Result:** Visual flicker

**New Flow:**
1. Component mounts
2. Fetch from database immediately
3. If real image exists → show it
4. If no image → show placeholder
5. **Result:** No flicker

### Overlay Cleanup Strategy

**Prevention Layers:**
1. **Modal Component:** Proper cleanup in useEffect return
2. **Route Change:** Cleanup in ScrollToTop component
3. **Popstate:** Cleanup on browser navigation
4. **Periodic:** Safety check every 500ms
5. **Manual:** Exposed `cleanupOverlays()` function

---

## Performance Impact

### Before:
- **Image Load:** 2 renders (placeholder → real image)
- **Click Blocking:** Random occurrence, required hard refresh
- **User Experience:** Jarring, unpredictable

### After:
- **Image Load:** 1 render (real image directly)
- **Click Blocking:** Prevented by automatic cleanup
- **User Experience:** Smooth, reliable

---

## Browser Compatibility

All fixes tested and working in:
- ✅ Chrome/Edge (Chromium)
- ✅ Safari (WebKit)
- ✅ Firefox (Gecko)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

---

## Related Files Modified

1. `/src/hooks/useImageUrl.js` - Image loading optimization
2. `/src/components/HeroSection.css` - Background color fix
3. `/src/utils/cleanupOverlays.js` - New cleanup utility
4. `/src/App.jsx` - Integration of cleanup on navigation

---

## Future Considerations

### Image Loading
- Consider adding `loading="eager"` to hero images
- Implement image preloading for critical pages
- Add fade-in animation for smoother transitions

### Overlay Management
- Consider using a global modal manager
- Implement React Portal for all modals
- Add focus trap for better accessibility

---

## Summary

**Problem 1:** Blue flicker when loading hero images
**Solution:** Load real images first, only show placeholder if needed

**Problem 2:** Clicks blocked after navigation
**Solution:** Automatic overlay cleanup on every route change

**Status:** ✅ Both issues resolved

**Impact:** Significantly improved user experience and navigation reliability

---

*Fixed: January 2025*
