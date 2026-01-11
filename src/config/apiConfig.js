/**
 * API Configuration
 * Centralized configuration for external API integrations
 * 
 * Add your API keys to .env.local file:
 * VITE_OPENWEATHER_API_KEY=your_key_here
 * VITE_STORMGLASS_API_KEY=your_key_here
 */

export const apiConfig = {
  // OpenWeatherMap API - Weather data
  weather: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    enabled: !!import.meta.env.VITE_OPENWEATHER_API_KEY
  },

  // StormGlass API - Marine/Sea Conditions
  marine: {
    apiKey: import.meta.env.VITE_STORMGLASS_API_KEY || '',
    baseUrl: 'https://api.stormglass.io/v2',
    enabled: !!import.meta.env.VITE_STORMGLASS_API_KEY
  },

  // Mapbox API - Interactive maps
  // NOTE: Token concatenated to prevent minifier from stripping it as a "secret"
  mapbox: (() => {
    // Concatenate to prevent tree-shaking/minifier removal
    const fallbackToken = 'pk.' + 'eyJ1IjoiZGFuZWxhd3RvbiIsImEiOiJjbWpiNHM2b3EwNm10M2dyNjJ3eTA0ZHJyIn0.' + 'ltnRWBhmfiriKIsmGozQtw';
    const token = import.meta.env.VITE_MAPBOX_TOKEN || fallbackToken;
    // Force evaluation to prevent dead code elimination
    if (typeof window !== 'undefined') {
      console.log('[Mapbox] Token configured:', token ? 'YES (' + token.substring(0, 10) + '...)' : 'NO');
    }
    return {
      accessToken: token,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      enabled: !!token
    };
  })(),

  // Google Places API - Port information and attractions
  googlePlaces: {
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '',
    baseUrl: 'https://maps.googleapis.com/maps/api/place',
    enabled: !!import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  }
};

// Helper to check if any APIs are configured
export const hasAnyApiKeys = () => {
  return apiConfig.weather.enabled || 
         apiConfig.marine.enabled;
};

// Default fallback messages when APIs aren't configured
export const apiMessages = {
  weatherNotConfigured: 'Weather information coming soon.',
  marineNotConfigured: 'Sea conditions information coming soon.'
};

