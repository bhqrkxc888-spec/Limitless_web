/**
 * Admin Cruise Guide Feedback Page
 * View and analyze Yes/No feedback from cruise guides
 */

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp, Filter, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import './AdminCruiseFeedback.css';

function AdminCruiseFeedback() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filterCruise, setFilterCruise] = useState('all');
  const [filterDay, setFilterDay] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedback();
    }
  }, [isAuthenticated]);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      // Fetch all feedback
      const { data: feedbackData, error } = await supabase
        .from('guide_feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      setFeedback(feedbackData || []);
      
      // Calculate stats
      calculateStats(feedbackData || []);
      
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const statsBySection = {};
    const statsByCruise = {};
    
    data.forEach(item => {
      // By section
      if (!statsBySection[item.section_key]) {
        statsBySection[item.section_key] = { helpful: 0, notHelpful: 0, total: 0 };
      }
      statsBySection[item.section_key].total++;
      if (item.is_helpful) {
        statsBySection[item.section_key].helpful++;
      } else {
        statsBySection[item.section_key].notHelpful++;
      }
      
      // By cruise
      if (!statsByCruise[item.cruise_code]) {
        statsByCruise[item.cruise_code] = { helpful: 0, notHelpful: 0, total: 0 };
      }
      statsByCruise[item.cruise_code].total++;
      if (item.is_helpful) {
        statsByCruise[item.cruise_code].helpful++;
      } else {
        statsByCruise[item.cruise_code].notHelpful++;
      }
    });

    // Calculate percentages
    Object.keys(statsBySection).forEach(key => {
      const stat = statsBySection[key];
      stat.percentage = ((stat.helpful / stat.total) * 100).toFixed(1);
    });

    Object.keys(statsByCruise).forEach(key => {
      const stat = statsByCruise[key];
      stat.percentage = ((stat.helpful / stat.total) * 100).toFixed(1);
    });

    setStats({ bySection: statsBySection, byCruise: statsByCruise });
  };

  const exportCSV = () => {
    const headers = ['Cruise Code', 'Day', 'Port', 'Section', 'Helpful', 'Date'];
    const rows = feedback.map(item => [
      item.cruise_code,
      item.day_number,
      item.port_name || 'Sea Day',
      item.section_key,
      item.is_helpful ? 'Yes' : 'No',
      new Date(item.created_at).toLocaleDateString()
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cruise-feedback-${Date.now()}.csv`;
    a.click();
  };

  if (authLoading || !isAuthenticated) {
    return <div className="admin-loading">Loading...</div>;
  }

  const uniqueCruises = [...new Set(feedback.map(f => f.cruise_code))];
  const uniqueDays = [...new Set(feedback.map(f => f.day_number))].sort((a, b) => a - b);

  const filteredFeedback = feedback.filter(item => {
    if (filterCruise !== 'all' && item.cruise_code !== filterCruise) return false;
    if (filterDay !== 'all' && item.day_number !== parseInt(filterDay)) return false;
    return true;
  });

  return (
    <AdminLayout onLogout={logout} lastUpdated={lastUpdated} onRefresh={fetchFeedback} isRefreshing={isLoading}>
      <div className="admin-cruise-feedback">
        <div className="admin-page-header">
          <div>
            <h1>Cruise Guide Feedback</h1>
            <p>Yes/No feedback from cruise companion guides</p>
          </div>
          <button className="btn-export" onClick={exportCSV}>
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Overall Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon helpful">
              <ThumbsUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Feedback</div>
              <div className="stat-value">{feedback.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon helpful">
              <ThumbsUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Helpful</div>
              <div className="stat-value">
                {feedback.filter(f => f.is_helpful).length}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon not-helpful">
              <ThumbsDown size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Not Helpful</div>
              <div className="stat-value">
                {feedback.filter(f => !f.is_helpful).length}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon positive">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Success Rate</div>
              <div className="stat-value">
                {feedback.length > 0
                  ? ((feedback.filter(f => f.is_helpful).length / feedback.length) * 100).toFixed(1)
                  : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-group">
            <label>
              <Filter size={16} />
              Cruise
            </label>
            <select value={filterCruise} onChange={(e) => setFilterCruise(e.target.value)}>
              <option value="all">All Cruises</option>
              {uniqueCruises.map(cruise => (
                <option key={cruise} value={cruise}>{cruise}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>
              <Filter size={16} />
              Day
            </label>
            <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
              <option value="all">All Days</option>
              {uniqueDays.map(day => (
                <option key={day} value={day}>Day {day}</option>
              ))}
            </select>
          </div>

          <div className="filter-results">
            Showing {filteredFeedback.length} of {feedback.length} responses
          </div>
        </div>

        {/* Stats by Section */}
        {stats.bySection && (
          <div className="section-stats">
            <h2>Feedback by Section</h2>
            <div className="stats-table">
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Total</th>
                    <th>Helpful</th>
                    <th>Not Helpful</th>
                    <th>Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.bySection)
                    .sort((a, b) => b[1].total - a[1].total)
                    .map(([section, stat]) => (
                      <tr key={section}>
                        <td className="section-name">{section}</td>
                        <td>{stat.total}</td>
                        <td className="helpful-count">{stat.helpful}</td>
                        <td className="not-helpful-count">{stat.notHelpful}</td>
                        <td>
                          <div className="percentage-bar">
                            <div
                              className="percentage-fill"
                              style={{ width: `${stat.percentage}%` }}
                            />
                            <span className="percentage-text">{stat.percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats by Cruise */}
        {stats.byCruise && (
          <div className="section-stats">
            <h2>Feedback by Cruise</h2>
            <div className="stats-table">
              <table>
                <thead>
                  <tr>
                    <th>Cruise Code</th>
                    <th>Total</th>
                    <th>Helpful</th>
                    <th>Not Helpful</th>
                    <th>Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.byCruise)
                    .sort((a, b) => b[1].total - a[1].total)
                    .map(([cruise, stat]) => (
                      <tr key={cruise}>
                        <td className="cruise-name">{cruise}</td>
                        <td>{stat.total}</td>
                        <td className="helpful-count">{stat.helpful}</td>
                        <td className="not-helpful-count">{stat.notHelpful}</td>
                        <td>
                          <div className="percentage-bar">
                            <div
                              className="percentage-fill"
                              style={{ width: `${stat.percentage}%` }}
                            />
                            <span className="percentage-text">{stat.percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCruiseFeedback;
