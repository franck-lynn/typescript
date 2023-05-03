// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator
import { createSchema } from "graphql-yoga"
import { GraphQLSchema } from "graphql"
import { IResolvers } from "@graphql-tools/utils"

import { loadSchemaSync } from "@graphql-tools/load"
import { loadFilesSync, loadFiles } from "@graphql-tools/load-files"
import * as GraphQLFileLoader from "@graphql-tools/graphql-file-loader"

import path from "path"
import { PATH_CWD } from "../contstants"
// console.log("环境变量----> ", __dirname)
console.log("schema 环境变量----> ", PATH_CWD)
const schemaPath = path.join(PATH_CWD, "src/schema/**/*.gql")
const resolversPath = path.join(PATH_CWD, "src/schema/**/*.ts")

const typeDefs: GraphQLSchema = loadSchemaSync(schemaPath, { loaders: [new GraphQLFileLoader.GraphQLFileLoader()] })
const resolvers: IResolvers[] = await loadFiles(resolversPath, { extensions: ["ts"] })

export const schema: GraphQLSchema = createSchema({
  typeDefs,
  resolvers,
})
