
// 有且仅有一个反斜杠 /
const reg = /^[^/]*\/[^/]*$/
console.log(
    reg.test('/packages/button')
)
console.log(
    reg.test('./packages')
)
export {}


