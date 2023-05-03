import ExcelJS from "exceljs"
// import type { Font } from "exceljs"
/**
 * A4 纸的大小:210 x 297mm
 * excel 行高使用单位为 磅, 列宽单位为 1/12英寸 1磅 = 0.3612mm
 * 页边距单位为 cm,
 * @returns
 */
const company = "杭州德美瑞数控工具有限公司"
const company_en = "Hangzhou Demry NC Tooling Co.,Ltd"
const address = "杭州市西湖科技园振华路200号瑞鼎大厦B616  电话:0571-87830396 传真:0571-87830397"
const quotation = "报价单"
const custom_name = "杭州新宇机械有限公司"
export async function wb() {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook()
  // 添加工作表 创建带有红色标签颜色的工作表
  workbook.addWorksheet("My Sheet", {
    properties: { tabColor: { argb: "FFC000" } }, // API 示例纸张尺寸由说明
    // pageSize9 是A4纸 landscape 横向进纸, 工作簿数据水平居中
    pageSetup: { paperSize: 9, orientation: "portrait", horizontalCentered: true },
  })

  // 访问工作表, 按 name 提取工作表
  const worksheet = workbook.getWorksheet("My Sheet")
  // 页面上的空白边距, 设置单位是英寸, 而 excel 里是 cm
  // excel 中窄状态下: 左右0.6cm = 0.236ft
  // 上 1.6cm=0.62ft  包含页眉 0.5cm=0.2ft,
  // 下 1.6cm=0.62, 包含页脚 0.5=0.2ft, 这样就可以尽可能多的打印
  const margin = 0.236
  worksheet.pageSetup.margins = { left: margin, right: margin, top: 0.62, bottom: 0.62, header: margin, footer: margin }

  const LAST_COLUMN = "I"
  // ! **************************第 1 行**************************
  worksheet.mergeCells(`A1:${LAST_COLUMN}1`)
  const A1 = worksheet.getCell("A1")
  // font 必须要是一个 Font 对象
  A1.style = {
    font: { name: "微软雅黑", size: 20, bold: true }, // 字体
    alignment: { vertical: "middle", horizontal: "center" }, // 居中
  }
  A1.value = company
  // ! **************************第 2 行**************************
  worksheet.mergeCells(`A2:${LAST_COLUMN}2`)
  const A2 = worksheet.getCell("A2")
  A2.style = {
    font: { name: "Arial Black", size: 10, bold: true }, // 字体
    alignment: { vertical: "middle", horizontal: "center" }, // 居中
  }
  A2.value = company_en
  // ! **************************第 3 行**************************
  worksheet.mergeCells(`A3:${LAST_COLUMN}3`)
  const A3 = worksheet.getCell("A3")
  A3.style = {
    font: { name: "Simsun", size: 10, bold: true }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "center" }, // 居中
  }
  A3.value = address
  // ! **************************第 4 行**************************
  worksheet.mergeCells(`A4:${LAST_COLUMN}4`)
  const A4 = worksheet.getCell("A4")
  A4.style = {
    font: { name: "微软雅黑", size: 20, bold: false }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "center" }, // 居中
  }
  A4.value = quotation

  // ! 第5 ~ 8行设置相同的行高
  // 设置行高 0.3612
  for (let i = 5; i < 9; i++) {
    const ROW_5_8 = worksheet.getRow(i)
    ROW_5_8.height = 22 // 行高设置为 22 磅
  }

  // ! **************************第 5 行**************************
  const A5 = worksheet.getCell("A5")
  A5.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  A5.value = `客  户: ${custom_name}`
  // ! **************************第 6 行**************************

  const A6 = worksheet.getCell("A6")
  A6.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  A6.value = `联系人: 王诚`

  const G6 = worksheet.getCell("F6")
  G6.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  G6.value = `编  号: BHZ2023-03-08-0001`
  // ! **************************第 7 行**************************
  const A7 = worksheet.getCell("A7")
  A7.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  A7.value = `电  话: 13616615621`

  const G7 = worksheet.getCell("F7")
  G7.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  G7.value = `日  期: 2023年3月8日`
  // ! **************************第 8 行**************************
  const A8 = worksheet.getCell("A8")
  A8.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体宋体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  A8.value = `电  联: wechat`

  const G8 = worksheet.getCell("F8")
  G8.style = {
    font: { name: "Simsun", size: 10, bold: false }, // 字体
    alignment: { vertical: "middle", horizontal: "left" }, // 居中
  }
  G8.value = `发件人: 林芮应`

  // 设置空行的上下横向分割, 总共取的列数
  const columnNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
  for (let i = 0; i < columnNames.length; i++) {
    worksheet.getCell(`${columnNames[i]}9`).style = { border: { top: { style: "thin" }, bottom: { style: "thin" } } }
  }
  worksheet.getRow(9).height = 16
  // TODO: 列宽设置
  // 获取 A 列
  const COLUMN_A = worksheet.getColumn("A") // 序号
  COLUMN_A.width = 10 / 2.54 - 0.2375 * 2
  const COLUMN_B = worksheet.getColumn("B") // 名称
  COLUMN_B.width = 24 / 2.54 - 0.2375 * 2 //
  const COLUMN_C = worksheet.getColumn("C") // 订货号
  COLUMN_C.width = 64 / 2.54 - 0.2375 * 2 //
  const COLUMN_D = worksheet.getColumn("D") // 型号
  COLUMN_D.width = 24 / 2.54 - 0.2375 * 2 //
  const COLUMN_E = worksheet.getColumn("E")
  COLUMN_E.width = 30 / 2.54 - 0.2375 * 2 //
  const COLUMN_F = worksheet.getColumn("F")
  COLUMN_F.width = 10 / 2.54 - 0.2375 * 2 //
  const COLUMN_G = worksheet.getColumn("F")
  COLUMN_G.width = 10 / 2.54 - 0.2375 * 2 //
  const COLUMN_H = worksheet.getColumn("H")
  COLUMN_H.width = 10 // 转化为 mm 单位是  3* 1 / 12 * 25.4
  const COLUMN_I = worksheet.getColumn("I")
  COLUMN_I.width = 10 // 转化为 mm 单位是  3* 1 / 12 * 25.4

  // 合并单元格
  worksheet.mergeCells("A10:A11")
  // 获取合并后单元格, 获取的是合并的开始那个单元格的位置, A6被合并掉了
  const A10 = worksheet.getCell("A10")
  A10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  A10.value = "序号"

  worksheet.mergeCells("B10:B11")
  const B10 = worksheet.getCell("B10")
  B10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  B10.value = "名称"

  worksheet.mergeCells("C10:C11")
  const C10 = worksheet.getCell("C10")
  C10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  C10.value = "订货号"

  worksheet.mergeCells("D10:D11")
  const D10 = worksheet.getCell("D10")
  D10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  D10.value = "型号及材质"

  worksheet.mergeCells("E10:E11")
  const E10 = worksheet.getCell("E10")
  E10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  E10.value = "数量"

  const F10 = worksheet.getCell("F10")
  F10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  F10.value = "单价"

  const G10 = worksheet.getCell("G10")
  G10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  G10.value = "总价"

  worksheet.mergeCells("F11:G11")
  const F11 = worksheet.getCell("F11")
  F11.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  F11.value = "人民币不含税"

  worksheet.mergeCells("H10:H11")
  const H10 = worksheet.getCell("H10")
  H10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  H10.value = "品牌"

  worksheet.mergeCells("I10:I11")
  const I10 = worksheet.getCell("I10")
  I10.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
  I10.value = "备注"

  // 在每个打印页面上重复特定的行
  worksheet.pageSetup.printTitlesRow = "10:11"

  // 设置页脚,  `&L${company} &C &R 第 &P 页, 共 &N 页` &L 表示左, ...
  worksheet.headerFooter.oddFooter = `&L${company} &C &R 第 &P 页, 共 &N 页`
  // 添加列标题并定义列键和宽度
  // 注意：这些列结构仅是构建工作簿的方便之处，除了列宽之外，它们不会完全保留。
  // worksheet.columns = [
  //   { header: "Id", key: "id", width: 10 },
  //   { header: "Name", key: "name", width: 32 },
  //   { header: "D.O.B.", key: "DOB", width: 10, outlineLevel: 1 },
  // ]

  // 写入流, 返回的是一个 buffer, 还需要把 buffer 包装成一个 blob,
  // blob 和 文件 File 就很接近了, 缺少一个文件名而已, 内容都在 blob
  const buffer = await workbook.xlsx.writeBuffer()
  // 返回一个 blob
  return new Blob([buffer])
}
