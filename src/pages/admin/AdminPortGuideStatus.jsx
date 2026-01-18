/**
 * Admin Port Guide Status Page
 * 
 * Shows completeness status of all port guides
 * Identifies missing sections, images, and content
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Image,
  FileText,
  Utensils,
  Users,
  Accessibility,
  Cross,
  Eye,
  Map
} from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllPorts } from '../../data/ports';
import { getPortContent, hasDetailedContent } from '../../data/portContent';
import { supabase } from '../../lib/supabase';

// Define what sections should exist for a complete port guide
const REQUIRED_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: Eye, weight: 15 },
  { key: 'stayLocal', label: 'Stay Local', icon: Map, weight: 15 },
  { key: 'goFurther', label: 'Go Further', icon: MapPin, weight: 15 },
  { key: 'withKids', label: 'With Kids', icon: Users, weight: 10 },
  { key: 'send', label: 'Accessibility', icon: Accessibility, weight: 10 },
  { key: 'medical', label: 'Medical', icon: Cross, weight: 15 },
  { key: 'foodAndDrink', label: 'Food & Drink', icon: Utensils, weight: 20 },
];

const IMAGE_TYPES = [
  { key: 'hero', label: 'Hero Image', required: true },
  { key: 'beach', label: 'Beach Image', required: false },
  { key: 'attraction-1', label: 'Attraction 1', required: true },
  { key: 'attraction-2', label: 'Attraction 2', required: false },
  { key: 'attraction-3', label: 'Attraction 3', required: false },
];

/**
 * Analyze a port's content completeness
 */
function analyzePortCompleteness(port, detailedContent, images) {
  const analysis = {
    slug: port.slug,
    name: port.name,
    country: port.country,
    region: port.region,
    hasDetailedContent: !!detailedContent,
    sections: {},
    images: {},
    overallScore: 0,
    warnings: [],
    missing: [],
    status: 'incomplete' // incomplete, partial, complete
  };

  // Check each section
  let totalWeight = 0;
  let earnedWeight = 0;

  REQUIRED_SECTIONS.forEach(section => {
    const sectionData = detailedContent?.[section.key];
    let status = 'missing';
    let hasContent = false;

    if (sectionData) {
      // Check if section has meaningful content
      switch (section.key) {
        case 'overview':
          hasContent = !!(sectionData.hook || sectionData.description || sectionData.portInfo);
          break;
        case 'stayLocal':
          hasContent = !!(sectionData.quickWalk?.length || sectionData.longerWalk?.length || sectionData.beach || sectionData.tip);
          break;
        case 'goFurther':
          hasContent = !!(sectionData.attractions?.length);
          break;
        case 'withKids':
          hasContent = !!(sectionData.toddlers?.length || sectionData.olderKids?.length || sectionData.easyDay);
          break;
        case 'send':
          hasContent = !!(sectionData.wheelchairAccess || sectionData.mobility?.length || sectionData.mobilityConsiderations?.length || sectionData.quietSpots?.length);
          break;
        case 'medical':
          hasContent = !!(sectionData.pharmacy?.name || sectionData.hospital?.name || sectionData.tips?.length);
          break;
        case 'foodAndDrink':
          hasContent = !!(sectionData.restaurants?.length || sectionData.localSpeciality || sectionData.localSpecialties?.length || sectionData.localDish || sectionData.localDishToTry);
          break;
        default:
          hasContent = Object.keys(sectionData).length > 0;
      }

      if (hasContent) {
        status = 'complete';
        earnedWeight += section.weight;
      } else {
        status = 'empty';
        analysis.warnings.push(`${section.label} section exists but has no content`);
      }
    } else {
      analysis.missing.push(section.label);
    }

    totalWeight += section.weight;
    analysis.sections[section.key] = { status, hasContent };
  });

  // Check images
  const portImages = images.filter(img => img.port_slug === port.slug);
  IMAGE_TYPES.forEach(imgType => {
    const hasImage = portImages.some(img => img.image_type === imgType.key);
    analysis.images[imgType.key] = hasImage;
    if (!hasImage && imgType.required) {
      analysis.warnings.push(`Missing required ${imgType.label}`);
    }
  });

  // Calculate overall score
  analysis.overallScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  // Determine status
  if (analysis.overallScore >= 90) {
    analysis.status = 'complete';
  } else if (analysis.overallScore >= 50) {
    analysis.status = 'partial';
  } else {
    analysis.status = 'incomplete';
  }

  return analysis;
}

