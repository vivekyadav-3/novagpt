"use client";

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

export default function Home() {
  // Store the full conversation object or just the ID. ID is simpler.
  const [currentConversationId, setCurrentConversationId] = useState(null);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <Sidebar 
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
      />
      <div style={{ flex: 1, backgroundColor: '#212121', color: 'white', padding: '0 2rem 1rem 2rem' }}>
        <ChatArea 
           conversationId={currentConversationId}
           setConversationId={setCurrentConversationId}
        />
      </div>
    </div>
  );
}
