import express, { Request, Response /* , NextFunction */ } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import uploader from "express-fileupload"

const app: express.Application = express()

app.use(cors<cors.CorsRequest>()) // 跨域请求
// https://www.bilibili.com/video/BV16B4y1q7ki/?spm_id_from=333.337.search-card.all.click&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// body parser, 解析请求体, 要在路由注册之前调用
// 内置的也可以, 都要在路由之前注册 解析中间件
app.use(bodyParser.json())
// 解析 form-url 请求
app.use(express.urlencoded({ extended: false }))
app.use(uploader())

app.post("/uploads", (req: Request, res: Response) => {
  // console.log(req.files?.chunkData)
  const { data /* name,  size, encoding */ } = req.files?.chunkData as uploader.UploadedFile
  console.log(data.toString())
  res.send({
    msg: "ok",
  })
})

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})
