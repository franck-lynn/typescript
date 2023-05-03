import { schema } from "./schema"
import express from "express"
import { createYoga } from "graphql-yoga"

const app = express()

const yoga = createYoga({
  schema,
  // 在 login 时才加入上下文
  context: ({ request }) => {
    console.log("放在请求头里的token===> ", request.headers.get("authorization"))
    request.headers.get("authorization")
  },
})
app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