function AdminPortGuideStatus() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [portImages, setPortImages] = useState([]);
  const [expandedPort, setExpandedPort] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  // Get all ports
  const allPorts = useMemo(() => getAllPorts(), []);

  // Analyze all ports
  const portAnalysis = useMemo(() => {
    return allPorts.map(port => {
      const detailedContent = getPortContent(port.slug);
      return analyzePortCompleteness(port, detailedContent, portImages);
    }).sort((a, b) => {
      // Sort by status (incomplete first), then by score
      const statusOrder = { incomplete: 0, partial: 1, complete: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.overallScore - b.overallScore;
    });
  }, [allPorts, portImages]);

  // Get unique regions
  const regions = useMemo(() => {
    const regionSet = new Set(allPorts.map(p => p.region).filter(Boolean));
    return ['all', ...Array.from(regionSet).sort()];
  }, [allPorts]);

  // Filter ports
  const filteredPorts = useMemo(() => {
    return portAnalysis.filter(p => {
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (filterRegion !== 'all' && p.region !== filterRegion) return false;
      return true;
    });
  }, [portAnalysis, filterStatus, filterRegion]);

  // Stats
  const stats = useMemo(() => {
    const complete = portAnalysis.filter(p => p.status === 'complete').length;
    const partial = portAnalysis.filter(p => p.status === 'partial').length;
    const incomplete = portAnalysis.filter(p => p.status === 'incomplete').length;
    const avgScore = portAnalysis.length > 0 
      ? Math.round(portAnalysis.reduce((sum, p) => sum + p.overallScore, 0) / portAnalysis.length)
      : 0;
    return { complete, partial, incomplete, total: portAnalysis.length, avgScore };
  }, [portAnalysis]);

  const fetchImages = async () => {
    if (!supabase) return;
    setIsRefreshing(true);
    
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('port_slug, image_type')
        .eq('category', 'port-guide');
      
      if (!error && data) {
        setPortImages(data);
      }
    } catch (err) {
      console.error('Error fetching port images:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setLastUpdated(Date.now());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'complete':
        return <span className="admin-badge admin-badge-success"><CheckCircle size={12} /> Complete</span>;
      case 'partial':
        return <span className="admin-badge admin-badge-warning"><AlertTriangle size={12} /> Partial</span>;
      default:
        return <span className="admin-badge admin-badge-error"><XCircle size={12} /> Incomplete</span>;
    }
  };

  const getSectionIcon = (key) => {
    const section = REQUIRED_SECTIONS.find(s => s.key === key);
    if (!section) return null;
    const Icon = section.icon;
    return <Icon size={14} />;
  };

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchImages}
      isRefreshing={isRefreshing}
    >
      <div className="admin-port-status">
        <header className="admin-page-header">
          <h1 className="admin-page-title">Port Guide Status</h1>
          <p className="admin-page-subtitle">
            Track completeness of all port guides
          </p>
        </header>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Analyzing port guides...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-label">Complete</div>
                <div className="admin-stat-value success">{stats.complete}</div>
                <div className="admin-stat-subtitle">of {stats.total} ports</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Partial</div>
                <div className="admin-stat-value warning">{stats.partial}</div>
                <div className="admin-stat-subtitle">50-89% complete</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Incomplete</div>
                <div className="admin-stat-value error">{stats.incomplete}</div>
                <div className="admin-stat-subtitle">&lt;50% complete</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Avg Score</div>
                <div className={`admin-stat-value ${stats.avgScore >= 80 ? 'success' : stats.avgScore >= 50 ? 'warning' : 'error'}`}>
                  {stats.avgScore}%
                </div>
                <div className="admin-stat-subtitle">across all ports</div>
              </div>
            </div>

            {/* Filters */}
            <div className="admin-filters">
              <div className="admin-filter">
                <label>Status:</label>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="partial">Partial</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
              <div className="admin-filter">
                <label>Region:</label>
                <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
                  {regions.map(r => (
                    <option key={r} value={r}>{r === 'all' ? 'All Regions' : r}</option>
                  ))}
                </select>
              </div>
              <div className="admin-filter-count">
                Showing {filteredPorts.length} of {stats.total} ports
              </div>
            </div>

            {/* Port List */}
            <div className="admin-card">
              <div className="admin-port-list">
                {filteredPorts.map(port => (
                  <div key={port.slug} className={`admin-port-item ${expandedPort === port.slug ? 'expanded' : ''}`}>
                    <div 
                      className="admin-port-header"
                      onClick={() => setExpandedPort(expandedPort === port.slug ? null : port.slug)}
                    >
                      <div className="admin-port-info">
                        <h3>{port.name}</h3>
                        <span className="admin-port-meta">{port.country} • {port.region || 'Unknown Region'}</span>
                      </div>
                      <div className="admin-port-score">
                        <div className={`score-circle ${port.status}`}>
                          {port.overallScore}%
                        </div>
                      </div>
                      <div className="admin-port-status">
                        {getStatusBadge(port.status)}
                      </div>
                      <div className="admin-port-actions">
                        <a 
                          href={`/ports/${port.slug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn-ghost admin-btn-sm"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                        </a>
                        {expandedPort === port.slug ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                    
                    {expandedPort === port.slug && (
                      <div className="admin-port-details">
                        <div className="admin-port-sections">
                          <h4>Sections</h4>
                          <div className="section-grid">
                            {REQUIRED_SECTIONS.map(section => {
                              const sectionStatus = port.sections[section.key]?.status || 'missing';
                              return (
                                <div key={section.key} className={`section-item ${sectionStatus}`}>
                                  {getSectionIcon(section.key)}
                                  <span>{section.label}</span>
                                  {sectionStatus === 'complete' && <CheckCircle size={14} className="status-icon success" />}
                                  {sectionStatus === 'empty' && <AlertTriangle size={14} className="status-icon warning" />}
                                  {sectionStatus === 'missing' && <XCircle size={14} className="status-icon error" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="admin-port-images">
                          <h4>Images</h4>
                          <div className="image-grid">
                            {IMAGE_TYPES.map(img => (
                              <div key={img.key} className={`image-item ${port.images[img.key] ? 'has-image' : 'no-image'}`}>
                                <Image size={14} />
                                <span>{img.label}</span>
                                {port.images[img.key] 
                                  ? <CheckCircle size={14} className="status-icon success" />
                                  : <XCircle size={14} className="status-icon error" />
                                }
                              </div>
                            ))}
                          </div>
                        </div>

                        {port.warnings.length > 0 && (
                          <div className="admin-port-warnings">
                            <h4>Warnings</h4>
                            <ul>
                              {port.warnings.map((warning, idx) => (
                                <li key={idx}><AlertTriangle size={12} /> {warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {port.missing.length > 0 && (
                          <div className="admin-port-missing">
                            <h4>Missing Sections</h4>
                            <ul>
                              {port.missing.map((missing, idx) => (
                                <li key={idx}><XCircle size={12} /> {missing}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-port-status {
          max-width: 1200px;
        }

        .admin-filters {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }

        .admin-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .admin-filter label {
          font-size: 0.875rem;
          color: var(--admin-text-muted);
        }

        .admin-filter select {
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          color: var(--admin-text);
          font-size: 0.875rem;
        }

        .admin-filter-count {
          margin-left: auto;
          font-size: 0.875rem;
          color: var(--admin-text-muted);
        }

        .admin-port-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .admin-port-item {
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .admin-port-item.expanded {
          border-color: var(--admin-primary);
        }

        .admin-port-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          cursor: pointer;
          gap: 1rem;
        }

        .admin-port-header:hover {
          background: var(--admin-bg-hover);
        }

        .admin-port-info {
          flex: 1;
          min-width: 0;
        }

        .admin-port-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text);
          margin: 0 0 0.25rem 0;
        }

        .admin-port-meta {
          font-size: 0.75rem;
          color: var(--admin-text-dim);
        }

        .admin-port-score {
          flex-shrink: 0;
        }

        .score-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .score-circle.complete {
          background: rgba(52, 211, 153, 0.2);
          color: var(--admin-success);
        }

        .score-circle.partial {
          background: rgba(251, 191, 36, 0.2);
          color: var(--admin-warning);
        }

        .score-circle.incomplete {
          background: rgba(248, 113, 113, 0.2);
          color: var(--admin-error);
        }

        .admin-port-status {
          flex-shrink: 0;
        }

        .admin-port-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-text-muted);
        }

        .admin-port-details {
          padding: 1rem;
          border-top: 1px solid var(--admin-border);
          background: var(--admin-bg-secondary);
        }

        .admin-port-details h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--admin-text);
          margin: 0 0 0.75rem 0;
        }

        .admin-port-sections,
        .admin-port-images {
          margin-bottom: 1rem;
        }

        .section-grid,
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.5rem;
        }

        .section-item,
        .image-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--admin-bg-tertiary);
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--admin-text-muted);
        }

        .section-item.complete,
        .image-item.has-image {
          background: rgba(52, 211, 153, 0.1);
          color: var(--admin-text);
        }

        .section-item.missing,
        .image-item.no-image {
          background: rgba(248, 113, 113, 0.1);
        }

        .section-item.empty {
          background: rgba(251, 191, 36, 0.1);
        }

        .status-icon {
          margin-left: auto;
        }

        .status-icon.success {
          color: var(--admin-success);
        }

        .status-icon.warning {
          color: var(--admin-warning);
        }

        .status-icon.error {
          color: var(--admin-error);
        }

        .admin-port-warnings,
        .admin-port-missing {
          margin-top: 1rem;
        }

        .admin-port-warnings ul,
        .admin-port-missing ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .admin-port-warnings li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--admin-warning);
          padding: 0.25rem 0;
        }

        .admin-port-missing li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--admin-error);
          padding: 0.25rem 0;
        }

        .admin-badge svg {
          margin-right: 0.25rem;
        }

        @media (max-width: 768px) {
          .admin-port-header {
            flex-wrap: wrap;
          }

          .admin-port-info {
            width: 100%;
          }

          .section-grid,
          .image-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminPortGuideStatus;
