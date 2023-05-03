import { createSchema } from "graphql-yoga"
import { GraphQLError } from "graphql"

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { Link, links } from "./links"

const hash = bcryptjs.hash
const compare = bcryptjs.compare
const sign = jwt.sign
// 扩展架构定义
const typeDefs = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
    feeds(filterNeedle: String!): [Link!]!
    
  }
  type Link {
    id: ID!
    description: String
    url: String
  }
  type Comment {
    id: ID!
    body: String!
  }
  type Mutation {
    postLink(url: String!, description: String!): Link!
    postComentOnLink(linkId: ID!, body: String): Comment!
    register(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
  type AuthPayload {
    token: String
    user: User
  }
  type User {
    id: ID!
    name: String
    email: String
    password: String
  }
`
type User = {
  id: string
  name: string
  email: string
  password: string
}
const users: User[] = []
const resolvers = {
  Query: {
    info: () => "这是 黑客新闻 API 的克隆",
    feed: () => links,
    feeds: async (parent: unknown, args: { filterNeedle?: string }) => {
      const where = args.filterNeedle || ""
      return links.filter((link: Link) => link.description.includes(where))
    },
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (root: Link) => root.description,
    url: (root: Link) => root.url,
  },
  Mutation: {
    postLink: (root: unknown, args: { description: string; url: string }) => {
      const idCount = links.length
      const link: Link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    postComentOnLink: async (root: unknown, { linkId, body }: { linkId: string; body: string }) => {
      const id = parseInt(linkId)
      if (id < 10) {
        const newComment = {
          id,
          body,
        }
        return newComment
      } else {
        // throw new GraphQLError("抛出的错误")
        return Promise.reject(new GraphQLError(`不能大于10条评论的错误---${id}`))
      }
    },
    register: async (root: unknown, args: { email: string; password: string; name: string }) => {
      const password = await hash(args.password, 10)
      const id = users.length.toString()
      const user = { ...args, id, password }
      users.push(user)
      const token = sign({ userId: user.name }, "APP_SECRET")
      return { token, user }
    },
    login: async (parent: unknown, args: { email: string; password: string }) => {
      const user = users.find((user: User) => user.email === args.email)
      if (!user) {
        return new GraphQLError("没有找到user")
      }
      const valid = await compare(args.password, user.password)
      if (!valid) {
        return new GraphQLError("密码不对")
      }
      const token = sign({ userId: user.name }, "APP_SECRET")
      return { token, user }
    },
  },
}

export const schema = createSchema({ typeDefs, resolvers })
