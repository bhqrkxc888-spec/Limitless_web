/**
 * Bucket List Experience Schema & Validation
 * Defines the structure for rich, SEO-optimized bucket list content
 */

/**
 * @typedef {Object} BucketListSEO
 * @property {string} metaTitle - SEO title (50-60 chars recommended)
 * @property {string} metaDescription - SEO description (150-160 chars recommended)
 * @property {string[]} keywords - SEO keywords
 * @property {string} [ogImage] - Open Graph image URL (optional, falls back to heroImage)
 */

/**
 * @typedef {Object} BucketListHero
 * @property {string} headline - Hero headline (H1)
 * @property {string} subheadline - Hero subheadline
 * @property {string} [heroImage] - Hero image URL (optional, loaded via useImageUrl)
 * @property {Object} ctaPrimary - Primary CTA button
 * @property {string} ctaPrimary.label - Button label
 * @property {string} ctaPrimary.to - Button link
 * @property {Object} [ctaSecondary] - Secondary CTA button (optional)
 * @property {string} ctaSecondary.label - Button label
 * @property {string} ctaSecondary.href - Button link
 */

/**
 * @typedef {Object} BucketListTripFacts
 * @property {string} duration - Trip duration (e.g., "121 nights")
 * @property {string} season - Best season (e.g., "January-May")
 * @property {string[]} [departureAirports] - Departure airports (optional)
 * @property {string[]} highlights - Quick trip highlights (for "At a Glance")
 */

/**
 * @typedef {Object} BucketListKeyInfoRow
 * @property {string} label - Row label
 * @property {string|string[]} value - Row value (string or array for multiple items)
 */

/**
 * @typedef {Object} BucketListNarrativeBlock
 * @property {string} title - Block title (H2 or H3)
 * @property {string} content - Block content (HTML or Markdown)
 * @property {string} [level] - Heading level: 'h2' or 'h3' (default: 'h2')
 */

/**
 * @typedef {Object} BucketListDestinationHighlight
 * @property {string} title - Highlight title
 * @property {string} body - Highlight body text
 * @property {string} [image] - Optional image URL
 * @property {string} [imageAlt] - Image alt text
 */

/**
 * @typedef {Object} BucketListItineraryItem
 * @property {string} day - Day number or range (e.g., "1", "2-3")
 * @property {string} location - Location name
 * @property {string} description - Day description
 * @property {Object} [coordinates] - Optional coordinates for map
 * @property {number} coordinates.lat - Latitude
 * @property {number} coordinates.lon - Longitude
 * @property {string} [type] - Type: 'travel', 'land', 'sea' (optional)
 */

/**
 * @typedef {Object} BucketListFAQ
 * @property {string} question - FAQ question
 * @property {string} answer - FAQ answer
 */

/**
 * @typedef {Object} BucketListExperience
 * @property {string} id - Unique ID
 * @property {string} slug - URL slug
 * @property {string} title - Experience title
 * @property {BucketListSEO} [seo] - SEO metadata (optional, generates from title/description if missing)
 * @property {BucketListHero} [hero] - Hero section (optional, generates from title/tagline if missing)
 * @property {BucketListTripFacts} tripFacts - Trip facts for "At a Glance"
 * @property {BucketListKeyInfoRow[]} [keyInfoTable] - Key info table rows (optional)
 * @property {BucketListNarrativeBlock[]} [narrative] - Long-form narrative blocks (optional)
 * @property {BucketListDestinationHighlight[]} [destinationHighlights] - Destination highlights (optional)
 * @property {BucketListItineraryItem[]} itinerary - Sample itinerary (required, at least 1 item)
 * @property {string[]} [included] - What's included list (optional)
 * @property {string[]} [upgrades] - Available upgrades (optional)
 * @property {string[]} [whoFor] - Who this experience is for (optional)
 * @property {BucketListFAQ[]} [faqs] - FAQs (optional)
 * @property {Object[]} [testimonials] - Testimonials (optional, existing format)
 * @property {string[]} [cruiseLines] - Recommended cruise lines (optional)
 * 
 * LEGACY FIELDS (for backwards compatibility):
 * @property {string} tagline - Legacy tagline (use hero.subheadline instead)
 * @property {string} description - Legacy description (use narrative[0].content instead)
 * @property {string} duration - Legacy duration (use tripFacts.duration instead)
 * @property {string} season - Legacy season (use tripFacts.season instead)
 * @property {string[]} bestFor - Legacy bestFor (use whoFor instead)
 * @property {string[]} highlights - Legacy highlights (use destinationHighlights instead)
 * @property {string[]} includes - Legacy includes (use included instead)
 */

