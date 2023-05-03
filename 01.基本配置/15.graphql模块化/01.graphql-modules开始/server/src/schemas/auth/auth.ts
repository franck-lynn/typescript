import { createModule, gql } from "graphql-modules"

export const auth = createModule({
  id: "auth",
  typeDefs: gql`
    extend type Query {
      me: User
    }

    type Mutation {
      login(username: String!, password: String!): User
      signup(username: String!, password: String!): User
    }

    extend type User {
      username: String!
    }
  `,
  resolvers: {
    Query: {
      me: () => {
        return {
          id: "aaa",
          email: "aaa@aaa.com",
        }
      },
    },
  },
})
