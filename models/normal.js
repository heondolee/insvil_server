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
    branch: DataTypes.STRING,
    team: DataTypes.STRING,
    responsible: DataTypes.STRING,
    responsibleName: DataTypes.STRING,
    userId: DataTypes.STRING,
    actualUser: DataTypes.STRING,
    contractCompany: DataTypes.STRING,
    longTermProduct: DataTypes.STRING,
    productName: DataTypes.STRING,
    paymentInsurance: DataTypes.STRING,
    correctedInsurance: DataTypes.STRING,
    correctionRate: DataTypes.STRING,
    insuredPerson: DataTypes.STRING,
    insuredBirthDateGender: DataTypes.STRING,
    contractor: DataTypes.STRING,
    contractorBirthDateGender: DataTypes.STRING,
    policyNumber: DataTypes.STRING,
    design: DataTypes.STRING,
    consultationStatus: DataTypes.STRING,
    contractStatus: DataTypes.STRING,
    paymentStartDate: DataTypes.STRING,
    paymentEndDate: DataTypes.STRING,
    paymentPeriod: DataTypes.STRING,
    contractDate: DataTypes.STRING,
    paymentDate: DataTypes.STRING,
    coverageStartDate: DataTypes.STRING,
    coverageEndDate: DataTypes.STRING,
    consultationPath: DataTypes.STRING,
    extra1: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    paymentInstallment: DataTypes.STRING,
    totalInstallments: DataTypes.STRING,
    consultant: DataTypes.STRING,
    percent: DataTypes.STRING,
    cyberMoney: DataTypes.STRING,
    gift: DataTypes.STRING,
    policyDispatchDate: DataTypes.STRING,
    handwrittenSignatureDate: DataTypes.STRING,
    changeContent1: DataTypes.STRING,
    changeDate1: DataTypes.STRING,
    changeContent2: DataTypes.STRING,
    changeDate2: DataTypes.STRING,
    changeContent3: DataTypes.STRING,
    changeDate3: DataTypes.STRING,
    changeContent4: DataTypes.STRING,
    changeDate4: DataTypes.STRING,
    changeContent5: DataTypes.STRING,
    changeDate5: DataTypes.STRING,
    insuredPostalCode: DataTypes.STRING,
    insuredAddress1: DataTypes.STRING,
    insuredAddress2: DataTypes.STRING,
    contractorPostalCode: DataTypes.STRING,
    contractorAddress1: DataTypes.STRING,
    contractorAddress2: DataTypes.STRING,
    relationshipWithInsured: DataTypes.STRING,
    occupation: DataTypes.STRING,
    entryDate: DataTypes.STRING,
    customerCounselingContent: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'normal',
  });
  return normal;
};