import path from 'path'
import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()


router.get('/posts', async (ctx, next) => {
    next()
    // 返回给客户端的信息
    ctx.body = {
        msg: "服务器端返回的信息"
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

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})