import ExcelJS from "exceljs"

export type XlsxContent = XlsxContentText | XlsxContentTable

export interface XlsxContentText extends XlsxContentBase, ForbidOtherElementProperties<"text"> {
  text?: string | Date
}

export interface XlsxContentTable extends XlsxContentBase, ForbidOtherElementProperties<"table"> {
  table: XlsxTable
}

export interface XlsxContentBase extends XlsxStyle {
  style?: Partial<ExcelJS.Style>
}

export interface XlsxStyle {
  colSpan?: number
  rowSpan?: number
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
  body: XlsxTableCell[][]
}
export type Size = number | "auto" | "*" | string

export type XlsxTableCell = XlsxContentText
