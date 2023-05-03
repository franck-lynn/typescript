import http from "http"
import path from "path"
import express /* , { Request, Response, NextFunction }  */ from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { routes } from "../routes"
import { initializePassport } from "../passport"

import { PATH_CWD } from "../contstants"
import { initDb } from "./initDb"

const app: express.Application = express()
const httpServer = http.createServer(app)

app.use(cors<cors.CorsRequest>()) // 跨域请求

// body parser, 解析请求体, 要在路由注册之前调用
// 内置的也可以, 都要在路由之前注册 解析中间件
app.use(bodyParser.json())
// 解析 form-url 请求
app.use(express.urlencoded({ extended: false }))
// 解析 form-data 请求

// 初始化 passport
initializePassport(app)
initDb()

// 注册路由
routes(app)

// 直接把 /images 设置成了根目录了, 直接请求文件就可以了
// http://localhost:3000/img1.jpg
// 处理静态文件, 静态文件夹一般放是项目文件根目录下的 public
app.use("/static", express.static(path.join(PATH_CWD, "./src/images")))

export default app
export { httpServer }
