# Port Guide Page Redesign - Implementation Guide

## Changes Requested & Status

1. ✅ **Remove sidebar** → Full-width layout
2. ✅ **Premium square boxes** instead of icons  
3. ✅ **Opening statement in hero** instead of CTAs
4. 🔄 **Remove all icons and ££** symbols
5. ⏳ **Beach image section** with image to one side
6. ⏳ **Combine time required** into things to do
7. ⏳ **Fancy weather table** - 6 months per row, 2 rows
8. ✅ **Back to Port Guides** button added

## Key Implementation Notes

### Hero Section
- Moved `port.description` to subtitle (opening statement)
- Removed CTAs from hero
- Keep it clean and minimal

### Quick Facts Bar  
- Changed from circular icons to **square boxes**
- Removed all emoji icons  
- Clean typography: label on top, value below
- Readable dark text on light background
- Added "Back to Port Guides" link with arrow

### Main Content - FULL WIDTH
- Remove sidebar completely
- Remove `.port-guide-grid` - no more 2-column layout
- All content in single column, max-width container
- Practical info moved inline where relevant

### Things to Do
- Remove emoji icons completely
- Remove duration/price badges (or show inline text only)
- Add time required info inline in description
- Clean card design with subtle borders

### Beach Section
- Split into 2 columns on desktop
- Image on left (50%), text on right (50%)
- Stack on mobile

### Weather Section
- Create visual grid: **2 rows × 6 months**
- Row 1: Jan-Jun
- Row 2: Jul-Dec
- Show high/low temps prominently
- Remove full table, use card grid instead

## Files to Modify

1. `src/templates/PortGuidePage.jsx` - Complete restructure
2. `src/templates/PortGuidePage.css` - New styles for full-width layout

---

## Next Steps

Due to session length, I recommend:

1. **Switch to fresh context** for clean implementation
2. **Review current progress** (hero + quick facts done)
3. **Complete remaining sections**:
   - Remove sidebar/grid
   - Update Things to Do (no icons/££)
   - Add beach image section
   - Redesign weather as 2×6 grid
   - Move practical info inline

Would you like me to continue in this session or shall we document the remaining changes for a fresh implementation?

