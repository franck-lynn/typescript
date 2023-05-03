"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const _1 = require("./");
// import { PATH_CWD } from "../../contstants"
// const PATH = path.join(PATH_CWD, "src/routes")
const PATH = path_1.default.join(__dirname, "../../routes");
// PATH_CWD = f:\working\study\alchemilla\server
// ;(async () => {
//   const filesList = await readFilesName(path.join(PATH_CWD, "./src/gql/resolvers"))
//   console.log(filesList)
// })()
// 后行断言, 不是以.resolver.ts 结尾的
// const pattern = /^.*(?<!\.resolver\.ts|js)$/
// 后行断言, 是以.resolver.ts 结尾的
const pattern = /^.*(?<=\.resolver\.ts|js)$/;
console.log("不是以 .resolver.ts 结尾的? 这个是的, 所以为 false", pattern.test("index.resolver.ts"));
console.log("不是以 .resolver.ts 结尾的? 这个不是的, 所以为 true", pattern.test("indexresolver.ts"));
console.log("不是以 .resolver.ts 结尾的? 这个不是的, 所以为 true", pattern.test("index.ts"));
// const resolversArray = await loader(path.join(PATH_CWD, "./src/gql/resolvers"), pattern)
// console.log(resolversArray)
// 检测下路由的导入
// const routesArray = await loader(path.join(PATH_CWD, "./src/routes"))
// console.log(routesArray)
const routes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const objectRouters = yield (0, _1.loader)(PATH);
    objectRouters.forEach((routerFile) => __awaiter(void 0, void 0, void 0, function* () {
        if (!routerFile)
            return;
        console.log(Reflect.getPrototypeOf(routerFile) === express_1.Router);
        if (Reflect.getPrototypeOf(routerFile) === express_1.Router) {
            app.use(routerFile);
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
    }));
});
const app = (0, express_1.default)();
routes(app);
