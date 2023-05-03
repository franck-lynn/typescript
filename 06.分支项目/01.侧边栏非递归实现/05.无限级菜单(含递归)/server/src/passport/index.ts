import { Application, Request, Response, NextFunction } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy } from "passport-jwt"

import { loacalStrategyOptions, jwtStrategyOptions } from "./config"
import { authenticateEmail, verifyJwt } from "./strategy"

import { SECRET } from "../contstants"
import type { IUser } from "./helper"

import { ResMsg } from "../locale"

// 初始化 passport
export const initializePassport = (app: Application) => {
  app.use(passport.initialize())
  passport.use(new LocalStrategy(loacalStrategyOptions, authenticateEmail))
  passport.use(new JwtStrategy(jwtStrategyOptions, verifyJwt))
}
// 授权, 签发 token
export const loginAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("local", async (err: unknown, user: IUser) => {
    // 用户登录时, 先走的时 authenticateEmail, 只有 authenticateEmail 都通过了,
    // 才执行这里的流程
    if (user && user.email && SECRET) {
      // 签发 token
      const token = jwt.sign({ id: String(user._id) }, SECRET)
      res.send({ status: 200, token, msg: ResMsg.LOGIN_SUCCESS })
      return next()
    } else {
      res.send({ msg: ResMsg.PASSWORD_ERROR })
    }
  })(req, res, next)
}
// 访问受保护的路由时要先检查下是否有授权
export const checkAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("jwt", async (err: unknown, user: Partial<IUser> /* , info */) => {
    // 这里的函数参数就是 verifyJwt 函数里的 done() 函数参数
    // 当访问受保护的路由时, 请求头必须要带上 token,
    if (user) {
      // 说明通过了,进行后续的操作
      return next()
    } else {
      res.send({ msg: ResMsg.NO_AUTHN })
    }
  })(req, res, next)
}
