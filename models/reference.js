'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reference.init({
    Title: DataTypes.TEXT,
    Author: DataTypes.TEXT,
    Date: DataTypes.TEXT,
    Content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reference',
  });
  return reference;
};