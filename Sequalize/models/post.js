'use strict';
const {
  Model,
  UUID,
  DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      //if we dont pass which foreign key to look for the bydefault
      //it gona look for name of the model+primary key which is(UserId)
      //to change this default behavior 
      this.belongsTo(User, {foreignKey:"userId",as:"user"});
    }
    toJSON(){
      return {...this.get(),id:undefined,userId:undefined}
    }
  }
  Post.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
    },
    
  body:{
    type:DataTypes.STRING,
    allowNull:false,
  }
    
  }, {
    sequelize,
    tableName:"posts",
    modelName: 'Post',
  });
  return Post;
};