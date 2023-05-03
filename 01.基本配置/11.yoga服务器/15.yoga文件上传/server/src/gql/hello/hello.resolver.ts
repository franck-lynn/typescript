// https://www.apollographql.com/docs/apollo-server/schema/schema
// https://the-guild.dev/graphql/tools/docs/generate-schema
// import { ObjectId } from "mongodb"  // new ObjectId()
// import { composeResolvers } from "@graphql-tools/resolvers-composition"
import { GraphQLResolveInfo } from "graphql"
// yoga 初始时的上下文
import { YogaInitialContext } from "graphql-yoga"

// import jwt from "jsonwebtoken"
// import { SECRET } from "../../contstants"

const books = [
  { id: 4, title: "狂人日记", authorId: 3 },
  { id: 1, title: "西游记", authorId: 1 },
  { id: 5, title: "呐喊", authorId: 3 },
  { id: 2, title: "三国演义", authorId: 2 },
  { id: 3, title: "朝花夕拾", authorId: 3 },
  { id: 6, title: "The Awakening", authorId: 4 },
  { id: 7, title: "City of Glass", authorId: 5 },
]
const authors = [
  { id: 1, name: "吴承恩", books: [1] },
  { id: 2, name: "罗贯中", books: [2] },
  { id: 3, name: "鲁迅", books: [3, 4, 5] },
  { id: 4, name: "Kate Chopin", books: [6] },
  { id: 5, name: "Paul Auster", books: [7] },
]

type Author = typeof authors[0]
type Book = typeof books[0]

export const _authorResolver = {
  Query: {
    hello: async () => {
      return "graphql 打招呼"
    },
    helloworld: () => {
      return "你好, 世界"
    },
    yesterday: () => new Date(new Date().getTime() - 1000 * 60 * 60 * 24),

    doSomethingYesterday: async (root: unknown, { before }: { before: Date | string }) => {
      //! 1. 先走 MyDate 自定义标量的 resolver 的 parseValue, 2. 在走 hello.resolver.ts 里的这个函数
      return before
    },
    sayByeYesterday: async (root: unknown, { before }: { before: Date | string }) => {
      return before + "告别昨天, 迎接明天"
    },
    // 了解函数的签名 https://the-guild.dev/graphql/tools/docs/resolvers
    today: (root: unknown, args: unknown, context: YogaInitialContext, info: GraphQLResolveInfo) => {
      console.log("info 对象---> ", info.fieldName)
      return new Date()
    },

    tomorrow: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
    books: async () => {
      // 返回所有的作品
      return books
    },
    // 根据作者的 id 查找作者
    author: async (root: unknown, { _id }: { _id: number }) => {
      return authors.find((author) => author.id === _id)
    },
  },
  Author: {
    books: async (author: Author) => {
      // 当查询 author 时, 返回的是一个 author, author 里包含了作品,
      // 注册了 Author resolver, 就可以拿到 关联作品信息
      return books.filter((book) => book.authorId === author.id)
    },
  },
  Book: {
    author: async (book: Book) => {
      // 当查询 book 时, 返回的 book 数据里, 有 authorId 的信息, 根据
      // book.authorId 就可以找到 作者
      return authors.find((author) => author.id === book.authorId)
    },
  },
  Mutation: {
    findAuthor: async (root: unknown, { _id }: { _id: number }) => {
      return authors.find((author) => author.id === _id)
    },
  },
}
