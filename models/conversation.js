'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Participant, {
        foreignKey: 'conversation_id',
        as: 'participants'
      });
    }
  }
  Conversation.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_group: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'archived', 'starred'],
      defaultValue: 'active',
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    paranoid: true, 
    deletedAt: 'deleted_at', 
  });
  return Conversation;
};
