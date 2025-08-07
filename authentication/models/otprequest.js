'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OtpRequest.belongsTo(models.User,{
        foreignKey:"userId",
      })
    }
  }
  OtpRequest.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    userId: {
      type:DataTypes.UUID,
      allowNull:false,
    },
    email:{ 
      type:DataTypes.STRING,
      allowNull:false,
    },
   otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'OtpRequest',
  });
  return OtpRequest;
};