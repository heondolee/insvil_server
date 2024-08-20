const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer, Reference, Normal } = db;
const BATCH_SIZE = 1000; // 한번에 처리할 레코드 수

router.post('/', async (req, res) => {
  try {
    const { modelName } = req.body;

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

    // 테이블 컬럼 설정
    const firstBatch = await Model.findAll({ limit: BATCH_SIZE });
    if (firstBatch.length === 0) {
      return res.status(404).send('No data available');
    }

    const columns = Object.keys(firstBatch[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    let offset = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      const records = await Model.findAll({ limit: BATCH_SIZE, offset });
      if (records.length === 0) {
        hasMoreData = false;
      } else {
        records.forEach(record => {
          worksheet.addRow(record.dataValues);
        });
        offset += BATCH_SIZE;
      }
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${modelName}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).send('Error generating the excel file');
  }
});


module.exports = router;
