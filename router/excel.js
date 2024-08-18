const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer } = db;

router.post('/:part', async (req, res) => {
  try {
    const { modelName, pageSize = 3000 } = req.body;
    const { part } = req.params;


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
        return res.status(400).send('Invalid model name');
    }

    const offset = (part - 1) * pageSize;
    const records = await Model.findAll({
      // offset,
      // limit: pageSize,
    });

    if (records.length === 0) {
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

  } catch (error) {
    res.status(500).send('Error generating the excel file');
  }
});

module.exports = router;
