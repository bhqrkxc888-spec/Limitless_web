# Launch Checklist - Limitless Cruises

## Pre-Launch Technical Verification

- [ ] **Build passes with lint checks**: Run `npm run build` and verify no errors
- [ ] **Test production build locally**: `npm run build && npm run preview`
- [ ] **Error boundary works**: Test by temporarily throwing an error in a component
- [ ] **All images lazy-load correctly**: Check Network tab for below-fold images
- [ ] **Core Web Vitals green**: Run Lighthouse on key pages (Home, Offers, Travel News)

## SEO & Indexation

- [ ] **Submit sitemap to Google Search Console**: https://search.google.com/search-console
  - Add property for https://limitlesscruises.com
  - Submit sitemap URL: https://limitlesscruises.com/sitemap.xml
- [ ] **Submit sitemap to Bing Webmaster Tools**: https://www.bing.com/webmasters
  - Add site https://limitlesscruises.com
  - Submit sitemap URL: https://limitlesscruises.com/sitemap.xml
- [ ] **Verify robots.txt is accessible**: https://limitlesscruises.com/robots.txt
- [ ] **Check no unwanted pages are indexed**: Use `site:limitlesscruises.com` in Google
- [ ] **Verify canonical URLs**: Spot-check 3-5 pages to ensure correct canonical tags
- [ ] **Check OG tags**: Use https://www.opengraph.xyz/ to validate social sharing

## Performance & Monitoring

- [ ] **Set up performance monitoring**: Verify admin dashboard at /admin/performance
- [ ] **Set up error tracking**: Verify admin dashboard at /admin/errors
- [ ] **Mobile performance check**: Test on real mobile device or Chrome DevTools
- [ ] **Check LCP image**: Ensure hero image has fetchpriority="high" and loads first
- [ ] **Verify CLS < 0.1**: Check footer doesn't shift on load

## Security & Headers

- [ ] **HTTPS enabled**: All pages load via HTTPS
- [ ] **Security headers active**: Check with https://securityheaders.com/
- [ ] **CSP not blocking resources**: Check browser console for CSP errors
- [ ] **Admin routes protected**: Verify /admin requires auth

## Post-Launch Monitoring (First 48 Hours)

- [ ] **Monitor error dashboard**: Check /admin/errors daily for first week
- [ ] **Watch Search Console**: Check for crawl errors or indexation issues
- [ ] **Review Core Web Vitals**: Check field data in Search Console (after 28 days)
- [ ] **Test key user flows**: Contact form, price match, offer browsing
- [ ] **Monitor uptime**: Set up uptime monitoring (e.g., UptimeRobot, Vercel Analytics)

## Notes

- **Hidden sourcemaps enabled**: Stack traces available for debugging without exposing source
- **Lint runs on build**: Deployment will fail if code quality issues exist
- **Error boundary active**: Users see friendly error page instead of blank screen
- **All card images optimized**: Using lazy loading + low fetchpriority + responsive srcset

