// https://www.youtube.com/watch?v=vyz47fUXcxU&t=1225s

import path from 'path'
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-body'
// 处理静态文件, 静态文件夹一般放是项目文件根目录下的 public
import koaStatic from 'koa-static'
import logging from './config/logging'
import config from './config/config'


const NAME_SPACE = 'server'
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
// app.use(bodyParser());

//? 解析请求
router.use(bodyParser())

// logging the request
router.use((ctx, next) => {
    console.log("1. 每次都先经过这里, 获取访问的信息----> ")
    logging.info(NAME_SPACE, `访问方法 METHOD - [${ctx.method}], URL - [${ctx.url}], IP - [${ctx.req.socket.remoteAddress}]`)
    ctx.req.on('finish', () => {
        logging.info(NAME_SPACE, `METHOD - [${ctx.method}], URL - [${ctx.url}], IP - [${ctx.req.socket.remoteAddress}], STATUS - [${ctx.status}]`)
    })
    next()
})

// roles of our API
router.use((ctx, next) => {
    console.log("2. 再在这里设施请求头")
    ctx.request.header = {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
    if(ctx.method === 'OPTIONS'){
        ctx.request.header = {
            'access-control-request-method': 'GET PATCH DELETE POST PUT'
        }
        return ctx.response.status = 200
    }
    next()
})


router.all('/hello', async (ctx) => {
    console.log("3, 上面2步走完后, 再进行路由的访问处理")
    ctx.body = "Hello "
})

// 错误处理
router.use((ctx) => {
    const error = new Error('not found')
    console.log("4. 错误时走这里吗? ")
    return ctx.response.headers = {
        status: 404,
        message: error.message
    }
})


const routers = [router]

// 批量注册路由函数
const routes = (app: Koa) => {
    routers.forEach(router => {
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}


// 批量注册路由
routes(app)

// 在这个目录下的文件都可以通过服务器对外提供服务, 前端项目也会使用这个html文件, 是做为浏览器的入口文件
app.use(koaStatic(path.join(__dirname, '../public'), {
    // https://www.npmjs.com/package/koa-static
    // 配置一些选项 index: '默认起始文件.html'
    index: 'index.html'
}))

app.listen(config.server.port, () => {
    logging.info(NAME_SPACE, `Server is running at http://${config.server.hostname}:${config.server.port}`)
})