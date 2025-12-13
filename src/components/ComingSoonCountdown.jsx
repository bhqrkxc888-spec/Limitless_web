import { useState, useEffect } from 'react';
import './ComingSoonCountdown.css';

function ComingSoonCountdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="countdown">
      <div className="countdown-intro">
        <p className="countdown-label">New site launching in</p>
      </div>
      
      <div className="countdown-display">
        <div className="countdown-unit">
          <span className="countdown-value">{days}</span>
          <span className="countdown-label-small">Days</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{hours}</span>
          <span className="countdown-label-small">Hours</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{minutes}</span>
          <span className="countdown-label-small">Minutes</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{seconds}</span>
          <span className="countdown-label-small">Seconds</span>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonCountdown;

