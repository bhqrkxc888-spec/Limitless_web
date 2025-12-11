import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import FindCruisePage from './pages/FindCruisePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WebsiteTerms from './pages/WebsiteTerms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BookingTerms from './pages/BookingTerms'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-a-cruise" element={<FindCruisePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/website-terms" element={<WebsiteTerms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/booking-terms" element={<BookingTerms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
