'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    branch: DataTypes.STRING,
    team: DataTypes.STRING,
    responsibleId: DataTypes.STRING,
    responsibleName: DataTypes.STRING,
    customerName: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.STRING,
    solarLunar: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    phone: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    homeAddress1: DataTypes.TEXT,
    homeAddress2: DataTypes.STRING,
    companyName: DataTypes.STRING,
    position: DataTypes.STRING,
    companyPhone: DataTypes.STRING,
    companyPostalCode: DataTypes.STRING,
    companyAddress1: DataTypes.STRING,
    companyAddress2: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    bank: DataTypes.STRING,
    accountHolder: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    memo: DataTypes.TEXT,
    registrationDate: DataTypes.STRING,
    familyName1: DataTypes.STRING,
    relationship1: DataTypes.STRING,
    familyBirthdate1: DataTypes.STRING,
    gender1: DataTypes.STRING,
    familyName2: DataTypes.STRING,
    relationship2: DataTypes.STRING,
    familyBirthdate2: DataTypes.STRING,
    gender2: DataTypes.STRING,
    familyName3: DataTypes.STRING,
    relationship3: DataTypes.STRING,
    familyBirthdate3: DataTypes.STRING,
    gender3: DataTypes.STRING,
    familyName4: DataTypes.STRING,
    relationship4: DataTypes.STRING,
    familyBirthdate4: DataTypes.STRING,
    gender4: DataTypes.STRING,
    familyName5: DataTypes.STRING,
    relationship5: DataTypes.STRING,
    familyBirthdate5: DataTypes.STRING,
    gender5: DataTypes.STRING,
    familyName6: DataTypes.STRING,
    relationship6: DataTypes.STRING,
    familyBirthdate6: DataTypes.STRING,
    gender6: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};