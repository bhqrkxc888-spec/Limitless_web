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
      megaMenu: true,
      columns: [
        {
          title: 'Search Tools',
          links: [
            { label: 'Cruise Finder', path: '/find-a-cruise', description: 'Search all cruise holidays' },
            { label: 'School Holidays', path: '/school-holiday-cruises', description: 'Family-friendly dates' }
          ]
        },
        {
          title: 'Popular Destinations',
          links: destinations.slice(0, 4).map(d => ({
            label: d.name,
            path: `/destinations/${d.slug}`,
            description: d.tagline
          }))
        },
        {
          title: 'Cruise Types',
          links: categories.map(c => ({
            label: c.name,
            path: `/cruises/${c.slug}`,
            description: c.tagline
          }))
        }
      ]
    },
    {
      id: 'cruise-lines',
      label: 'Cruise Lines',
      path: '/cruise-lines',
      megaMenu: true,
      columns: [
        {
          title: 'Popular Lines',
          links: cruiseLines.filter(cl => cl.featured).slice(0, 6).map(cl => ({
            label: cl.name,
            path: `/cruise-lines/${cl.slug}`,
            description: cl.tagline
          }))
        },
        {
          title: 'Premium & Luxury',
          links: cruiseLines
            .filter(cl => ['premium', 'luxury', 'ultra-luxury', 'contemporary'].includes(cl.category))
            .slice(0, 6)
            .map(cl => ({
              label: cl.name,
              path: `/cruise-lines/${cl.slug}`,
              description: cl.tagline
            }))
        },
        {
          title: 'UK Favourites',
          links: [
            { label: 'P&O Cruises', path: '/cruise-lines/p-and-o-cruises', description: 'Britain\'s favourite' },
            { label: 'Fred. Olsen', path: '/cruise-lines/fred-olsen-cruises', description: 'Small ship cruising' },
            { label: 'Marella Cruises', path: '/cruise-lines/marella-cruises', description: 'All-inclusive value' },
            { label: 'View All Cruise Lines', path: '/cruise-lines', description: 'See our full list', highlight: true }
          ]
        }
      ]
    },
    {
      id: 'about',
      label: 'About',
      path: '/about',
      megaMenu: true,
      columns: [
        {
          title: 'About Us',
          links: [
            { label: 'Personal Cruise Consultant', path: '/about', description: 'Meet Katherine' },
            { label: 'Why Choose Us', path: '/about#why-choose-us', description: 'Our service promise' },
            { label: 'Holiday Elite', path: 'https://www.holidayelite.com', external: true, description: 'Our booking partner' }
          ]
        },
        {
          title: 'Resources',
          links: [
            { label: 'Cruising with SEND', path: '/cruising-with-send', description: 'Accessibility support' },
            { label: 'Make a Payment', path: '/make-a-payment', description: 'Pay for your booking' }
          ]
        }
      ]
    },
    {
      id: 'contact',
      label: 'Contact',
      path: '/contact',
      megaMenu: false
    }
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

