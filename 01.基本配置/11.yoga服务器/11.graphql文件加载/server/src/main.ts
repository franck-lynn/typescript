// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator

import express /* , { Request, Response, NextFunction }  */ from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { createYoga } from "graphql-yoga"

import { schema } from "./schema"
import { PORT } from "./constants"

const app: express.Application = express()

app.use(cors<cors.CorsRequest>()) // 跨域请求

// body parser, 解析请求体, 要在路由注册之前调用
// 内置的也可以, 都要在路由之前注册 解析中间件
app.use(bodyParser.json())
// 解析 form-url 请求
app.use(express.urlencoded({ extended: false }))

const yoga = createYoga({ schema })

app.use("/graphql", yoga)

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:3000/graphql")
})
