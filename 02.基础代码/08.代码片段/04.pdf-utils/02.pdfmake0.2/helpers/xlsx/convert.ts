import { Workbook, Worksheet, CellValue } from "exceljs"
import type { Style } from "exceljs"

type ExcelJSContent =
  | string
  | ExcelJSContent[]
  | { text: string | ExcelJSContent | ExcelJSContent[]; style?: Partial<ExcelJSStyle> }

type ExcelJSStyle = {
  font: {
    bold?: boolean
    size?: number
  }
  alignment?: {
    horizontal?: "left" | "center" | "right"
  }
}

export function convertContentToExcelJS(content: Content): ExcelJSContent {
  if (typeof content === "string") {
    return content
  } else if (Array.isArray(content)) {
    return content.map(convertContentToExcelJS)
  } else {
    const { text, bold, fontSize, alignment } = content

    const style: Partial<ExcelJSStyle> = {}
    if (bold) {
      style.font = { ...style.font, bold }
    }
    if (fontSize) {
      style.font = { ...style.font, size: fontSize }
    }
    if (alignment) {
      style.alignment = { horizontal: alignment as "left" | "center" | "right" }
    }
    return text ? { text: convertContentToExcelJS(text!), style } : { text: "", style }
  }
}
