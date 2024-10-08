var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//환경변수를 사용하기위해 .env파일을 읽어들인다.
require("dotenv").config();
var expressLayouts = require("express-ejs-layouts");

var session = require("express-session");

//ORM DB연결객체 sequelize정보가져오기
var sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var articleRouter = require("./routes/article");

var app = express();

sequelize.sync(); //DB연결정보를통해DB동기화처리하기

//백엔드 앱에서 세션을 사용할 수 있게 설정하기
app.use(
  session({
    resave: false, //매번 세션을 새로 생성하지 않는다.
    saveUninitialized: true, //비어있는 세션도 저장할지 여부
    secret: "testsecret", //세션을 만들 때 사용하는 암호화 키값
    cookie: {
      httpOnly: true, //http지원여부
      secure: false, //http환경에서만 세션 정보를 주고받도록 처리할지 여부
      maxAge: 1000 * 60 * 5, //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//모든 뷰파일에 적용되는 레이아웃 뷰파일 설정하기
app.set("layout", "layout.ejs"); //전체레이아웃 파일 지정하기
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts); //노드 앱에 레이아웃 적용하기

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//노드앱 was 서비스 포트
// app.set("port", process.env.PORT || 5001);

//노드앱이 작동되는 서버 객체 생성
// var server = app.listen(app.get("port"), function () {});

module.exports = app;
