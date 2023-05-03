






export type ExcelJSContent =
  | string
  | ExcelJSContent[]
  | { text: string | ExcelJSContent[]; style?: Partial<ExcelJSStyle> }
export type ExcelJSStyle = {
  font: {
    bold?: boolean
    size?: number
  }
  alignment?: {
    horizontal?: "left" | "center" | "right"
  }
}
