import { schema } from "./schema"
import express from "express"
import { createYoga } from "graphql-yoga"

import type { Plugin } from "@envelop/core"

const app = express()

const plugins: Plugin[] = [
  {
    onParse: ({ params }) => {
      console.log("01. 解析参数开始--> ", { params })
      return (result) => {
        console.log("02. 参数解析完成", { result })
      }
    },
    onExecute: ({ args }) => {
      console.log("03. Execution started!", { args })
      return {
        onExecuteDone({ result }) {
          console.log("04.Execution done!", { result })
        },
      }
    },
  },
]

const yoga = createYoga({
  schema,
  plugins,
})
app.use("/graphql", yoga)

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
