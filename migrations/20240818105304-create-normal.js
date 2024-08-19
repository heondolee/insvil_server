'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Normals', {
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
      userId: {
        type: Sequelize.TEXT
      },
      realUser: {
        type: Sequelize.TEXT
      },
      contractCompany: {
        type: Sequelize.TEXT
      },
      longTermProduct: {
        type: Sequelize.TEXT
      },
      insurancePremium: {
        type: Sequelize.TEXT
      },
      revisedPremium: {
        type: Sequelize.TEXT
      },
      revisionRate: {
        type: Sequelize.TEXT
      },
      insuredPerson: {
        type: Sequelize.TEXT
      },
      birthdateGender: {
        type: Sequelize.TEXT
      },
      policyholder: {
        type: Sequelize.TEXT
      },
      policyholderBirthdateGender: {
        type: Sequelize.TEXT
      },
      policyNumber: {
        type: Sequelize.TEXT
      },
      design: {
        type: Sequelize.TEXT
      },
      consultationStatus: {
        type: Sequelize.TEXT
      },
      contractStatus: {
        type: Sequelize.TEXT
      },
      paymentStartDate: {
        type: Sequelize.TEXT
      },
      paymentEndDate: {
        type: Sequelize.TEXT
      },
      paymentPeriod: {
        type: Sequelize.TEXT
      },
      contractDate: {
        type: Sequelize.TEXT
      },
      paymentDate: {
        type: Sequelize.TEXT
      },
      coverageStartDate: {
        type: Sequelize.TEXT
      },
      coverageEndDate: {
        type: Sequelize.TEXT
      },
      consultationChannel: {
        type: Sequelize.TEXT
      },
      additionalInfo1: {
        type: Sequelize.TEXT
      },
      paymentMethod: {
        type: Sequelize.TEXT
      },
      paymentCount: {
        type: Sequelize.TEXT
      },
      totalPayments: {
        type: Sequelize.TEXT
      },
      consultant: {
        type: Sequelize.TEXT
      },
      percent: {
        type: Sequelize.TEXT
      },
      CyberMoney: {
        type: Sequelize.TEXT
      },
      gift: {
        type: Sequelize.TEXT
      },
      policyDispatchDate: {
        type: Sequelize.TEXT
      },
      signatureDate: {
        type: Sequelize.TEXT
      },
      changeContent1: {
        type: Sequelize.TEXT
      },
      changeDate1: {
        type: Sequelize.TEXT
      },
      changeContent2: {
        type: Sequelize.TEXT
      },
      changeDate2: {
        type: Sequelize.TEXT
      },
      changeContent3: {
        type: Sequelize.TEXT
      },
      changeDate3: {
        type: Sequelize.TEXT
      },
      changeContent4: {
        type: Sequelize.TEXT
      },
      changeDate4: {
        type: Sequelize.TEXT
      },
      changeContent5: {
        type: Sequelize.TEXT
      },
      changeDate5: {
        type: Sequelize.TEXT
      },
      insuredPersonZipcode: {
        type: Sequelize.TEXT
      },
      insuredPersonAddress1: {
        type: Sequelize.TEXT
      },
      insuredPersonAddress2: {
        type: Sequelize.TEXT
      },
      policyholderZipcode: {
        type: Sequelize.TEXT
      },
      policyholderAddress1: {
        type: Sequelize.TEXT
      },
      policyholderAddress2: {
        type: Sequelize.TEXT
      },
      relationToInsured: {
        type: Sequelize.TEXT
      },
      occupation: {
        type: Sequelize.TEXT
      },
      entryDate: {
        type: Sequelize.TEXT
      },
      customerConsultationContent: {
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
    await queryInterface.dropTable('Normals');
  }
};