'use strict';

module.exports = {
  // 마이그레이션을 실행할 때 실행되는 함수
  up: async (queryInterface, Sequelize) => {
    // 테이블을 생성하는 코드
    await queryInterface.createTable('Longs', {
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
      responsible: {
        type: Sequelize.STRING
      },
      responsibleName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      realUser: {
        type: Sequelize.STRING
      },
      contractCompany: {
        type: Sequelize.STRING
      },
      longTermProduct: {
        type: Sequelize.STRING
      },
      productName: {
        type: Sequelize.STRING
      },
      paymentInsurance: {
        type: Sequelize.STRING
      },
      correctedInsurance: {
        type: Sequelize.STRING
      },
      correctionRate: {
        type: Sequelize.STRING
      },
      insuredPerson: {
        type: Sequelize.STRING
      },
      birthdate_gender: {
        type: Sequelize.STRING
      },
      contractor: {
        type: Sequelize.STRING
      },
      contractor_birthdate_gender: {
        type: Sequelize.STRING
      },
      policyNumber: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      counselingStatus: {
        type: Sequelize.STRING
      },
      contractStatus: {
        type: Sequelize.STRING
      },
      paymentStartDate: {
        type: Sequelize.STRING
      },
      paymentEndDate: {
        type: Sequelize.STRING
      },
      paymentPeriod: {
        type: Sequelize.STRING
      },
      contractDate: {
        type: Sequelize.STRING
      },
      paymentDate: {
        type: Sequelize.STRING
      },
      coverageStartDate: {
        type: Sequelize.STRING
      },
      coverageEndDate: {
        type: Sequelize.STRING
      },
      counselingRoute: {
        type: Sequelize.STRING
      },
      other1: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      paymentTerm: {
        type: Sequelize.STRING
      },
      totalTerm: {
        type: Sequelize.STRING
      },
      counselor: {
        type: Sequelize.STRING
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
      policyDispatchDate: {
        type: Sequelize.STRING
      },
      handwrittenSignatureDate: {
        type: Sequelize.STRING
      },
      changeContent1: {
        type: Sequelize.STRING
      },
      changeDate1: {
        type: Sequelize.STRING
      },
      changeContent2: {
        type: Sequelize.STRING
      },
      changeDate2: {
        type: Sequelize.STRING
      },
      changeContent3: {
        type: Sequelize.STRING
      },
      changeDate3: {
        type: Sequelize.STRING
      },
      changeContent4: {
        type: Sequelize.STRING
      },
      changeDate4: {
        type: Sequelize.STRING
      },
      changeContent5: {
        type: Sequelize.STRING
      },
      changeDate5: {
        type: Sequelize.STRING
      },
      insuredPostalCode: {
        type: Sequelize.STRING
      },
      insuredAddress1: {
        type: Sequelize.STRING
      },
      insuredAddress2: {
        type: Sequelize.STRING
      },
      contractorPostalCode: {
        type: Sequelize.STRING
      },
      contractorAddress1: {
        type: Sequelize.STRING
      },
      contractorAddress2: {
        type: Sequelize.STRING
      },
      relationshipWithInsured: {
        type: Sequelize.STRING
      },
      occupation: {
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
    await queryInterface.dropTable('Longs');
  }
};
