const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer, Reference, Normal } = db;

const BATCH_SIZE = 1000; // 한번에 처리할 레코드 수

router.post('/', async (req, res) => {
  try {
    const { modelName, start, end } = req.body;

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
      where: {},
      offset: start - 1, // Sequelize의 offset은 0부터 시작하므로 1을 빼줍니다.
      limit: end - start + 1,
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
      `attachment; filename=${modelName}_${start}-${end}.xlsx`
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
    const { modelName } = req.query;

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

    const count = await Model.count();
    res.status(200).json({ count });

  } catch (error) {
    res.status(500).send('Error retrieving row count');
  }
});


module.exports = router;
