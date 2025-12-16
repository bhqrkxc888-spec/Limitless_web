/**
 * Admin Errors Page
 * 
 * View and manage JavaScript errors
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminErrors() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [resolvedFilter, setResolvedFilter] = useState('all');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  const fetchErrors = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      let query = supabase
        .from('website_errors')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      // Exclude CRM errors - only show errors from the main website
      // CRM has its own error tracking, we don't want those mixed in
      query = query.not('page_url', 'like', '%crm.limitlesscruises.com%');
      
      // Apply filters
      if (typeFilter !== 'all') {
        query = query.eq('error_type', typeFilter);
      }
      if (severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }
      if (resolvedFilter !== 'all') {
        query = query.eq('resolved', resolvedFilter === 'resolved');
      }
      
      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
      
      const { data, count, error } = await query;
      
      if (error) throw error;
      
      setErrors(data || []);
      setTotalCount(count || 0);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching errors:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [typeFilter, severityFilter, resolvedFilter, page]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchErrors();
      
      const interval = setInterval(fetchErrors, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchErrors]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const markAsResolved = async (errorId) => {
    if (!supabase) return;
    
    try {
      const { error } = await supabase
        .from('website_errors')
        .update({ 
          resolved: true, 
          resolved_at: new Date().toISOString() 
        })
        .eq('id', errorId);
      
      if (error) throw error;
      
      // Refresh data from database to ensure counts and filters are correct
      await fetchErrors();
    } catch (err) {
      console.error('Error marking as resolved:', err);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchErrors}
      isRefreshing={isRefreshing}
    >
      <div className="admin-errors">
        <header className="admin-page-header">
          <h1 className="admin-page-title">Error Tracking</h1>
          <p className="admin-page-subtitle">
            Monitor and resolve JavaScript errors
          </p>
        </header>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">Type</label>
            <select 
              className="admin-select"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Types</option>
              <option value="javascript">JavaScript</option>
              <option value="api">API</option>
              <option value="network">Network</option>
              <option value="form">Form</option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">Severity</label>
            <select 
              className="admin-select"
              value={severityFilter}
              onChange={(e) => { setSeverityFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">Status</label>
            <select 
              className="admin-select"
              value={resolvedFilter}
              onChange={(e) => { setResolvedFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Status</option>
              <option value="unresolved">Unresolved</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading errors...</p>
          </div>
        ) : errors.length === 0 ? (
          <div className="admin-empty">
            <CheckCircle size={48} className="admin-empty-icon" />
            <h3 className="admin-empty-title">No errors found</h3>
            <p className="admin-empty-text">
              {typeFilter !== 'all' || severityFilter !== 'all' || resolvedFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Great job! No errors have been recorded.'}
            </p>
          </div>
        ) : (
          <div className="admin-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '32px' }}></th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Message</th>
                    <th>Page</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((error) => (
                    <>
                      <tr 
                        key={error.id}
                        className="admin-expandable-row"
                        onClick={() => setExpandedRow(expandedRow === error.id ? null : error.id)}
                      >
                        <td>
                          <ChevronDown 
                            size={16} 
                            className={`admin-expand-icon ${expandedRow === error.id ? 'expanded' : ''}`}
                          />
                        </td>
                        <td>
                          <span className="admin-table-time">
                            <Clock size={14} />
                            {formatDate(error.created_at)}
                          </span>
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-info">
                            {error.error_type}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge admin-badge-${
                            error.severity === 'critical' ? 'error' : 
                            error.severity === 'warning' ? 'warning' : 
                            error.severity === 'error' ? 'error' : 'info'
                          }`}>
                            {error.severity}
                          </span>
                        </td>
                        <td className="admin-table-message" title={error.error_message}>
                          {error.error_message?.substring(0, 60)}
                          {error.error_message?.length > 60 ? '...' : ''}
                        </td>
                        <td>
                          <span className="admin-table-page" title={error.page_path}>
                            {error.page_path?.substring(0, 30)}
                            {error.page_path?.length > 30 ? '...' : ''}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge admin-badge-${error.resolved ? 'success' : 'error'}`}>
                            {error.resolved ? 'Resolved' : 'Open'}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          {!error.resolved && (
                            <button 
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              onClick={() => markAsResolved(error.id)}
                            >
                              Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedRow === error.id && (
                        <tr key={`${error.id}-expanded`}>
                          <td colSpan={8} className="admin-expanded-cell">
                            <div className="admin-expanded-content">
                              <div className="admin-error-details">
                                <div className="admin-error-detail">
                                  <strong>Full Message:</strong>
                                  <p>{error.error_message}</p>
                                </div>
                                {error.page_path && (
                                  <div className="admin-error-detail">
                                    <strong>Page:</strong>
                                    <a 
                                      href={error.error_url || error.page_path} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="admin-error-link"
                                    >
                                      {error.page_path}
                                      <ExternalLink size={12} />
                                    </a>
                                  </div>
                                )}
                                {error.user_agent && (
                                  <div className="admin-error-detail">
                                    <strong>User Agent:</strong>
                                    <p className="admin-error-ua">{error.user_agent}</p>
                                  </div>
                                )}
                                {error.error_stack && (
                                  <div className="admin-error-detail">
                                    <strong>Stack Trace:</strong>
                                    <pre className="admin-stack-trace">{error.error_stack}</pre>
                                  </div>
                                )}
                                {error.context && Object.keys(error.context).length > 0 && (
                                  <div className="admin-error-detail">
                                    <strong>Context:</strong>
                                    <pre className="admin-stack-trace">{JSON.stringify(error.context, null, 2)}</pre>
                                  </div>
                                )}
                              </div>
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
        .admin-errors {
          max-width: 1200px;
        }

        .admin-table-message,
        .admin-table-page {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.8125rem;
        }

        .admin-table-time {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--admin-text-muted);
          font-size: 0.8125rem;
          white-space: nowrap;
        }

        .admin-expanded-cell {
          padding: 0 !important;
          background: var(--admin-bg-tertiary);
        }

        .admin-error-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-error-detail {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .admin-error-detail strong {
          font-size: 0.75rem;
          color: var(--admin-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .admin-error-detail p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--admin-text);
        }

        .admin-error-ua {
          font-size: 0.75rem !important;
          color: var(--admin-text-dim) !important;
          word-break: break-all;
        }

        .admin-error-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--admin-primary);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .admin-error-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminErrors;

