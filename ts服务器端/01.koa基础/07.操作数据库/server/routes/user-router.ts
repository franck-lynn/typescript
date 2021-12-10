import Koa from "koa"
import bcrypt from 'bcryptjs'
import Router  from "@koa/router"


import { User } from "../models"

const userRouter = new Router()
//! 出现  ctx: 类型“Request”上不存在属性“body”  这样的错误的解决办法是: npm i @types/koa-bodyparser
//! 也可以将路由 controller 部分拆分开来
//! 这里不拆分
userRouter.post("/register", async (ctx: Router.RouterContext, next: Koa.Next) => {
    // 注册的时候, 客户端要传过来用户信息, 通过 ctx.request.body
    const { name, email, password } = ctx.request.body
    const hasEmail = await User.findOne({ email })
    if (hasEmail) {
        // 要用return, 否则继续往下走
        return (ctx.body = { msg: "已经注册过了" })
    }
     // 用户状态 status, 创建时间, 修改时间, 
    // 如果没有注册过, 对密码明文进行加密加盐
    const pwd = await bcrypt.hash(password, 12)
    const user = new User({ name, email, password: pwd, status: "pending" })

    const result = await User.create(user)
    console.log(`${result}`)

    ctx.body = `${result}`
})

export { userRouter }
