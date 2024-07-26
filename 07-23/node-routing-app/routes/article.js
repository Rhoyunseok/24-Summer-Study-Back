//게시글 정보관리 웹페이지 요청과 응답처리 전용 라우터파일
//article.js 라우터 파일의 기본주소체계는 app.js 내에서
//http://localhost:3000/article 로 정의할 예정이다.

//express 객체를 참조한다.
var express = require('express');

//각종 요청과 응답처리를 위한 라우터 객체 생성하기
var router = express.Router();


//게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의
//요청주소 : http://localhost:3000/article/list
//router.get()라우팅메소드는 클라이언트에서 get방식으로 요청해야함
//클라이언트에 get방식으로 요청하는 방법 : 브라우저주소창에 url주소를 입력하거나 <a href="url">링크</a> 링크태그를 사용자가 클릭
//router.get('호출주소url', 콜백함수);
//router.post('호출주소url', 콜백함수);
//router.put('호출주소url', 콜백함수);
//router.delete('호출주소url', 콜백함수);
//router.patch('호출주소url', 콜백함수);
router.get('/list',function(req,res){
    //콜백함수 (req,res,next);
    //req : 클라이언트 요청정보를 가진 객체
    //res : 클라이언트 응답정보를 가진 객체
    //next : 다음번 미들웨어를 실행시키는 콜백함수
    //콜백함수(next= 미들웨어로 콜백처리후에 진행할 흐름제어 객체)

    //res.render(): 특정지정뷰파일의 내용을 웹브라우저로 전달하는 메소드
    //views폴더아래 article폴더아래 list.ejs 파일을 웹브라우저로 전달한다.
    //res.render('뷰파일경로',해당지정뷰에 전달할 DATA(JSONData))
    res.render('article/list.ejs',{title:'게시글 목록'});
});


router.get('/create',function(req,res){
    res.render('article/create.ejs',{title:'신규 게시글 작성'});
});
//게시글 등록페이지에서 폼방식으로 전달해준 사용자 입력 게시글 정보를 추출해
//DB에 저장처리하는 라우팅 메소드 구현
//**서버측 라우팅 메소드는 호출주소URL과 클라이언트 요청방식이 둘다 동일해야 해당 라우팅메소드가 실행됨 */
router.post('/create', function(req,res){
    

    //사용자 게시글 등록폼태그내 입력/선택 값 추출하기
    //사용자 입력폼내 입력/선택 html요소태그의 값을 추출하려면
    //req.body.html요소태그****name속성값***으로 추출할 수 있다.
    //req=HttpRequest객체=요청정보 담고 있는 클라이언트/웹브라우저에서 서버로 전달되는 모든 정보를 담고 있는 객체
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명은 생략가능
    const article = {
        title:title,
        contents:contents,
        display:display,
        view_cnt:0,
        ipaddress:"111.111.111.111",
        regist_date:Date.now(),
        regist_id:1,
    };

    //Step3: DB에 관련 게시글 테이블에 데이터를 저장한다.


    //Step4: 사용자 웹브라우저를 게시글 목록페이지로 바로 이동시키기
    //res.redirect
    res.redirect('/article/list');


});






router.get('/modify',function(req,res){
    //url 주소를 통해 data 를 전달하는 2가지 방법
    //1. 쿼리스트링방식으로 전달하는 방법 : article/modify?키=1&키2=2&키3=3
    //2. url 주소에 포함된 파라미터값을 추출하는 방법 /article/modify/1/goods/2
    
    //step 1 : url 주소에서 게시글 고유번호를 추출한다.
    //쿼리스트링방식으로 전달되는 키ㅏㅄ은 req.query.키명으로 추출
    const article_id = req.query.id;

    //step 2 : 해당 게시글 번호를 이용해 DB게시글 테이블에서 단일 게시글 정보를 조회해온다.
    //언제? 나중에
    //ex)
    const article = {
        article_id:1,
        title:'웹퍼블리셔의 업무에 대해 궁금해요.',
        contents:'웹퍼블리셔의 주요업무 2가지 웹표준준수코딩, 웹접근성준수, 반응형웹페이지구현...블라블라..',
        display:1,
        view_cnt:100,
        regist_date:"2024-07-23",
        regist_id:1,
    }

    res.render('article/modify.ejs',{article:article});
});

//기존 게시글 정보에 대해 사용자가 수정한 폼정보를 이용해
//수정데이터를 폼에서 추출하고 추출한 수정정보를 기반으로
//db에 저장되어 있던 기존 데이터를 수정처리후에 목록페이지 이동시킬까? 말까?? 결정은 여러분이 하는것
//관리자 웹사이트의 특성상 목록페이지로 그냥 이동시켜버림
//요청주소 : http://localhost:3000/article/modify/1
//요청방식 : post
//응답형식 : 웹브라우저 주소를 목록페이지로 이동시킴 ..res.redirect('/article/list');
router.post('/modify/:id',function(req,res){

    //url 파라미터 방식으로 데이터를 전달하는 경우 해당 데이터를 url 에서 추출하는 바업
    //먼저 라우팅 주소에 와일드카드 키를 설정한다. /modify/:id   :id가 와일드카드 키


    //step 1 : 게시글 고유번호를 추출한다. 와일드카드 키명으로 파라메타 값 추출하기
    //파라메타 방식으로 url을 통해 데이터를 전달하는 경우 req.params.와일드카드명으로 값을 추출한다.
    const articleIdx = req.params.id;

    //step 2 : 사용자가 수정한 게시글 정보를 추출한다.
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;


    //step 3 : db게시글 정보 수정을 위한 json 수정데이터 생성하기
    const article = {
        title:title,
        contents:contents,
        display:display,
    };

    //step 4 : db에 해당 단일 게시글에 대해 상기 수정데이터로 데이터를 수정처리한다.


    //수정작업이 끝나면 목록페이지로 이동시키거나 특정뷰파일을 보내준다.(res.render(...)
    res.redirect('/article/list');
});

router.post('/delete',function(req,res){
    //게시글 고유번호 추출하기
    const articleIdx = req.body.article_id;

    //DB에서 해당 게시글 정보 삭제처리하기

    //삭제처리후에 목록페이지로 이동시키기
    res.redirect('/article/list');
});










//반드시 라우터파일의 라우터 객체를 exports로 노출해야
//app/js에서 router내의 라우팅 규칙을 실행할 수 있다.
// ** 반드시 있어야함 **//
module.exports = router;