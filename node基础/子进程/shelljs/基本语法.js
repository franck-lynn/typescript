import path from 'path'
import shell from 'shelljs'
//检查控制台是否以运行`git `开头的命令
if (!shell.which('git')) {
    shell.echo("脚本需要 git")
    shell.exit(1)
}
// console.log(
//     shell.ls('./ts基础/NodeJS/子进程')
// )
// console.log(
//     // 列出当前执行文件的上级文件列表
//     shell.ls(path.resolve(__dirname))
// )
// shell.ls(path.resolve(__dirname)).forEach(file => {
//         console.log(file)
//     }
// )

// console.log(
//     shell.which('cmd')
// )

// shell.echo("向控制台输出指定内容")


// shell.rm('-r', './ts基础/NodeJS/子进程/shelljs/temp.txt')

// 拷贝文件, 当前文件夹上级目录下的 shellCommand, 也就是兄弟目录的内容
// 拷贝到当前目录
// shell.cp('-R', path.resolve(__dirname, '..', 'shellCommand'), path.resolve(__dirname, 'temp'))

// console.log(
//     "当前目录---> ", 
//     shell.cd('./ts基础/NodeJS/子进程'),
//     shell.ls()
// )

// 替换
shell.sed(
    '-i', // 直接作用语源文件 -
    'hello',  // 正则表达式, 符合这个正则的字符串
    'world', // 要替换的内容
    path.resolve(__dirname, 'source.txt') // 文件
)
// 读取文件
// console.log(
//     shell.cat(path.resolve(__dirname, '基本语法.js'))
// )

// console.log(
//     "查看当前目录", 
//     shell.pwd()
// )


// 写入文件
// console.log(
//     shell.echo("aaaa").to(path.resolve(__dirname, 'source.txt'))
// )
// shell.echo(process.cwd())

// 下面这2个是一样的
// console.log(process.env.path)
// console.log(
//     shell.env['path']
// )

// 把字符串写入 source.txt 文件
// shell.ShellString('shell的字符串').to(path.resolve(__dirname, 'source.txt'))

// 执行命令
// shell.exec('powershell -Command get-help', {encoding: 'utf8'},  (code, stdout, stderr) => {
//     console.log("退出码", code)
//     console.log("程序输出", stdout)
//     console.log("程序错误", stderr)
// })

// https://blog.csdn.net/sinat_25017107/article/details/90235902
// console.log(
//     shell.sed(
//         // '-i',
//         'dog',
//         'cat',
//         path.resolve(__dirname, 'source.txt')
//     )
// )

// 切换目录当前工作目录到 fs
// 当前工作目录: f:\working\study\typescript
// ts基础 "ts基础/NodeJS/子进程/shellCommand" 或者 "./ts基础/NodeJS/子进程/shellCommand"
// 两种切换路径的写法都可以, 相对于当前工作目录 f:\working\study\typescript
shell.cd("./ts基础/NodeJS/子进程/shellCommand")
// 上面路径切换了, 下面查询 shellCommand 目录下所有 js 文件
console.log(
    shell.ls('*.js')
)
// 切换到上面改变工作目录后的上一层
// 返回值
shell.cd("..")

console.log(
    shell.ls()
)