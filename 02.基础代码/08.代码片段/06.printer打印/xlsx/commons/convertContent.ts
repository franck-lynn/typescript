import { any, has, find } from "ramda"
import { Decimal } from "decimal.js"
import { Worksheet, CellValue } from "exceljs"
import { calcLineHeight, strLen } from "../../commons/calcLineHeight"

import { XlsxContent, XlsxOptions } from "../../types"
import {
  DEFAULT_TITAL_ROW_HEIGTS,
  DEFAULT_HEADER_ROW_HEIGHT,
  DEFAULT_BODY_ROW_HEIGHT,
  DEFAULT_COLUMNS_WIDTH,
  DEFAULT_FONT_SIZE,
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

      const rowHeight = item.rowHeight ?? item.rowHeight // ! 设置行高

      const row = worksheet.getRow(i + 1 + rowNum) // ! 获取行
      if (rowHeight) row.height = rowHeight // ! 设置行高
    }
    if ("table" in item) {
      const table = item.table
      if (!table) throw new Error(`[表格table]: 设置了表格, 需要有表头, 表体数据`)

      const tableBody = table.body
      const widths = table.widths

      // 取表格中的表头行
      const headerRows = table.headerRows

      // ! 设置列宽, 如果有自动行高设置, 这个设置要放在自动行高之前才能获取得到
      if (widths && widths.length > 0) {
        for (let c = 0; c < widths.length; c++) {
          // 获取每一列, 只要设置一行所在列就可以
          // j 是行 k 是列, 为了取到列, 所以放在内循环
          const col = worksheet.getColumn(`${numberToLetters(startCol + c)}`)
          col.width = getWidth(widths[c])
        }
      }

      for (let j = 0; j < tableBody.length; j++) {
        // ! 获取当前表格行
        const rowData = tableBody[j]

        for (let k = 0; k < rowData.length; k++) {
          // ! 获取单元格数据. k 是当前列
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
          tableRow.height = headerRowHeight // ! 设置了默认值, 所以能取到
        } else {
          // ! 不是表头行, 也要设置行高 bodyRowHeight 也设置了默认值, 所以能取到
          tableRow.height = bodyRowHeight
          // ! 如果单元格内容李设置了行高, 就用单元格里面设置的, 这个优先级更高,
          // ! 遍历所在行 单元格内容, 看有没有 rowHeight 属性, 只要有1个就设置
          if (any(has("rowHeight"))(rowData)) {
            const settedRowHeight = find<XlsxContent>(has("rowHeight"))(rowData)
            const rowHeight = settedRowHeight ? settedRowHeight.rowHeight : undefined
            if (rowHeight) tableRow.height = rowHeight
          }
          // ! 下面是针对内容调整高度值, autoRowHeight
          const autoFitRowHeight = table.autoFitRowHeight ?? table.autoFitRowHeight
          if (autoFitRowHeight) {
            let maxStr = ""
            let colNumberMax = 0
            let fontSize = 0
            let maxLen = 0
            // ! 遍历所有非空单元格
            tableRow.eachCell((cell, colNumber) => {
              if (typeof cell.value === "string") {
                const len = strLen(cell.value) // ! eachCell 获取, 最长字符串, 所在列, 最大长度等信息
                if (len > maxLen) {
                  maxLen = len
                  colNumberMax = colNumber - 1 // ! 这里的最大列数要减去1
                  maxStr = cell.value
                  fontSize = cell.font.size ? cell.font.size : DEFAULT_FONT_SIZE
                }
              }
            })

            // ! 获取最大列的 colSpan, j 是当前行
            const colSpan = rowData[colNumberMax].colSpan

            // ! 从当前最大列开始 + colSpan 跨的列的宽度, 就是总的单元格宽度, 只计算一次不行, 因为暂时还不知道哪里字数最多
            const totalMergedColWidth = getTotalMergedColWidth(worksheet, colNumberMax, colSpan)

            // ! 有了字符串, 字体大小, 列宽 就可以计算需不需要换行, 计算总行数,设置行高
            if (totalMergedColWidth) {
              // ! 计算需要换行的总行高 calcLineHeight
              const linesHeight = calcLineHeight(maxStr, totalMergedColWidth, fontSize, bodyRowHeight)
              if (linesHeight) tableRow.height = linesHeight
            }
          }
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

// 计算字数最多的列(含合并列)的列宽,
function getTotalMergedColWidth(
  worksheet: Worksheet,
  colNumberMax: number,
  colSpan: number | undefined
): number | undefined | null {
  let totalMergedColWidth = 0
  if (colSpan && colSpan > 0) {
    for (let i = 0; i < colSpan; i++) {
      const currCol = worksheet.getColumn(colNumberMax + i)

      const cw = currCol.width
      if (cw) {
        totalMergedColWidth = totalMergedColWidth + cw
      }
    }
  } else {
    // 没有 colSpan 的情况, 就取最大数字列所在列
    const currCol = worksheet.getColumn(colNumberMax + 1)

    const defaultColWidth = worksheet.properties.defaultColWidth
    // ! 取不到就用 默认列宽, 如果还没有, 就没有设置, 就用100个像素,
    // ! 例如, 客户端就有可能取不到, 因为工作表还没有被提交
    const cw = (currCol ? currCol.width : defaultColWidth) || DEFAULT_COLUMNS_WIDTH
    totalMergedColWidth = cw
  }
  return totalMergedColWidth
}
