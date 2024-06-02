const express = require('express');
const { getAllConversations, createConversation, getConversationById, softDeleteConversation, updateConversation } = require('../controllers/conversationsController');
const { validate } = require('../requests/validate');
const { createConversationRules, updateConversationRules } = require('../requests/conversations');

const conversationRouter = express.Router();

conversationRouter.get('/', getAllConversations);
conversationRouter.post(
  '/create', 
  createConversationRules(),
  validate, 
  createConversation);
conversationRouter.get('/:id',
 getConversationById);
conversationRouter.delete('/:id', softDeleteConversation);
conversationRouter.patch(
  '/:id',
  updateConversationRules(),
  validate, 
  updateConversation);

module.exports = conversationRouter;
