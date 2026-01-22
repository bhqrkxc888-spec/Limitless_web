import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOffers } from '../hooks/useOffers';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import OfferCard from '../components/OfferCard';
import '../styles/page-header.css';
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
  { value: 'North America', label: 'North America' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Australia', label: 'Australia & Pacific' },
  { value: 'World', label: 'World Cruises' }
];

function OffersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  
  // Get page from URL, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Update URL when page changes
  const setCurrentPage = (pageOrUpdater) => {
    const newPage = typeof pageOrUpdater === 'function' ? pageOrUpdater(currentPage) : pageOrUpdater;
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', newPage.toString());
    }
    setSearchParams(searchParams);
  };
  
  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      searchParams.delete('page');
      setSearchParams(searchParams, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, selectedDestination, searchQuery]);

  // Fetch all offers (sorted by latest first)
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

  const isLoading = loading;

  // Handle filter changes
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSearchQuery('');
  };

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedDestination(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedType || selectedDestination || searchQuery;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Offers & Deals',
    description: 'Browse our latest cruise offers and special deals. Find your perfect cruise holiday with exclusive pricing and expert booking advice.',
    url: 'https://www.limitlesscruises.com/offers',
    numberOfItems: filteredOffers.length,
    itemListElement: filteredOffers.slice(0, 10).map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: offer.title,
        description: offer.short_description || offer.full_description,
        url: `https://www.limitlesscruises.com/offers/${offer.slug}`,
        image: offer.card_image_url,
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
        title="Exclusive Cruise Offers | Hand-Selected Deals | UK Consultant"
        description="Hand-selected cruise offers and exclusive deals. Expertly curated by your personal consultant. ABTA protected bookings."
        canonical={currentPage > 1 ? `https://www.limitlesscruises.com/offers?page=${currentPage}` : undefined}
        keywords="cruise offers, cruise deals, exclusive cruise packages, cruise specials, UK cruise consultant, ABTA protected cruises"
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section className="standard-page-header">
        <div className="container">
          <h1>Cruise Offers</h1>
          <p>
            Hand-selected cruise deals and exclusive packages, updated regularly.
          </p>
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
                id="offers-search"
                name="offers-search"
                placeholder="Search offers by cruise line, destination, ship..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="offers-search-input"
                aria-label="Search cruise offers"
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

      {/* Offers Grid */}
      {!isLoading && !error && filteredOffers.length > 0 && (
        <section className="section offers-grid-section">
          <div className="container">
            <SectionHeader
              eyebrow={hasActiveFilters ? "Filtered Results" : "Latest Offers"}
              title={selectedType ? OFFER_TYPES.find(t => t.value === selectedType)?.label : "All Cruise Offers"}
              subtitle={`${filteredOffers.length} offer${filteredOffers.length !== 1 ? 's' : ''} available. Showing latest first. Prices subject to availability.`}
            />

            <div className="offers-list">
              {paginatedOffers.map((offer) => (
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
