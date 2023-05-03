// import { compare, genSalt, hash } from "bcryptjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const { compare, genSalt, hash } = bcrypt
import { UsersModule } from "./generated"
import { HttpStatus, SECRET, SALT } from "../../contstants"
import { ResMsg } from "../../locale"
import { User, IUser } from "../../db"

export const userResolver: UsersModule.Resolvers = {
  Query: <UsersModule.QueryResolvers>{
    allUsers: async () => {
      return User.find()
    },
    user: async (root, { _id }) => {
      return User.findById(_id)
    },
  },

  Mutation: <UsersModule.MutationResolvers>{
    // 涉及到数据库操作可以增加许多限制, 例如: 增加次数限制, 是不是恶意注册, 是否开放注册等
    // 下面是最基本的逻辑
    login: async (root, { loginInput }) => {
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
    register: async (root, { registerInput }) => {
      try {
        const { name, email, password } = registerInput
        const hasUser = await User.findOne({ email })
        if (hasUser) {
          // 如果有用户, 返回暂时重定向码 307
          return { status: HttpStatus.TEMPORARY_REDIRECT, msg: ResMsg.HAD_REGISTERED }
        } else {
          // 说明没有这个用户邮箱, 可以进行注册
          const salt = await genSalt(SALT)
          // 加密密码
          const pwd = await hash(password, salt)
          // 组装 registerInput 载荷
          const payload: Partial<IUser> = {
            name,
            email,
            password: pwd,
          }
          const prePayload: Partial<IUser> = {
            status: "pending",
            meta: {
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }
          const user = await User.create(Object.assign(payload, prePayload))
          if (user) {
            return { status: HttpStatus.CREATED, msg: ResMsg.REGISTER_SUCCESS }
          }
        }
      } catch (error) {
        return { status: HttpStatus.FORBIDDEN, msg: ResMsg.OTHER_SERVER_ERROR + error }
      }
    },
  },
}
