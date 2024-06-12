'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Plan, { foreignKey: 'userId' });
    }
  };
  User.init({
    full_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_ID: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};