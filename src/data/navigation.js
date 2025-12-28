/**
 * Navigation Data
 * Menu structure for the mega menu
 * 
 * PERFORMANCE NOTE: Footer data uses lightweight static arrays instead of 
 * importing full data files (cruiseLines.js is 1248 lines)
 */

export const navigation = {
  // Navigation structure with dropdown menus
  main: [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      megaMenu: false
    },
    {
      id: 'explore',
      label: 'Explore',
      path: '/cruise-lines', // Default link (goes to first item)
      megaMenu: true,
      columns: [
        {
          title: 'Explore',
          links: [
            {
              label: 'Cruise Lines',
              path: '/cruise-lines',
              description: 'Discover cruise lines we work with'
            },
            {
              label: 'Destinations',
              path: '/destinations',
              description: 'Explore cruise destinations worldwide'
            },
            {
              label: 'Cruise Types',
              path: '/cruise-types',
              description: 'Find your perfect cruise style'
            },
            {
              label: 'Bucket List',
              path: '/bucket-list',
              description: 'Once-in-a-lifetime experiences'
            }
          ]
        }
      ]
    },
    {
      id: 'book',
      label: 'Book',
      path: '/offers', // Default link (goes to offers)
      megaMenu: true,
      columns: [
        {
          title: 'Book Your Cruise',
          links: [
            {
              label: 'Latest Offers',
              path: '/offers',
              description: 'Special deals and exclusive offers',
              highlight: true
            },
            {
              label: 'Find a Cruise',
              path: '/find-a-cruise',
              description: 'Search and compare cruises'
            }
          ]
        }
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      path: '/faq', // Default link (goes to FAQ)
      megaMenu: true,
      columns: [
        {
          title: 'Resources',
          links: [
            {
              label: 'FAQ',
              path: '/faq',
              description: 'Frequently asked questions'
            },
            {
              label: 'Travel News',
              path: '/travel-news',
              description: 'Latest cruise and travel updates'
            },
            {
              label: 'Port Guides',
              path: '/ports',
              description: 'Detailed cruise port information'
            },
            {
              label: 'Guides',
              path: '/cruise-guides',
              description: 'Expert guides and travel tips'
            }
          ]
        }
      ]
    },
    {
      id: 'about',
      label: 'About',
      path: '/about',
      megaMenu: false
    },
    {
      id: 'contact',
      label: 'Contact',
      path: '/contact',
      megaMenu: false
    }
  ],
  
  footer: {
    cruiseLines: [
      { label: 'All Cruise Lines', path: '/cruise-lines' },
      { label: 'P&O Cruises', path: '/cruise-lines/p-and-o-cruises' },
      { label: 'MSC Cruises', path: '/cruise-lines/msc-cruises' },
      { label: 'Royal Caribbean', path: '/cruise-lines/royal-caribbean' },
      { label: 'Celebrity Cruises', path: '/cruise-lines/celebrity-cruises' },
      { label: 'Princess Cruises', path: '/cruise-lines/princess-cruises' },
      { label: 'Cunard', path: '/cruise-lines/cunard' },
      { label: 'Viking Ocean', path: '/cruise-lines/viking-ocean-cruises' },
      { label: 'Norwegian Cruise Line', path: '/cruise-lines/norwegian-cruise-line' }
    ],
    destinations: [
      { label: 'All Destinations', path: '/destinations' },
      { label: 'Mediterranean', path: '/destinations/mediterranean-cruises' },
      { label: 'Caribbean', path: '/destinations/caribbean-cruises' },
      { label: 'Norwegian Fjords', path: '/destinations/norwegian-fjords-cruises' },
      { label: 'Canary Islands', path: '/destinations/canary-islands-cruises' },
      { label: 'Alaska', path: '/destinations/alaska-cruises' },
      { label: 'Transatlantic', path: '/destinations/transatlantic-cruises' }
    ],
    cruiseTypes: [
      { label: 'All Cruise Types', path: '/cruise-types' },
      { label: 'Family Cruises', path: '/cruise-types#family' },
      { label: 'Adults Only', path: '/cruise-types#adults-only' },
      { label: 'Luxury Cruises', path: '/cruise-types#luxury' },
      { label: 'UK Sailings', path: '/cruise-types#uk-sailings' },
      { label: 'River Cruises', path: '/cruise-types#river' }
    ],
    legal: [
      { label: 'Booking Terms', path: '/booking-terms' },
      { label: 'Website Terms', path: '/website-terms' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Cookie Policy', path: '/cookie-policy' },
      { label: 'Price Match Guarantee', path: '/price-match-guarantee' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Latest Offers', path: '/offers' },
      { label: 'Find a Cruise', path: '/find-a-cruise' },
      { label: 'Travel News', path: '/travel-news' },
      { label: 'Port Guides', path: '/ports' },
      { label: 'Guides', path: '/cruise-guides' }
    ]
  }
};

export default navigation;
