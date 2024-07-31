const express = require("express");
const router = express.Router();
const db = require("../models");

const { Long } = db;

//모든 long 데이터 조회
router.get("/", async (req, res) => {
  const longs = await Long.findAll();
  res.status(200).send({ longs: longs });
});

//계약일에 맞는 long 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate } = req.body;

  // 날짜 형식 검증
  const isValidDate = (date) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res
      .status(400)
      .send({
        error: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식이어야 합니다.",
      });
  }

  try {
    // 데이터베이스 쿼리
    const longs = await Long.findAll({
      where: {
        contractDate: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).send({ longs: longs });
  } catch (error) {
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
});

module.exports = router;
