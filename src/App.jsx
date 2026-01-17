import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, useState } from 'react'
import { analyzePageSEO } from './services/seoMonitoring'
import lazyWithRetry from './utils/lazyWithRetry'

// Layout Components (keep these eagerly loaded for fast initial render)
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import DevModeIndicator from './components/DevModeIndicator'
import ErrorBoundary from './components/ErrorBoundary'

// Deferred UI Components - loaded after LCP for better mobile performance
// These are not needed for First Contentful Paint or LCP
const CookieConsent = lazy(() => lazyWithRetry(() => import('./components/CookieConsent')))
const FloatingWhatsApp = lazy(() => lazyWithRetry(() => import('./components/FloatingWhatsApp')))
// ImageDebugger only loaded in development mode
const ImageDebugger = import.meta.env.DEV 
  ? lazy(() => lazyWithRetry(() => import('./components/ImageDebugger')))
  : null

/**
 * DeferredUI - Renders children only after LCP/idle
 * This ensures non-critical UI doesn't compete with LCP resources
 */
function DeferredUI({ children }) {
  const [shouldRender, setShouldRender] = useState(false)
  
  useEffect(() => {
    const show = () => setShouldRender(true)
    
    // Defer rendering until after LCP/idle (3 second max timeout)
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(show, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    } else {
      const timer = setTimeout(show, 2000)
      return () => clearTimeout(timer)
    }
  }, [])
  
  if (!shouldRender) return null
  
  return <Suspense fallback={null}>{children}</Suspense>
}

// Route Protection - ProtectedRoute and PublishGate are light, kept eager
// AdminProtectedRoute is lazy to prevent admin chunk from loading on non-admin routes
import ProtectedRoute from './components/ProtectedRoute'
import PublishGate from './components/PublishGate'
const AdminProtectedRoute = lazy(() => lazyWithRetry(() => import('./components/AdminProtectedRoute')))

// HomePage is eagerly loaded to prevent CLS on initial page load
// This is the main landing page and must render without Suspense delay
import HomePage from './pages/HomePage'

// Loading fallback component - minimal height to prevent large CLS
// Optimized for mobile with smaller spinner and faster animation
function PageLoader() {
  return (
    <div className="page-loader" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh', // Reduced from 100vh for less jarring on mobile
      padding: '1rem',
      background: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" style={{
          width: '32px', // Smaller on mobile
          height: '32px',
          border: '2px solid #e8e8e8',
          borderTop: '2px solid #2C344C',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite', // Faster spin for perceived speed
          margin: '0 auto 0.5rem'
        }} />
        <p style={{ color: '#888', fontSize: '0.875rem' }}>Loading...</p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Lazy-loaded Pages (code splitting) - NOT HomePage
