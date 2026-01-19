import { useState, useRef, useCallback } from 'react';
import { Button } from './ui';
import './HeroSection.css';

/**
 * HeroSection Component
 * Full-width hero with background image and overlay
 * Supports responsive images with separate mobile version for performance
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading
 * @param {string} props.subtitle - Subtitle text
 * @param {string} props.image - Background image URL (desktop)
 * @param {string} props.mobileImage - Mobile-optimized image URL (optional, falls back to image)
 * @param {string} props.imageAlt - Alt text for background image
 * @param {Object} props.primaryCta - Primary CTA { label, href, to }
 * @param {Object} props.secondaryCta - Secondary CTA { label, href, to }
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'full'
 * @param {string} props.align - 'left' | 'center'
 */
function HeroSection({
  title,
  subtitle,
  image,
  mobileImage, // Optional: smaller image for mobile (e.g., 800x600)
  imageAlt = 'Hero background',
  primaryCta,
  secondaryCta,
  size = 'lg',
  align = 'left',
  children,
  className = ''
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(null);

  // Use callback ref to catch already-cached images immediately
  const setImgRef = useCallback((node) => {
    if (node) {
      // Check if image is already loaded (cached)
      if (node.complete && node.naturalHeight !== 0) {
        setIsImageLoaded(true);
      }
      imgRef.current = node;
    }
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const classes = [
    'hero',
    `hero-${size}`,
    `hero-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {/* Background Image - uses picture element for mobile optimization */}
      <div className="hero-background">
        {image ? (
          <picture>
            {/* Mobile-optimized image (if provided) - for screens <= 768px */}
            {mobileImage && (
              <source 
                media="(max-width: 768px)" 
                srcSet={mobileImage}
                type="image/webp"
              />
            )}
            {/* Desktop image - priority loading for LCP */}
            <img
              ref={setImgRef}
              src={image}
              alt={imageAlt}
              className="hero-image"
              width={1920}
              height={1080}
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              onLoad={handleImageLoad}
              style={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: '100%',
                opacity: isImageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in'
              }}
            />
          </picture>
        ) : (
          <div className="hero-placeholder" />
        )}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          
          {(primaryCta || secondaryCta) && (
            <div className="hero-cta">
              {primaryCta && (
                <Button 
                  variant="primary"
                  size="lg"
                  href={primaryCta.href}
                  to={primaryCta.to}
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  variant="outline"
                  size="lg"
                  href={secondaryCta.href}
                  to={secondaryCta.to}
                  className="btn-outline-white"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

