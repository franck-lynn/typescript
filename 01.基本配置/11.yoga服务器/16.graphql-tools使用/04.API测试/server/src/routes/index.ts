import { Application } from "express"

import { helloRouter } from "./hello/helloRouter"

const routesArray = [helloRouter]

export const routes = (app: Application) => {
  routesArray.forEach((route) => {
    app.use(route)
  })
}
