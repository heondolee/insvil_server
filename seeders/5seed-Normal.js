'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Normals AUTO_INCREMENT = 1;');

    // 엑셀 파일 읽기
    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/3normal.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫 번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

    let now = new Date();
    let data = [];
    const CHUNK_SIZE = 1000; // 한 번에 처리할 데이터 크기 설정

    // 데이터 범위 내의 모든 행을 순회합니다.
    for (let i = range.s.r + 1; i <= range.e.r; i++) { // range.s.r + 1 은 헤더를 제외하고 데이터부터 시작
      let row = [];
      for (let j = range.s.c; j <= range.e.c; j++) {
        let cell_address = { c: j, r: i };
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
      }

      // 엑셀 데이터를 객체로 변환
      let obj = {
        branch: row[0] || '',
        team: row[1] || '',
        manager: row[2] || '',
        managerName: row[3] || '',
        userId: row[4] || '',
        realUser: row[5] || '',
        contractCompany: row[6] || '',
        longTermProduct: row[7] || '',
        insurancePremium: row[8] || '',
        revisedPremium: row[9] || '',
        revisionRate: row[10] || '',
        insuredPerson: row[11] || '',
        birthdateGender: row[12] || '',
        policyholder: row[13] || '',
        policyholderBirthdateGender: row[14] || '',
        policyNumber: row[15] || '',
        design: row[16] || '',
        consultationStatus: row[17] || '',
        contractStatus: row[18] || '',
        paymentStartDate: row[19] || '',
        paymentEndDate: row[20] || '',
        paymentPeriod: row[21] || '',
        contractDate: row[22] || '',
        paymentDate: row[23] || '',
        coverageStartDate: row[24] || '',
        coverageEndDate: row[25] || '',
        consultationChannel: row[26] || '',
        additionalInfo1: row[27] || '',
        paymentMethod: row[28] || '',
        paymentCount: row[29] || '',
        totalPayments: row[30] || '',
        consultant: row[31] || '',
        percent: row[32] || '',
        CyberMoney: row[33] || '',  
        gift: row[34] || '',         
        policyDispatchDate: row[35] || '',
        signatureDate: row[36] || '',
        changeContent1: row[37] || '',
        changeDate1: row[38] || '',
        changeContent2: row[39] || '',
        changeDate2: row[40] || '',
        changeContent3: row[41] || '',
        changeDate3: row[42] || '',
        changeContent4: row[43] || '',
        changeDate4: row[44] || '',
        changeContent5: row[45] || '',
        changeDate5: row[46] || '',
        insuredPersonZipcode: row[47] || '',
        insuredPersonAddress1: row[48] || '',
        insuredPersonAddress2: row[49] || '',
        policyholderZipcode: row[50] || '',
        policyholderAddress1: row[51] || '',
        policyholderAddress2: row[52] || '',
        relationToInsured: row[53] || '',
        occupation: row[54] || '',
        entryDate: row[55] || '',
        customerConsultationContent: row[56] || '',
        createdAt: now,
        updatedAt: now
      };

      data.push(obj);

      // CHUNK_SIZE에 도달할 때마다 데이터베이스에 삽입
      if (data.length === CHUNK_SIZE) {
        await queryInterface.bulkInsert('Normals', data, {});
        data = []; // 삽입 후 배열 초기화
      }
    }

    // 남은 데이터를 처리
    if (data.length > 0) {
      await queryInterface.bulkInsert('Normals', data, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Normals', null, {});
  }
};
