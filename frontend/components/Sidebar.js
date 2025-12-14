"use client";

import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, Settings, User, Trash2 } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ currentConversationId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, [currentConversationId]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to load sidebar:", error);
    }
  };

  const handleNewChat = () => {
    onSelectConversation(null);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    // if (!confirm("Are you sure you want to delete this chat?")) return; // Blocking confirm might be issue for auto-testing or user popup blockers?

    try {
      const res = await fetch(`http://localhost:5000/api/conversations/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setConversations(conversations.filter(c => c._id !== id));
        if (currentConversationId === id) {
          onSelectConversation(null); // Deselect if current was deleted
        }
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={handleNewChat}>
        <Plus size={16} />
        New Chat
      </button>

      <div className="recent-chats">
        <div className="recent-title">Recent</div>
        {conversations.map((chat) => (
          <div 
            key={chat._id} 
            className={`chat-item ${currentConversationId === chat._id ? 'active' : ''}`}
            onClick={() => onSelectConversation(chat._id)}
          >
            <div className="chat-item-content">
              <MessageSquare size={16} color="#888" />
              <span className="chat-title">{chat.title}</span>
            </div>
            <button 
              className="delete-btn"
              onClick={(e) => handleDelete(e, chat._id)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="footer-item">
          <User size={16} />
          <span>User Profile</span>
        </div>
        <div className="footer-item">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
