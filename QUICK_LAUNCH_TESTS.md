# ⚡ Quick Launch Tests - Run These First!

**Time Required:** ~15 minutes  
**Run these immediately after deployment**

---

## 🔥 Critical Tests (5 minutes)

### 1. Homepage Loads
```bash
curl -I https://limitlesscruises.com
# Should return: HTTP/2 200
```

### 2. SEO Files Accessible
```bash
# robots.txt
curl https://limitlesscruises.com/robots.txt | head -20

# sitemap.xml
curl https://limitlesscruises.com/sitemap.xml | grep -c "<loc>"
# Should return: 72

# llms.txt
curl https://limitlesscruises.com/llms.txt | head -10
```

### 3. Admin Protected
```bash
curl -I https://limitlesscruises.com/admin
# Should have: X-Robots-Tag: noindex, nofollow
```

### 4. Draft Pages Show Coming Soon
- Visit: https://limitlesscruises.com/testimonials
- Should see: "Coming Soon" message
- Check source: Should have `<meta name="robots" content="noindex, follow">`

### 5. Published Pages Work
- ✅ https://limitlesscruises.com/
- ✅ https://limitlesscruises.com/about
- ✅ https://limitlesscruises.com/contact
- ✅ https://limitlesscruises.com/find-a-cruise
- ✅ https://limitlesscruises.com/offers
- ✅ https://limitlesscruises.com/faq

---

## 🎯 Functional Tests (5 minutes)

### Contact Form
1. Go to homepage, scroll to contact form
2. Fill in all fields
3. Check consent checkbox
4. Submit
5. Verify success message appears

### Navigation
1. Click all main nav items
2. Verify pages load without 404
3. Test mobile menu (resize browser)

### Footer Links
1. Scroll to footer
2. Click 3-4 random links
3. Verify they work
4. Check social media links open in new tab

---

## 📊 Performance Quick Check (5 minutes)

### PageSpeed Insights
1. Go to: https://pagespeed.web.dev/
2. Enter: https://limitlesscruises.com
3. Run test for Mobile & Desktop
4. Target scores:
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 95+

### Mobile Test
1. Open on real mobile device (or Chrome DevTools mobile view)
2. Check homepage loads fast
3. Verify images display correctly
4. Test form submission
5. Check navigation menu works

---

## 🔍 SEO Quick Validation

### Meta Tags
1. Go to: https://www.opengraph.xyz/
2. Enter: https://limitlesscruises.com
3. Verify:
   - Title appears
   - Description appears
   - OG image shows
   - Twitter card preview looks good

### Structured Data
1. Go to: https://search.google.com/test/rich-results
2. Enter: https://limitlesscruises.com
3. Should detect: TravelAgency schema
4. Test FAQ page: https://limitlesscruises.com/faq
5. Should detect: FAQPage schema

---

## 🔒 Security Headers Check

```bash
curl -I https://limitlesscruises.com | grep -E "(X-|Strict-Transport|Content-Security)"
```

Should see:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: ...`

---

## 📱 Browser Console Check

1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Visit homepage
4. **Should see NO red errors**
5. Warnings are OK, but no errors

---

## ✅ Quick Checklist

- [ ] Homepage loads (200 status)
- [ ] robots.txt accessible
- [ ] sitemap.xml has 72 URLs
- [ ] Admin routes are noindex
- [ ] Draft pages show "Coming Soon"
- [ ] Contact form submits
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] PageSpeed scores acceptable
- [ ] Meta tags validate
- [ ] Structured data detected
- [ ] Security headers present
- [ ] No console errors

---

## 🚨 If Something Fails

### Site Won't Load
1. Check Vercel deployment status
2. Check DNS settings
3. Check SSL certificate

### Forms Don't Submit
1. Check Supabase connection
2. Check browser console for errors
3. Verify Supabase RPC functions deployed

### SEO Files Missing
1. Check `public/` folder has files
2. Verify Vercel build completed
3. Check vercel.json rewrites

### Performance Issues
1. Check images are optimized
2. Verify preconnect hints in index.html
3. Check for render-blocking resources

---

## 📞 Quick Commands Reference

```bash
# Check if site is up
curl -I https://limitlesscruises.com

# Count sitemap URLs
curl -s https://limitlesscruises.com/sitemap.xml | grep -c "<loc>"

# Check for specific page in sitemap
curl -s https://limitlesscruises.com/sitemap.xml | grep "testimonials"
# Should return nothing (draft page)

# Check robots.txt
curl https://limitlesscruises.com/robots.txt

# Test specific page status
curl -I https://limitlesscruises.com/about

# Check security headers
curl -I https://limitlesscruises.com | grep "X-"
```

---

**All green? You're live! 🎉**

Next: Run full [LIVE_SITE_CHECKLIST.md](LIVE_SITE_CHECKLIST.md) over the next 24 hours.

