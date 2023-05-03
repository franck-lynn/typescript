import ExcelJS from "exceljs"
import path from "path"

const dpi = 96
const scale = 1.25

const workbook = new ExcelJS.Workbook()

// 添加工作表 创建带有红色标签颜色的工作表
workbook.addWorksheet("My Sheet", {
  properties: { tabColor: { argb: "FFC000" } }, // API 示例纸张尺寸由说明
  // pageSize9 是A4纸 landscape 横向进纸, 工作簿数据水平居中
  pageSetup: { paperSize: 9, orientation: "portrait", horizontalCentered: true },
})

// 访问工作表, 按 name 提取工作表
const worksheet = workbook.getWorksheet("My Sheet")

const cell = worksheet.getCell("A1")
cell.value = "写入单元格的内容"
cell.style = { font: { name: "Arial", size: 72 } }

const row = worksheet.getRow(1)
// 100 是设置的像素点, 要转化成 60 这个尺寸, 看看这个尺寸是啥单位
// https://www.likecs.com/show-308455940.html
// 1磅 = 1/72 英寸,
// row.height = 100 * (72 / dpi) // 设置行高为 75 磅
row.height = 75 // 设置行高为 75 磅
// console.log("row_height 目前设置的为 磅, 但是缩放了 1.25 倍 , 则像素点为 " + (row.height * dpi) / 72)
const column = worksheet.getColumn(1)
// column.width = 120 * (72 / dpi) = 90
column.width = 100 + 0.62 // 设置为磅

const rowA1 = worksheet.getCell("A1")
const fontPx = (rowA1.font!.size! / 72) * 96
console.log(fontPx)
// 写入文件
const filepath = path.resolve(__dirname, "./aName.xlsx")
workbook.xlsx.writeFile(filepath)
