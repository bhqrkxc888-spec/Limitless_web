/**
 * Admin Website Legal Page
 * 
 * Legal Documents Management - view, edit and manage legal pages
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, FileText, Edit2, Save, X, AlertCircle } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { logger } from '../../utils/logger';

function AdminWebsiteLegal() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDoc, setEditingDoc] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch legal documents from Supabase
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('web.site_documents')
        .select('*')
        .order('slug', { ascending: true });

      if (fetchError) throw fetchError;

      setDocuments(data || []);
    } catch (err) {
      logger.error('Error fetching legal documents:', err);
      setError('Failed to load legal documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && supabase) {
      fetchDocuments();
    }
  }, [isAuthenticated]);

  const handleEdit = (doc) => {
    setEditingDoc({
      ...doc,
      editedTitle: doc.title,
      editedContent: doc.content
    });
  };

  const handleCancel = () => {
    setEditingDoc(null);
  };

  const handleSave = async () => {
    if (!editingDoc) return;

    try {
      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('web.site_documents')
        .update({
          title: editingDoc.editedTitle,
          content: editingDoc.editedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingDoc.id);

      if (updateError) throw updateError;

      // Refresh documents list
      await fetchDocuments();
      setEditingDoc(null);
      
      logger.info(`Updated legal document: ${editingDoc.slug}`);
    } catch (err) {
      logger.error('Error saving legal document:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
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

  const getPreviewUrl = (slug) => {
    const routeMap = {
      'website-terms': '/website-terms',
      'privacy-policy': '/privacy-policy',
      'booking-terms': '/booking-terms',
      'cookie-policy': '/cookie-policy',
      'price-match-guarantee': '/price-match-guarantee'
    };
    return `${window.location.origin}${routeMap[slug] || `/${slug}`}`;
  };

  const getStatusBadge = (doc) => {
    // Check if content is from database or still hard-coded
    return doc.content && doc.content.includes('<h2>') 
      ? { label: 'Database', className: 'admin-badge-success' }
      : { label: 'Hard-coded', className: 'admin-badge-warning' };
  };

  const publishedCount = documents.filter(doc => doc.status === 'published').length;

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={null}
      onRefresh={fetchDocuments}
      isRefreshing={loading}
    >
      <div className="admin-website-legal">
        <header className="admin-page-header">
          <h1 className="admin-page-title">Website Legal</h1>
          <p className="admin-page-subtitle">
            Manage legal documents and policies
          </p>
        </header>

        {error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Summary Stats */}
        <div className="admin-stats-grid" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Documents</div>
            <div className="admin-stat-value">{documents.length}</div>
            <div className="admin-stat-subtitle">legal pages</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Published</div>
            <div className="admin-stat-value" style={{ color: 'var(--admin-success)' }}>
              {publishedCount}
            </div>
            <div className="admin-stat-subtitle">active documents</div>
          </div>
        </div>

        {/* Legal Documents Table */}
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && documents.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      Loading documents...
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      No legal documents found. Please run migrations.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => {
                    const statusBadge = getStatusBadge(doc);
                    return (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={18} style={{ color: 'var(--admin-text-muted)' }} />
                            <strong>{doc.title}</strong>
                          </div>
                        </td>
                        <td>
                          <code style={{ 
                            fontSize: '0.8125rem', 
                            color: 'var(--admin-primary)',
                            background: 'var(--admin-bg-tertiary)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px'
                          }}>
                            {doc.slug}
                          </code>
                        </td>
                        <td>
                          <span className={`admin-badge ${statusBadge.className}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                            {new Date(doc.updated_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleEdit(doc)}
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem'
                              }}
                            >
                              <Edit2 size={14} />
                              Edit
                            </button>
                            <a
                              href={getPreviewUrl(doc.slug)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                textDecoration: 'none'
                              }}
                            >
                              <ExternalLink size={14} />
                              Preview
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editor Modal */}
        {editingDoc && (
          <div className="admin-modal-overlay" onClick={handleCancel}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Edit Legal Document</h2>
                <button
                  onClick={handleCancel}
                  className="admin-modal-close"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label htmlFor="doc-title">Document Title</label>
                  <input
                    id="doc-title"
                    type="text"
                    value={editingDoc.editedTitle}
                    onChange={(e) => setEditingDoc({
                      ...editingDoc,
                      editedTitle: e.target.value
                    })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="doc-content">Content (HTML)</label>
                  <textarea
                    id="doc-content"
                    value={editingDoc.editedContent}
                    onChange={(e) => setEditingDoc({
                      ...editingDoc,
                      editedContent: e.target.value
                    })}
                    className="admin-textarea"
                    rows={20}
                    style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  />
                  <small style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', display: 'block' }}>
                    Use HTML tags for formatting. Changes will be visible on the public page immediately after saving.
                  </small>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  onClick={handleCancel}
                  className="admin-btn admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="admin-loading-spinner" style={{ width: 16, height: 16 }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-website-legal {
          max-width: 1400px;
        }

        code {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        }

        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .admin-modal {
          background: var(--admin-bg-secondary);
          border-radius: 8px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .admin-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--admin-text-primary);
        }

        .admin-modal-close {
          background: none;
          border: none;
          color: var(--admin-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .admin-modal-close:hover {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-primary);
        }

        .admin-modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .admin-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.5rem;
          border-top: 1px solid var(--admin-border);
        }

        .admin-form-group {
          margin-bottom: 1.5rem;
        }

        .admin-form-group:last-child {
          margin-bottom: 0;
        }

        .admin-form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--admin-text-primary);
          margin-bottom: 0.5rem;
        }

        .admin-input,
        .admin-textarea {
          width: 100%;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          padding: 0.75rem;
          color: var(--admin-text-primary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .admin-input:focus,
        .admin-textarea:focus {
          outline: none;
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .admin-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .admin-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
        }

        .admin-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .admin-badge-success {
          background: rgba(34, 197, 94, 0.1);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteLegal;
