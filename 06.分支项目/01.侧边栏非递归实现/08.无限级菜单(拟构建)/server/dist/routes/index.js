"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
// import { loader } from "../utils/load-files"
// import { PATH_CWD } from "../contstants"
// const PATH = path.join(PATH_CWD, "src/routes")
// const PATH = path.join(__dirname, "../routes")
const helloRouter_1 = require("./hello/helloRouter");
const routesArray = [helloRouter_1.helloRouter];
const routes = (app) => {
    routesArray.forEach((route) => {
        app.use(route);
    });
};
exports.routes = routes;
/*
  export const routes = async (app: Application) => {
    const objectRouters = await loader(PATH)

    objectRouters.forEach(async (routerFile) => {
      if (!routerFile) return
      if (Reflect.getPrototypeOf(routerFile) === Router) {
        app.use(routerFile)
      }
    })
  }
 */
