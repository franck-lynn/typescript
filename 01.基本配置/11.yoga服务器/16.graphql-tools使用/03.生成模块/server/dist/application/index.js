"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
const passport_1 = require("../passport");
// import { PATH_CWD } from "../contstants"
const initDb_1 = require("./initDb");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
app.use((0, cors_1.default)()); // 跨域请求
// body parser, 解析请求体, 要在路由注册之前调用
// 内置的也可以, 都要在路由之前注册 解析中间件
app.use(body_parser_1.default.json());
// 解析 form-url 请求
app.use(express_1.default.urlencoded({ extended: false }));
// 解析 form-data 请求
// 初始化 passport
(0, passport_1.initializePassport)(app);
(0, initDb_1.initDb)();
// 注册路由
(0, routes_1.routes)(app);
// 直接把 /images 设置成了根目录了, 直接请求文件就可以了
// http://localhost:3000/img1.jpg
// 处理静态文件, 静态文件夹一般放是项目文件根目录下的 public
// app.use("/static", express.static(path.join(PATH_CWD, "./src/images")))
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../images")));
exports.default = app;
