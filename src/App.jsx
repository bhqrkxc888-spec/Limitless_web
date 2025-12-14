import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
