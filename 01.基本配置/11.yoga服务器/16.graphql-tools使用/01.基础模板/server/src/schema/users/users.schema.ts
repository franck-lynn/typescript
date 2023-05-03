import { makeExecutableSchema } from "@graphql-tools/schema"

const usersSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      email: String
    }

    type Query {
      userById(id: ID!): User
    }
  `,
  resolvers: {
    // ...
  },
})
