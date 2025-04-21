const express = require('express');
const { startChatbot, handleUserInput } = require('../controllers/chatbotController');

const router = express.Router();

router.get('/start', startChatbot);
router.post('/message', handleUserInput);

module.exports = router;
