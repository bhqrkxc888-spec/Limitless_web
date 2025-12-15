# Content TODO Checklist

This file lists all content that needs to be provided or updated. Use this as a checklist when updating the site.

---

## 🔴 High Priority (Before Launch)

### Images to Replace
All placeholder images marked with `TODO: Replace with real image` need real photos:

#### Cruise Line Images
- [ ] `/images/cruise-lines/po-cruises.jpg` - P&O hero image
- [ ] `/images/cruise-lines/msc.jpg` - MSC hero image
- [ ] `/images/cruise-lines/royal-caribbean.jpg` - Royal Caribbean hero
- [ ] `/images/cruise-lines/norwegian.jpg` - Norwegian hero
- [ ] `/images/cruise-lines/disney.jpg` - Disney hero
- [ ] `/images/cruise-lines/celebrity.jpg` - Celebrity hero
- [ ] `/images/cruise-lines/fred-olsen.jpg` - Fred. Olsen hero
- [ ] `/images/cruise-lines/holland-america.jpg` - Holland America hero
- [ ] `/images/cruise-lines/marella.jpg` - Marella hero
- [ ] `/images/cruise-lines/virgin-voyages.jpg` - Virgin Voyages hero
- [ ] `/images/cruise-lines/viking.jpg` - Viking hero
- [ ] `/images/cruise-lines/seabourn.jpg` - Seabourn hero
- [ ] `/images/cruise-lines/princess.jpg` - Princess hero
- [ ] `/images/cruise-lines/azamara.jpg` - Azamara hero
- [ ] `/images/cruise-lines/cunard.jpg` - Cunard hero
- [ ] `/images/cruise-lines/ae-expeditions.jpg` - Aurora Expeditions hero

#### Cruise Line Logos
- [ ] All logos in `/images/cruise-lines/logos/`

#### Destination Images
Currently using Unsplash URLs. Consider uploading to Supabase Storage for reliability.

#### Cruise Type Images
- [ ] `/images/categories/family-cruises.jpg`
- [ ] `/images/categories/adults-only.jpg`
- [ ] `/images/categories/uk-sailings.jpg`
- [ ] `/images/categories/luxury.jpg`
- [ ] `/images/categories/river.jpg`
- [ ] `/images/categories/expedition.jpg`
- [ ] `/images/categories/solo.jpg`

### Real Content Needed

#### Testimonials (`src/pages/TestimonialsPage.jsx`)
- [ ] Replace placeholder testimonials with real customer reviews
- [ ] Get permission from customers before using their testimonials
- [ ] Include: name, location, cruise taken, rating

#### Offers (Supabase CMS)
- [ ] Add real cruise offers to Supabase database
- [ ] Once added, placeholder offers will be replaced automatically
- [ ] Include: title, description, price, dates, cruise line, destination

---

## 🟡 Medium Priority (Post-Launch)

### Travel News (Supabase CMS)
- [ ] Create "Coming Soon" announcement articles
- [ ] Add cruise industry news
- [ ] Write seasonal cruise guides (e.g., "Best Winter Cruises 2025")

### Bucket List Experiences
Review and update in `src/data/bucketList.js`:
- [ ] Verify pricing is current (startingFrom values)
- [ ] Update images with real photos from cruises
- [ ] Add more testimonials from customers who've done these trips

### Destination Content
Review and update in `src/data/destinations.js`:
- [ ] Verify port coordinates are accurate
- [ ] Add more regional detail if needed
- [ ] Update "best time to visit" information

---

## 🟢 Low Priority (Ongoing)

### FAQ Updates
Add new questions as they come in (`src/pages/FAQPage.jsx`):
- [ ] Monitor customer enquiries for common questions
- [ ] Add seasonal FAQ (e.g., "What about Christmas cruises?")

### Cruise Line Updates
Keep cruise line info current (`src/data/cruiseLines.js`):
- [ ] Add new ships when launched
- [ ] Update loyalty program tiers if changed
- [ ] Add new cruise lines as partnerships develop

---

## 📁 File Locations Quick Reference

| Content | File Location |
|---------|--------------|
| Site settings | `src/config/siteConfig.js` |
| Cruise lines | `src/data/cruiseLines.js` |
| Destinations | `src/data/destinations.js` |
| Bucket list | `src/data/bucketList.js` |
| Cruise types | `src/data/cruiseTypes.js` |
| FAQ | `src/pages/FAQPage.jsx` |
| Testimonials | `src/pages/TestimonialsPage.jsx` |
| Placeholder offers | `src/data/placeholderOffers.js` |

---

## 🚀 When Ready to Deploy

1. Run sitemap generator: `npm run sitemap`
2. Build the site: `npm run build`
3. Test locally: `npm run preview`
4. Deploy to Vercel (automatic if connected to GitHub)

---

## 📸 Image Upload to Supabase

1. Go to Supabase Dashboard → Storage
2. Navigate to appropriate bucket (cruise-lines, destinations, etc.)
3. Upload image with descriptive filename
4. Copy public URL
5. Update the image path in the relevant data file

---

*Last updated: December 2024*

