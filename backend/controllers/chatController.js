const ChatLog = require('../models/ChatLog');

exports.saveChatLog = async (req, res) => {
  try {
    const { userId, messages } = req.body;
    let chatLog = await ChatLog.findOne({ userId });

    if (chatLog) {
      chatLog.messages = chatLog.messages.concat(messages);
      chatLog.updatedAt = Date.now();
    } else {
      chatLog = new ChatLog({ userId, messages });
    }

    await chatLog.save();
    res.json({ message: 'Chat log saved' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getChatLogs = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chatLog = await ChatLog.findOne({ userId });
    if (!chatLog) return res.status(404).json({ message: 'No chat logs found' });

    res.json(chatLog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
