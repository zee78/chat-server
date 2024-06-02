'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      Participant.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        onDelete: 'CASCADE'
      });
      // Participant.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  Participant.init({
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};
