"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ChatArea.css';

const ChatArea = ({ conversationId, setConversationId }) => {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am NovaGPT. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!conversationId) {
      setMessages([{ role: 'model', content: 'Hello! I am NovaGPT. How can I help you today?' }]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chat/${conversationId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    fetchMessages();
  }, [conversationId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    let currentConvId = conversationId;
    if (!currentConvId) {
      try {
        const res = await fetch('http://localhost:5000/api/conversations', { method: 'POST' });
        if (res.ok) {
           const newConv = await res.json();
           currentConvId = newConv._id;
           setConversationId(currentConvId);
        }
      } catch (e) {
        console.error("Failed to create conversation", e);
        return;
      }
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage.content,
          conversationId: currentConvId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setIsLoading(false); // Stop spinner, start typing

      // Add empty model message
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      const fullText = data.response;
      let currentIndex = 0;

      // Typing effect interval
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            // Only update if it's the model message we just added
            if (lastMsg.role === 'model') {
              lastMsg.content = fullText.slice(0, currentIndex + 1); // Reliable slicing
            }
            return newMessages;
          });
          currentIndex++;
          scrollToBottom();
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // 10ms per char = fast typing

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error connecting to the server." }]);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-icon">
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className="message-content markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message model">
             <div className="message-icon">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <span className="loading-dots">Thinking</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button 
            className="send-btn" 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
