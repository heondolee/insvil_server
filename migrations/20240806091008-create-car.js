'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      branch: {
        type: Sequelize.TEXT
      },
      team: {
        type: Sequelize.TEXT
      },
      personInCharge: {
        type: Sequelize.TEXT
      },
      responsibilityName: {
        type: Sequelize.TEXT
      },
      userName: {
        type: Sequelize.TEXT
      },
      user: {
        type: Sequelize.TEXT
      },
      contractCompany: {
        type: Sequelize.TEXT
      },
      agencyCode: {
        type: Sequelize.TEXT
      },
      agencyName: {
        type: Sequelize.TEXT
      },
      oneYearPremium: {
        type: Sequelize.TEXT
      },
      firstPremium: {
        type: Sequelize.TEXT
      },
      installmentPremium: {
        type: Sequelize.TEXT
      },
      insured: {
        type: Sequelize.TEXT
      },
      insuredBirthGender: {
        type: Sequelize.TEXT
      },
      contractor: {
        type: Sequelize.TEXT
      },
      contractorBirthGender: {
        type: Sequelize.TEXT
      },
      carNumber: {
        type: Sequelize.TEXT
      },
      design: {
        type: Sequelize.TEXT
      },
      consultingStatus: {
        type: Sequelize.TEXT
      },
      contractStatus: {
        type: Sequelize.TEXT
      },
      objectClassification: {
        type: Sequelize.TEXT
      },
      startDate: {
        type: Sequelize.TEXT
      },
      endDate: {
        type: Sequelize.TEXT
      },
      receiptDate: {
        type: Sequelize.TEXT
      },
      consultationPath: {
        type: Sequelize.TEXT
      },
      etc1: {
        type: Sequelize.TEXT
      },
      paymentMethod: {
        type: Sequelize.TEXT
      },
      consultant: {
        type: Sequelize.TEXT
      },
      percentage: {
        type: Sequelize.TEXT
      },
      cyberMoney: {
        type: Sequelize.TEXT
      },
      gift: {
        type: Sequelize.TEXT
      },
      designNumber: {
        type: Sequelize.TEXT
      },
      insuranceNumber: {
        type: Sequelize.TEXT
      },
      previousContractCompany: {
        type: Sequelize.TEXT
      },
      insuredPostalCode: {
        type: Sequelize.TEXT
      },
      insuredAddress1: {
        type: Sequelize.TEXT
      },
      insuredAddress2: {
        type: Sequelize.TEXT
      },
      contractorPostalCode: {
        type: Sequelize.TEXT
      },
      contractorAddress1: {
        type: Sequelize.TEXT
      },
      contractorAddress2: {
        type: Sequelize.TEXT
      },
      relationshipWithInsured: {
        type: Sequelize.TEXT
      },
      relationshipWithSpecifiedPerson: {
        type: Sequelize.TEXT
      },
      specifiedPersonName: {
        type: Sequelize.TEXT
      },
      minDriverName: {
        type: Sequelize.TEXT
      },
      spouseName: {
        type: Sequelize.TEXT
      },
      insuranceType: {
        type: Sequelize.TEXT
      },
      carType: {
        type: Sequelize.TEXT
      },
      mileageApplication: {
        type: Sequelize.TEXT
      },
      ageRestriction: {
        type: Sequelize.TEXT
      },
      driverRestriction: {
        type: Sequelize.TEXT
      },
      carNameCode: {
        type: Sequelize.TEXT
      },
      year: {
        type: Sequelize.TEXT
      },
      carName: {
        type: Sequelize.TEXT
      },
      displacement: {
        type: Sequelize.TEXT
      },
      specialRate: {
        type: Sequelize.TEXT
      },
      accessories: {
        type: Sequelize.TEXT
      },
      accessoryPrice: {
        type: Sequelize.TEXT
      },
      carValue: {
        type: Sequelize.TEXT
      },
      totalCar: {
        type: Sequelize.TEXT
      },
      liability1: {
        type: Sequelize.TEXT
      },
      liability2: {
        type: Sequelize.TEXT
      },
      propertyDamage: {
        type: Sequelize.TEXT
      },
      personalInjury: {
        type: Sequelize.TEXT
      },
      uninsuredMotorist: {
        type: Sequelize.TEXT
      },
      ownDamage: {
        type: Sequelize.TEXT
      },
      emergencyDispatch: {
        type: Sequelize.TEXT
      },
      subscriptionExperience: {
        type: Sequelize.TEXT
      },
      legalViolations: {
        type: Sequelize.TEXT
      },
      discountSurcharge: {
        type: Sequelize.TEXT
      },
      specialSurcharge1: {
        type: Sequelize.TEXT
      },
      specialSurcharge2: {
        type: Sequelize.TEXT
      },
      threeYearAccidentRate: {
        type: Sequelize.TEXT
      },
      oneYearAccidentScore: {
        type: Sequelize.TEXT
      },
      threeYearAccidentScore: {
        type: Sequelize.TEXT
      },
      carSubscriptionExperience: {
        type: Sequelize.TEXT
      },
      otherOwnedCars: {
        type: Sequelize.TEXT
      },
      currentMileage: {
        type: Sequelize.TEXT
      },
      annualMileage: {
        type: Sequelize.TEXT
      },
      mileageDiscount: {
        type: Sequelize.TEXT
      },
      inputDate: {
        type: Sequelize.TEXT
      },
      customerConsultation: {
        type: Sequelize.TEXT
      },
      preConsent: {
        type: Sequelize.TEXT
      },
      consentDate: {
        type: Sequelize.TEXT
      },
      preConsentNumber: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};