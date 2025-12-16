/**
 * Navigation Data
 * Menu structure for the mega menu
 */

import { cruiseLines } from './cruiseLines';
import { destinations } from './destinations';
import { cruiseTypes } from './cruiseTypes';

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
            },
            {
              label: 'Travel News',
              path: '/travel-news',
              description: 'Latest cruise and travel updates'
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
      ...cruiseLines.slice(0, 8).map(cl => ({
        label: cl.name,
        path: `/cruise-lines/${cl.slug}`
      }))
    ],
    destinations: [
      { label: 'All Destinations', path: '/destinations' },
      // Featured destinations first
      ...destinations.filter(d => d.featured).slice(0, 6).map(d => ({
        label: d.name,
        path: `/destinations/${d.slug}`
      }))
    ],
    cruiseTypes: [
      { label: 'All Cruise Types', path: '/cruise-types' },
      ...cruiseTypes.filter(t => t.featured).slice(0, 5).map(t => ({
        label: t.name,
        path: `/cruise-types#${t.id}`
      }))
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
      { label: 'Travel News', path: '/travel-news' }
    ]
  }
};

export default navigation;
