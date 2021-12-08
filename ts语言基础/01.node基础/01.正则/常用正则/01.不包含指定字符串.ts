// https://cloud.tencent.com/developer/ask/106814
// https://blog.csdn.net/thefirstwind/article/details/5881696

// const reg = /(?:(?!hello).)*/
// /.*(root|world)/ 0个或多个字符且包含 root 或者 world
// /(?!.*(root|world))/ 不包含 0个或多个字符且包含 root 或者 world


const unionStr = (a:string, b:string): string => a + "|" + b
const unionStrs = (...strs: string[]): string => strs.reduce(unionStr)

const isNotInclude = (str: string, ...pattern: string[]): boolean=> {
    const regExp = new RegExp("^(?!(.*" + unionStrs(...pattern) +"))")
    return regExp.test(str)
}


console.log(
    "确实没包含, 返回true --> ", 
    isNotInclude( "hello roo", "root", "world",), 
    ", 后面包含了, 应返回false --> ", 
    isNotInclude( "hello root", "root", "world",), 
    ", 中间包含了 --> ", 
    isNotInclude( "hello rootw", 'root", "world',), 
)
// console.log("***********************************************************************")
console.log(
    "确实没包含 --> ", 
    /^(?!.*(root|world))/.test("hello roo"), 
    ", 后面包含了 --> ", 
    /^(?!.*(root|world))/.test("hello root"), 
    ", 中间包含了 --> ", 
    /^(?!.*(root|world))/.test("hellorootw"), 
)
// 要加^
const reg2 =/^(?!.*(root|world))/ 
console.log(
    "后面包含了, 应该返回false --> ", 
    reg2.test('hello world') 
)