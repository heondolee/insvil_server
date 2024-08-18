const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer } = db;

router.post('/:part', async (req, res) => {
  try {
    const { modelName, pageSize = 3000 } = req.body;
    const { part } = req.params;

    console.log(`Request received for model: ${modelName}, part: ${part}`); // 디버깅용 콘솔 로그

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
      default:
        console.error('Invalid model name provided'); // 디버깅용 콘솔 로그
        return res.status(400).send('Invalid model name');
    }

    const offset = (part - 1) * pageSize;
    const records = await Model.findAll({
      offset,
      limit: pageSize,
    });

    if (records.length === 0) {
      console.log(`No more data found for part ${part}`); // 디버깅용 콘솔 로그
      return res.status(404).send('No more data to download');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${modelName}_Part_${part}`);

    const columns = Object.keys(records[0].dataValues).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      width: 50,
    }));

    worksheet.columns = columns;

    records.forEach(record => {
      worksheet.addRow(record.dataValues);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${modelName}_part_${part}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

    console.log(`Successfully generated and sent part ${part} of ${modelName}`); // 디버깅용 콘솔 로그
  } catch (error) {
    console.error('Error downloading the excel file:', error);
    res.status(500).send('Error generating the excel file');
  }
});

module.exports = router;
