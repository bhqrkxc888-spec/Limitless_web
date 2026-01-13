import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Custom plugin to remove non-critical CSS from initial HTML
 * These CSS files will be loaded dynamically when their associated chunks load
 * This improves mobile performance by reducing render-blocking CSS
 */
function deferNonCriticalCSS() {
  // CSS files that should NOT be in initial HTML (loaded with their chunks instead)
  const deferredPatterns = [
    'admin-',      // Admin pages CSS - only needed on /admin routes
    'map-vendor-', // Mapbox CSS - only needed on pages with maps
    'map-components-', // Map component CSS
    'forms-',      // Form CSS - loaded when ContactForm/PriceMatchForm are lazy-loaded
  ];
  
  return {
    name: 'defer-non-critical-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Find and remove stylesheet links that match deferred patterns
      // Store them for deferred loading script
      const deferredLinks = [];
      
      let modifiedHtml = html.replace(
        /<link rel="stylesheet"[^>]*href="([^"]*)"[^>]*>/g,
        (match, href) => {
          const shouldDefer = deferredPatterns.some(pattern => href.includes(pattern));
          if (shouldDefer) {
            deferredLinks.push(href);
            return `<!-- deferred: ${href} -->`; // Comment out, will load dynamically
          }
          return match;
        }
      );
      
      // If we deferred any CSS, add a script to load them on interaction/idle
      if (deferredLinks.length > 0) {
        const deferScript = `
    <script>
      // Deferred CSS loader - loads non-critical CSS after user interaction or idle
      (function() {
        var loaded = false;
        var deferredCSS = ${JSON.stringify(deferredLinks)};
        
        function loadDeferredCSS() {
          if (loaded) return;
          loaded = true;
          deferredCSS.forEach(function(href) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
          });
        }
        
        // Load on idle or after 3 seconds (whichever comes first)
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadDeferredCSS, { timeout: 3000 });
        } else {
          setTimeout(loadDeferredCSS, 1000);
        }
        
        // Also load on first interaction
        ['scroll', 'click', 'touchstart', 'mousemove'].forEach(function(e) {
          window.addEventListener(e, loadDeferredCSS, { once: true, passive: true });
        });
      })();
    </script>`;
        
        // Insert script before closing </head>
        modifiedHtml = modifiedHtml.replace('</head>', deferScript + '\n  </head>');
      }
      
      return modifiedHtml;
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    deferNonCriticalCSS(),
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
            // framer-motion must be with React to access React.createContext
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || id.includes('framer-motion')) {
              return 'react-vendor';
            }
            // Supabase client (large but needed)
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Map libraries (only needed on itinerary/destination pages)
            // These should ONLY load when map components are actually rendered
            if (id.includes('leaflet') || id.includes('mapbox') || id.includes('ol/')) {
              return 'map-vendor';
            }
            // Web vitals - separate for performance monitoring
            if (id.includes('web-vitals')) {
              return 'vitals-vendor';
            }
            // react-dropzone (only used in admin image upload)
            if (id.includes('react-dropzone')) {
              return 'admin';
            }
            // Other vendor code
            return 'vendor';
          }
          
          // Separate large data files
          if (id.includes('/data/cruiseLines')) return 'cruise-data';
          if (id.includes('/data/destinations')) return 'destination-data';
          
          // Admin - ALL admin-related code including components and hooks
          // This ensures the admin chunk is fully isolated from public routes
          if (id.includes('/pages/admin/') || 
              id.includes('/components/admin/') || 
              id.includes('AdminProtectedRoute') ||
              id.includes('useAdminAuth')) {
            return 'admin';
          }
          
          // Map components - isolated to prevent map-vendor from loading on homepage
          if (id.includes('BucketListMap') || 
              id.includes('InteractiveItineraryMap') || 
              id.includes('LazyBucketListMap')) {
            return 'map-components';
          }
          
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
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
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
    // Disable module preload polyfill to prevent ALL chunk preloading on initial load
    // This is critical for mobile performance - we only want to load what's needed for current route
    modulePreload: false
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

// Deploy trigger 1766966277
