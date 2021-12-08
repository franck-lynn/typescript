// https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html
// import fs from 'fs'
// 引入子进程模块
import cp from 'child_process'
// execFile 内部没有创建 shell.
// cp.execFile('node', ['--version'], (error, stdout) => {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// })
// 获取 node 版本号
// cp.execFile('D:/Program Files/nodejs/nodejs/node.exe', ['--version'], (err, stdout) => {
//     if (err) {
//         throw err;
//     }
//     console.log(stdout);
// })

// import util from  'util' 

// https://www.educba.com/node-js-child-process/
//! 用 node 执行  ./ts基础/NodeJS/子进程/index.js 这个文件
// 执行的路径是 文件夹根目录
const process2 = cp.exec(`node ./ts基础/NodeJS/子进程/shellCommand/index.js`, (err, stdout, /* stderr */ ) => {
    if (err) {
        console.log(err.stack);
        console.log('错误信息: ' + err.code);
        // console.log('错误信号: ' + err.signal);
    }
    console.log('输出: ' + stdout);
    // console.log('错误输出: ' + stderr);
})
// 

process2.on('on exit', code => {
    console.log('子进程退出. ' + code);
})