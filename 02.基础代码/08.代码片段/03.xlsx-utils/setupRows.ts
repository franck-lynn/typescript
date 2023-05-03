import { has, reduce, mergeDeepRight } from "ramda"
import ExcelJS from "exceljs"

import type { OmitColSpanRowType, OmitColumnnRowType, RowType, TableBodyType } from "./types"
import { numberToLetters } from "./commons"
import { TOTAL_QUOTATION_COLUMNS } from "./data-table"

const DEFAULT_STYLE: Partial<ExcelJS.Style> = {
  // excel 宋体与 window 不一样
  font: { name: "Arial", size: 10 },
}

export function setupTableBody(
  worksheet: ExcelJS.Worksheet,
  tableNodyData: TableBodyType[],
  startRow: number, //
  startColumn = 0,
  defaultStyle: Partial<ExcelJS.Style> = {
    border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
    alignment: { vertical: "middle" },
  }
) {
  // 获取当前行
  for (let i = 0; i < tableNodyData.length; i++) {
    //  rowNumber = i
    const rowData = tableNodyData[i]
    let j = 0
    for (const p in rowData) {
      const cell = worksheet.getCell(`${numberToLetters(j + startColumn)}${i + startRow}`)
      // @ts-ignore
      cell.value = rowData[p]

      let style: Partial<ExcelJS.Style> | null = null
      if (j === 0 || j === 3 || j === 6) style = { alignment: { horizontal: "center" } }
      if (j === 1 || j === 2 || j === 7) style = { alignment: { wrapText: true } }

      style = style ? (mergeDeepRight(defaultStyle, style) as Partial<ExcelJS.Style>) : defaultStyle

      cell.style = style
      j++
    }
  }
}

export function setupSeparatingRow(
  worksheet: ExcelJS.Worksheet,
  startRow: number, //
  style?: Partial<ExcelJS.Style>,
  totalColumn?: number,
  rowHeight?: number
) {
  totalColumn = totalColumn || TOTAL_QUOTATION_COLUMNS
  style =
    style ||
    <Partial<ExcelJS.Style>>{
      border: { top: { style: "thin" } },
    }
  for (let i = 0; i < totalColumn; i++) {
    // 获取单元格
    const cell = worksheet.getCell(`${numberToLetters(i)}${startRow}`)
    cell.style = style
  }
  // 获取对应行
  const row = worksheet.getRow(startRow)
  row.height = rowHeight ?? 14.25
}

export function setupMultiRowsNoMerge(
  worksheet: ExcelJS.Worksheet, //
  rowsData: OmitColSpanRowType[][],
  rowsNum: number,
  defaultStyle = DEFAULT_STYLE,
  rowHeight = 17.25
) {
  for (let i = 0; i < rowsData.length; i++) {
    const currentRow = rowsData[i]
    if (rowHeight) setupSingleRowNoMerge(worksheet, currentRow, rowsNum + i, defaultStyle, rowHeight)
    else setupSingleRowNoMerge(worksheet, currentRow, rowsNum + i, defaultStyle, rowHeight)
  }
}

/**
 *
 * @param worksheet 当前的工作表
 * @param rowData 单行数据, 类型
 * ##### RowType { name: string colSpan?:  number style?: Partial<ExcelJS.Style>}
 * @param rowNum 从哪一行开始插入数据
 * @param rowHeight 行高, 可选
 */
export function setupSingleRowNoMerge(
  worksheet: ExcelJS.Worksheet, //
  rowData: OmitColSpanRowType[],
  rowNum: number,
  defaultStyle = DEFAULT_STYLE,
  rowHeight?: number
) {
  for (let i = 0; i < rowData.length; i++) {
    // 这一行的当前数据
    const currData = rowData[i]
    // 行数据里是否指定了列, 如果没有, 就依次填充, 如表头
    // 如果有, 就按指定的列填充, 如 sheet neck
    const currColChar = currData.column ?? `${numberToLetters(i)}`
    // 获取单元格进行设置
    const cell = worksheet.getCell(`${currColChar}${rowNum}`)
    cell.value = currData.name
    if (cell.style)
      cell.style = cell.style
        ? (mergeDeepRight<Partial<ExcelJS.Style>, Partial<ExcelJS.Style>>(
            defaultStyle,
            cell.style
          ) as Partial<ExcelJS.Style>)
        : defaultStyle
  }
  // 获取对应行, 设置行高
  if (rowHeight) {
    const currRow = worksheet.getRow(rowNum)
    currRow.height = rowHeight
  }
}

