const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ["user", "model"] },
  content: { type: String, required: true },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
