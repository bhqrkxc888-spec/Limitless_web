import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import './AdminOffersDebug.css';

/**
 * Admin Offers Debug Page
 * Diagnostic tool to check why offers aren't showing on the website
 */
function AdminOffersDebug() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const [crmOffers, setCrmOffers] = useState([]);
  const [publicOffers, setPublicOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      checkOffers();
    }
  }, [isAuthenticated]);

  async function checkOffers() {
    setLoading(true);
    setError(null);

    try {
      // Check 1: Try to get offers from CRM table directly (will fail if no auth)
      const { data: directData, error: directError } = await supabase
        .schema('crm')
        .from('website_offers')
        .select('id, title, status, published_at, expires_at, created_at')
        .order('created_at', { ascending: false });

      if (!directError) {
        setCrmOffers(directData || []);
      }

      // Check 2: Get offers via public RPC (what website sees)
      const { data: publicData, error: publicError } = await supabase
        .rpc('get_offers_public', {
          p_limit: 50,
          p_offset: 0
        });

      if (publicError) {
        throw publicError;
      }

      setPublicOffers(publicData?.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      draft: '#6b7280',
      published: '#10b981',
      expired: '#f59e0b',
      archived: '#6b7280',
      sold_out: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  // Show loading while checking auth
  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="admin-offers-debug" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f1117',
        color: '#e8eaed'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-offers-debug">
        <div className="debug-container">
          <h1>Offers Debug</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const draftCount = crmOffers.filter(o => o.status === 'draft').length;
  const publishedCount = crmOffers.filter(o => o.status === 'published').length;
  const expiredOffers = crmOffers.filter(o => 
    o.status === 'published' && o.expires_at && new Date(o.expires_at) < new Date()
  );

  return (
    <div className="admin-offers-debug">
      <div className="debug-container">
        <h1>🔍 Offers Debug Tool</h1>
        <p className="debug-subtitle">Diagnostic information about offers visibility</p>

        {error && (
          <div className="debug-error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="debug-summary">
          <div className="summary-card">
            <div className="summary-number">{crmOffers.length}</div>
            <div className="summary-label">Total Offers in CRM</div>
          </div>
          <div className="summary-card">
            <div className="summary-number" style={{ color: '#10b981' }}>
              {publishedCount}
            </div>
            <div className="summary-label">Published</div>
          </div>
          <div className="summary-card">
            <div className="summary-number" style={{ color: '#6b7280' }}>
              {draftCount}
            </div>
            <div className="summary-label">Draft</div>
          </div>
          <div className="summary-card">
            <div className="summary-number" style={{ color: '#3b82f6' }}>
              {publicOffers.length}
            </div>
            <div className="summary-label">Visible on Website</div>
          </div>
        </div>

        {/* Diagnosis */}
        {crmOffers.length > 0 && publicOffers.length === 0 && (
          <div className="debug-alert debug-alert--warning">
            <h3>⚠️ Problem Detected</h3>
            <p>
              You have <strong>{crmOffers.length} offer(s)</strong> in the CRM but{' '}
              <strong>0 are visible</strong> on the website.
            </p>
            {draftCount > 0 && (
              <p>
                <strong>Likely cause:</strong> {draftCount} offer(s) are in DRAFT status.
                Offers must be PUBLISHED to appear on the website.
              </p>
            )}
            {expiredOffers.length > 0 && (
              <p>
                <strong>Also:</strong> {expiredOffers.length} offer(s) have expired and won't show.
              </p>
            )}
          </div>
        )}

        {crmOffers.length === 0 && (
          <div className="debug-alert debug-alert--info">
            <h3>ℹ️ No Offers Found</h3>
            <p>There are no offers in the CRM database yet.</p>
            <p>Create your first offer in the CRM to get started.</p>
          </div>
        )}

        {publicOffers.length > 0 && (
          <div className="debug-alert debug-alert--success">
            <h3>✅ Offers Working</h3>
            <p>
              <strong>{publicOffers.length} offer(s)</strong> are successfully published and
              visible on the website.
            </p>
          </div>
        )}

        {/* CRM Offers Table */}
        {crmOffers.length > 0 && (
          <div className="debug-section">
            <h2>All Offers in CRM Database</h2>
            <div className="debug-table-wrapper">
              <table className="debug-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Published At</th>
                    <th>Expires At</th>
                    <th>Visible?</th>
                  </tr>
                </thead>
                <tbody>
                  {crmOffers.map((offer) => {
                    const isExpired = offer.expires_at && new Date(offer.expires_at) < new Date();
                    const isVisible = offer.status === 'published' && !isExpired;
                    
                    return (
                      <tr key={offer.id}>
                        <td>{offer.title}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(offer.status) }}
                          >
                            {offer.status}
                          </span>
                        </td>
                        <td>
                          {offer.published_at
                            ? new Date(offer.published_at).toLocaleDateString()
                            : '-'}
                        </td>
                        <td>
                          {offer.expires_at ? (
                            <span style={{ color: isExpired ? '#ef4444' : 'inherit' }}>
                              {new Date(offer.expires_at).toLocaleDateString()}
                              {isExpired && ' (expired)'}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {isVisible ? (
                            <span style={{ color: '#10b981' }}>✅ Yes</span>
                          ) : (
                            <span style={{ color: '#ef4444' }}>❌ No</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Public Offers (What Website Sees) */}
        <div className="debug-section">
          <h2>What the Website Sees (Public API)</h2>
          {publicOffers.length > 0 ? (
            <div className="debug-table-wrapper">
              <table className="debug-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Price From</th>
                    <th>Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {publicOffers.map((offer) => (
                    <tr key={offer.id}>
                      <td>{offer.title}</td>
                      <td>
                        <code>/offers/{offer.slug}</code>
                      </td>
                      <td>
                        {offer.price_from
                          ? `£${offer.price_from.toLocaleString()}`
                          : '-'}
                      </td>
                      <td>{offer.destination || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="debug-empty">No offers visible to public (website shows empty)</p>
          )}
        </div>

        {/* Action Steps */}
        {draftCount > 0 && (
          <div className="debug-section">
            <h2>📝 How to Fix</h2>
            <ol className="debug-steps">
              <li>Go to the CRM Offers page</li>
              <li>Find the {draftCount} offer(s) in DRAFT status</li>
              <li>Click on each offer to edit</li>
              <li>Click the <strong>"Publish"</strong> button (not "Save as Draft")</li>
              <li>Refresh this page to verify</li>
              <li>Check the website /offers page to see them live</li>
            </ol>
          </div>
        )}

        <div className="debug-actions">
          <button onClick={checkOffers} className="debug-button">
            🔄 Refresh
          </button>
          <a href="/admin/offers" className="debug-button debug-button--primary">
            Go to Offers Manager
          </a>
          <a href="/offers" target="_blank" rel="noopener noreferrer" className="debug-button">
            View Website Offers Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminOffersDebug;

