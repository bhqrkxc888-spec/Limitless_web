/**
 * Admin Ports Management Page
 * 
 * View, edit, and manage port guides
 */

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Check, 
  X, 
  Eye, 
  EyeOff,
  Upload,
  ExternalLink,
  Search,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

/**
 * Calculate content completeness percentage
 */
function calculateCompleteness(port) {
  if (!port) return 0;
  
  let score = 0;
  let maxScore = 0;
  
  // Basic info (20%)
  maxScore += 20;
  if (port.tagline) score += 5;
  if (port.description) score += 5;
  if (port.about_port && Object.keys(port.about_port).length > 0) score += 5;
  if (port.quick_facts && Object.keys(port.quick_facts).length > 0) score += 5;
  
  // Content sections (60%)
  const sections = [
    { field: 'content_overview', weight: 10 },
    { field: 'content_stay_local', weight: 10 },
    { field: 'content_go_further', weight: 10 },
    { field: 'content_with_kids', weight: 10 },
    { field: 'content_accessibility', weight: 5 },
    { field: 'content_medical', weight: 5 },
    { field: 'content_food_drink', weight: 10 },
  ];
  
  sections.forEach(({ field, weight }) => {
    maxScore += weight;
    const content = port[field];
    if (content && typeof content === 'object' && Object.keys(content).length > 0) {
      score += weight;
    }
  });
  
  // Supporting data (20%)
  maxScore += 20;
  if (port.must_see_sights && port.must_see_sights.length > 0) score += 5;
  if (port.food_and_drink && port.food_and_drink.length > 0) score += 5;
  if (port.getting_around && Object.keys(port.getting_around).length > 0) score += 5;
  if (port.transport_connections && Object.keys(port.transport_connections).length > 0) score += 5;
  
  return Math.round((score / maxScore) * 100);
}

