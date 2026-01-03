import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend, disabled, readyToSubmit, submitted, onSubmit, onContinue }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (readyToSubmit && !submitted) {
    return (
      <div className="chat-input submit-ready">
        <div className="submit-prompt">
          <p>✅ I have all the information I need! Ready to submit your enquiry?</p>
          <div className="submit-buttons">
            <button 
              className="btn-submit" 
              onClick={onSubmit}
              disabled={disabled}
            >
              Submit Enquiry
            </button>
            <button 
              className="btn-continue" 
              onClick={onContinue}
            >
              Continue Chatting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={submitted ? "Enquiry submitted!" : "Type your message..."}
        disabled={disabled}
        className="chat-input-field"
      />
      <button 
        type="submit" 
        disabled={!input.trim() || disabled}
        className="btn-send"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

