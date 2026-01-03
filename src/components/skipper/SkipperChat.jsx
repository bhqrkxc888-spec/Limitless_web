import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ConversationSummary from './ConversationSummary';
import ConsentBanner from './ConsentBanner';
import TypingIndicator from './TypingIndicator';
import './SkipperChat.css';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function SkipperChat() {
  const [sessionId] = useState(() => generateId());
  const [messages, setMessages] = useState([]);
  const [collectedData, setCollectedData] = useState({});
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check for stored consent
    const consent = sessionStorage.getItem('skipper_consent');
    if (consent === 'true') {
      setHasConsented(true);
      // Add welcome message
      setMessages([{
        id: generateId(),
        role: 'assistant',
        content: "Hi! I'm The Skipper. Where would you like to sail?"
      }]);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleConsent = () => {
    sessionStorage.setItem('skipper_consent', 'true');
    setHasConsented(true);
    // Add welcome message
    setMessages([{
      id: generateId(),
      role: 'assistant',
      content: "Hi! I'm The Skipper. Where would you like to sail?"
    }]);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isTyping || submitted) return;

    const userMessage = {
      id: generateId(),
      role: 'user',
      content: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const crmUrl = import.meta.env.VITE_CRM_API_URL || 'https://crm.limitlesscruises.com';
      
      const response = await fetch(`${crmUrl}/api/public/skipper-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: messageText,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          collectedData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Update collected data
      if (data.extractedData) {
        setCollectedData(prev => ({
          ...prev,
          ...data.extractedData
        }));
      }

      // Update ready to submit status
      if (data.readyToSubmit) {
        setReadyToSubmit(true);
      }

      const assistantMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.message || "I'm having trouble connecting. Please try again.",
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please call us at 0114 321 3208 or try again in a moment.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async () => {
    if (!readyToSubmit || submitted) return;

    setIsTyping(true);

    try {
      const crmUrl = import.meta.env.VITE_CRM_API_URL || 'https://crm.limitlesscruises.com';
      
      const response = await fetch(`${crmUrl}/api/public/skipper-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          collectedData,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setSubmitted(true);

      const confirmationMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.message || "✅ Your enquiry has been submitted! We'll be in touch soon.",
      };

      setMessages(prev => [...prev, confirmationMessage]);
    } catch (error) {
      console.error('Submit error:', error);
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: "Sorry, there was a problem submitting your enquiry. Please call us at 0114 321 3208",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!hasConsented) {
    return <ConsentBanner onAccept={handleConsent} />;
  }

  return (
    <div className="skipper-chat">
      <div className="chat-main">
        <div className="chat-messages">
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSend={handleSendMessage}
          disabled={isTyping || submitted}
          readyToSubmit={readyToSubmit}
          submitted={submitted}
          onSubmit={handleSubmit}
          onContinue={() => setReadyToSubmit(false)}
        />
      </div>
      <ConversationSummary collectedData={collectedData} conversationHistory={messages} />
    </div>
  );
}

export default SkipperChat;

