import { Router, Request, Response } from "express"

const helloRouter = Router()

// 打印 excel 文件的路由
helloRouter.get("/hello", async (req: Request, res: Response) => {
  res.end("hello world, 你好, 世界")
})

helloRouter.get("/querystring", async (req: Request, res: Response) => {
  const { name, password } = req.query
  console.log(name, password)
  res.end(JSON.stringify(name) + JSON.stringify(password))
})

helloRouter.get("/queryparams/:commentId", async (req: Request, res: Response) => {
  const { commentId } = req.params
  const { name, password } = req.query
  if (name && password) {
    res.end(JSON.stringify(commentId) + JSON.stringify(name) + JSON.stringify(password))
  } else {
    res.end(JSON.stringify(commentId))
  }
})

export { helloRouter }
