import ExcelJS from "exceljs"
import { Decimal } from "decimal.js"

export interface TableBodyType {
  item_no: string | number
  name: string
  catalog_number: string
  qty: number | string
  price: Decimal
  amount: Decimal
  manufacturer: string
  remark: string
}

export interface RowType {
  name: string
  colSpan?: number
  style?: Partial<ExcelJS.Style>
  width?: number
  column?: string
}

export interface TableHeaderType {
  name: string
  width: number
  // 有这个属性时, 表示从这个所在列开始,与下一列合并
  attachname?: string
  style?: Partial<ExcelJS.Style>
}

// 单行不合并时, 排除掉 colSpan 属性
export type OmitColSpanRowType = Omit<RowType, "colSpan">

// 单行合并时, 排除掉 column 属性, 因为有 colSpan 指定了跨几列
export type OmitColumnnRowType = Omit<RowType, "column">
