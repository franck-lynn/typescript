import { orStrs } from './common'

// 不以指定字符串结尾的
// 也可以是 正则的模式作为第2个参数, 这样, 例如 "a|b", 这样的参数形式
export const isNotEndWith = (str: string, ...patterns: string[]): boolean => {
    // 正则 /^.*(?<!\.ts|js)$/
    // 解读: 以任意除换行符外的所有字符开头, 0个或者多个
    // 且后面不能是 \.ts|js 结尾的 字符串
    const regExp = new RegExp("^.*(?<!" + orStrs(...patterns) + ")$")
    // console.log(regExp)
    return regExp.test(str)
}
