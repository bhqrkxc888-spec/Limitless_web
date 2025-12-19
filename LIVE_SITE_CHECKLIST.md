# 🚀 Live Site Launch Checklist

**Site:** Limitless Cruises (https://limitlesscruises.com)  
**Last Updated:** December 19, 2025

---

## 📋 Pre-Launch Checklist

### 🔍 SEO & Indexing

- [ ] **robots.txt** - Verify accessible at `/robots.txt`
  - Should allow all crawlers except `/admin/`, `/api/`, `/preview`
  - Should reference sitemap.xml
  - Test: `curl https://limitlesscruises.com/robots.txt`

- [ ] **sitemap.xml** - Verify accessible at `/sitemap.xml`
  - Should contain all published pages (72 URLs expected)
  - Should NOT contain draft pages (testimonials, cruise-guides)
  - Should NOT contain admin pages
  - Test: `curl https://limitlesscruises.com/sitemap.xml | grep -c "<loc>"`

- [ ] **llms.txt** - Verify accessible at `/llms.txt`
  - Should contain AI/LLM context about the business
  - Test: `curl https://limitlesscruises.com/llms.txt`

- [ ] **Google Search Console**
  - Submit sitemap.xml
  - Verify domain ownership
  - Check for crawl errors
  - URL: https://search.google.com/search-console

- [ ] **Bing Webmaster Tools**
  - Submit sitemap.xml
  - Verify domain ownership
  - URL: https://www.bing.com/webmasters

- [ ] **Meta Tags Validation**
  - Homepage has proper title, description, OG tags
  - All pages have unique titles and descriptions
  - Test with: https://www.opengraph.xyz/
  - Test with: https://cards-dev.twitter.com/validator

- [ ] **Structured Data Validation**
  - Test with Google Rich Results: https://search.google.com/test/rich-results
  - Verify TravelAgency schema on homepage
  - Verify FAQPage schema on /faq
  - Verify BreadcrumbList on all pages

---

### 🔒 Security & Headers

- [ ] **HTTPS/SSL Certificate**
  - Valid SSL certificate installed
  - No mixed content warnings
  - Test: https://www.ssllabs.com/ssltest/

- [ ] **Security Headers** (via Vercel)
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security (HSTS)
  - Content-Security-Policy
  - Test: https://securityheaders.com/

- [ ] **Admin Routes Protected**
  - `/admin` requires password
  - `/admin/login` accessible but noindex
  - `/admin/*` all have noindex headers
  - Test: `curl -I https://limitlesscruises.com/admin`

- [ ] **API Endpoints Secured**
  - `/api/admin/*` requires authentication
  - Rate limiting in place (if applicable)

---

### ⚡ Performance

- [ ] **Core Web Vitals**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
  - Test: https://pagespeed.web.dev/

- [ ] **Lighthouse Score**
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 95+
  - Test in Chrome DevTools

- [ ] **Image Optimization**
  - All images have width/height attributes
  - Hero images use priority loading
  - Lazy loading on below-fold images
  - WebP format where supported

- [ ] **Resource Loading**
  - Fonts preloaded
  - Critical CSS inline (if applicable)
  - JavaScript code-split and lazy-loaded
  - Preconnect hints for external domains

- [ ] **Mobile Performance**
  - Test on real mobile devices
  - Check mobile PageSpeed score
  - Verify touch targets are adequate (48x48px minimum)

---

### ♿ Accessibility

- [ ] **WCAG 2.1 AA Compliance**
  - Test with WAVE: https://wave.webaim.org/
  - Test with axe DevTools

- [ ] **Keyboard Navigation**
  - All interactive elements keyboard accessible
  - Focus indicators visible
  - Skip to main content link works

- [ ] **Screen Reader Testing**
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - All images have alt text
  - Forms have proper labels
  - ARIA attributes used correctly

- [ ] **Color Contrast**
  - Text meets WCAG AA standards (4.5:1 for normal text)
  - Test: https://webaim.org/resources/contrastchecker/

---

### 📱 Cross-Browser & Device Testing

- [ ] **Desktop Browsers**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)

- [ ] **Mobile Browsers**
  - iOS Safari (iPhone)
  - Chrome (Android)
  - Samsung Internet

- [ ] **Tablet Testing**
  - iPad (Safari)
  - Android tablet

- [ ] **Responsive Design**
  - Test breakpoints: 320px, 768px, 1024px, 1440px
  - No horizontal scrolling
  - Touch targets adequate size

---

### 📧 Forms & Functionality

- [ ] **Contact Form**
  - Submits successfully to Supabase
  - Email notifications working
  - Validation works correctly
  - Success/error messages display
  - GDPR consent checkbox required

- [ ] **Price Match Form**
  - File upload works (PDF, JPG, PNG, WebP)
  - File size validation (max 5MB)
  - Submits to Supabase
  - Document stored in Supabase Storage

