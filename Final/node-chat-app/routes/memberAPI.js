/*
일반회원 정보처리를 위한 각종 요청과 응답처리 제공 라우터 파일
기본호출주소 : http://localhost:5000/api/member
기본호출 주소 정의는 app.js 파일에서 정의함
*/
var express = require("express");
var router = express.Router();

//사용자 암호 단방향 암호화 적용을 위한 모듈
var bcrypt = require("bcryptjs");

//JWT토큰 생성 및 인증을 위한 모듈
const jwt = require("jsonwebtoken");

var db = require("../models/index");

var multer = require("multer");

//파일저장위치 지정
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/upload/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

/*
- 신규 회원정보 등록처리 요청과 응답 라우팅메소드
- 호출주소: http://localhost:5000/api/member/entry
- 호출방식: Post
**중요** 클라이언트 호출하는 주소와 후출방식이 일치해야 해당 라우팅메소드가 실행됩니다.
**응답결과** 신규 회원 정보 등록처리 후 DB에 저장된 회원정보 반환
*/
router.post("/entry", async (req, res, next) => {
  //백엔드 API를 호출하면 무조건 아래형식으로 데이터를 백엔드에서 반환합니다.
  let apiResult = {
    code: 400, //요청상태코드:200:정상처리 400:요청정보가 없는 경우 500:서버개발자코딩에러(try 블록안에서)
    data: null, //백엔드에서 프론트엔드로 전달할 데이터
    msg: "", //처리결과 코멘트(백엔드개발자가 프론트엔드 개발자에게 알려주는 코멘트메시지)
  };

  try {
    //로직 구현-로직에 에러가 나면 catch블럭으로 에러내용이 자동전달됩니다.

    //Step1 : 프론트엔드에서 전송해주는 회원정보(json)데이터를 추출한다.
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //Step1-1 : 신규 회원 메일주소 중복검사 처리하기
    const existMember = await db.Member.findOne({ where: { email: email } });

    if (existMember) {
      //이미 동일한 메일주소가 존재하는 경우
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "이메일 중복입니다.";

      return res.json(apiResult);
    } else {
      apiResult.code = 200;
      apiResult.data = member;
      apiResult.msg = "회원가입 완료";
    }

    //사용자암호를 단방향 암호화 문자열로 변환하기
    const encryptedPassword = await bcrypt.hash(password, 12); //암호화처리

    //등록할 데이터의 구조(속성명)은 member모델의 속성명을 기준으로 한다.

    const member = {
      email: email,
      member_password: encryptedPassword,
      name: name,
      profile_img_path: "/img/user.png",
      entry_type_code: 0,
      use_state_code: 1,
      entry_date: Date.now(),
    };

    //위에 등록할 데이터가 db MEMBER테이블에 저장된 후 실제 저장된 회원이 다시 반환한다.
    let registedMember = await db.Member.create(member);
    registedMember.member_password = ""; //보안상 비밀번호는 프론트엔드에 전송하지 않는다.

    //Step3 : 등록 후 반환된 실제 db에 저장된 회원데이터를 프론트엔드에 반환한다.
    apiResult.code = 200;
    apiResult.data = registedMember;
    apiResult.msg = "회원가입 완료";
  } catch (err) {
    console.log("/api/member/entry 호출에러 발생 : ", err.message); //자동생성 에러메시지

    //중요 : 백엔드의 구체적인 에러내용을 프론트엔드로 전송하는 것은 바로 사직서를 쓰는 것과 동일하다.
    //왜? DB등록처리시 먼저 DB서버를 연결하는데 DB연결실패하면 연결메시지를 제공하는데 이런정보내에는 보안적으로 공유하면 안되는
    //정보들이 존재합니다. 그래서 에러메시지를 그대로 프론트엔드로 전송하면 보안상 위험합니다.
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "\n관리자에게 문의하세요";
  }

  res.json(apiResult);
});

