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
    qty_student: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Specialized',
  });
  return Specialized;
};