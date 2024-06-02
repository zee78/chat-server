var express = require('express');
const conversationRoutes = require('./conversations');
const messageRoutes = require('./messages');

const router = express.Router();

router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
