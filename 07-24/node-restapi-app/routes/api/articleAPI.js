//articleAPI.js 라우터의 기본주소는 
//app.js에서 http://localhost:3000/api/articles 로 설정해줍니다. 

var express = require('express');
var router = express.Router();

/*
-전체 게시글 목록 데이터 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/list
-호출방식: Get
-응답결과: 게시글 JSON 데이터 목록
*/
//router.get('호출주소',콜백함수());
//async(req,res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.(콜백지옥을 회피하는방법)
router.get('/list',async(req,res)=>{

    let apiResult = {
        code:200,
        data:null,
        result:""
    };

    //DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정합니다.
    //가져온 데이터가 아래와 같아요..
    try{
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
            display:0,
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
    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = "ok";

    //서버응답결과물로 순수 json데이터를 반환한다.
    //res.json(json데이터);
    
}catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
}
res.json(apiResult);
});

/*
-단일 신규 게시글 정보 등록 요청과 응답처리 라우팅메소드
-호출주소 : http://localhost:3000/api/articles/create
-호출방식 : Post
-응답결과 : 등록처리 완료된 단일게시글 정보 반환(여기는 게시글 번호가있어요.)
*/
router.post('/create',async(req,res)=>{

    //API호출결과 표준 데이터 포맷 정의
    let apiResult = {
        code:200,
        data:null,
        result:""
    };

    //백엔드 예외처리하기
    try{
    //Step1: 클라이언트에서 보내준 사용자 입력 json데이터를 추출합니다.
    //req.body.클라이언트에서 보내준 단일 게시글 json객체의 속성명
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;
    
    

    //step2: 사용자 json 데이터를 DB 게시글 테이블에 저장합니다.
    //DB에 저장할 단일 게시글 json객체
    const article = {
        title:title,
        contents:contents,
        display:display,
        view_cnt:1,
        ip_address:"111.111.111",
        regist_id:1,
        regist_date:Date.now()
    }

    //DB 게시글 테이블에 상기 데이터를 저장한다.
    //저장하면 DB에 저장된 게시글 정보가 다시 반환됨(게시글 번호가 포함)
    //step3: DB에 저장반환된 등록된 게시글 신규 게시글정보가 반환됩니다.
    const dbArticle = {
        article_id:1,
        title:title,
        contents:contents,
        display:display,
        view_cnt:1, //여기 바꿈
        ip_address:"111.111.111.111",
        regist_id:1,
        regist_date:Date.now()
    }
    apiResult.code = 200;
    apiResult.data = dbArticle;
    apiResult.result = "ok";

    //step4: DB에 저장되고 반환된 단일게시글 정보를 클라이언트에 반환합니다.

    //HttpResponse객체의 json('json데이터')메소드로 서버에서 웹브라우저로 json 데이터를 반환합니다.
    

    }catch(err){
        //try{}블록스코프내에서 에러가 발생하면 catch(err){} 블록으로 에러내용이 전달됩니다.
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";

    }
    res.json(apiResult);

    
});

/*
-기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메소드
-호출주소 : http://localhost:3000/api/articles/?aid=1
-호출방식 : Get
-응답결과 : 단일 게시글 JSON정보 반환
*/
router.get('/',async(req,res)=>{
    //API호출결과 표준 데이터 포맷 정의
    let apiResult = {
        code:200, //처리결과 상태코드
        data:null, //반환할 데이터가 있으면 여기에 전달
        result:"" //서버에서 프론트로 특정 메시지를 보내줄때 여기에 전달
    };

    try{

        //step1 : api 주소에서 게시글번호를 추출한다.(쿼리스트링방식)
        //쿼리스트링방식으로 전달된 키값은 req.query.키값으로 추출가능
        const articleIdx = req.query.aid;
        
        

        //step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일게시글 정보를 조회한다
        //DB에서 조회해온 단일 게시글 정보라고 가정합니다.
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

        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "ok";

    }catch(err){

        console.log("실제 서버에러 확인하기",err.message);
        //백엔드에서 에러가 난사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log)파일에 기록하면
        //좀더 적극적으로 서버에러에 대해 대응이 가능하다.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
    }
    
    //step3 : 단일게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
    res.json(apiResult);
});




