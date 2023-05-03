import express from "express"
import { createYoga } from "graphql-yoga"

import { schema, Context } from "./schema"

const app = express()

//!  上下文的类型
// type DefaultContext = Record<string | symbol | number, unknown>
// type UserType = { someMunber: number }
// type Context = DefaultContext | YogaInitialContext | UserType

const yoga = createYoga({
  schema,
  //! 上下文的类型
  context: (): Context => {
    return { someNumber: 13 }
  },
})

app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
