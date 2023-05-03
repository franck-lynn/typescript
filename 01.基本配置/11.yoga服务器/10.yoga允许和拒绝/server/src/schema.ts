import { createSchema} from "graphql-yoga"
import { useOperationFieldPermissions } from "@envelop/operation-field-permissions"
// https://www.youtube.com/watch?v=nYGE0HDE7JA
// https://www.youtube.com/watch?v=8iyQ-4joxuE
export type User = {
  id: string
  name: string
  permissions?: string[]
}
export const users: User[] = [
  { id: "1", name: "Jamie", permissions: ["Query.user", "User.id"] },
  { id: "2", name: "Laurin", permissions: ["Query.user", "User.*"] },
  { id: "3", name: "Uri", permissions: ["Query.*", "Mutation.promoteUser", "Mutation.deleteUser"] },
]
// 扩展架构定义
const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    permissions: [String]
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
    user: (root: unknown, { id }: { id: string }) => users.find((u) => u.id === id),
  },
  Mutation: {
    promoteUser: () => true,
    deleteUser: () => true,
  },
}

export const context = async ({ request }: any) => {
  const userId = request.headers.get("authorization") ?? null
  console.log("请求头中设置userId---> ", userId)
  const user = users.find((user) => user.id === userId)
  console.log("数据中查找user---> ", user)
  return { user }
}
export const plugins = [
  useOperationFieldPermissions({
    getPermissions: (context: any) => new Set(context?.user?.permissions),
  }),
]

export const schema = createSchema({ typeDefs, resolvers })
