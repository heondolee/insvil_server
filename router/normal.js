const express = require("express");
const router = express.Router();
const db = require("../models");

const { Normal } = db;

// 계약일에 맞는 long 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate, dateType, contractStatus, policyholder, insuredPerson, manager, policyNumber, user } = req.body;

  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send({
      error: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식이어야 합니다.",
    });
  }

  const validDateTypes = ["contractDate", "paymentStartDate", "paymentEndDate"];
  if (!validDateTypes.includes(dateType)) {
    return res.status(400).send({
      error: "유효하지 않은 dateType입니다. contractDate, paymentStartDate, paymentEndDate 중 하나여야 합니다.",
    });
  }

  try {
    const queryConditions = {};

    if (user.userCode === 4) {
      queryConditions.manager = user.name;
    }

    // policyholder가 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (policyholder && policyholder.trim() !== '') {
      queryConditions.policyholder = policyholder;
    }

    // insuredPerson이 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (insuredPerson && insuredPerson.trim() !== '') {
      queryConditions.insuredPerson = insuredPerson;
    }
    
    // policyNumber가 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (policyNumber && policyNumber.trim() !== '') {
      queryConditions.policyNumber = policyNumber;
    }
    
    // manager이 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (manager && manager.trim() !== '') {
      queryConditions.manager = manager;
    }

    const today = new Date();
    today.setHours(today.getHours() + 9);  // UTC 기준에서 9시간 더하기
    const dateString = today.toISOString().slice(0, 10);

    const isToday = startDate === endDate && startDate === dateString;
    
    if (!isToday) {
      queryConditions[dateType] = {
        [db.Sequelize.Op.between]: [startDate, endDate]
      };
    }
    
    // contractStatus가 제공되고 'statusAll'이 아닌 경우, 쿼리 조건에 추가합니다.
    if (contractStatus && contractStatus !== 'statusAll') {
      const statusMapping = {
        statusTerminate: '해지',
        statusNew: '신규',
        statusRenewal: '갱신'
      };
      if (!statusMapping[contractStatus]) {
        throw new Error('잘못된 contractStatus 값입니다.');
      }
      queryConditions.contractStatus = statusMapping[contractStatus];
    }    

    const order = [[dateType, 'DESC']];

    const normals = await Normal.findAll({
      where: queryConditions,
      order,
    });

    res.status(200).send({ normals: normals });
  } catch (error) {
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
});

// 특정 policyholder의 long 데이터 조회
router.post("/detail", async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const normal = await Normal.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(normal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/create", async (req, res) => {
  const normalData = req.body;
  try {
    const normal = await Normal.create(normalData);
    res.status(200).json(normal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/update", async (req, res) => {
  const normalData = req.body;
  try {
    const normal = await Normal.update(normalData, {
      where: {
        id: normalData.id,
      },
    });
    res.status(200).json(normal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Normal.destroy({
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
