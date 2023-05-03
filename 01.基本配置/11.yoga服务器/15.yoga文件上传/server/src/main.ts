import express from "express"
import { createYoga, YogaInitialContext } from "graphql-yoga"

import { schema } from "./schema"

const app = express()

//!  上下文的类型
// type DefaultContext = Record<string | symbol | number, unknown>
// type UserType = { req: Request; res: Response }
// type Context = DefaultContext | YogaInitialContext | UserType

const yoga = createYoga({
  schema,
})

app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
