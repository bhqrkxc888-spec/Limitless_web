/**
 * Admin Search Console Page
 * 
 * Displays Google Search Console data - rankings, impressions, clicks, CTR
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Search,
  Eye,
  MousePointerClick,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminSearchConsole() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalImpressions: 0,
    avgCTR: 0,
    avgPosition: 0,
    clicksChange: 0,
    impressionsChange: 0,
    topQueries: [],
    topPages: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('28d'); // 7d, 28d, 90d

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      // TODO: Implement Google Search Console API integration
      // For now, showing placeholder structure
      // Note: timeframe will be used to filter data once API is integrated
      console.log('Fetching data for timeframe:', timeframe);
      
      const placeholderStats = {
        totalClicks: 0,
        totalImpressions: 0,
        avgCTR: 0,
        avgPosition: 0,
        clicksChange: 0,
        impressionsChange: 0,
        topQueries: [],
        topPages: []
      };

      setStats(placeholderStats);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching search console data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [timeframe]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="admin-layout" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f1117'
      }}>
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPercent = (num) => {
    return (num * 100).toFixed(1) + '%';
  };

  const formatPosition = (pos) => {
    return pos.toFixed(1);
  };

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchData}
      isRefreshing={isRefreshing}
    >
      <div className="admin-search-console">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Search Console</h1>
            <p className="admin-page-subtitle">
              Track search rankings, impressions, and click-through rates
            </p>
          </div>
          
          <div className="admin-timeframe-selector">
            <button 
              className={`admin-btn admin-btn-ghost ${timeframe === '7d' ? 'active' : ''}`}
              onClick={() => setTimeframe('7d')}
            >
              7 Days
            </button>
            <button 
              className={`admin-btn admin-btn-ghost ${timeframe === '28d' ? 'active' : ''}`}
              onClick={() => setTimeframe('28d')}
            >
              28 Days
            </button>
            <button 
              className={`admin-btn admin-btn-ghost ${timeframe === '90d' ? 'active' : ''}`}
              onClick={() => setTimeframe('90d')}
            >
              90 Days
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading search console data...</p>
          </div>
        ) : (
          <>
            {/* Quick Access */}
            <div className="admin-card admin-setup-notice">
              <h3>🔍 Google Search Console</h3>
              <p>
                Your site is verified and tracking. View detailed search performance data directly in Google Search Console.
              </p>
              <div className="admin-setup-actions">
                <a 
                  href="https://search.google.com/search-console?resource_id=sc-domain%3Alimitlesscruises.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-primary"
                >
                  Open Search Console <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <MousePointerClick size={20} />
                  <span className="admin-stat-label">Total Clicks</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.totalClicks)}</div>
                <div className="admin-stat-footer">
                  <span className={`admin-stat-growth ${stats.clicksChange >= 0 ? 'positive' : 'negative'}`}>
                    {stats.clicksChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(stats.clicksChange).toFixed(1)}%
                  </span>
                  <span className="admin-stat-period">vs previous period</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <Eye size={20} />
                  <span className="admin-stat-label">Impressions</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.totalImpressions)}</div>
                <div className="admin-stat-footer">
                  <span className={`admin-stat-growth ${stats.impressionsChange >= 0 ? 'positive' : 'negative'}`}>
                    {stats.impressionsChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(stats.impressionsChange).toFixed(1)}%
                  </span>
                  <span className="admin-stat-period">vs previous period</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <BarChart3 size={20} />
                  <span className="admin-stat-label">Avg CTR</span>
                </div>
                <div className="admin-stat-value">{formatPercent(stats.avgCTR)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Click-through rate</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <TrendingUp size={20} />
                  <span className="admin-stat-label">Avg Position</span>
                </div>
                <div className="admin-stat-value">{formatPosition(stats.avgPosition || 0)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Average rank in results</span>
                </div>
              </div>
            </div>

          </>
        )}
      </div>

      <style>{`
        .admin-search-console {
          max-width: 1200px;
        }

        .admin-setup-notice {
          background: linear-gradient(135deg, rgba(79, 140, 255, 0.1) 0%, rgba(79, 140, 255, 0.05) 100%);
          border: 1px solid rgba(79, 140, 255, 0.3);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .admin-setup-notice h3 {
          color: var(--admin-text);
          margin: 0 0 0.75rem 0;
          font-size: 1.125rem;
        }

        .admin-setup-notice p {
          color: var(--admin-text-muted);
          margin: 0 0 1rem 0;
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .admin-setup-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .admin-timeframe-selector {
          display: flex;
          gap: 0.5rem;
          background: var(--admin-bg-secondary);
          padding: 0.25rem;
          border-radius: 8px;
        }

        .admin-timeframe-selector .admin-btn {
          min-width: 80px;
        }

        .admin-timeframe-selector .admin-btn.active {
          background: var(--admin-primary);
          color: white;
        }

        .admin-stat-card {
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .admin-stat-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-text-muted);
          margin-bottom: 0.75rem;
        }

        .admin-stat-header svg {
          color: var(--admin-primary);
        }

        .admin-stat-label {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .admin-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--admin-text);
          margin-bottom: 0.5rem;
        }

        .admin-stat-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
        }

        .admin-stat-growth {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
        }

        .admin-stat-growth.positive {
          color: var(--admin-success);
        }

        .admin-stat-growth.negative {
          color: var(--admin-error);
        }

        .admin-stat-period {
          color: var(--admin-text-dim);
        }

        .admin-setup-steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .admin-setup-step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .admin-setup-step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--admin-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .admin-setup-step-content h3 {
          color: var(--admin-text);
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .admin-setup-step-content p {
          color: var(--admin-text-muted);
          font-size: 0.875rem;
          margin: 0.25rem 0;
          line-height: 1.5;
        }

        .admin-setup-step-content ul {
          margin: 0.5rem 0;
          padding-left: 1.25rem;
        }

        .admin-setup-step-content li {
          color: var(--admin-text-muted);
          font-size: 0.875rem;
          margin: 0.25rem 0;
        }

        .admin-setup-step-content a {
          color: var(--admin-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .admin-setup-step-content a:hover {
          text-decoration: underline;
        }

        .admin-setup-step-content code {
          background: var(--admin-bg-tertiary);
          padding: 0.125rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8125rem;
          color: var(--admin-warning);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        @media (max-width: 768px) {
          .admin-page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .admin-timeframe-selector {
            width: 100%;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminSearchConsole;

