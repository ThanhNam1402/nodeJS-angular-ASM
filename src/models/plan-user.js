'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_User extends Model {

    static associate(models) {
    }
  };
  Plan_User.init({
    plan_ID: DataTypes.INTEGER,
    user_ID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Plan_User',
  });
  return Plan_User;
};