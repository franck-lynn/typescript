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
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}

// 动态导入模块, 并将这些模块放在一个数组里面
const loader = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = readFilesName(dir, ignore, list, deep)
    // console.log(files)
    return files.map(async (filename: string) => {
        // console.log(filename)
        // 如果不是 ts 或者 js 文件就返回
        if (/^.*(?<!\.ts|js)$/.test(filename)) return
        // console.log(filename)
        // const rs = await import("./index")
        // 返回 Promise 数组
        return await import(filename)
    })
}

// 默认忽略掉 index.ts 文件
const routes = (app: Koa<Koa.DefaultState, Koa.DefaultContext>, ignore: string[] = ["index.ts"]) => {
    const objectRouters = loader(__dirname, ignore)
    objectRouters.forEach((routerPromise: Promise<Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>>) => {
        routerPromise.then((routerObj: Record<string, Router<Koa.DefaultState, Koa.DefaultContext>>) => {
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
    })
}
export default routes
