/**
 * Admin Analytics Page
 * 
 * Displays traffic analytics, conversion tracking, and business metrics
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Eye,
  MousePointerClick,
  MapPin,
  Monitor,
  Smartphone,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  Ship,
  FileText
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminAnalytics() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [stats, setStats] = useState({
    // Business Metrics
    totalQuotes: 0,
    quotesThisWeek: 0,
    quotesGrowth: 0,
    popularDestinations: [],
    popularCruiseLines: [],
    topArticles: [],
    topOffers: [],
    
    // Conversion Metrics
    formSubmissions: 0,
    phoneClicks: 0,
    emailClicks: 0,
    whatsappClicks: 0,
    cruiseSearches: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('7d'); // 7d, 30d, 90d

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      // Calculate date ranges
      const now = new Date();
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
      const _sinceDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
      const _prevPeriodDate = new Date(now.getTime() - days * 2 * 24 * 60 * 60 * 1000).toISOString();
      
      // Fetch quotes from contact submissions (if you have this table)
      // For now, we'll use placeholder data structure
      const businessMetrics = {
        totalQuotes: 0,
        quotesThisWeek: 0,
        quotesGrowth: 0,
        popularDestinations: [
          { name: 'Caribbean', count: 0 },
          { name: 'Mediterranean', count: 0 },
          { name: 'Northern Europe', count: 0 },
          { name: 'Alaska', count: 0 },
          { name: 'Asia', count: 0 }
        ],
        popularCruiseLines: [
          { name: 'Royal Caribbean', count: 0 },
          { name: 'MSC Cruises', count: 0 },
          { name: 'P&O Cruises', count: 0 },
          { name: 'Celebrity Cruises', count: 0 },
          { name: 'Princess Cruises', count: 0 }
        ],
        topArticles: [],
        topOffers: [],
        formSubmissions: 0,
        phoneClicks: 0,
        emailClicks: 0,
        whatsappClicks: 0,
        cruiseSearches: 0
      };

      setStats(businessMetrics);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching analytics data:', err);
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

  const formatGrowth = (growth) => {
    const absGrowth = Math.abs(growth);
    return `${growth >= 0 ? '+' : ''}${absGrowth.toFixed(1)}%`;
  };

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchData}
      isRefreshing={isRefreshing}
    >
      <div className="admin-analytics">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Analytics & Insights</h1>
            <p className="admin-page-subtitle">
              Track traffic, conversions, and business performance
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
              className={`admin-btn admin-btn-ghost ${timeframe === '30d' ? 'active' : ''}`}
              onClick={() => setTimeframe('30d')}
            >
              30 Days
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
            <p>Loading analytics data...</p>
          </div>
        ) : (
          <>
            {/* Integration Notice */}
            <div className="admin-card admin-integration-notice">
              <h3>🚀 Analytics Ready</h3>
              <p>
                <strong>Vercel Analytics</strong> is now installed and tracking page views in real-time.
              </p>
              <p>
                <strong>Google Analytics 4</strong> is configured. Replace <code>G-XXXXXXXXXX</code> in <code>index.html</code> with your GA4 property ID.
              </p>
              <p>
                Visit the <a href="https://vercel.com/limitless-cruises/analytics" target="_blank" rel="noopener noreferrer">
                  Vercel Dashboard <ExternalLink size={14} />
                </a> to view detailed traffic analytics.
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <TrendingUp size={20} />
                  <span className="admin-stat-label">Quote Requests</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.quotesThisWeek)}</div>
                <div className="admin-stat-footer">
                  <span className={`admin-stat-growth ${stats.quotesGrowth >= 0 ? 'positive' : 'negative'}`}>
                    {stats.quotesGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {formatGrowth(stats.quotesGrowth)}
                  </span>
                  <span className="admin-stat-period">vs previous period</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <Mail size={20} />
                  <span className="admin-stat-label">Form Submissions</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.formSubmissions)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Contact & price match forms</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <Phone size={20} />
                  <span className="admin-stat-label">Phone Clicks</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.phoneClicks)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Call intent signals</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <MessageCircle size={20} />
                  <span className="admin-stat-label">WhatsApp Opens</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.whatsappClicks)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Chat engagement</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <Ship size={20} />
                  <span className="admin-stat-label">Cruise Searches</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.cruiseSearches)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Widget interactions</span>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <FileText size={20} />
                  <span className="admin-stat-label">Article Views</span>
                </div>
                <div className="admin-stat-value">{formatNumber(stats.topArticles.length)}</div>
                <div className="admin-stat-footer">
                  <span className="admin-stat-period">Travel news engagement</span>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="admin-analytics-row">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    <MapPin size={18} />
                    Popular Destinations
                  </h2>
                </div>
                <div className="admin-list">
                  {stats.popularDestinations.map((dest, idx) => (
                    <div key={idx} className="admin-list-item">
                      <div className="admin-list-item-content">
                        <span className="admin-list-rank">#{idx + 1}</span>
                        <span className="admin-list-name">{dest.name}</span>
                      </div>
                      <div className="admin-list-item-meta">
                        <span className="admin-list-count">{dest.count} views</span>
                        <div className="admin-list-bar">
                          <div 
                            className="admin-list-bar-fill" 
                            style={{ width: `${(dest.count / (stats.popularDestinations[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    <Ship size={18} />
                    Popular Cruise Lines
                  </h2>
                </div>
                <div className="admin-list">
                  {stats.popularCruiseLines.map((line, idx) => (
                    <div key={idx} className="admin-list-item">
                      <div className="admin-list-item-content">
                        <span className="admin-list-rank">#{idx + 1}</span>
                        <span className="admin-list-name">{line.name}</span>
                      </div>
                      <div className="admin-list-item-meta">
                        <span className="admin-list-count">{line.count} views</span>
                        <div className="admin-list-bar">
                          <div 
                            className="admin-list-bar-fill" 
                            style={{ width: `${(line.count / (stats.popularCruiseLines[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">Next Steps: Complete Analytics Setup</h2>
              </div>
              <div className="admin-setup-steps">
                <div className="admin-setup-step">
                  <div className="admin-setup-step-number">1</div>
                  <div className="admin-setup-step-content">
                    <h3>Configure Google Analytics 4</h3>
                    <p>Create a GA4 property at <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">analytics.google.com <ExternalLink size={12} /></a></p>
                    <p>Replace <code>G-XXXXXXXXXX</code> in <code>index.html</code> with your Measurement ID</p>
                  </div>
                </div>

                <div className="admin-setup-step">
                  <div className="admin-setup-step-number">2</div>
                  <div className="admin-setup-step-content">
                    <h3>Set Up Google Search Console</h3>
                    <p>Verify your site at <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">search.google.com/search-console <ExternalLink size={12} /></a></p>
                    <p>Enable the API and add credentials to track search rankings</p>
                  </div>
                </div>

                <div className="admin-setup-step">
                  <div className="admin-setup-step-number">3</div>
                  <div className="admin-setup-step-content">
                    <h3>Track Conversions</h3>
                    <p>Add event tracking to forms, buttons, and key actions</p>
                    <p>Monitor phone clicks, email clicks, and form submissions automatically</p>
                  </div>
                </div>

                <div className="admin-setup-step">
                  <div className="admin-setup-step-number">4</div>
                  <div className="admin-setup-step-content">
                    <h3>Set Up UptimeRobot (Optional)</h3>
                    <p>Create free account at <a href="https://uptimerobot.com" target="_blank" rel="noopener noreferrer">uptimerobot.com <ExternalLink size={12} /></a></p>
                    <p>Monitor site uptime and get alerts for downtime</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-analytics {
          max-width: 1400px;
        }

        .admin-integration-notice {
          background: linear-gradient(135deg, rgba(79, 140, 255, 0.1) 0%, rgba(79, 140, 255, 0.05) 100%);
          border: 1px solid rgba(79, 140, 255, 0.3);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .admin-integration-notice h3 {
          color: var(--admin-text);
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
        }

        .admin-integration-notice p {
          color: var(--admin-text-muted);
          margin: 0.5rem 0;
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .admin-integration-notice code {
          background: var(--admin-bg-tertiary);
          padding: 0.125rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          color: var(--admin-warning);
        }

        .admin-integration-notice a {
          color: var(--admin-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .admin-integration-notice a:hover {
          text-decoration: underline;
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

        .admin-analytics-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .admin-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .admin-list-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-list-rank {
          font-weight: 700;
          color: var(--admin-text-dim);
          font-size: 0.875rem;
          min-width: 28px;
        }

        .admin-list-name {
          color: var(--admin-text);
          font-weight: 500;
        }

        .admin-list-item-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.375rem;
          min-width: 120px;
        }

        .admin-list-count {
          font-size: 0.8125rem;
          color: var(--admin-text-muted);
        }

        .admin-list-bar {
          width: 100%;
          height: 4px;
          background: var(--admin-bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }

        .admin-list-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--admin-primary), var(--admin-primary-light));
          border-radius: 2px;
          transition: width 0.3s ease;
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

          .admin-analytics-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminAnalytics;

