const express = require("express");
const router = express.Router();
const db = require("../models");

const { User } = db;

// 지점별 조회 - 기본
router.get("/branch", async (req, res) => {
  try {
    // 모든 User 데이터를 가져옵니다.
    const users = await User.findAll();

    // 지점 정보만 추출하여 중복을 제거합니다.
    const branches = [...new Set(users.map(user => user.branch))].filter(branch => branch !== '');

    console.log(branches); // 지점 이름 출력

    // 지점별 팀이 없는 row의 정보를 가져옵니다.
    const branchInfo = await Promise.all(branches.map(async (branch) => {
      const info = await User.findAll({
        where: {
          branch: branch,
          team: ''
        }
      });
      return { branch, info };
    }));

    // 지점 정보를 배열에 넣습니다.
    const result = branchInfo.reduce((acc, { branch, info }) => {
      if (info.length > 0) {
        acc[branch] = info.map(user => ({
          username: user.username,                         // 아이디
          birthdateGender: user.birthdateGender,           // 생년월일 / 성별
          mobilePhone: user.mobilePhone,                   // 핸드폰
          phone: user.phone,                               // 전화
          fax: user.fax,                                   // 팩스
          carSettlement: user.carSettlement,               // 자동차정산
          longTermSettlement: user.longTermSettlement,     // 장기정산
          lifeSettlement: user.lifeSettlement              // 생명정산
        }));
      }
      return acc;
    }, {});

    // 중복 데이터 제거
    for (const branch in result) {
      const seen = new Set();
      result[branch] = result[branch].filter(user => {
        const duplicate = seen.has(user.username);
        seen.add(user.username);
        return !duplicate;
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 팀별 조회 - 지점 눌렀을 때
router.get("/team", async (req, res) => {
  // 구현 내용
});

// 이름별 조회 - 팀 눌렀을 때
router.get("/name", async (req, res) => {
  // 구현 내용
});

// 업무담당자별 조회 - 기본
router.get("/manage", async (req, res) => {
  // 구현 내용
});

module.exports = router;
