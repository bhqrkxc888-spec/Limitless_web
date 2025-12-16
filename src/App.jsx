import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { analyzePageSEO } from './services/seoMonitoring'

// Layout Components (keep these eagerly loaded for fast initial render)
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CookieConsent from './components/CookieConsent'
import FloatingWhatsApp from './components/FloatingWhatsApp'

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'

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

// Legal Pages
const WebsiteTerms = lazy(() => import('./pages/WebsiteTerms'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const BookingTerms = lazy(() => import('./pages/BookingTerms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))

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
          <Route path="/admin/errors" element={<AdminErrors />} />
          <Route path="/admin/performance" element={<AdminPerformance />} />
          <Route path="/admin/seo" element={<AdminSEO />} />
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
            
            {/* Cruise Lines - Protected */}
            <Route 
              path="/cruise-lines" 
              element={
                <ProtectedRoute>
                  <CruiseLinesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cruise-lines/:slug" 
              element={
                <ProtectedRoute>
                  <CruiseLinePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Destinations - Protected */}
            <Route 
              path="/destinations" 
              element={
                <ProtectedRoute>
                  <DestinationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/destinations/:slug" 
              element={
                <ProtectedRoute>
                  <DestinationPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Bucket List Experiences - Protected */}
            <Route 
              path="/bucket-list" 
              element={
                <ProtectedRoute>
                  <BucketListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bucket-list/:slug" 
              element={
                <ProtectedRoute>
                  <BucketListExperiencePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Cruise Types Hub - Protected */}
            <Route 
              path="/cruise-types" 
              element={
                <ProtectedRoute>
                  <CruiseTypesPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy Cruise Categories Route - Redirect to Cruise Types */}
            <Route 
              path="/cruises/:slug" 
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              } 
            />
            
            {/* FAQ & Testimonials - Protected during development */}
            <Route 
              path="/faq" 
              element={
                <ProtectedRoute>
                  <FAQPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/testimonials" 
              element={
                <ProtectedRoute>
                  <TestimonialsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Travel News - Public */}
            <Route path="/travel-news" element={<TravelNewsPage />} />
            <Route path="/travel-news/category/:category" element={<TravelNewsCategoryPage />} />
            <Route path="/travel-news/tag/:tag" element={<TravelNewsTagPage />} />
            <Route path="/travel-news/:slug" element={<TravelNewsArticlePage />} />
            
            {/* Legal Pages - Always Public */}
            <Route path="/website-terms" element={<WebsiteTerms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/booking-terms" element={<BookingTerms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* 404 - Catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
      <FloatingWhatsApp />
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
