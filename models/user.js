'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    branch: DataTypes.STRING,
    team: DataTypes.STRING,
    manager: DataTypes.STRING,
    userCode: DataTypes.STRING,
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    employeeNumber: DataTypes.STRING,
    birthdateGender: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    bank: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    accountHolder: DataTypes.STRING,
    address: DataTypes.STRING,
    settlementType: DataTypes.STRING,
    carSettlement: DataTypes.STRING,
    longTermSettlement: DataTypes.STRING,
    lifeSettlement: DataTypes.STRING,
    other: DataTypes.STRING,
    appointmentDate: DataTypes.STRING,
    dismissalDate: DataTypes.STRING,
    samsungLife: DataTypes.STRING,
    miraeAsset: DataTypes.STRING,
    dongyangLife: DataTypes.STRING,
    kyoboLife: DataTypes.STRING,
    metLife: DataTypes.STRING,
    hyundaiMarine: DataTypes.STRING,
    samsungFire: DataTypes.STRING,
    dbInsurance: DataTypes.STRING,
    kbInsurance: DataTypes.STRING,
    meritzFire: DataTypes.STRING,
    heungkukFire: DataTypes.STRING,
    mgInsurance: DataTypes.STRING,
    hanwhaInsurance: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};