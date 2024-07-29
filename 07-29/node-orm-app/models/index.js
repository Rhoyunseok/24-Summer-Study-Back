//서버상의 경로를 조회하는 패키지 참조
const path = require('path');

//시퀄라이즈ORM 프레임워크 객체 생성
//대문자 Sequelize는 각종 sequelize ORM프레임워크내에서 제공하는 객체, 데이터타입등을 제공합니다.
const Sequelize= require('sequelize');

//개발모드 환경설정
const env = process.env.NODE_ENV|| 'development';

//DB연결환경설정정보변경처리//관련정보수정
//_dirname은 현재 모듈(index.js)의 물리적 경로조회
const config = require(path.join(__dirname,'..','config','config.json'))[env];

//데이터베이스객체
const db= {};

//DB연결정보로시퀄라이즈ORM 객체생성
const sequelize= new Sequelize(config.database,config.username,config.password,config);

//DB 처리객체에시퀄라이즈정보맵핑처리
//소문자 sequelize는 실제 DB서버에 연결하고 DB서버에 SQL구문을 전달해서 데이터를 처리하는 기능제공
//대문자 Sequelize는 시퀄라이즈 팩키지에서 제공하는 데이터타입 및 관련 객체정보를 제공함
//이후DB객체를통해데이터관리가능해짐
db.sequelize = sequelize; //DB연결정보를포함한DB제어객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서제공하는각종데이터타입및관련객체정보를제공함

//회원모델모듈파일참조하고db속성정의하기
db.Member= require('./member.js')(sequelize,Sequelize);
//게시글모델모듈파일참조하고db속성정의하기
db.Article= require('./article.js')(sequelize,Sequelize);
//db객체외부로노출하기
module.exports = db;