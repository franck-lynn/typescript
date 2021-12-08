

process.argv.forEach((val, index) => {
    console.log(index + ". : " + val)
})
// node 主进程.js one two=three four
/*
// 运行结果: 
0:D:\Program Files\nodejs\nodejs\node.exe  // 电脑上安装的 node 路径
1:F:\working\study\typescript\ts基础\NodeJS\进程\主进程.js  // 是执行文件的绝对路径
2:one
3:two=three
4:four
*/

// 切换路径
//! 默认当前工作路径是 : F:\working\study\typescript
// F:/working/study/typescript/ts基础/NodeJS/fs
// 切换到目标路径: 
// console.log(
//     process.chdir('./ts基础/NodeJS/fs')
// )
console.log(
    "3. : ", 
    process.cwd() // nodejs 进程所在的工作目录
)

console.log(
    "4. : ",
    process.pid   // 进程 id
)
console.log(
    "5. : ",
    process.platform   // 系统平台标识符
)

