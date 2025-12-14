/**
 * API Configuration
 * Centralized configuration for external API integrations
 * 
 * Add your API keys to .env.local file:
 * VITE_WEATHER_API_KEY=your_key_here
 * VITE_MARINE_API_KEY=your_key_here
 * VITE_GOOGLE_PLACES_API_KEY=your_key_here
 */

export const apiConfig = {
  // OpenWeatherMap API - Weather data
  weather: {
    apiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    enabled: !!import.meta.env.VITE_WEATHER_API_KEY
  },

  // StormGlass API - Marine/Sea Conditions
  marine: {
    apiKey: import.meta.env.VITE_MARINE_API_KEY || '',
    baseUrl: 'https://api.stormglass.io/v2',
    enabled: !!import.meta.env.VITE_MARINE_API_KEY
  },

  // Google Places API - Attractions/Things to Do
  places: {
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '',
    baseUrl: 'https://maps.googleapis.com/maps/api/place',
    enabled: !!import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  }
};

// Helper to check if any APIs are configured
export const hasAnyApiKeys = () => {
  return apiConfig.weather.enabled || 
         apiConfig.marine.enabled || 
         apiConfig.places.enabled;
};

// Default fallback messages when APIs aren't configured
export const apiMessages = {
  weatherNotConfigured: 'Weather data will be available once API is configured.',
  marineNotConfigured: 'Sea conditions will be available once API is configured.',
  placesNotConfigured: 'Port attractions will be available once API is configured.'
};

