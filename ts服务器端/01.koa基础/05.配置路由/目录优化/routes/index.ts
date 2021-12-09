import Koa from "koa"
import Router from "@koa/router"
import fs from "fs"
import fsPromise from "fs/promises"
import path from "path"

/**
* Created by franck.lynn on 2021-12-09.
* lry_demry@163.com 
* filename:  index 
* 同步或者异步读取路由(两种模式)
*/




const readFilesNameSync = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 读取第1层文件或文件夹路径, 得到的是一个路径数组
    const files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        // 所以, 遍历读取到的路径数组, 判读是文件名还是文件目录?
        // 读取的路径信息
        const stat = fs.statSync(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            // 如果是文件路径, 递归读取
            readFilesNameSync(dir + path.sep + files[i], ignore, list, deep + 1)
        } else {
            // 如果是文件名, 就走这里
            // 忽略掉第1层的要忽略的文件, 如不需要这个功能, 去掉 deep 即可
            // 是第1层级, 就是只有第1层级的文件名可以忽略掉, deep = 0 转化为 false
            // 并且要忽略的数组存在, 数组的长度 > 0, 并且 忽略的这个文件名在指定忽略数组里面进行忽略
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}

//! 异步读取文件名称
const readFilesName = async(dir: string, ignore?: string[] | null, list: string[] = [], deep = 0)  => {
    const files = await fsPromise.readdir(dir)
    for (let i = 0; i < files.length; i++) {
        const stat = await fsPromise.stat(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            await readFilesName(dir + path.sep + files[i], ignore, list, deep + 1)
        }else{
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}

/* 
    // 动态导入模块, 并将这些模块放在一个数组里面
    const loaderSync = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
        // 获取文件名
        const files = readFilesNameSync(dir, ignore, list, deep)
        // console.log(files)
        return files.map(async (filename: string) => {
            // 如果不是 ts 或者 js 文件就返回
            // 返回 Promise 数组
            return await import(filename)
        })
    }
 */
//! 返回 Promise 数组改为同步模式似乎合理一些, routerPromise 有可能为 undefined
//! 即使是异步, import() 返回的也是一个 Promise 对象
// 动态导入模块, 并将这些模块放在一个数组里面
const loaderSync = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = readFilesNameSync(dir, ignore, list, deep)
    // console.log(files)
    return files.map((filename: string) => {
        // console.log(filename)
        // 如果不是 ts 或者 js 文件就返回
        if (/^.*(?<!\.ts|js)$/.test(filename)) return
        return import(filename)
    })
}

//! 异步动态导入模块, 并将这些模块放在一个数组里面
const loader = async(dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = await readFilesName(dir, ignore, list, deep)
    return files.map((filename: string) => {
        // console.log(filename)
        // 如果不是 ts 或者 js 文件就返回
        if (/^.*(?<!\.ts|js)$/.test(filename)) return
        return import(filename)
    })
}

console.log("返回的是Promise---> ", loader(__dirname))

// 默认忽略掉 index.ts 文件
const routesSync = (app: Koa<Koa.DefaultState, Koa.DefaultContext>, ignore: string[] = ["index.ts"]) => {
    const objectRouters = loaderSync(__dirname, ignore)
    objectRouters.forEach(
        (routerPromise: Promise<Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>> | undefined) => {
            routerPromise!.then((routerObj: Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>) => {
                let router: Router<Koa.DefaultState, Koa.DefaultContext>
                // routerObj 是一个导入到这里的路由对象
                const imports = Object.keys(routerObj)
                for (let i = 0; i < imports.length; i++) {
                    // 如果是 default 就取 default, 如果是 导出命名的接口, 就用这个接口的名字
                    // imports[i] 可以获取到接口的名字
                    router = routerObj[imports[i]]
                    app.use(router.routes())
                    app.use(router.allowedMethods())
                }
            })
        }
    )
}

const routes = async (app: Koa<Koa.DefaultState, Koa.DefaultContext>, ignore: string[] = ["index.ts"]) => {
    const objectRouters = await loader(__dirname, ignore)
    objectRouters.forEach(
        (routerPromise: Promise<Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>> | undefined) => {
            routerPromise!.then((routerObj: Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>) => {
                let router: Router<Koa.DefaultState, Koa.DefaultContext>
                // routerObj 是一个导入到这里的路由对象
                const imports = Object.keys(routerObj)
                for (let i = 0; i < imports.length; i++) {
                    // 如果是 default 就取 default, 如果是 导出命名的接口, 就用这个接口的名字
                    // imports[i] 可以获取到接口的名字
                    router = routerObj[imports[i]]
                    app.use(router.routes())
                    app.use(router.allowedMethods())
                }
            })
        }
    )
}

export { routesSync, routes }
