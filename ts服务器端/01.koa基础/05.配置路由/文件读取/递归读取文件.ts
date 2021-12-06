import Koa from "koa"
import Router from "@koa/router"
import fs from "fs"
import path from "path"


const readFilesName = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 读取文件目录
    const files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        const stat = fs.statSync(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            readFilesName(dir + path.sep + files[i], ignore, list, deep + 1)
        } else {
            // 忽略掉第1层的要忽略的文件, 如不需要这个功能, 去掉 deep 即可
            // 数组, 字符串忽略都可以
            // 是第1层级, 就是只有第1层级的文件名可以忽略掉, deep = 0 转化为 false
            // 并且要忽略的数组存在, 数组的长度 > 0, 并且 忽略的这个文件名在这里面
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) {
                continue
            }
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}
// 动态导入模块, 并将这些模块放在一个数组里面
const loader =  (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files =  readFilesName(dir, ignore, list, deep)
    
    return files.map((filename) => {
        console.log(filename)
        // 如果不是ts 文件就返回
        // if(/(?!.ts$)/.test()) return
        // console.log(filename)
        // const rs = require(filename)
        // return rs[Object.keys(rs)[0]]
    })
}
loader(__dirname, ["index.ts"])


// const routes = (/* app: Koa<Koa.DefaultState, Koa.DefaultContext> */) => {
//     const routers =  loader(__dirname, ["index.ts"])
//     console.log(routers)
//     // routers.forEach(router => {
//     //     console.log(router)
//     // })
    
// }
// routes()

