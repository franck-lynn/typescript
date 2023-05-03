import { Post, Resolvers } from "../types"
import { createSchema } from "graphql-yoga"

const typeDefs = /* GraphQL */ `
  type Author {
    id: Int! # 作者的id
    name: String! # 作者的名字
  }
  type Post {
    id: Int!
    title: String!
    author: Author
  }
  type Query {
    posts(title: String): [Post]
  }
`
const posts: Post[] = [
  { id: 1, title: "帖子1", author: { id: 1, name: "作者1" } },
  { id: 2, title: "帖子2", author: { id: 1, name: "作者1" } },
  { id: 3, title: "帖子3", author: { id: 2, name: "作者2" } },
  { id: 2, title: "帖子2", author: { id: 2, name: "作者2" } },
]

const resolvers: Resolvers = {
  Query: {
    posts: (root, { title }) => {
      console.log(root, title)
      return posts
    },
  },
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
