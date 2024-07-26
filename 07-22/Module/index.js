const {odd,even} =require('./base1');
const checkOddOrEven = require('./base2');


//문자열을 던지면 문자열이 길이가 짝수이면 짝수입니다란 문자열을 반환
//홀수이면 홀수입니다란 문자열을 반환하는 함수
function checkStringOddOrEven(str) {
    if(str.length % 2) {
        //문자열 길이를 2로 나눈 나머지 값이 1(true)이면 홀수이다.
        return odd;
    }
    else {
    //문자열 길이를 2로 나눈 나머지 값이 0(false)이면 짝수이다.
        return even;
    }
}

console.log("숫자에 대한 홀짝수체크하기 : ", checkOddOrEven(10));
console.log("숫자에 대한 홀짝수체크하기 : ", checkOddOrEven(5));

console.log("문자열에 대한 홀짝수체크하기 : ", checkStringOddOrEven("안녕"));
console.log("문자열에 대한 홀짝수체크하기 : ", checkStringOddOrEven("안녕하세요"));