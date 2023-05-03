import { Router, Request, Response } from "express"

import fs from "fs"
import path from "path"
import dayjs from "dayjs"

import { PATH_CWD } from "../../contstants"

import XlsxTemplate from "xlsx-template"

const exportRouter = Router()

// 试验一下看看把后端读取的模板传到前端, 让前端自己打印出来
exportRouter.get("/export-excel", async (req: Request, res: Response) => {
  const filepath = path.join(PATH_CWD, "src/routes/print-excel", "./template1.xlsx")
  // const data = await fs.promises.readFile(filepath)
  // const template = new XlsxTemplate(data)
  // res.sendFile(filepath)
})
export { exportRouter }
