
//base1 모듈을 참조해서 odd, even, test 함수를 가져온다.

//base1.js export module의 노출객체를 객체 비구조화할당방식으로 변수 odd, even, test에 할당한다.
const {odd, even, test} = require('./base1');

// const {odd, even, test} = {
//     odd:odd,
//     even:even,
//     test:function(){
//     }
// } //이거랑 같은 의미이다

//숫자가 홀수인지 짝수인지 판별하는 함수
function checkOddOrEven(num) {
    if(num % 2) {
        //나머지 값이 1이면 홀수이다. 1은 true로 판별된다.
        //즉 true 이므로 odd가 반환된다.
        return odd;
    }
    //나머지 값이 0이면 짝수이다. 0은 false로 판별된다.
    return even;
}

console.log("base2.js에서 사용하는 base1.js 모듈의 test함수 호출 : ", test()); //test()가 undefined를 반환한다. 왜냐하면 base1.js에서는 test함수를 module.exports로 노출시키지 않았기 때문이다.

module.exports = checkOddOrEven; //checkOddOrEven 함수를 외부로 노출시킨다.