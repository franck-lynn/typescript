// spawn 执行的必须是一个实际存在的可执行文件

import cp from 'child_process'
// console.log("win 系统--> ", process.platform )
// console.log("node 的安装路径", process.execPath)
// console.log("文件根路径", process.cwd())
// console.log("运行的文件路径--> ", process.argv[1])

// 是 node 执行的这个程序, 第1个参数告诉 spawn node 路径
// 第2个参数是要执行的文件
const dir = cp.spawn(process.execPath, [`${__dirname}/index.js`])
dir.stdout.pipe(process.stdout)
dir.stderr.pipe(process.stderr)
dir.on('close', (code) => {
    console.log('进程' + code + '结束')
})