const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const db = require("../models");

const { Long, Car, User, Customer, Reference, Normal } = db;

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

    const records = await Model.findAll();

    if (records.length === 0) {
      return res.status(404).send('No data available');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(modelName);

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
      `attachment; filename=${modelName}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).send('Error generating the excel file');
  }
});

module.exports = router;
