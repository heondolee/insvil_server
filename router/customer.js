const express = require("express");
const router = express.Router();
const db = require("../models");

const { Customer } = db;

router.get("/list", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/list", async (req, res) => {
  const { customerName } = req.body;

  try {
    const customers = await Customer.findAll({
      where: {
        customerName: customerName,
      },
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/detail", async (req, res) => {
  const { customerName } = req.body;

  try {
    const customer = await Customer.findOne({
      where: {
        customerName: customerName,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
