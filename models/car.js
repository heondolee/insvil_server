'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // define association here
    }
  }

  Car.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    branch: {
      type: DataTypes.TEXT
    },
    team: {
      type: DataTypes.TEXT
    },
    manager: {
      type: DataTypes.TEXT
    },
    managerName: {
      type: DataTypes.TEXT
    },
    userID: {
      type: DataTypes.TEXT
    },
    actualUser: {
      type: DataTypes.TEXT
    },
    contractCompany: {
      type: DataTypes.TEXT
    },
    agencyCode: {
      type: DataTypes.TEXT
    },
    agencyName: {
      type: DataTypes.TEXT
    },
    annualPremium: {
      type: DataTypes.TEXT
    },
    initialPremium: {
      type: DataTypes.TEXT
    },
    installmentPremium: {
      type: DataTypes.TEXT
    },
    insured: {
      type: DataTypes.TEXT
    },
    dobGender: {
      type: DataTypes.TEXT
    },
    contractor: {
      type: DataTypes.TEXT
    },
    contractorDobGender: {
      type: DataTypes.TEXT
    },
    vehicleNumber: {
      type: DataTypes.TEXT
    },
    design: {
      type: DataTypes.TEXT
    },
    counselStatus: {
      type: DataTypes.TEXT
    },
    contractStatus: {
      type: DataTypes.TEXT
    },
    itemCategory: {
      type: DataTypes.TEXT
    },
    startDate: {
      type: DataTypes.TEXT
    },
    endDate: {
      type: DataTypes.TEXT
    },
    receiptDate: {
      type: DataTypes.TEXT
    },
    counselRoute: {
      type: DataTypes.TEXT
    },
    additionalInfo1: {
      type: DataTypes.TEXT
    },
    paymentMethod: {
      type: DataTypes.TEXT
    },
    counselor: {
      type: DataTypes.TEXT
    },
    percent: {
      type: DataTypes.TEXT
    },
    cyberMoney: {
      type: DataTypes.TEXT
    },
    gift: {
      type: DataTypes.TEXT
    },
    designNumber: {
      type: DataTypes.TEXT
    },
    policyNumber: {
      type: DataTypes.TEXT
    },
    previousCompany: {
      type: DataTypes.TEXT
    },
    insuredZipCode: {
      type: DataTypes.TEXT
    },
    insuredAddress1: {
      type: DataTypes.TEXT
    },
    insuredAddress2: {
      type: DataTypes.TEXT
    },
    contractorZipCode: {
      type: DataTypes.TEXT
    },
    contractorAddress1: {
      type: DataTypes.TEXT
    },
    contractorAddress2: {
      type: DataTypes.TEXT
    },
    relationshipWithInsured: {
      type: DataTypes.TEXT
    },
    relationshipWithDesignated: {
      type: DataTypes.TEXT
    },
    designatedName: {
      type: DataTypes.TEXT
    },
    minimumDriverName: {
      type: DataTypes.TEXT
    },
    spouseName: {
      type: DataTypes.TEXT
    },
    insuranceType: {
      type: DataTypes.TEXT
    },
    vehicleType: {
      type: DataTypes.TEXT
    },
    mileageApplication: {
      type: DataTypes.TEXT
    },
    ageLimit: {
      type: DataTypes.TEXT
    },
    driverLimit: {
      type: DataTypes.TEXT
    },
    vehicleCode: {
      type: DataTypes.TEXT
    },
    manufactureYear: {
      type: DataTypes.TEXT
    },
    vehicleName: {
      type: DataTypes.TEXT
    },
    engineCapacity: {
      type: DataTypes.TEXT
    },
    specialRate: {
      type: DataTypes.TEXT
    },
    accessories: {
      type: DataTypes.TEXT
    },
    accessoriesPrice: {
      type: DataTypes.TEXT
    },
    vehicleValue: {
      type: DataTypes.TEXT
    },
    totalVehicleValue: {
      type: DataTypes.TEXT
    },
    bodilyInjury1: {
      type: DataTypes.TEXT
    },
    bodilyInjury2: {
      type: DataTypes.TEXT
    },
    propertyDamage: {
      type: DataTypes.TEXT
    },
    personalInjury: {
      type: DataTypes.TEXT
    },
    uninsuredMotorist: {
      type: DataTypes.TEXT
    },
    vehicleDamage: {
      type: DataTypes.TEXT
    },
    emergencyDispatch: {
      type: DataTypes.TEXT
    },
    insuranceHistory: {
      type: DataTypes.TEXT
    },
    trafficViolations: {
      type: DataTypes.TEXT
    },
    discountSurcharge: {
      type: DataTypes.TEXT
    },
    specialSurcharge1: {
      type: DataTypes.TEXT
    },
    specialSurcharge2: {
      type: DataTypes.TEXT
    },
    threeYearAccidentRate: {
      type: DataTypes.TEXT
    },
    oneYearAccidentPoints: {
      type: DataTypes.TEXT
    },
    threeYearAccidentPoints: {
      type: DataTypes.TEXT
    },
    vehicleInsuranceHistory: {
      type: DataTypes.TEXT
    },
    otherVehicles: {
      type: DataTypes.TEXT
    },
    currentMileage: {
      type: DataTypes.TEXT
    },
    annualMileage: {
      type: DataTypes.TEXT
    },
    mileageDiscount: {
      type: DataTypes.TEXT
    },
    entryDate: {
      type: DataTypes.TEXT
    },
    customerConsultationDetails: {
      type: DataTypes.TEXT
    },
    priorConsent: {
      type: DataTypes.TEXT
    },
    consentDate: {
      type: DataTypes.TEXT
    },
    consentNumber: {
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Car',
  });

  return Car;
};
