// 'use strict';
// const XLSX = require('xlsx');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // 시퀀스를 다시 시작하는 로직 추가
//     await queryInterface.sequelize.query('ALTER TABLE normals AUTO_INCREMENT = 1;');

//     // 엑셀 파일 경로 설정
//     const workbook = XLSX.readFile(__dirname + '/../public/stylesheets/3normal.xlsx');
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫 번째 시트를 선택
//     const range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

//     const now = new Date();
//     const data = [];

//     // 데이터 범위 내의 모든 행을 순회합니다.
//     for (let i = range.s.r + 1; i <= range.e.r; i++) { // range.s.r + 1 은 헤더를 제외하고 데이터부터 시작
//       const row = [];
//       for (let j = range.s.c; j <= range.e.c; j++) {
//         const cell_address = { c: j, r: i };
//         const cell_ref = XLSX.utils.encode_cell(cell_address);
//         row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
//       }

//       const obj = {
//         branch: row[0] || '',
//         team: row[1] || '',
//         responsible: row[2] || '',
//         responsibleName: row[3] || '',
//         userId: row[4] || '',
//         actualUser: row[5] || '',
//         contractCompany: row[6] || '',
//         longTermProduct: row[7] || '',
//         productName: row[8] || '',
//         paymentInsurance: row[9] || '',
//         correctedInsurance: row[10] || '',
//         correctionRate: row[11] || '',
//         insuredPerson: row[12] || '',
//         insuredBirthDateGender: row[13] || '',
//         contractor: row[14] || '',
//         contractorBirthDateGender: row[15] || '',
//         policyNumber: row[16] || '',
//         design: row[17] || '',
//         consultationStatus: row[18] || '',
//         contractStatus: row[19] || '',
//         paymentStartDate: row[20] || '',
//         paymentEndDate: row[21] || '',
//         paymentPeriod: row[22] || '',
//         contractDate: row[23] || '',
//         paymentDate: row[24] || '',
//         coverageStartDate: row[25] || '',
//         coverageEndDate: row[26] || '',
//         consultationPath: row[27] || '',
//         extra1: row[28] || '',
//         paymentMethod: row[29] || '',
//         paymentInstallment: row[30] || '',
//         totalInstallments: row[31] || '',
//         consultant: row[32] || '',
//         percent: row[33] || '',
//         cyberMoney: row[34] || '',
//         gift: row[35] || '',
//         policyDispatchDate: row[36] || '',
//         handwrittenSignatureDate: row[37] || '',
//         changeContent1: row[38] || '',
//         changeDate1: row[39] || '',
//         changeContent2: row[40] || '',
//         changeDate2: row[41] || '',
//         changeContent3: row[42] || '',
//         changeDate3: row[43] || '',
//         changeContent4: row[44] || '',
//         changeDate4: row[45] || '',
//         changeContent5: row[46] || '',
//         changeDate5: row[47] || '',
//         insuredPostalCode: row[48] || '',
//         insuredAddress1: row[49] || '',
//         insuredAddress2: row[50] || '',
//         contractorPostalCode: row[51] || '',
//         contractorAddress1: row[52] || '',
//         contractorAddress2: row[53] || '',
//         relationshipWithInsured: row[54] || '',
//         occupation: row[55] || '',
//         entryDate: row[56] || '',
//         customerCounselingContent: row[57] || '',
//         createdAt: now,
//         updatedAt: now
//       };

//       data.push(obj);
//     }

//     return queryInterface.bulkInsert('normals', data, {});
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('normals', null, {});
//   }
// };
