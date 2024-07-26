//users.js 라우터 파일의 기본주소체계는
//app.js 에서 정의한 http://localhost:3000/users/ 를 기본주소로 설정함
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //해당 텍스트를 웹브라우저에 응답결과물로 반환한다.
  res.send('respond with a resource1');
});


//호출주소 : http://localhost:3000/users/testing
router.get('/testing', function(req, res, next) {
  res.send('respond with a resource2');
});

module.exports = router;
