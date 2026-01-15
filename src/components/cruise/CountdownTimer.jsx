import { useState, useEffect, useCallback } from 'react';
// motion is used in JSX as <motion.span>
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './CountdownTimer.css';

/**
 * AnimatedNumber - Individual countdown unit with animation
 */
const AnimatedNumber = ({ value, label }) => (
  <div className="countdown-unit">
    <div className="countdown-number-wrapper">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="countdown-number"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="countdown-label">{label}</span>
  </div>
);

/**
 * CountdownTimer - Celebratory countdown to cruise departure
 * Integrates with Limitless Cruises design system
 * 
 * Features:
 * - Animated number transitions (Days, Hours, Minutes)
 * - Milestone messages (30d, 14d, 7d, 1d)
 * - Auto-hides when cruise starts (returns null)
 * 
 * Props:
 * - departureDate: ISO date string for departure
 * - shipName: Name of the ship
 * - hideWhenOnboard: If true, returns null when cruise starts (default: true)
 */
const CountdownTimer = ({ 
  departureDate = "2026-03-14T16:30:00", 
  shipName = "Iona",
  hideWhenOnboard = true
}) => {
  const calculateTimeLeft = useCallback(() => {
    const departure = new Date(departureDate);
    const now = new Date();
    const difference = departure - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, total: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      total: difference
    };
  }, [departureDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const [isOnBoard, setIsOnBoard] = useState(false);

  useEffect(() => {
    // Check initial state
    const initial = calculateTimeLeft();
    if (initial.total <= 0) {
      setIsOnBoard(true);
    }

    // Update every minute (no need for seconds anymore)
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        setIsOnBoard(true);
      }
    }, 60000); // Update every minute

    // Also update on seconds for smoother countdown initially
    const secondsTimer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(secondsTimer);
    };
  }, [departureDate, calculateTimeLeft]);

  // Milestone celebrations
  const getMilestoneMessage = () => {
    const { days } = timeLeft;
    if (days === 30) return "🎉 One month to go!";
    if (days === 14) return "✨ Two weeks to go!";
    if (days === 7) return "🚢 One week to go!";
    if (days === 1) return "😱 Tomorrow!";
    if (days === 0 && timeLeft.total > 0) return "🎊 Today's the day!";
    return null;
  };

  const milestone = getMilestoneMessage();

  // Auto-hide when cruise starts
  if (isOnBoard && hideWhenOnboard) {
    return null;
  }

  return (
    <div className="countdown-container">
      {milestone && (
        <motion.div 
          className="countdown-milestone"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {milestone}
        </motion.div>
      )}
      
      <h3 className="countdown-heading">
        Setting sail on {shipName}
      </h3>
      
      <div className="countdown-grid">
        <AnimatedNumber value={timeLeft.days} label="Days" />
        <span className="countdown-separator">:</span>
        <AnimatedNumber value={timeLeft.hours} label="Hours" />
        <span className="countdown-separator">:</span>
        <AnimatedNumber value={timeLeft.minutes} label="Minutes" />
      </div>
      
      <p className="countdown-date">
        14th March 2026 • Southampton
      </p>
    </div>
  );
};

export default CountdownTimer;
