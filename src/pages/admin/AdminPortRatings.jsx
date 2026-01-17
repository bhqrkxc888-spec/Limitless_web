/**
 * Admin Port Guide Ratings & Reviews Page
 * Manage user ratings and reviews for port guides
 */

import { useState, useEffect } from 'react';
import { Star, Check, X, Eye, Flag, Download, Filter, Search, ThumbsUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import './AdminPortRatings.css';

function AdminPortRatings() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [ratings, setRatings] = useState([]);
  const [_stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPort, setFilterPort] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchRatings();
    }
  }, [isAuthenticated]);

  const fetchRatings = async () => {
    setIsLoading(true);
    try {
      // Fetch all ratings
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('port_guide_ratings')
        .select('*')
        .order('created_at', { ascending: false });

      if (ratingsError) throw ratingsError;

      setRatings(ratingsData || []);

      // Fetch aggregate stats
      const { data: statsData, error: statsError } = await supabase
        .from('port_guide_rating_stats')
        .select('*');

      if (!statsError && statsData) {
        setStats(statsData);
      }

      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveRating = async (id) => {
    try {
      const { error } = await supabase
        .from('port_guide_ratings')
        .update({
          is_approved: true,
          approved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      fetchRatings();
    } catch (error) {
      console.error('Error approving rating:', error);
      alert('Failed to approve rating');
    }
  };

  const rejectRating = async (id) => {
    if (!confirm('Are you sure you want to reject this review? This cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('port_guide_ratings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      fetchRatings();
    } catch (error) {
      console.error('Error rejecting rating:', error);
      alert('Failed to reject rating');
    }
  };

  const toggleFeatured = async (id, currentValue) => {
    try {
      const { error } = await supabase
        .from('port_guide_ratings')
        .update({ is_featured: !currentValue })
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      fetchRatings();
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Failed to update featured status');
    }
  };

  const toggleVerified = async (id, currentValue) => {
    try {
      const { error } = await supabase
        .from('port_guide_ratings')
        .update({ is_verified: !currentValue })
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      fetchRatings();
    } catch (error) {
      console.error('Error toggling verified:', error);
      alert('Failed to update verified status');
    }
  };

  const exportCSV = () => {
    const headers = ['Port', 'Rating', 'Review Title', 'Review Text', 'Name', 'Location', 'Date', 'Status'];
    const rows = ratings.map(item => [
      item.port_name,
      item.rating,
      item.review_title || '',
      item.review_text || '',
      item.reviewer_name || '',
      item.reviewer_location || '',
      new Date(item.created_at).toLocaleDateString(),
      item.is_approved ? 'Approved' : 'Pending'
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `port-ratings-${Date.now()}.csv`;
    a.click();
  };

  if (authLoading || !isAuthenticated) {
    return <div className="admin-loading">Loading...</div>;
  }

  const uniquePorts = [...new Set(ratings.map(r => r.port_name))].sort();

  const filteredRatings = ratings.filter(item => {
    if (filterStatus === 'pending' && item.is_approved) return false;
    if (filterStatus === 'approved' && !item.is_approved) return false;
    if (filterPort !== 'all' && item.port_name !== filterPort) return false;
    if (filterRating !== 'all' && item.rating !== parseInt(filterRating)) return false;
    if (searchTerm && !JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const pendingCount = ratings.filter(r => !r.is_approved).length;
  const approvedCount = ratings.filter(r => r.is_approved).length;
  const avgRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <AdminLayout onLogout={logout} lastUpdated={lastUpdated} onRefresh={fetchRatings} isRefreshing={isLoading}>
      <div className="admin-port-ratings">
        <div className="admin-page-header">
          <div>
            <h1>Port Guide Ratings & Reviews</h1>
            <p>Manage user ratings and reviews for port guides</p>
          </div>
          <button className="btn-export" onClick={exportCSV}>
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Overall Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Ratings</div>
              <div className="stat-value">{ratings.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Eye size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Pending Approval</div>
              <div className="stat-value">{pendingCount}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">
              <Check size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Approved</div>
              <div className="stat-value">{approvedCount}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon average">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Average Rating</div>
              <div className="stat-value">{avgRating} ⭐</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>
              <Filter size={16} />
              Status
            </label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending ({pendingCount})</option>
              <option value="approved">Approved ({approvedCount})</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              <Filter size={16} />
              Port
            </label>
            <select value={filterPort} onChange={(e) => setFilterPort(e.target.value)}>
              <option value="all">All Ports</option>
              {uniquePorts.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>
              <Filter size={16} />
              Rating
            </label>
            <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="filter-results">
            Showing {filteredRatings.length} of {ratings.length}
          </div>
        </div>

        {/* Ratings List */}
        <div className="ratings-list">
          {filteredRatings.length === 0 ? (
            <div className="no-ratings">
              <p>No ratings found</p>
            </div>
          ) : (
            filteredRatings.map(rating => (
              <div
                key={rating.id}
                className={`rating-card ${!rating.is_approved ? 'pending' : ''} ${rating.is_featured ? 'featured' : ''}`}
              >
                <div className="rating-header">
                  <div className="rating-main-info">
                    <h3>{rating.port_name}</h3>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={18}
                          fill={star <= rating.rating ? '#FFD700' : 'none'}
                          stroke={star <= rating.rating ? '#FFD700' : '#ccc'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rating-badges">
                    {!rating.is_approved && <span className="badge pending">Pending</span>}
                    {rating.is_featured && <span className="badge featured">Featured</span>}
                    {rating.is_verified && <span className="badge verified">Verified</span>}
                    {rating.allow_publish && <span className="badge consent">Consent Given</span>}
                  </div>
                </div>

                {rating.review_title && (
                  <h4 className="review-title">{rating.review_title}</h4>
                )}

                {rating.review_text && (
                  <p className="review-text">{rating.review_text}</p>
                )}

                <div className="rating-meta">
                  {rating.reviewer_name && <span><strong>Name:</strong> {rating.reviewer_name}</span>}
                  {rating.reviewer_location && <span><strong>Location:</strong> {rating.reviewer_location}</span>}
                  {rating.visit_date && (
                    <span>
                      <strong>Visited:</strong> {new Date(rating.visit_date).toLocaleDateString()}
                    </span>
                  )}
                  {rating.cruise_line && <span><strong>Cruise Line:</strong> {rating.cruise_line}</span>}
                  <span><strong>Submitted:</strong> {new Date(rating.created_at).toLocaleDateString()}</span>
                  <span>
                    <strong>Helpfulness:</strong> {rating.helpful_count} 👍 / {rating.not_helpful_count} 👎
                  </span>
                </div>

                <div className="rating-actions">
                  {!rating.is_approved && rating.allow_publish && (
                    <button
                      className="btn-action approve"
                      onClick={() => approveRating(rating.id)}
                    >
                      <Check size={16} />
                      Approve
                    </button>
                  )}

                  {rating.is_approved && (
                    <button
                      className={`btn-action ${rating.is_featured ? 'unfeatured' : 'featured'}`}
                      onClick={() => toggleFeatured(rating.id, rating.is_featured)}
                    >
                      <Flag size={16} />
                      {rating.is_featured ? 'Unfeature' : 'Feature'}
                    </button>
                  )}

                  <button
                    className={`btn-action ${rating.is_verified ? 'unverify' : 'verify'}`}
                    onClick={() => toggleVerified(rating.id, rating.is_verified)}
                  >
                    <Check size={16} />
                    {rating.is_verified ? 'Unverify' : 'Mark Verified'}
                  </button>

                  <button
                    className="btn-action reject"
                    onClick={() => rejectRating(rating.id)}
                  >
                    <X size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPortRatings;
