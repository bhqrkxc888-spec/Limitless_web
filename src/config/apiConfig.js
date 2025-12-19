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
  mapbox: {
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZGFuZWxhd3RvbiIsImEiOiJjbWpiNHM2b3EwNm10M2dyNjJ3eTA0ZHJyIn0.ltnRWBhmfiriKIsmGozQtw',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    enabled: true
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