const FindCruisePage = lazy(() => lazyWithRetry(() => import('./pages/FindCruisePage')))
const AboutPage = lazy(() => lazyWithRetry(() => import('./pages/AboutPage')))
const ContactPage = lazy(() => lazyWithRetry(() => import('./pages/ContactPage')))
const GetQuotePage = lazy(() => lazyWithRetry(() => import('./pages/GetQuotePage')))
const PackageConciergePage = lazy(() => lazyWithRetry(() => import('./pages/PackageConciergePage')))
const SkipperBetaPage = lazy(() => lazyWithRetry(() => import('./pages/SkipperBetaPage')))
const CruiseCompanionPage = lazy(() => lazyWithRetry(() => import('./pages/CruiseCompanionPage')))
const AdminPage = lazy(() => lazyWithRetry(() => import('./pages/AdminPage')))
const CruiseLinesPage = lazy(() => lazyWithRetry(() => import('./pages/CruiseLinesPage')))
const DestinationsPage = lazy(() => lazyWithRetry(() => import('./pages/DestinationsPage')))
const CruiseTypesPage = lazy(() => lazyWithRetry(() => import('./pages/CruiseTypesPage')))
const BucketListPage = lazy(() => lazyWithRetry(() => import('./pages/BucketListPage')))
const OffersPage = lazy(() => lazyWithRetry(() => import('./pages/OffersPage')))
const OfferPage = lazy(() => lazyWithRetry(() => import('./pages/OfferPage')))
const TravelNewsPage = lazy(() => lazyWithRetry(() => import('./pages/TravelNewsPage')))
const TravelNewsArticlePage = lazy(() => lazyWithRetry(() => import('./pages/TravelNewsArticlePage')))
const TravelNewsCategoryPage = lazy(() => lazyWithRetry(() => import('./pages/TravelNewsCategoryPage')))
const CruiseGuidesPage = lazy(() => lazyWithRetry(() => import('./pages/CruiseGuidesPage')))
const CruiseGuideDetailPage = lazy(() => lazyWithRetry(() => import('./pages/CruiseGuideDetailPage')))
const TravelNewsTagPage = lazy(() => lazyWithRetry(() => import('./pages/TravelNewsTagPage')))
const NotFoundPage = lazy(() => lazyWithRetry(() => import('./pages/NotFoundPage')))
const FAQPage = lazy(() => lazyWithRetry(() => import('./pages/FAQPage')))
const TestimonialsPage = lazy(() => lazyWithRetry(() => import('./pages/TestimonialsPage')))
const ShipPage = lazy(() => lazyWithRetry(() => import('./templates/ShipPage')))

// Admin Monitoring Dashboard
const AdminLogin = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminLogin')))
const AdminDashboard = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminDashboard')))
const AdminErrors = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminErrors')))
const AdminLighthouse = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminLighthouse')))
const AdminSEO = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminSEO')))
const AdminAnalytics = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminAnalytics')))
const AdminSearchConsole = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminSearchConsole')))
const AdminWebsiteDestinations = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminWebsiteDestinations')))
const AdminOffersDebug = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminOffersDebug')))

// Image Management
const AdminImageManagement = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminImageManagement')))
const AdminSiteImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminSiteImages')))
const AdminPageHeroes = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminPageHeroes')))
const AdminDestinationImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminDestinationImages')))
const AdminCruiseLineImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminCruiseLineImages')))
const AdminCategoryImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminCategoryImages')))
const AdminBucketListImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminBucketListImages')))
const AdminPortGuideImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminPortGuideImages')))
const AdminShipImages = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminShipImages')))
const AdminCruiseFinder = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminCruiseFinder')))
const AdminPortRatings = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminPortRatings')))
const AdminCruiseFeedback = lazy(() => lazyWithRetry(() => import('./pages/admin/AdminCruiseFeedback')))

// Legal Pages
const WebsiteTerms = lazy(() => lazyWithRetry(() => import('./pages/WebsiteTerms')))
const PrivacyPolicy = lazy(() => lazyWithRetry(() => import('./pages/PrivacyPolicy')))
const BookingTerms = lazy(() => lazyWithRetry(() => import('./pages/BookingTerms')))
const CookiePolicy = lazy(() => lazyWithRetry(() => import('./pages/CookiePolicy')))
const PriceMatchGuarantee = lazy(() => lazyWithRetry(() => import('./pages/PriceMatchGuarantee')))

// Template Pages (Dynamic Routes)
const CruiseLinePage = lazy(() => lazyWithRetry(() => import('./templates/CruiseLinePage')))
const DestinationPage = lazy(() => lazyWithRetry(() => import('./templates/DestinationPage')))
const CategoryPage = lazy(() => lazyWithRetry(() => import('./templates/CategoryPage')))
const BucketListExperiencePage = lazy(() => lazyWithRetry(() => import('./templates/BucketListExperiencePage')))
const PortGuidePage = lazy(() => lazyWithRetry(() => import('./templates/PortGuidePage')))

