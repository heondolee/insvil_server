const express = require("express");
const router = express.Router();
const db = require("../models");

const { Long } = db;

// 모든 long 데이터 조회
router.get("/", async (req, res) => {
  res.status(200).send({ longs: "장기샘플 데이터" });
});

// 계약일에 맞는 long 데이터 조회
router.post("/date-range", async (req, res) => {
  const { startDate, endDate, dateType, contractStatus, contractor, responsibleName, policyNumber, user } = req.body;

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
      queryConditions.responsibleName = user.name;
    }

    // contractor가 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (contractor && contractor.trim() !== '') {
      queryConditions.contractor = contractor;
    }
    
    // policyNumber가 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    else if (policyNumber && policyNumber.trim() !== '') {
      queryConditions.policyNumber = policyNumber;
    }
    
    // responsibleName이 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    else if (responsibleName && responsibleName.trim() !== '') {
      queryConditions.responsibleName = responsibleName;
    }
    
    // dateType, startDate, endDate가 제공된 경우, 쿼리 조건에 추가합니다.
    else if (dateType && startDate && endDate) {
      queryConditions[dateType] = {
        [db.Sequelize.Op.between]: [startDate, endDate],
      };
    }
    
    // contractStatus가 제공되고 'statusAll'이 아닌 경우, 쿼리 조건에 추가합니다.
    if (contractStatus && contractStatus !== 'statusAll') {
      const statusMapping = {
        statusMaintain: '유지',
        statusLapse: '실효',
        statusTerminate: '해지',
        statusWithdraw: '철회',
        statusCancel: '취소',
        statusExpire: '만기',
      };
      if (!statusMapping[contractStatus]) {
        throw new Error('잘못된 contractStatus 값입니다.');
      }
      queryConditions.contractStatus = statusMapping[contractStatus];
    }    

    const order = dateType === 'paymentEndDate' ? [[dateType, 'ASC']] : [[dateType, 'DESC']];

    const longs = await Long.findAll({
      where: queryConditions,
      order,
    });

    res.status(200).send({ longs: longs });
  } catch (error) {
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
});

// 특정 contractor의 long 데이터 조회
router.post("/detail", async (req, res) => {
  const { id } = req.body;

  try {
    const long = await Long.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(long);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/create", async (req, res) => {
  const longData = req.body;
  try {
    const long = await Long.create(longData);
    res.status(200).json(long);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/update", async (req, res) => {
  const longData = req.body;
  try {
    const long = await Long.update(longData, {
      where: {
        id: longData.id,
      },
    });
    res.status(200).json(long);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Long.destroy({
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
