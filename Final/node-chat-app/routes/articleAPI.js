var express = require("express");
var router = express.Router();

var db = require("../models/index");

/*
- 전체 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출주소: http://localhost:5000/api/article/list
- 호출방식: Get
- 응답결과: 전체 게시글 목록 조회 결과
*/
router.get("/list", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const articles = await db.Article.findAll();

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
- 단일 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출주소: http://localhost:5000/api/article/1
- 호출방식: Get
- 응답결과: 단일 게시글 데이터
*/
router.get("/:id", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const articleIdx = req.params.id;
    const article = await db.Article.findOne({
      where: { article_id: articleIdx },
    });
    apiResult.code = 200;
    apiResult.data = article;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error....";
  }
  res.json(apiResult);
});
module.exports = router;
