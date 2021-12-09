import Koa from "koa"
import { routes } from "../routes"
import bodyParser from 'koa-body'
import { connectMongoDB } from '../service'

const app = new Koa()
//! 连接数据库
connectMongoDB()

//! bodyparser() 解析请求体, 要在路由注册之前调用
app.use(bodyParser())
routes(app)

export default app
