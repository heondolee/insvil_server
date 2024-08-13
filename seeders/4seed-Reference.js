'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가 (테이블 이름을 백틱으로 감쌈)
    await queryInterface.sequelize.query('ALTER TABLE `References` AUTO_INCREMENT = 1;');

    // 엑셀 파일을 읽어옵니다.
    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/5dataroom.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

    let now = new Date();
    let data = [];

    // 날짜 변환 함수 정의 (UTC 기준)
    const excelDateToJSDate = (serial) => {
      const excelEpoch = Date.UTC(1900, 0, 0);
      const days = Math.floor(serial - 1);
      const seconds = Math.round((serial - Math.floor(serial)) * 86400);
      const date = new Date(excelEpoch + days * 86400 * 1000 + seconds * 1000);
      return date;
    };

    // 데이터 범위 내의 모든 행을 순회합니다.
    for (let i = range.s.r + 1; i <= range.e.r; i++) { // range.s.r + 1 은 헤더를 제외하고 데이터부터 시작
      let row = [];
      for (let j = range.s.c; j <= range.e.c; j++) {
        let cell_address = { c: j, r: i };
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        let cell_value = worksheet[cell_ref] ? worksheet[cell_ref].v : null;

        // 날짜 형식일 경우 변환
        if (typeof cell_value === 'number' && cell_ref.includes('Date')) {
          cell_value = excelDateToJSDate(cell_value);
        }

        row.push(cell_value);
      }

      let obj = {
        Title: row[0] || '',
        Author: row[1] || '',
        Date: row[2] ? excelDateToJSDate(row[2]) : '',
        Content: row[3] || '',
        createdAt: now,
        updatedAt: now
      };

      data.push(obj);
    }

    return queryInterface.bulkInsert('References', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('References', null, {});
  }
};
