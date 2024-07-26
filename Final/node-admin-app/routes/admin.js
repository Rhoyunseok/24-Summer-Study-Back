var express = require('express');
var router = express.Router();


/* 
- 관리자계정목록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: admin/list.ejs 뷰페이지 반환
*/
router.get('/list', async(req, res, next)=> {




    const admins = [
        {
            admin_no:1,
            admin_id:"admin1",
            admin_name:"관리자1",
            admin_email:"admin1@kkk",
            admin_company:"CBNU",
            admin_cp:"소프트웨어학과",
            admin_use:1,
            admin_regist_date:Date.now(),
            admin_description:"관리자1입니다."
        },
        {
            admin_no:2,
            admin_id:"admin2",
            admin_name:"관리자2",
            admin_email:"admin2@kkk",
            admin_company:"충북대",
            admin_cp:"전자정보대",
            admin_use:2,
            admin_regist_date:Date.now(),
            admin_description:"관리자2입니다."
        },
        {
            admin_no:3,
            admin_id:"admin3",
            admin_name:"관리자3",
            admin_email:"admin3@kkk",
            admin_company:"충북대학교",
            admin_cp:"미지정",
            admin_use:2,
            admin_regist_date:Date.now(),
            admin_description:"관리자3입니다."
        },

    ];



    // res.json(apiResult);
    res.render('admin/list.ejs', {admins:admins});
});





/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: admin/create.ejs 뷰페이지 반환
*/
router.get('/create', async(req, res, next)=> {
    res.render('admin/create.ejs');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: post
- 응답결과: 목록페이지 이동
*/
router.post('/create', async(req, res, next)=> {
    let apiResult = {
        code:200,
        data:null,
        result:""
    };
    try{
        const admin_id = req.body.admin_id;
        const admin_name = req.body.admin_name;
        const admin_email = req.body.admin_email;
        const admin_company = req.body.admin_company;
        const admin_cp = req.body.admin_cp;
        const admin_use = req.body.admin_use;
        // const admin_regist_date = req.body.admin_regist_date;
        const admin_description = req.body.admin_description;

        const admin = {
            admin_id:admin_id,
            admin_name:admin_name,
            admin_email:admin_email,
            admin_company:admin_company,
            admin_cp:admin_cp,
            admin_use:admin_use,
            // admin_regist_date:admin_regist_date,
            admin_description:admin_description
        };

        const dbAdmin = {
            admin_no:1,
            admin_id:admin_id,
            admin_name:admin_name,
            admin_email:admin_email,
            admin_company:admin_company,
            admin_cp:admin_cp,
            admin_use:admin_use,
            // admin_regist_date:admin_regist_date,
            admin_description:admin_description
        };
        apiResult.code = 200;
        apiResult.data = dbAdmin;
        apiResult.result = "ok";

    }catch{
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Server Error or 관리자에게 문의하세요.ㄹㅇㅋㅋ";
    }
    res.redirect('/admin/list');

});

router.get('/delete', async(req, res, next)=> {
    res.redirect('/admin/list');
});


router.post('/modify/', async(req, res, next)=> {
    const admin_no = req.body.admin_no;

    const admin = {
        
        admin_id:req.body.admin_id,
        admin_name:req.body.admin_name,
        admin_email:req.body.admin_email,
        admin_company:req.body.admin_company,
        admin_cp:req.body.admin_cp,
        admin_use:req.body.admin_use,
        admin_regist_date:Date.now(),
        admin_description:req.body.admin_description
    };
    res.redirect('/admin/list');
    
});

router.get('/modify/:no', async(req, res, next)=> {

    const admin_no = req.params.admin_no;

    const admin = {
        admin_no:1,
        admin_id:"admin1",
        admin_name:"관리자1",
        admin_email:"admin1@kkk",
        admin_company:"CBNU",
        admin_cp:"소프트웨어학과",
        admin_use:1,
        admin_regist_date:Date.now(),
        admin_description:"관리자1입니다."
    };

    res.render('admin/modify.ejs',{admin:admin});
});

module.exports = router;