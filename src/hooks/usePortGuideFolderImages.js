/**
 * React Hook for fetching folder-based port guide images
 * Loads all images from a specific folder (e.g., stay-local, go-further)
 * 
 * IMPORTANT: This hook queries Supabase Storage DIRECTLY to get images.
 * It does NOT rely on the site_images table which requires manual sync.
 * This ensures images appear immediately after upload via Media Library.
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
const BUCKET = 'WEB_port-guides';

/**
 * Generate alt text from filename
 */
function generateAltFromFilename(filename, portSlug, folder) {
  if (!filename) return `${portSlug} ${folder} image`;
  // Remove extension and convert to readable text
  const name = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  // Capitalize first letter of each word
  return name.replace(/\b\w/g, l => l.toUpperCase()) || `${portSlug} ${folder} image`;
}

/**
 * Hook to get all images for a specific port guide folder
 * Queries Supabase Storage directly for immediate availability after upload
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
        // Check if supabase is configured
        if (!supabase) {
          console.warn('Supabase not configured - cannot load port guide images');
          setImages([]);
          setHasImages(false);
          setLoading(false);
          return;
        }

        // Query Supabase Storage directly - this ensures images appear immediately after upload
        const folderPath = `${portSlug}/${folder}`;
        console.log(`[PortGuideImages] Fetching from ${BUCKET}/${folderPath}`);
        
        const { data: storageFiles, error: storageError } = await supabase.storage
          .from(BUCKET)
          .list(folderPath, { limit: 100, sortBy: { column: 'name', order: 'asc' } });

        if (cancelled) return;

        if (storageError) {
          console.error(`[PortGuideImages] Error listing ${folderPath}:`, storageError);
          setImages([]);
          setHasImages(false);
          setLoading(false);
          return;
        }
        
        console.log(`[PortGuideImages] Found ${storageFiles?.length || 0} items in ${folderPath}`);
        if (storageFiles?.length > 0) {
          console.log(`[PortGuideImages] Items:`, storageFiles.map(f => f.name));
        }

        // Filter out placeholder files and folders
        const imageFiles = (storageFiles || []).filter(file => 
          file.id !== null && // Not a folder
          file.name && 
          !file.name.startsWith('.') && 
          !file.name.includes('placeholder') &&
          /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
        );

        console.log(`[PortGuideImages] Filtered to ${imageFiles.length} valid images`);

        if (imageFiles.length > 0) {
          // Build image objects with public URLs
          const imageObjects = imageFiles.map((file, index) => {
            const fullPath = `${folderPath}/${file.name}`;
            return {
              id: file.id || `${portSlug}-${folder}-${index}`,
              url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fullPath}`,
              alt: generateAltFromFilename(file.name, portSlug, folder),
              title: generateAltFromFilename(file.name, portSlug, folder),
              path: fullPath,
              imageType: `${folder}/${file.name}`,
              source: 'manual',
              photographerName: null,
              photographerUrl: null
            };
          });

          setImages(imageObjects);
          setHasImages(true);
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
 * Queries Supabase Storage directly for immediate availability
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
        // Check if supabase is configured
        if (!supabase) {
          setHasImages(false);
          setLoading(false);
          return;
        }

        // Query storage directly for immediate availability
        const folderPath = `${portSlug}/${folder}`;
        const { data: storageFiles, error } = await supabase.storage
          .from(BUCKET)
          .list(folderPath, { limit: 10 });

        if (cancelled) return;

        if (error) {
          console.error('Error checking storage folder:', error);
          setHasImages(false);
          setLoading(false);
          return;
        }

        // Filter out placeholder files and folders
        const imageFiles = (storageFiles || []).filter(file => 
          file.id !== null && // Not a folder
          file.name && 
          !file.name.startsWith('.') && 
          !file.name.includes('placeholder') &&
          /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
        );

        setHasImages(imageFiles.length > 0);
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
