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
  try {
    const { branch } = req.query;

    console.log(branch); // 지점 이름 출력

    if (!branch) {
      return res.status(400).json({ message: "지점 정보가 필요합니다." });
    }

    const teams = await User.findAll({
      where: {
        branch: branch,
        team: {
          [db.Sequelize.Op.ne]: '' // 팀이 빈 문자열이 아닌 경우만 선택
        },
        manager: '' // manager이 빈 문자열인 경우만 선택
      }
    });

    console.log(teams); // 팀 정보 출력

    // 팀별 정보를 형식에 맞게 변환합니다.
    const teamInfo = teams.map(user => ({
      team: user.team,                                 // 팀
      username: user.username,                         // 아이디
      birthdateGender: user.birthdateGender,           // 생년월일 / 성별
      mobilePhone: user.mobilePhone,                   // 핸드폰
      phone: user.phone,                               // 전화
      fax: user.fax,                                   // 팩스
      carSettlement: user.carSettlement,               // 자동차정산
      longTermSettlement: user.longTermSettlement,     // 장기정산
      lifeSettlement: user.lifeSettlement              // 생명정산
    }));

    // 중복된 결과 제거
    const seen = new Set();
    const uniqueTeamInfo = teamInfo.filter(user => {
      const duplicate = seen.has(user.username);
      seen.add(user.username);
      return !duplicate;
    });

    res.status(200).json(uniqueTeamInfo);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


// 이름별 조회 - 팀 눌렀을 때
router.get("/name", async (req, res) => {
  try {
    const { branch, team } = req.query;

    console.log(`branch: ${branch}, team: ${team}`); // 지점 및 팀 이름 출력

    if (!branch || !team) {
      return res.status(400).json({ message: "지점 및 팀 정보가 필요합니다." });
    }

    const employees = await User.findAll({
      where: {
        branch: branch,
        team: team,
        manager: {
          [db.Sequelize.Op.ne]: '' // 이름 빈 문자열이 아닌 경우만 선택
        },
      }
    });

    // 직원 정보를 형식에 맞게 변환합니다.
    const employeeInfo = employees.map(user => ({
      manager: user.manager,                             // 이름
      username: user.username,                           // 아이디
      birthdateGender: user.birthdateGender,             // 생년월일 / 성별
      mobilePhone: user.mobilePhone,                     // 핸드폰
      phone: user.phone,                                 // 전화
      fax: user.fax,                                     // 팩스
      carSettlement: user.carSettlement,                 // 자동차정산
      longTermSettlement: user.longTermSettlement,       // 장기정산
      lifeSettlement: user.lifeSettlement                // 생명정산
    }));

    // 중복된 결과 제거
    const seen = new Set();
    const uniqueEmployeeInfo = employeeInfo.filter(user => {
      const duplicate = seen.has(user.username);
      seen.add(user.username);
      return !duplicate;
    });

    res.status(200).json(uniqueEmployeeInfo);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


// 업무담당자별 조회 - 기본
router.get("/manager", async (req, res) => {
  try {
    // 지점이 없는 사용자 데이터를 가져옵니다.
    const usersWithoutBranch = await User.findAll({
      where: {
        branch: ''
      }
    });

    // 결과를 필요한 형식으로 변환합니다.
    const result = usersWithoutBranch.map(user => ({
      name: user.name,                                 // 이름
      username: user.username,                         // 아이디
      birthdateGender: user.birthdateGender,           // 생년월일 / 성별
      mobilePhone: user.mobilePhone,                   // 핸드폰
      phone: user.phone,                               // 전화
      fax: user.fax,                                   // 팩스
    }));

    // 중복된 결과 제거를 위한 Set 사용
    const seen = new Set();
    const uniqueResult = result.filter(user => {
      const duplicate = seen.has(user.username);
      seen.add(user.username);
      return !duplicate;
    });

    // 결과를 클라이언트에게 응답합니다.
    res.status(200).json(uniqueResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 이름 눌렀을 때
router.post("/detail", async (req, res) => {
  try {
    const { username } = req.body;

    console.log(username); // 이름 출력

    if (!username) {
      return res.status(400).json({ username: "아이디가 필요합니다."});
    }

    const user = await User.findOne({
      where: {
        username: username
      }
    });

    const result = {
      username: user.username,                         // 아이디
      branch: user.branch,                             // 지점
      team: user.team,                                 // 팀
      manager: user.manager,                           // 이름
      birthdateGender: user.birthdateGender,           // 생년월일 / 성별
      mobilePhone: user.mobilePhone,                   // 핸드폰
      phone: user.phone,                               // 전화
      fax: user.fax,                                   // 팩스
      accountHolder: user.accountHolder,               // 예금주
      address: user.address,                           // 주소
      carSettlement: user.carSettlement,               // 자동차정산
      longTermSettlement: user.longTermSettlement,     // 장기정산
      lifeSettlement: user.lifeSettlement,             // 생명정산
      other: user.other                               // 기타
    };

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
