// 这个文件是给 scripts/build.sh.js 用的
// scripts/build.sh.js 调用这个文件一次, 目的和 build.components.js
// 一样的, 也是生成 组件打包文件
//  执行方式 右键执行 或者 node 执行
import path from 'path'
import { noPrefixFile } from './common'
import { PROJECT_NAME } from './constants'
import { run } from './build'
// 从调用本文件的脚本 build.sh.js 文件中获得 命令行参数
// 实际上是 packages 目录下的 基本组件 文件夹
const compPath = process.argv[2]
// console.log("传入的命令行参数", compPath)

if (!compPath) {
    console.error('Usage: node build.js [component], 调用者 build.sh 没有传入命令行参数')
    process.exit(1)
}
// file=====>  packages/button
// file=====>  packages/input
// 如果是不需要前缀的文件夹, 就直接返回, 否则加上前缀
// 凑成与 build.components 相同的输入参数, 这里是命令行参数
const outPutPrefix = noPrefixFile.test(compPath) ? '' : PROJECT_NAME // 组件目录
const compName = compPath.split('/').pop() // 获取组件名

// 调用 build.js 的 run() 函数
// run(`${outPutPrefix}${path.sep}${compName}`, compPath)
run(`${outPutPrefix}${path.sep}${compName}`)