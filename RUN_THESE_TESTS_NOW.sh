#!/bin/bash

# 🚀 Immediate Live Site Tests
# Run these commands to verify your live site is working correctly
# Usage: bash RUN_THESE_TESTS_NOW.sh

echo "🔍 Testing Limitless Cruises Live Site..."
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SITE_URL="https://limitlesscruises.com"

# Note: Site redirects non-www to www (limitlesscruises.com -> www.limitlesscruises.com)
# This is normal and correct. We use -L to follow redirects.

# Test 1: Homepage Status
echo "1️⃣  Testing Homepage..."
STATUS=$(curl -L -s -o /dev/null -w "%{http_code}" $SITE_URL)
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ Homepage loads (HTTP $STATUS)${NC}"
else
    echo -e "${RED}❌ Homepage failed (HTTP $STATUS)${NC}"
fi
echo ""

# Test 2: robots.txt
echo "2️⃣  Testing robots.txt..."
ROBOTS=$(curl -L -s $SITE_URL/robots.txt)
if echo "$ROBOTS" | grep -q "Sitemap:"; then
    echo -e "${GREEN}✅ robots.txt accessible and has sitemap reference${NC}"
    echo "Preview:"
    echo "$ROBOTS" | head -10
else
    echo -e "${RED}❌ robots.txt missing or invalid${NC}"
fi
echo ""

# Test 3: sitemap.xml
echo "3️⃣  Testing sitemap.xml..."
SITEMAP_COUNT=$(curl -L -s $SITE_URL/sitemap.xml | grep -c "<loc>")
if [ "$SITEMAP_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ sitemap.xml accessible with $SITEMAP_COUNT URLs${NC}"
    if [ "$SITEMAP_COUNT" -ge 70 ] && [ "$SITEMAP_COUNT" -le 75 ]; then
        echo -e "${GREEN}   Perfect! Expected ~72 URLs${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Expected ~72 URLs, found $SITEMAP_COUNT${NC}"
    fi
else
    echo -e "${RED}❌ sitemap.xml missing or invalid${NC}"
fi
echo ""

# Test 4: llms.txt
echo "4️⃣  Testing llms.txt..."
LLMS=$(curl -L -s $SITE_URL/llms.txt)
if echo "$LLMS" | grep -q "Limitless Cruises"; then
    echo -e "${GREEN}✅ llms.txt accessible${NC}"
    echo "Preview:"
    echo "$LLMS" | head -5
else
    echo -e "${RED}❌ llms.txt missing or invalid${NC}"
fi
echo ""

# Test 5: Admin Route Protection
echo "5️⃣  Testing Admin Protection..."
ADMIN_ROBOTS=$(curl -L -s -I $SITE_URL/admin | grep -i "X-Robots-Tag")
if echo "$ADMIN_ROBOTS" | grep -q "noindex"; then
    echo -e "${GREEN}✅ Admin routes have noindex header${NC}"
    echo "   $ADMIN_ROBOTS"
else
    echo -e "${YELLOW}⚠️  Admin noindex header not detected${NC}"
fi
echo ""

# Test 6: Security Headers
echo "6️⃣  Testing Security Headers..."
HEADERS=$(curl -L -s -I $SITE_URL)

if echo "$HEADERS" | grep -q "X-Content-Type-Options"; then
    echo -e "${GREEN}✅ X-Content-Type-Options present${NC}"
else
    echo -e "${YELLOW}⚠️  X-Content-Type-Options missing${NC}"
fi

if echo "$HEADERS" | grep -q "X-Frame-Options"; then
    echo -e "${GREEN}✅ X-Frame-Options present${NC}"
else
    echo -e "${YELLOW}⚠️  X-Frame-Options missing${NC}"
fi

if echo "$HEADERS" | grep -q "Strict-Transport-Security"; then
    echo -e "${GREEN}✅ HSTS (Strict-Transport-Security) present${NC}"
else
    echo -e "${YELLOW}⚠️  HSTS missing${NC}"
fi
echo ""

# Test 7: Key Pages
echo "7️⃣  Testing Key Pages..."
PAGES=("/about" "/contact" "/find-a-cruise" "/offers" "/faq")
for PAGE in "${PAGES[@]}"; do
    STATUS=$(curl -L -s -o /dev/null -w "%{http_code}" $SITE_URL$PAGE)
    if [ "$STATUS" -eq 200 ]; then
        echo -e "${GREEN}✅ $PAGE (HTTP $STATUS)${NC}"
    else
        echo -e "${RED}❌ $PAGE (HTTP $STATUS)${NC}"
    fi
done
echo ""

# Test 8: Draft Page (Coming Soon)
echo "8️⃣  Testing Draft Page (Testimonials)..."
TESTIMONIALS=$(curl -L -s $SITE_URL/testimonials)
if echo "$TESTIMONIALS" | grep -q "Coming Soon"; then
    echo -e "${GREEN}✅ Draft page shows 'Coming Soon'${NC}"
else
    echo -e "${YELLOW}⚠️  'Coming Soon' message not detected${NC}"
fi

if echo "$TESTIMONIALS" | grep -q 'name="robots" content="noindex'; then
    echo -e "${GREEN}✅ Draft page has noindex meta tag${NC}"
else
    echo -e "${YELLOW}⚠️  noindex meta tag not detected${NC}"
fi
echo ""

# Test 9: Check for testimonials in sitemap (should NOT be there)
echo "9️⃣  Verifying Draft Pages Excluded from Sitemap..."
SITEMAP=$(curl -L -s $SITE_URL/sitemap.xml)
if echo "$SITEMAP" | grep -q "testimonials"; then
    echo -e "${RED}❌ Draft page 'testimonials' found in sitemap (should be excluded)${NC}"
else
    echo -e "${GREEN}✅ Draft pages correctly excluded from sitemap${NC}"
fi
echo ""

# Summary
echo "=========================================="
echo "🎯 Test Summary"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Review any ⚠️  warnings or ❌ failures above"
echo "2. Open site in browser: $SITE_URL"
echo "3. Test contact form submission"
echo "4. Check mobile responsiveness"
echo "5. Run PageSpeed Insights: https://pagespeed.web.dev/"
echo ""
echo "📋 Full Checklist: See LIVE_SITE_CHECKLIST.md"
echo "⚡ Quick Tests: See QUICK_LAUNCH_TESTS.md"
echo ""
echo "✨ Testing complete!"

