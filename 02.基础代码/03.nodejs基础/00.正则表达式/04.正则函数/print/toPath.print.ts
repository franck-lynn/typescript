import { isRegRootFile } from './../src/toPath';
const pathStr1 = "F:/working/src/components/xyz/about.vue"
// console.log(
//     // 先行断言, 后面是 文件名.后缀名, 可以获取路径名, 去掉了文件名
//     (/.+(?=\/\w+\.\w+)/).exec(pathStr1)
// )
// console.log(
//     // 先行断言, 后面是 文件名.后缀名
//     /.+(\/\w+)(?=\/\w+\.\w+)/.exec(pathStr1)
// )
// const result1 = pathStr1.match(/.+(?<parent>\/\w+)(?=\/\w+\.\w+)/)
// const result2 = pathStr1.match(/.+\/(?<parent>\w+)(?=\/\w+\.\w+)/)

const pathStr2 = "./xyz/about.vue"
// 正则解读:
// 任意0-n个字符开始, 有1个 / 后面任意字母, 在后面要跟着 xxx.yyy 等形式
// const result3 = pathStr2.match(/.*[\\\\\/](?<parent>\w+)(?=[\\\\\/]\w+\.\w+)/)
// console.log(
//     // 先行断言, 后面是 文件名.后缀名
//     result3?.groups?.parent
// )

// 匹配 url 请求参数
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /^https{0,1}:\/\/\w+:{0,1}\d*(\/\w+)/ 
//     )
// )

// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /^https?:\/\/\w+:?\d*(\/\w+)/ 
//     )
// )
// console.log(
//     "https://localhost/src/components/index.ts?t=1642303636090".match(
//         /^https?:\/\/\w+:?\d*(\/\w+)/ 
//     )
// )
//! 必须是 http 或者 https,
//! 然后 ://
//! 有{0, 1} 个 www.
//! 中间任意字母
//! 接着 .任意字母, 如 .com
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /^https?:\/\/(www.)?\w+(\.\w*)?:?\d*(\/\w+)/ 
//     )
// )
//! 忽略分组
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /^https?:\/\/(?:www.)?\w+(?:\.\w*)?:?\d*(\/\w+)/ 
//     )
// )
// 正向后行断言
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /(?<=^https?:\/\/(www.)?\w+(\.\w*)?:?\d*)((\/\w+)+)/ 
//     )
// )
//! 进一步改造忽略分组. 需要的地方命名为分组
//! 正则解读:
//! (?<=^https?:\/\/(?:www.)?\w+(?:\.\w*)?:?\d*)
//! 正向后行断言, 意思就是 http 或者 https 开头
//! 接着 ://, 接着 有 www. 就匹配, 没有就忽略 (?:www.)?
//! \w+ 任意字符
//! (?:\.\w*)? 有 .com 这些吗? 有就匹配, 没有就忽略
//! (?::\d*)?) 有 :8080  吗? 有就匹配, 没有就忽略
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /(?<=^https?:\/\/(?:www.)?\w+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/\w+)+)/ 
//     )
// )


//! 增加正向后行断言, 去掉 index.ts
// console.log(
//     "http://localhost:8080/src/components/index.ts?t=1642303636090".match(
//         /(?<=^https?:\/\/(?:www.)?\w+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/\w+)+)(?=\/[\w\d]+\.[\w\d]+)/ 
//     )
// )
// console.log(
//     "http://localhost:8080/src/01.components123/index.ts?t=1642303636090".match(
//         /(?<=^https?:\/\/(?:www.)?[\w\d]+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/[\w\d\.]+)+)(?=\/[\w\d]+\.[\w\d]+)/ 
//     )
// )
// const result3 = "http://localhost:8080/src/01.components123/index.ts?t=1642303636090".match(
//     /(?<=^https?:\/\/(?:www.)?[\w\d]+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/[\w\d\.]+)+)(?=\/[\w\d]+\.[\w\d]+)/)

// console.log(result3?.groups?.folder)
// 以 result3 的结果作为 正则的一部分, 去匹配 import.meta.globEager 读取到的字符串, 
// 如果结尾部分都能匹配到的话, 就说明是 regRoot, 函数命名为 isRegRoot

// 判断是不是 正则根路径
const url = "http://localhost:8080/src/components/index.ts?t=1642303636090"
const filepath = "F:/working/study/typescript/typescript/ts基础应用/01.vue使用/02, vite使用/07.vite导航/01.导航基础/01.读取注册/src/components/about.vue"
const folder = "/src/components"
// 匹配 /src/components/xxx.yyy 这一部分的正则
// console.log(
//     filepath.match(/\/src\/components\/[\w\d]+\.[\w\d]+/)
// )
const newReg = new RegExp(folder + "\/[\\w\\d]+\.[\\w\\d]+$")
//          
console.log("正则表达式---> ", newReg)
console.log("匹配到的结果---> ", filepath.match(newReg))
console.log("匹配到的结果---> ", filepath.match(newReg)![0])
console.log("正则测试的结果是不是正则根目录下的文件", newReg.test(filepath))
console.log(
    isRegRootFile(url, filepath)
)