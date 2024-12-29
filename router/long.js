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
  const { startDate, endDate, dateType, contractStatus, contractCompany, contractor, insuredPerson, responsibleName, policyNumber, user, page, itemsPerPage } = req.body;

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

    // insuredPerson이 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (insuredPerson && insuredPerson.trim() !== '') {
      queryConditions.insuredPerson = insuredPerson;
    }
    
    // policyNumber가 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (policyNumber && policyNumber.trim() !== '') {
      queryConditions.policyNumber = policyNumber;
    }
    
    // responsibleName이 제공되고 비어있지 않은 경우, 쿼리 조건에 추가합니다.
    if (responsibleName && responsibleName.trim() !== '') {
      queryConditions.responsibleName = responsibleName;
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

    // contractCompany가 제공되고 'allCompany' 가 아닌 경우, 쿼리 조건에 추가합니다.
    if (contractCompany && contractCompany !== 'allCompany') {
      const companyMapping = {
        kbsb: 'KB손보',
        samsung: '삼성화재',
        meritz: '메리츠화재',
        dbsb: 'DB손보',
        hyundai: '현대해상',
        mgsb: 'MG손보',
      };
      if (!companyMapping[contractCompany]) {
        throw new Error('잘못된 contractCompany 값입니다.');
      }
      queryConditions.contractCompany = companyMapping[contractCompany];
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

    const order = dateType === 'paymentEndDate' ? [[dateType, 'ASC']] : [[dateType, 'DESC']];
    const offset = (page - 1) * itemsPerPage;  // 페이지에 따라 데이터를 건너뛰는 개수
    const limit = itemsPerPage;  // 페이지 당 가져올 데이터 개수

    const { rows: longs, count: totalItems } = await Long.findAndCountAll({
      where: queryConditions,
      order,
      offset,
      limit,
    });

    let paymentInsurance = 0;
    let correctedInsurance = 0;

    if (!isToday) {
      let longs = [];
      if (page === 1) {
        longs = await Long.findAll({
          where: queryConditions,
          order,
        });
        // 전체 납입보험료 합계 계산
        paymentInsurance = longs.reduce((sum, long) => {
          let value = long.paymentInsurance;
          if (!value.includes(',')) {
            return sum + Number(value);
          } else {
            return sum + Number(value.replace(/,/g, ''));
          }
        }, 0);
        // 전체 수정보험료 합계 계산
        correctedInsurance = longs.reduce((sum, long) => {
          let value = long.correctedInsurance;
          if (!value.includes(',')) {
            return sum + Number(value);
          } else {
            return sum + Number(value.replace(/,/g, ''));
          }
        }, 0);
      }
    }

    res.status(200).send({
      longs: longs,
      totalItems,
      paymentInsurance,  // 납입보험료 합계
      correctedInsurance,  // 수정보험료 합계
      currentPage: page,
      itemsPerPage,
    });
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
