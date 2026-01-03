import './ChatMessage.css';

function ChatMessage({ message }) {
  const { role, content } = message;
  
  return (
    <div className={`chat-message ${role}`}>
      <div className="message-avatar">
        {role === 'assistant' ? '⚓' : '👤'}
      </div>
      <div className="message-bubble">
        {content}
      </div>
    </div>
  );
}

export default ChatMessage;

