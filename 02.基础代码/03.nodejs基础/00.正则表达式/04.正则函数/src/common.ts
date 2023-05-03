// 把 参数形式 (a, b) 转换成 a | b 的形式
const orStr = (a: string, b: string): string => a + "|" + b
// 把多个参数 变成 a|b|c的形式, 之所以这样, 是因为正则的要求
// 如果只有一个参数, reduce 会直接返回
export const orStrs = (...strs: string[]): string => strs.reduce(orStr)