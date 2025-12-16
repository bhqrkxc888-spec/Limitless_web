import { getOptimizedImageUrl, generateSrcSet, isSupabaseUrl } from '../utils/imageHelpers';

/**
 * OptimizedImage Component
 * Automatically optimizes Supabase Storage images using Image Transforms.
 * Falls back gracefully for non-Supabase URLs (Unsplash, external images).
 * 
 * Features:
 * - WebP conversion for Supabase images
 * - Responsive srcset generation
 * - Proper loading/priority attributes for LCP optimization
 * - Maintains aspect ratio (width-only transforms)
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
 * @param {string} format - Image format: 'webp', 'avif', 'jpeg', 'png' (default: 'webp')
 * @param {string} objectFit - CSS object-fit value (default: 'cover')
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
  ...props
}) {
  // Return placeholder if no src
  if (!src) {
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

  const isSupabase = isSupabaseUrl(src);
  
  // Determine the max width for the primary src (use largest srcset width or provided width)
  const maxWidth = width || Math.max(...srcsetWidths);
  
  // Generate optimized URLs for Supabase images
  const optimizedSrc = isSupabase 
    ? getOptimizedImageUrl(src, { width: maxWidth, quality })
    : src;
  
  // Generate srcset only for Supabase images
  const srcSet = isSupabase && srcsetWidths.length > 0
    ? generateSrcSet(src, srcsetWidths, { quality })
    : undefined;

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt || ''}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={{
        objectFit,
        ...style
      }}
      {...props}
    />
  );
}

export default OptimizedImage;

