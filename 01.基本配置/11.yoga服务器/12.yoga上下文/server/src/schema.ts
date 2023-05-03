import { createSchema, YogaInitialContext } from "graphql-yoga"
import { Resolvers } from "./types"

//!  上下文的类型
type DefaultContext = Record<string | symbol | number, unknown>
type UserType = { someNumber: number }
export type Context = DefaultContext | UserType | YogaInitialContext

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      # 默认上下文
      logHeader: String
      # 扩展初始上下文
      someNumber: Int!
    }
  `,
  resolvers: <Resolvers>{
    Query: {
      logHeader(root: unknown, _args, context: YogaInitialContext) {
        // 默认上下文
        console.log(context.request.headers.get("x-foo"))
        return context.request.headers.get("x-foo")
      },
      someNumber: (parent, args, context: UserType) => {
        return context.someNumber
      },
    },
  },
})
