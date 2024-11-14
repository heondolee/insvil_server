const express = require("express");
const router = express.Router();
const db = require("../models");

const { Car } = db;
const { CarDesign } = db;

// 모든 car 데이터 조회
router.get("/", async (req, res) => {
  res.status(200).send({ cars: "자동차 데이터" });
});


// 계약일에 맞는 car 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate, dateType, contractor, responsibilityName, carNumber, user, isCar, page, itemsPerPage} = req.body;

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

    if (carNumber && carNumber.trim() !== '') {
      queryConditions.carNumber = carNumber;
    } 

    if (contractor && contractor.trim() !== '') {
      queryConditions.contractor = contractor;
    } 

    if (responsibilityName && responsibilityName.trim() !== '') {
      queryConditions.responsibilityName = responsibilityName;
    }
    
    const today = new Date();
    today.setHours(today.getHours() + 9);  // UTC 기준에서 9시간 더하기
    const dateString = today.toISOString().slice(0, 10);

    const isToday = startDate === endDate && startDate === dateString;
    console.log('isToday', isToday);
    if (!isToday) {
      queryConditions[dateType] = {
        [db.Sequelize.Op.between]: [startDate, endDate]
      };
    }
    const order = dateType === 'endDate' ? [[dateType, 'ASC']] : [[dateType, 'DESC']];
    const offset = (page - 1) * itemsPerPage;  // 페이지에 따라 데이터를 건너뛰는 개수
    const limit = itemsPerPage;  // 페이지 당 가져올 데이터 개수

    const Model = isCar === "longTerm" ? Car : isCar === "design" ? CarDesign : null;

    if (!Model) {
      return res.status(400).send({
        error: "유효하지 않은 isCar 값입니다. longTerm 또는 design이어야 합니다.",
      });
    }

    const { rows: cars, count: totalItems } = await Model.findAndCountAll({
      where: queryConditions,
      order,
      offset,
      limit,
    });
    console.log('💕cars', cars);
    res.status(200).send({
      cars: cars,
      totalItems,  // 전체 아이템 수를 클라이언트에 전달
      currentPage: page,
      itemsPerPage,
    });
  } catch (error) {
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
});


// 특정 contractor의 car 데이터 조회
router.post("/detail", async (req, res) => {
  const { id, isCar } = req.body;

  // isCar에 따라 모델 선택
  const Model = isCar === "longTerm" ? Car : isCar === "design" ? CarDesign : null;

  if (!Model) {
    return res.status(400).send({
      error: "유효하지 않은 isCar 값입니다. longTerm 또는 design이어야 합니다.",
    });
  }

  try {
    const car = await Model.findOne({
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
  const { carData, isCar } = req.body;

  // isCar에 따라 모델 선택
  const Model = isCar === "longTerm" ? Car : isCar === "design" ? CarDesign : null;

  if (!Model) {
    return res.status(400).send({
      error: "유효하지 않은 isCar 값입니다. longTerm 또는 design이어야 합니다.",
    });
  }
  
  try {
    const car = await Model.create(carData);
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/update", async (req, res) => {
  const {carData, isCar } = req.body;

 // isCar에 따라 모델 선택
  const Model = isCar === "longTerm" ? Car : isCar === "design" ? CarDesign : null;

  if (!Model) {
    return res.status(400).send({
      error: "유효하지 않은 isCar 값입니다. longTerm 또는 design이어야 합니다.",
    });
  }

  try {
    const car = await Model.update(carData, {
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
  const { id, isCar } = req.body;

  // isCar에 따라 모델 선택
  const Model = isCar === "longTerm" ? Car : isCar === "design" ? CarDesign : null;

  if (!Model) {
    return res.status(400).send({
      error: "유효하지 않은 isCar 값입니다. longTerm 또는 design이어야 합니다.",
    });
  }

  try {
    await Model.destroy({
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
