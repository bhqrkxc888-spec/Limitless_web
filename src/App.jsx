import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Pages
import HomePage from './pages/HomePage'
import FindCruisePage from './pages/FindCruisePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CruiseLinesPage from './pages/CruiseLinesPage'

// Legal Pages
import WebsiteTerms from './pages/WebsiteTerms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BookingTerms from './pages/BookingTerms'

// Template Pages (Dynamic Routes)
import CruiseLinePage from './templates/CruiseLinePage'
import DestinationPage from './templates/DestinationPage'
import CategoryPage from './templates/CategoryPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/find-a-cruise" element={<FindCruisePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Cruise Lines */}
          <Route path="/cruise-lines" element={<CruiseLinesPage />} />
          <Route path="/cruise-lines/:slug" element={<CruiseLinePage />} />
          
          {/* Destinations */}
          <Route path="/destinations/:slug" element={<DestinationPage />} />
          
          {/* Cruise Categories */}
          <Route path="/cruises/:slug" element={<CategoryPage />} />
          
          {/* Legal Pages */}
          <Route path="/website-terms" element={<WebsiteTerms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/booking-terms" element={<BookingTerms />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
