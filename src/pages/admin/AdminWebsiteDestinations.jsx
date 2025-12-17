/**
 * Admin Website Destinations Page
 * 
 * Manage website destinations content
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { destinations as initialDestinations } from '../../config/destinations';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminWebsiteDestinations() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  // State for destinations (with enabled flag and optional region)
  const [destinations, setDestinations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    region: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Initialize destinations from config with enabled flag
  useEffect(() => {
    const destinationsWithState = initialDestinations.map(dest => ({
      ...dest,
      enabled: true,
      region: null // Existing destinations don't have region
    }));
    setDestinations(destinationsWithState);
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Validate slug: lowercase, hyphenated, no spaces
  const validateSlug = (slug) => {
    if (!slug) return 'Slug is required';
    if (slug !== slug.toLowerCase()) return 'Slug must be lowercase';
    if (slug.includes(' ')) return 'Slug cannot contain spaces';
    if (!/^[a-z0-9-]+$/.test(slug)) return 'Slug can only contain lowercase letters, numbers, and hyphens';
    if (destinations.some(d => d.slug === slug)) return 'Slug already exists';
    return null;
  };

  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name) => {
    setFormData(prev => {
      const slug = generateSlug(name);
      return { ...prev, name, slug };
    });
    // Clear slug error when name changes
    if (formErrors.slug) {
      setFormErrors(prev => ({ ...prev, slug: null }));
    }
  };

  const handleSlugChange = (slug) => {
    const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-');
    setFormData(prev => ({ ...prev, slug: normalizedSlug }));
    
    // Validate slug
    const error = validateSlug(normalizedSlug);
    setFormErrors(prev => ({ ...prev, slug: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    const slugError = validateSlug(formData.slug);
    if (slugError) {
      errors.slug = slugError;
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add new destination
    const newDestination = {
      id: Math.max(...destinations.map(d => d.id), 0) + 1,
      slug: formData.slug,
      name: formData.name.trim(),
      heroFilename: `${formData.slug}-HERO.jpg`,
      description: '',
      enabled: true,
      region: formData.region.trim() || null
    };

    setDestinations(prev => [...prev, newDestination]);
    
    // Reset form
    setFormData({ name: '', slug: '', region: '' });
    setFormErrors({});
    setShowAddForm(false);
  };

  const toggleEnabled = (id) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === id ? { ...dest, enabled: !dest.enabled } : dest
      )
    );
  };

  const getExpectedHeroFilename = (destination) => {
    // Use existing heroFilename if present, otherwise generate from slug
    // Format: destinations/{slug}-HERO.jpg
    if (destination.heroFilename) {
      // If it already includes the path, use it; otherwise add the path
      return destination.heroFilename.startsWith('destinations/')
        ? destination.heroFilename
        : `destinations/${destination.heroFilename}`;
    }
    return `destinations/${destination.slug}-HERO.jpg`;
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
      lastUpdated={null}
      onRefresh={() => {}}
      isRefreshing={false}
    >
      <div className="admin-website-destinations">
        <header className="admin-page-header">
          <div className="admin-page-header-row">
            <div>
              <h1 className="admin-page-title">Website Destinations</h1>
              <p className="admin-page-subtitle">
                Manage destination pages and content
              </p>
            </div>
            <button
              className="admin-btn admin-btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus size={16} />
              {showAddForm ? 'Cancel' : 'Add Destination'}
            </button>
          </div>
        </header>

        {/* Add Destination Form */}
        {showAddForm && (
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <h3 className="admin-card-title" style={{ marginBottom: '1rem' }}>
              Add New Destination
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Name <span style={{ color: 'var(--admin-error)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`admin-input ${formErrors.name ? 'admin-input-error' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Caribbean"
                  />
                  {formErrors.name && (
                    <span className="admin-form-error">{formErrors.name}</span>
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Slug <span style={{ color: 'var(--admin-error)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`admin-input ${formErrors.slug ? 'admin-input-error' : ''}`}
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="e.g. caribbean"
                  />
                  {formErrors.slug && (
                    <span className="admin-form-error">{formErrors.slug}</span>
                  )}
                  <span className="admin-form-hint">
                    Lowercase, hyphenated, no spaces
                  </span>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Region (optional)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="e.g. Caribbean & Americas"
                  />
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">
                  Add Destination
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', slug: '', region: '' });
                    setFormErrors({});
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Destinations Table */}
        <div className="admin-card">
          {destinations.length === 0 ? (
            <div className="admin-empty">
              <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                No destinations found
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Enabled</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Region</th>
                    <th>Expected Hero Filename</th>
                    <th>Status</th>
                    <th style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((destination) => (
                    <tr key={destination.id}>
                      <td>
                        <span className={`admin-badge admin-badge-${destination.enabled ? 'success' : 'error'}`}>
                          {destination.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <strong>{destination.name}</strong>
                      </td>
                      <td>
                        <code style={{ 
                          fontSize: '0.8125rem', 
                          color: 'var(--admin-text-muted)',
                          background: 'var(--admin-bg-tertiary)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {destination.slug}
                        </code>
                      </td>
                      <td>
                        {destination.region || '—'}
                      </td>
                      <td>
                        <code style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--admin-text-dim)',
                          background: 'var(--admin-bg-tertiary)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {getExpectedHeroFilename(destination)}
                        </code>
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '0.8125rem', 
                          color: 'var(--admin-text-muted)' 
                        }}>
                          Not checked yet
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          onClick={() => toggleEnabled(destination.id)}
                          title={destination.enabled ? 'Disable' : 'Enable'}
                        >
                          {destination.enabled ? (
                            <>
                              <ToggleRight size={14} />
                              Disable
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={14} />
                              Enable
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-website-destinations {
          max-width: 1400px;
        }

        .admin-page-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .admin-form-label {
          font-size: 0.75rem;
          color: var(--admin-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .admin-input {
          padding: 0.5rem 0.75rem;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          color: var(--admin-text);
          font-size: 0.875rem;
          transition: border-color var(--admin-transition);
        }

        .admin-input:focus {
          outline: none;
          border-color: var(--admin-primary);
        }

        .admin-input-error {
          border-color: var(--admin-error);
        }

        .admin-form-error {
          font-size: 0.75rem;
          color: var(--admin-error);
        }

        .admin-form-hint {
          font-size: 0.75rem;
          color: var(--admin-text-dim);
          font-style: italic;
        }

        .admin-form-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        code {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteDestinations;
