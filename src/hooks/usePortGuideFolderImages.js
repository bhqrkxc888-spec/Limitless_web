/**
 * React Hook for fetching folder-based port guide images
 * Loads all images from a specific folder (e.g., stay-local, go-further)
 * 
 * Usage:
 * const { images, loading, hasImages } = usePortGuideFolderImages('barcelona', 'stay-local');
 * 
 * Returns:
 * - images: Array of {url, alt, title, id, path, imageType, source, photographerName, photographerUrl}
 * - loading: Boolean indicating if query is in progress
 * - hasImages: Boolean indicating if folder has any images
 * 
 * Attribution: For Pexels images, use PexelsAttribution component:
 * import PexelsAttribution from '../components/port/PexelsAttribution';
 * <ImageCarousel images={images} />
 * <PexelsAttribution images={images} />
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SUPABASE_URL = 'https://xrbusklskmeaamwynfmm.supabase.co';

/**
 * Hook to get all images for a specific port guide folder
 * @param {string} portSlug - Port slug (e.g., 'barcelona', 'lisbon')
 * @param {string} folder - Folder name (e.g., 'stay-local', 'go-further', 'with-kids', 'overview')
 * @returns {object} { images, loading, hasImages }
 */
export function usePortGuideFolderImages(portSlug, folder) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasImages, setHasImages] = useState(false);

  useEffect(() => {
    if (!portSlug || !folder) {
      setImages([]);
      setLoading(false);
      setHasImages(false);
      return;
    }

    let cancelled = false;

    const fetchImages = async () => {
      try {
        // Query site_images table for all images in this folder (including attribution)
        const { data, error } = await supabase
          .from('site_images')
          .select('id, path, image_type, alt_text, title, bucket, source, photographer_name, photographer_url')
          .eq('entity_type', 'port-guide')
          .eq('entity_id', portSlug)
          .eq('bucket', 'WEB_port-guides')
          .like('image_type', `${folder}%`)
          .order('path');

        if (cancelled) return;

        if (error) {
          console.error('Error fetching port guide folder images:', error);
          setImages([]);
          setHasImages(false);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          // Filter out placeholder files (they contain 'placeholder' in path)
          const realImages = data.filter(img => 
            img.path && !img.path.includes('placeholder') && !img.path.includes('.placeholder')
          );

          if (realImages.length > 0) {
            // Transform data into image objects with full URLs and attribution
            const imageObjects = realImages.map(img => ({
              id: img.id,
              url: `${SUPABASE_URL}/storage/v1/object/public/${img.bucket}/${img.path}`,
              alt: img.alt_text || `${portSlug} ${folder} image`,
              title: img.title || null,
              path: img.path,
              imageType: img.image_type,
              source: img.source || 'manual',
              photographerName: img.photographer_name || null,
              photographerUrl: img.photographer_url || null
            }));

            // PRIORITY: Manual images always shown first, then Pexels images
            const sortedImages = imageObjects.sort((a, b) => {
              if (a.source === 'manual' && b.source !== 'manual') return -1;
              if (a.source !== 'manual' && b.source === 'manual') return 1;
              return 0; // Keep original order within same source type
            });

            setImages(sortedImages);
            setHasImages(true);
          } else {
            setImages([]);
            setHasImages(false);
          }
        } else {
          setImages([]);
          setHasImages(false);
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading port guide folder images:', err);
        setImages([]);
        setHasImages(false);
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      cancelled = true;
    };
  }, [portSlug, folder]);

  return { images, loading, hasImages };
}

/**
 * Hook to check if a port guide folder has any images
 * Lighter weight than usePortGuideFolderImages - only returns boolean
 * @param {string} portSlug - Port slug
 * @param {string} folder - Folder name
 * @returns {object} { hasImages, loading }
 */
export function usePortGuideFolderHasImages(portSlug, folder) {
  const [hasImages, setHasImages] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!portSlug || !folder) {
      setHasImages(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const checkImages = async () => {
      try {
        // Use RPC function for efficient check
        const { data, error } = await supabase
          .rpc('port_guide_folder_has_images', {
            p_port_slug: portSlug,
            p_folder: folder
          });

        if (cancelled) return;

        if (error) {
          // Fallback to direct query if RPC not available
          const { data: imageData, error: countError } = await supabase
            .from('site_images')
            .select('path')
            .eq('entity_type', 'port-guide')
            .eq('entity_id', portSlug)
            .eq('bucket', 'WEB_port-guides')
            .like('image_type', `${folder}%`);

          if (!countError && imageData) {
            // Filter out placeholders
            const realImages = imageData.filter(img => 
              img.path && !img.path.includes('placeholder') && !img.path.includes('.placeholder')
            );
            setHasImages(realImages.length > 0);
          } else {
            setHasImages(false);
          }
        } else {
          setHasImages(data === true);
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error checking port guide folder images:', err);
        setHasImages(false);
        setLoading(false);
      }
    };

    checkImages();

    return () => {
      cancelled = true;
    };
  }, [portSlug, folder]);

  return { hasImages, loading };
}

/**
 * Hook to get summary of all port guide sections with image counts
 * Useful for showing which sections have images available
 * @param {string} portSlug - Port slug
 * @returns {object} { sections, loading }
 */
export function usePortGuideSectionsSummary(portSlug) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!portSlug) {
      setSections([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchSummary = async () => {
      try {
        // Use RPC function for efficient summary
        const { data, error } = await supabase
          .rpc('get_port_guide_sections_summary', {
            p_port_slug: portSlug
          });

        if (cancelled) return;

        if (error) {
          console.error('Error fetching port guide sections summary:', error);
          setSections([]);
          setLoading(false);
          return;
        }

        if (data) {
          setSections(data);
        } else {
          setSections([]);
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading port guide sections summary:', err);
        setSections([]);
        setLoading(false);
      }
    };

    fetchSummary();

    return () => {
      cancelled = true;
    };
  }, [portSlug]);

  return { sections, loading };
}

/**
 * Hook to get required images (hero and card) for a port guide
 * @param {string} portSlug - Port slug
 * @returns {object} { heroUrl, heroAlt, cardUrl, cardAlt, loading }
 */
export function usePortGuideRequiredImages(portSlug) {
  const [heroUrl, setHeroUrl] = useState(null);
  const [heroAlt, setHeroAlt] = useState(null);
  const [cardUrl, setCardUrl] = useState(null);
  const [cardAlt, setCardAlt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!portSlug) {
      setHeroUrl(null);
      setHeroAlt(null);
      setCardUrl(null);
      setCardAlt(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchRequiredImages = async () => {
      try {
        // Use RPC function for efficient query
        const { data, error } = await supabase
          .rpc('get_port_guide_required_images', {
            p_port_slug: portSlug
          });

        if (cancelled) return;

        if (error) {
          console.error('Error fetching port guide required images:', error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const result = data[0];
          setHeroUrl(result.hero_url);
          setHeroAlt(result.hero_alt);
          setCardUrl(result.card_url);
          setCardAlt(result.card_alt);
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading port guide required images:', err);
        setLoading(false);
      }
    };

    fetchRequiredImages();

    return () => {
      cancelled = true;
    };
  }, [portSlug]);

  return { heroUrl, heroAlt, cardUrl, cardAlt, loading };
}
