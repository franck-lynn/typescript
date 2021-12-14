
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

export {createUser,findUser, deleteAllUser}