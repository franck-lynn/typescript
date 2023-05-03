import { any, has, mergeDeepRight } from "ramda"
import ExcelJS from "exceljs"

import type { TableHeaderType } from "./types"
import { numberToLetters } from "./commons"

/**
 * 表头数据生成表头
 * @param worksheet 当前的工作表
 * @param headers 表头的数据, 是一个 TableHeaderType 列表, 元素类型如下:
 * ##### TableHeaderType { name: string   attachname?: string  style?: Partial<ExcelJS.Style>}
 * ##### attachname?: string 有这个属性时, 表示从这个所在列开始,与下一列合并,
 * ##### 要合并的列的样式与单元格样式是相同的
 * ##### 每个样式表一般需要单独设置, 因为每一列的宽度有可能是不同的
 * @param startRow 表头的开始行
 * @param endrow  表头的结束行
 */
export function setupTableHeader(
  worksheet: ExcelJS.Worksheet, //
  headers: TableHeaderType[],
  startRow: number,
  endrow: number,
  defaultStyle: Partial<ExcelJS.Style> = {
    font: { name: "宋体", bold: true, size: 11 },
    alignment: { horizontal: "center", vertical: "middle" },
    border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  },
  rowHeight = 15
) {
  // 只要存在一项有 attachName, 就要进行合并, 并且在附加信息处进行列合并
  const existAttach = any(has("attachname"))(headers)
  const len = headers.length
  for (let i = 0; i < len; i++) {
    const header = headers[i] // 获取表头中的每一项
    const COL_NAME = numberToLetters(i) // 列名, 大写 A, B, C...

    // 表头前一列
    let headwerPrev: TableHeaderType | undefined
    if (i > 0 && i < len - 1) {
      headwerPrev = headers[i - 1]
    }

    const style = header.style
      ? (mergeDeepRight<Partial<ExcelJS.Style>, Partial<ExcelJS.Style>>(
          defaultStyle,
          header.style
        ) as Partial<ExcelJS.Style>)
      : defaultStyle

    const hasAttatch = has("attachname")(header)
    // 当前元素的上一项有 attachname 属性, 就表示是有附加项的下一项
    const isAttatchNext = has("attachname")(headwerPrev)
    // 只有存在附加项才有合并项的需求, 分2种情况
    if (existAttach) {
      if (hasAttatch || isAttatchNext) {
        // 有附加项 或者 是附加项的后一项, 是不能进行行合并的, 只能进行部分列合并(下行合并)
        // 这里还要看当前列是有附加项还是没有附加项, 如果有, 取当前列和下一列,

        if (hasAttatch) {
          const COL_NAME_NEXT = numberToLetters(i + 1)
          // console.log(`${COL_NAME}${endrow}:${COL_NAME_NEXT}${endrow}`)
          worksheet.mergeCells(`${COL_NAME}${endrow}:${COL_NAME_NEXT}${endrow}`) // 列合并
          // 单独设置进行了列合并的下面单元格的值
          const cellDown = worksheet.getCell(`${COL_NAME}:${endrow}`) // 获取下面的单元格
          cellDown.style = style
          cellDown.value = header!.attachname!
          // 如果没有附加项, 就说明前面一项是有附加项的, 就什么都不用做
        }
      } else {
        // 没有附加项或者不是附加项后一项, 就进行行合并
        // console.log("进行行合并的项目", `${COL_NAME}${startRow}:${COL_NAME}${endrow}`)
        worksheet.mergeCells(`${COL_NAME}${startRow}:${COL_NAME}${endrow}`) // 行合并
      }
    }
    // 获取对象列, 进行样式和值的设定, 因为下面有一行 有合并的情况, 从开始行取
    const cellStartRow = worksheet.getCell(`${COL_NAME}${startRow}`)
    cellStartRow.value = header.name

    // 文字设置与下面的style 设置不同, 文字设置分为上下, 下面的会覆盖上面的, 所以不要放在
    // 循环里面
    let cell: ExcelJS.Cell | null = null
    for (let j = startRow; j <= endrow; j++) {
      cell = worksheet.getCell(`${COL_NAME}${j}`)
      if (cell) cell.style = style
    }

    const column = worksheet.getColumn(`${COL_NAME}`)
    column.width = header.width
  }
  // 设置行高
  for (let i = startRow; i < endrow + 1; i++) {
    // 获取行
    const row = worksheet.getRow(i)
    row.height = rowHeight
  }
  // 设置在每个打印页面上重复特定的行
  worksheet.pageSetup.printTitlesRow = `${startRow}:${endrow}`
}
