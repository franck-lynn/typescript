import path from 'path'
import shell from 'shelljs'

// const version = shell.exec('node --version', { silent: true }).stdout
// console.log(version)


// shell.exec('powershell -Command ls ./ts基础/NodeJS',
//     // 用 powershell 执行 ls 这个命令, 默认是但当前工作路径, 
//     // 上面对默认的路径进行了修改
//     { silent: true }, // 不在控制台进行输出
//     (code, stdout, stderr) => {
//         console.log("退出码: ", code) // 进程退出了
//         console.log("流输出: ", stdout) // 采用流输出, 也可以流到其他地方
//         console.log("程序错误: ", stderr) // 错误流,没有 就打印空
//     }
// )
// 用 cd 进行修改工作路径
shell.cd("./ts基础/NodeJS/子进程/shellCommand")
// shell.exec('powershell -Command ls', // 由于上面的工作路径进行了修改, ls 后面就不用在带路径了
//     { silent: true }, (code, stdout, stderr) => {
//         console.log(stdout)
//         console.log(stderr)
//     }
// )
// 执行 bash 命令
// shell.exec('git help', // 由于上面的工作路径进行了修改, ls 后面就不用在带路径了
//     { silent: true }, (code, stdout, stderr) => {
//         console.log(stdout)
//         console.log(stderr)
//     }
// )


// process.stdout.setEncoding('utf8')
//默认执行的是 cmd 命令
// shell.exec('dir', // 由于上面的工作路径进行了修改, ls 后面就不用在带路径了
//     { silent: true, encoding: 'utf-8' }, (code, stdout, stderr) => {
//         console.log(stdout)
//         console.log(stderr)
//     }
// )

// 由于上面已经改变了 工作路径 为 shellCommand
console.log(
    shell.cat('exec.js')
)

// 对于exec()异步函数, 返回函数流的管道(3个参数, code, stdout, stderr,)
// const child = shell.exec('powershell -Command cat exec.js', { silent: true, async: true, encoding: 'utf8' })
// // console.log(child)
// // 触发流的事件
// child.stdout.on('data',  data => console.log(data))
// child.stderr.on('data', data => console.log(data))

// 操作目录文件
// 把文件设置成了只读属性
// shell.chmod('-R', 'a-w', 'exec.js')



// 切换目录
// shell.echo(process.cwd()) // f:\working\study\typescript\ts基础\NodeJS\子进程\shellCommand
// shell.pushd(path.resolve(__dirname))
// // shell.echo(process.cwd())
// shell.popd()


// const child = shell.exec('powershell -Command node -r esm exec.js', { silent: true, async: true, encoding: 'utf8' })
// // console.log(child)
// // 触发流的事件
// child.stdout.on('data',  data => console.log(data))
// child.stderr.on('data', data => console.log(data))

