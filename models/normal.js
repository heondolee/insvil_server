'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class normal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  normal.init({
    branch: DataTypes.TEXT,
    team: DataTypes.TEXT,
    manager: DataTypes.TEXT,
    managerName: DataTypes.TEXT,
    userId: DataTypes.TEXT,
    realUser: DataTypes.TEXT,
    contractCompany: DataTypes.TEXT,
    longTermProduct: DataTypes.TEXT,
    insurancePremium: DataTypes.TEXT,
    revisedPremium: DataTypes.TEXT,
    revisionRate: DataTypes.TEXT,
    insuredPerson: DataTypes.TEXT,
    birthdateGender: DataTypes.TEXT,
    policyholder: DataTypes.TEXT,
    policyholderBirthdateGender: DataTypes.TEXT,
    policyNumber: DataTypes.TEXT,
    design: DataTypes.TEXT,
    consultationStatus: DataTypes.TEXT,
    contractStatus: DataTypes.TEXT,
    paymentStartDate: DataTypes.TEXT,
    paymentEndDate: DataTypes.TEXT,
    paymentPeriod: DataTypes.TEXT,
    contractDate: DataTypes.TEXT,
    paymentDate: DataTypes.TEXT,
    coverageStartDate: DataTypes.TEXT,
    coverageEndDate: DataTypes.TEXT,
    consultationChannel: DataTypes.TEXT,
    additionalInfo1: DataTypes.TEXT,
    paymentMethod: DataTypes.TEXT,
    paymentCount: DataTypes.TEXT,
    totalPayments: DataTypes.TEXT,
    consultant: DataTypes.TEXT,
    percent: DataTypes.TEXT,
    CyberMoney: DataTypes.TEXT,
    gift: DataTypes.TEXT,
    policyDispatchDate: DataTypes.TEXT,
    signatureDate: DataTypes.TEXT,
    changeContent1: DataTypes.TEXT,
    changeDate1: DataTypes.TEXT,
    changeContent2: DataTypes.TEXT,
    changeDate2: DataTypes.TEXT,
    changeContent3: DataTypes.TEXT,
    changeDate3: DataTypes.TEXT,
    changeContent4: DataTypes.TEXT,
    changeDate4: DataTypes.TEXT,
    changeContent5: DataTypes.TEXT,
    changeDate5: DataTypes.TEXT,
    insuredPersonZipcode: DataTypes.TEXT,
    insuredPersonAddress1: DataTypes.TEXT,
    insuredPersonAddress2: DataTypes.TEXT,
    policyholderZipcode: DataTypes.TEXT,
    policyholderAddress1: DataTypes.TEXT,
    policyholderAddress2: DataTypes.TEXT,
    relationToInsured: DataTypes.TEXT,
    occupation: DataTypes.TEXT,
    entryDate: DataTypes.TEXT,
    customerConsultationContent: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'normal',
  });
  return normal;
};