import { createSchema } from "graphql-yoga"
// https://www.youtube.com/watch?v=34XUUJpyj9A&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=2
const typeDefs = /* GraphQL */ `
  type App {
    books: [Book!]!
  }
  type Book {
    id: String!
    title: String!
  }
  type Query {
    app: App!
  }
  input BookInput {
    title: String
  }
  type Mutation {
    createBook(bookInput: BookInput!): Book
  }
`

const context = {
  app: {
    books: [{ id: "1", title: "笑傲江湖" }],
  },
}

const resolvers = {
  Query: {
    app: () => {
      // return {
      //   books: [{ id: "1", title: "笑傲江湖" }],
      // }
      // return new Promise((resolve /* reject */) => {
      //   setTimeout(() => {
      //     resolve({ books: [{ id: "1", title: "笑傲江湖" }] })
      //     // reject("返回错误测试一下")
      //   }, 1000)
      // })
      return new Promise((resolve /* reject */) => {
        setTimeout(() => {
          resolve(context.app)
          // reject("返回错误测试一下")
        }, 1000)
      })
    },
  },
  Mutation: {
    createBook: (root: any, { bookInput }: any) => {
      console.log("服务器端打印--> ", bookInput)
      context.app.books.push({
        id: (context.app.books.length + 1).toString(),
        title: bookInput.title,
      })
      return context.app.books[context.app.books.length - 1]
    },
  },
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
