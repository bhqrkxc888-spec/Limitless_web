/**
 * Admin Dashboard Overview Page
 * 
 * Shows quick stats and summary of errors, performance, and SEO
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Activity, 
  Search, 
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  ExternalLink,
  FileText
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { isPreviewAuthenticated } from '../../config/launchConfig';

// Site pages configuration
const sitePages = [
  // Public pages
  { path: '/', name: 'Home', status: 'public', description: 'Main landing page' },
  { path: '/find-a-cruise', name: 'Find a Cruise', status: 'public', description: 'Cruise search widget' },
  { path: '/about', name: 'About', status: 'public', description: 'About us page' },
  { path: '/contact', name: 'Contact', status: 'public', description: 'Contact form' },
  { path: '/website-terms', name: 'Website Terms', status: 'public', description: 'Legal terms' },
  { path: '/privacy-policy', name: 'Privacy Policy', status: 'public', description: 'Privacy information' },
  { path: '/booking-terms', name: 'Booking Terms', status: 'public', description: 'Booking conditions' },
  { path: '/cookie-policy', name: 'Cookie Policy', status: 'public', description: 'Cookie usage' },
  
  // Hidden pages (require preview access)
  { path: '/cruise-lines', name: 'Cruise Lines', status: 'hidden', description: 'All cruise lines hub' },
  { path: '/cruise-lines/:slug', name: 'Cruise Line Detail', status: 'hidden', description: 'Individual cruise line pages' },
  { path: '/destinations', name: 'Destinations', status: 'hidden', description: 'All destinations hub' },
  { path: '/destinations/:slug', name: 'Destination Detail', status: 'hidden', description: 'Individual destination pages' },
  { path: '/bucket-list', name: 'Bucket List', status: 'hidden', description: 'Bucket list experiences hub' },
  { path: '/bucket-list/:slug', name: 'Bucket List Detail', status: 'hidden', description: 'Individual experience pages' },
  { path: '/cruise-types', name: 'Cruise Types', status: 'hidden', description: 'Types of cruises hub' },
  { path: '/offers', name: 'Offers', status: 'hidden', description: 'Current cruise offers' },
  { path: '/offers/:slug', name: 'Offer Detail', status: 'hidden', description: 'Individual offer pages' },
  { path: '/faq', name: 'FAQ', status: 'hidden', description: 'Frequently asked questions' },
  { path: '/testimonials', name: 'Testimonials', status: 'hidden', description: 'Customer reviews' },
  { path: '/travel-news', name: 'Travel News', status: 'hidden', description: 'News and articles' },
  { path: '/travel-news/:slug', name: 'News Article', status: 'hidden', description: 'Individual news articles' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [stats, setStats] = useState({
    errors24h: 0,
    unresolvedErrors: 0,
    avgLCP: 0,
    avgCLS: 0,
    avgSEOScore: 0,
    pagesWithIssues: 0,
    totalPages: 0
  });
  const [recentErrors, setRecentErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      // Fetch errors
      const { data: errors } = await supabase
        .from('website_errors')
        .select('*')
        .gte('created_at', since24h)
        .order('created_at', { ascending: false });
      
      const { data: unresolvedErrorsData } = await supabase
        .from('website_errors')
        .select('id')
        .eq('resolved', false);
      
      // Fetch performance data
      const { data: lcpData } = await supabase
        .from('website_performance')
        .select('metric_value')
        .eq('metric_name', 'LCP')
        .gte('created_at', since24h);
      
      const { data: clsData } = await supabase
        .from('website_performance')
        .select('metric_value')
        .eq('metric_name', 'CLS')
        .gte('created_at', since24h);
      
      // Fetch SEO data
      const { data: seoPages } = await supabase
        .from('website_seo_pages')
        .select('*');
      
      // Calculate stats
      const avgLCP = lcpData?.length 
        ? lcpData.reduce((sum, d) => sum + d.metric_value, 0) / lcpData.length 
        : 0;
      
      const avgCLS = clsData?.length 
        ? clsData.reduce((sum, d) => sum + d.metric_value, 0) / clsData.length 
        : 0;
      
      const avgSEOScore = seoPages?.length 
        ? seoPages.reduce((sum, p) => sum + (p.overall_score || 0), 0) / seoPages.length 
        : 0;
      
      const pagesWithIssues = seoPages?.filter(p => (p.issues_count || 0) > 0).length || 0;
      
      setStats({
        errors24h: errors?.length || 0,
        unresolvedErrors: unresolvedErrorsData?.length || 0,
        avgLCP: Math.round(avgLCP),
        avgCLS: avgCLS.toFixed(3),
        avgSEOScore: Math.round(avgSEOScore),
        pagesWithIssues,
        totalPages: seoPages?.length || 0
      });
      
      setRecentErrors((errors || []).slice(0, 5));
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      
      // Auto-refresh every 60 seconds
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
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

  const getLCPStatus = (lcp) => {
    if (lcp <= 2500) return 'success';
    if (lcp <= 4000) return 'warning';
    return 'error';
  };

  const getCLSStatus = (cls) => {
    const clsNum = parseFloat(cls);
    if (clsNum <= 0.1) return 'success';
    if (clsNum <= 0.25) return 'warning';
    return 'error';
  };

  const getSEOScoreStatus = (score) => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchData}
      isRefreshing={isRefreshing}
    >
      <div className="admin-dashboard">
        <header className="admin-page-header">
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-subtitle">
            Monitor your website&apos;s health at a glance
          </p>
        </header>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-label">Errors (24h)</div>
                <div className={`admin-stat-value ${stats.errors24h > 0 ? 'error' : 'success'}`}>
                  {stats.errors24h}
                </div>
                <div className="admin-stat-subtitle">
                  {stats.unresolvedErrors} unresolved
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-label">Avg LCP</div>
                <div className={`admin-stat-value ${getLCPStatus(stats.avgLCP)}`}>
                  {stats.avgLCP > 0 ? `${(stats.avgLCP / 1000).toFixed(2)}s` : '—'}
                </div>
                <div className="admin-stat-subtitle">
                  {stats.avgLCP <= 2500 ? 'Good' : stats.avgLCP <= 4000 ? 'Needs improvement' : 'Poor'}
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-label">Avg CLS</div>
                <div className={`admin-stat-value ${getCLSStatus(stats.avgCLS)}`}>
                  {parseFloat(stats.avgCLS) > 0 ? stats.avgCLS : '—'}
                </div>
                <div className="admin-stat-subtitle">
                  {parseFloat(stats.avgCLS) <= 0.1 ? 'Good' : parseFloat(stats.avgCLS) <= 0.25 ? 'Needs improvement' : 'Poor'}
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-label">Avg SEO Score</div>
                <div className={`admin-stat-value ${getSEOScoreStatus(stats.avgSEOScore)}`}>
                  {stats.avgSEOScore > 0 ? stats.avgSEOScore : '—'}
                </div>
                <div className="admin-stat-subtitle">
                  {stats.pagesWithIssues} pages with issues
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="admin-quick-links">
              <Link to="/admin/errors" className="admin-quick-link">
                <div className="admin-quick-link-icon errors">
                  <AlertTriangle size={24} />
                </div>
                <div className="admin-quick-link-content">
                  <h3>Error Tracking</h3>
                  <p>View and manage JavaScript errors</p>
                </div>
                <ArrowRight size={20} className="admin-quick-link-arrow" />
              </Link>

              <Link to="/admin/performance" className="admin-quick-link">
                <div className="admin-quick-link-icon performance">
                  <Activity size={24} />
                </div>
                <div className="admin-quick-link-content">
                  <h3>Performance Metrics</h3>
                  <p>Core Web Vitals and page speed</p>
                </div>
                <ArrowRight size={20} className="admin-quick-link-arrow" />
              </Link>

              <Link to="/admin/seo" className="admin-quick-link">
                <div className="admin-quick-link-icon seo">
                  <Search size={24} />
                </div>
                <div className="admin-quick-link-content">
                  <h3>SEO Health</h3>
                  <p>Page scores and optimization</p>
                </div>
                <ArrowRight size={20} className="admin-quick-link-arrow" />
              </Link>
            </div>

            {/* Recent Errors */}
            {recentErrors.length > 0 && (
              <div className="admin-card" style={{ marginTop: '2rem' }}>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">Recent Errors</h2>
                  <Link to="/admin/errors" className="admin-btn admin-btn-ghost admin-btn-sm">
                    View all <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Message</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentErrors.map((error) => (
                        <tr key={error.id}>
                          <td>
                            <span className="admin-table-time">
                              <Clock size={14} />
                              {formatTime(error.created_at)}
                            </span>
                          </td>
                          <td>
                            <span className={`admin-badge admin-badge-${error.severity === 'critical' ? 'error' : error.severity === 'warning' ? 'warning' : 'info'}`}>
                              {error.error_type}
                            </span>
                          </td>
                          <td className="admin-table-message">
                            {error.error_message?.substring(0, 80)}
                            {error.error_message?.length > 80 ? '...' : ''}
                          </td>
                          <td>
                            {error.resolved ? (
                              <CheckCircle size={16} className="admin-icon-success" />
                            ) : (
                              <XCircle size={16} className="admin-icon-error" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Site Pages Status */}
            <div className="admin-card" style={{ marginTop: '2rem' }}>
              <div className="admin-card-header">
                <h2 className="admin-card-title">
                  <FileText size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Site Pages
                </h2>
                <div className="admin-pages-actions">
                  {isPreviewAuthenticated() ? (
                    <span className="admin-badge admin-badge-success">
                      <Eye size={12} /> Preview Active
                    </span>
                  ) : (
                    <a 
                      href="/preview" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-primary admin-btn-sm"
                    >
                      <EyeOff size={14} /> Access Hidden Pages
                    </a>
                  )}
                </div>
              </div>
              
              <div className="admin-pages-summary">
                <div className="admin-pages-stat">
                  <Eye size={16} className="admin-icon-success" />
                  <span>{sitePages.filter(p => p.status === 'public').length} Public</span>
                </div>
                <div className="admin-pages-stat">
                  <EyeOff size={16} className="admin-icon-warning" />
                  <span>{sitePages.filter(p => p.status === 'hidden').length} Hidden</span>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table admin-pages-table">
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Path</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sitePages.map((page) => (
                      <tr key={page.path}>
                        <td>
                          <div className="admin-page-name">
                            <strong>{page.name}</strong>
                            <span className="admin-page-desc">{page.description}</span>
                          </div>
                        </td>
                        <td>
                          <code className="admin-page-path">{page.path}</code>
                        </td>
                        <td>
                          {page.status === 'public' ? (
                            <span className="admin-badge admin-badge-success">
                              <Eye size={12} /> Public
                            </span>
                          ) : (
                            <span className="admin-badge admin-badge-warning">
                              <EyeOff size={12} /> Hidden
                            </span>
                          )}
                        </td>
                        <td>
                          {!page.path.includes(':') && (
                            <a 
                              href={page.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-btn admin-btn-ghost admin-btn-sm"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="admin-pages-note">
                <p>
                  <strong>Note:</strong> Hidden pages show &quot;Coming Soon&quot; to visitors. 
                  Use the <a href="/preview" target="_blank" rel="noopener noreferrer">Preview Access</a> page 
                  to unlock them temporarily, or set <code>VITE_SITE_LAUNCHED=true</code> in Vercel to make all pages public.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-dashboard {
          max-width: 1200px;
        }

        .admin-quick-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .admin-quick-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          text-decoration: none;
          transition: all var(--admin-transition);
        }

        .admin-quick-link:hover {
          border-color: var(--admin-primary);
          transform: translateY(-2px);
        }

        .admin-quick-link-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .admin-quick-link-icon.errors {
          background: rgba(248, 113, 113, 0.15);
          color: var(--admin-error);
        }

        .admin-quick-link-icon.performance {
          background: rgba(251, 191, 36, 0.15);
          color: var(--admin-warning);
        }

        .admin-quick-link-icon.seo {
          background: rgba(79, 140, 255, 0.15);
          color: var(--admin-primary);
        }

        .admin-quick-link-content {
          flex: 1;
        }

        .admin-quick-link-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text);
          margin: 0 0 0.25rem 0;
        }

        .admin-quick-link-content p {
          font-size: 0.875rem;
          color: var(--admin-text-muted);
          margin: 0;
        }

        .admin-quick-link-arrow {
          color: var(--admin-text-muted);
          transition: transform var(--admin-transition);
        }

        .admin-quick-link:hover .admin-quick-link-arrow {
          transform: translateX(4px);
          color: var(--admin-primary);
        }

        .admin-table-time {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--admin-text-muted);
          font-size: 0.8125rem;
        }

        .admin-table-message {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .admin-icon-success {
          color: var(--admin-success);
        }

        .admin-icon-error {
          color: var(--admin-error);
        }

        .admin-icon-warning {
          color: var(--admin-warning);
        }

        /* Site Pages Section */
        .admin-pages-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-pages-summary {
          display: flex;
          gap: 1.5rem;
          padding: 1rem;
          background: var(--admin-bg-tertiary);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .admin-pages-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--admin-text);
        }

        .admin-pages-table .admin-page-name {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .admin-pages-table .admin-page-name strong {
          color: var(--admin-text);
          font-weight: 500;
        }

        .admin-pages-table .admin-page-desc {
          font-size: 0.75rem;
          color: var(--admin-text-dim);
        }

        .admin-page-path {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--admin-bg-tertiary);
          border-radius: 4px;
          color: var(--admin-text-muted);
        }

        .admin-pages-note {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(79, 140, 255, 0.1);
          border: 1px solid rgba(79, 140, 255, 0.2);
          border-radius: 8px;
        }

        .admin-pages-note p {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--admin-text-muted);
          line-height: 1.5;
        }

        .admin-pages-note a {
          color: var(--admin-primary);
          text-decoration: none;
        }

        .admin-pages-note a:hover {
          text-decoration: underline;
        }

        .admin-pages-note code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          background: var(--admin-bg-tertiary);
          border-radius: 4px;
          color: var(--admin-warning);
        }

        .admin-badge svg {
          margin-right: 0.25rem;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminDashboard;

