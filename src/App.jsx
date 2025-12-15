import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { analyzePageSEO } from './services/seoMonitoring'

// Layout Components (keep these eagerly loaded for fast initial render)
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CookieConsent from './components/CookieConsent'

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
const BucketListPage = lazy(() => import('./pages/BucketListPage'))
const OffersPage = lazy(() => import('./pages/OffersPage'))
const OfferPage = lazy(() => import('./pages/OfferPage'))
const TravelNewsPage = lazy(() => import('./pages/TravelNewsPage'))
const TravelNewsArticlePage = lazy(() => import('./pages/TravelNewsArticlePage'))
const TravelNewsCategoryPage = lazy(() => import('./pages/TravelNewsCategoryPage'))
const TravelNewsTagPage = lazy(() => import('./pages/TravelNewsTagPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

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
    if (!import.meta.env.DEV) {
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
              
              {/* Offers - Protected */}
              <Route 
                path="/offers" 
                element={
                  <ProtectedRoute>
                    <OffersPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/offers/:slug" 
                element={
                  <ProtectedRoute>
                    <OfferPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin/Preview Access */}
              <Route path="/admin" element={<AdminPage />} />
              
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
              
              {/* Cruise Categories - Protected */}
              <Route 
                path="/cruises/:slug" 
                element={
                  <ProtectedRoute>
                    <CategoryPage />
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
      </div>
    </BrowserRouter>
  )
}

export default App
