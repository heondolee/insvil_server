const express = require("express");
const router = express.Router();
const db = require("../models");

const { Long } = db;

//모든 long 데이터 조회
router.get("/", async (req, res) => {
  res.status(200).send({ longs: "장기샘플 데이터" });
});

//계약일에 맞는 long 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate, dateType } = req.body;

  // 날짜 형식 검증
  const isValidDate = (date) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send({
      error: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식이어야 합니다.",
    });
  }

  // dateType 검증
  const validDateTypes = ["contractDate", "paymentStartDate", "paymentEndDate"];
  if (!validDateTypes.includes(dateType)) {
    return res.status(400).send({
      error: "유효하지 않은 dateType입니다. contractDate, paymentStartDate, paymentEndDate 중 하나여야 합니다.",
    });
  }

  console.log(startDate, endDate, dateType);

  try {
    // 데이터베이스 쿼리
    const longs = await Long.findAll({
      where: {
        [dateType]: {
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
