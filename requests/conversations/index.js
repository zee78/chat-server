const { body } = require('express-validator');
const Models = require('../../models');

const createConversationRules = () => {
  return [
    body('participants')
      .isArray({ min: 1 })
      .withMessage('Participants must be an array with at least one participant'),
    body('participants.*.user_id')
      .isInt()
      .withMessage('Participant user_id must be an integer'),
    body('is_group')
      .notEmpty()
      .withMessage('Please send conversation type')
      .isBoolean()
      .withMessage('Conversation type must be a boolean (true for group, false for single)'),
  ];
};

const updateConversationRules = () => {
  return [
    body('title')
      .optional()
      .isString()
      .withMessage('Title must be a string'),
    body('status')
      .optional()
      .isString()
      .isIn(['active', 'archived', 'starred'])
      .withMessage('Invalid status')
  ];
};
module.exports = {
  createConversationRules,
  updateConversationRules,
};
