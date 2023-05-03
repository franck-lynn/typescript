import { Router, Request, Response } from "express"

import fs from "fs"
import path from "path"
import dayjs from "dayjs"

import { PATH_CWD } from "../../contstants"

import XlsxTemplate from "xlsx-template"

const printRouter = Router()

printRouter.get("/print-excel", (req: Request, res: Response) => {
  const filepath = path.join(PATH_CWD, "src/routes/print-excel", "./template1.xlsx")
  // console.log("文件路径---> ", filepath)
  fs.readFile(filepath, function (err, data) {
    // 创建一个模板
    const template = new XlsxTemplate(data)
    // 替换第1个表格
    const sheetNumber = 1
    /* 
    准备写入 excel 模板文件的数据
    在 excel 模板文件中添加一些占位符
    这些数据替换占位符, 日期要格式化成字符串, 
    在 excel 的单元格中,  填入的是 ${extractDate}
    数组是: ${dates[0} 
    对象是: ${table:people.name} , ${table:people.age}
    */
    const values = {
      extractDate: new Date(),
      dates: [
        dayjs(new Date("2023-06-01")).format("YYYY-MM-DD"),
        String(new Date("2023-06-02")),
        new Date("2023-06-03"),
      ],
      people: [
        { name: "John Smith", age: 20 },
        { name: "Bob Johnson", age: 22 },
      ],
    }
    // Perform substitution 用 value 执行替代占位符的操作
    template.substitute(sheetNumber, values)
    // console.log(template)
    // Get binary data
    // 这个文件是否可以传给前端, 让前端根据这个模板打印呢?
    const result = template.generate({ type: "uint8array" })
    const filepath_write = path.join(PATH_CWD, "src/routes/print-excel", "./newfile.xlsx")
    fs.writeFileSync(filepath_write, result)
  })
  res.end("hello world, 你好, 输出 excel 文件")
})

export { printRouter }
