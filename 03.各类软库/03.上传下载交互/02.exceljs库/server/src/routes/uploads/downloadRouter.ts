import path from "path"

import { Router, Request, Response } from "express"

import { PATH_CWD } from "../../contstants"

const downloadRouter = Router()

/*
https://www.youtube.com/watch?v=Vxb-8l4d4Pk
文件下载服务:
在 vue 文件中, 触发 click 函数.
用 fetch 提交 download 请求, , 数据返回 为 blob 数据
用 js-file-download 插件进行下载
express-zip 可以进行多文件下载服务
*/
downloadRouter.get("/download", async (req: Request, res: Response) => {
  // 文件名可以在点击链接的时候通过请求参数传过来
  let filename = "20230313170434.jpg"
  filename = path.join(PATH_CWD, "./src/uploads/others", filename)

  res.download(filename)
})

// 多文件打包下载
// express-zip 要下载
// import zip from "express-zip"
// 会将文件打成一个包
// downloadRouter.get("/downloads", async (req: Request, res: Response) => {
//   res.zip([
//     { path: "1.png", name: "1.png" },
//     { path: "2.png", filename: "2.png" },
//     { path: "3.png", filename: "3.png" },
//   ])
// })
export { downloadRouter }
