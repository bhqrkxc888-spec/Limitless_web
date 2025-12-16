/**
 * Cruise Destinations Configuration
 * 
 * Hero images are stored as: destinations/{slug}-HERO.jpg
 * Example: destinations/caribbean-HERO.jpg
 */

export const destinations = [
  {
    id: 1,
    slug: 'caribbean',
    name: 'Caribbean',
    heroFilename: 'caribbean-HERO.jpg',
    description: 'Turquoise waters, white sand beaches, tropical paradise'
  },
  {
    id: 2,
    slug: 'mediterranean',
    name: 'Mediterranean',
    heroFilename: 'mediterranean-HERO.jpg',
    description: 'Ancient history, stunning coastlines, vibrant cultures'
  },
  {
    id: 3,
    slug: 'alaska',
    name: 'Alaska',
    heroFilename: 'alaska-HERO.jpg',
    description: 'Glaciers, wildlife, breathtaking wilderness'
  },
  {
    id: 4,
    slug: 'norway',
    name: 'Norway & Norwegian Fjords',
    heroFilename: 'norway-HERO.jpg',
    description: 'Dramatic fjords, Northern Lights, stunning landscapes'
  },
  {
    id: 5,
    slug: 'baltic',
    name: 'Baltic',
    heroFilename: 'baltic-HERO.jpg',
    description: 'Historic cities, cultural capitals, Northern Europe'
  },
  {
    id: 6,
    slug: 'british-isles',
    name: 'British Isles',
    heroFilename: 'british-isles-HERO.jpg',
    description: 'Scotland, Ireland, England, Wales heritage'
  },
  {
    id: 7,
    slug: 'canary-islands',
    name: 'Canary Islands',
    heroFilename: 'canary-islands-HERO.jpg',
    description: 'Year-round sunshine, volcanic landscapes, beaches'
  },
  {
    id: 8,
    slug: 'greek-islands',
    name: 'Greek Islands',
    heroFilename: 'greek-islands-HERO.jpg',
    description: 'Santorini, Mykonos, ancient ruins, azure seas'
  },
  {
    id: 9,
    slug: 'adriatic',
    name: 'Adriatic',
    heroFilename: 'adriatic-HERO.jpg',
    description: 'Croatia, Venice, Dalmatian Coast'
  },
  {
    id: 10,
    slug: 'transatlantic',
    name: 'Transatlantic',
    heroFilename: 'transatlantic-HERO.jpg',
    description: 'Cross-ocean voyages, relaxation at sea'
  },
  {
    id: 11,
    slug: 'iceland',
    name: 'Iceland',
    heroFilename: 'iceland-HERO.jpg',
    description: 'Geysers, waterfalls, volcanic landscapes'
  },
  {
    id: 12,
    slug: 'antarctica',
    name: 'Antarctica',
    heroFilename: 'antarctica-HERO.jpg',
    description: 'Penguins, icebergs, pristine wilderness'
  },
  {
    id: 13,
    slug: 'south-america',
    name: 'South America',
    heroFilename: 'south-america-HERO.jpg',
    description: 'Amazon, Patagonia, vibrant cultures'
  },
  {
    id: 14,
    slug: 'hawaii',
    name: 'Hawaii',
    heroFilename: 'hawaii-HERO.jpg',
    description: 'Aloha spirit, volcanoes, tropical paradise'
  },
  {
    id: 15,
    slug: 'asia',
    name: 'Asia',
    heroFilename: 'asia-HERO.jpg',
    description: 'Southeast Asia, exotic ports, ancient temples'
  },
  {
    id: 16,
    slug: 'japan',
    name: 'Japan',
    heroFilename: 'japan-HERO.jpg',
    description: 'Cherry blossoms, Mount Fuji, modern meets tradition'
  },
  {
    id: 17,
    slug: 'australia-new-zealand',
    name: 'Australia & New Zealand',
    heroFilename: 'australia-new-zealand-HERO.jpg',
    description: 'Great Barrier Reef, Sydney, Auckland, stunning nature'
  },
  {
    id: 18,
    slug: 'dubai-middle-east',
    name: 'Dubai & Middle East',
    heroFilename: 'dubai-middle-east-HERO.jpg',
    description: 'Modern luxury, Arabian Gulf, exotic destinations'
  },
  {
    id: 19,
    slug: 'panama-canal',
    name: 'Panama Canal',
    heroFilename: 'panama-canal-HERO.jpg',
    description: 'Engineering marvel, Pacific to Atlantic'
  },
  {
    id: 20,
    slug: 'canada-new-england',
    name: 'Canada & New England',
    heroFilename: 'canada-new-england-HERO.jpg',
    description: 'Fall foliage, Quebec, maritime charm'
  },
  {
    id: 21,
    slug: 'northern-europe',
    name: 'Northern Europe',
    heroFilename: 'northern-europe-HERO.jpg',
    description: 'Scandinavia, Arctic Circle, midnight sun'
  },
  {
    id: 22,
    slug: 'atlantic-islands',
    name: 'Atlantic Islands',
    heroFilename: 'atlantic-islands-HERO.jpg',
    description: 'Azores, Madeira, Cape Verde, island hopping'
  },
  {
    id: 23,
    slug: 'africa',
    name: 'Africa',
    heroFilename: 'africa-HERO.jpg',
    description: 'Cape Town, safaris, exotic coastlines'
  },
  {
    id: 24,
    slug: 'western-mediterranean',
    name: 'Western Mediterranean',
    heroFilename: 'western-mediterranean-HERO.jpg',
    description: 'Spain, France, Italy, Riviera glamour'
  },
  {
    id: 25,
    slug: 'eastern-mediterranean',
    name: 'Eastern Mediterranean',
    heroFilename: 'eastern-mediterranean-HERO.jpg',
    description: 'Turkey, Israel, Cyprus, ancient history'
  },
  {
    id: 26,
    slug: 'pacific-islands',
    name: 'Pacific Islands',
    heroFilename: 'pacific-islands-HERO.jpg',
    description: 'Tahiti, Fiji, Bora Bora, South Pacific paradise'
  },
  {
    id: 27,
    slug: 'world-cruise',
    name: 'World Cruise',
    heroFilename: 'world-cruise-HERO.jpg',
    description: 'Ultimate voyage, multiple continents, bucket list'
  },
  {
    id: 28,
    slug: 'bermuda',
    name: 'Bermuda',
    heroFilename: 'bermuda-HERO.jpg',
    description: 'Pink sand beaches, British charm, crystal waters'
  },
  {
    id: 29,
    slug: 'black-sea',
    name: 'Black Sea',
    heroFilename: 'black-sea-HERO.jpg',
    description: 'Ukraine, Bulgaria, Turkey, ancient ports'
  },
  {
    id: 30,
    slug: 'mexico',
    name: 'Mexico',
    heroFilename: 'mexico-HERO.jpg',
    description: 'Mayan ruins, beaches, vibrant culture'
  }
];

