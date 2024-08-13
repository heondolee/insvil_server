const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");


const { Reference } = db;

// 지점별 조회 - 기본
router.post("/", async (req, res) => {
  console.log("지점별 조회 - 기본");
  try {
    const { searchKeyword } = req.body;
    const reference = await Reference.findAll({
      where: {
        [Op.or]: [
          { Title: { [Op.like]: `%${searchKeyword}%` } },
          { Content: { [Op.like]: `%${searchKeyword}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]  // createdAt 필드를 기준으로 내림차순 정렬
    });

    res.status(200).send(reference);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


router.get("/", async (req, res) => {  // (req, res)로 수정
  try {
    const references = await Reference.findAll({
      order: [['createdAt', 'DESC']]  // createdAt 필드를 기준으로 내림차순 정렬
    });
    res.status(200).send(references);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


// 특정 Reference 조회
router.get("/:id", async (req, res) => {
  try {
    const reference = await Reference.findByPk(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: "해당 자료를 찾을 수 없습니다." });
    }
    res.status(200).send(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 날짜를 YYYY-MM-DD HH:mm:ss 형식으로 변환하는 함수
function formatDateToSQLString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const reference = await Reference.findByPk(req.params.id);

    if (!reference) {
      return res.status(404).json({ message: "해당 자료를 찾을 수 없습니다." });
    }

    reference.Title = title || reference.Title;
    reference.Content = content || reference.Content;
    reference.Date = formatDateToSQLString(new Date()); // 수정 시간을 지정된 형식으로 추가
    await reference.save();

    res.status(200).send(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { title, content } = req.body;
    const currentDateTime = formatDateToSQLString(new Date()); // 현재 날짜와 시간을 지정된 형식으로 가져옴

    const reference = await Reference.create({
      Title: title,
      Content: content,
      Date: currentDateTime // 생성 시간을 지정된 형식으로 추가
    });

    res.status(201).send(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 특정 Reference 삭제
router.delete("/:id", async (req, res) => {
  try {
    const reference = await Reference.findByPk(req.params.id);

    if (!reference) {
      return res.status(404).json({ message: "해당 자료를 찾을 수 없습니다." });
    }

    await reference.destroy(); // 데이터 삭제
    res.status(200).json({ message: "자료가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


module.exports = router;
