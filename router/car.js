const express = require("express");
const router = express.Router();
const db = require("../models");

const { Car } = db;

// 모든 car 데이터 조회
router.get("/", async (req, res) => {
  res.status(200).send({ cars: "자동차 데이터" });
});


// 계약일에 맞는 car 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate, dateType, contractor, responsibilityName, carNumber, user } = req.body;

  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send({
      error: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식이어야 합니다.",
    });
  }

  const validDateTypes = ["receiptDate", "startDate", "endDate"];
  if (!validDateTypes.includes(dateType)) {
    return res.status(400).send({
      error: "유효하지 않은 dateType입니다. receiptDate, startDate, endDate 중 하나여야 합니다.",
    });
  }

  try {
    const queryConditions = {};
    
    if (user.userCode === 4) {
      queryConditions.responsibilityName = user.name;
    }

    // carNumber가 있으면 carNumber만으로 조회
    if (carNumber && carNumber.trim() !== '') {
      queryConditions.carNumber = carNumber;
    } 
    // carNumber가 없고 contractor가 있으면 contractor만으로 조회
    else if (contractor && contractor.trim() !== '') {
      queryConditions.contractor = contractor;
    } 
    else if (responsibilityName && responsibilityName.trim() !== '') {
      queryConditions.responsibilityName = responsibilityName;
    }
    // 둘 다 없으면 다른 조건 적용
    else {
      if (dateType && startDate && endDate) {
        queryConditions[dateType] = {
          [db.Sequelize.Op.between]: [startDate, endDate],
        };
      }
    }

    const order = dateType === 'endDate' ? [[dateType, 'ASC']] : [[dateType, 'DESC']];

    const cars = await Car.findAll({
      where: queryConditions,
      order,
    });

    res.status(200).send({ cars: cars });
  } catch (error) {
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
});


// 특정 contractor의 car 데이터 조회
router.post("/detail", async (req, res) => {
  const { id } = req.body;

  try {
    const car = await Car.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/create", async (req, res) => {
  const carData = req.body;
  try {
    const car = await Car.create(carData);
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/update", async (req, res) => {
  const carData = req.body;
  try {
    const car = await Car.update(carData, {
      where: {
        id: carData.id,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Car.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


module.exports = router;
