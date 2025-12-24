import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA Plugin - Service Worker for caching and offline support
    // This dramatically improves repeat visit performance (80%+ faster)
    VitePWA({
      registerType: 'autoUpdate', // Auto-update SW when new version available
      injectRegister: 'auto', // Automatically inject SW registration
      
      // Workbox configuration for intelligent caching
      workbox: {
        // Files to precache (built assets)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        
        // Runtime caching strategies
        runtimeCaching: [
          // Cache images from Vercel Blob Storage
          {
            urlPattern: /^https:\/\/.*\.public\.blob\.vercel-storage\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'vercel-blob-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache images from Supabase Storage
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'supabase-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        
        // Don't cache API routes or admin pages
        navigateFallbackDenylist: [/^\/api/, /^\/admin/]
      },
      
      // Minimal manifest (not a full PWA, just caching)
      manifest: {
        name: 'Limitless Cruises',
        short_name: 'Limitless',
        description: 'Your Personal Cruise Consultant',
        theme_color: '#2C344C',
        background_color: '#ffffff',
        display: 'browser', // Keep as website, not app-like
        icons: [
          {
            src: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/favicon.webp',
            sizes: '192x192',
            type: 'image/webp'
          }
        ]
      },
      
      // Dev options
      devOptions: {
        enabled: false // Don't run SW in dev mode (can cause caching issues)
      }
    })
  ],
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
            // Web vitals - separate for performance monitoring
            if (id.includes('web-vitals')) {
              return 'vitals-vendor';
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
    // Reduce chunk size warning limit to catch issues earlier
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting for better performance
    cssCodeSplit: true,
    // Minify CSS and JS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Run compress twice for better results
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false, // Remove all comments
      }
    },
    // Optimize CSS minification
    cssMinify: 'lightningcss',
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Module preload polyfill
    modulePreload: {
      polyfill: true
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
