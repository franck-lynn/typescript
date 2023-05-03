// 思考, 不使用 express 能否创建 web 服务器, 能, http 原生模块就可以
// 为什么还要用 express? 原生的复杂
// http 与 express 是什么关系
// express 是基于 http 封装的
import http from "http"
// https://www.bilibili.com/video/BV1Ns411L7vv/?spm_id_from=333.337.search-card.all.click&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
import express from "./my-express"

const app = express()

// 中间件
// use 方法第1个参数如果不写, 默认就是 '/'
app.use(function (req: http.IncomingMessage, res: http.ServerResponse, next: any) {
  res.setHeader("Content-type", "text/html; charset=utf-8")
  console.log("middleware1")
  next()
})
app.use(function (req: http.IncomingMessage, res: http.ServerResponse, next: any) {
  console.log("middleware2")
  next()
})

app.get("/name", (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end("zfpx")
})
app.get("/age", (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end("9")
})
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})
