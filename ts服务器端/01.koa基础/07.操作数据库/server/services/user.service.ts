import Koa from "koa"
import Router from "@koa/router"
import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import  { User, IUser, UserDocument } from "../models/user.model"


//! 出现  ctx: 类型“Request”上不存在属性“body”  这样的错误的解决办法是: npm i @types/koa-bodyparser --save-dev

// 生成一个用户
const createUser = async (input: AnyObject | AnyKeys<IUser>) => {
    return User.create(input)
}
// 查找用户
const findUser = (query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) => {
    return User.findOne(query, null, options)
}
// 删除所有的用户
const deleteAllUser = () => {
    return User.deleteMany({})
}


// 用户登录
const loginUser = async ({ email, password }: { email: UserDocument["email"]; password: UserDocument["password"] }) => {
    const user = await findUser({ email }, { lean: false })
    if (!user) throw new Error("用户不存在")
    return user.comparePassword(password)
}

const registerUser = async (ctx: Router.RouterContext, next: Koa.Next) => {
    // 客户端要传过来用户信息, 通过 ctx.request.body获取
    const { name, email, password } = ctx.request.body
    const hasEmail = await findUser({email})
    if(hasEmail){
        ctx.body = { msg: "已经注册过了" }
    }else{
        ctx.body = await createUser({name, email, password})
    }
    return ctx.body
}
export {createUser,findUser, deleteAllUser, loginUser, registerUser}




