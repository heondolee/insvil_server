'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Cars AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/2car.xlsx');
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
        manager: row[2] || '',
        managerName: row[3] || '',
        userId: row[4] || '',
        actualUser: row[5] || '',
        contractCompany: row[6] || '',
        agencyCode: row[7] || '',
        agencyName: row[8] || '',
        annualInsuranceFee: row[9] || '',
        initialInsuranceFee: row[10] || '',
        installmentInsuranceFee: row[11] || '',
        insured: row[12] || '',
        insuredBirthDateGender: row[13] || '',
        policyHolder: row[14] || '',
        policyHolderBirthDateGender: row[15] || '',
        carNumber: row[16] || '',
        design: row[17] || '',
        consultationStatus: row[18] || '',
        contractStatus: row[19] || '',
        propertyType: row[20] || '',
        startDate: row[21] || '',
        endDate: row[22] || '',
        receiptDate: row[23] || '',
        consultationPath: row[24] || '',
        extra1: row[25] || '',
        paymentMethod: row[26] || '',
        consultant: row[27] || '',
        percent: row[28] || '',
        cyberMoney: row[29] || '',
        gift: row[30] || '',
        designNumber: row[31] || '',
        policyNumber: row[32] || '',
        previousContractCompany: row[33] || '',
        insuredPostalCode: row[34] || '',
        insuredAddress1: row[35] || '',
        insuredAddress2: row[36] || '',
        policyHolderPostalCode: row[37] || '',
        policyHolderAddress1: row[38] || '',
        policyHolderAddress2: row[39] || '',
        relationshipWithInsured: row[40] || '',
        relationshipWithDesignated1: row[41] || '',
        designated1Name: row[42] || '',
        minimumDriverName: row[43] || '',
        spouseName: row[44] || '',
        insuranceType: row[45] || '',
        carType: row[46] || '',
        mileageApplication: row[47] || '',
        ageLimit: row[48] || '',
        driverLimit: row[49] || '',
        carNameCode: row[50] || '',
        modelYear: row[51] || '',
        carName: row[52] || '',
        engineDisplacement: row[53] || '',
        specialRate: row[54] || '',
        accessory: row[55] || '',
        accessoryPrice: row[56] || '',
        carValue: row[57] || '',
        totalCarValue: row[58] || '',
        liabilityCoverage: row[59] || '',
        personalInjuryCoverage: row[60] || '',
        propertyDamageCoverage: row[61] || '',
        selfInjuryCoverage: row[62] || '',
        uninsuredCoverage: row[63] || '',
        ownDamageCoverage: row[64] || '',
        emergencyRoadsideAssistance: row[65] || '',
        insuranceHistory: row[66] || '',
        legalViolations: row[67] || '',
        discountSurcharge: row[68] || '',
        specialSurcharge1: row[69] || '',
        specialSurcharge2: row[70] || '',
        threeYearAccidentRate: row[71] || '',
        oneYearAccidentPoints: row[72] || '',
        threeYearAccidentPoints: row[73] || '',
        carInsuranceHistory: row[74] || '',
        otherOwnedVehicles: row[75] || '',
        currentMileage: row[76] || '',
        annualMileage: row[77] || '',
        mileageDiscount: row[78] || '',
        entryDate: row[79] || '',
        customerCounselingContent: row[80] || '',
        createdAt: now,
        updatedAt: now
      };

      data.push(obj);
    }

    return queryInterface.bulkInsert('Cars', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