/**
 * 设置多行数据, 并合并单元格
 * @param worksheet
 * @param multiRowsData
 * @param rowsNum
 * @param totalColumn 虽然多行, 但列数必须是一样的, 这些行总共有多少列?
 * 由 tableHeader 的数量来决定
 * @param rowsHeight 行高要么都设置, 要么都不设置
 */
export function setupMultiRowsAndMerge(
  worksheet: ExcelJS.Worksheet, //
  multiRowsData: OmitColumnnRowType[][],
  rowStartNumber: number,
  totalColumn: number,
  defaultStyle = DEFAULT_STYLE,
  rowsHeight?: number[]
) {
  for (let i = 0; i < multiRowsData.length; i++) {
    if (rowsHeight && rowsHeight.length > multiRowsData.length)
      setupSingleRowAndMerge(worksheet, multiRowsData[i], rowStartNumber + i, totalColumn, defaultStyle, rowsHeight[i])
    else setupSingleRowAndMerge(worksheet, multiRowsData[i], rowStartNumber + i, totalColumn, defaultStyle)
  }
}

/**
 * 设置单行数据, 并合并单元格, 比如公司名称
 * @param worksheet 当前的工作表
 * @param rowData 要插入的行数据, 类型
 * ##### RowType { name: string colSpan?:  number style?: Partial<ExcelJS.Style>}
 * @param rowNum 要插入的数据是哪一行?
 * @param totalColumn  这一行总共有多少列?
 */
export function setupSingleRowAndMerge(
  worksheet: ExcelJS.Worksheet, //
  rowsData: OmitColumnnRowType[],
  rowNum: number,
  totalColumn?: number,
  defaultStyle = DEFAULT_STYLE,
  rowHeight?: number
) {
  let s = 0 // j 指针记录开始列
  let e = 0 // j 指针记录结束列
  totalColumn = totalColumn || _getTotalColumn(rowsData)
  const len = rowsData.length
  // if (has("colSpan")(row[len - 1])) throw new Error("列表中最后一个不能合并")
  if (_getTotalColumn(rowsData) > totalColumn) throw new Error("给定长度比需要的长度短")
  for (let i = 0; i < len; i++) {
    const curr = rowsData[i]
    if (has("colSpan")(curr)) {
      e = s + curr.colSpan! - 1
      // 合并单元格
      worksheet.mergeCells(`${numberToLetters(s)}${rowNum}:${numberToLetters(e)}${rowNum}`)
    } else {
      e = s
    }
    // 获取单元格填充数据并设定样式
    const cell = worksheet.getCell(`${numberToLetters(s)}${rowNum}`)

    // 获取对应的列, 设置宽度
    if (curr.width) {
      const column = worksheet.getColumn(`${numberToLetters(s)}`)
      column.width = curr.width
    }
    cell.value = curr.name
    if (curr.style)
      cell.style = curr.style
        ? (mergeDeepRight<Partial<ExcelJS.Style>, Partial<ExcelJS.Style>>(
            defaultStyle,
            curr.style
          ) as Partial<ExcelJS.Style>)
        : defaultStyle
    s = e + 1
  }
  // 获取相应行, 设置行的高度
  if (rowHeight) {
    const currRow = worksheet.getRow(rowNum)
    currRow.height = rowHeight
  }
}

const _getTotalColumn = reduce((accu: number, prev: RowType) => {
  if (has("colSpan")(prev)) {
    return prev.colSpan! + accu
  } else {
    return accu + 1
  }
}, 0)
