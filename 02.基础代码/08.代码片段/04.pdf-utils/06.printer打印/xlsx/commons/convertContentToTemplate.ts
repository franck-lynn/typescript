import { Decimal } from "decimal.js"
import { Worksheet, CellValue } from "exceljs"

import { XlsxContent, XlsxOptions } from "../../types"
import {
  DEFAULT_TITAL_ROW_HEIGTS,
  DEFAULT_HEADER_ROW_HEIGHT,
  DEFAULT_BODY_ROW_HEIGHT,
} from "../contract/contractStyles"

import { getStyles } from "./getStyles"
import { getWidth } from "./getWidth"
import { numberToLetters } from "./numberToLetters"

export function convertContentToTemplate(content: XlsxContent[], worksheet: Worksheet, options: XlsxOptions) {
  const startCol = 0 // 开始列数
  let rowNum = 0 // 行号的全局变量, 是与当前行号的差值

  const [titleRowHeight, headerRowHeight, bodyRowHeight] = options.rowHeights || [
    DEFAULT_TITAL_ROW_HEIGTS,
    DEFAULT_HEADER_ROW_HEIGHT,
    DEFAULT_BODY_ROW_HEIGHT,
  ]

  // 遍历二维数组的每一组, 可能是表格, 也可能是字符串, 等等
  for (let i = 0; i < content.length; i++) {
    const item = content[i]
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
      // 获取对应的单元格行列进行设置,
      const c = worksheet.getCell(`${numberToLetters(startCol)}:${i + 1 + rowNum}`)
      c.value = item
      const style = getStyles(item, options)
      if (style) c.style = style
    }
    if ("text" in item) {
      const colSpan = item.colSpan ?? item.colSpan
      if (colSpan) {
        const start = `${numberToLetters(startCol)}${i + 1 + rowNum}`
        const end = `${numberToLetters(startCol + colSpan)}${i + 1 + rowNum}`
        worksheet.mergeCells(`${start}:${end}`)
      }
      const rowSpan = item.rowSpan ?? item.rowSpan
      if (rowSpan) {
        const start = `${numberToLetters(startCol)}${i + 1 + rowNum}`
        const end = `${numberToLetters(startCol)}${i + rowNum + rowSpan} `
        worksheet.mergeCells(`${start}:${end}`)
        rowNum = rowNum + rowSpan
      }
      const c = worksheet.getCell(`${numberToLetters(startCol)}:${i + 1 + rowNum}`)
      c.value = itemValueToStr(item.text)
      const style = getStyles(item, options)
      if (style) c.style = style
    }
    if ("table" in item) {
      const tableBody = item.table!.body
      const widths = item.table!.widths

      // 取表格中的表头行
      const headerRows = item.table!.headerRows

      for (let j = 0; j < tableBody.length; j++) {
        // 获取当前表格行
        const rowData = tableBody[j]

        for (let k = 0; k < rowData.length; k++) {
          // 获取单元格数据
          const cData = rowData[k]

          const rowSpan = cData.rowSpan
          const colSpan = cData.colSpan

          const fromKColumn = rowData.slice(0, k)
          const sumFrom = fromKColumn.reduce((accu: number, curr: XlsxContent) => {
            if (curr.colSpan) return accu + curr.colSpan
            else return accu + 1
          }, 0)

          const from = startCol + sumFrom
          const up = j + 1 + rowNum + i

          const start = `${numberToLetters(from)}${up}`

          // 文字只设置在合并前开始的位置
          const cell = worksheet.getCell(start)
          if (cData.text) cell.value = itemValueToStr(cData.text)

          if (rowSpan || colSpan) {
            // 行列都有合并, 并且也只能针对第 1 行
            const to = colSpan ? from + colSpan - 1 : from
            const down = rowSpan ? j + rowNum + i + rowSpan : up

            const end = `${numberToLetters(to)}${down}`

            // 有 rowSpan 的情况下, 只合并第1行, 没有 rowSpan 2行都合并
            if (rowSpan) {
              if (j === 0) worksheet.mergeCells(`${start}:${end}`)
            } else {
              worksheet.mergeCells(`${start}:${end}`)
            }
          }

          const style = getStyles(cData, options)
          if (rowSpan) {
            for (let i = 0; i < rowSpan - 1; i++) {
              const c = worksheet.getCell(`${numberToLetters(from)}${up + i}`)

              if (style) c.style = style
            }
          }
          if (colSpan) {
            for (let i = 0; i < colSpan; i++) {
              const c = worksheet.getCell(`${numberToLetters(from + i)}${up}`)
              if (style) c.style = style
            }
          } else {
            // 没有行列合并的情况下, 只是单个的单元格, 直接取
            const c = worksheet.getCell(start)

            if (style) c.style = style
          }
        }
        const tableRow = worksheet.getRow(j + 1 + rowNum + i)
        if (headerRows && j < headerRows) {
          // 获取表头行, 设置行高
          tableRow.height = headerRowHeight
        } else {
          // ! 不是表头行, 也要设置行高
          tableRow.height = bodyRowHeight
        }
      }

      // ! 设置列宽
      if (widths && widths.length > 0) {
        for (let c = 0; c < widths.length; c++) {
          // 获取每一列, 只要设置一行所在列就可以
          // j 是行 k 是列, 为了取到列, 所以放在内循环
          const col = worksheet.getColumn(`${numberToLetters(startCol + c)}`)
          col.width = getWidth(widths[c])
        }
      }

      // 超过2行行号就要变
      rowNum = rowNum + tableBody.length - 1
    }
    if (i === 0) {
      // 设置第1行标题的行高
      const titleRow = worksheet.getRow(i + 1)
      titleRow.height = titleRowHeight
    }
  }
}

function itemValueToStr(text: string | number | Date | Decimal | undefined): CellValue {
  if (!text) return ""
  if (Decimal.isDecimal(text)) return text.toFixed(2)
  return text
}
