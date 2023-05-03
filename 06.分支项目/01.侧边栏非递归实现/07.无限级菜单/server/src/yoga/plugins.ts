import jwt from "jsonwebtoken"
import { Request } from "express"
// 授权插件使用了 @envelop/generic-auth 这个插件
// https://the-guild.dev/graphql/envelop/plugins/use-generic-auth
import { parse, validate, specifiedRules, execute, subscribe } from "graphql"
import { useEngine, DefaultContext } from "@envelop/core"
import { useGenericAuth, ResolveUserFn, ValidateUserFn } from "@envelop/generic-auth"
import { SECRET } from "../contstants"
import { User } from "../db"
// import { GraphQLResolveInfo } from "graphql"

// 去掉 graphql-shield 授权
// import { useGraphQLMiddleware } from "@envelop/graphql-middleware"
// import { permissions } from "../authz"

type UserType = {
  id?: string
}
// type ContextType = DefaultContext
interface ContextType extends DefaultContext {
  id?: string
}

const resolveUserFn: ResolveUserFn<UserType> = async (context: ContextType) => {
  // 1. 先走这里
  try {
    const authorization = (context.req as Request).headers.authorization || ""
    const raw = authorization?.split(" ").pop()
    // console.log("前端传过来的全局变量 ====> ", context.req)
    if (!raw) return { message: "没有授权" }
    if (!SECRET) return { messgae: "服务器错误" }
    const { id } = jwt.verify(raw, SECRET) as { id: string; iat: number }

    // if (id) return { id } // 作为 currentUser 保存在上下文中
    const user = await User.findById(id)
    console.log("是否找到user?  ", user)
    if (user) {
      context.currentUser = user
      return { id }
    } else {
      return { messgae: "其他未知错误" }
    }
  } catch (e) {
    return { message: "Failed to validate token, 口令错误" }
  }
}

const validateUser: ValidateUserFn<UserType> = (params: ContextType) => {
  // 2. 再走这里
  // Here you can implement any custom to check if the user is valid and have access to the server.
  // 这里可以实现自定义的 user 检查
  // This method is being triggered in different flows,
  // based on the mode you chose to implement.
  // 根据不同模式下的实现, 触发不同的流程
  // If you are using the `protect-auth-directive` mode,
  // you'll also get 2 additional parameters: the resolver
  // parameters as object and the DirectiveNode of the auth directive.
  // In `protect-auth-directive` mode, this function will always
  // get called and you can use these parameters to check if the
  // field has the `@auth` or `@skipAuth` directive
  const user = params.user as { id: string; iat: number }
  console.log("第2步: user传递到这里 ======> ")
  if (!user) {
    throw new Error(`没有授权, Unauthenticated!`)
  }
}

// 导出给 express restful 路由使用

// 导出插件给 yoga 使用
export const plugins = [
  useEngine({ parse, validate, specifiedRules, execute, subscribe }),
  // 去掉 graphql-shield 授权
  // useGraphQLMiddleware([permissions]),
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: "protect-granular",
  }),
]