/**
 * Validate a bucket list experience against the schema
 * @param {BucketListExperience} experience - Experience to validate
 * @returns {Object} Validation result with errors and warnings
 */
export function validateBucketListExperience(experience) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!experience.id) errors.push('Missing required field: id');
  if (!experience.slug) errors.push('Missing required field: slug');
  if (!experience.title) errors.push('Missing required field: title');
  
  // lastUpdated is REQUIRED for SEO accuracy
  if (!experience.lastUpdated) {
    errors.push('Missing required field: lastUpdated (ISO date string, e.g., "2026-01-02")');
  } else {
    // Validate ISO date format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(experience.lastUpdated)) {
      errors.push(`Invalid lastUpdated format: "${experience.lastUpdated}". Must be ISO date (YYYY-MM-DD), e.g., "2026-01-02"`);
    } else {
      // Check if it's a valid date
      const date = new Date(experience.lastUpdated);
      if (isNaN(date.getTime())) {
        errors.push(`Invalid lastUpdated date: "${experience.lastUpdated}". Must be a valid date.`);
      }
    }
  }
  
  // Hero image OR fallback image required
  if (!experience.heroImage && !experience.cardImage && !experience.image) {
    warnings.push('Missing hero/card/fallback image - recommend adding heroImage or cardImage for visual appeal');
  }
  
  // Itinerary is required
  if (!experience.itinerary || !Array.isArray(experience.itinerary) || experience.itinerary.length === 0) {
    errors.push('Missing or empty required field: itinerary (at least 1 item required)');
  } else {
    // Validate itinerary items
    let hasDay1 = false;
    let previousDayNum = 0;
    
    experience.itinerary.forEach((item, index) => {
      if (!item.day) warnings.push(`Itinerary item ${index}: missing day`);
      if (!item.location) warnings.push(`Itinerary item ${index}: missing location`);
      if (!item.description) warnings.push(`Itinerary item ${index}: missing description`);
      
      const dayStr = String(item.day || '');
      const dayNumber = dayStr.match(/^\d+/)?.[0];
      const currentDayNum = dayNumber ? parseInt(dayNumber, 10) : null;
      
      // Check for Day 1
      if (dayNumber === '1') {
        hasDay1 = true;
      }
      
      // CRITICAL: Day 0 is NOT allowed - bucket list itineraries MUST start at Day 1
      if (dayNumber === '0') {
        errors.push(`Itinerary item ${index}: Day 0 is NOT allowed. Bucket list itineraries must start at Day 1. Found: "${item.day}" for "${item.location}"`);
      }
      
      // Monotonic day check: days should increase or stay same (for ranges like '7-8')
      // Skip 'At Sea' days and days without numbers
      if (currentDayNum !== null && previousDayNum > 0) {
        if (currentDayNum < previousDayNum) {
          warnings.push(`Itinerary item ${index}: Day ${currentDayNum} comes after Day ${previousDayNum}. Days should increase (monotonic order). Location: "${item.location}"`);
        }
      }
      
      // Update previous day number (for monotonic check)
      if (currentDayNum !== null && currentDayNum > previousDayNum) {
        previousDayNum = currentDayNum;
      }
    });
    
    // Ensure itinerary starts at Day 1
    if (!hasDay1) {
      errors.push('Itinerary must include Day 1 as the first travel day');
    }
  }
  
  // SEO recommendations
  if (!experience.seo && !experience.meta) {
    warnings.push('Missing SEO metadata (seo or meta object) - will generate from title/description');
  } else {
    const seo = experience.seo || experience.meta || {};
    if (seo.metaTitle || seo.title) {
      const title = seo.metaTitle || seo.title;
      if (title.length > 60) warnings.push(`SEO metaTitle too long (${title.length} chars, recommend 50-60)`);
      if (title.length < 30) warnings.push(`SEO metaTitle too short (${title.length} chars, recommend 50-60)`);
    }
    if (seo.metaDescription || seo.description) {
      const desc = seo.metaDescription || seo.description;
      if (desc.length > 160) warnings.push(`SEO metaDescription too long (${desc.length} chars, recommend 150-160)`);
      if (desc.length < 100) warnings.push(`SEO metaDescription too short (${desc.length} chars, recommend 150-160)`);
    }
  }
  
  // Trip facts recommendations
  if (!experience.tripFacts) {
    warnings.push('Missing tripFacts - recommend adding for "At a Glance" section');
  } else {
    if (!experience.tripFacts.duration) warnings.push('Missing tripFacts.duration');
    if (!experience.tripFacts.season) warnings.push('Missing tripFacts.season');
    if (!experience.tripFacts.highlights || experience.tripFacts.highlights.length === 0) {
      warnings.push('Missing tripFacts.highlights - recommend 3-5 quick highlights');
    }
  }
  
  // Content recommendations
  if (!experience.narrative && !experience.description) {
    warnings.push('Missing narrative blocks - recommend adding for rich content');
  }
  
  // Destination Highlights - require at least 2 for SEO richness
  const highlights = experience.destinationHighlights || experience.highlights || [];
  if (highlights.length === 0) {
    warnings.push('Missing destinationHighlights - recommend adding at least 2 for destination details');
  } else if (highlights.length < 2) {
    warnings.push(`Only ${highlights.length} destinationHighlight(s) - recommend at least 2 for rich content (currently: ${highlights.length})`);
  }
  
  if (!experience.included && !experience.includes) {
    warnings.push('Missing included items - recommend adding "What\'s Included"');
  }
  
  // FAQs - require at least 3 for SEO richness and FAQ structured data
  const faqs = experience.faqs || experience.faq || [];
  if (faqs.length === 0) {
    warnings.push('Missing FAQs - recommend adding at least 3 for SEO (FAQ structured data)');
  } else if (faqs.length < 3) {
    warnings.push(`Only ${faqs.length} FAQ(s) - recommend at least 3 for rich FAQ structured data (currently: ${faqs.length})`);
  }
  
  if (!experience.whoFor && !experience.bestFor) {
    warnings.push('Missing whoFor - recommend adding "Who This Is For"');
  }
  
  return { errors, warnings, isValid: errors.length === 0 };
}

