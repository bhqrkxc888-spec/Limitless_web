import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './FeedbackSection.css';

/**
 * Generate or retrieve a session ID for feedback deduplication
 */
function getSessionId() {
  const key = 'cruise_feedback_session';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

/**
 * FeedbackSection - Simple Yes/No feedback for cruise guide sections
 * Stores feedback in Supabase with fallback to localStorage
 */
function FeedbackSection({ sectionKey, dayNumber, cruiseCode = 'G606', portName = null }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for existing vote on mount
  useEffect(() => {
    const localKey = `cruise_feedback_${cruiseCode}_${sectionKey}_day${dayNumber}`;
    const existingVote = localStorage.getItem(localKey);
    if (existingVote) {
      setHasVoted(true);
    }
  }, [cruiseCode, sectionKey, dayNumber]);

  const handleVote = async (isHelpful) => {
    if (hasVoted || isSubmitting) return;
    
    setIsSubmitting(true);
    const localKey = `cruise_feedback_${cruiseCode}_${sectionKey}_day${dayNumber}`;
    
    // Optimistic UI update
    setHasVoted(true);
    localStorage.setItem(localKey, isHelpful ? 'helpful' : 'not-helpful');

    try {
      // Submit to Supabase (only if client is configured)
      if (supabase) {
        const { error } = await supabase
          .from('guide_feedback')
          .insert({
            cruise_code: cruiseCode,
            day_number: dayNumber,
            port_name: portName,
            section_key: sectionKey,
            is_helpful: isHelpful,
            user_agent: navigator.userAgent,
            session_id: getSessionId()
          });

        if (error) {
          console.warn('Feedback saved locally (Supabase unavailable):', error.message);
        }
      }
    } catch (err) {
      // Silently fail - localStorage already has the vote
      console.warn('Feedback saved locally only:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-section">
      <div className="feedback-content">
        {!hasVoted ? (
          <div className="feedback-question">
            <p>Was this section helpful?</p>
            <div className="feedback-buttons">
              <button
                onClick={() => handleVote(true)}
                className="feedback-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : 'Yes'}
              </button>
              <button
                onClick={() => handleVote(false)}
                className="feedback-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : 'No'}
              </button>
            </div>
          </div>
        ) : (
          <div className="feedback-thankyou">
            <p>Thank you for your feedback</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackSection;
