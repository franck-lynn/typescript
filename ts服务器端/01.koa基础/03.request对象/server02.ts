import path from "path"
import Koa from "koa"
import Router from "@koa/router"
import bodyParser from "koa-body"
// 处理静态文件, 静态文件夹一般放是项目文件根目录下的 public
import koaStatic from "koa-static"

// // 连接 mongodb 数据库
// import mongoose from 'mongoose'
// //url 带上复制集
// const url = 'mongodb://localhost:27017/test?replicaSet=my_repl'
// mongoose.connect(url, {useUnifiedTopology: true}, () => console.log('数据库连接成功!'))
// // 错误信息, 绑定错误信息处理, 以便定位错误,
// mongoose.connection.on('error', console.error.bind(console, 'mongoDB连接异常'))

const app = new Koa()
const router = new Router()

// body parser 要在路由注册之前调用
app.use(bodyParser())

// 日志
router.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get("X-Response-Time")
    console.log(`访问方法---> ${ctx.method}, 访问地址--->  ${ctx.url} , 响应时间 ---> ${rt}`)
})
// 在这里设置响应时间
router.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
})

router.all("/", async (ctx) => {
    // 获取请求信息
    // console.log('请求 url =  ', ctx.url)
    // console.log('请求行参数 query = ', ctx.request.query)
    // console.log("用户ip地址: ", ctx.req.socket.remoteAddress)
    // console.log('web应用的虚拟目录路径:',  ctx.request.path)

    // 获取请求头信息
    // console.log("请求头里的host: ", ctx.request.get('host'))
    // console.log("请求头里的host: ", ctx.request.get('Host'))
    // console.log('web应用的虚拟目录路径:',  ctx.request.path)
    // console.log("请求参数", ctx.params)
    // console.log("获取所有请求头对象", ctx.header)
    // console.log("请求上下文", ctx.req)
    ctx.body = "hello koa2"
})

const routers = [router]
// 批量注册路由函数
const routes = (app: Koa) => {
    routers.forEach((router) => {
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}
// 批量注册路由
routes(app)

// 在这个目录下的文件都可以通过服务器对外提供服务, 前端项目也会使用这个html文件, 是做为浏览器的入口文件
app.use(
    koaStatic(path.join(__dirname, "../public"), {
        // https://www.npmjs.com/package/koa-static
        // 配置一些选项 index: '默认起始文件.html'
        index: "index.html",
    })
)

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})
