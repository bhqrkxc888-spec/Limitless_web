import './TypingIndicator.css';

function TypingIndicator() {
  return (
    <div className="chat-message assistant">
      <div className="message-avatar">⚓</div>
      <div className="message-bubble typing">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default TypingIndicator;

