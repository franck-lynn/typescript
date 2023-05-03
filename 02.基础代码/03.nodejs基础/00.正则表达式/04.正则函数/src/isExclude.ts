import { orStrs } from "./common"

// 不包含某些字符串的函数
// 第1个参数是待检测的字符串, 后面的参数是不包含的字符串.
// 也可以是 正则的模式作为第2个参数, 这样, 例如 "a|b", 这样的参数形式
export const isExclude = (str: string, ...patterns: string[]): boolean => {
    // 正则: /\bindex|main(?:\.[\w\d]+)?$/
    // 解读: 完全匹配指定的字符串
    const regExp = new RegExp("\\b" + orStrs(...patterns) + "(?:\\.[\\w\\d]+)?$")
    // const matcher = str.match(regExp)
    return str.match(regExp)? false: true
}
