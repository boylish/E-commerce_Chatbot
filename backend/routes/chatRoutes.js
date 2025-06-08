const express = require('express');
const router = express.Router();
const { saveChatLog, getChatLogs } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, saveChatLog);
router.get('/:userId', authMiddleware, getChatLogs);

module.exports = router;
