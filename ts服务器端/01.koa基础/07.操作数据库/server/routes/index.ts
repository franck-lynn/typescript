import Koa from "koa"
import Router from "@koa/router"
// import fs from "fs"
import fsPromise from "fs/promises"
import path from "path"

/**
* Created by franck.lynn on 2021-12-09.
* lry_demry@163.com 
* filename:  index 
* 异步读取路由
*/


//! 异步读取文件名称
const readFilesName = async(dir: string, ignore?: string[] | null, list: string[] = [], deep = 0)  => {
    const files = await fsPromise.readdir(dir)
    for (let i = 0; i < files.length; i++) {
        const stat = await fsPromise.stat(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            //! 这里也是异步, 要用到 await
            await readFilesName(dir + path.sep + files[i], ignore, list, deep + 1)
        }else{
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
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

export { routes }
