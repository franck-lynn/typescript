"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = exports.SALT = exports.MONGODB_URI = exports.EMAIL_PASSWORD = exports.EMAIL = exports.SECRET = exports.PORT = exports.HOST_NAME = void 0;
const HttpStatus_1 = require("./HttpStatus");
Object.defineProperty(exports, "HttpStatus", { enumerable: true, get: function () { return HttpStatus_1.HttpStatus; } });
/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  index.ts
 * 一些环境变量的处理
 */
// 获取环境配置中的变量
// import path from "path"
const dotenv_1 = __importDefault(require("dotenv"));
// 加载 `.env` 文件中的所有变量到环境变量中
dotenv_1.default.config();
// ! 这里的路径是以 package.json 文件的路径开始计算的
// dotenv.config({ path: "../../服务端程序/01.图片服务器/.env" })
// let PATH_CWD = process.cwd()
// if (PATH_CWD.includes("server")) {
//   // 表示在 server 下启动, 向上一级查找, 在项目的根目录下.env 文件
//   dotenv.config({ path: "../.env" })
// } else {
//   dotenv.config({ path: ".env" })
//   PATH_CWD = path.join(PATH_CWD, "server")
// }
// console.log("环境变量---->", PATH_CWD)
_a = process.env, exports.HOST_NAME = _a.HOST_NAME, exports.PORT = _a.PORT, exports.SECRET = _a.SECRET, exports.EMAIL = _a.EMAIL, exports.EMAIL_PASSWORD = _a.EMAIL_PASSWORD;
// export { PATH_CWD }
// 求出相对于 package.json 文件所在地址的方法
// console.log(path.relative(process.cwd(), "F:/working/study/alchemilla/.env"))
exports.MONGODB_URI = "mongodb://localhost:27017/test?replicaSet=my_repl";
exports.SALT = 10; // 注册密码加盐强度
