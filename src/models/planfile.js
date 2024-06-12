'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanFile extends Model {

    static associate(models) {
    }
  };
  PlanFile.init({
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    plan_ID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlanFile',
  });
  return PlanFile;
};