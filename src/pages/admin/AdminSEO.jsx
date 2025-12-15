/**
 * Admin SEO Page
 * 
 * View SEO scores and issues for all pages
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search,
  ExternalLink,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminSEO() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [pageMetrics, setPageMetrics] = useState({});
  
  // Filters
  const [scoreFilter, setScoreFilter] = useState('all');
  const [issuesFilter, setIssuesFilter] = useState('all');
  
  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const fetchSEOData = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      let query = supabase
        .from('website_seo_pages')
        .select('*')
        .order('overall_score', { ascending: true });
      
      // Apply filters
      if (scoreFilter === 'good') {
        query = query.gte('overall_score', 80);
      } else if (scoreFilter === 'medium') {
        query = query.gte('overall_score', 50).lt('overall_score', 80);
      } else if (scoreFilter === 'poor') {
        query = query.lt('overall_score', 50);
      }
      
      if (issuesFilter === 'with-issues') {
        query = query.gt('issues_count', 0);
      } else if (issuesFilter === 'no-issues') {
        query = query.eq('issues_count', 0);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setPages(data || []);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching SEO data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [scoreFilter, issuesFilter]);

  const fetchPageMetrics = useCallback(async (pagePath) => {
    if (!supabase || pageMetrics[pagePath]) return;
    
    try {
      const { data, error } = await supabase
        .from('website_seo_metrics')
        .select('*')
        .eq('page_path', pagePath)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      setPageMetrics(prev => ({
        ...prev,
        [pagePath]: data || []
      }));
    } catch (err) {
      console.error('Error fetching page metrics:', err);
    }
  }, [pageMetrics]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSEOData();
      
      const interval = setInterval(fetchSEOData, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchSEOData]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleRowExpand = (pagePath) => {
    if (expandedRow === pagePath) {
      setExpandedRow(null);
    } else {
      setExpandedRow(pagePath);
      fetchPageMetrics(pagePath);
    }
  };

  // Pagination
  const totalPages = Math.ceil(pages.length / pageSize);
  const paginatedPages = pages.slice((page - 1) * pageSize, page * pageSize);

  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'good';
    if (score >= 50) return 'medium';
    return 'poor';
  };

  const getStatusIcon = (status) => {
    if (status === 'pass') return <CheckCircle size={14} className="admin-status-icon success" />;
    if (status === 'warning') return <AlertTriangle size={14} className="admin-status-icon warning" />;
    if (status === 'fail') return <AlertCircle size={14} className="admin-status-icon error" />;
    return <span className="admin-status-icon neutral">—</span>;
  };

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

  // Calculate stats
  const avgScore = pages.length > 0 
    ? Math.round(pages.reduce((sum, p) => sum + (p.overall_score || 0), 0) / pages.length)
    : 0;
  const pagesWithIssues = pages.filter(p => (p.issues_count || 0) > 0).length;
  const goodPages = pages.filter(p => (p.overall_score || 0) >= 80).length;

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchSEOData}
      isRefreshing={isRefreshing}
    >
      <div className="admin-seo">
        <header className="admin-page-header">
          <h1 className="admin-page-title">SEO Health</h1>
          <p className="admin-page-subtitle">
            Monitor SEO scores and issues across your pages
          </p>
        </header>

        {/* Summary Stats */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Average Score</div>
            <div className={`admin-stat-value ${getScoreClass(avgScore)}`}>
              {avgScore || '—'}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Pages</div>
            <div className="admin-stat-value">{pages.length}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Good Score (80+)</div>
            <div className="admin-stat-value success">{goodPages}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Pages with Issues</div>
            <div className={`admin-stat-value ${pagesWithIssues > 0 ? 'warning' : 'success'}`}>
              {pagesWithIssues}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">Score Range</label>
            <select 
              className="admin-select"
              value={scoreFilter}
              onChange={(e) => { setScoreFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Scores</option>
              <option value="good">Good (80+)</option>
              <option value="medium">Medium (50-79)</option>
              <option value="poor">Poor (&lt;50)</option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">Issues</label>
            <select 
              className="admin-select"
              value={issuesFilter}
              onChange={(e) => { setIssuesFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Pages</option>
              <option value="with-issues">With Issues</option>
              <option value="no-issues">No Issues</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading SEO data...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="admin-empty">
            <Search size={48} className="admin-empty-icon" />
            <h3 className="admin-empty-title">No pages found</h3>
            <p className="admin-empty-text">
              {scoreFilter !== 'all' || issuesFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'SEO data will appear here as pages are analyzed.'}
            </p>
          </div>
        ) : (
          <div className="admin-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '32px' }}></th>
                    <th>Page</th>
                    <th>Score</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Content</th>
                    <th>Links</th>
                    <th>Issues</th>
                    <th>Last Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPages.map((pageData) => (
                    <>
                      <tr 
                        key={pageData.page_path}
                        className="admin-expandable-row"
                        onClick={() => handleRowExpand(pageData.page_path)}
                      >
                        <td>
                          <ChevronDown 
                            size={16} 
                            className={`admin-expand-icon ${expandedRow === pageData.page_path ? 'expanded' : ''}`}
                          />
                        </td>
                        <td>
                          <a 
                            href={pageData.page_url || pageData.page_path} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="admin-page-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {pageData.page_path?.length > 35 
                              ? pageData.page_path.substring(0, 35) + '...'
                              : pageData.page_path}
                            <ExternalLink size={12} />
                          </a>
                        </td>
                        <td>
                          <span className={`admin-score admin-score-${getScoreClass(pageData.overall_score)}`}>
                            {pageData.overall_score || '—'}
                          </span>
                        </td>
                        <td>{getStatusIcon(pageData.title_status)}</td>
                        <td>{getStatusIcon(pageData.description_status)}</td>
                        <td>{getStatusIcon(pageData.content_status)}</td>
                        <td>{getStatusIcon(pageData.links_status)}</td>
                        <td>
                          <div className="admin-issues-count">
                            {(pageData.issues_count || 0) > 0 && (
                              <span className="admin-badge admin-badge-error">
                                {pageData.issues_count} {pageData.issues_count === 1 ? 'issue' : 'issues'}
                              </span>
                            )}
                            {(pageData.warnings_count || 0) > 0 && (
                              <span className="admin-badge admin-badge-warning">
                                {pageData.warnings_count} {pageData.warnings_count === 1 ? 'warning' : 'warnings'}
                              </span>
                            )}
                            {(pageData.issues_count || 0) === 0 && (pageData.warnings_count || 0) === 0 && (
                              <span className="admin-badge admin-badge-success">None</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="admin-table-time">
                            <Clock size={14} />
                            {formatDate(pageData.updated_at)}
                          </span>
                        </td>
                      </tr>
                      {expandedRow === pageData.page_path && (
                        <tr key={`${pageData.page_path}-expanded`}>
                          <td colSpan={9} className="admin-expanded-cell">
                            <div className="admin-expanded-content">
                              <div className="admin-seo-detail-grid">
                                <div className="admin-seo-detail">
                                  <h4>Page Title</h4>
                                  <p>{pageData.page_title || 'Not set'}</p>
                                </div>
                                <div className="admin-seo-detail">
                                  <h4>Page Type</h4>
                                  <p>{pageData.page_type || 'Unknown'}</p>
                                </div>
                                <div className="admin-seo-detail">
                                  <h4>Structured Data</h4>
                                  <p>{getStatusIcon(pageData.structured_data_status)} {pageData.structured_data_status || '—'}</p>
                                </div>
                                <div className="admin-seo-detail">
                                  <h4>Technical</h4>
                                  <p>{getStatusIcon(pageData.technical_status)} {pageData.technical_status || '—'}</p>
                                </div>
                              </div>
                              
                              {pageMetrics[pageData.page_path] && pageMetrics[pageData.page_path].length > 0 && (
                                <div className="admin-seo-metrics">
                                  <h4>Recent Metrics</h4>
                                  <div className="admin-seo-metrics-list">
                                    {pageMetrics[pageData.page_path]
                                      .filter((m, i, arr) => 
                                        arr.findIndex(x => x.metric_name === m.metric_name) === i
                                      )
                                      .slice(0, 10)
                                      .map((metric, idx) => (
                                        <div key={idx} className="admin-seo-metric-item">
                                          <span className="admin-seo-metric-name">{metric.metric_name}</span>
                                          <span className={`admin-seo-metric-status ${metric.metric_status}`}>
                                            {metric.metric_status}
                                          </span>
                                          {metric.metric_value !== null && (
                                            <span className="admin-seo-metric-value">
                                              {metric.metric_value} {metric.metric_unit}
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="admin-pagination">
                <button 
                  className="admin-pagination-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="admin-pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button 
                  className="admin-pagination-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .admin-seo {
          max-width: 1400px;
        }

        .admin-page-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--admin-primary);
          text-decoration: none;
          font-size: 0.8125rem;
        }

        .admin-page-link:hover {
          text-decoration: underline;
        }

        .admin-issues-count {
          display: flex;
          gap: 0.375rem;
          flex-wrap: wrap;
        }

        .admin-table-time {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--admin-text-muted);
          font-size: 0.75rem;
          white-space: nowrap;
        }

        .admin-status-icon {
          display: inline-flex;
        }

        .admin-status-icon.success { color: var(--admin-success); }
        .admin-status-icon.warning { color: var(--admin-warning); }
        .admin-status-icon.error { color: var(--admin-error); }
        .admin-status-icon.neutral { color: var(--admin-text-dim); }

        .admin-expanded-cell {
          padding: 0 !important;
          background: var(--admin-bg-tertiary);
        }

        .admin-seo-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .admin-seo-detail h4 {
          font-size: 0.75rem;
          color: var(--admin-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.375rem 0;
        }

        .admin-seo-detail p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--admin-text);
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .admin-seo-metrics h4 {
          font-size: 0.75rem;
          color: var(--admin-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.75rem 0;
        }

        .admin-seo-metrics-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .admin-seo-metric-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--admin-bg);
          border-radius: 6px;
          font-size: 0.8125rem;
        }

        .admin-seo-metric-name {
          color: var(--admin-text);
          flex: 1;
        }

        .admin-seo-metric-status {
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-size: 0.6875rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .admin-seo-metric-status.pass {
          background: rgba(52, 211, 153, 0.15);
          color: var(--admin-success);
        }

        .admin-seo-metric-status.warning {
          background: rgba(251, 191, 36, 0.15);
          color: var(--admin-warning);
        }

        .admin-seo-metric-status.fail {
          background: rgba(248, 113, 113, 0.15);
          color: var(--admin-error);
        }

        .admin-seo-metric-status.info {
          background: rgba(79, 140, 255, 0.15);
          color: var(--admin-primary);
        }

        .admin-seo-metric-value {
          color: var(--admin-text-dim);
          font-size: 0.75rem;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminSEO;

