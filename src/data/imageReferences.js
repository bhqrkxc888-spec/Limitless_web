/**
 * Image References - Centralized Image URL Management
 * 
 * ⚠️ IMPORTANT: This file is being phased out in favor of the Admin Asset Manager.
 * New images should be uploaded via: Admin → Website → Assets
 * 
 * Images are now stored in web.site_assets (Supabase) with URLs on Vercel Blob.
 * Use the helper functions in utils/assetHelpers.js for fetching images.
 * 
 * This file remains for backward compatibility and as a reference for what images exist.
 */

// Currently uploaded images (Vercel Blob)
export const imageReferences = {
  
  // ====================
  // SITE-WIDE IMAGES
  // ====================
  site: {
    // ✅ Uploaded - manage via Admin → Website → Assets → Site
    favicon: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/favicon.webp',
    heroHome: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/home/hero.webp',
    logo: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/Hero-logo.webp',
    // 📷 Upload via Admin: Social share image (1200x630px)
    ogImage: null,
  },

  // ====================
  // CRUISE LINES
  // Images managed via Admin → Website → Assets → Cruise Lines
  // ====================
  cruiseLines: {
    // Upload all cruise line images via the Admin Asset Manager
    // Required: logo (transparent PNG/SVG), card (16:9), hero (16:9)
  },

  // ====================
  // DESTINATIONS
  // Images managed via Admin → Website → Assets → Destinations
  // ====================
  destinations: {
    // Upload all destination hero images via the Admin Asset Manager
    // Required: hero image (16:9, 1920x1080 recommended)
  },

  // ====================
  // BUCKET LIST EXPERIENCES
  // Some images uploaded, others pending
  // ====================
  bucketList: {
    worldCruise: {
      hero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/Worldcruise/worldcruise.webp',
      card: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/Worldcruise/worldcruise.webp',
    },
    antarctica: {
      hero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/antarctica/antarctica-hero.webp',
      card: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/antarctica/antarctica-hero.webp',
    },
    galapagos: {
      hero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/galapagos/galapagos-hero.webp',
      card: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/galapagos/galapagos-hero.webp',
    },
    northernLights: {
      hero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/Fjords/northernlights-hero.webp',
      card: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/Fjords/northernlights-hero.webp',
    },
  },

  // ====================
  // ABOUT PAGE
  // ✅ All uploaded
  // ====================
  about: {
    katherine1: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About1.webp',
    katherine2: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About2.webp',
    katherine3: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About3.webp',
    holidayEliteLogo: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/HolidayEliteLogo.png'
  }
};

/**
 * Get image URL by reference path
 * @deprecated Use getAssetUrl from utils/assetHelpers.js instead
 * @param {string} path - Dot notation path (e.g., 'site.heroHome')
 * @param {string} fallback - Fallback URL or placeholder
 * @returns {string} Image URL or fallback
 */
export function getImageByRef(path, fallback = null) {
  const keys = path.split('.');
  let value = imageReferences;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Image reference not found: ${path}`);
      return fallback;
    }
  }
  
  // If value is null or empty, return fallback
  if (!value) {
    return fallback;
  }
  
  return value;
}

/**
 * Check if image reference is ready (has a valid URL)
 * @deprecated Use getAssetUrl from utils/assetHelpers.js instead
 * @param {string} path - Dot notation path
 * @returns {boolean}
 */
export function isImageReady(path) {
  const url = getImageByRef(path);
  return typeof url === 'string' && 
         url !== null && 
         (url.includes('vercel-storage.com') || url.includes('blob.vercel-storage.com') || url.includes('supabase.co'));
}

export default imageReferences;
