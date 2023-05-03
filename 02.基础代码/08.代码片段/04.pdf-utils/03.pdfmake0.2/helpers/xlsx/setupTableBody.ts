import Decimal from "decimal.js"
import { TupleContractBody } from "../../types"

export function setupTableBody(dataRows: TupleContractBody[]) {
  const tableRows = []
  for (let i = 0; i < dataRows.length; i++) {
    const rowData = dataRows[i] // 每一行的数据
    const tc = [] // 单元格数据
    for (let j = 0; j < rowData.length; j++) {
      let r = rowData[j] // 当前单元格数据
      if (Decimal.isDecimal(r)) {
        r = r.isZero() ? "" : r.toFixed(2)
      } else {
        r.toUpperCase()
      }
      // 列的样式
      if (j === 0 || j === 6) {
        // 第1列和第7列居中显示
        tc.push({ text: r, alignment: "center" })
      } else {
        if (j === 1) tc.push({ text: r, colSpan: 3 })
        if (j === 3 || j === rowData.length - 1) tc.push({ text: r, colSpan: 2 })
        else tc.push({ text: r })
      }
    }
    tableRows.push(tc)
  }
  return tableRows
}
