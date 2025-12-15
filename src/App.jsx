import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { analyzePageSEO } from './services/seoMonitoring'

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CookieConsent from './components/CookieConsent'

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'

// Public Pages
import HomePage from './pages/HomePage'
import FindCruisePage from './pages/FindCruisePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import CruiseLinesPage from './pages/CruiseLinesPage'
import DestinationsPage from './pages/DestinationsPage'
import BucketListPage from './pages/BucketListPage'
import OffersPage from './pages/OffersPage'
import OfferPage from './pages/OfferPage'
import TravelNewsPage from './pages/TravelNewsPage'
import TravelNewsArticlePage from './pages/TravelNewsArticlePage'
import TravelNewsCategoryPage from './pages/TravelNewsCategoryPage'
import TravelNewsTagPage from './pages/TravelNewsTagPage'
import NotFoundPage from './pages/NotFoundPage'

// Legal Pages
import WebsiteTerms from './pages/WebsiteTerms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BookingTerms from './pages/BookingTerms'
import CookiePolicy from './pages/CookiePolicy'

// Template Pages (Dynamic Routes)
import CruiseLinePage from './templates/CruiseLinePage'
import DestinationPage from './templates/DestinationPage'
import CategoryPage from './templates/CategoryPage'
import BucketListExperiencePage from './templates/BucketListExperiencePage'

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
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </BrowserRouter>
      )
}

export default App
