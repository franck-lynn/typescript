import path from "path"
import fs from "fs"

import { PATH_CWD } from "../constants"

export const readFile = async () => {
  // console.log("有__dirname 变量---> ", __dirname)
  console.log("执行的路径---> ", process.cwd())
  // fs.readFile(path.join(process.cwd(), "./src/01.node的最简运行环境.md"), { encoding: "utf-8" }, (err) => {
  fs.readFile(path.join(PATH_CWD, "./src/01.node的最简运行环境.md"), { encoding: "utf-8" }, (err) => {
    if (err) console.log(err)
    else {
      console.log("成功读取到了数据")
    }
  })
}
