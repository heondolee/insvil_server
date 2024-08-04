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
  const { startDate, endDate, dateType, contractStatus } = req.body;

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

  try {
    // 데이터베이스 쿼리 조건 초기화
    const queryConditions = {
      [dateType]: {
        [db.Sequelize.Op.between]: [startDate, endDate],
      },
    };
  
    // contractStatus에 따른 조건 추가
    if (contractStatus !== 'statusAll') {
      switch (contractStatus) {
        case 'statusMaintain':
          queryConditions.contractStatus = '유지';
          break;
        case 'statusLapse':
          queryConditions.contractStatus = '실효';
          break;
        case 'statusTerminate':
          queryConditions.contractStatus = '해지';
          break;
        case 'statusWithdraw':
          queryConditions.contractStatus = '철회';
          break;
        case 'statusCancel':
          queryConditions.contractStatus = '취소';
          break;
        case 'statusExpire':
          queryConditions.contractStatus = '만기';
          break;
        default:
          // 잘못된 contractStatus가 주어졌을 경우 처리
          throw new Error('잘못된 contractStatus 값입니다.');
      }
    }

    // 정렬 순서 설정
    let order = [];
    if (dateType === 'paymentEndDate') {
      order = [[dateType, 'ASC']]; // paymentEndDate는 오름차순 정렬
    } else {
      order = [[dateType, 'DESC']]; // contractDate와 paymentStartDate는 내림차순 정렬
    }
  
    // 데이터베이스 쿼리 실행
    const longs = await Long.findAll({
      where: queryConditions,
      order: order, // 정렬 조건 추가
    });
  
    // 응답 전송
    res.status(200).send({ longs: longs });
  } catch (error) {
    // 오류 응답 전송
    res.status(500).send({ error: "데이터 조회 중 오류가 발생했습니다." });
  }
  
});

module.exports = router;
