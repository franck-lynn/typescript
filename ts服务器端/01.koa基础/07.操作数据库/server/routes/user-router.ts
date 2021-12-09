import Koa from "koa"
import Router, { RouterContext } from '@koa/router'

const userRouter = new Router()
//! 也可以将路由 controller 部分拆分开来
//! 这里不拆分
userRouter.post('/register', async(ctx: RouterContext, next: Koa.Next) => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})

export { userRouter }
