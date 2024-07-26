//article.js 라우터 파일은
//게시글 관련 각종 웹페이지들에 대한 요청과 응답을 처리한다.
//본 라우터파일의 기본호출주소 : http://localhost:3000/article 로 시작하게
//app.js에서 라우터 파일 참조시 기본주소를 설정해준다.
var express = require('express');
var router = express.Router();


/*
- 게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 구현
- 호출주소 : http://localhost:3000/article/list
- 호출방식 : GET
- 응답결과 : 게시글 목록데이터를 기반으로 게시글 목록 웹페이지 전달
*/
router.get('/list',async(req,res)=>{


    //게시글 데이터 목록 3개 생성. 추후 DB에서 데이터를 가져옵니다.
    const articles = [
        {
            article_id:1,
            title:"게시글 제목1입니다.",
            contents:"게시글1 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        },
        {
            article_id:2,
            title:"게시글 제목2입니다.",
            contents:"게시글2 내용입니다.",
            display:2,
            view_cnt:11,
            ip_address:"222.111.111.111",
            regist_id:2,
            regist_date:Date.now()
        },
        {
            article_id:3,
            title:"게시글 제목3입니다.",
            contents:"게시글3 내용입니다.",
            display:1,
            view_cnt:30,
            ip_address:"333.111.111.111",
            regist_id:3,
            regist_date:Date.now()
        }
    ];

    

    res.render('article/list.ejs', {articles:articles});
});

/*
- 신규 게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드 구현
- 호출주소 : http://localhost:3000/article/create
- 호출방식 : GET
- 응답결과 : 게시글 등록 웹페이지 뷰파일 전달
*/
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
});

/*
- 신규 게시글 등록 웹페이지에서 보내준
- 사용자가 입력/선택한 신규 게시글 데이터를 등록 처리 요청과 응답처리 라이팅 메소드 구현
- 호출주소 : http://localhost:3000/article/create
- 호출방식 : POST
- 응답결과 : 신규게시글 DB등록 처리후 특정 페이지로 이동 또는 특정뷰파일 제공
**라우팅 주소와 요청방식 2가지가 동이랳야 해당 라우팅 메소드가 호출되고 실행된다.**
*/
router.post('/create',async(req,res)=>{
    
    //step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출하기
    //req.body.폼태그의 *name!!!속성값*
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //step2 : DB 게시글 테이블에 저장할 JSON데이터 생성하기
    //속성명과 속성의 데이터값 변수/상수명이 같으면 상수/변수명은 생략가능하다. ex) title:title = title
    const article = {
        title:title,
        contents:contents,
        display:display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    };

    //step3 : DB 게시글 테이블에 상기 article 데이터 등록처리(Insert Into Table명...)
    //DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함

    const registedArticle = {
        article_id:1,
        title:title,
        contents,
        display:display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    };


    //step4 : 등록처리된 게시글 목록 페이지로 이동하기
    //http://localhost:3000/article/list
    res.redirect('/article/list');
});

/*
- 기존 게시글 데이터 삭제처리 요청과 응답처리 라우팅 메소드
- 호출주소 : http://localhost:3000/article/delete/?aid=1
- 호출방식 : GET
- 응답결과 : 해당 게시글 삭제처리하고 목록페이지로 이동시킴
*/
router.get('/delete',async(req,res)=>{
    //req.query.키명으로 쿼리스트링 방식으로 전달된 데이터 추출
    const articleIdx = req.query.aid;

    //step2 : 데이터 삭제처리
    //DELETE FROM article WHERE article_id=1;


    //step3 : 삭제처리후 목록페이지로 이동
    res.redirect('/article/list');
});




/*
- 기존 등록된 게시글 데이터를 조회해서 게시글 수정 웹페이지에 데이터를 포함한 웹페이지 요청과 응답처리 라우팅메서드
- 호출주소 : http://localhost:3000/article/modify/:article_id
- 호출방식 : GET
- 응답결과 : db에서 해당 단일게시글 정보를 조회해와서 지정 뷰파일에 데이터를 전달하고 뷰파일내에서 해당 데이터를 html태그레 출력해서 최종
-웹브라우저에 동적으로 변경된 웹페이지를 반환한다.
*/
router.get('/modify/:idx',async(req,res)=>{
    
    //url 주소에서 게시글 고유번호를 추출한다.
    const articleIdx = req.params.article_idx;

    //step2 : DB 게시글 테이블에서 해당 게시글 고유번호에 해당하는 단일게시글 정보를 조회해옵니다
    //조회해 왔다고 가정
    const article = {
        article_id:1,
        title:"게시글 제목1입니다.",
        contents:"게시글1 내용입니다.",
        display:1,
        view_cnt:10,
        ip_address:"111.111.111.111",
        regist_id:1,
        regist_date:Date.now()
    };
    

    //step3 : db에서 가져온 단일게시글 정보를 modify.ejs 뷰파일에 전달합니다.
    res.render('article/modify.ejs', {article}); //article한번만 적어도됨

});


/*
- 기존 게시글을 수정한 사용자 폼에 대한 게시글 데이터 수정처리 요청과 응답처리 라우팅메서드
- 호출주소 : http://localhost:3000/article/modify/
- 호출방식 : POST
- 응답결과 : 기존 게시글 정보를 수정처리하고 목록페이지로 이동
*/
router.post('/modify/',async(req,res,next)=>{
    
    //수정할 대상이 되는 게시글 고유번호
    const articleIdx = req.body.article_id; //hidden태그의 name 속성값
    //step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출하기

    //실제 수정할 데이터항목별 값 세팅하기
    const article = {
        title:req.body.title,
        contents:req.body.contents,
        display:req.body.display,
        modify_id:1,
        modify_date:Date.now()
    }

    //step2 : DB 게시글 테이블에 특정 게시글 번호를 기준으로 게시글 정보를 수정처리합니다.
    //Update  article set title="수정한제목", contents="수정한내용", display=1, modify_id=1, modify_date=Date.now() WHERE article_id=1;

    //수정이 완료되면 DB서버에서 수정처리건수가 반환된다.

    //step3 : 수정처리된 게시글 목록 페이지로 이동하기
    res.redirect('/article/list');

});




module.exports = router;