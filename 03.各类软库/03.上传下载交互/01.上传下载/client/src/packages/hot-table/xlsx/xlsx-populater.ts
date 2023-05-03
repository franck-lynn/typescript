import XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
/**
 * A4 纸的大小:210 x 297mm
 * excel 行高使用单位为 磅, 列宽单位为 1/12英寸 1磅 = 0.3612mm
 * 页边距单位为 cm,
 * @returns
 */
export async function wb() {
  // 开头工作簿, 创建一个空的工作簿
  const workbook = await XlsxPopulate.fromBlankAsync()
  const sheet1 = workbook.sheet(0)
  // 页边距预设
  sheet1.pageMarginsPreset("narrow") // narrow 下左右 0.6 cm

  sheet1.pageMargins("top", 0.45) // 设置上方边距, 单位是 cm
  sheet1.pageMargins("bottom", 0.45) // 设置下边距, 单位是 cm

  // 合并单元格
  const range = sheet1.range("A4:D5")
  range.merged(true)
  range.value("合并单元格后的值") // 也可以设置 style 如: range.style

  // 表格标题栏设置
  const cellA4 = sheet1.cell("A4")
  console.log("获取单元格的名称----> ", cellA4.columnName())
  console.log("获取单元格的名称----> ", cellA4.rowNumber())
  // sheet1.printOptions("PrintTitleRows", "")
  sheet1.printOptions("headings", true)
  console.log(sheet1.printOptions("headings"))
  // 工作簿视图窗格选项, 就是拆分窗口, 冻结窗口等这些选项, 除了冻结窗口
  // 其他的没怎么用过
  // const paneOptions = { state: "frozen", topLeftCell: "B2", xSplit: 1, ySplit: 1, activePane: "bottomRight" }
  // console.log("工作表视图窗格选项---> ", sheet1.panes(paneOptions))
  sheet1.freezePanes("A6") // 冻结一般是标题的下一行
  // 获取行, 并设置行高度, 设置第1行行高
  sheet1.row(1).height(100)
  // 设置第3列列宽
  sheet1.column("C").width(20)

  console.log(sheet1)
  // 返回一个 Blob对象
  return await workbook.outputAsync()
}
