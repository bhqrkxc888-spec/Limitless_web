import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { analyzePageSEO } from './services/seoMonitoring'

// Layout Components (keep these eagerly loaded for fast initial render)
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CookieConsent from './components/CookieConsent'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import DevModeIndicator from './components/DevModeIndicator'

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'
import PublishGate from './components/PublishGate'

// Loading fallback component
function PageLoader() {
  return (
    <div className="page-loader" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #2C344C',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p style={{ color: '#666' }}>Loading...</p>
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

// Lazy-loaded Pages (code splitting)
const HomePage = lazy(() => import('./pages/HomePage'))
const FindCruisePage = lazy(() => import('./pages/FindCruisePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const CruiseLinesPage = lazy(() => import('./pages/CruiseLinesPage'))
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'))
const CruiseTypesPage = lazy(() => import('./pages/CruiseTypesPage'))
const BucketListPage = lazy(() => import('./pages/BucketListPage'))
const OffersPage = lazy(() => import('./pages/OffersPage'))
const OfferPage = lazy(() => import('./pages/OfferPage'))
const TravelNewsPage = lazy(() => import('./pages/TravelNewsPage'))
const TravelNewsArticlePage = lazy(() => import('./pages/TravelNewsArticlePage'))
const TravelNewsCategoryPage = lazy(() => import('./pages/TravelNewsCategoryPage'))
const CruiseGuidesPage = lazy(() => import('./pages/CruiseGuidesPage'))
const CruiseGuideDetailPage = lazy(() => import('./pages/CruiseGuideDetailPage'))
const TravelNewsTagPage = lazy(() => import('./pages/TravelNewsTagPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))

// Admin Monitoring Dashboard
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminErrors = lazy(() => import('./pages/admin/AdminErrors'))
const AdminPerformance = lazy(() => import('./pages/admin/AdminPerformance'))
const AdminSEO = lazy(() => import('./pages/admin/AdminSEO'))
const AdminProjectStatus = lazy(() => import('./pages/admin/AdminProjectStatus'))
const AdminImageUpload = lazy(() => import('./pages/admin/AdminImageUpload'))
const AdminDestinationHeroes = lazy(() => import('./pages/admin/AdminDestinationHeroes'))
const AdminWebsiteAssets = lazy(() => import('./pages/admin/AdminWebsiteAssets'))
const AdminWebsiteDestinations = lazy(() => import('./pages/admin/AdminWebsiteDestinations'))

// Legal Pages
const WebsiteTerms = lazy(() => import('./pages/WebsiteTerms'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const BookingTerms = lazy(() => import('./pages/BookingTerms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const PriceMatchGuarantee = lazy(() => import('./pages/PriceMatchGuarantee'))

// Template Pages (Dynamic Routes)
const CruiseLinePage = lazy(() => import('./templates/CruiseLinePage'))
const DestinationPage = lazy(() => import('./templates/DestinationPage'))
const CategoryPage = lazy(() => import('./templates/CategoryPage'))
const BucketListExperiencePage = lazy(() => import('./templates/BucketListExperiencePage'))

// Scroll to top on route change and trigger SEO analysis
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
  
  // Admin routes have their own layout
  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Preview Access for hidden/coming-soon pages */}
          <Route path="/preview" element={<AdminPage />} />
          
          {/* Admin Monitoring Dashboard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/project-status" element={<AdminProjectStatus />} />
          <Route path="/admin/image-upload" element={<AdminImageUpload />} />
          <Route path="/admin/destination-heroes" element={<AdminDestinationHeroes />} />
          <Route path="/admin/errors" element={<AdminErrors />} />
          <Route path="/admin/performance" element={<AdminPerformance />} />
          <Route path="/admin/seo" element={<AdminSEO />} />
          {/* Admin Website Section */}
          <Route path="/admin/website/assets" element={<AdminWebsiteAssets />} />
          <Route path="/admin/website/destinations" element={<AdminWebsiteDestinations />} />
        </Routes>
      </Suspense>
    );
  }
  
  // Regular site layout with header/footer
  return (
    <div className="app">
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Pages - Always Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/find-a-cruise" element={<FindCruisePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Offers - Public */}
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/offers/:slug" element={<OfferPage />} />
            
            {/* Cruise Lines - Publish Gated */}
            <Route 
              path="/cruise-lines" 
              element={
                <PublishGate section="Cruise Lines" title="Cruise Lines" backLink="/" backLabel="Return Home">
                  <CruiseLinesPage />
                </PublishGate>
              } 
            />
            <Route 
              path="/cruise-lines/:slug" 
              element={
                <PublishGate section="Cruise Lines" title="Cruise Line Details" backLink="/cruise-lines" backLabel="View All Cruise Lines">
                  <CruiseLinePage />
                </PublishGate>
              } 
            />
            
            {/* Destinations - Publish Gated */}
            <Route 
              path="/destinations" 
              element={
                <PublishGate section="Destinations" title="Destinations" backLink="/" backLabel="Return Home">
                  <DestinationsPage />
                </PublishGate>
              } 
            />
            <Route 
              path="/destinations/:slug" 
              element={
                <PublishGate section="Destinations" title="Destination Details" backLink="/destinations" backLabel="View All Destinations">
                  <DestinationPage />
                </PublishGate>
              } 
            />
            
            {/* Bucket List Experiences - Publish Gated */}
            <Route 
              path="/bucket-list" 
              element={
                <PublishGate section="Bucket List Experiences" title="Bucket List" backLink="/" backLabel="Return Home">
                  <BucketListPage />
                </PublishGate>
              } 
            />
            <Route 
              path="/bucket-list/:slug" 
              element={
                <PublishGate section="Bucket List Experience" title="Experience Details" backLink="/bucket-list" backLabel="View All Experiences">
                  <BucketListExperiencePage />
                </PublishGate>
              } 
            />
            
            {/* Cruise Types Hub - Publish Gated */}
            <Route 
              path="/cruise-types" 
              element={
                <PublishGate section="Cruise Types" title="Cruise Types" backLink="/" backLabel="Return Home">
                  <CruiseTypesPage />
                </PublishGate>
              } 
            />
            
            {/* Legacy Cruise Categories Route - Redirect to Cruise Types */}
            <Route 
              path="/cruises/:slug" 
              element={
                <PublishGate section="Cruise Types" title="Cruise Type Details" backLink="/cruise-types" backLabel="View All Cruise Types">
                  <CategoryPage />
                </PublishGate>
              } 
            />
            
            {/* FAQ & Testimonials - Publish Gated */}
            <Route 
              path="/faq" 
              element={
                <PublishGate section="FAQ" title="Frequently Asked Questions" backLink="/" backLabel="Return Home">
                  <FAQPage />
                </PublishGate>
              } 
            />
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
            
            {/* Cruise Guides - Publish Gated */}
            <Route 
              path="/cruise-guides" 
              element={
                <PublishGate section="Cruise Guides" title="Cruise Guides" backLink="/" backLabel="Return Home">
                  <CruiseGuidesPage />
                </PublishGate>
              } 
            />
            <Route 
              path="/cruise-guides/:slug" 
              element={
                <PublishGate section="Cruise Guide" title="Cruise Guide Details" backLink="/cruise-guides" backLabel="View All Guides">
                  <CruiseGuideDetailPage />
                </PublishGate>
              } 
            />
            
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
      </main>
      <Footer />
      <CookieConsent />
      <FloatingWhatsApp />
      <DevModeIndicator />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