/**
 * Validate all bucket list experiences (dev-only)
 * Logs warnings and errors to console
 * @param {BucketListExperience[]} experiences - Array of experiences to validate
 */
export function validateAllBucketListExperiences(experiences) {
  if (!import.meta.env?.DEV) return; // Only in dev mode
  
  console.group('🔍 Bucket List Schema Validation');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  experiences.forEach((experience, index) => {
    const result = validateBucketListExperience(experience);
    
    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.group(`${result.errors.length > 0 ? '❌' : '⚠️'} ${experience.title || `Item ${index}`} (${experience.slug})`);
      
      if (result.errors.length > 0) {
        console.error('Errors:', result.errors);
        totalErrors += result.errors.length;
      }
      
      if (result.warnings.length > 0) {
        console.warn('Warnings:', result.warnings);
        totalWarnings += result.warnings.length;
      }
      
      console.groupEnd();
    }
  });
  
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('✅ All bucket list experiences valid');
  } else {
    console.log(`\n📊 Summary: ${totalErrors} errors, ${totalWarnings} warnings across ${experiences.length} experiences`);
  }
  
  console.groupEnd();
}

/**
 * Get default hero from legacy fields
 * @param {BucketListExperience} experience 
 * @returns {BucketListHero}
 */
export function getHeroFromLegacy(experience) {
  if (experience.hero) return experience.hero;
  
  return {
    headline: experience.title,
    subheadline: experience.tagline || '',
    heroImage: experience.heroImage || null,
    ctaPrimary: {
      label: 'Enquire Now',
      to: '/contact'
    },
    ctaSecondary: experience.phone ? {
      label: `Call ${experience.phone}`,
      href: `tel:${experience.phone}`
    } : null
  };
}

/**
 * Get SEO metadata with fallbacks
 * @param {BucketListExperience} experience 
 * @returns {BucketListSEO}
 */
export function getSEOFromLegacy(experience) {
  if (experience.seo) return experience.seo;
  if (experience.meta) {
    return {
      metaTitle: experience.meta.title,
      metaDescription: experience.meta.description,
      keywords: experience.meta.keywords || [],
      ogImage: experience.meta.ogImage || null
    };
  }
  
  return {
    metaTitle: `${experience.title} | Bucket List Experience`,
    metaDescription: experience.description || experience.tagline || '',
    keywords: [],
    ogImage: null
  };
}

/**
 * Get trip facts with fallbacks
 * @param {BucketListExperience} experience 
 * @returns {BucketListTripFacts}
 */
export function getTripFactsFromLegacy(experience) {
  if (experience.tripFacts) return experience.tripFacts;
  
  return {
    duration: experience.duration || 'Contact for details',
    season: experience.season || 'Year-round',
    departureAirports: experience.departureAirports || [],
    highlights: experience.highlights || []
  };
}