/*
- 회원 로그인 데이터 처리 요청과 응답 라우팅메소드
- 호출주소: http://localhost:5000/api/member/login
- 호출방식: Post
**중요** 클라이언트 호출하는 주소와 후출방식이 일치해야 해당 라우팅메소드가 실행됩니다.
**응답결과** 사용자 메일/암호를 체크하고 JWT토큰을 발행하여 프론트엔드에 전달
*/
router.post("/login", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //step1 : 로그인 사용자의 메일주소/암호를 추출합니다.
    const email = req.body.email;
    const password = req.body.password;

    //step2 : 사용자 메일주소 존재여부를 체크합니다.
    const member = await db.Member.findOne({
      where: { email: email },
    });

    if (member) {
      //동일 메일주소가 존재하는 경우
      //step3 : 사용자 암호를 체크합니다.
      const compareResult = await bcrypt.compare(
        password,
        member.member_password
      );
      if (compareResult) {
        //암호가 일치하는 경우
        //step4 : 사용자 메일주소/암호가 일치하는 경우 현재 로그인 사용자의 주요정보를 JSON데이터로 생성합니다.
        const tokenJsonData = {
          member_id: member.member_id,
          email: member.email,
          name: member.name,
          profile_img_path: member.profile_img_path,
        };

        //step5 : 인증된 사용자 JSON데이터를 JWT토큰내에 담아 JWT토큰문자열을 생성합니다.
        //jwt.sign('토큰내에담을데이터','JWT토큰생성시사용할비밀키문자열','토큰만료시간설정',발급자);
        const token = await jwt.sign(tokenJsonData, process.env.JWT_AUTH_KEY, {
          expiresIn: "24h",
          issuer: "CBNU",
        });

        //step6 : JWT 토큰 문자열을 프론트엔드로 반환합니다.
        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = "로그인 성공";
      } else {
        //암호가 불일치하는 경우
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = "InCorrectPasword";
      }
    } else {
      //동일 메일주소가 존재하지 않는 경우 프론트엔드로 겨로가값 바로 반환
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "NotExistEmail";
    }
  } catch (err) {}

  res.json(apiResult);
});

/*
-회원 로그인 데이터 처리 요청과 응답 라우팅메소드
-호출주소: http://localhost:5000/api/member/profile
-호출방식: Get
-응답결과: 프론트엔드에서 제공한 JWT토큰을 검증하고 토큰내에 담긴 사용자정보를 반환
*/
router.get("/profile", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //step1 : 웹브라우저에서 JWT토큰 값을 추출한다.
    //웹브라우저에서 전달되는 토큰값 예시 :
    var token = req.headers.authorization.split("Bearer ")[1];

    //step2 : JWT토큰 문자열 내에서 인증사용자 JSON 데이터를 추출한다.
    //jwt.verify('검증할토큰문자열','JWT토큰생성시사용한비밀키문자열');
    var loginMemberData = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    //step3 : 토큰 페이로드 영역에서 추출한 현재 로그인 사용자 고유번호를 기준으로 DB에서 단일사용자 조회
    var dbmember = await db.Member.findOne({
      where: { member_id: loginMemberData.member_id },
    });

    dbmember.member_password = ""; //보안상 비밀번호는 프론트엔드에 전송하지 않는다.

    //step4 : 단일 사용자 정보를 프론트엔드로 전달한다.
    apiResult.code = 200;
    apiResult.data = dbmember;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
-사용자 프로필 사진 업로드 및 정보 처리 라우팅 메소드
-호출주소: http://localhost:5000/api/member/profile/upload
- 호출방식: Post
-응답결과: 프론트엔드에서 첨부한 이미지 파일을 업로드 처리하고 업로드된 정보를 반환한다.
*/
router.post(
  "/profile/upload",
  upload.single("file"),
  async (req, res, next) => {
    let apiResult = {
      code: 400,
      data: null,
      msg: "",
    };

    try {
      //step1 : 업로드된 파일 정보 추출하기
      const uploadFile = req.file;
      //step2 : 업로드된 파일정보 반환하기
      const filePath = `/upload/${uploadFile.filename}`;
      const fileName = uploadFile.originalname;
      const fileSize = uploadFile.size;
      const mimeType = uploadFile.mimetype;

      const file = {
        filePath,
        fileName,
        fileSize,
        mimeType,
      };
      //step3 : 업로드된
      apiResult.code = 200;
      apiResult.data = file;
      apiResult.msg = "OK";
    } catch (err) {
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.msg = "Failed";
    }

    res.json(apiResult);
  }
);

module.exports = router;
