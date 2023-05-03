// https://the-guild.dev/graphql/tools/docs/generate-schema

import { makeExecutableSchema } from "@graphql-tools/schema"

import { typeDefs as authorTypeDefs } from "./author/author.typeDefs"
import { resolvers as authorResolver } from "./author/author.resolver"

export { authorTypeDefs, authorResolver }

export const schema = makeExecutableSchema({
  typeDefs: authorTypeDefs,
  resolvers: authorResolver,
})
