export const siteConfig = {
  siteName: 'Limitless Cruises',
  siteUrl: 'https://www.limitlesscruises.com', // Canonical site URL for SEO
  tagline: 'Independent Cruise Specialist for UK Sailings & Worldwide Voyages',
  phone: '0114 321 3208',
  whatsapp: '07359 796108',
  whatsappUrl: 'https://wa.me/447359796108', // Keep +44 for URL
  email: 'travel@limitlesscruises.com',
  address: '51 Fairfields Way, Aston, Sheffield, S26 2HB',
  facebook: 'https://www.facebook.com/profile.php?id=61570469572535',
  personalFacebook: 'https://www.facebook.com/profile.php?id=100089180896967',
  linkedin: 'https://www.linkedin.com/company/limitless-cruises/',
  youtube: 'https://www.youtube.com/@LimitlessCruises',
  
  // Financial Protection - Site-wide defaults
  // These are used when an offer doesn't specify its own numbers
  financialProtection: {
    abta: {
      enabled: true,
      number: 'P7541', // Midcounties Co-operative ABTA number
      // Image: Upload to /images/trust-badges/abta-logo.png (recommended: 120x60px, PNG with transparency)
      logo: '/images/trust-badges/abta-logo.png',
    },
    atol: {
      enabled: true,
      number: '', // Add your ATOL number here when available
      // Image: Upload to /images/trust-badges/atol-logo.png (recommended: 120x60px, PNG with transparency)
      logo: '/images/trust-badges/atol-logo.png',
    },
  },
  
  // Monitoring settings
  // Note: errorTracking disabled until log_website_error RPC function is created in Supabase
  // This prevents 404 errors in Lighthouse audits
  // performanceTracking disabled - using Lighthouse instead for performance metrics
  monitoring: {
    enabled: true,
    errorTracking: false,
    performanceTracking: false, // Disabled - using Lighthouse instead
    seoTracking: true
  },
  
  footerLegalText: [
    'Limitless Cruises Ltd when selling travel arrangements is a trading name of The Midcounties Co-operative Ltd. Limitless Cruises Ltd is a Member of Midcounties Co-operative Travel Consortium (ABTA P7541).',
    'Book with Confidence. We are a Member of ABTA which means you have the benefit of ABTA\'s assistance and Code of Conduct. Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme, but ATOL protection does not apply to all holiday and travel services offered. We will confirm which protection applies before you make your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all parts of your trip are not listed on it, those parts will not be ATOL protected. See our booking conditions for details or visit www.caa.co.uk.',
    'Information on this website is provided as a general guide to cruise holidays, based on publicly available data and our own interpretation at the time of writing. While we make every effort to ensure accuracy, itineraries, prices and onboard details can change without notice. Always check directly with the relevant cruise line or travel provider before booking. Learn more about Limitless Cruises.'
  ]
};

