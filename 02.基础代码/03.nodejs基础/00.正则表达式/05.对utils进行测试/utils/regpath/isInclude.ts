import { orStrs } from "./common"
export const isInclude = (str: string, patterns: string[]): boolean => {
    // 加了一个 / 表示仅仅包含 index 文件
    const regExp = new RegExp("\/\\b" + orStrs(...patterns) + "(?:\\.[\\w\\d]+)?$")
    return str.match(regExp) ? true : false
}