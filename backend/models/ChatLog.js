const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const ChatLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatLog', ChatLogSchema);
