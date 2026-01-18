# AI Prompt for Generating Port Guides

## How to Use This

1. Copy the prompt below
2. Paste into Claude, Perplexity, or ChatGPT
3. Attach `PORT_TEMPLATE_FOR_AI.md`
4. AI generates complete port guide
5. Save as `slug.md` (e.g., `barcelona.md`)
6. Upload via Admin > Port Management > Upload Markdown

---

## THE PROMPT

```
I need you to create a comprehensive cruise port guide using the attached template.

PORT: [Enter port name here, e.g., "Barcelona" or "Southampton"]

REQUIREMENTS:
- Research current, accurate information about this cruise port
- Fill in EVERY section of the template (don't skip any)
- Replace ALL [BRACKETS] with real content
- Use actual prices in the correct currency
- Be specific with distances, timings, and costs
- Write in an engaging, helpful tone for cruise passengers
- Prioritize attractions within 2 hours of the port
- Include practical tips cruise passengers actually need

STYLE:
- Clear, concise, and practical
- No fluff or overly promotional language
- Focus on actionable information
- Think: "What would I want to know if I had 6-8 hours in this port?"

CRUCIAL:
- Verify current cruise terminal information
- Check opening hours and prices are up-to-date
- Ensure transport options and costs are accurate
- Confirm the correct emergency numbers
- Double-check coordinates on Google Maps

OUTPUT FORMAT:
- Keep the exact template structure
- Don't add extra sections
- Don't remove any sections (leave empty if no info)
- Maintain the markdown formatting exactly

Once complete, I'll review and upload to the Limitless Cruises admin.

Ready? Please fill out the template for [PORT NAME].
```

---

## Example Ports to Get Started

### UK & Atlantic Coast
- Southampton
- Dover
- Liverpool
- Cork (Cobh), Ireland
- Zeebrugge (Bruges), Belgium
- Amsterdam, Netherlands
- Le Havre (Paris), France

### Atlantic Islands
- Las Palmas, Gran Canaria ✅ (Already done)
- Santa Cruz, Tenerife ✅ (Already done)
- Funchal, Madeira
- Ponta Delgada, Azores

### Mediterranean
- Barcelona, Spain
- Palma de Mallorca, Spain
- Marseille, France
- Rome (Civitavecchia), Italy
- Venice, Italy
- Dubrovnik, Croatia
- Athens (Piraeus), Greece

### Northern Europe
- Copenhagen, Denmark
- Oslo, Norway
- Bergen, Norway
- Stavanger, Norway
- Reykjavik, Iceland

### Baltic
- Stockholm, Sweden
- Tallinn, Estonia
- St Petersburg, Russia
- Helsinki, Finland

---

## Tips for Best Results

### Ask AI to Focus On:
1. **Cruise-specific info** - terminal location, shuttle services, port taxes
2. **Time-efficient routes** - what to see in 4-6 hours
3. **Current prices** - 2024/2025 rates for attractions and transport
4. **Practical warnings** - scams, tourist traps, areas to avoid
5. **Booking advice** - which tickets to buy in advance

### Quality Check:
- ✅ Prices look realistic (not outdated)
- ✅ Transport costs are specific (not "around €X")
- ✅ Distances are accurate (check Google Maps)
- ✅ Opening hours are current
- ✅ No generic filler text
- ✅ Tips are genuinely useful

### Red Flags:
- ❌ "Around €20-100" (too vague)
- ❌ "Many attractions" (be specific)
- ❌ "Check local websites" (research and provide info)
- ❌ Remaining [BRACKETS] in content
- ❌ Outdated COVID restrictions

---

## Advanced: Multi-Port Batch

If you want to generate multiple ports at once:

```
Generate cruise port guides for the following ports using the attached template.
Create separate, complete guides for each port.

PORTS:
1. Barcelona, Spain
2. Marseille, France  
3. Rome (Civitavecchia), Italy

For each port:
- Use the exact template format
- Research current 2024/2025 information
- Include specific prices and timings
- Focus on cruise passenger needs

Output each guide separately with clear dividers.
```

---

## After Upload - What Happens

1. Admin parses the markdown file
2. Content is structured and saved to Supabase
3. Port appears in admin with completeness %
4. Set to "draft" initially
5. Review on frontend at `/ports/[slug]`
6. Mark as "published" when ready
7. Google can now index it!

---

## Need Help?

- **Template unclear?** Check `PORT_TEMPLATE_FOR_AI.md` for field descriptions
- **Upload failing?** Check slug format (lowercase, dashes only)
- **Content missing?** AI might need more guidance - be specific
- **Wrong formatting?** Copy template exactly, don't let AI improvise structure

---

**Happy port guide creating!** 🚢
