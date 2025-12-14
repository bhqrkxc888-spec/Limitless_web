/**
 * Navigation Data
 * Menu structure for the mega menu
 */

import { cruiseLines } from './cruiseLines';
import { destinations } from './destinations';
import { categories } from './categories';

// Get cruise lines grouped by category for mega menu
const getCruiseLinesByCategory = () => {
  const mainstream = cruiseLines.filter(cl => cl.category === 'mainstream');
  const premium = cruiseLines.filter(cl => cl.category === 'premium' || cl.category === 'contemporary');
  const luxury = cruiseLines.filter(cl => cl.category === 'luxury' || cl.category === 'ultra-luxury' || cl.category === 'expedition');
  const traditional = cruiseLines.filter(cl => cl.category === 'traditional');
  
  return { mainstream, premium, luxury, traditional };
};

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
      ...destinations.map(d => ({
        label: d.name,
        path: `/destinations/${d.slug}`
      }))
    ],
    categories: categories.map(c => ({
      label: c.name,
      path: `/cruises/${c.slug}`
    })),
    legal: [
      { label: 'Booking Terms', path: '/booking-terms' },
      { label: 'Website Terms', path: '/website-terms' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Cookie Policy', path: '/cookie-policy' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Latest Offers', path: '/offers' },
      { label: 'Find a Cruise', path: '/find-a-cruise' },
      { label: 'Bucket List Experiences', path: '/bucket-list' }
    ]
  }
};

export default navigation;
