import { createYoga, createSchema } from "graphql-yoga"

export interface Env {
  name: string
}

const yoga = createYoga(
  /* <Env & ExecutionContext> */ {
    schema: createSchema({
      typeDefs: /* GraphQL */ ``,
      resolvers: {},
    }),
    landingPage: false,
    graphqlEndpoint: "/",
  }
)

export default {
  fetch: yoga.fetch,
}
