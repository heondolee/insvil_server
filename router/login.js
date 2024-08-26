const express = require("express");
const router = express.Router();
const db = require("../models");

const { User } = db;

//토큰 없을 때 로그인 하기
/*
1. 최초 로그인 시도하는 경우 -> 토큰 발급
2. 로그아웃 했을 경우 -> 토큰이 재발급
*/
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    return res.status(400).json({ success: false, message: "아이디나 비밀번호가 일치하지 않습니다." });
  } else {
    return res.status(200).json({ user: user, success: true, message: "로그인 성공" });
  }
});

// 토큰 있을 때 자동 로그인
router.post("/auto", async (req, res) => {
  const { id } = req.body;
});

module.exports = router;
