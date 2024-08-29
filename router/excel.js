const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer, Reference, Normal } = db;

router.post('/', async (req, res) => {
  try {
    const { modelName, startDate, endDate, dateType } = req.body;

    console.log("👍", modelName, startDate, endDate, dateType);

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

    // 해당 범위의 데이터 가져오기
    const records = await Model.findAll({
      where: {
        [dateType]: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
      order: [[dateType, 'ASC']], // 날짜 순서대로 정렬
    });

    console.log('first records👍:', records[1].dataValues);

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
    const { modelName, startDate, endDate, dateType } = req.query;
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

    const count = await Model.count({
      where: {
        [dateType]: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    console.log('count👍:', count);

    let offset = 0;
    while (offset < count) {
      // BATCH_SIZE만큼의 데이터를 조회하여 처음과 끝의 날짜를 가져옴
      const batchData = await Model.findAll({
        where: {
          [dateType]: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          }
        },
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
    console.log('ranges👍:', ranges);
    res.status(200).json({ ranges });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving date ranges');
  }
});



module.exports = router;
