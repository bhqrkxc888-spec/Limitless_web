/**
 * Image Carousel Component for Port Guides
 * 
 * Features:
 * - 3-column grid layout (responsive: 1 on mobile, 2 on tablet, 3 on desktop)
 * - Fade transition effect between image sets
 * - Auto-scroll with configurable interval
 * - Manual navigation with arrow buttons
 * - Touch/swipe support for mobile
 * - Clickable images that open in lightbox
 * 
 * Usage:
 * <ImageCarousel 
 *   images={[{url, alt, title}, ...]}
 *   autoScroll={true}
 *   interval={5000}
 *   onImageClick={(image) => openLightbox(image)}
 * />
 */

import { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ 
  images = [], 
  autoScroll = true, 
  interval = 5000,
  onImageClick = null,
  className = ''
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoScrollTimer = useRef(null);

  // Responsive columns: 1 on mobile, 2 on tablet, 3 on desktop
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages based on images and columns
  const totalPages = Math.ceil(images.length / columns);
  const hasMultiplePages = totalPages > 1;

  // Get images for current page
  const getCurrentPageImages = () => {
    const startIndex = currentPage * columns;
    return images.slice(startIndex, startIndex + columns);
  };

  // Navigation handlers
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || !hasMultiplePages || isPaused) {
      return;
    }

    autoScrollTimer.current = setInterval(() => {
      goToNext();
    }, interval);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [autoScroll, interval, hasMultiplePages, isPaused, currentPage]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    
    // Resume auto-scroll after 2 seconds
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle image click
  const handleImageClick = (image) => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  const currentImages = getCurrentPageImages();

  return (
    <div 
      className={`port-image-carousel ${className}`}
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation arrows (only show if multiple pages) */}
      {hasMultiplePages && (
        <>
          <button
            className="carousel-nav carousel-prev"
            onClick={goToPrev}
            disabled={isTransitioning}
            aria-label="Previous images"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            className="carousel-nav carousel-next"
            onClick={goToNext}
            disabled={isTransitioning}
            aria-label="Next images"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}

      {/* Image grid with fade transition */}
      <div 
        className={`carousel-grid carousel-grid-${columns} ${isTransitioning ? 'fade-out' : 'fade-in'}`}
      >
        {currentImages.map((image, index) => (
          <div 
            key={`${currentPage}-${index}`}
            className={`carousel-image-wrapper ${onImageClick ? 'clickable' : ''}`}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.url}
              alt={image.alt || 'Port guide image'}
              title={image.title || image.alt}
              loading="lazy"
              className="carousel-image"
            />
            {image.title && (
              <div className="image-caption">{image.title}</div>
            )}
          </div>
        ))}
      </div>

      {/* Page indicators (dots) */}
      {hasMultiplePages && (
        <div className="carousel-indicators">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentPage ? 'active' : ''}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentPage(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
