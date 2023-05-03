import express, { Application, Router } from "express"

import path from "path"
import { /*  readFilesName, */ loader } from "./"
import { PATH_CWD } from "../../contstants"

const PATH = path.join(PATH_CWD, "src/routes")
// PATH_CWD = f:\working\study\alchemilla\server
// ;(async () => {
//   const filesList = await readFilesName(path.join(PATH_CWD, "./src/gql/resolvers"))
//   console.log(filesList)
// })()

// 后行断言, 不是以.resolver.ts 结尾的
// const pattern = /^.*(?<!\.resolver\.ts|js)$/
// 后行断言, 是以.resolver.ts 结尾的
const pattern = /^.*(?<=\.resolver\.ts|js)$/
console.log("不是以 .resolver.ts 结尾的? 这个是的, 所以为 false", pattern.test("index.resolver.ts"))
console.log("不是以 .resolver.ts 结尾的? 这个不是的, 所以为 true", pattern.test("indexresolver.ts"))
console.log("不是以 .resolver.ts 结尾的? 这个不是的, 所以为 true", pattern.test("index.ts"))

// const resolversArray = await loader(path.join(PATH_CWD, "./src/gql/resolvers"), pattern)
// console.log(resolversArray)

// 检测下路由的导入
// const routesArray = await loader(path.join(PATH_CWD, "./src/routes"))
// console.log(routesArray)
const routes = async (app: Application) => {
  const objectRouters = await loader(PATH)

  objectRouters.forEach(async (routerFile) => {
    if (!routerFile) return

    console.log(Reflect.getPrototypeOf(routerFile) === Router)
    if (Reflect.getPrototypeOf(routerFile) === Router) {
      app.use(routerFile)
    }
    // routerFile.then((routerObj: Record<string, Router>) => {
    //   let router: Router
    //   // routerObj 是一个导入到这里的路由对象
    //   const imports = Object.keys(routerObj)
    //   for (let i = 0; i < imports.length; i++) {
    //     // 如果是 default 就取 default, 如果是 导出命名的接口, 就用这个接口的名字
    //     // imports[i] 可以获取到接口的名字
    //     router = routerObj[imports[i]]
    //     // ! 这里要加一个判断, 判断导入的是不是 路由 对象 Router,
    //     // ? 没有用到的导入应该是丢弃掉了?
    // if (Reflect.getPrototypeOf(router) === Router) {
    //   app.use(router)
    // }
    //   }
    // })
  })
}
const app = express()
routes(app)
