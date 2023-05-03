import ExcelJS from "exceljs"
import path from "path"

import { setupSingleRowAndMerge } from "./setupRows"
import { setupTableHeader } from "./setupTableHeader"

import { quotationTableHeader } from "./data-table"
import { myCompany } from "./data-header"

const workbook = new ExcelJS.Workbook()
// 添加工作表 创建带有红色标签颜色的工作表
workbook.addWorksheet("My Sheet", {
  properties: { tabColor: { argb: "FF0000" } }, // API 示例纸张尺寸由说明
  // pageSize9 是A4纸 landscape 横向进纸, 工作簿数据水平居中
  pageSetup: { paperSize: 9, orientation: "portrait", horizontalCentered: true },
})
// 访问工作表, 按 name 提取工作表
const worksheet = workbook.getWorksheet("My Sheet")
const margin = 0.236
worksheet.pageSetup.margins = { left: margin, right: margin, top: 0.62, bottom: 0.62, header: margin, footer: margin }

/*  填充数据区域 */
// 参数1 表示第1行
setupSingleRowAndMerge(worksheet, myCompany, 1)
setupTableHeader(worksheet, quotationTableHeader, 9, 10)

// 设置页脚,  `&L${company} &C &R 第 &P 页, 共 &N 页` &L 表示左, ...
worksheet.headerFooter.oddFooter = `&L${myCompany[0].name} &C &R 第 &P 页, 共 &N 页`

/*  填充数据区域 */
// 写入文件
const filepath = path.resolve(__dirname, "./aName.xlsx")
workbook.xlsx.writeFile(filepath)
