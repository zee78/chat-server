'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReadStatus extends Model {
    static associate(models) {
      // Define associations here
      ReadStatus.belongsTo(models.Message, {
        foreignKey: 'message_id',
        onDelete: 'CASCADE'
      });
      ReadStatus.belongsTo(models.Participant, {
        foreignKey: 'participant_id',
        onDelete: 'CASCADE'
      });
    }
  }
  ReadStatus.init({
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Messages',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Participants',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'ReadStatus',
  });
  return ReadStatus;
};
