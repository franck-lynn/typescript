import { createSchema, YogaInitialContext } from "graphql-yoga"
// import { Resolvers } from "./types"
// import { GraphQLError } from "graphql"

//!  上下文的类型
type DefaultContext = Record<string | symbol | number, unknown>
type UserType = { someNumber: number }
export type Context = DefaultContext | UserType | YogaInitialContext

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }

    type Subscription {
      countdown(from: Int!): Int!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
    },
    Subscription: {
      countdown: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe: async function* (_, { from }) {
          for (let i = from; i >= 0; i--) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            yield { countdown: i }
          }
        },
      },
    },
  },
})
