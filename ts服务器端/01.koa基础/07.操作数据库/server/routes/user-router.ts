import Koa from "koa"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Router from "@koa/router"

import { User } from "../models"
import { SECRET, BASEURL } from "../contstants"

const userRouter = new Router()
//! 出现  ctx: 类型“Request”上不存在属性“body”  这样的错误的解决办法是: npm i @types/koa-bodyparser --save-dev
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
    // TODO: 如果没有注册过, 对密码明文进行加密加盐
    const pwd = await bcrypt.hash(password, 12)
    const user  = new User({ name, email, password: pwd, status: "pending" })
    // 保存到数据库
    ctx.body = await user.save()

    // mongodb 设置自动删除过期数据
    // https://www.cnblogs.com/jiangqw/p/12174746.html
    // 在数据库中查找 user, 得到 id
    // let theUser = await User.findOne({ email })
    // if(!theUser){
    //     const userId = theUser!._id!
    //     const idToken = jwt.sign({ id: userId }, SECRET, { expiresIn: "15m" })
    // }

    // // 将加盐的 hash 再签发为一个 token, 并设置过期时间
    // const idToken = jwt.sign({ id: userId }, SECRET, { expiresIn: "15m" })
    // console.log(`${BASEURL}`)
    // const html = `${BASEURL}/verify-account/${idToken}` // 拼接一个 url

    // console.log("发送邮件的内容--->  ", html)

    // setTimeout(async () => {
    //     // 约定时间后删除本条数据库
    //     theUser = await User.findOne({ email })
    //     if (theUser.status !== "actived") {
    //         console.log("约定时间后执行!!!", name, email)
    //         const result = await User.deleteOne({ name })
    //         console.log("是不是已经删除", result)
    //     }
    // }, 1000 * 60 * 1)
})

export { userRouter }