/**
 * Get destination by slug
 * @param {string} slug - Destination slug
 * @returns {object|null} Destination object or null
 */
export function getDestinationBySlug(slug) {
  if (!slug) return null;
  return destinations.find(d => d.slug === slug.toLowerCase()) || null;
}

/**
 * Get hero image URL for destination
 * @param {string} destinationSlug - Destination slug
 * @returns {string} Hero image URL
 */
export function getDestinationHeroUrl(destinationSlug) {
  if (!destinationSlug) return null;
  return `destinations/${destinationSlug}-HERO.jpg`;
}

/**
 * Get all destination slugs
 * @returns {string[]} Array of destination slugs
 */
export function getAllDestinationSlugs() {
  return destinations.map(d => d.slug);
}

/**
 * Get destinations grouped by region (for admin UI)
 * @returns {object} Destinations grouped by region
 */
export function getDestinationsByRegion() {
  return {
    'Europe': destinations.filter(d => 
      ['mediterranean', 'baltic', 'british-isles', 'greece-islands', 'adriatic', 
       'iceland', 'northern-europe', 'western-mediterranean', 'eastern-mediterranean',
       'black-sea', 'norway', 'canary-islands'].includes(d.slug)
    ),
    'Caribbean & Americas': destinations.filter(d => 
      ['caribbean', 'bermuda', 'mexico', 'south-america', 'panama-canal', 
       'canada-new-england', 'hawaii'].includes(d.slug)
    ),
    'Asia & Pacific': destinations.filter(d => 
      ['asia', 'japan', 'australia-new-zealand', 'pacific-islands', 'dubai-middle-east'].includes(d.slug)
    ),
    'Polar & Adventure': destinations.filter(d => 
      ['alaska', 'antarctica', 'iceland'].includes(d.slug)
    ),
    'Other': destinations.filter(d => 
      ['transatlantic', 'world-cruise', 'atlantic-islands', 'africa'].includes(d.slug)
    )
  };
}

export default destinations;

