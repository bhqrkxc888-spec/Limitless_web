import { useState } from 'react';
import './FeedbackSection.css';

// FB Group URL - placeholder, to be provided
const FB_GROUP_URL = '#'; // Replace with actual URL

function FeedbackSection({ sectionKey, dayNumber }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState(null);

  const handleVote = (isHelpful) => {
    if (hasVoted) return;
    
    // Store in localStorage for simple tracking
    const key = `cruise_feedback_${sectionKey}_day${dayNumber}`;
    localStorage.setItem(key, isHelpful ? 'helpful' : 'not-helpful');
    
    setVote(isHelpful);
    setHasVoted(true);
  };

  return (
    <div className="feedback-section">
      <hr className="feedback-divider" />
      
      <div className="feedback-content">
        <div className="feedback-question">
          <p>Was this section helpful?</p>
          <div className="feedback-buttons">
            <button
              onClick={() => handleVote(true)}
              className={`feedback-button ${hasVoted && vote === true ? 'voted' : ''}`}
              disabled={hasVoted}
              aria-pressed={hasVoted && vote === true}
            >
              👍 Yes
            </button>
            <button
              onClick={() => handleVote(false)}
              className={`feedback-button ${hasVoted && vote === false ? 'voted' : ''}`}
              disabled={hasVoted}
              aria-pressed={hasVoted && vote === false}
            >
              👎 No
            </button>
          </div>
        </div>

        <hr className="feedback-divider" />

        <div className="feedback-share">
          <p>💬 SHARE YOUR EXPERIENCE</p>
          <p>Been here before? Help fellow cruisers!</p>
          <a 
            href={FB_GROUP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="feedback-link"
          >
            Share a tip →
          </a>
        </div>

        <hr className="feedback-divider" />

        <div className="feedback-error">
          <p>🚩 Spot an error?</p>
          <a 
            href="/contact?subject=Cruise Companion Error - Day " + dayNumber + " - " + sectionKey
            className="feedback-link"
          >
            Let us know
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSection;
