/**
 * Admin Website Destinations Page
 * 
 * Manage the destination catalog (CRUD operations)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2, Eye, EyeOff, Save, X, AlertCircle } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { logger } from '../../utils/logger';

function AdminWebsiteDestinations() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ slug: '', name: '', region: '', enabled: true, sort_order: 0 });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch destinations
  const fetchDestinations = async () => {
    if (!supabase) return;
    
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('destination_catalog')
        .select('*')
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;
      setDestinations(data || []);
    } catch (err) {
      logger.error('Error fetching destinations:', err);
      setError('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && supabase) {
      fetchDestinations();
    }
  }, [isAuthenticated]);

  // Handle add destination
  const handleAdd = async () => {
    if (!formData.slug || !formData.name) {
      setError('Slug and name are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: insertError } = await supabase
        .from('destination_catalog')
        .insert({
          slug: formData.slug,
          name: formData.name,
          region: formData.region || null,
          enabled: formData.enabled,
          sort_order: formData.sort_order || destinations.length * 10 + 10
        });

      if (insertError) throw insertError;

      await fetchDestinations();
      setShowAddModal(false);
      setFormData({ slug: '', name: '', region: '', enabled: true, sort_order: 0 });
      setSuccessMessage('Destination added successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      logger.error('Error adding destination:', err);
      setError(err.message || 'Failed to add destination');
    } finally {
      setLoading(false);
    }
  };

  // Handle update destination
  const handleUpdate = async (slug, updates) => {
    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('destination_catalog')
        .update(updates)
        .eq('slug', slug);

      if (updateError) throw updateError;

      await fetchDestinations();
      setEditingId(null);
      setSuccessMessage('Destination updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      logger.error('Error updating destination:', err);
      setError(err.message || 'Failed to update destination');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete destination
  const handleDelete = async (slug) => {
    if (!confirm(`Are you sure you want to delete "${slug}"? This will also remove associated assets.`)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Delete associated assets first
      if (supabase) {
        await supabase
          .from('site_assets')
          .delete()
          .eq('entity_key', slug);
      }

      // Delete destination
      const { error: deleteError } = await supabase
        .from('destination_catalog')
        .delete()
        .eq('slug', slug);

      if (deleteError) throw deleteError;

      await fetchDestinations();
      setSuccessMessage('Destination deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      logger.error('Error deleting destination:', err);
      setError(err.message || 'Failed to delete destination');
    } finally {
      setLoading(false);
    }
  };

  // Toggle enabled status
  const toggleEnabled = async (slug, currentStatus) => {
    await handleUpdate(slug, { enabled: !currentStatus });
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

  const enabledCount = destinations.filter(d => d.enabled).length;

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={null}
      onRefresh={fetchDestinations}
      isRefreshing={loading}
    >
      <div className="admin-website-destinations">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Website Destinations</h1>
            <p className="admin-page-subtitle">
              Manage the destination catalog
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} />
            Add Destination
          </button>
        </header>

        {error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="admin-alert-close">
              <X size={16} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="admin-alert admin-alert-success" style={{ marginBottom: '1.5rem' }}>
            <MapPin size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats-grid" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Destinations</div>
            <div className="admin-stat-value">{destinations.length}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Enabled</div>
            <div className="admin-stat-value" style={{ color: 'var(--admin-success)' }}>
              {enabledCount}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Disabled</div>
            <div className="admin-stat-value" style={{ color: 'var(--admin-warning)' }}>
              {destinations.length - enabledCount}
            </div>
          </div>
        </div>

        {/* Destinations Table */}
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Slug</th>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Sort Order</th>
                  <th style={{ width: '120px' }}>Status</th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest.slug}>
                    <td>
                      <code style={{ 
                        fontSize: '0.8125rem', 
                        color: 'var(--admin-primary)',
                        background: 'var(--admin-bg-tertiary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {dest.slug}
                      </code>
                    </td>
                    <td>
                      {editingId === dest.slug ? (
                        <input
                          type="text"
                          defaultValue={dest.name}
                          className="admin-input-sm"
                          onBlur={(e) => handleUpdate(dest.slug, { name: e.target.value })}
                        />
                      ) : (
                        <strong>{dest.name}</strong>
                      )}
                    </td>
                    <td>
                      {editingId === dest.slug ? (
                        <input
                          type="text"
                          defaultValue={dest.region || ''}
                          className="admin-input-sm"
                          onBlur={(e) => handleUpdate(dest.slug, { region: e.target.value || null })}
                        />
                      ) : (
                        <span style={{ color: 'var(--admin-text-muted)' }}>{dest.region || '—'}</span>
                      )}
                    </td>
                    <td>
                      {editingId === dest.slug ? (
                        <input
                          type="number"
                          defaultValue={dest.sort_order}
                          className="admin-input-sm"
                          style={{ width: '80px' }}
                          onBlur={(e) => handleUpdate(dest.slug, { sort_order: parseInt(e.target.value) || 0 })}
                        />
                      ) : (
                        <span style={{ color: 'var(--admin-text-muted)' }}>{dest.sort_order}</span>
                      )}
                    </td>
                    <td>
                      {dest.enabled ? (
                        <span className="admin-badge admin-badge-success">
                          <Eye size={14} />
                          Enabled
                        </span>
                      ) : (
                        <span className="admin-badge admin-badge-warning">
                          <EyeOff size={14} />
                          Disabled
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {editingId === dest.slug ? (
                          <button
                            onClick={() => setEditingId(null)}
                            className="admin-btn admin-btn-sm admin-btn-primary"
                          >
                            <Save size={14} />
                            Done
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingId(dest.slug)}
                            className="admin-btn admin-btn-sm admin-btn-secondary"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => toggleEnabled(dest.slug, dest.enabled)}
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          title={dest.enabled ? 'Disable' : 'Enable'}
                        >
                          {dest.enabled ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(dest.slug)}
                          className="admin-btn admin-btn-sm admin-btn-danger"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Add New Destination</h2>
                <button onClick={() => setShowAddModal(false)} className="admin-modal-close">
                  <X size={20} />
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label htmlFor="slug">Slug (URL-friendly) *</label>
                  <input
                    id="slug"
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="admin-input"
                    placeholder="mediterranean-cruises"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="admin-input"
                    placeholder="Mediterranean"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="region">Region</label>
                  <input
                    id="region"
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    className="admin-input"
                    placeholder="Europe"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="sort_order">Sort Order</label>
                  <input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    className="admin-input"
                    placeholder="0"
                  />
                </div>
                <div className="admin-form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.enabled}
                      onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                    />
                    Enabled
                  </label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setShowAddModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAdd} className="admin-btn admin-btn-primary" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Destination'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-website-destinations {
          max-width: 1400px;
        }

        .admin-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .admin-input-sm {
          width: 100%;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 4px;
          padding: 0.375rem 0.5rem;
          color: var(--admin-text-primary);
          font-size: 0.8125rem;
        }

        .admin-input-sm:focus {
          outline: none;
          border-color: var(--admin-primary);
        }

        .admin-btn-danger {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .admin-btn-danger:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .admin-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          position: relative;
        }

        .admin-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .admin-alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
        }

        .admin-alert-close {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: currentColor;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.7;
        }

        .admin-alert-close:hover {
          opacity: 1;
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
          max-width: 500px;
          width: 100%;
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
          border-radius: 4px;
          transition: all 0.2s;
        }

        .admin-modal-close:hover {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-primary);
        }

        .admin-modal-body {
          padding: 1.5rem;
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

        .admin-input {
          width: 100%;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          padding: 0.75rem;
          color: var(--admin-text-primary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .admin-input:focus {
          outline: none;
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteDestinations;
