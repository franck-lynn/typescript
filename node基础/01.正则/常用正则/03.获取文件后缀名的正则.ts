
// const reg =  /.+?\\(?=\w+)|\.\w+$|\\$/

// .+ .除了 \n 换行符外任意字符, + 1个或者多个
// \. 就是点号
// (\w+)  匹配圆括号里的内容并获取这里面的匹配
const reg =  /.+\.(\w+)$/ 
console.log(
    // 获取后缀
    '.a.aa.aa'.match(reg), 
    "\n", 
    reg.exec('.a.aa.aa')
)

// .+? 1 或 n 个任意字符, 禁止回溯
//  /.+\/(.+)$/ 

const reg1 = /.+\/(.+)$/ 
console.log(
    // 获取文件名带后缀
    "F:/working/study/typescript/typescript/node基础/01.正则/常用正则/03.获取文件后缀名的正则.ts".match(reg1)
)
const reg2 = /.+\/(.+)\.\w+$/ 
console.log(
    // 获取文件名不带后缀
    "F:/working/study/typescript/typescript/node基础/01.正则/常用正则/03.获取文件后缀名的正则.ts".match(reg2)
)

// 正则获取倒数第2个
const reg3 = /.+\/(.+)\/.+\.\w+$/
console.log(
    // 正则获取倒数第2个 文件名
    "F:/working/study/typescript/typescript/node基础/01.正则/常用正则/03.获取文件后缀名的正则.ts".match(reg3)
)
export {}