// import { compare } from "bcryptjs"
import bcryptjs from "bcryptjs"
import { VerifiedCallback, VerifyCallback } from "passport-jwt"
import { VerifyFunction, IVerifyOptions } from "passport-local"

import { ResMsg } from "../../locale"
import type { IUser } from "../helper"

// https://www.qycn.com/xzx/article/7134.html
// 这是由于 bcryptjs 导出是 commonjs 写的, 不适应 esm,
// 需要这样转一下
const compare = bcryptjs.compare

// 以数组假设数据库
const users: IUser[] = [
  { _id: "1", name: "林芮应", email: "lry_demry@163.com", password: "123456" },
  { _id: "2", name: "任盈盈", email: "ryy@163.com", password: "123456" },
  { _id: "3", name: "周芷若", email: "zzr@163.com", password: "123456" },
]
const getUserByEmail = async (email: string) => users.find((item) => item.email === email)

// 本文件定义的验证函数是给策略构造函数使用的.
//! 当 restful 登录时, 就会调用, 而验证时不会调用这个函数
// 本地策略验证函数, 登录时调用  passport.authenticate 会先进入这个函数
export const authenticateEmail: VerifyFunction = async (
  email: string,
  password: string,
  done: (error: unknown, user?: IUser | boolean, options?: IVerifyOptions) => void
) => {
  try {
    const user: IUser | undefined = await getUserByEmail(email)
    if (!user) {
      return done(null, false, { message: ResMsg.NO_EMAIL })
    }
    const isPassed = user?.password ? await compare(password, user.password) : null
    // const isPassed = password === user.password
    if (isPassed) {
      return done(null, user)
    } else {
      return done(null, false, { message: ResMsg.PASSWORD_ERROR })
    }
  } catch (err) {
    done(err)
  }
}

// jwt 策略验证函数
// 访问受保护的路由时要检查 token, 就需要用到这个函数
export const verifyJwt: VerifyCallback = async (
  jwt_payload: string, // jwt_payload 一般为用户的 id
  done: VerifiedCallback
) => {
  // 得到 user 的 id, 是否需要在数据里再查找一下呢?
  // 应该是不需要的, 因为 token 不好伪造
  // 由于解码的是用户 id, 所以这里取出来的只是用户 id
  if (jwt_payload) {
    // 解析出签名的用户 id
    return done(null, jwt_payload)
  } else {
    return done(null, false)
  }
}
