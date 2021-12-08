
// process.argv 属性会返回一个数组， 
// 其中包含当 Node.js 进程被启动时传入的命令行参数. 
// 第一个元素是 process.execPath .
// 如果需要访问 argv[0] 的原始值， 
// 则参见 process.argv0  
// 第二个元素是正被执行的 JavaScript 文件的路径
// 其余的元素是任何额外的命令行参数。

// console.log(
//     process.argv
// )

// > node index.js
// > node index.js --param

/*
[
    'D:\\Program Files\\nodejs\\nodejs\\node.exe',
    'F:\\working\\study\\typescript\\ts基础\\NodeJS\\子进程\\index.js',
    '--param'
]
*/

// > node index.js --so for
/* 
执行结果: 
[
    'D:\\Program Files\\nodejs\\nodejs\\node.exe',
    'F:\\working\\study\\typescript\\ts基础\\NodeJS\\子进程\\index.js',
    '--so',
    'for'
] 
*/
/*
console.log() = process.stdout.write(msg + '\n')
*/


// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require('fs')
// fs.createReadStream(__filename).pipe(process.stdout)

// setTimeout(() => {
//     process.stdout.write('Hooray bears')
// }, 1000)

// let count = 0
// setInterval(() => {
//     count++
//     console.log(count)
//     if(count > 10){
//         process.exit()
//     }
// }, 100)

console.log("The Child Process is " + process.argv[1] + " getting implemented")

