import { useState, useMemo } from 'react';
import { useOffers } from '../hooks/useOffers';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import OfferCard from '../components/OfferCard';
import './OffersPage.css';

const OFFER_TYPES = [
  { value: null, label: 'All Offers' },
  { value: 'cruise_only', label: 'Cruise Only' },
  { value: 'fly_cruise', label: 'Fly-Cruise' },
  { value: 'bucket_list', label: 'Bucket List' },
  { value: 'special_offer', label: 'Special Offers' }
];

const DESTINATIONS = [
  { value: null, label: 'All Destinations' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Caribbean', label: 'Caribbean' },
  { value: 'Northern Europe', label: 'Northern Europe' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Australia', label: 'Australia & Pacific' },
  { value: 'World', label: 'World Cruises' }
];

function OffersPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch featured offer for hero
  const { offers: featuredOffers, loading: featuredLoading } = useOffers({
    limit: 1,
    featured: true
  });

  // Fetch main offers list
  const { offers, loading, error } = useOffers({
    limit: 50, // Fetch more and filter client-side for search
    offerType: selectedType,
    destination: selectedDestination
  });

  // Filter offers based on search query
  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return offers;
    
    const query = searchQuery.toLowerCase();
    return offers.filter(offer => 
      offer.title?.toLowerCase().includes(query) ||
      offer.short_description?.toLowerCase().includes(query) ||
      offer.cruise_line_name?.toLowerCase().includes(query) ||
      offer.ship_name?.toLowerCase().includes(query) ||
      offer.destination?.toLowerCase().includes(query) ||
      offer.departure_port?.toLowerCase().includes(query)
    );
  }, [offers, searchQuery]);

  // Paginate filtered offers
  const paginatedOffers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOffers.slice(start, start + itemsPerPage);
  }, [filteredOffers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  
  // Get hero offer (first featured, or first offer)
  const heroOffer = featuredOffers[0];
  
  // Filter out hero offer from grid if it's the same
  const gridOffers = heroOffer 
    ? paginatedOffers.filter(offer => offer.id !== heroOffer.id)
    : paginatedOffers;

  const isLoading = loading || featuredLoading;

  // Handle filter changes
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedDestination(null);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedType || selectedDestination || searchQuery;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Offers & Deals',
    description: 'Browse our latest cruise offers and special deals. Find your perfect cruise holiday with exclusive pricing and expert booking advice.',
    url: 'https://limitlesscruises.com/offers',
    numberOfItems: filteredOffers.length,
    itemListElement: filteredOffers.slice(0, 10).map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: offer.title,
        description: offer.short_description || offer.full_description,
        url: `https://limitlesscruises.com/offers/${offer.slug}`,
        image: offer.hero_image_url || offer.card_image_url,
        offers: {
          '@type': 'Offer',
          price: offer.price_from,
          priceCurrency: offer.currency || 'GBP',
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <main className="offers-page">
      {/* SEO */}
      <SEO
        title="Cruise Offers & Deals | Exclusive Cruise Packages"
        description="Discover exclusive cruise deals and special offers. From Mediterranean escapes to Caribbean adventures, find your perfect cruise at unbeatable prices with expert booking advice."
        canonical="https://limitlesscruises.com/offers"
        keywords="cruise offers, cruise deals, cheap cruises, cruise specials, cruise discounts, fly cruise deals, Caribbean cruises, Mediterranean cruises"
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section className="offers-page-header">
        <div className="container">
          <div className="offers-page-header__content">
            <span className="offers-page-header__eyebrow">Exclusive Deals</span>
            <h1 className="offers-page-header__title">Cruise Offers</h1>
            <p className="offers-page-header__subtitle">
              Hand-picked cruise deals and exclusive packages. Expert advice, unbeatable prices, 
              and personal service on every booking.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="offers-filter-section">
        <div className="container">
          {/* Search Bar */}
          <div className="offers-search-bar">
            <div className="offers-search-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="offers-search-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder="Search offers by cruise line, destination, ship..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="offers-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="offers-search-clear"
                  aria-label="Clear search"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="offers-filter-row">
            <div className="offers-filter-group">
              <span className="offers-filter-label">Type:</span>
              <div className="offers-filter-pills">
                {OFFER_TYPES.map((type) => (
                  <button
                    key={type.value || 'all'}
                    className={`offers-filter-pill ${selectedType === type.value ? 'offers-filter-pill--active' : ''}`}
                    onClick={() => handleTypeChange(type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="offers-filter-row">
            <div className="offers-filter-group">
              <span className="offers-filter-label">Destination:</span>
              <div className="offers-filter-pills">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest.value || 'all'}
                    className={`offers-filter-pill ${selectedDestination === dest.value ? 'offers-filter-pill--active' : ''}`}
                    onClick={() => handleDestinationChange(dest.value)}
                  >
                    {dest.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="offers-filter-actions">
              <button onClick={clearFilters} className="offers-clear-filters">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear All Filters
              </button>
              <span className="offers-results-count">
                {filteredOffers.length} offer{filteredOffers.length !== 1 ? 's' : ''} found
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="section">
          <div className="container">
            <div className="offers-loading">
              <div className="offers-loading__spinner"></div>
              <p>Finding the best offers for you...</p>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <section className="section">
          <div className="container">
            <div className="offers-error">
              <div className="offers-error__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3>Unable to Load Offers</h3>
              <p>Sorry, we couldn't load the offers at this time. Please try again later or contact us directly for the latest deals.</p>
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredOffers.length === 0 && (
        <section className="section">
          <div className="container">
            <div className="offers-empty">
              <div className="offers-empty__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 9 6 6"/>
                  <path d="m15 9-6 6"/>
                </svg>
              </div>
              <h3>No Offers Found</h3>
              <p>
                {hasActiveFilters 
                  ? `No offers match your current filters. Try adjusting your search or browse all offers.`
                  : `No offers are currently available. Check back soon or contact us for the latest deals.`
                }
              </p>
              <div className="offers-empty__actions">
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
                <Button to="/contact" variant="primary">
                  Contact Us for Deals
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Hero Offer */}
      {!isLoading && !error && heroOffer && currentPage === 1 && !hasActiveFilters && (
        <section className="offers-hero-section">
          <div className="container">
            <div className="offers-hero-label">
              <span>Featured Offer</span>
            </div>
            <OfferCard offer={heroOffer} variant="hero" />
          </div>
        </section>
      )}

      {/* Offers Grid */}
      {!isLoading && !error && filteredOffers.length > 0 && (
        <section className="section offers-grid-section">
          <div className="container">
            <SectionHeader
              eyebrow={hasActiveFilters ? "Filtered Results" : "All Available Offers"}
              title={selectedType ? OFFER_TYPES.find(t => t.value === selectedType)?.label : "Browse All Offers"}
              subtitle={`${filteredOffers.length} offer${filteredOffers.length !== 1 ? 's' : ''} available. Prices subject to availability.`}
            />

            {/* Demo notice for placeholder offers */}
            {offers[0]?.is_demo && (
              <div className="offers-demo-notice">
                <p>
                  <strong>Sample offers shown.</strong> These are example offers to demonstrate our service. 
                  Contact us for current availability and pricing.
                </p>
              </div>
            )}

            <div className="offers-list">
              {(hasActiveFilters || currentPage > 1 ? paginatedOffers : gridOffers).map((offer) => (
                <OfferCard key={offer.id} offer={offer} variant="horizontal" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="offers-pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="offers-pagination__btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  Previous
                </Button>
                
                <div className="offers-pagination__pages">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        className={`offers-pagination__page ${currentPage === pageNum ? 'offers-pagination__page--active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="offers-pagination__btn"
                >
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section section-dark offers-cta-section">
        <div className="container text-center">
          <h2>Can't Find What You're Looking For?</h2>
          <p>
            Your expert cruise consultant can help you find the perfect cruise, even if it's not listed here.
            Get personalised recommendations and exclusive deals tailored to your preferences.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
              Enquire Online
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OffersPage;
