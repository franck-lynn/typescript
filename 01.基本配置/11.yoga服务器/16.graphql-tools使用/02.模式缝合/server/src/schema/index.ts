// https://the-guild.dev/graphql/tools/docs/generate-schema
// https://the-guild.dev/graphql/tools

// import path from "path"
// import { loadSchemaSync } from "@graphql-tools/load"

import { loadFilesSync } from "@graphql-tools/load-files"
// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { makeExecutableSchema } from "@graphql-tools/schema"

import { resolvers as authorResolvers } from "./author/author.resolver"

// 这个 typeDefs 是由 ts 文件编写的
import { typeDefs as authorSchema } from "./author/author.typeDefs"

// 也可以使用 @graphql-tools/load 的 loadDocuments 和  @graphql-tools/code-file-loader
// 的加载器 CodeFileloader 对 ts 文件写的类型进行加载,CodeFileLoader 是从 ts 文件中
// 提取 graphql 定义, 这个没有测试成功, 还是采取一个一个文件导入的方式
// import { loadDocumentsSync } from "@graphql-tools/load"
// import { CodeFileLoader } from "@graphql-tools/code-file-loader"
// const documents = loadDocumentsSync("./**/*.js", { loaders: [new CodeFileLoader()], pluckConfig: {} })

// 也可以这样读取
const typeDefsArray = loadFilesSync("./**/*.gql") // 返回的是一个数组
const typeDefs = mergeTypeDefs([...typeDefsArray, authorSchema])
// const typeDefs = mergeTypeDefs([authorSchema])

const resolvers = mergeResolvers([authorResolvers])

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
