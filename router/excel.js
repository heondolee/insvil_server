const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const { convert } = require('html-to-text');
const path = require('path'); // path 모듈 사용

const { Long, Car, User, Customer, Reference, Normal } = db;

router.post('/', async (req, res) => {
  try {
    const { modelName, startDate, endDate, dateType, responsibleName } = req.body;

    console.log("💕 modelName", modelName, "startDate", startDate, "endDate", endDate, "dateType", dateType, "responsibleName", responsibleName);

    let Model;
    switch (modelName.toLowerCase()) {
      case 'long':
        Model = Long;
        break;
      case 'car':
        Model = Car;
        break;
      case 'user':
        Model = User;
        break;
      case 'customer':
        Model = Customer;
        break;
      case 'reference':
        Model = Reference;
        break;
      case 'normal':
        Model = Normal;
        break;
      default:
        return res.status(400).send('Invalid model name');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(modelName);

    // 첫 번째 배치를 가져와서 컬럼을 설정합니다.
    const firstBatch = await Model.findAll({ limit: 1 });
    if (firstBatch.length === 0) {
      return res.status(404).send('No data available');
    }

    const columns = Object.keys(firstBatch[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    const whereCondition = {
      [dateType]: {
        [Op.between]: [startDate, endDate],
      },
    };
    
    // responsibleName이 존재할 경우, 모델에 따라 다른 필드로 필터링
    if (responsibleName && responsibleName.trim() !== '') {
      if (modelName === 'car') {
        whereCondition.responsibilityName = responsibleName;
      } else if (modelName === 'normal') {
        whereCondition.manager = responsibleName;
      } else {
        whereCondition.responsible = responsibleName;
      }
    }    
    
    const records = await Model.findAll({
      where: whereCondition,
      order: [[dateType, 'ASC']], // 날짜 순서대로 정렬
    });
    

    if (records.length === 0) {
      return res.status(404).send('No data available in this range');
    }

    // 데이터를 엑셀 시트에 추가
    records.forEach(record => {
      worksheet.addRow(record.dataValues);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${modelName}_${startDate}_${endDate}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating the excel file', error);
    res.status(500).send('Error generating the excel file');
  }
});


// 백엔드에 행 수를 가져오는 API 추가
router.get('/count', async (req, res) => {
  try {
    const { modelName, startDate, endDate, dateType, responsibleName } = req.query;
    const BATCH_SIZE = 1000;
    const ranges = [];

    let Model;
    switch (modelName.toLowerCase()) {
      case 'long':
        Model = Long;
        break;
      case 'car':
        Model = Car;
        break;
      case 'user':
        Model = User;
        break;
      case 'customer':
        Model = Customer;
        break;
      case 'reference':
        Model = Reference;
        break;
      case 'normal':
        Model = Normal;
        break;
      default:
        return res.status(400).send('Invalid model name');
    }

    const whereCondition = {
      [dateType]: {
        [Op.between]: [startDate, endDate],
      },
    };
    
    if (responsibleName && responsibleName.trim() !== '') {
      if (modelName === 'car') {
        whereCondition.responsibilityName = responsibleName;
      } else if (modelName === 'normal') {
        whereCondition.manager = responsibleName;
      } else {
        whereCondition.responsible = responsibleName;
      }
    }

    const count = await Model.count({
      where: whereCondition,
    });

    let offset = 0;
    while (offset < count) {
      // BATCH_SIZE만큼의 데이터를 조회하여 처음과 끝의 날짜를 가져옴
      const batchData = await Model.findAll({
        where: whereCondition,
        order: [[dateType, 'ASC']],
        limit: BATCH_SIZE,
        offset: offset,
      });

      if (batchData.length > 0) {
        const firstDate = batchData[0][dateType];
        const lastDate = batchData[batchData.length - 1][dateType];
        ranges.push([firstDate, lastDate]);
      }

      offset += BATCH_SIZE;
    }
    res.status(200).json({ ranges });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving date ranges');
  }
});

function stripHTML(html) {
  return convert(html, {
    wordwrap: 130, // 단어를 줄 바꿈 처리하는 옵션
  });
}

router.post('/reference', async (req, res) => {
  try {
    const { searchKeyword } = req.body;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reference');

    // 첫 번째 배치를 가져와서 컬럼을 설정합니다.
    const firstBatch = await Reference.findAll({ limit: 1 });
    if (firstBatch.length === 0) {
      return res.status(404).send('No data available');
    }

    const columns = Object.keys(firstBatch[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    // 해당 키워드로 데이터 가져오기
    const records = await Reference.findAll({
      where: {
        [Op.or]: [
          { Title: { [Op.like]: `%${searchKeyword}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]  // createdAt 필드를 기준으로 내림차순 정렬
    });

    if (records.length === 0) {
      return res.status(404).send('No data available for the provided keyword');
    }

    // 데이터를 엑셀 시트에 추가
    records.forEach(record => {
      const data = record.dataValues;

      // Content 필드를 순수 텍스트로 변환
      if (data.Content) {
        data.Content = stripHTML(data.Content); // HTML을 텍스트로 변환하는 부분
      }

      worksheet.addRow(data);
    });

    // 파일 이름에서 특수 문자를 제거하거나 인코딩
    const safeFileName = path.basename(`reference_${searchKeyword}.xlsx`).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(safeFileName)}`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating the excel file', error);
    res.status(500).send('Error generating the excel file');
  }
});

router.post('/customer', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reference');

    // 첫 번째 배치를 가져와서 컬럼을 설정합니다.
    const firstBatch = await Customer.findAll({ limit: 1 });
    if (firstBatch.length === 0) {
      return res.status(404).send('No data available');
    }

    const columns = Object.keys(firstBatch[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    // 해당 키워드로 데이터 가져오기
    const records = await Customer.findAll();

    if (records.length === 0) {
      return res.status(404).send('No data available for the provided keyword');
    }

    // 데이터를 엑셀 시트에 추가
    records.forEach(record => {
      const data = record.dataValues;

      worksheet.addRow(data);
    });

    // 파일 이름에서 특수 문자를 제거하거나 인코딩
    const safeFileName = path.basename(`customer.xlsx`).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(safeFileName)}`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating the excel file', error);
    res.status(500).send('Error generating the excel file');
  }
});

router.post('/employee', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reference');

    // 첫 번째 배치를 가져와서 컬럼을 설정합니다.
    const firstBatch = await User.findAll({ limit: 1 });
    if (firstBatch.length === 0) {
      return res.status(404).send('No data available');
    }

    const columns = Object.keys(firstBatch[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    // 해당 키워드로 데이터 가져오기
    const records = await User.findAll();

    if (records.length === 0) {
      return res.status(404).send('No data available for the provided keyword');
    }

    // 데이터를 엑셀 시트에 추가
    records.forEach(record => {
      const data = record.dataValues;

      worksheet.addRow(data);
    });

    // 파일 이름에서 특수 문자를 제거하거나 인코딩
    const safeFileName = path.basename(`customer.xlsx`).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(safeFileName)}`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating the excel file', error);
    res.status(500).send('Error generating the excel file');
  }
});



module.exports = router;
