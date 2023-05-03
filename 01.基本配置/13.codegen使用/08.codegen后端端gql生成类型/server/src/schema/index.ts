import { Resolvers, QueryResolvers } from "../types"
import { createSchema } from "graphql-yoga"
// https://www.youtube.com/watch?v=34XUUJpyj9A&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=2
const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
  }
  type Query {
    user(id: ID!): User!
  }
`
export type User = {
  id: string
  name: string
}
export const users: User[] = [
  { id: "1", name: "Jamie" },
  { id: "2", name: "Laurin" },
  { id: "3", name: "Uri" },
]

const resolvers: Resolvers = {
  Query: <QueryResolvers>{
    user: (root: unknown, { id }: { id: string }) => {
      return users.find((u) => u.id === id)
    },
  },
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
