import Koa from "koa"
import Router from '@koa/router'

const userRouter = new Router()
// https://juejin.cn/post/6994242530233548837
//! 出现  ctx: 类型“Request”上不存在属性“body”  这样的错误的解决办法是: npm i @types/koa-bodyparser
//! 也可以将路由 controller 部分拆分开来
//! 这里不拆分
userRouter.post('/register', async(ctx: Koa.Context, next: Koa.Next) => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})

export { userRouter }
