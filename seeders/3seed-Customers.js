'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Customers AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/6customer.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫 번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

    let now = new Date();
    let data = [];
    // 데이터 범위 내의 모든 행을 순회합니다.
    for (let i = range.s.r + 1; i <= range.e.r; i++) { // range.s.r + 1 은 헤더를 제외하고 데이터부터 시작
      let row = [];
      for (let j = range.s.c; j <= range.e.c; j++) {
        let cell_address = { c: j, r: i };
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
      }

      let obj = {
        branch: row[0] || '',
        team: row[1] || '',
        responsibleId: row[2] || '',
        responsibleName: row[3] || '',
        customerName: row[4] || '',
        birthdate: row[5] || '',
        gender: row[6] || '',
        birthday: row[7] || '',
        solarLunar: row[8] || '',
        mobilePhone: row[9] || '',
        phone: row[10] || '',
        postalCode: row[11] || '',
        homeAddress1: row[12] || '',
        homeAddress2: row[13] || '',
        companyName: row[14] || '',
        position: row[15] || '',
        companyPhone: row[16] || '',
        companyPostalCode: row[17] || '',
        companyAddress1: row[18] || '',
        companyAddress2: row[19] || '',
        fax: row[20] || '',
        email: row[21] || '',
        bank: row[22] || '',
        accountHolder: row[23] || '',
        accountNumber: row[24] || '',
        memo: row[25] || '',
        registrationDate: row[26] || '',
        familyName1: row[27] || '',
        relationship1: row[28] || '',
        familyBirthdate1: row[29] || '',
        gender1: row[30] || '',
        familyName2: row[31] || '',
        relationship2: row[32] || '',
        familyBirthdate2: row[33] || '',
        gender2: row[34] || '',
        familyName3: row[35] || '',
        relationship3: row[36] || '',
        familyBirthdate3: row[37] || '',
        gender3: row[38] || '',
        familyName4: row[39] || '',
        relationship4: row[40] || '',
        familyBirthdate4: row[41] || '',
        gender4: row[42] || '',
        familyName5: row[43] || '',
        relationship5: row[44] || '',
        familyBirthdate5: row[45] || '',
        gender5: row[46] || '',
        familyName6: row[47] || '',
        relationship6: row[48] || '',
        familyBirthdate6: row[49] || '',
        gender6: row[50] || '',
        createdAt: now,
        updatedAt: now
      };

      data.push(obj);
    }

    return queryInterface.bulkInsert('Customers', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
