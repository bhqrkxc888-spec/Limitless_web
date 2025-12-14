import { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Button } from './ui';
import './PreviewGate.css';

/**
 * PreviewGate Component
 * Password-protected preview mode for protected routes
 * Only shows when site is not fully launched
 */
function PreviewGate({ onSuccess, showGate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  // Get preview password from env var (or use default for development)
  const previewPassword = import.meta.env.VITE_PREVIEW_PASSWORD || 'preview2025';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    // Simple password check
    if (password === previewPassword) {
      // Store in sessionStorage (clears on browser close - more secure than localStorage)
      sessionStorage.setItem('limitless_preview_authenticated', 'true');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setIsChecking(false);
    }
  };

  if (!showGate) {
    return null;
  }

  return (
    <div className="preview-gate-overlay">
      <div className="preview-gate-modal">
        <div className="preview-gate-header">
          <h2>Preview Access Required</h2>
          <p>This section is not yet publicly available. Enter the preview password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="preview-gate-form">
          <div className="preview-gate-input-group">
            <label htmlFor="preview-password">Password</label>
            <input
              id="preview-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter preview password"
              autoFocus
              disabled={isChecking}
            />
            {error && <div className="preview-gate-error">{error}</div>}
          </div>

          <div className="preview-gate-actions">
            <Button type="submit" variant="primary" disabled={isChecking || !password}>
              {isChecking ? 'Checking...' : 'Access Preview'}
            </Button>
          </div>
        </form>

        <div className="preview-gate-footer">
          <p>
            <a href="/">Return to Homepage</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreviewGate;

