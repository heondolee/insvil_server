'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER TABLE Cars AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/2car.xlsx');
    let now = new Date();
    let data = [];
    const CHUNK_SIZE = 1000; // 청크 크기 설정

    // 모든 시트에 대해 반복
    for (let sheetName of workbook.SheetNames) {
      let worksheet = workbook.Sheets[sheetName];
      let range = XLSX.utils.decode_range(worksheet['!ref']);
      
      // 각 시트의 데이터 처리
      for (let i = range.s.r + 1; i <= range.e.r; i++) {
        let row = [];
        for (let j = range.s.c; j <= range.e.c; j++) {
          let cell_address = { c: j, r: i };
          let cell_ref = XLSX.utils.encode_cell(cell_address);
          row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
        }

        let obj = {
          branch: row[0] || '',
          team: row[1] || '',
          personInCharge: row[2] || '',
          responsibilityName: row[3] || '',
          userName: row[4] || '',
          user: row[5] || '',
          contractCompany: row[6] || '',
          agencyCode: row[7] || '',
          agencyName: row[8] || '',
          oneYearPremium: row[9] || '',
          firstPremium: row[10] || '',
          installmentPremium: row[11] || '',
          insured: row[12] || '',
          insuredBirthGender: row[13] || '',
          contractor: row[14] || '',
          contractorBirthGender: row[15] || '',
          carNumber: row[16] || '',
          design: row[17] || '',
          consultingStatus: row[18] || '',
          contractStatus: row[19] || '',
          objectClassification: row[20] || '',
          startDate: row[21] || '',
          endDate: row[22] || '',
          receiptDate: row[23] || '',
          consultationPath: row[24] || '',
          etc1: row[25] || '',
          paymentMethod: row[26] || '',
          consultant: row[27] || '',
          percentage: row[28] || '',
          cyberMoney: row[29] || '',
          gift: row[30] || '',
          designNumber: row[31] || '',
          insuranceNumber: row[32] || '',
          previousContractCompany: row[33] || '',
          insuredPostalCode: row[34] || '',
          insuredAddress1: row[35] || '',
          insuredAddress2: row[36] || '',
          contractorPostalCode: row[37] || '',
          contractorAddress1: row[38] || '',
          contractorAddress2: row[39] || '',
          relationshipWithInsured: row[40] || '',
          relationshipWithSpecifiedPerson: row[41] || '',
          specifiedPersonName: row[42] || '',
          minDriverName: row[43] || '',
          spouseName: row[44] || '',
          insuranceType: row[45] || '',
          carType: row[46] || '',
          mileageApplication: row[47] || '',
          ageRestriction: row[48] || '',
          driverRestriction: row[49] || '',
          carNameCode: row[50] || '',
          year: row[51] || '',
          carName: row[52] || '',
          displacement: row[53] || '',
          specialRate: row[54] || '',
          accessories: row[55] || '',
          accessoryPrice: row[56] || '',
          carValue: row[57] || '',
          totalCar: row[58] || '',
          liability1: row[59] || '',
          liability2: row[60] || '',
          propertyDamage: row[61] || '',
          personalInjury: row[62] || '',
          uninsuredMotorist: row[63] || '',
          ownDamage: row[64] || '',
          emergencyDispatch: row[65] || '',
          subscriptionExperience: row[66] || '',
          legalViolations: row[67] || '',
          discountSurcharge: row[68] || '',
          specialSurcharge1: row[69] || '',
          specialSurcharge2: row[70] || '',
          threeYearAccidentRate: row[71] || '',
          oneYearAccidentScore: row[72] || '',
          threeYearAccidentScore: row[73] || '',
          carSubscriptionExperience: row[74] || '',
          otherOwnedCars: row[75] || '',
          currentMileage: row[76] || '',
          annualMileage: row[77] || '',
          mileageDiscount: row[78] || '',
          inputDate: row[79] || '',
          customerConsultation: row[80] || '',
          preConsent: row[81] || '',
          consentDate: row[82] || '',
          preConsentNumber: row[83] || '',
          createdAt: now,
          updatedAt: now
        };

        data.push(obj);

        if (data.length === CHUNK_SIZE) {
          await queryInterface.bulkInsert('Cars', data, {});
          data = [];
        }
      }
    }

    if (data.length > 0) {
      await queryInterface.bulkInsert('Cars', data, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
