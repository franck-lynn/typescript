// 获取执行时的环境变量
// 1. 在window系统中. package.json 中命令行设置并执行:
//! "exec:mode-window": "set MODE=development && ts-node    execute-env.ts"
// 可以获取环境变量
// 2. 跨平台的执行方式:
//! "exec:mode-platform": "cross-env MODE=delvelopment ts-node execute-env.ts"
// 需要安装 cross-env
const env = process.env.MODE 
console.log("执行时的环境变量", env)