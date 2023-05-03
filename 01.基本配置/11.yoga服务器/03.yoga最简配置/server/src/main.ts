import express from "express"
import { createSchema, createYoga } from "graphql-yoga"
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "WTF!",
    },
  },
})

const app = express()

const yoga = createYoga({ schema })
app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
