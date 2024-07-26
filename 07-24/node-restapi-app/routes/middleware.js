//exports.함수명은 해당 모듈 파일에서 여러개의 재사용 가능한 함수의 기능을 바로 
//외부에서 사용할 수 있게 노출합니다.

//사용자 요청 URL을 분석해서
//파라메터 방식으로 값이 전달된 경우 특정 파라메타 값을 추출해서
//비지니스 로직을 적용 예외처리를 적용한다.

//http://localhost:3000/articles/1
//http://localhost:3000/api/articles/1
exports.checkParams = (req,res,next) => {
    if(req.params.id === undefined){
        console.log("id 파라메터 값이 전달되지 않았습니다.");
        // res.redirect('/');
    }else{
        console.log("id 파라메터 값은", req.params.id);
    }
    next();
}


//사용자 요청 URL을 분석해서
//쿼리스트링 방식으로 값이 전달된 경우 특정 파라메타 값을 추출해서
//비지니스 로직을 적용 예외처리를 적용한다.
exports.checkQuery = (req,res,next) => {
    if(req.query.category == undefined) {
        console.log("category 쿼리스트링 값이 전달되지 않았습니다.");
    }else{
        console.log("category 쿼리스트링 값은", req.query.category);
    }
    next();
}