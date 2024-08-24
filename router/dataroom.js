const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const multer = require('multer');
const path = require('path'); // path 모듈 추가
const fs = require('fs');
const { Reference } = db;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[:.]/g, '-'); // ISO 형식을 파일명에 적합하게 변환
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '').toLowerCase();
    const nameWithDate = `${formattedDate}-${safeName}`;
    cb(null, nameWithDate);
  }
});

const upload = multer({ storage: storage });

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
      order: [['Date', 'DESC']]  // createdAt 필드를 기준으로 내림차순 정렬
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

router.put("/:id", upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const reference = await Reference.findByPk(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: "해당 자료를 찾을 수 없습니다." });
    }

    reference.Title = title || reference.Title;
    reference.Content = content || reference.Content;
    reference.Date = formatDateToSQLString(new Date());

    if (req.file) {
      reference.FileUrl = req.file.path;
    }

    await reference.save();

    res.status(200).send(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


router.post("/new", upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const fileUrl = req.file ? req.file.path : null;
    const currentDateTime = formatDateToSQLString(new Date());

    const reference = await Reference.create({
      Title: title,
      Content: content,
      Date: currentDateTime,
      FileUrl: fileUrl
    });

    res.status(201).send(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const reference = await Reference.findByPk(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: "해당 자료를 찾을 수 없습니다." });
    }

    if (reference.FileUrl) {
      fs.unlinkSync(reference.FileUrl);
    }

    await reference.destroy();
    res.status(200).json({ message: "자료가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 파일 다운로드 엔드포인트 추가
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'public', 'files', filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).json({ message: "파일 다운로드에 실패했습니다." });
    }
  });
});

module.exports = router;
