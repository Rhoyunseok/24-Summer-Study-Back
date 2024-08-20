var express = require("express");
var router = express.Router();

//OpenAI API 호출을 위한 axios 모듈 참조하기
const axios = require("axios");

//파일처리를 위한 filesystem 내장객체 참조하기
const fs = require("fs");

//OpenAI 객체 생성하기
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
-OpenAI Dalle.3 API를 호출하여 프론트엔드에서 제공한 프롬프트 기반 이미지 생성 API
-호출주소: http://localhost:5000/openai/dalle
-호출방식: POST
-응답결과: 생성된 이미지 JSON 데이터 반환
*/
//비동기 콜백함수 async로 선언
router.post("/dalle", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //step1. 프론트엔드에서 전달된 사용자 프롬프트 정보 추출하기
    const model = req.body.model;
    const prompt = req.body.prompt;

    //step2. OpenAI Dalle API 호출하기
    const response = await openai.images.generate({
      model: model, //이미지 처리 모델 선택 : dall-e-2 or dall-e-3
      prompt: prompt, //사용자 프롬프트
      n: 1, //이미지 생성갯수 (dalle2는 최대 10개, dalle3는 1개)
      size: "1024x1024", //dalle2: 256x256,512*512,1024*1024, dalle3: 1024*1024, 1792*1024, 1024*1792
      style: "vivid", //기본값 : vivid, natural(dalle3): 더 자연스럽고 초현실적인 이미지 생성
      response_format: "url", //url: openai 사이트에 생성된 이미지 풀주소 경로 반환, b64_json : 바이너리 데이터 형식으로
    });

    //step3. Dalle API 호출결과에서 물리적 이미지 생성하기
    //url 방식으로 이미지 생성값을 반환받는 경우는 최대 1시간 이후에 openai이미지 서버에서 해당 이미지 서버에서 해당 이미지 삭제됨
    //해당 이미지가 영구적으로 필요하면 반환단url 주소를 이용해 이미지를 백엔드에 생성하면 됩니다.
    const imageURL = response.data[0].url;
    console.log("dall 이미지 생성 URL경로 : ", imageURL);

    //step4. 생성된 이미지 정보를 프론트엔드로 전달하기
    //step5. DB 게시글 테이블에 사용자 이미지 생성요청 정보 등록처리하기
    //step6. 최종 생성된 이미지 정보를 프론트엔드로 반환하기
    apiResult.code = 200;
    apiResult.data = imageURL;
    apiResult.msg = "ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "failed";
  }

  //최종 처리결과값을 프론트엔드로 반환합니다.
  res.json(apiResult);
});

module.exports = router;