// Port Guide Pages (Draft)
const PortsPage = lazy(() => lazyWithRetry(() => import('./pages/PortsPage')))
const PortRegionPage = lazy(() => lazyWithRetry(() => import('./pages/PortRegionPage')))

// Scroll to top on route change and trigger SEO analysis
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change (instant, not smooth)
    window.scrollTo(0, 0);
    
    // Trigger SEO analysis on route change (after a delay to let page render)
    // Skip for admin routes
    if (!import.meta.env.DEV && !pathname.startsWith('/admin')) {
      const timeoutId = setTimeout(() => {
        analyzePageSEO().catch(() => {
          // Silently fail if SEO analysis fails
        })
      }, 1500)
      
      return () => clearTimeout(timeoutId)
    }
  }, [pathname]);

  return null;
}

// Layout wrapper that conditionally shows header/footer
function AppLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  
  // MAINTENANCE MODE: Simple redirect - all routes except home, preview, and admin go to /preview/
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const isPreviewRoute = pathname.startsWith('/preview');
  
  // Redirect to preview version (preserves path for better UX)
  if (isMaintenanceMode && pathname !== '/' && !isPreviewRoute && !isAdminRoute) {
    return <Navigate to={`/preview${pathname}`} replace />;
  }
  
  // Admin routes have their own layout
  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Preview Access for hidden/coming-soon pages - only when NOT in maintenance mode */}
          {!isMaintenanceMode && <Route path="/preview" element={<AdminPage />} />}
          
          {/* Admin Monitoring Dashboard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/errors" element={<AdminProtectedRoute><AdminErrors /></AdminProtectedRoute>} />
          <Route path="/admin/lighthouse" element={<AdminProtectedRoute><AdminLighthouse /></AdminProtectedRoute>} />
          <Route path="/admin/analytics" element={<AdminProtectedRoute><AdminAnalytics /></AdminProtectedRoute>} />
          <Route path="/admin/search-console" element={<AdminProtectedRoute><AdminSearchConsole /></AdminProtectedRoute>} />
          <Route path="/admin/seo" element={<AdminProtectedRoute><AdminSEO /></AdminProtectedRoute>} />
          
          {/* Feedback Management */}
          <Route path="/admin/port-ratings" element={<AdminProtectedRoute><AdminPortRatings /></AdminProtectedRoute>} />
          <Route path="/admin/cruise-feedback" element={<AdminProtectedRoute><AdminCruiseFeedback /></AdminProtectedRoute>} />
          
          {/* Image Management */}
          <Route path="/admin/images" element={<AdminProtectedRoute><AdminImageManagement /></AdminProtectedRoute>} />
          <Route path="/admin/images/site" element={<AdminProtectedRoute><AdminSiteImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/page-heroes" element={<AdminProtectedRoute><AdminPageHeroes /></AdminProtectedRoute>} />
          <Route path="/admin/images/destinations" element={<AdminProtectedRoute><AdminDestinationImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/cruise-lines" element={<AdminProtectedRoute><AdminCruiseLineImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/cruise-lines/:slug" element={<AdminProtectedRoute><AdminCruiseLineImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/categories" element={<AdminProtectedRoute><AdminCategoryImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/bucket-list" element={<AdminProtectedRoute><AdminBucketListImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/bucket-list/:slug" element={<AdminProtectedRoute><AdminBucketListImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/port-guides" element={<AdminProtectedRoute><AdminPortGuideImages /></AdminProtectedRoute>} />
          <Route path="/admin/images/port-guides/:slug" element={<AdminProtectedRoute><AdminPortGuideImages /></AdminProtectedRoute>} />
          {/* Redirect old ships route to cruise lines */}
          <Route path="/admin/images/ships" element={<AdminProtectedRoute><AdminShipImages /></AdminProtectedRoute>} />
          
          {/* Admin Website Section */}
          <Route path="/admin/website/destinations" element={<AdminProtectedRoute><AdminWebsiteDestinations /></AdminProtectedRoute>} />
          <Route path="/admin/offers-debug" element={<AdminProtectedRoute><AdminOffersDebug /></AdminProtectedRoute>} />
          
          {/* Admin Tools */}
          <Route path="/admin/cruise-finder" element={<AdminProtectedRoute><AdminCruiseFinder /></AdminProtectedRoute>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    );
  }
  
  // Regular site layout with header/footer
  // Hide header/footer in maintenance mode (HomePage handles its own minimal header)
  const isMaintenanceHome = isMaintenanceMode && pathname === '/';
  
  return (
    <div className="app">
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {!isMaintenanceHome && !pathname.startsWith('/cruise/') && <Header />}
        {/* Using div instead of main to avoid nested <main> elements - each page has its own <main> */}
        <div id="main-content" className="main-wrapper">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
            {/* Preview routes - show full site when in maintenance mode */}
            {isMaintenanceMode && (
              <>
                <Route path="/preview" element={<HomePage />} />
                <Route path="/preview/find-a-cruise" element={<FindCruisePage />} />
                <Route path="/preview/about" element={<AboutPage />} />
                <Route path="/preview/contact" element={<ContactPage />} />
                <Route path="/preview/offers" element={<OffersPage />} />
                <Route path="/preview/offers/:slug" element={<OfferPage />} />
                <Route path="/preview/cruise-lines" element={<CruiseLinesPage />} />
                <Route path="/preview/cruise-lines/:slug" element={<CruiseLinePage />} />
                <Route path="/preview/ships/:slug" element={<ShipPage />} />
                <Route path="/preview/destinations" element={<DestinationsPage />} />
                <Route path="/preview/destinations/transatlantic-cruises" element={<Navigate to="/preview/bucket-list/transatlantic-crossings" replace />} />
                <Route path="/preview/destinations/:slug" element={<DestinationPage />} />
                <Route path="/preview/bucket-list" element={<BucketListPage />} />
                <Route path="/preview/bucket-list/:slug" element={<BucketListExperiencePage />} />
                <Route path="/preview/cruise-types" element={<CruiseTypesPage />} />
                <Route path="/preview/cruises/:slug" element={<CategoryPage />} />
                <Route path="/preview/faq" element={<FAQPage />} />
                <Route path="/preview/testimonials" element={<PublishGate section="Testimonials" title="Customer Testimonials" backLink="/preview" backLabel="Return Home"><TestimonialsPage /></PublishGate>} />
                <Route path="/preview/travel-news" element={<TravelNewsPage />} />
                <Route path="/preview/travel-news/category/:category" element={<TravelNewsCategoryPage />} />
                <Route path="/preview/travel-news/tag/:tag" element={<TravelNewsTagPage />} />
                <Route path="/preview/travel-news/:slug" element={<TravelNewsArticlePage />} />
                <Route path="/preview/cruise-guides" element={<CruiseGuidesPage />} />
                <Route path="/preview/cruise-guides/:slug" element={<CruiseGuideDetailPage />} />
                <Route path="/preview/ports" element={<PortsPage />} />
                <Route path="/preview/ports/region/:slug" element={<PortRegionPage />} />
                <Route path="/preview/ports/:slug" element={<PortGuidePage />} />
                <Route path="/preview/website-terms" element={<WebsiteTerms />} />
                <Route path="/preview/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/preview/booking-terms" element={<BookingTerms />} />
                <Route path="/preview/cookie-policy" element={<CookiePolicy />} />
                <Route path="/preview/price-match-guarantee" element={<PriceMatchGuarantee />} />
              </>
            )}
            {/* Main Pages - Always Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/find-a-cruise" element={<FindCruisePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Enquiry Forms - Public */}
            {/* Note: /get-a-quote route kept functional but hidden from navigation
                Doesn't collect enough passenger/cabin details for proper quotes
                May attract price-shoppers rather than premium clientele */}
            <Route path="/get-a-quote" element={<GetQuotePage />} />
            <Route path="/concierge" element={<PackageConciergePage />} />
            <Route path="/custom-packages" element={<PackageConciergePage />} />
            
            {/* Skipper AI Beta - Hidden */}
            <Route path="/skipper-beta" element={<SkipperBetaPage />} />
            
            {/* Cruise Companion - Generic route for all cruise itineraries */}
            <Route path="/cruise/:cruiseId" element={<CruiseCompanionPage />} />
            
            {/* Legacy G606 route - redirects to new format */}
            <Route path="/cruise/g606-po-iona-canaries-mar-2026" element={<CruiseCompanionPage />} />
            
            {/* Offers - Public */}
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/offers/:slug" element={<OfferPage />} />
            
            {/* Cruise Lines - Published */}
            <Route path="/cruise-lines" element={<CruiseLinesPage />} />
            <Route path="/cruise-lines/:slug" element={<CruiseLinePage />} />
            
            {/* Ships - Published */}
            <Route path="/ships/:slug" element={<ShipPage />} />
            
            {/* Destinations - Published */}
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/transatlantic-cruises" element={<Navigate to="/bucket-list/transatlantic-crossings" replace />} />
            <Route path="/destinations/:slug" element={<DestinationPage />} />
            
            {/* Bucket List Experiences - Published */}
            <Route path="/bucket-list" element={<BucketListPage />} />
            <Route path="/bucket-list/:slug" element={<BucketListExperiencePage />} />
            
            {/* Cruise Types Hub - Published */}
            <Route path="/cruise-types" element={<CruiseTypesPage />} />
            
            {/* Legacy Cruise Categories Route - Redirect to Cruise Types */}
            <Route path="/cruises/:slug" element={<CategoryPage />} />
            
            {/* FAQ - Published */}
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Testimonials - Coming Soon (Draft) */}
            <Route 
              path="/testimonials" 
              element={
                <PublishGate section="Testimonials" title="Customer Testimonials" backLink="/" backLabel="Return Home">
                  <TestimonialsPage />
                </PublishGate>
              } 
            />
            
            {/* Travel News - Public */}
            <Route path="/travel-news" element={<TravelNewsPage />} />
            <Route path="/travel-news/category/:category" element={<TravelNewsCategoryPage />} />
            <Route path="/travel-news/tag/:tag" element={<TravelNewsTagPage />} />
            <Route path="/travel-news/:slug" element={<TravelNewsArticlePage />} />
            
            {/* Cruise Guides - Published */}
            <Route path="/cruise-guides" element={<CruiseGuidesPage />} />
            <Route path="/cruise-guides/:slug" element={<CruiseGuideDetailPage />} />
            
            {/* Port Guides - Published (20 ports live) */}
            <Route path="/ports" element={<PortsPage />} />
            <Route path="/ports/region/:slug" element={<PortRegionPage />} />
            <Route path="/ports/:slug" element={<PortGuidePage />} />
            
            {/* Legal Pages - Always Public */}
            <Route path="/website-terms" element={<WebsiteTerms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/booking-terms" element={<BookingTerms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/price-match-guarantee" element={<PriceMatchGuarantee />} />

            {/* 404 - Catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </div>
      {!isMaintenanceHome && !pathname.startsWith('/cruise/') && <Footer />}
      {/* Deferred UI - loaded after LCP for better mobile performance */}
      {/* These components load only after requestIdleCallback or 3s timeout */}
      <DeferredUI>
        <CookieConsent />
      </DeferredUI>
      <DeferredUI>
        <FloatingWhatsApp />
      </DeferredUI>
      {/* ImageDebugger only in development */}
      {ImageDebugger && (
        <DeferredUI>
          <ImageDebugger />
        </DeferredUI>
      )}
      <DevModeIndicator />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
