const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Conversation = require('../models/Conversation');
const { generateContent } = require('../utils/gemini');

console.log("DEBUG: Loading API Routes...");

// Health Check
router.get('/test', async (req, res) => {
  try {
    await Chat.db.admin().ping();
    res.json({ message: "Test route operational", database: "Connected successfully", timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

// Get All Conversations (Sidebar)
router.get('/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Create New Conversation
router.post('/conversations', async (req, res) => {
  try {
    const conversation = new Conversation({ title: "New Chat" });
    await conversation.save();
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Delete Conversation
router.delete('/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Conversation.findByIdAndDelete(id);
    await Chat.deleteMany({ conversationId: id });
    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Get Messages for a Conversation
router.get('/chat/:conversationId', async (req, res) => {
  try {
    const messages = await Chat.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Handle Chat Message
router.post('/chat', async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message || !conversationId) {
    return res.status(400).json({ error: 'Message and conversationId are required' });
  }

  console.log(`Received message: "${message}" for conversation: ${conversationId}`);

  try {
    // 1. Save User Message
    const userChat = new Chat({ 
      role: 'user', 
      content: message,
      conversationId: conversationId 
    });
    await userChat.save();

    // 2. Generate AI Response
    const aiResponse = await generateContent(message);

    // 3. Save AI Message
    const aiChat = new Chat({ 
      role: 'model', 
      content: aiResponse,
      conversationId: conversationId
    });
    await aiChat.save();

    // 4. Update Conversation Title (if it's the first message or still "New Chat")
    const conversation = await Conversation.findById(conversationId);
    if (conversation && conversation.title === "New Chat") {
      // Simple title generation: first 30 chars of user message
      conversation.title = message.substring(0, 30) + (message.length > 30 ? "..." : "");
      await conversation.save();
    }
    // Update timestamp
    await Conversation.findByIdAndUpdate(conversationId, { updatedAt: Date.now() });

    console.log("AI Response saved:", aiResponse.substring(0, 50) + "...");
    res.json({ response: aiResponse });

  } catch (error) {
    console.error('DEBUG: Chat Error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

console.log("DEBUG: API Router Exporting...");
module.exports = router;
