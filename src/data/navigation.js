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
  // Navigation for local development and testing
  // Includes all main pages for full site structure
  main: [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      megaMenu: false
    },
    {
      id: 'cruise-lines',
      label: 'Cruise Lines',
      path: '/cruise-lines',
      megaMenu: false  // Can be enabled with dropdown later
    },
    {
      id: 'destinations',
      label: 'Destinations',
      path: '/destinations',
      megaMenu: false  // Can be enabled with dropdown later
    },
    {
      id: 'bucket-list',
      label: 'Bucket List',
      path: '/bucket-list',
      megaMenu: false
    },
    {
      id: 'find-cruise',
      label: 'Find a Cruise',
      path: '/find-a-cruise',
      megaMenu: false
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
      { label: 'Find a Cruise', path: '/find-a-cruise' },
      { label: 'Bucket List Experiences', path: '/bucket-list' }
    ]
  }
};

export default navigation;
