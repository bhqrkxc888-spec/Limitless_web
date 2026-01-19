import { useState, useRef, useCallback } from 'react';
import { getOptimizedImageUrl, generateSrcSet, isSupabaseUrl } from '../utils/imageHelpers';
import { isVercelBlobUrl } from '../lib/vercelBlob';
import { SITE_ASSETS } from '../config/assetUrls';
import { resolveImageSrc } from '../utils/imageResolver';

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
 * 
 * @param {string} src - Original image URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {number} width - Intrinsic width (for aspect ratio calculation)
 * @param {number} height - Intrinsic height (for aspect ratio calculation)
 * @param {boolean} priority - If true, uses eager loading and high fetch priority (for LCP images)
 * @param {string} className - Additional CSS classes
 * @param {string} sizes - Sizes attribute for responsive images (default: '100vw')
 * @param {number[]} srcsetWidths - Widths to generate for srcset (default: [640, 1024, 1920])
 * @param {number} quality - Image quality 1-100 (default: 85)
 * @param {string} objectFit - CSS object-fit value (default: 'cover')
 * @param {boolean} showComingSoon - If true, shows "Coming Soon" placeholder when no image (default: true)
 * @param {string} entityType - Entity type for image resolution logging (optional, for debugging)
 * @param {string} entityId - Entity ID/slug for image resolution logging (optional, for debugging)
 * @param {string} imageType - Image type for resolution logging (optional, for debugging)
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
  // format parameter removed - not supported by Supabase
  objectFit = 'cover',
  style = {},
  showComingSoon = true,
  entityType = 'unknown',
  entityId = 'unknown',
  imageType = 'unknown',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // Use callback ref to catch already-cached images immediately
  const setImgRef = useCallback((node) => {
    if (node) {
      // Check if image is already loaded (cached)
      if (node.complete && node.naturalHeight !== 0) {
        setIsLoaded(true);
      }
      imgRef.current = node;
    }
  }, []);

  // Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // Resolve image source through universal resolver (handles all formats + logs issues)
  const resolvedSrc = resolveImageSrc(src, {
    entityType,
    entityId,
    imageType,
    fallback: COMING_SOON_PLACEHOLDER,
    silent: false // Log resolution issues in dev mode
  });
  
  // Handle image load errors
  const handleError = (e) => {
    if (!hasError && showComingSoon) {
      setHasError(true);
      e.target.src = COMING_SOON_PLACEHOLDER;
    }
  };
  
  // Return Limitless Cruises logo placeholder if resolved to placeholder
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
    
    // Fallback to simple placeholder div if showComingSoon is false
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
  
  // Determine the max width for the primary src (use largest srcset width or provided width)
  const maxWidth = width || Math.max(...srcsetWidths);
  
  // Generate optimized URLs
  // Vercel Blob: use as-is (Vercel CDN handles optimization automatically)
  // Supabase: use manual transforms for CMS content
  // External: use as-is
  const optimizedSrc = (isVercelBlob || isSupabase)
    ? getOptimizedImageUrl(resolvedSrc, { width: maxWidth, quality })
    : resolvedSrc;
  
  // Generate srcset (Supabase generates manually, Vercel handles automatically)
  const srcSet = isSupabase && srcsetWidths.length > 0
    ? generateSrcSet(resolvedSrc, srcsetWidths, { quality })
    : undefined;

  // Generate meaningful alt text from src if not provided
  // Extract filename or meaningful part of URL for better SEO
  const generateAltFromSrc = (imageSrc) => {
    if (!imageSrc) return 'Image';
    try {
      const url = new URL(imageSrc);
      const pathname = url.pathname;
      // Extract filename without extension
      const filename = pathname.split('/').pop() || '';
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      // Convert kebab-case or snake_case to readable text
      const readable = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();
      return readable || 'Image';
    } catch {
      // If URL parsing fails, try to extract from path
      const match = imageSrc.match(/\/([^/]+)\.(webp|jpg|jpeg|png|gif|svg)/i);
      if (match) {
        return match[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Image';
      }
      return 'Image';
    }
  };

  // Use provided alt text, or generate from src, or use generic fallback
  const finalAlt = alt && alt.trim() !== '' 
    ? alt.trim() 
    : generateAltFromSrc(resolvedSrc);

  // Wrapper ensures there's always a background while image loads
  // This prevents the flash of empty/transparent space
  return (
    <div
      style={{
        position: 'relative',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        backgroundColor: '#E8E4DC', // Neutral loading background
        overflow: 'hidden',
        ...style
      }}
      className={className}
    >
      <img
        ref={setImgRef}
        src={hasError ? COMING_SOON_PLACEHOLDER : optimizedSrc}
        srcSet={hasError ? undefined : srcSet}
        sizes={srcSet && !hasError ? sizes : undefined}
        alt={finalAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in',
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;

