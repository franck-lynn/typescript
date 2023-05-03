import { TableHeaderType } from "./types"

// 报价单表头 QUOTATION_TABLE_HEADERS
export const quotationTableHeader: TableHeaderType[] = [
  { name: "序号", width: 5 }, //
  { name: "名称", width: 16 },
  { name: "型号及材质", width: 26 },
  { name: "数量", width: 7 },
  { name: "单价", width: 10, attachname: "人民币不含税" },
  { name: "总价", width: 12 },
  { name: "品牌", width: 7 },
  { name: "备注", width: 14 },
]
export const TOTAL_QUOTATION_COLUMNS = quotationTableHeader.length
