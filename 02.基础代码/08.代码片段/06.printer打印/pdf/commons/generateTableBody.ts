import type { TableCell } from "pdfmake/interfaces"
import Decimal from "decimal.js"
import { ContractTableTuple } from "../../types"

export function generateTableBody(dataRows: ContractTableTuple[]): TableCell[][] {
  const tableRows: TableCell[][] = []
  for (let i = 0; i < dataRows.length; i++) {
    const rowData = dataRows[i]
    const tc: TableCell[] = []
    for (let j = 0; j < rowData.length; j++) {
      let r = rowData[j]
      // r = Decimal.isDecimal(r) ? r.toFixed(2) : r.toString()
      if (Decimal.isDecimal(r)) {
        r = r.isZero() ? "" : r.toFixed(2)
      } else if (typeof r === "string") {
        r.toUpperCase()
      }
      if (j === 0 || j === 6) {
        // 第1列和第7列居中显示
        tc.push({ text: r, alignment: "center" })
      } else tc.push({ text: r })
    }
    tableRows.push(tc)
  }
  return tableRows
}
