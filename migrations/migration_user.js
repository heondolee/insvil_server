'use strict';

module.exports = {
  // 마이그레이션을 실행할 때 실행되는 함수
  up: async (queryInterface, Sequelize) => {
    // 테이블을 생성하는 코드
    await queryInterface.createTable('Users', {
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
      userCode: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      employeeNumber: {
        type: Sequelize.STRING
      },
      birthdateGender: {
        type: Sequelize.STRING
      },
      mobilePhone: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      accountHolder: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      settlementType: {
        type: Sequelize.STRING
      },
      carSettlement: {
        type: Sequelize.STRING
      },
      longTermSettlement: {
        type: Sequelize.STRING
      },
      lifeSettlement: {
        type: Sequelize.STRING
      },
      other: {
        type: Sequelize.STRING
      },
      appointmentDate: {
        type: Sequelize.STRING
      },
      dismissalDate: {
        type: Sequelize.STRING
      },
      samsungLife: {
        type: Sequelize.STRING
      },
      miraeAsset: {
        type: Sequelize.STRING
      },
      dongyangLife: {
        type: Sequelize.STRING
      },
      kyoboLife: {
        type: Sequelize.STRING
      },
      metLife: {
        type: Sequelize.STRING
      },
      hyundaiMarine: {
        type: Sequelize.STRING
      },
      samsungFire: {
        type: Sequelize.STRING
      },
      dbInsurance: {
        type: Sequelize.STRING
      },
      kbInsurance: {
        type: Sequelize.STRING
      },
      meritzFire: {
        type: Sequelize.STRING
      },
      heungkukFire: {
        type: Sequelize.STRING
      },
      mgInsurance: {
        type: Sequelize.STRING
      },
      hanwhaInsurance: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};
