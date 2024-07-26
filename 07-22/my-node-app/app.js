//npm start -> bin/www.js(웹서버 서비스 환경 구성) -> app.js -> routes 모듈 호출 -> 라우팅 메소드 호출
// --> DATA(model) 또는 view(ejs)파일 호출 반환

//에러처리를 위한 객체참조:별로 안중요
var createError = require('http-errors');

//node express 웹 어플리케이션 객체 생성
var express = require('express');

//서버상의 물리적 경로관리 내장 모듈
var path = require('path');

//쿠키정보를 파싱해주는 객체참조
var cookieParser = require('cookie-parser');

//서버측에서 전문 로깅처리를 morgan 로거 참조 : 잘 안씀
var logger = require('morgan');

//각종 사용자 요청과 응답을 처리해주는 라우터(라우팅파일) 참조하기
//라우터 파일별로 라우터 객체 참조

//전체 공통 라우터 파일
var indexRouter = require('./routes/index');

//샘플 라우터 파일로 사용자 정보 요청과 응답예시 샘플파일
var usersRouter = require('./routes/users');

//express 메소드를 호출해 nodeapp 객체를 생성한다.
var app = express();


//생성된 노드 백엔드 앱에 각종 설정들을 set 메소드를 통해 설정한다.
// view engine setup
// __dirname : 현재 모듈 app.js 의 물리적인 경로를 반환
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use()메소드를 통해 특정 기능 사용을 추가한다.
//노드앱에 logger기능추가
app.use(logger('dev'));

//노드앱에 json반환 기능추가 
app.use(express.json());

//기타 추가기능 정의
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//상단에서 참조한 라우터파일들의 기본 호출주소체계정의
//routes/index.js 라우터 파일은 http://localhost:3000/ 를 기본주소로 설정함
app.use('/', indexRouter);

//routes/users.js 라우터 파일의 기본 호출주소 체계를 정의합니다.
//http://localhost:3000/users/ 를 기본주소로 설정함
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//404에러처리를 위한 미들웨어 추가
//200: 서버요청에 정상응답, 
//400: 서버에 요청했지만 서버에 요청리소스가 없는 경우, 
//500: 서버요청했지만 서버에서 처리하다가 서버에러가 발생한 경우
app.use(function(req, res, next) {
  //각종 비정상적인 요청에 대한 404웹페이지 반환처리 기능제공
  next(createError(404));
});

// error handler
//500 서버측 에러에 대한 전역예외처리기
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//app.js 모듈내의 app객체를 반환한다.
module.exports = app;
