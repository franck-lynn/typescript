import { Router, Request, Response } from "express"

const helloRouter = Router()

// 打印 excel 文件的路由
helloRouter.get("/hello", async (req: Request, res: Response) => {
  res.end("hello world, 你好, 世界")
})

export { helloRouter }
