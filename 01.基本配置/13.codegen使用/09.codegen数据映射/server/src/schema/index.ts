// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator
import { createSchema } from "graphql-yoga"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import path from "path"
import { PATH_CWD } from "../constants"
import { resolvers } from "./resolvers"

// F:\working\study\typescript\typescript\01.基本配置\11.yoga服务器\11.graphql文件加载
// F:\working\study\typescript\typescript\01.基本配置\11.yoga服务器\11.graphql文件加载\server\src\schema.gql
const typeDefs = loadSchemaSync(path.join(PATH_CWD, "./src/schema/schema.gql"), {
  loaders: [new GraphQLFileLoader()],
})

export const schema = createSchema({
  typeDefs,
  resolvers,
})
