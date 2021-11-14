
// 有且仅有一个 /
const reg = /^[^/]*\/[^/]*$/
console.log(
    reg.test('/packages/button')
)
console.log(
    reg.test('./packages')
)



