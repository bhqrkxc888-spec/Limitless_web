/**
 * Hook to fetch trust badge settings from Supabase
 * Falls back to siteConfig if no custom settings found
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { siteConfig } from '../config/siteConfig';

// Default organisation ID for Limitless Cruises
// This should match your organisation in Supabase
const DEFAULT_ORG_ID = 'bae24ccd-1485-4101-8630-fc114f12abf0';

// Hardcoded Supabase Storage URLs for trust badges
const DEFAULT_BADGE_URLS = {
  abta: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/trust-abta.png',
  atol: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/trust-atol.png',
  clia: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/trust-clia.png',
};

export function useTrustBadges(organisationId = DEFAULT_ORG_ID) {
  const [badges, setBadges] = useState({
    abta: {
      logoUrl: siteConfig.financialProtection?.abta?.logo || DEFAULT_BADGE_URLS.abta,
      number: siteConfig.financialProtection?.abta?.number || 'P7541',
      enabled: siteConfig.financialProtection?.abta?.enabled ?? true,
      invert: false, // Don't invert - use logo as-is
    },
    atol: {
      logoUrl: siteConfig.financialProtection?.atol?.logo || DEFAULT_BADGE_URLS.atol,
      number: siteConfig.financialProtection?.atol?.number || '',
      enabled: siteConfig.financialProtection?.atol?.enabled ?? true,
      invert: false, // Don't invert - use logo as-is
    },
    loading: true,
  });

  useEffect(() => {
    async function fetchBadges() {
      if (!organisationId) {
        setBadges(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('get_trust_badge_settings', { org_id: organisationId });

        if (error) {
          console.warn('Failed to fetch trust badges:', error);
          setBadges(prev => ({ ...prev, loading: false }));
          return;
        }

        if (data) {
          setBadges({
            abta: {
              logoUrl: data.abta_logo_url || DEFAULT_BADGE_URLS.abta,
              number: data.default_abta_number || siteConfig.financialProtection?.abta?.number || 'P7541',
              enabled: true,
              invert: false, // Use logos as-is
            },
            atol: {
              logoUrl: data.atol_logo_url || DEFAULT_BADGE_URLS.atol,
              number: data.default_atol_number || siteConfig.financialProtection?.atol?.number || '',
              enabled: true,
              invert: false, // Use logos as-is
            },
            loading: false,
          });
        } else {
          // Fallback to hardcoded URLs if RPC returns no data
          setBadges({
            abta: {
              logoUrl: DEFAULT_BADGE_URLS.abta,
              number: 'P7541',
              enabled: true,
              invert: false,
            },
            atol: {
              logoUrl: DEFAULT_BADGE_URLS.atol,
              number: '',
              enabled: true,
              invert: false,
            },
            loading: false,
          });
        }
      } catch (err) {
        console.warn('Error fetching trust badges:', err);
        setBadges(prev => ({ ...prev, loading: false }));
      }
    }

    fetchBadges();
  }, [organisationId]);

  return badges;
}
