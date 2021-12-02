import Koa from 'koa'
import dotenv from 'dotenv'

const app = new Koa()

// 获取环境配置中的变量
dotenv.config({path: '../.env' })
const {HOST_NAME, PORT } = process.env

import Router from '@koa/router'
const router = new Router()

const indexRouter = router.get('/', async(ctx, next) => {
    ctx.body = "主页路由"
})
const userTouter = router.get('/user', async(ctx, next) => {
    ctx.body = "用户路由"
})

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(PORT, () => {
    console.log(`Server is running at ${HOST_NAME}:${PORT}`)
})


// 运行
// 直接 右键运行
// 或者 在 package 所在目录
// nodemon -r esm app.ts
// ts-node app.ts
// 或者  npm run dev