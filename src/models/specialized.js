'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialized extends Model {

    static associate(models) {
    }
  };
  Specialized.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Specialized',
  });
  return Specialized;
};