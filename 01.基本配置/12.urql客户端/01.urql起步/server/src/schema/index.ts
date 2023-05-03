import { createSchema } from "graphql-yoga"

const typeDefs = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
    feedPagination(from: Int!, limit: Int!): [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
  }
`
type Link = {
  id: string
  url: string
  description: string
}

const links: Link[] = [
  { id: "link-0", url: "https://graphql-yoga.com", description: "yoga官网" },
  { id: "link-1", url: "https://formidable.com/open-source/urql/docs/basics/vue/", description: "urql官网" },
  { id: "link-3", url: "url-3", description: "描述-3" },
  { id: "link-4", url: "url-4", description: "描述-4" },
  { id: "link-5", url: "url-5", description: "描述-5" },
  { id: "link-6", url: "url-6", description: "描述-6" },
  { id: "link-7", url: "url-7", description: "描述-7" },
  { id: "link-8", url: "url-8", description: "描述-8" },
  { id: "link-9", url: "url-9", description: "描述-9" },
  { id: "link-10", url: "url-10", description: "描述-10" },
  { id: "link-11", url: "url-11", description: "描述-11" },
  { id: "link-12", url: "url-12", description: "描述-12" },
  { id: "link-13", url: "url-13", description: "描述-13" },
  { id: "link-14", url: "url-14", description: "描述-14" },
]

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
    feedPagination: (parent: unknown, args: { from: number; limit: number }) => {
      const { from, limit } = args
      return links.slice(from, limit)
    },
  },
  Link: {
    id: (parent: Link) => {
      console.log("解析feed 返回 Link[], 默认就是这样的操作", parent.id)
      return parent.id
    },
    // description: (parent: Link) => parent.description,
    // url: (parent: Link) => parent.url,
  },
  Mutation: {
    postLink: (parent: unknown, args: { url: string; description: string }) => {
      const idCount = links.length
      const link: Link = {
        id: `link-${idCount}`,
        url: args.url,
        description: args.description,
      }
      links.push(link)
      return link
    },
  },
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
