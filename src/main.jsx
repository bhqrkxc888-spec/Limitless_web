import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { initPerformanceMonitoring } from './services/performanceMonitoring'
import { logError } from './services/errorTracking'

// Initialize performance monitoring
initPerformanceMonitoring();

// Global error handler - catches unhandled errors
window.addEventListener('error', (event) => {
  logError(event.error || event.message, {
    errorType: 'javascript',
    severity: 'error',
    context: {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  }).catch(() => {
    // Silently fail if error tracking fails
  });
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, {
    errorType: 'javascript',
    severity: 'error',
    context: {
      type: 'unhandled_promise_rejection'
    }
  }).catch(() => {
    // Silently fail if error tracking fails
  });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
