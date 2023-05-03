// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator
import { createSchema } from "graphql-yoga"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import path from "path"
import { PATH_CWD } from "../contstants"
import { resolvers } from "./hello/hello.resolver"

// F:\working\study\typescript\typescript\01.基本配置\11.yoga服务器\11.graphql文件加载
// F:\working\study\typescript\typescript\01.基本配置\11.yoga服务器\11.graphql文件加载\server\src\schema.gql
const typeDefs = loadSchemaSync(path.join(PATH_CWD, "./src/schema/hello/hello.schema.gql"), {
  loaders: [new GraphQLFileLoader()],
})

export const schema = createSchema({
  typeDefs,
  resolvers,
})
