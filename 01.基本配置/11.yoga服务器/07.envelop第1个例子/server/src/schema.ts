import { createSchema } from "graphql-yoga"

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
    user: (root: unknown, { id }: { id: string }) => users.find((u) => u.id === id),
  },
  Mutation: {
    promoteUser: () => true,
    deleteUser: () => true,
  },
}

export const schema = createSchema({ typeDefs, resolvers })
