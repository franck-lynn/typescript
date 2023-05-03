import { Decimal } from "decimal.js"
import { ContractTableTuple, XlsxContentText } from "../../types"
import { STYLE_BODY, STYLE_BODY_CENTER, STYLE_BODY_WRAPTEXT } from "../contract/contractStyles"

export function setupTableBody(dataRows: ContractTableTuple[]): XlsxContentText[][] {
  const tableRows = []
  for (let i = 0; i < dataRows.length; i++) {
    const rowData = dataRows[i] // 每一行的数据
    const tc = [] // 单元格数据 tableCell
    for (let j = 0; j < rowData.length; j++) {
      let r = rowData[j] // 当前单元格数据
      if (Decimal.isDecimal(r)) {
        r = r.isZero() ? "" : parseFloat(r.toFixed(2))
      } else if (typeof r === "string") {
        r = r.toUpperCase()
      }
      switch (j) {
        case 0: // ! 第1列: 序号  居中显示
          tc.push({ text: r, style: STYLE_BODY_CENTER })
          break
        case 1: // ! 第2列: 名称 跨3列,  自动换行
          tc.push({ text: r, colSpan: 3, style: STYLE_BODY_WRAPTEXT })
          break
        case 2: // ! 第3列: 型号及材质 自动换行
          tc.push({ text: r, style: STYLE_BODY_WRAPTEXT })
          break
        case 3: // ! 第4列: 数量 跨2行,  第5列是单价行, 默认就行
          tc.push({ text: r, colSpan: 2, style: STYLE_BODY_CENTER })
          break
        case 5: // ! 第6列: 总价 跨2列
          tc.push({ text: r, colSpan: 2, style: STYLE_BODY })
          break
        case 6: // ! 第7列: 品牌  居中显示
          tc.push({ text: r, style: STYLE_BODY_CENTER })
          break
        case rowData.length - 1: // ! 第8列: 最后一列, 备注  跨2行 自动换行
          tc.push({ text: r, colSpan: 2, style: STYLE_BODY_WRAPTEXT })
          break
        default: // ! 最后一列仅是 第 5 列的情况 单价行
          tc.push({ text: r, style: STYLE_BODY })
      }
    }
    tableRows.push(tc)
  }
  return tableRows
}
