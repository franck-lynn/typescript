// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator
import { createSchema } from "graphql-yoga"
import fs from "fs"
// import { makeSchema } from "@graphql-tools/schema"
import path from "path"
import { IResolvers } from "@graphql-tools/utils"

const schemaPath = path.join(process.cwd(), "./**/*.gql")
const resolversPath = path.join(process.cwd(), "./**/*.ts")

let typeDefs: string | null = null
let resolvers: IResolvers[] | null = null

try {
  typeDefs = fs.readFileSync(schemaPath, { encoding: "utf-8" })
  resolvers = require(resolversPath)

  console.log("schemaPath: ", schemaPath) // 调试输出
  console.log("resolversPath: ", resolversPath) // 调试输出
} catch (error) {
  console.error("Failed to load schema and/or resolvers. %o", error)
}

if (!typeDefs) {
  throw new Error("Failed to load schema. Check your file path and try again.")
}
if (!resolvers) {
  throw new Error("Failed to load resolvers. Check your file path and try again.")
}

export const schema = createSchema({
  typeDefs: makeSchema({ typeDefs }),
  resolvers: resolvers,
})
