'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarDesign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarDesign.init({
    branch: DataTypes.TEXT,
    team: DataTypes.TEXT,
    personInCharge: DataTypes.TEXT,
    responsibilityName: DataTypes.TEXT,
    userName: DataTypes.TEXT,
    user: DataTypes.TEXT,
    contractCompany: DataTypes.TEXT,
    agencyCode: DataTypes.TEXT,
    agencyName: DataTypes.TEXT,
    oneYearPremium: DataTypes.TEXT,
    firstPremium: DataTypes.TEXT,
    installmentPremium: DataTypes.TEXT,
    insured: DataTypes.TEXT,
    insuredBirthGender: DataTypes.TEXT,
    contractor: DataTypes.TEXT,
    contractorBirthGender: DataTypes.TEXT,
    carNumber: DataTypes.TEXT,
    design: DataTypes.TEXT,
    consultingStatus: DataTypes.TEXT,
    contractStatus: DataTypes.TEXT,
    objectClassification: DataTypes.TEXT,
    startDate: DataTypes.TEXT,
    endDate: DataTypes.TEXT,
    receiptDate: DataTypes.TEXT,
    consultationPath: DataTypes.TEXT,
    etc1: DataTypes.TEXT,
    paymentMethod: DataTypes.TEXT,
    consultant: DataTypes.TEXT,
    percentage: DataTypes.TEXT,
    cyberMoney: DataTypes.TEXT,
    gift: DataTypes.TEXT,
    designNumber: DataTypes.TEXT,
    insuranceNumber: DataTypes.TEXT,
    previousContractCompany: DataTypes.TEXT,
    insuredPostalCode: DataTypes.TEXT,
    insuredAddress1: DataTypes.TEXT,
    insuredAddress2: DataTypes.TEXT,
    contractorPostalCode: DataTypes.TEXT,
    contractorAddress1: DataTypes.TEXT,
    contractorAddress2: DataTypes.TEXT,
    relationshipWithInsured: DataTypes.TEXT,
    relationshipWithSpecifiedPerson: DataTypes.TEXT,
    specifiedPersonName: DataTypes.TEXT,
    minDriverName: DataTypes.TEXT,
    spouseName: DataTypes.TEXT,
    insuranceType: DataTypes.TEXT,
    carType: DataTypes.TEXT,
    mileageApplication: DataTypes.TEXT,
    ageRestriction: DataTypes.TEXT,
    driverRestriction: DataTypes.TEXT,
    carNameCode: DataTypes.TEXT,
    year: DataTypes.TEXT,
    carName: DataTypes.TEXT,
    displacement: DataTypes.TEXT,
    specialRate: DataTypes.TEXT,
    accessories: DataTypes.TEXT,
    accessoryPrice: DataTypes.TEXT,
    carValue: DataTypes.TEXT,
    totalCar: DataTypes.TEXT,
    liability1: DataTypes.TEXT,
    liability2: DataTypes.TEXT,
    propertyDamage: DataTypes.TEXT,
    personalInjury: DataTypes.TEXT,
    uninsuredMotorist: DataTypes.TEXT,
    ownDamage: DataTypes.TEXT,
    emergencyDispatch: DataTypes.TEXT,
    subscriptionExperience: DataTypes.TEXT,
    legalViolations: DataTypes.TEXT,
    discountSurcharge: DataTypes.TEXT,
    specialSurcharge1: DataTypes.TEXT,
    specialSurcharge2: DataTypes.TEXT,
    threeYearAccidentRate: DataTypes.TEXT,
    oneYearAccidentScore: DataTypes.TEXT,
    threeYearAccidentScore: DataTypes.TEXT,
    carSubscriptionExperience: DataTypes.TEXT,
    otherOwnedCars: DataTypes.TEXT,
    currentMileage: DataTypes.TEXT,
    annualMileage: DataTypes.TEXT,
    mileageDiscount: DataTypes.TEXT,
    inputDate: DataTypes.TEXT,
    customerConsultation: DataTypes.TEXT,
    preConsent: DataTypes.TEXT,
    consentDate: DataTypes.TEXT,
    preConsentNumber: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CarDesign',
  });
  return CarDesign;
};