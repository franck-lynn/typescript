import { schema } from "./schema"
import express from "express"
import { createYoga } from "graphql-yoga"

const app = express()

const yoga = createYoga({ schema })
app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
