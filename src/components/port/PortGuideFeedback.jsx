import { useState, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './PortGuideFeedback.css';

/**
 * Generate or retrieve a session ID for feedback deduplication
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
 * PortGuideFeedback - Star rating (1-5) with optional review
 * for port guide pages
 */
function PortGuideFeedback({ portSlug, portName }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerLocation, setReviewerLocation] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [cruiseLine, setCruiseLine] = useState('');
  const [allowPublish, setAllowPublish] = useState(false);

  // Check if user already rated this port
  useEffect(() => {
    const localKey = `port_rating_${portSlug}`;
    const existingRating = localStorage.getItem(localKey);
    if (existingRating) {
      setHasRated(true);
      setRating(parseInt(existingRating));
    }
  }, [portSlug]);

  const handleStarClick = (value) => {
    if (hasRated) return;
    setRating(value);
  };

  const handleStarHover = (value) => {
    if (!hasRated) {
      setHoverRating(value);
    }
  };

  const handleSubmitRating = async () => {
    if (rating === 0 || hasRated || isSubmitting) return;

    setIsSubmitting(true);
    const localKey = `port_rating_${portSlug}`;

    // Save to localStorage first (optimistic update)
    localStorage.setItem(localKey, rating.toString());
    setHasRated(true);

    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('port_guide_ratings')
        .insert({
          port_slug: portSlug,
          port_name: portName,
          rating: rating,
          user_agent: navigator.userAgent,
          session_id: getSessionId()
        });

      if (error) {
        console.warn('Rating saved locally (Supabase unavailable):', error.message);
      }

      // Show success message
      setSubmitSuccess(true);

    } catch (err) {
      console.warn('Rating saved locally only:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Submit rating with review to Supabase
      const { error } = await supabase
        .from('port_guide_ratings')
        .insert({
          port_slug: portSlug,
          port_name: portName,
          rating: rating,
          review_title: reviewTitle || null,
          review_text: reviewText || null,
          reviewer_name: reviewerName || null,
          reviewer_location: reviewerLocation || null,
          visit_date: visitDate || null,
          cruise_line: cruiseLine || null,
          allow_publish: allowPublish,
          user_agent: navigator.userAgent,
          session_id: getSessionId()
        });

      if (error) {
        console.error('Error submitting review:', error);
        alert('There was an error submitting your review. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem(`port_rating_${portSlug}`, rating.toString());
      setHasRated(true);
      setSubmitSuccess(true);
      setShowReviewForm(false);

    } catch (err) {
      console.error('Error submitting review:', err);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="port-guide-feedback compact">
      {!hasRated ? (
        <div className="feedback-form">
          <div className="feedback-header">
            <span className="feedback-question">Was this guide useful?</span>
            
            {/* Compact Star Rating */}
            <div className="star-rating-inline">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`star-button ${(hoverRating || rating) >= value ? 'active' : ''}`}
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => handleStarHover(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  disabled={hasRated}
                  aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                >
                  <Star 
                    size={24} 
                    fill={(hoverRating || rating) >= value ? '#FFD700' : 'none'}
                    stroke={(hoverRating || rating) >= value ? '#FFD700' : '#ccc'}
                  />
                </button>
              ))}
              
              {/* Submit inline when rating selected */}
              {rating > 0 && !showReviewForm && (
                <button 
                  className="btn-submit-inline"
                  onClick={handleSubmitRating}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
              )}
            </div>
          </div>

          {/* Option to add review after rating */}
          {rating > 0 && !showReviewForm && (
            <button 
              className="btn-add-review-link"
              onClick={() => setShowReviewForm(true)}
            >
              Want to leave a comment?
            </button>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <form className="review-form" onSubmit={handleSubmitReview}>
              <h4>Share Your Experience</h4>

              <div className="form-group">
                <label htmlFor="reviewTitle">Review Title (Optional)</label>
                <input
                  type="text"
                  id="reviewTitle"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g., Perfect day in Lisbon!"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reviewText">Your Review (Optional)</label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your experience using this port guide..."
                  rows={5}
                  maxLength={1000}
                />
                <span className="char-count">{reviewText.length}/1000</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reviewerName">Your Name (Optional)</label>
                  <input
                    type="text"
                    id="reviewerName"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g., Sarah M."
                    maxLength={50}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reviewerLocation">Your Location (Optional)</label>
                  <input
                    type="text"
                    id="reviewerLocation"
                    value={reviewerLocation}
                    onChange={(e) => setReviewerLocation(e.target.value)}
                    placeholder="e.g., Manchester, UK"
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="visitDate">Visit Date (Optional)</label>
                  <input
                    type="date"
                    id="visitDate"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cruiseLine">Cruise Line (Optional)</label>
                  <input
                    type="text"
                    id="cruiseLine"
                    value={cruiseLine}
                    onChange={(e) => setCruiseLine(e.target.value)}
                    placeholder="e.g., P&O Cruises"
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="form-group-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={allowPublish}
                    onChange={(e) => setAllowPublish(e.target.checked)}
                  />
                  <span>
                    I give permission to publish this review on the port guide page.
                    Your review will be moderated before being displayed publicly.
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : submitSuccess ? (
        <div className="feedback-success">
          <CheckCircle size={48} color="#10b981" />
          <h3>Thank You!</h3>
          <p>Your {reviewText ? 'review has' : 'rating has'} been submitted successfully.</p>
          {allowPublish && (
            <p className="moderation-notice">
              Your review will be reviewed by our team and published within 24-48 hours.
            </p>
          )}
        </div>
      ) : (
        <div className="feedback-thankyou">
          <CheckCircle size={32} color="#10b981" />
          <p>Thank you for rating this port guide!</p>
          <div className="rated-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                size={24}
                fill={value <= rating ? '#FFD700' : 'none'}
                stroke={value <= rating ? '#FFD700' : '#ccc'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PortGuideFeedback;
