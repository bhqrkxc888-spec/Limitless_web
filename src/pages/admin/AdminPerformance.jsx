/**
 * Admin Performance Page
 * 
 * View Core Web Vitals and performance metrics
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  Clock
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminPerformance() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [metrics, setMetrics] = useState({
    LCP: { avg: 0, p50: 0, p95: 0, count: 0 },
    FID: { avg: 0, p50: 0, p95: 0, count: 0 },
    CLS: { avg: 0, p50: 0, p95: 0, count: 0 },
    TTFB: { avg: 0, p50: 0, p95: 0, count: 0 },
    FCP: { avg: 0, p50: 0, p95: 0, count: 0 }
  });
  const [deviceBreakdown, setDeviceBreakdown] = useState({
    desktop: 0,
    mobile: 0,
    tablet: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filters
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const getTimeRange = (range) => {
    const now = new Date();
    switch (range) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  };

  const calculatePercentile = (values, percentile) => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  };

  const fetchPerformanceData = useCallback(async () => {
    if (!supabase) return;
    
    setIsRefreshing(true);
    
    try {
      const since = getTimeRange(timeRange);
      
      let query = supabase
        .from('website_performance')
        .select('*')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: false });
      
      if (deviceFilter !== 'all') {
        query = query.eq('device_type', deviceFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Group by metric name
      const metricGroups = {
        LCP: [],
        FID: [],
        CLS: [],
        TTFB: [],
        FCP: []
      };
      
      const devices = { desktop: 0, mobile: 0, tablet: 0 };
      
      (data || []).forEach(record => {
        const name = record.metric_name;
        if (metricGroups[name]) {
          metricGroups[name].push(record.metric_value);
        }
        
        // Count devices
        if (record.device_type && devices[record.device_type] !== undefined) {
          devices[record.device_type]++;
        }
      });
      
      // Calculate stats for each metric
      const newMetrics = {};
      Object.keys(metricGroups).forEach(name => {
        const values = metricGroups[name];
        newMetrics[name] = {
          avg: values.length > 0 
            ? values.reduce((sum, v) => sum + v, 0) / values.length 
            : 0,
          p50: calculatePercentile(values, 50),
          p95: calculatePercentile(values, 95),
          count: values.length
        };
      });
      
      setMetrics(newMetrics);
      setDeviceBreakdown(devices);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching performance data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [timeRange, deviceFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPerformanceData();
      
      const interval = setInterval(fetchPerformanceData, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchPerformanceData]);

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

  const getMetricStatus = (name, value) => {
    switch (name) {
      case 'LCP':
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs-improvement';
        return 'poor';
      case 'FID':
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs-improvement';
        return 'poor';
      case 'CLS':
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs-improvement';
        return 'poor';
      case 'TTFB':
        if (value <= 800) return 'good';
        if (value <= 1800) return 'needs-improvement';
        return 'poor';
      case 'FCP':
        if (value <= 1800) return 'good';
        if (value <= 3000) return 'needs-improvement';
        return 'poor';
      default:
        return 'good';
    }
  };

  const formatMetricValue = (name, value) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}s`;
    }
    return `${Math.round(value)}ms`;
  };

  const metricDescriptions = {
    LCP: 'Largest Contentful Paint - measures loading performance',
    FID: 'First Input Delay - measures interactivity',
    CLS: 'Cumulative Layout Shift - measures visual stability',
    TTFB: 'Time to First Byte - measures server response time',
    FCP: 'First Contentful Paint - measures initial render time'
  };

  const metricThresholds = {
    LCP: { good: '≤2.5s', poor: '>4s' },
    FID: { good: '≤100ms', poor: '>300ms' },
    CLS: { good: '≤0.1', poor: '>0.25' },
    TTFB: { good: '≤800ms', poor: '>1800ms' },
    FCP: { good: '≤1.8s', poor: '>3s' }
  };

  const totalSamples = deviceBreakdown.desktop + deviceBreakdown.mobile + deviceBreakdown.tablet;

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={fetchPerformanceData}
      isRefreshing={isRefreshing}
    >
      <div className="admin-performance">
        <header className="admin-page-header">
          <h1 className="admin-page-title">Performance Metrics</h1>
          <p className="admin-page-subtitle">
            Core Web Vitals and page speed metrics
          </p>
        </header>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">Device Type</label>
            <select 
              className="admin-select"
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
            >
              <option value="all">All Devices</option>
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">Time Range</label>
            <select 
              className="admin-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading performance data...</p>
          </div>
        ) : (
          <>
            {/* Device Breakdown */}
            <div className="admin-device-breakdown">
              <div className="admin-device-card">
                <Monitor size={24} />
                <div className="admin-device-info">
                  <span className="admin-device-count">{deviceBreakdown.desktop}</span>
                  <span className="admin-device-label">Desktop</span>
                </div>
              </div>
              <div className="admin-device-card">
                <Smartphone size={24} />
                <div className="admin-device-info">
                  <span className="admin-device-count">{deviceBreakdown.mobile}</span>
                  <span className="admin-device-label">Mobile</span>
                </div>
              </div>
              <div className="admin-device-card">
                <Tablet size={24} />
                <div className="admin-device-info">
                  <span className="admin-device-count">{deviceBreakdown.tablet}</span>
                  <span className="admin-device-label">Tablet</span>
                </div>
              </div>
              <div className="admin-device-card">
                <Activity size={24} />
                <div className="admin-device-info">
                  <span className="admin-device-count">{totalSamples}</span>
                  <span className="admin-device-label">Total Samples</span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="admin-metrics-grid">
              {Object.entries(metrics).map(([name, data]) => {
                const status = getMetricStatus(name, data.avg);
                return (
                  <div key={name} className="admin-metric-card">
                    <div className="admin-metric-header">
                      <h3 className="admin-metric-name">{name}</h3>
                      <span className={`admin-metric-status admin-metric-status-${status}`}>
                        {status === 'good' ? 'Good' : status === 'needs-improvement' ? 'Needs Work' : 'Poor'}
                      </span>
                    </div>
                    <p className="admin-metric-description">{metricDescriptions[name]}</p>
                    
                    <div className="admin-metric-values">
                      <div className="admin-metric-value-group">
                        <span className="admin-metric-value-label">Average</span>
                        <span className={`admin-metric-value admin-metric-value-${status}`}>
                          {data.count > 0 ? formatMetricValue(name, data.avg) : '—'}
                        </span>
                      </div>
                      <div className="admin-metric-value-group">
                        <span className="admin-metric-value-label">P50</span>
                        <span className="admin-metric-value">
                          {data.count > 0 ? formatMetricValue(name, data.p50) : '—'}
                        </span>
                      </div>
                      <div className="admin-metric-value-group">
                        <span className="admin-metric-value-label">P95</span>
                        <span className="admin-metric-value">
                          {data.count > 0 ? formatMetricValue(name, data.p95) : '—'}
                        </span>
                      </div>
                      <div className="admin-metric-value-group">
                        <span className="admin-metric-value-label">Samples</span>
                        <span className="admin-metric-value">{data.count}</span>
                      </div>
                    </div>

                    <div className="admin-metric-thresholds">
                      <span className="admin-threshold good">Good: {metricThresholds[name].good}</span>
                      <span className="admin-threshold poor">Poor: {metricThresholds[name].poor}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalSamples === 0 && (
              <div className="admin-empty" style={{ marginTop: '2rem' }}>
                <Clock size={48} className="admin-empty-icon" />
                <h3 className="admin-empty-title">No data yet</h3>
                <p className="admin-empty-text">
                  Performance metrics will appear here as users visit your site.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .admin-performance {
          max-width: 1200px;
        }

        .admin-device-breakdown {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .admin-device-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          color: var(--admin-text-muted);
        }

        .admin-device-info {
          display: flex;
          flex-direction: column;
        }

        .admin-device-count {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--admin-text);
        }

        .admin-device-label {
          font-size: 0.75rem;
          color: var(--admin-text-muted);
        }

        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .admin-metric-card {
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .admin-metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .admin-metric-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--admin-text);
          margin: 0;
        }

        .admin-metric-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
        }

        .admin-metric-status-good {
          background: rgba(52, 211, 153, 0.15);
          color: var(--admin-success);
        }

        .admin-metric-status-needs-improvement {
          background: rgba(251, 191, 36, 0.15);
          color: var(--admin-warning);
        }

        .admin-metric-status-poor {
          background: rgba(248, 113, 113, 0.15);
          color: var(--admin-error);
        }

        .admin-metric-description {
          font-size: 0.8125rem;
          color: var(--admin-text-muted);
          margin: 0 0 1.25rem 0;
        }

        .admin-metric-values {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          padding: 1rem;
          background: var(--admin-bg-tertiary);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .admin-metric-value-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .admin-metric-value-label {
          font-size: 0.6875rem;
          color: var(--admin-text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .admin-metric-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text);
        }

        .admin-metric-value-good {
          color: var(--admin-success);
        }

        .admin-metric-value-needs-improvement {
          color: var(--admin-warning);
        }

        .admin-metric-value-poor {
          color: var(--admin-error);
        }

        .admin-metric-thresholds {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
        }

        .admin-threshold {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .admin-threshold.good {
          background: rgba(52, 211, 153, 0.1);
          color: var(--admin-success);
        }

        .admin-threshold.poor {
          background: rgba(248, 113, 113, 0.1);
          color: var(--admin-error);
        }

        @media (max-width: 640px) {
          .admin-metric-values {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminPerformance;

