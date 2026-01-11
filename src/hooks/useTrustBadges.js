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

export function useTrustBadges(organisationId = DEFAULT_ORG_ID) {
  const [badges, setBadges] = useState({
    abta: {
      logoUrl: siteConfig.financialProtection?.abta?.logo || null,
      number: siteConfig.financialProtection?.abta?.number || '',
      enabled: siteConfig.financialProtection?.abta?.enabled ?? true,
    },
    atol: {
      logoUrl: siteConfig.financialProtection?.atol?.logo || null,
      number: siteConfig.financialProtection?.atol?.number || '',
      enabled: siteConfig.financialProtection?.atol?.enabled ?? true,
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
              logoUrl: data.abta_logo_url || siteConfig.financialProtection?.abta?.logo || null,
              number: data.default_abta_number || siteConfig.financialProtection?.abta?.number || '',
              enabled: true,
            },
            atol: {
              logoUrl: data.atol_logo_url || siteConfig.financialProtection?.atol?.logo || null,
              number: data.default_atol_number || siteConfig.financialProtection?.atol?.number || '',
              enabled: true,
            },
            loading: false,
          });
        } else {
          setBadges(prev => ({ ...prev, loading: false }));
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
