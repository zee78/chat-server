const express = require('express');
const { createMessage, getMessagesByConversationId, updateMessage, softDeleteMessage } = require('../controllers/messageController');
const { validate } = require('../requests/validate');
const { createMessageRules, updateMessageRules } = require('../requests/messages');

const messageRouter = express.Router();

messageRouter.get('/:id', getMessagesByConversationId);
messageRouter.post(
  '/create', 
  // createMessageRules(),
  // validate,
  createMessage);
messageRouter.delete('/:id', softDeleteMessage);
messageRouter.patch(
  '/:id', 
  // updateMessageRules(),
  // validate,
  updateMessage);

module.exports = messageRouter;
