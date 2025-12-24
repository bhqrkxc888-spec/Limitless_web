import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable sourcemaps for production debugging (hidden sourcemaps for security)
    sourcemap: 'hidden',
    // Optimize chunk splitting for better caching and performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Granular node_modules splitting
          if (id.includes('node_modules')) {
            // Critical - React core (always needed)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Supabase client (large but needed)
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Map libraries (only needed on itinerary/destination pages)
            if (id.includes('leaflet') || id.includes('mapbox') || id.includes('ol/')) {
              return 'map-vendor';
            }
            // Other vendor code
            return 'vendor';
          }
          
          // Separate large data files
          if (id.includes('/data/cruiseLines')) return 'cruise-data';
          if (id.includes('/data/destinations')) return 'destination-data';
          
          // Admin pages (lazy-loaded, not needed for public)
          if (id.includes('/pages/admin/')) return 'admin';
          
          // Weather APIs (only loaded with consent)
          if (id.includes('/services/weather') || id.includes('/services/marine')) {
            return 'weather-apis';
          }
          
          // Form components (not needed on every page)
          if (id.includes('ContactForm') || id.includes('PriceMatchForm')) {
            return 'forms';
          }
        }
      }
    },
    // Increase chunk size warning limit (we have large data files)
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting for better performance
    cssCodeSplit: true,
    // Minify CSS and JS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    // Optimize CSS minification
    cssMinify: 'lightningcss'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // For local dev, we'll need to handle this differently
        // If using vercel dev, this will work
        // Otherwise, we can add a mock or use the API directly with a fallback
      }
    }
  }
})
