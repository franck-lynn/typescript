// 什么是先行断言
// 这是一个子表达式
// (?= 子表达式)
// （零宽度正预测先行断言。）仅当子表达式在此位置的右侧匹配时才继续匹配。
// 例如，\w+(?=\d) 与后跟数字的单词匹配，而不与该数字匹配。
// \w+ 一个或者多个字母
// (?=) 后面必须跟着什么?
console.log("以字母开头并且以 ing 为结尾: ", /\w+(?=ing)/.test("muling"))

// 匹配 % 前的数字
console.log("90%".match(/\d+(?=%)/))
