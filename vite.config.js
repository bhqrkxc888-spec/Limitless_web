import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          // Separate large data files
          'cruise-data': ['./src/data/cruiseLines.js'],
          'destination-data': ['./src/data/destinations.js'],
          // Lazy-load weather APIs (only loaded with consent)
          'weather-apis': [
            './src/services/weatherAPI.js',
            './src/services/marineAPI.js'
          ],
          // Separate form components (not needed on every page)
          'forms': [
            './src/components/ContactForm.jsx',
            './src/components/PriceMatchForm.jsx'
          ]
        }
      }
    },
    // Increase chunk size warning limit (we have large data files)
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify CSS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      }
    }
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
