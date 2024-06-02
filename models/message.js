'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        onDelete: 'CASCADE'
      });
      Message.belongsTo(models.Message, {
        foreignKey: 'reply_of',
        onDelete: 'CASCADE'
      });
      Message.hasMany(models.Message, {
        foreignKey: 'reply_of',
        as: 'Replies'
      });
    }
  }
  Message.init({
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reply_of: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Messages',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