function AdminPorts() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [ports, setPorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPorts();
    }
  }, [isAuthenticated]);

  const fetchPorts = async () => {
    setIsLoading(true);
    try {
      // Fetch all fields needed for completeness calculation
      const { data, error } = await supabase
        .from('ports')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Add completeness score to each port
      const portsWithScore = (data || []).map(port => ({
        ...port,
        completeness: calculateCompleteness(port)
      }));
      
      setPorts(portsWithScore);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching ports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenuVisibility = async (id, currentValue) => {
    try {
      const { error } = await supabase
        .from('ports')
        .update({ show_in_menu: !currentValue })
        .eq('id', id);

      if (error) throw error;
      fetchPorts();
    } catch (error) {
      console.error('Error toggling menu visibility:', error);
      alert('Failed to update');
    }
  };

  const toggleComplete = async (id, currentValue) => {
    try {
      const { error } = await supabase
        .from('ports')
        .update({ is_complete: !currentValue })
        .eq('id', id);

      if (error) throw error;
      fetchPorts();
    } catch (error) {
      console.error('Error toggling complete status:', error);
      alert('Failed to update');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('ports')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchPorts();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update');
    }
  };

  const migrateFromJS = async () => {
    if (!confirm('This will import ports from the static JS files. Continue?')) {
      return;
    }

    setIsMigrating(true);
    try {
      // Dynamic import of port data
      const [portsModule, portContentModule] = await Promise.all([
        import('../../data/ports.js'),
        import('../../data/portContent.js')
      ]);

      const staticPorts = portsModule.ports || [];
      const getPortContent = portContentModule.getPortContent;

      let success = 0;
      let failed = 0;

      for (const port of staticPorts) {
        try {
          // Get detailed content if available
          let content = {};
          if (getPortContent) {
            try {
              content = getPortContent(port.slug) || {};
            } catch (_e) {
              // Content not available
            }
          }

          const portData = {
            slug: port.slug,
            name: port.name,
            display_name: port.displayName || port.name,
            country: port.country || '',
            region: port.region || 'unknown',
            coordinates: {
              lat: port.coordinates?.lat || 0,
              lon: port.coordinates?.lon || port.coordinates?.lng || 0
            },
            tagline: port.tagline || '',
            description: port.description || '',
            port_character: port.portCharacter || '',
            about_port: port.aboutPort || {},
            quick_facts: port.quickFacts || {},
            transport_connections: port.transportConnections || {},
            getting_around: port.gettingAround || {},
            must_see_sights: port.mustSeeSights || [],
            shore_excursions: port.shoreExcursions || [],
            nearest_beach: port.nearestBeach || {},
            food_and_drink: port.foodAndDrink || [],
            insider_tips: port.insiderTips || [],
            faq: port.faq || [],
            weather: port.weather || {},
            practical_info: port.practicalInfo || {},
            content_overview: content?.overview || {},
            content_stay_local: content?.stayLocal || {},
            content_go_further: content?.goFurther || {},
            content_with_kids: content?.withKids || {},
            content_accessibility: content?.send || {},
            content_medical: content?.medical || {},
            content_food_drink: content?.foodAndDrink || {},
            family_friendly: port.familyFriendly || {},
            meta_title: port.meta?.title || `${port.name} Cruise Port Guide`,
            meta_description: port.meta?.description || port.description || '',
            status: 'published',
            show_in_menu: false,
            is_complete: Object.keys(content).length > 3,
            source_file: 'migrated-from-js'
          };

          const { error } = await supabase
            .from('ports')
            .upsert(portData, { onConflict: 'slug' });

          if (error) {
            console.error(`Failed to migrate ${port.name}:`, error);
            failed++;
          } else {
            success++;
          }
        } catch (err) {
          console.error(`Error processing ${port.name}:`, err);
          failed++;
        }
      }

      alert(`Migration complete!\n✅ ${success} ports imported\n❌ ${failed} failed`);
      fetchPorts();
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed: ' + error.message);
    } finally {
      setIsMigrating(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return <div className="admin-loading">Loading...</div>;
  }

  const uniqueRegions = [...new Set(ports.map(p => p.region))].sort();

  const filteredPorts = ports.filter(port => {
    if (filterStatus === 'published' && port.status !== 'published') return false;
    if (filterStatus === 'draft' && port.status !== 'draft') return false;
    if (filterStatus === 'complete' && !port.is_complete) return false;
    if (filterStatus === 'incomplete' && port.is_complete) return false;
    if (filterStatus === 'in_menu' && !port.show_in_menu) return false;
    if (filterStatus === 'low_content' && !(port.status === 'published' && port.completeness < 80)) return false;
    if (filterRegion !== 'all' && port.region !== filterRegion) return false;
    if (searchTerm && !port.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: ports.length,
    published: ports.filter(p => p.status === 'published').length,
    complete: ports.filter(p => p.is_complete).length,
    inMenu: ports.filter(p => p.show_in_menu).length,
    needsAttention: ports.filter(p => p.status === 'published' && p.completeness < 80).length
  };

  return (
    <AdminLayout onLogout={logout} lastUpdated={lastUpdated} onRefresh={fetchPorts} isRefreshing={isLoading}>
      <div className="admin-ports">
        <div className="admin-page-header">
          <div>
            <h1>Port Guides</h1>
            <p>Manage port guide content and visibility</p>
          </div>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={migrateFromJS}
            disabled={isMigrating}
          >
            <Upload size={18} />
            {isMigrating ? 'Migrating...' : 'Import from JS Files'}
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'var(--admin-bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.total}</div>
            <div className="stat-label" style={{ color: 'var(--admin-text-muted)' }}>Total Ports</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--admin-bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--admin-success)' }}>{stats.published}</div>
            <div className="stat-label" style={{ color: 'var(--admin-text-muted)' }}>Published</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--admin-bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--admin-primary)' }}>{stats.inMenu}</div>
            <div className="stat-label" style={{ color: 'var(--admin-text-muted)' }}>In Menu</div>
          </div>
          <div 
            className="stat-card" 
            style={{ 
              background: stats.needsAttention > 0 ? 'rgba(239, 68, 68, 0.1)' : 'var(--admin-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: '12px',
              cursor: stats.needsAttention > 0 ? 'pointer' : 'default',
              border: stats.needsAttention > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
            }}
            onClick={() => stats.needsAttention > 0 && setFilterStatus('low_content')}
          >
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: stats.needsAttention > 0 ? 'var(--admin-danger)' : 'var(--admin-success)' }}>
              {stats.needsAttention > 0 ? stats.needsAttention : '✓'}
            </div>
            <div className="stat-label" style={{ color: 'var(--admin-text-muted)' }}>
              {stats.needsAttention > 0 ? 'Needs Content' : 'All Good'}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--admin-bg-secondary)', padding: '0.5rem 1rem', borderRadius: '8px', flex: '1', minWidth: '200px' }}>
            <Search size={16} style={{ color: 'var(--admin-text-muted)' }} />
            <input
              type="text"
              placeholder="Search ports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--admin-text)', width: '100%', outline: 'none' }}
            />
          </div>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ background: 'var(--admin-bg-secondary)', color: 'var(--admin-text)', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px' }}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="in_menu">In Menu</option>
            <option value="low_content">⚠️ Low Content (&lt;80%)</option>
          </select>

          <select 
            value={filterRegion} 
            onChange={(e) => setFilterRegion(e.target.value)}
            style={{ background: 'var(--admin-bg-secondary)', color: 'var(--admin-text)', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px' }}
          >
            <option value="all">All Regions</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <span style={{ color: 'var(--admin-text-muted)', alignSelf: 'center' }}>
            Showing {filteredPorts.length} of {ports.length}
          </span>
        </div>

        {/* Ports Table */}
        <div className="ports-table" style={{ background: 'var(--admin-bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Port</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Region</th>
                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Content</th>
                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Complete</th>
                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>In Menu</th>
                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPorts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                    {ports.length === 0 ? (
                      <div>
                        <p>No ports in database</p>
                        <p style={{ marginTop: '0.5rem' }}>Click "Import from JS Files" to migrate existing ports</p>
                      </div>
                    ) : (
                      'No ports match your filters'
                    )}
                  </td>
                </tr>
              ) : (
                filteredPorts.map(port => (
                  <tr key={port.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <MapPin size={18} style={{ color: 'var(--admin-primary)' }} />
                        <div>
                          <strong style={{ color: 'var(--admin-text)' }}>{port.name}</strong>
                          <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>{port.country}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--admin-text-muted)' }}>
                      {port.region}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}>
                        {port.status === 'published' && port.completeness < 80 && (
                          <AlertTriangle size={14} style={{ color: 'var(--admin-warning)' }} />
                        )}
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          background: port.completeness >= 80 
                            ? 'rgba(34, 197, 94, 0.2)' 
                            : port.completeness >= 50 
                              ? 'rgba(234, 179, 8, 0.2)'
                              : 'rgba(239, 68, 68, 0.2)',
                          color: port.completeness >= 80 
                            ? 'var(--admin-success)' 
                            : port.completeness >= 50 
                              ? 'var(--admin-warning)'
                              : 'var(--admin-danger)'
                        }}>
                          {port.completeness}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select
                        value={port.status}
                        onChange={(e) => updateStatus(port.id, e.target.value)}
                        style={{
                          background: port.status === 'published' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                          color: port.status === 'published' ? 'var(--admin-success)' : 'var(--admin-warning)',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleComplete(port.id, port.is_complete)}
                        style={{
                          background: port.is_complete ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 100, 100, 0.2)',
                          color: port.is_complete ? 'var(--admin-success)' : 'var(--admin-text-muted)',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          margin: '0 auto'
                        }}
                      >
                        {port.is_complete ? <Check size={14} /> : <X size={14} />}
                        {port.is_complete ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleMenuVisibility(port.id, port.show_in_menu)}
                        style={{
                          background: port.show_in_menu ? 'rgba(79, 140, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)',
                          color: port.show_in_menu ? 'var(--admin-primary)' : 'var(--admin-text-muted)',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          margin: '0 auto'
                        }}
                      >
                        {port.show_in_menu ? <Eye size={14} /> : <EyeOff size={14} />}
                        {port.show_in_menu ? 'Show' : 'Hide'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <a
                        href={`/ports/${port.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--admin-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        View <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPorts;
