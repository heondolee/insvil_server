'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/4employee.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫번째 시트를 선택
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
        manager: row[2] || '',
        userCode: row[3] || '',
        username: row[4] || '',
        name: row[5] || '',
        employeeNumber: row[6] || '',
        birthdateGender: row[7] || '',
        mobilePhone: row[8] || '',
        phone: row[9] || '',
        fax: row[10] || '',
        bank: row[11] || '',
        accountNumber: row[12] || '',
        accountHolder: row[13] || '',
        address: row[14] || '',
        settlementType: row[15] || '',
        carSettlement: row[16] || '',
        longTermSettlement: row[17] || '',
        lifeSettlement: row[18] || '',
        other: row[19] || '',
        appointmentDate: row[20] || '',
        dismissalDate: row[21] || '',
        samsungLife: row[22] || '',
        miraeAsset: row[23] || '',
        dongyangLife: row[24] || '',
        kyoboLife: row[25] || '',
        metLife: row[26] || '',
        hyundaiMarine: row[27] || '',
        samsungFire: row[28] || '',
        dbInsurance: row[29] || '',
        kbInsurance: row[30] || '',
        meritzFire: row[31] || '',
        heungkukFire: row[32] || '',
        mgInsurance: row[33] || '',
        hanwhaInsurance: row[34] || '',
        password: row[35] || '',
        createdAt: now,
        updatedAt: now
      };

      data.push(obj);
    }

    return queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
