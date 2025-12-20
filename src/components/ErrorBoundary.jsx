import { Component } from 'react';
import { logError } from '../services/errorTracking';
import './ErrorBoundary.css';

/**
 * ErrorBoundary Component
 * Catches React errors and provides a fallback UI
 * Prevents blank screens on unexpected errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to our error tracking service
    logError(error, {
      errorType: 'react',
      severity: 'error',
      context: {
        componentStack: errorInfo.componentStack,
        ...this.props.errorContext
      }
    }).catch(() => {
      // Silently fail if error tracking fails
    });

    // Store error details in state for display in dev mode
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    // Reset error boundary state and reload the page
    window.location.reload();
  };

  handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__message">
              We're sorry, but something unexpected happened. 
              Please try refreshing the page or return to our homepage.
            </p>
            <div className="error-boundary__actions">
              <button 
                onClick={this.handleReload}
                className="error-boundary__button error-boundary__button--primary"
              >
                Refresh Page
              </button>
              <button 
                onClick={this.handleGoHome}
                className="error-boundary__button error-boundary__button--secondary"
              >
                Go to Homepage
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details (Dev Mode Only)</summary>
                <pre className="error-boundary__stack">
                  <strong>{this.state.error.toString()}</strong>
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <p className="error-boundary__contact">
              If this problem persists, please{' '}
              <a href="/contact" className="error-boundary__link">contact us</a>
              {' '}for assistance.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