/*
-기존 단일 게시글 수정처리 요청과 응답 라우팅 메소드
-호출주소 : http://localhost:3000/api/articles/modify
-호출방식 : Post
-응답결과 : 수정결과 JSON 반환
*/
router.post('/modify',async(req,res)=>{

    let apiResult = {
        code:200,
        data:null,
        result:""
    };

    //백엔드 예외처리하기
    try{
    //Step1: 클라이언트에서 보내준 사용자 수정 json데이터를 추출합니다.
    //req.body.클라이언트에서 보내준 단일 게시글 json객체의 속성명
    const article_id = req.body.article_id; //수정할 게시글번호
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;
    
    

    //step2: 사용자 보내준 속성만 json 데이터를 DB 게시글 테이블에 수정합니다.
    //DB에 게시글 테이블에 수정한 json 단일 데이터 속성정의
    const article = {
        title:title,
        contents:contents,
        display:display,
        ip_address:"111.111.111",
        modify_id:1,
        modify_date:Date.now()
    }

    //DB 게시글 테이블에 상기 데이터를 저장한다.
    //수정하면 DB에 수정된 건수를 반환해준다.
    //step3: 수정된 건수를 data 값으로 지정해주고 프론트에 수정된 건수를 전달한다.
    const dbArticle = {
        article_id:1,
        title:title,
        contents:contents,
        display:display,
        view_cnt:1, //여기 바꿈
        ip_address:"111.111.111.111",
        regist_id:1,
        regist_date:Date.now()
    }
    apiResult.code = 200;
    apiResult.data = 1; //실제 db 서버에서 제공된 수정적용건수
    apiResult.result = "ok";

    //step4: DB에 저장되고 반환된 단일게시글 정보를 클라이언트에 반환합니다.

    //HttpResponse객체의 json('json데이터')메소드로 서버에서 웹브라우저로 json 데이터를 반환합니다.
    

    }catch(err){
        //try{}블록스코프내에서 에러가 발생하면 catch(err){} 블록으로 에러내용이 전달됩니다.
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";

    }
    res.json(apiResult);    
});

/*
-기존 단일 게시글 삭제처리 요청과 응답 라우팅 메소드 : get/URL방식
-호출주소 : http://localhost:3000/api/articles/modify/Delete?aid=1
-호출방식 : Get
-응답결과 : 수정결과 JSON 반환
*/
router.get('/delete',async(req,res)=>{
    
    let apiResult = {
        code:200,
        data:null,
        result:""
    };

    //백엔드 예외처리하기
    try{

        //step1 : url 에서 삭제하려는 게시글 번호를 조회한다.
        
        const articleIdx = req.query.aid;

        //step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일게시글 정보를 삭제한다

        //step3: DB 서버에서 특정 데이터가 삭제되면 삭제건수가 백엔드로 반환된다.
        const deletedCount = 1;

        apiResult.code = 200;
        apiResult.data = deletedCount;
        apiResult.result = "ok";

    }catch{
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
    };

    res.json(apiResult);
});

/*
-기존 단일 게시글 삭제처리 요청과 응답 라우팅 메소드 : POST/URL방식
-호출주소 : http://localhost:3000/api/articles/modify/delete
-호출방식 : Post
-응답결과 : 수정결과 JSON 반환
*/
router.post('/delete',async(req,res)=>{
    
    let apiResult = {
        code:200,
        data:null,
        result:""
    };

    //백엔드 예외처리하기
    try{

        //step1 : url 에서 삭제하려는 게시글 번호를 조회한다.
        
        const articleIdx = req.body.article_id;

        //step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일게시글 정보를 삭제한다

        //step3: DB 서버에서 특정 데이터가 삭제되면 삭제건수가 백엔드로 반환된다.
        const deletedCount = 1;

        apiResult.code = 200;
        apiResult.data = deletedCount;
        apiResult.result = "ok";

    }catch{
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
    };

    res.json(apiResult);
});

/*
-기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메소드
-호출주소 : http://localhost:3000/api/articles/1
-호출방식 : Get
-응답결과 : 단일 게시글 JSON정보 반환
*/
router.get('/:aid',async(req,res)=>{
    // /:aid 는 라우터 주소에서 변수(파라메타)처리방식이다. aka wildcard
    //API호출결과 표준 데이터 포맷 정의
    let apiResult = {
        code:200, //처리결과 상태코드
        data:null, //반환할 데이터가 있으면 여기에 전달
        result:"" //서버에서 프론트로 특정 메시지를 보내줄때 여기에 전달
    };

    try{

        //step1 : api 주소에서 게시글번호를 추출한다.(쿼리스트링방식)
        //파라미터방식으로 전달된 키값은 req.params.키값으로 추출가능
        const articleIdx = req.params.aid;
        
        

        //step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일게시글 정보를 조회한다
        //DB에서 조회해온 단일 게시글 정보라고 가정합니다.
        const article = {
            article_id:1,
            title:"게시글 제목1입니다.파라메터방식",
            contents:"게시글1 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        };

        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "ok";

    }catch(err){

        console.log("실제 서버에러 확인하기",err.message);
        //백엔드에서 에러가 난사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log)파일에 기록하면
        //좀더 적극적으로 서버에러에 대해 대응이 가능하다.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
    }
    
    //step3 : 단일게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
    res.json(apiResult);
});
/*와일드카드 :aid 이건 가장 밑에 배치해야한다 왜냐하면 ?aid=1 이게 있으면 와일드 카드 :aid 로 인식해서
delete 같은거 다 무시함
*/


module.exports = router;