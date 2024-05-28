'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {

    static associate(models) {
    }
  };
  Plan.init({
    name: DataTypes.STRING,
    cate_ID: DataTypes.INTEGER,
    specialized_ID: DataTypes.INTEGER,
    group: DataTypes.STRING,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};