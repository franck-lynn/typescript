import path from "path"
import { Router, Request, Response } from "express"
import multer from "multer"

import { PATH_CWD } from "../../contstants"

const uploadRouter = Router()
// https://blog.csdn.net/a18339063397/article/details/124386139
// 在multer 文档中,opts 中有一个 dest 或者 destination,
// 所以这里命名 destination
const storage = multer.diskStorage(<multer.DiskStorageOptions>{
  // 指定文件上传到服务器的路径
  destination: function (req, file, callback) {
    const savePath = path.join(PATH_CWD, "./src/uploads/others")
    callback(null, savePath)
  },
  // 指定文件上传到服务器的文件名称
  filename: function (req, file, callback) {
    // 获取文件的后缀名
    // const extname = path.extname(file.originalname)
    // 文件的名称是: file.originalname, 要支持中文文件名上传, 还要处理下编码
    callback(null, Buffer.from(file.originalname, "latin1").toString("utf-8"))
  },
})
// 限制文件上传大小
const limits: multer.Options["limits"] = {
  fields: 10,
  // 单位 bytes , 1byte = 8bit 1kb = 1024 bytes 1MB = 1024kb = 1048576 bytes
  fileSize: 2 * 1048576,
  files: 1, // 在 multipart 表单中，文件最大数量, 如果不是 multipart 表单呢?
}
// 这个过滤函数可以生效
// const fileFilter: multer.Options["fileFilter"] = (req, file, callback) => {
//   console.log("过滤这个文件----> ", file)
//   callback(null, true)
// }

const upload = multer({ storage, limits /* , fileFilter */ }).array("file", 2)
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
// 虽然是 upload.single('file'), 但是也是可以上传多个文件的,
// 这是因为, single('file') 调用了2次. 用 array('file', 2) 也是这种情况
// 所以造成 文件数量限制不起作用, 如果要限制上传, 还要想办法
// 前端 n-upload multiple 是表示可以多个文件上传
// router.post("/profiles", upload.single("file"), (req, res) => {
uploadRouter.post("/uploads", (req: Request, res: Response) => {
  upload(req, res, (err) => {
    // 错误的处理机制
    if (err instanceof multer.MulterError) {
      res.end("文件上传错误")
    }
    res.end("文件上传成功")
  })
})

export { uploadRouter }
