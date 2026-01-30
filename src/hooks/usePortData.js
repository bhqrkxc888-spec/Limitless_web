/**
 * usePortData Hook
 * 
 * Fetches port data from Supabase with fallback to static JS files
 * This enables gradual migration from static to database-driven content
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getPortBySlug as getStaticPort } from '../data/ports';
import { getPortContent as getStaticPortContent, hasDetailedContent as hasStaticDetailedContent } from '../data/portContent';

/**
 * Transform Supabase port data to match the static port format
 */
function transformSupabasePort(dbPort) {
  if (!dbPort) return null;
  
  return {
    id: dbPort.id,
    slug: dbPort.slug,
    name: dbPort.name,
    displayName: dbPort.display_name || dbPort.name,
    country: dbPort.country,
    region: dbPort.region,
    coordinates: dbPort.coordinates || {},
    tagline: dbPort.tagline || '',
    description: dbPort.description || '',
    portCharacter: dbPort.port_character || '',
    aboutPort: dbPort.about_port || {},
    quickFacts: dbPort.quick_facts || {},
    transportConnections: dbPort.transport_connections || {},
    gettingAround: dbPort.getting_around || {},
    mustSeeSights: dbPort.must_see_sights || [],
    shoreExcursions: dbPort.shore_excursions || [],
    nearestBeach: dbPort.nearest_beach || {},
    foodAndDrink: dbPort.food_and_drink || [],
    insiderTips: dbPort.insider_tips || [],
    faq: dbPort.faq || [],
    weather: dbPort.weather || {},
    practicalInfo: dbPort.practical_info || {},
    familyFriendly: dbPort.family_friendly || {},
    meta: {
      title: dbPort.meta_title || `${dbPort.name} Cruise Port Guide`,
      description: dbPort.meta_description || dbPort.description || ''
    },
    // Flags
    isComplete: dbPort.is_complete || false,
    showInMenu: dbPort.show_in_menu || false,
    status: dbPort.status || 'draft'
  };
}

/**
 * Transform Supabase content fields to match the static portContent format
 */
function extractDetailedContent(dbPort) {
  if (!dbPort) return null;
  
  const content = {
    overview: dbPort.content_overview || null,
    stayLocal: dbPort.content_stay_local || null,
    goFurther: dbPort.content_go_further || null,
    withKids: dbPort.content_with_kids || null,
    send: dbPort.content_accessibility || null,
    medical: dbPort.content_medical || null,
    foodAndDrink: dbPort.content_food_drink || null,
    overnight: dbPort.content_overnight || null
  };
  
  // Check if any content exists
  const hasContent = Object.values(content).some(v => v && Object.keys(v).length > 0);
  
  return hasContent ? content : null;
}

/**
 * Hook to fetch port data with Supabase-first, static fallback
 */
export function usePortData(slug) {
  const [port, setPort] = useState(null);
  const [detailedContent, setDetailedContent] = useState(null);
  const [hasDetailed, setHasDetailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState(null); // 'supabase' or 'static'

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    async function fetchPort() {
      setIsLoading(true);
      
      try {
        // Try Supabase first
        const { data, error } = await supabase
          .from('ports')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          // Transform and use Supabase data
          const transformedPort = transformSupabasePort(data);
          const content = extractDetailedContent(data);
          
          setPort(transformedPort);
          setDetailedContent(content);
          setHasDetailed(!!content);
          setSource('supabase');
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static:', err.message);
      }

      // Fallback to static JS files
      const staticPort = getStaticPort(slug);
      const staticContent = getStaticPortContent(slug);
      const staticHasDetailed = hasStaticDetailedContent(slug);

      setPort(staticPort);
      setDetailedContent(staticContent);
      setHasDetailed(staticHasDetailed);
      setSource('static');
      setIsLoading(false);
    }

    fetchPort();
  }, [slug]);

  return { port, detailedContent, hasDetailed, isLoading, source };
}

/**
 * Hook to get all ports for menu/navigation
 * @param {boolean} menuOnly - If true, only return ports with show_in_menu=true
 */
export function usePortsList(menuOnly = false) {
  const [ports, setPorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPorts() {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('ports')
          .select('id, slug, name, country, region, tagline, coordinates, show_in_menu, is_complete')
          .eq('status', 'published')
          .order('name');

        if (menuOnly) {
          query = query.eq('show_in_menu', true);
        }

        const { data, error } = await query;

        if (!error && data) {
          setPorts(data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase ports list failed:', err.message);
      }

      // No static fallback for menu - just return empty
      setPorts([]);
      setIsLoading(false);
    }

    fetchPorts();
  }, [menuOnly]);

  return { ports, isLoading };
}

export default usePortData;
