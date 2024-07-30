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
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      manager: {
        type: Sequelize.STRING
      },
      managerName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      actualUser: {
        type: Sequelize.STRING
      },
      contractCompany: {
        type: Sequelize.STRING
      },
      agencyCode: {
        type: Sequelize.STRING
      },
      agencyName: {
        type: Sequelize.STRING
      },
      annualInsuranceFee: {
        type: Sequelize.TEXT
      },
      initialInsuranceFee: {
        type: Sequelize.TEXT
      },
      installmentInsuranceFee: {
        type: Sequelize.TEXT
      },
      insured: {
        type: Sequelize.TEXT
      },
      insuredBirthDateGender: {
        type: Sequelize.TEXT
      },
      policyHolder: {
        type: Sequelize.TEXT
      },
      policyHolderBirthDateGender: {
        type: Sequelize.TEXT
      },
      carNumber: {
        type: Sequelize.STRING
      },
      design: {
        type: Sequelize.TEXT
      },
      consultationStatus: {
        type: Sequelize.STRING
      },
      contractStatus: {
        type: Sequelize.STRING
      },
      propertyType: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      receiptDate: {
        type: Sequelize.STRING
      },
      consultationPath: {
        type: Sequelize.TEXT
      },
      extra1: {
        type: Sequelize.TEXT
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      consultant: {
        type: Sequelize.TEXT
      },
      percent: {
        type: Sequelize.STRING
      },
      cyberMoney: {
        type: Sequelize.STRING
      },
      gift: {
        type: Sequelize.STRING
      },
      designNumber: {
        type: Sequelize.STRING
      },
      policyNumber: {
        type: Sequelize.STRING
      },
      previousContractCompany: {
        type: Sequelize.STRING
      },
      insuredPostalCode: {
        type: Sequelize.STRING
      },
      insuredAddress1: {
        type: Sequelize.TEXT
      },
      insuredAddress2: {
        type: Sequelize.TEXT
      },
      policyHolderPostalCode: {
        type: Sequelize.STRING
      },
      policyHolderAddress1: {
        type: Sequelize.TEXT
      },
      policyHolderAddress2: {
        type: Sequelize.TEXT
      },
      relationshipWithInsured: {
        type: Sequelize.STRING
      },
      relationshipWithDesignated1: {
        type: Sequelize.STRING
      },
      designated1Name: {
        type: Sequelize.TEXT
      },
      minimumDriverName: {
        type: Sequelize.TEXT
      },
      spouseName: {
        type: Sequelize.TEXT
      },
      insuranceType: {
        type: Sequelize.STRING
      },
      carType: {
        type: Sequelize.STRING
      },
      mileageApplication: {
        type: Sequelize.STRING
      },
      ageLimit: {
        type: Sequelize.STRING
      },
      driverLimit: {
        type: Sequelize.STRING
      },
      carNameCode: {
        type: Sequelize.STRING
      },
      modelYear: {
        type: Sequelize.STRING
      },
      carName: {
        type: Sequelize.STRING
      },
      engineDisplacement: {
        type: Sequelize.STRING
      },
      specialRate: {
        type: Sequelize.STRING
      },
      accessory: {
        type: Sequelize.TEXT
      },
      accessoryPrice: {
        type: Sequelize.STRING
      },
      carValue: {
        type: Sequelize.STRING
      },
      totalCarValue: {
        type: Sequelize.STRING
      },
      liabilityCoverage: {
        type: Sequelize.STRING
      },
      personalInjuryCoverage: {
        type: Sequelize.STRING
      },
      propertyDamageCoverage: {
        type: Sequelize.STRING
      },
      selfInjuryCoverage: {
        type: Sequelize.STRING
      },
      uninsuredCoverage: {
        type: Sequelize.STRING
      },
      ownDamageCoverage: {
        type: Sequelize.STRING
      },
      emergencyRoadsideAssistance: {
        type: Sequelize.STRING
      },
      insuranceHistory: {
        type: Sequelize.TEXT
      },
      legalViolations: {
        type: Sequelize.TEXT
      },
      discountSurcharge: {
        type: Sequelize.STRING
      },
      specialSurcharge1: {
        type: Sequelize.STRING
      },
      specialSurcharge2: {
        type: Sequelize.STRING
      },
      threeYearAccidentRate: {
        type: Sequelize.STRING
      },
      oneYearAccidentPoints: {
        type: Sequelize.STRING
      },
      threeYearAccidentPoints: {
        type: Sequelize.STRING
      },
      carInsuranceHistory: {
        type: Sequelize.TEXT
      },
      otherOwnedVehicles: {
        type: Sequelize.TEXT
      },
      currentMileage: {
        type: Sequelize.STRING
      },
      annualMileage: {
        type: Sequelize.STRING
      },
      mileageDiscount: {
        type: Sequelize.STRING
      },
      entryDate: {
        type: Sequelize.STRING
      },
      customerCounselingContent: {
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