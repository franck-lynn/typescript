import { createSchema, YogaInitialContext } from "graphql-yoga"
import type { Plugin, AfterParseEventPayload, TypedExecutionArgs } from "@envelop/core"
// https://www.youtube.com/watch?v=nYGE0HDE7JA
// https://www.youtube.com/watch?v=8iyQ-4joxuE
export type User = {
  id: string
  name: string
  permissions?: string[]
}
export const users: User[] = [
  { id: "1", name: "Jamie" },
  { id: "2", name: "Laurin" },
  { id: "3", name: "Uri" },
]
// 扩展架构定义
const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
  }
  type Query {
    user(id: ID!): User!
  }
  type Mutation {
    promoteUser(id: ID!): Boolean!
    deleteUser(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    user: (root: unknown, { id }: { id: string }, context: YogaInitialContext) => {
      console.log("查询过程中的上下文---> ", context.request.headers)
      return users.find((u) => u.id === id)
    },
  },
  Mutation: {
    promoteUser: () => true,
    deleteUser: () => true,
  },
}

// 插件开发
// https://the-guild.dev/graphql/envelop/docs/plugins/typescript
// Plugin<{ myContext: string }> 返回的数据
export const useMyPlugin = (): Plugin<{ myContext: string }> => {
  return {
    onParse: ({ context }) => {
      // Here, context is typed as { myContext: string }
      console.log("01. 解析参数开始--> ", (context as { myContext: string }).myContext)
      return ({ result }: { result: AfterParseEventPayload<{ myContext: string }> }) => {
        console.log("02. 参数解析完成", { result })
      }
    },
    // TypedExecutionArgs<{}>
    onExecute: ({ args }: { args: TypedExecutionArgs<{ myContext: string }> }) => {
      // Here, args.contextValue is typed as { myContext: string }
      console.log("03. Execution started!", args.contextValue)
      return {
        onExecuteDone({ result }) {
          console.log("04.Execution done!", { result })
        },
      }
    },
  }
}

export const schema = createSchema({ typeDefs, resolvers })
