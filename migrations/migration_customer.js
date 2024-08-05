'use strict';

module.exports = {
  // 마이그레이션을 실행할 때 실행되는 함수
  up: async (queryInterface, Sequelize) => {
    // 테이블을 생성하는 코드
    await queryInterface.createTable('Customers', {
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
      responsibleId: {
        type: Sequelize.STRING
      },
      responsibleName: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      solarLunar: {
        type: Sequelize.STRING
      },
      mobilePhone: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      homeAddress1: {
        type: Sequelize.TEXT
      },
      homeAddress2: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      companyPhone: {
        type: Sequelize.STRING
      },
      companyPostalCode: {
        type: Sequelize.STRING
      },
      companyAddress1: {
        type: Sequelize.STRING
      },
      companyAddress2: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      accountHolder: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      memo: {
        type: Sequelize.TEXT
      },
      registrationDate: {
        type: Sequelize.STRING
      },
      familyName1: {
        type: Sequelize.STRING
      },
      relationship1: {
        type: Sequelize.STRING
      },
      familyBirthdate1: {
        type: Sequelize.STRING
      },
      gender1: {
        type: Sequelize.STRING
      },
      familyName2: {
        type: Sequelize.STRING
      },
      relationship2: {
        type: Sequelize.STRING
      },
      familyBirthdate2: {
        type: Sequelize.STRING
      },
      gender2: {
        type: Sequelize.STRING
      },
      familyName3: {
        type: Sequelize.STRING
      },
      relationship3: {
        type: Sequelize.STRING
      },
      familyBirthdate3: {
        type: Sequelize.STRING
      },
      gender3: {
        type: Sequelize.STRING
      },
      familyName4: {
        type: Sequelize.STRING
      },
      relationship4: {
        type: Sequelize.STRING
      },
      familyBirthdate4: {
        type: Sequelize.STRING
      },
      gender4: {
        type: Sequelize.STRING
      },
      familyName5: {
        type: Sequelize.STRING
      },
      relationship5: {
        type: Sequelize.STRING
      },
      familyBirthdate5: {
        type: Sequelize.STRING
      },
      gender5: {
        type: Sequelize.STRING
      },
      familyName6: {
        type: Sequelize.STRING
      },
      relationship6: {
        type: Sequelize.STRING
      },
      familyBirthdate6: {
        type: Sequelize.STRING
      },
      gender6: {
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
    await queryInterface.dropTable('Customers');
  }
};
