import { useOffers } from '../hooks/useOffers';
import { Button, SectionHeader } from './ui';
import OfferCard from './OfferCard';
import { useState, useEffect } from 'react';
import './FeaturedOffers.css';

function FeaturedOffers() {
  const { offers, loading, error } = useOffers({ 
    limit: 4, 
    featured: true 
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setItemsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, offers.length - itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleOffers = offers.slice(currentIndex, currentIndex + itemsToShow);

  // Don't render if no offers or if there's an error (function not set up yet)
  if (!loading && (offers.length === 0 || error)) {
    return null;
  }

  return (
    <section className="featured-offers">
      <div className="container">
        <SectionHeader
          eyebrow="Latest Offers"
          title="Special Cruise Deals"
          subtitle="Exclusive offers and special deals. Book now to secure these limited-time prices."
        />

        {loading && (
          <div className="featured-offers-loading">
            <p>Loading offers...</p>
          </div>
        )}

        {!loading && offers.length > 0 && (
          <>
            <div className="featured-offers-carousel-wrapper">
              {offers.length > itemsToShow && (
                <button
                  className="featured-offers-nav featured-offers-prev"
                  onClick={goToPrev}
                  aria-label="Previous offers"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
              )}

              <div className="featured-offers-grid">
                {visibleOffers.map((offer, index) => (
                  <OfferCard 
                    key={offer.id} 
                    offer={offer} 
                    variant="featured"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>

              {offers.length > itemsToShow && (
                <button
                  className="featured-offers-nav featured-offers-next"
                  onClick={goToNext}
                  aria-label="Next offers"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              )}
            </div>

            <div className="featured-offers-cta">
              <Button to="/offers" variant="outline" size="lg">
                View All Offers
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedOffers;

