// https://segmentfault.com/a/1190000019266662
// (?!pattern) 负向先行断言
// 代表字符串中的一个位置，紧接该位置之后的字符序列不能匹配 pattern

console.log(
    /^.*(?<!\.ts|js)$/.test("index.s")
)