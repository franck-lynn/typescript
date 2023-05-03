import path from "path"
import fs from "fs"
import express /* , { Request, Response, NextFunction }  */ from "express"
import bodyParser from "body-parser"
import cors from "cors"
import uploader from "express-fileupload"
import { PATH_CWD } from "./constants"

const app: express.Application = express()

app.use(cors<cors.CorsRequest>()) // 跨域请求
// https://www.bilibili.com/video/BV16B4y1q7ki/?spm_id_from=333.337.search-card.all.click&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// body parser, 解析请求体, 要在路由注册之前调用
// 内置的也可以, 都要在路由之前注册 解析中间件
app.use(bodyParser.json())
// 解析 form-url 请求
app.use(express.urlencoded({ extended: false }))
app.use(uploader())

const ALLOWED_TYPE: Record<string, string> = {
  "video/mp4": "mp4",
  "image/jpeg": "jpg",
}

app.post("/upload_video", (req, res) => {
  // 在formData 对象里,
  // name: 是原始的文件名
  // fileName: 是重命名后的文件名
  // type: 是文件的类型
  // size: 是块的尺寸
  const { name, type, filename, uploadedSize } /* : { name: string; type: string; size: string } */ = req.body

  const file = req.files?.avatar as uploader.UploadedFile
  console.log(" name 是原始的文件名===> ", name)
  if (!file) {
    res.send({ code: 403, msg: "No file upload" })
    return
  }
  if (!ALLOWED_TYPE[type]) {
    res.send({ code: 502, msg: "不支持此类文件上传" })
    return
  }
  // const fileName = filename + path.extname(name)
  // console.log(fileName)
  const filePath = path.join(PATH_CWD, "./src/upload-files/" + filename)

  // 写入文件
  if (uploadedSize !== "0") {
    if (fs.existsSync(filePath)) {
      res.send({ code: 301, msg: "文件已存在" })
      return
    }

    fs.appendFileSync(filePath, file.data)
    res.send({
      code: 202,
      msg: "Append",
    })
  }
})

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})
