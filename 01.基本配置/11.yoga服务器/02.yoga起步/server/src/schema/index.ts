import { createSchema } from "graphql-yoga"

const typeDefs = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
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
  {
    id: "link-0",
    url: "https://graphql-yoga.com",
    description: "The easiest way of setting up a GraphQL server",
  },
]

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
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
