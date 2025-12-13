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
  // PHASE 1: Simplified main navigation (coming soon period)
  // Only showing essential pages during site upgrade
  main: [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      megaMenu: false
    },
    {
      id: 'find-cruise',
      label: 'Find a Cruise',
      path: '/find-a-cruise',
      megaMenu: false  // Simplified - no dropdown during coming soon period
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
    
    // TODO: Restore full navigation after launch:
    // - Cruise Lines dropdown with mega menu
    // - Destinations will be accessible via cruise lines pages
  ],
  
  footer: {
    cruiseLines: cruiseLines.slice(0, 8).map(cl => ({
      label: cl.name,
      path: `/cruise-lines/${cl.slug}`
    })),
    destinations: destinations.map(d => ({
      label: d.name,
      path: `/destinations/${d.slug}`
    })),
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
      { label: 'Find a Cruise', path: '/find-a-cruise' }
    ]
  }
};

export default navigation;
