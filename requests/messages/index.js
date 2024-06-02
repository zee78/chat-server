const { body, param } = require("express-validator");
const Models = require("../../models");

const createMessageRules = () => {
  return [
    body('sender_id')
      .notEmpty().withMessage('Sender ID is required')
      .isInt().withMessage('Sender ID must be an integer'),
    body('conversation_id')
      .notEmpty().withMessage('Conversation ID is required')
      .isInt().withMessage('Conversation ID must be an integer'),
    body('reply_of')
      .optional()
      .isInt().withMessage('Reply Of must be an integer'),
    body("content")
      .notEmpty()
      .withMessage("Please enter message or file")
      .isString()
      .withMessage("Content field must be a string"),
    body("type")
      .notEmpty()
      .withMessage("Please send valid message type")
      .isIn(['text', 'audio', 'video', 'image', 'file'])
      .withMessage('Invalid message type'),
  ];
};
const updateMessageRules = () => {
  return [
    param('id')
      .isInt().withMessage('Message ID must be an integer'),
    body('sender_id')
      .optional()
      .isInt().withMessage('Sender ID must be an integer'),
    body('conversation_id')
      .optional()
      .isInt().withMessage('Conversation ID must be an integer'),
    body("content")
      .notEmpty()
      .withMessage("Please enter message or file")
      .isString()
      .withMessage("Content field must be a string"),
    body("type")
      .notEmpty()
      .withMessage("Please send valid message type")
      .isIn(['text', 'audio', 'video', 'image', 'file'])
      .withMessage('Invalid message type'),
  ];
};

module.exports = {
  createMessageRules,
  updateMessageRules,
};
