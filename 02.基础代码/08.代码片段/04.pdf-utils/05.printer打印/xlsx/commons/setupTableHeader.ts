import { XlsxContentText } from "./../../types"
import { Decimal } from "decimal.js"
import { any, not, isEmpty } from "ramda"
import { ContractTableTuple } from "../../types"

export function setupTableHeader(header: ContractTableTuple[]): [XlsxContentText[], XlsxContentText[]] {
  const headerRow1 = header[0]
  const headerRow2 = header[1]

  const len1 = headerRow1.length
  const len2 = headerRow2.length

  if (len1 !== len2) throw new Error("头部2列数组的长度必须一样")

  const exist = any(not)(headerRow2) // 是否存在全不为空情况, 只有这种情况才需要跨行或跨列

  const up = [] // 上一行数组, 需要返回
  const down = [] // 下一行数组, 需要返回

  // 循环数组
  for (let i = 0; i < len1; i++) {
    const c1 = headerRow1[i] // 当前列上行
    const c2 = headerRow2[i] // 当前列下行

    // 当前列的前一列
    let prev: Decimal | string = ""
    if (i > 0 && i < len1 - 1) {
      if (Decimal.isDecimal(headerRow2[i - 1])) {
        prev = headerRow2[i - 1].toString()
      } else {
        prev = headerRow2[i - 1] as string
      }
    }

    const hasAttatch = not(isEmpty(c2))
    const isAttatchNext = not(isEmpty(prev))

    if (exist) {
      if (hasAttatch || isAttatchNext) {
        // 单价, 总价这2列
        // up.push({ text: c1, style: "subTableHeader" })
        if (hasAttatch) {
          up.push({ text: c1, style: "subTableHeader" }) // 指单价这一列, 没有要求跨行或跨列
          // 仅指 人民币(不)含税 这列, 跨3列
          down.push({ text: c2, colSpan: 3, style: "subTableHeader" })
        }
        if (isAttatchNext) {
          // 仅指 总价 这一列,跨2列
          up.push({ text: c1, colSpan: 2, style: "subTableHeader" })
        }
      } else {
        // 没有附件项, 也不是附件项后一项
        // 如果是第1项, 由于列窄, 占2行, 不用特意设置居中, 本来就居中
        if (i === 1) {
          up.push({ text: c1, rowSpan: 2, colSpan: 3, style: "tableHeader" })
          down.push({ text: c2, rowSpan: 2, colSpan: 3, style: "tableHeader" })
        } else if (i === 3 || i === len1 - 1) {
          up.push({ text: c1, rowSpan: 2, colSpan: 2, style: "tableHeader" })
          down.push({ text: c2, rowSpan: 2, colSpan: 2, style: "tableHeader" })
        } else {
          // 如有需要, 也可以指定 特殊样式, "tableHeaderSpecial", 例如, 自动换行
          up.push({ text: c1, rowSpan: 2, style: "tableHeader" })
          down.push({ text: c2, rowSpan: 2, style: "tableHeader" })
        }
      }
    }
  }
  return [up, down]
}
