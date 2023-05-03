import { Decimal } from "decimal.js"

import type { TableCell } from "pdfmake/interfaces"

import { any, not, isEmpty } from "ramda"
import { ContractTableTuple } from "../../types"
import { TABLE_HEADER_MIDDLE } from "./constants"

export function generateTableHeader(header: ContractTableTuple[]): [TableCell[], TableCell[]] {
  const headerRow1 = header[0]
  const headerRow2 = header[1]

  const len1 = headerRow1.length
  const len2 = headerRow2.length

  if (len1 !== len2) throw new Error("头部2列数组的长度必须一样")

  const exist = any(not)(headerRow2) // 是否存在全不为空情况, 只有这种情况才需要跨行或跨列

  const up: TableCell[] = [] // 上一行数组, 需要返回
  const down: TableCell[] = [] // 下一行数组, 需要返回
  // 循环数组
  for (let i = 0; i < len1; i++) {
    const c1 = headerRow1[i] // 当前列上行
    const c2 = headerRow2[i] // 当前列下行

    // 当前列的前一列
    let prev: string | number | Decimal = ""
    if (i > 0 && i < len1 - 1) prev = headerRow2[i - 1]

    const hasAttatch = not(isEmpty(c2))
    const isAttatchNext = not(isEmpty(prev))

    if (exist) {
      if (hasAttatch || isAttatchNext) {
        // 如果有附加行, 只能在附加行进行列合并, 下一列则不能列合并,
        // 也不能进行行合并, 所以要排除 isAttatchNext, 以免漏到了合并行
        up.push({ text: c1, alignment: "center", style: "subTableHeader" })
        if (hasAttatch) {
          // 有 附件行, 不是下一列, 就是第1行的情况 的情况, 第 2 行列合并, 第 1 行不用管
          down.push({ text: c2, colSpan: 2, alignment: "center", style: "subTableHeader" })
        } else {
          down.push({ text: c2 })
        }
      } else {
        // 没有附件项, 也不是附件项后一项
        // 如果是第1项, 由于列窄, 站2行, 不用特意设置居中, 本来就居中
        if (i === 0)
          up.push({
            text: c1,
            rowSpan: 2,
            alignment: "center",
            style: "tableHeader",
          })
        else
          up.push({
            text: c1,
            rowSpan: 2,
            alignment: "center",
            relativePosition: TABLE_HEADER_MIDDLE,
            style: "tableHeader",
          })
        down.push({ text: c2 })
      }
    }
  }
  return [up, down]
}