- [ ] **Cookie Consent**
  - Banner displays on first visit
  - Accept/Reject buttons work
  - Settings modal functional
  - Consent stored in localStorage + Supabase
  - Scripts only load after consent

---

### 🔗 Links & Navigation

- [ ] **Internal Links**
  - All internal links work (no 404s)
  - Navigation menu functional
  - Breadcrumbs display correctly
  - Footer links work

- [ ] **External Links**
  - All external links have `rel="noopener noreferrer"`
  - Social media links work
  - Phone numbers clickable (tel: links)
  - WhatsApp link works
  - Email links work (mailto:)

- [ ] **404 Page**
  - Custom 404 page displays
  - Has helpful navigation back to site
  - Properly styled

---

### 📊 Analytics & Monitoring

- [ ] **Supabase Monitoring**
  - Error tracking functional
  - Performance monitoring active
  - SEO monitoring active
  - Database RPC functions working

- [ ] **Google Analytics** (if implemented)
  - Tracking code installed
  - Events firing correctly
  - Cookie consent integration

- [ ] **Error Logging**
  - JavaScript errors logged to Supabase
  - Network errors tracked
  - API errors captured

---

### 🎨 Content & Design

- [ ] **Content Review**
  - No Lorem Ipsum placeholder text
  - All pages have real content
  - Spelling and grammar checked
  - Legal pages up to date (T&Cs, Privacy Policy)

- [ ] **Images**
  - No broken images
  - All images have descriptive alt text
  - Placeholder images replaced with real ones
  - Hero images for all key pages

- [ ] **Branding**
  - Logo displays correctly
  - Favicon shows in browser tabs
  - Brand colors consistent
  - Typography consistent

---

### 🔄 Third-Party Integrations

- [ ] **Supabase**
  - Database connection working
  - RPC functions deployed
  - Storage buckets configured
  - Row Level Security (RLS) policies active

- [ ] **Vercel Blob**
  - Images loading correctly
  - CDN caching working

- [ ] **Weather APIs** (if enabled)
  - OpenWeatherMap API key valid
  - StormGlass API key valid (if used)
  - Consent checks before API calls

- [ ] **Widgety Cruise Search** (if enabled)
  - Widget loads correctly
  - Search functionality works

---

### 📄 Legal & Compliance

- [ ] **GDPR Compliance**
  - Privacy Policy accessible
  - Cookie Policy accessible
  - Consent mechanism working
  - Data retention policies documented
  - Contact email for data requests

- [ ] **ABTA Compliance**
  - ABTA number displayed (P7541)
  - Financial protection information clear
  - Booking terms accessible

- [ ] **Accessibility Statement** (optional but recommended)
  - Document accessibility features
  - Provide contact for accessibility issues

---

## 🚨 Post-Launch Monitoring (First 24-48 Hours)

### Immediate Checks (First Hour)

- [ ] **Homepage loads** without errors
- [ ] **All critical pages** accessible (About, Contact, Find a Cruise)
- [ ] **Forms submit** successfully
- [ ] **No JavaScript errors** in console
- [ ] **Mobile site** works correctly

### First 24 Hours

- [ ] **Monitor error logs** in Supabase
- [ ] **Check performance metrics** (Core Web Vitals)
- [ ] **Review form submissions** (test and real)
- [ ] **Check search console** for crawl errors
- [ ] **Monitor server response times**

### First Week

- [ ] **Google indexing** - Check pages appearing in search
- [ ] **Verify sitemap** processed by Google
- [ ] **Review user feedback** (if any)
- [ ] **Check analytics** for traffic patterns
- [ ] **Monitor bounce rates** and user behavior

---

## 🛠️ Testing Tools & Resources

### SEO Tools
- **Google Search Console**: https://search.google.com/search-console
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Open Graph Debugger**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

### Performance Tools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse** (Chrome DevTools)

### Security Tools
- **SSL Labs**: https://www.ssllabs.com/ssltest/
- **Security Headers**: https://securityheaders.com/
- **Mozilla Observatory**: https://observatory.mozilla.org/

### Accessibility Tools
- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Validation Tools
- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Link Checker**: https://validator.w3.org/checklink

---

## 📞 Emergency Contacts

**Technical Issues:**
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support

**DNS/Domain Issues:**
- Domain registrar support

**Critical Bug Reporting:**
- Check Supabase error logs: Admin Dashboard > Errors
- Check Vercel deployment logs: Vercel Dashboard > Deployments

---

## ✅ Final Sign-Off

- [ ] **All checklist items completed**
- [ ] **Stakeholders notified of launch**
- [ ] **Backup plan in place** (rollback procedure)
- [ ] **Monitoring alerts configured**
- [ ] **Support team briefed** (if applicable)

**Launched By:** _________________  
**Date:** _________________  
**Time:** _________________

---

## 📝 Notes

Use this section to document any issues found during launch or special configurations:

```
[Add notes here]
```

---

**Good luck with your launch! 🚀**

