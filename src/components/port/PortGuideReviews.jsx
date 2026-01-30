import { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './PortGuideReviews.css';

/**
 * Get session ID for vote tracking
 */
function getSessionId() {
  const key = 'port_feedback_session';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

/**
 * PortGuideReviews - Displays approved reviews for a port guide
 * Shows aggregate rating and individual reviews with helpfulness voting
 */
function PortGuideReviews({ portSlug }) {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votedReviews, setVotedReviews] = useState({});

  const loadReviewsAndStats = useCallback(async () => {
    try {
      // Load aggregate stats
      const { data: statsData, error: statsError } = await supabase
        .from('port_guide_rating_stats')
        .select('*')
        .eq('port_slug', portSlug)
        .single();

      if (!statsError && statsData) {
        setStats(statsData);
      }

      // Load approved reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('port_guide_ratings')
        .select('*')
        .eq('port_slug', portSlug)
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(20);

      if (!reviewsError && reviewsData) {
        setReviews(reviewsData);
      }

    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [portSlug]);

  useEffect(() => {
    loadReviewsAndStats();
    loadVotedReviews();
  }, [portSlug, loadReviewsAndStats]);

  const loadVotedReviews = () => {
    const sessionId = getSessionId();
    const votedKey = `port_review_votes_${sessionId}`;
    const voted = JSON.parse(localStorage.getItem(votedKey) || '{}');
    setVotedReviews(voted);
  };

  const handleHelpfulVote = async (reviewId, isHelpful) => {
    const sessionId = getSessionId();
    const votedKey = `port_review_votes_${sessionId}`;

    // Check if already voted
    if (votedReviews[reviewId]) return;

    // Optimistic update
    setVotedReviews(prev => ({ ...prev, [reviewId]: isHelpful }));
    localStorage.setItem(votedKey, JSON.stringify({ ...votedReviews, [reviewId]: isHelpful }));

    // Update review counts locally
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful_count: review.helpful_count + (isHelpful ? 1 : 0),
          not_helpful_count: review.not_helpful_count + (isHelpful ? 0 : 1)
        };
      }
      return review;
    }));

    try {
      // Submit vote to database
      await supabase
        .from('port_guide_rating_votes')
        .insert({
          rating_id: reviewId,
          is_helpful: isHelpful,
          session_id: sessionId
        });
    } catch (error) {
      console.warn('Vote saved locally only:', error);
    }
  };

  if (loading) {
    return (
      <div className="port-guide-reviews">
        <p>Loading reviews...</p>
      </div>
    );
  }

  // Hide entire section if no reviews - the feedback form already prompts users to rate
  if (!stats || stats.total_reviews === 0) {
    return null;
  }

  return (
    <div className="port-guide-reviews">
      {/* Aggregate Rating Summary */}
      <div className="rating-summary">
        <div className="rating-overview">
          <div className="rating-score">
            <span className="score-number">{stats.average_rating}</span>
            <div className="score-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  size={20}
                  fill={value <= Math.round(stats.average_rating) ? '#FFD700' : 'none'}
                  stroke={value <= Math.round(stats.average_rating) ? '#FFD700' : '#ccc'}
                />
              ))}
            </div>
            <p className="score-count">Based on {stats.total_reviews} review{stats.total_reviews !== 1 ? 's' : ''}</p>
          </div>

          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats[`${['', 'one', 'two', 'three', 'four', 'five'][stars]}_star_count`] || 0;
              const percentage = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0;
              return (
                <div key={stars} className="rating-bar">
                  <span className="rating-bar-label">{stars} ⭐</span>
                  <div className="rating-bar-track">
                    <div 
                      className="rating-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="rating-bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {stats.verified_count > 0 && (
          <p className="verified-badge">
            <CheckCircle size={16} color="#10b981" />
            {stats.verified_count} verified cruise passenger{stats.verified_count !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Individual Reviews */}
      {reviews.length > 0 && (
        <div className="reviews-list">
          <h3>Reviews from Cruise Passengers</h3>
          {reviews.map((review) => (
            <div key={review.id} className={`review-card ${review.is_featured ? 'featured' : ''}`}>
              {review.is_featured && (
                <span className="featured-badge">Featured Review</span>
              )}

              <div className="review-header">
                <div className="review-rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={16}
                      fill={value <= review.rating ? '#FFD700' : 'none'}
                      stroke={value <= review.rating ? '#FFD700' : '#ccc'}
                    />
                  ))}
                </div>
                {review.is_verified && (
                  <span className="verified-tag">
                    <CheckCircle size={14} color="#10b981" />
                    Verified Passenger
                  </span>
                )}
              </div>

              {review.review_title && (
                <h4 className="review-title">{review.review_title}</h4>
              )}

              {review.review_text && (
                <p className="review-text">{review.review_text}</p>
              )}

              <div className="review-meta">
                {review.reviewer_name && (
                  <span className="reviewer-name">{review.reviewer_name}</span>
                )}
                {review.reviewer_location && (
                  <span className="reviewer-location">from {review.reviewer_location}</span>
                )}
                {review.visit_date && (
                  <span className="visit-date">
                    Visited {new Date(review.visit_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </span>
                )}
                {review.cruise_line && (
                  <span className="cruise-line">{review.cruise_line}</span>
                )}
              </div>

              <div className="review-helpful">
                <span className="helpful-label">Was this review helpful?</span>
                {!votedReviews[review.id] ? (
                  <div className="helpful-buttons">
                    <button
                      onClick={() => handleHelpfulVote(review.id, true)}
                      className="helpful-btn"
                    >
                      <ThumbsUp size={16} />
                      <span>Yes ({review.helpful_count})</span>
                    </button>
                    <button
                      onClick={() => handleHelpfulVote(review.id, false)}
                      className="helpful-btn"
                    >
                      <ThumbsDown size={16} />
                      <span>No ({review.not_helpful_count})</span>
                    </button>
                  </div>
                ) : (
                  <span className="voted-message">
                    Thanks for your feedback!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortGuideReviews;
