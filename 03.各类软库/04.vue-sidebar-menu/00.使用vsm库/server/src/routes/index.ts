import path from "path"
import { Application, Router } from "express"
import { loader } from "../utils/load-files"

import { PATH_CWD } from "../contstants"
const PATH = path.join(PATH_CWD, "src/routes")

export const routes = async (app: Application) => {
  const objectRouters = await loader(PATH)

  objectRouters.forEach(async (routerFile) => {
    if (!routerFile) return
    if (Reflect.getPrototypeOf(routerFile) === Router) {
      app.use(routerFile)
    }
  })
}
