import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const { compare } = bcrypt

// import { MutationResolvers, UserResolvers } from "../../types"

import { HttpStatus, SECRET } from "../../contstants"
import { ResMsg } from "../../locale"

import { User } from "../../db"

export const userResolver = {
  Mutation: {
    login: async (root: any, loginInput: any) => {
      console.log(root)
      try {
        const { email, password } = loginInput
        // 先判断下 邮箱和密码是否满足规范要求, 再考虑是否进行服务器查询
        const hasUser = await User.findOne({ email })
        if (!hasUser) {
          // 返回 404 状态码, 未找到
          return { status: HttpStatus.NOT_FOUND, msg: ResMsg.NO_USER }
        }
        // 比较用户传入的密码和数据库中的密码比较, 看看是不是相同
        const isPassed = await compare(password, hasUser.password)
        if (!isPassed) {
          return { status: HttpStatus.NOT_FOUND, msg: ResMsg.PASSWORD_ERROR }
        }
        // 如果密码检查通过, 且有加密字符串, 就签发 token 口令
        if (isPassed && SECRET) {
          // 签发 token 给客户端
          const token = jwt.sign({ id: String(hasUser._id) }, SECRET)
          return { status: HttpStatus.OK, msg: ResMsg.LOGIN_SUCCESS, token }
        }
      } catch (error) {
        return { status: HttpStatus.FORBIDDEN, msg: ResMsg.OTHER_SERVER_ERROR + error }
      }
    },
  },
}
