# Page Header Standardization

## Overview
All pages without hero images now use a standardized, clean header design based on the Bespoke Cruise Packages page.

---

## Standard Header Design

### Visual Style
- **Background:** Light beige (`#F8F5F0`)
- **Border:** Subtle bottom border (`#E8E4DC`)
- **Padding:** Generous spacing (3rem top, 2rem bottom on desktop)
- **Alignment:** Center-aligned
- **Typography:**
  - **Title:** Playfair Display, responsive size (1.75rem-2.5rem)
  - **Subtitle:** 1.125rem, muted color (`#5C6478`)
  - **Max width:** 600px for optimal readability

### CSS Component
Location: `/src/styles/page-header.css`

Class: `.standard-page-header`

---

## Pages Updated

### ✅ Standardized (Using `.standard-page-header`)

1. **Bespoke Cruise Packages** (`/concierge`)
   - Original template for the design
   - Clean, modern, professional

2. **Get a Quote** (`/get-a-quote`)
   - Previously: `quote-page-header`
   - Now: `standard-page-header`

3. **Find Your Perfect Cruise** (`/find-a-cruise`)
   - Previously: `finder-hero`
   - Now: `standard-page-header`
   - Removed inline link, simplified subtitle

4. **FAQ** (`/faq`)
   - Previously: `faq-hero`
   - Now: `standard-page-header`
   - Maintains inline link to contact

5. **Testimonials** (`/testimonials`)
   - Previously: `testimonials-hero`
   - Now: `standard-page-header`

6. **Port Region Pages** (`/ports/region/*`)
   - Previously: `page-header` with CTAs
   - Now: `standard-page-header`
   - Removed CTA buttons (redundant with bottom CTA)

7. **Cruise Port Guides** (`/ports`)
   - Already using compact hero
   - Consistent with new standard

---

## Pages NOT Changed (Have Images)

These pages have hero images and maintain their custom designs:

1. **Home Page** (`/`)
   - Hero with background image
   - Custom design maintained

2. **About Page** (`/about`)
   - Hero with personal photo
   - Custom layout maintained

3. **Contact Page** (`/contact`)
   - Hero with consultant photo
   - Two-column layout maintained

4. **Destinations** (`/destinations`)
   - Uses HeroSection component with images
   - Custom design maintained

5. **Individual Port Guides** (`/ports/[slug]`)
   - Uses HeroSection with port images
   - Custom design maintained

---

## Benefits

### 1. **Consistency**
- All non-image pages now have identical header styling
- Professional, cohesive brand experience
- Easier for users to navigate

### 2. **Maintainability**
- Single CSS file to update (`page-header.css`)
- Changes apply across all pages automatically
- Reduced code duplication

### 3. **Performance**
- Shared CSS file (cached once, used everywhere)
- Smaller individual page CSS files
- Faster page loads

### 4. **Clean Design**
- Modern, uncluttered aesthetic
- Focuses attention on content
- Matches Bespoke Packages (your preferred style)

---

## Usage for New Pages

When creating a new page without a hero image:

```jsx
import '../styles/page-header.css';

function NewPage() {
  return (
    <main>
      <section className="standard-page-header">
        <div className="container">
          <h1>Page Title</h1>
          <p>Optional subtitle or description</p>
        </div>
      </section>
      
      {/* Rest of page content */}
    </main>
  );
}
```

### Optional: Add Eyebrow Text

```jsx
<section className="standard-page-header">
  <div className="container">
    <span className="page-header-eyebrow">Category Label</span>
    <h1>Page Title</h1>
    <p>Subtitle</p>
  </div>
</section>
```

---

## Before & After Comparison

### Before (Multiple Styles)
```css
/* GetQuotePage.css */
.quote-page-header {
  padding: 4rem 0 3rem;
  background: linear-gradient(...);
  /* Custom styles */
}

/* FindCruisePage.css */
.finder-hero {
  padding: 5rem 0;
  background: #fff;
  /* Different styles */
}

/* FAQPage.css */
.faq-hero {
  padding: 3rem 0;
  background: #f5f5f5;
  /* More custom styles */
}
```

### After (One Standard)
```css
/* page-header.css (shared) */
.standard-page-header {
  padding: var(--space-12, 3rem) 0 var(--space-8, 2rem) 0;
  text-align: center;
  background: var(--clr-bg-alt, #F8F5F0);
  border-bottom: 1px solid var(--clr-border, #E8E4DC);
}
```

All pages now use the same, clean design.

---

## Mobile Responsiveness

The standard header is fully responsive:

- **Desktop (>768px):** Full padding, large title (1.75rem-2.5rem)
- **Mobile (<768px):** Reduced padding, smaller title (1.5rem)
- **All devices:** Centered, readable, clean

---

## Future Considerations

### When to Use Standard Header:
- ✅ Informational pages (FAQ, Testimonials)
- ✅ Form pages (Contact, Get Quote, Bespoke Packages)
- ✅ List/Directory pages (Ports, Regions)
- ✅ Any page without a hero image

### When NOT to Use:
- ❌ Pages with hero images (use `HeroSection` component)
- ❌ Landing pages with full-width backgrounds
- ❌ Pages requiring custom layouts (e.g., split hero)

---

## Summary

**7 pages standardized** with clean, modern headers based on Bespoke Packages design.

**Result:** Consistent, professional, maintainable page headers across the entire site.

**Next steps:** All future pages without images should use `.standard-page-header` for consistency.

---

*Last updated: January 2025*
