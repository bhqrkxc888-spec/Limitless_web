/**
 * Page Heroes Configuration
 * Hero images for main section/listing pages
 * 
 * These are the hero images for the main category/listing pages like:
 * - /destinations (Destinations listing page)
 * - /cruise-types (Cruise Types listing page)  
 * - /bucket-list (Bucket List listing page)
 * 
 * Upload path: WEB_page-heroes/{slug}/hero.webp
 * Recommended size: 1920x400px (narrower than full page heroes)
 */

export const pageHeroes = [
  {
    id: 'destinations',
    slug: 'destinations',
    name: 'Destinations Page',
    heroFilename: 'hero.webp',
    description: 'Hero image for the cruise destinations listing page at /destinations'
  },
  {
    id: 'cruise-types',
    slug: 'cruise-types',
    name: 'Cruise Types Page',
    heroFilename: 'hero.webp',
    description: 'Hero image for the cruise types listing page at /cruise-types'
  },
  {
    id: 'bucket-list',
    slug: 'bucket-list',
    name: 'Bucket List Page',
    heroFilename: 'hero.webp',
    description: 'Hero image for the bucket list experiences listing page at /bucket-list'
  }
];

/**
 * Get page hero by slug
 */
export function getPageHeroBySlug(slug) {
  return pageHeroes.find(h => h.slug === slug);
}

/**
 * Get all page heroes
 */
export function getAllPageHeroes() {
  return pageHeroes;
}

export default pageHeroes;
