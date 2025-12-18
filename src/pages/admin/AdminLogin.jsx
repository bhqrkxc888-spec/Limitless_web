/**
 * Admin Login Page
 * 
 * Password-protected entry point for the admin dashboard
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import './AdminLogin.css';

// Set noindex for admin login page
const useNoIndex = () => {
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
    document.title = 'Staff Login | Limitless Cruises';
  }, []);
};

function AdminLogin() {
  useNoIndex();
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAdminAuth();
  
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!password.trim()) {
      setError('Please enter a password');
      setIsSubmitting(false);
      return;
    }

    const result = await login(password, rememberMe);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Invalid password');
      setPassword('');
    }
    
    setIsSubmitting(false);
  };

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-loading">
          <div className="admin-login-spinner" />
          <p>Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <Lock size={32} />
            </div>
            <h1 className="admin-login-title">Admin Access</h1>
            <p className="admin-login-subtitle">
              Enter password to access the monitoring dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="admin-login-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-login-field">
              <label htmlFor="password" className="admin-login-label">
                Password
              </label>
              <div className="admin-login-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="admin-login-input"
                  autoFocus
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="admin-login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="admin-login-remember">
              <label className="admin-login-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="admin-login-checkbox"
                  disabled={isSubmitting}
                />
                <span>Remember me for 7 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="admin-login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="admin-login-submit-spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Limitless Cruises • Monitoring Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

