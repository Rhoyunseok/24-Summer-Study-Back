var express = require('express');
var router = express.Router();


//공통 기능 미들웨어 참조하기
//middleware.js파일에 정의된 미들웨어 함수들을 참조한다.
const {checkParams, checkQuery} = require('./middleware.js');

//해당 라우터파일이 호출되면 무조건 실행되는 미들웨어 함수정의하기
router.use(function(req,res,next){
  console.log('index.js 라우터파일이 호출되었습니다.',Date.now());
  // res.send("모든 응답 반환하기");
  next();
});


//특정 주소호출에 대한 미들웨어 기능 추가
//localhost:3000/sample로 접속하면 아래 미들웨어 함수가 실행된다.
router.use('/sample', function(req,res,next){
  console.log("index.js 라우터파일 미들웨어2호출",req.originalUrl);
  next();
},function(req,res,next){
  console.log("index.js 라우터파일 미들웨어3호출",req.method);
  res.send(req.method);
});


/* 
메인페이지 요청과 응답처리 라우팅메소드. 
-호출주소: http://localhost:3000/
-호출방식: GET
-응답결과: views/index.ejs파일을 렌더링하여 화면에 출력
*/

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//http://localhost:3000/test/1
//checkParams 미들웨어를 요청이후 응답전에 먼저 실행하게하여 특정 로직을 적용한다.
//step1 : router.get메소드 실행 -> checkParams미들웨어 실행 -> next()호출 -> 라우터함수실행
router.get('/test/:id',checkParams, async (req, res, next) => {
  res.render('index.ejs', { title: "테스트" });
});


//http://localhost:3000/product?category=computer&stock=1001
router.get('/product',checkQuery, async (req, res, next) => {
  res.render('index.ejs', { title: "상품정보" });
});

module.exports = router;
