const express = require("express");
const router = express.Router();
const db = require("../models");

const { User } = db;

//모든 long 데이터 조회
router.get("/", async (req, res) => {
  const longs = await Long.findAll();
  res.status(200).send({ longs: longs });
});

//로그인 하기
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    return res.status(400).json({ success: false, message: "아이디나 비밀번호가 일치하지 않습니다." });
  } else {
    return res.status(200).json({ user: user, success: true, message: "로그인 성공" });
  }
});

module.exports = router;
