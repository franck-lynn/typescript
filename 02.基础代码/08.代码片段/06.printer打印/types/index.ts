import { Decimal } from "decimal.js"
import ExcelJS from "exceljs"

/**
 * 合同的表格信息
 */
export type ContractTableTuple = [
  string | number,
  string,
  string,
  string | number,
  string | Decimal | number,
  string | Decimal | number,
  string,
  string
]

/**
 * 联系人信息
 */
export interface ContactType {
  name: string
  mobile: string
  address: string
}

/**
 * 开票信息
 */
export interface BillingInfoType {
  company: string
  TaxpayerId?: string // Taxpayer Identification Numbe 纳税人识别号
  bank?: string
  account?: string
  addressAndTel: string
}

/**
 * 合同信息
 */
export interface ContractType {
  contractNo: string
  customerOrderId?: string
  signedDate: string
  pointOfDelivery: string // Point of Delivery 交货地
  timeOfDelivery?: string // time of delivery 交货期
  termsOfPayment: string // terms of payment  付款方式
  deliveryWay: "FF" | "FY" | "YY"
  isTax: boolean
  taxRatio?: Decimal
}

export interface ContentAttach {
  content: XlsxContent[]
  attachContent?: XlsxContent[] | undefined
}

export type XlsxOptions = OptionXlsxStyles
export type OptionXlsxStyles = {
  defaultStyle?: Partial<ExcelJS.Style>
  styles?: Record<string, Partial<ExcelJS.Style>>
  // !  标题, 表头行高, 表体行高 设置, 其余在 worksheet 中的默认设置行高
  rowHeights?: [number, number, number]
}

export type XlsxContent = XlsxContentText | XlsxContentTable

export interface XlsxContentText extends XlsxContentBase, ForbidOtherElementProperties<"text"> {
  text?: string | Date | Decimal | number | undefined
}

export interface XlsxContentTable extends XlsxContentBase, ForbidOtherElementProperties<"table"> {
  table: XlsxTable
}

export interface XlsxContentBase extends XlsxStyle {
  style?: Partial<ExcelJS.Style> | string | undefined
}

export interface XlsxStyle {
  colSpan?: number
  rowSpan?: number
  rowHeight?: number
}

type ForbidOtherElementProperties<TProperty extends keyof ForbiddenElementProperties> = Omit<
  ForbiddenElementProperties,
  TProperty
>

interface ForbiddenElementProperties {
  text?: never
  table?: never
}
export interface XlsxTable {
  widths?: "*" | "auto" | Size[] | undefined
  headerRows?: number
  autoFitRowHeight?: boolean
  body: XlsxTableCell[][]
}
export type Size = number | "auto" | "*" | string

export type XlsxTableCell = XlsxContentText
