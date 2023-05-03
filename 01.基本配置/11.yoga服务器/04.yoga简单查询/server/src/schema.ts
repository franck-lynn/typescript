import { createSchema } from "graphql-yoga"
import { GraphQLError } from "graphql"
import { Link, links } from "./links"
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
  }
`
/*
type Link = {
  id: string
  url: string
  description: string
}

// 实现解析函数
const links: Link[] = [
  {
    id: "link-0",
    url: "https://graphql-yoga.com",
    description: "设置 GraphQL server 非常容易",
  },
]
*/
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
  },
}

export const schema = createSchema({ typeDefs, resolvers })
