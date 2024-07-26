
const odd = "홀수입니다.";
const even = "짝수입니다.";

function test() {
    console.log("base1모듈에서 실행되는 test 함수입니다.");
    return "Test Complete";
}


// **module.exports**를 통해 객체형태로 odd, even, test 함수를 외부로 노출해줘야 다른 모듈에서 사용이 가능하다
module.exports = {
    //자바스크립트 객체의 속성명과 속성에 할당되는 변수(상수)명이 같으면 변수/상수명을 생략가능하다.
    odd, //odd:odd,
    even:even,
    test:test
}


