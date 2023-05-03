import { createSchema, YogaInitialContext } from "graphql-yoga"
import { Resolvers } from "./types"
import { GraphQLError } from "graphql"

//!  上下文的类型
type DefaultContext = Record<string | symbol | number, unknown>
type UserType = { someNumber: number }
export type Context = DefaultContext | UserType | YogaInitialContext

const users = [
  { id: "1", login: "Laurin" },
  { id: "2", login: "Saihaj" },
  { id: "3", login: "Dotan" },
]

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greeting: String
      user(byId: ID!): User!
    }
    type User {
      id: ID!
      login: String!
    }
  `,
  resolvers: <Resolvers>{
    Query: {
      greeting: async () => {
        const greeting = await fetch("http://localhost:9876/greeting").then((res) => res.text())
        return greeting
      },
      user: async (root, args) => {
        const user = users.find((user) => user.id === args.byId)
        if (!user) {
          throw new GraphQLError(
            `User with id '${args.byId}' not found.`, // error extensions
            {
              extensions: {
                // code: "USER_NOT_FOUND",
                http: {
                  status: 400,
                  headers: {
                    "x-custom-header": "some-value",
                  },
                },
              },
            }
          )
        }
        return user
      },
    },
  },
})
