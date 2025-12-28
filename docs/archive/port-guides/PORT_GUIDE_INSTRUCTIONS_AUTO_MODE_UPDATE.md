# Port Guide Instructions Updated for Auto Mode

**Updated: 28 December 2024**

## Summary

The `PORT_GUIDE_UPDATE_INSTRUCTIONS.md` file has been enhanced specifically for AI agents working in Auto/Agent mode to update port guides efficiently.

## Changes Made

### 1. ✅ Added Quick Start Section
- **TL;DR for agents** - Fast track instructions at the top
- Clear mission statement
- 6-step quick process
- Reference to Barcelona example

### 2. ✅ Enhanced AI Agent Instructions
- Clear task definition
- 8-step process breakdown
- Expected input format examples
- Sample user message format

### 3. ✅ Expanded Critical Rules
- 10 "MUST DO" rules with checkmarks
- 6 "MUST NOT DO" rules with warnings
- Clear formatting requirements
- Emphasis on data-only updates

### 4. ✅ Added Step-by-Step Process
- 6 detailed steps from locate to verify
- Data parsing guidance
- Section-by-section update instructions
- Cleaning and validation steps

### 5. ✅ Enhanced Checklist
- 19 verification points
- Specific checks for syntax
- Content quality checks
- System field protection reminders

### 6. ✅ Added Completion Protocol
- Confirmation message template
- Summary of changes format
- Warning/issue reporting
- Ready for next port workflow

### 7. ✅ Added Quick Reference
- Port regions list with slugs
- Region assignment guidance
- URL structure reference

## Structure Overview

**File:** `PORT_GUIDE_UPDATE_INSTRUCTIONS.md` (565 lines)

**Sections:**
1. Quick Start (TL;DR)
2. AI Agent Instructions
3. Expected Input Format
4. Critical Rules (Must Do / Must Not Do)
5. Step-by-Step Process
6. File Structure
7. Section-by-Section Update Guide (14 sections)
8. Common Mistakes to Avoid
9. Checklist Before Saving
10. Quick Example
11. After Completion Protocol
12. Quick Reference (Regions)

## How It Works

### User Workflow:
1. User gets data from Perplexity using `PERPLEXITY_PORT_GUIDE_PROMPT.md`
2. User switches to **Agent mode**
3. User says: "Update [PORT NAME] with this data: [PASTE DATA]"
4. Agent follows `PORT_GUIDE_UPDATE_INSTRUCTIONS.md`
5. Agent updates `/src/data/ports.js`
6. Agent confirms completion
7. Port guide goes live automatically

### Agent Workflow:
1. Read user's data
2. Open `/src/data/ports.js`
3. Find port by slug
4. Update all 14 sections
5. Clean data (remove symbols, escape apostrophes, British English)
6. Set status to 'published'
7. Update date
8. Verify checklist
9. Save file
10. Confirm to user

## Safety Features

**Protected from changes:**
- `id` field (system identifier)
- `slug` field (URL identifier)
- `region` field (site structure)
- `relatedDestinations` (predefined links)
- JavaScript syntax and structure
- Code logic and functions

**Enforced transformations:**
- Apostrophes → escaped (`\'`)
- Price symbols → removed (£, €, $)
- Emojis → removed (🌊, ⛱️, etc.)
- Em-dashes → "to" (2–3 → 2 to 3)
- American English → British English

## Expected Outcome

**Before update:**
- Port has `status: 'template'`
- Page shows "Full Guide Coming Soon" banner
- Minimal content visible

**After update:**
- Port has `status: 'published'`
- Banner automatically disappears
- Full guide content visible
- SEO updated
- Live at `https://www.limitlesscruises.com/ports/[slug]`

## Testing Recommendations

**To test with an agent:**
1. Use a test port (e.g., Vigo)
2. Provide sample data
3. Verify agent:
   - Finds correct port
   - Updates all sections
   - Cleans data properly
   - Changes status
   - Updates date
   - Confirms completion

**Success criteria:**
- No syntax errors
- All data cleaned
- Status changed
- Date updated
- File saves successfully
- Agent provides confirmation

## Files in Port Guide System

1. **`PERPLEXITY_PORT_GUIDE_PROMPT.md`** - Get data from Perplexity
2. **`PORT_GUIDE_UPDATE_INSTRUCTIONS.md`** - Agent instructions (this file)
3. **`PORT_GUIDE_DATA_TEMPLATE.md`** - Human-readable template reference
4. **`/src/data/ports.js`** - Actual data file to update

## Next Steps

Ready to update ports! The system is now fully documented and agent-ready.

**Priority ports to update:**
1. Southampton (UK home port)
2. Dover (UK home port)
3. Vigo (New - Atlantic Coast)
4. Cádiz (New - Atlantic Coast)
5. Gibraltar (New - Mediterranean)
6. Alicante (New - Mediterranean)
7. Funchal/Madeira (New - Atlantic Islands)
8. Las Palmas/Gran Canaria (New - Atlantic Islands)
9. Málaga (Existing - needs completion)
10. Lisbon (Existing - needs completion)
11. Santa Cruz de Tenerife (Existing - needs completion)
12. Civitavecchia/Rome (Existing - needs completion)

---

**All documentation complete and ready for agent-driven port guide updates!** 🚢

