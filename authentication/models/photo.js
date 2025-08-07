'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Photo.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //ensure this is here
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });

  return Photo;
};
