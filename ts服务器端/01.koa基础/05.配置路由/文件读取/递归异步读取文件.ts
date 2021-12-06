import Koa from "koa"
import Router from "@koa/router"
// import fs from "fs"
import { readdir, stat } from "fs/promises"
import path from "path"

/* 
const readdir = (dir: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        return fs.readdir(dir, "utf-8", (error, data) => {
            if (error) return reject(error)
            resolve(data)
        })
    })
}
const readStat = (dir: string): Promise<fs.Stats> => {
    return new Promise((resolve, reject) => {
        return fs.stat(dir, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}
*/
const readFilesName = async (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 读取文件目录
    const files = await readdir(dir)
    for (let i = 0; i < files.length; i++) {
        const state = await stat(dir + path.sep + files[i])
        if (state.isDirectory()) {
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
// console.log(readFilesName(__dirname, null, ["index.ts"]))
// readFilesName(__dirname, ["index.ts"]).then((v) => console.log(v))
// 动态导入模块, 并将这些模块放在一个数组里面
const loader = async (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = await readFilesName(dir, ignore, list, deep)
    return files.map((filename) => {
        // 如果不是ts 文件就返回
        // if(/(?!.ts$)/.test()) return
        // console.log(filename)
        return import(filename)
    })
}

// loader(__dirname, ["index.ts"])

// 自动加载 routes 文件夹下的路由文件
const routes = async (/* app: Koa<Koa.DefaultState, Koa.DefaultContext> */) => {
    const routers = await loader(__dirname, ["index.ts"])
    return routers
    // routers.forEach((router: Router<Koa.DefaultState, Koa.DefaultContext>) => {
    //     app.use(router.routes())
    //     app.use(router.allowedMethods())
    // })
}

routes().then(v => console.log(v))