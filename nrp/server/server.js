const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

const app = express();
const port = 4000;

/** 세션 사용 */
app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
/** DB 접속 정보 */
db.add("nrp", {
  host: "127.0.0.1",
  user: "user1",
  password: "mkop9074!@",
  database: "nrp",
  port: 3306,
});

/** DB에 쿼리명령문 실행 */
function 디비실행(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("nrp", function (error, connection) {
      if (error) {
        console.log(error);
        reject(true);
      }
      connection.query(query, function (error, data) {
        if (error) {
          console.log(error);
          reject(true);
        }
        resolve(data);
      });
      connection.release();
    });
  });
}
app.get("/", (req, res) => {
  res.send("HELLO");
});
app.post("/autoLogin", (req, res) => {
  res.send(req.session.loginUser);
});

/** 로그인
 * 입력값 체크
 * 세션에 저장
 */
app.post("/login", async (req, res) => {
  const { id, pw } = req.body;
  console.log(req.body);
  const result = {
    code: "success",
    message: "로그인 되었습니다.",
  };
  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }
  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(
    `SELECT * FROM member WHERE loginId='${id}' AND loginPw = '${pw}'`
  );

  if (user.length === 0) {
    result.code = "fail";
    result.message = "아이디가 존재하지 않습니다.";
  }
  if (result.code === "fail") {
    res.send(result);
    return;
  }

  req.session.loginUser = user[0];
  req.session.save();
  console.log(req.session.loginUser);
  res.send(result);
});

/** 회원가입 */
app.post("/join", async (req, res) => {
  const { id, pw, name, location, phoneNumber, email } = req.body;
  console.log(req.body);
  const result = {
    code: "success",
    message: "회원가입 되었습니다.",
  };

  if (id === "") {
    result.code = "fail";
    result.message = " 아이디를 입력해주세요";
  }
  if (pw === "") {
    result.code = "fail";
    result.message = " 비밀번호를 입력해주세요";
  }
  if (name === "") {
    result.code = "fail";
    result.message = " 이름을 입력해주세요";
  }
  if (location === "") {
    result.code = "fail";
    result.message = " 주소를 입력해주세요";
  }
  if (phoneNumber === "") {
    result.code = "fail";
    result.message = " 전화번호를 입력해주세요";
  }
  if (email === "") {
    result.code = "fail";
    result.message = " 이메일을 입력해주세요";
  }

  const user = await 디비실행(`SELECT * FROM member WHERE loginId = '${id}'`);

  if (user.length > 0) {
    result.code = "fail";
    result.message = "이미 사용중인 아이디 입니다.";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  await 디비실행(
    `INSERT INTO member(regDate,updateDate,loginId,loginPw,name,location,phoneNumber,email) VALUES(NOW(),NOW(),'${id}','${pw}','${name}','${location}','${phoneNumber}','${email}')`
  );

  res.send(result);
});

app.listen(port, () => {
  console.log("서버실행");
});
