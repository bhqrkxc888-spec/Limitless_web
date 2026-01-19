import { useState, useRef, useCallback } from 'react';
import { getOptimizedImageUrl, generateSrcSet, isSupabaseUrl } from '../utils/imageHelpers';
import { isVercelBlobUrl } from '../lib/vercelBlob';
import { SITE_ASSETS } from '../config/assetUrls';
import { resolveImageSrc } from '../utils/imageResolver';
import './OptimizedImage.css';

// Fallback placeholder for missing/failed images - uses Limitless Cruises logo
const COMING_SOON_PLACEHOLDER = '/images/placeholders/coming-soon.svg';
const LOGO_URL = SITE_ASSETS.logo;

/**
 * OptimizedImage Component
 * Automatically optimizes images from Vercel Blob or Supabase Storage.
 * Falls back gracefully for external URLs or missing images.
 * 
 * Features:
 * - Vercel Blob: Automatic WebP conversion via Vercel CDN
 * - Supabase Storage: Manual transforms for CMS content
 * - Responsive srcset generation
 * - Proper loading/priority attributes for LCP optimization
 * - Maintains aspect ratio
 * - "Image Coming Soon" fallback for missing images
 * - CSS-only fade-in (bypasses React render cycle for zero flash)
 */
function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  srcsetWidths = [640, 1024, 1920],
  quality = 85,
  objectFit = 'cover',
  style = {},
  showComingSoon = true,
  entityType = 'unknown',
  entityId = 'unknown',
  imageType = 'unknown',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Callback ref - if image is already cached, add 'loaded' class immediately
  // This bypasses React's render cycle for instant display of cached images
  const setImgRef = useCallback((node) => {
    if (node) {
      if (node.complete && node.naturalHeight !== 0) {
        // Cached image - show instantly with no transition
        node.classList.add('loaded', 'no-transition');
      }
      imgRef.current = node;
    }
  }, []);

  // CSS-only load handler - directly add class to DOM, no React state
  // This fires in the same paint frame as the load event
  const handleLoad = (e) => {
    e.target.classList.add('loaded');
    
    // TEMPORARY: Verify transition is working (remove after testing)
    if (import.meta.env.DEV) {
      const computedStyle = window.getComputedStyle(e.target);
      console.log('[OptimizedImage] Transition test:', {
        transition: computedStyle.transition,
        opacity: computedStyle.opacity,
        classes: e.target.className,
        src: e.target.src.substring(0, 80) + '...'
      });
    }
  };
  
  // Resolve image source through universal resolver
  const resolvedSrc = resolveImageSrc(src, {
    entityType,
    entityId,
    imageType,
    fallback: COMING_SOON_PLACEHOLDER,
    silent: true
  });
  
  // Handle image load errors
  const handleError = (e) => {
    if (!hasError && showComingSoon) {
      setHasError(true);
      e.target.src = COMING_SOON_PLACEHOLDER;
      e.target.classList.add('loaded');
    }
  };
  
  // Return placeholder if no valid image
  if (resolvedSrc === COMING_SOON_PLACEHOLDER || !resolvedSrc || resolvedSrc === 'null' || resolvedSrc === 'undefined') {
    if (showComingSoon) {
      return (
        <div 
          className={`optimized-image-placeholder ${className}`}
          style={{ 
            width: width ? `${width}px` : '100%', 
            height: height ? `${height}px` : 'auto',
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            backgroundColor: '#2C344C',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '32px',
            ...style
          }}
          {...props}
        >
          <img 
            src={LOGO_URL} 
            alt="Limitless Cruises" 
            style={{ 
              width: 'auto', 
              height: 'min(80px, 30%)',
              opacity: 0.6,
              objectFit: 'contain'
            }}
            loading="lazy"
          />
          <div style={{ 
            color: '#B9953C', 
            fontSize: '16px', 
            fontWeight: '500',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Image Coming Soon
          </div>
          <div style={{ 
            color: '#8892a8', 
            fontSize: '12px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            High-quality imagery will be added shortly
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className={`optimized-image-placeholder ${className}`}
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          backgroundColor: 'var(--color-gray-100, #f0f0f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
        {...props}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '48px', height: '48px', opacity: 0.3 }}>
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    );
  }

  const isVercelBlob = isVercelBlobUrl(resolvedSrc);
  const isSupabase = isSupabaseUrl(resolvedSrc);
  const maxWidth = width || Math.max(...srcsetWidths);
  
  const optimizedSrc = (isVercelBlob || isSupabase)
    ? getOptimizedImageUrl(resolvedSrc, { width: maxWidth, quality })
    : resolvedSrc;
  
  const srcSet = isSupabase && srcsetWidths.length > 0
    ? generateSrcSet(resolvedSrc, srcsetWidths, { quality })
    : undefined;

  // Generate alt text from src if not provided
  const generateAltFromSrc = (imageSrc) => {
    if (!imageSrc) return 'Image';
    try {
      const url = new URL(imageSrc);
      const filename = url.pathname.split('/').pop() || '';
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      return nameWithoutExt.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim() || 'Image';
    } catch {
      const match = imageSrc.match(/\/([^/]+)\.(webp|jpg|jpeg|png|gif|svg)/i);
      return match ? match[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Image';
    }
  };

  const finalAlt = alt && alt.trim() !== '' ? alt.trim() : generateAltFromSrc(resolvedSrc);

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        ...style
      }}
    >
      <img
        ref={setImgRef}
        className="optimized-image"
        src={hasError ? COMING_SOON_PLACEHOLDER : optimizedSrc}
        srcSet={hasError ? undefined : srcSet}
        sizes={srcSet && !hasError ? sizes : undefined}
        alt={finalAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;
