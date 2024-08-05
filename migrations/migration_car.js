'use strict';

module.exports = {
  // 마이그레이션을 실행할 때 실행되는 함수
  up: async (queryInterface, Sequelize) => {
    // 테이블을 생성하는 코드
    await queryInterface.createTable('cars', {
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
      manager: {
        type: Sequelize.TEXT
      },
      managerName: {
        type: Sequelize.TEXT
      },
      userID: {
        type: Sequelize.TEXT
      },
      actualUser: {
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
      annualPremium: {
        type: Sequelize.TEXT
      },
      initialPremium: {
        type: Sequelize.TEXT
      },
      installmentPremium: {
        type: Sequelize.TEXT
      },
      insured: {
        type: Sequelize.TEXT
      },
      dobGender: {
        type: Sequelize.TEXT
      },
      contractor: {
        type: Sequelize.TEXT
      },
      contractorDobGender: {
        type: Sequelize.TEXT
      },
      vehicleNumber: {
        type: Sequelize.TEXT
      },
      design: {
        type: Sequelize.TEXT
      },
      counselStatus: {
        type: Sequelize.TEXT
      },
      contractStatus: {
        type: Sequelize.TEXT
      },
      itemCategory: {
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
      counselRoute: {
        type: Sequelize.TEXT
      },
      additionalInfo1: {
        type: Sequelize.TEXT
      },
      paymentMethod: {
        type: Sequelize.TEXT
      },
      counselor: {
        type: Sequelize.TEXT
      },
      percent: {
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
      policyNumber: {
        type: Sequelize.TEXT
      },
      previousCompany: {
        type: Sequelize.TEXT
      },
      insuredZipCode: {
        type: Sequelize.TEXT
      },
      insuredAddress1: {
        type: Sequelize.TEXT
      },
      insuredAddress2: {
        type: Sequelize.TEXT
      },
      contractorZipCode: {
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
      relationshipWithDesignated: {
        type: Sequelize.TEXT
      },
      designatedName: {
        type: Sequelize.TEXT
      },
      minimumDriverName: {
        type: Sequelize.TEXT
      },
      spouseName: {
        type: Sequelize.TEXT
      },
      insuranceType: {
        type: Sequelize.TEXT
      },
      vehicleType: {
        type: Sequelize.TEXT
      },
      mileageApplication: {
        type: Sequelize.TEXT
      },
      ageLimit: {
        type: Sequelize.TEXT
      },
      driverLimit: {
        type: Sequelize.TEXT
      },
      vehicleCode: {
        type: Sequelize.TEXT
      },
      manufactureYear: {
        type: Sequelize.TEXT
      },
      vehicleName: {
        type: Sequelize.TEXT
      },
      engineCapacity: {
        type: Sequelize.TEXT
      },
      specialRate: {
        type: Sequelize.TEXT
      },
      accessories: {
        type: Sequelize.TEXT
      },
      accessoriesPrice: {
        type: Sequelize.TEXT
      },
      vehicleValue: {
        type: Sequelize.TEXT
      },
      totalVehicleValue: {
        type: Sequelize.TEXT
      },
      bodilyInjury1: {
        type: Sequelize.TEXT
      },
      bodilyInjury2: {
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
      vehicleDamage: {
        type: Sequelize.TEXT
      },
      emergencyDispatch: {
        type: Sequelize.TEXT
      },
      insuranceHistory: {
        type: Sequelize.TEXT
      },
      trafficViolations: {
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
      oneYearAccidentPoints: {
        type: Sequelize.TEXT
      },
      threeYearAccidentPoints: {
        type: Sequelize.TEXT
      },
      vehicleInsuranceHistory: {
        type: Sequelize.TEXT
      },
      otherVehicles: {
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
      entryDate: {
        type: Sequelize.TEXT
      },
      customerConsultationDetails: {
        type: Sequelize.TEXT
      },
      priorConsent: {
        type: Sequelize.TEXT
      },
      consentDate: {
        type: Sequelize.TEXT
      },
      consentNumber: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  // 마이그레이션을 되돌릴 때 실행되는 함수
  down: async (queryInterface, Sequelize) => {
    // 테이블을 삭제하는 코드
    await queryInterface.dropTable('cars');
  }
};
