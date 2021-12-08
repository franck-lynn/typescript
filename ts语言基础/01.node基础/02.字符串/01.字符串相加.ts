
// 字符串相加
const add = (a:string, b:string): string => a + "|" + b
// console.log(add("c", "d"))


// 许多字符串相加
const addStrings = (...strs: string[]): string => {
    return strs.reduce(add)
}

// console.log(
//     addStrings('a', 'b', 'c', 'd')
// )


// 调用字符串相加
const callAddStrings = (...values: string[]): void => {
    const result = addStrings(...values)
    console.log(result)
}

callAddStrings('aa', 'bbb', 'ccc', 'ddd')
