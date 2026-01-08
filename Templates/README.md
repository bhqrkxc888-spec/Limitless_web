# Content Templates - Limitless Cruises

This folder contains standardised content templates for creating consistent, high-quality content across the Limitless Cruises website.

## 📋 Available Templates

1. **CRUISE_LINE_TEMPLATE.md** - For adding new cruise line pages
2. **PORT_GUIDE_TEMPLATE.md** - For creating detailed port guides
3. **DESTINATION_TEMPLATE.md** - For major cruise destinations
4. **BUCKET_LIST_TEMPLATE.md** - For bucket list experiences

## 🚀 How to Use These Templates

### Step 1: Choose Your Template
Select the appropriate template based on the content type you're creating.

### Step 2: Create Your Content
1. Copy the template to a new file (e.g., `viking-cruises-DRAFT.md`)
2. Fill in all sections, replacing [bracketed] placeholder text
3. Follow all instructions and guidelines in the template
4. Use the quality checklist to verify your content

### Step 3: Research & Verify
- Use Perplexity AI with the provided prompt structures
- Verify all facts, figures, and details
- Check coordinates on Google Maps
- Confirm current pricing and availability
- Review cruise line official websites

### Step 4: Review & Submit
- Run through the quality checklist
- Have someone else review for clarity
- Submit to development team for integration

## ✅ Universal Content Standards

**ALL content must follow these rules:**

### Language & Style
- ✅ British English spelling (harbour, colour, organised, travelled)
- ❌ NO American spelling (harbor, color, organized, traveled)
- ❌ NO em dashes (—) or en dashes (–) - use hyphens (-) only
- ❌ NO emojis anywhere
- ✅ Natural, human language
- ❌ NO AI phrases: seamless, embark on, curated, crafted, nestled, boasts, myriad, delve, tapestry

### Factual Accuracy
- All facts must be current and verifiable
- Include specific details, numbers, and examples
- Be honest about limitations and considerations
- Avoid marketing fluff and superlatives

### SEO Requirements
- Meta titles under 60 characters
- Meta descriptions under 160 characters
- Avoid templated phrases like "Everything you need to know"
- Each piece should have unique, compelling meta descriptions

### Formatting
- All monetary values in GBP (£)
- Distances in metric (km)
- Times in 24-hour or clear am/pm format
- Coordinates in decimal degrees (verified on map)

## 🎯 Content Type Specific Notes

### Cruise Lines
- Verify loyalty programme tier names are accurate (NOT generic Bronze/Silver/Gold unless actually used)
- Include exactly 6 FAQ questions
- Kids club must be complete or set to `null` for adults-only

### Port Guides
- Focus on practical, actionable information
- Include specific walk times and transport costs
- Verify all website URLs are current
- Check if tender required or dock port

### Destinations
- Verify coordinates for major ports
- Confirm which cruise lines actually serve the destination
- Be clear about peak/off-peak seasons

### Bucket List
- Itineraries MUST start at Day 1 (departure from UK)
- NEVER use Day 0
- Include exactly 6 FAQ questions
- NO emojis in signatureSights (common mistake)

## 🔍 Research Tools

### Recommended Sources
- **Perplexity AI**: Use prompt structures provided in templates
- **Google Maps**: For accurate coordinates and distances
- **Official tourism websites**: For current information
- **Cruise line websites**: For itineraries, ships, policies
- **Recent reviews**: TripAdvisor, Cruise Critic for real experiences

### Verification Checklist
- [ ] Coordinates verified on Google Maps
- [ ] Costs checked against current rates
- [ ] Opening hours confirmed (seasonal variations)
- [ ] Transport options and costs current
- [ ] Cruise line policies up to date
- [ ] Port facilities and terminals accurate

## 📝 Common Mistakes to Avoid

1. **Using generic tier names** for loyalty programmes (verify actual tier names)
2. **Including emojis** in any content
3. **Starting itineraries at Day 0** (must start at Day 1)
4. **Using AI-sounding phrases** (seamless, crafted, curated, etc.)
5. **American spelling** (harbor instead of harbour)
6. **Templated meta descriptions** ("Everything you need to know about...")
7. **Outdated costs or information**
8. **Missing required sections** (FAQs, quick facts, etc.)

## 🔄 Update Process

### For New Content
1. Use template to create draft
2. Research and fill in all sections
3. Verify with quality checklist
4. Submit for review
5. Integrate into codebase

### For Existing Content Updates
1. Identify what needs updating
2. Research current information
3. Update relevant sections
4. Re-verify with quality checklist
5. Submit changes

## 📞 Questions?

If you need clarification on any template or standard:
- Check the specific template for detailed guidance
- Review existing content for examples
- Ask the development team for technical integration questions

## 🗂️ File Naming Convention

When creating draft content files:
- Cruise Lines: `[cruise-line-slug]-DRAFT.md`
- Port Guides: `[port-name-slug]-DRAFT.md`
- Destinations: `[destination-slug]-DRAFT.md`
- Bucket List: `[experience-slug]-DRAFT.md`

Keep files organised and clearly labelled!

---

**Note**: This Templates folder and all .md files within it are **NOT uploaded to git**. They are local working documents only. Final content is integrated into the codebase by the development team.

Last Updated: January 2026
