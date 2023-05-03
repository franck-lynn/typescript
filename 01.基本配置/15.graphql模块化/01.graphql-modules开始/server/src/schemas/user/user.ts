import { createModule, gql } from "graphql-modules"

// import path from "path"
// import { PATH_CWD } from "../../constants"
import { UserModule } from "./generated"

type User = {
  id: string
  email: string
}

export const user = createModule({
  id: "user",
  typeDefs: [
    gql`
      type Query {
        user(id: ID!): User
      }

      type User {
        id: ID!
        email: String!
      }
    `,
  ],
  resolvers: <UserModule.Resolvers>{
    Query: {
      user: (root: unknown, { id }: { id: string }) => {
        return {
          id: "用户 " + id,
          email: "test@test.com",
          username: "", // 有个类型继承后有了这个属性
        }
      },
    },
    User: {
      id: (user: User) => user.id,
    },
  },
})
// const resolvers: UserModule.Resolvers = {
//   Query: {
//     user: (root: unknown, { id }: { id: string }) => {
//       return {
//         id: "用户 " + id,
//         email: "test@test.com",
//         username: "",
//       }
//     },
//   },
// }
