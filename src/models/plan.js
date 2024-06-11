'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {

    static associate(models) {
      Plan.belongsTo(models.Specialized),
      Plan.belongsTo(models.User);
    }
  };
  Plan.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    specializedId: DataTypes.INTEGER,
    group: DataTypes.STRING,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    fishdedAt: DataTypes.DATE,
    pubishedAt:DataTypes.DATE
}, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};