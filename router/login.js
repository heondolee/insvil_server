const express = require("express");
const router = express.Router();
const db = require("../models");
const { v4: uuidv4 } = require('uuid');

const { User } = db;

//토큰 없을 때 로그인 하기
/*
1. 최초 로그인 시도하는 경우 -> 토큰 발급
2. 로그아웃 했을 경우 -> 토큰 재발급
*/
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    return res.status(400).json({ success: false, message: "아이디나 비밀번호가 일치하지 않습니다." });
  } else {
    const myUUID = uuidv4();

    await User.update({ employeeNumber: myUUID }, { where: { id : user.id } }); // 재발급한 토큰저장하기
    return res.status(200).json({ user: user, success: true, token: myUUID, message: "로그인 성공" });
  }
});

// 토큰 있을 때 자동 로그인
router.get("/auto", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const tokenValue = token ? token.split(" ")[1] : null;
    
    if (!tokenValue) {
      return res.status(400).json({ success: false, message: "토큰이 제공되지 않았습니다." });
    }
    
    const user = await User.findOne({ where: { employeeNumber: tokenValue } });
    console.log('👍', user)
    if (!user) {
      console.log('💪')
      return res.status(400).json({ success: false, message: "토큰이 유효하지 않습니다." });
    } else {
      return res.status(200).json({ user: user, success: true, message: "자동 로그인 성공" });
    }

  } catch (err) {
    res.status(500).json({ success: false, message: "서버 내부 오류" });
  }
});


module.exports = router;
