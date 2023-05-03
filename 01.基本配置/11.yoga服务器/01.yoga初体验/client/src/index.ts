// graphql 函数运行的查询
import { makeExecutableSchema } from "@graphql-tools/schema"
import { execute, parse } from "graphql"

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`
const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
}

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
async function main() {
  const myQuery = parse(/* Graphql */ `
    query {
      hello
    }
  `)
  // 首先, 解析函数 parse 会生成一个 graphql 的执行对象,这是一个抽象语法树 AST,
  // 是对上面的字符串的一种操作
  //
  const result = await execute({
    schema,
    document: myQuery,
  })
  console.log(myQuery)
  console.log(result)
}

main()
