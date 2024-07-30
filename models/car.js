'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    branch: DataTypes.STRING,
    team: DataTypes.STRING,
    manager: DataTypes.STRING,
    managerName: DataTypes.STRING,
    userId: DataTypes.STRING,
    actualUser: DataTypes.STRING,
    contractCompany: DataTypes.STRING,
    agencyCode: DataTypes.STRING,
    agencyName: DataTypes.STRING,
    annualInsuranceFee: DataTypes.TEXT,
    initialInsuranceFee: DataTypes.TEXT,
    installmentInsuranceFee: DataTypes.TEXT,
    insured: DataTypes.TEXT,
    insuredBirthDateGender: DataTypes.TEXT,
    policyHolder: DataTypes.TEXT,
    policyHolderBirthDateGender: DataTypes.TEXT,
    carNumber: DataTypes.STRING,
    design: DataTypes.TEXT,
    consultationStatus: DataTypes.STRING,
    contractStatus: DataTypes.STRING,
    propertyType: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    receiptDate: DataTypes.STRING,
    consultationPath: DataTypes.TEXT,
    extra1: DataTypes.TEXT,
    paymentMethod: DataTypes.STRING,
    consultant: DataTypes.TEXT,
    percent: DataTypes.STRING,
    cyberMoney: DataTypes.STRING,
    gift: DataTypes.STRING,
    designNumber: DataTypes.STRING,
    policyNumber: DataTypes.STRING,
    previousContractCompany: DataTypes.STRING,
    insuredPostalCode: DataTypes.STRING,
    insuredAddress1: DataTypes.TEXT,
    insuredAddress2: DataTypes.TEXT,
    policyHolderPostalCode: DataTypes.STRING,
    policyHolderAddress1: DataTypes.TEXT,
    policyHolderAddress2: DataTypes.TEXT,
    relationshipWithInsured: DataTypes.STRING,
    relationshipWithDesignated1: DataTypes.STRING,
    designated1Name: DataTypes.TEXT,
    minimumDriverName: DataTypes.TEXT,
    spouseName: DataTypes.TEXT,
    insuranceType: DataTypes.STRING,
    carType: DataTypes.STRING,
    mileageApplication: DataTypes.STRING,
    ageLimit: DataTypes.STRING,
    driverLimit: DataTypes.STRING,
    carNameCode: DataTypes.STRING,
    modelYear: DataTypes.STRING,
    carName: DataTypes.STRING,
    engineDisplacement: DataTypes.STRING,
    specialRate: DataTypes.STRING,
    accessory: DataTypes.TEXT,
    accessoryPrice: DataTypes.STRING,
    carValue: DataTypes.STRING,
    totalCarValue: DataTypes.STRING,
    liabilityCoverage: DataTypes.STRING,
    personalInjuryCoverage: DataTypes.STRING,
    propertyDamageCoverage: DataTypes.STRING,
    selfInjuryCoverage: DataTypes.STRING,
    uninsuredCoverage: DataTypes.STRING,
    ownDamageCoverage: DataTypes.STRING,
    emergencyRoadsideAssistance: DataTypes.STRING,
    insuranceHistory: DataTypes.TEXT,
    legalViolations: DataTypes.TEXT,
    discountSurcharge: DataTypes.STRING,
    specialSurcharge1: DataTypes.STRING,
    specialSurcharge2: DataTypes.STRING,
    threeYearAccidentRate: DataTypes.STRING,
    oneYearAccidentPoints: DataTypes.STRING,
    threeYearAccidentPoints: DataTypes.STRING,
    carInsuranceHistory: DataTypes.TEXT,
    otherOwnedVehicles: DataTypes.TEXT,
    currentMileage: DataTypes.STRING,
    annualMileage: DataTypes.STRING,
    mileageDiscount: DataTypes.STRING,
    entryDate: DataTypes.STRING,
    customerCounselingContent: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};