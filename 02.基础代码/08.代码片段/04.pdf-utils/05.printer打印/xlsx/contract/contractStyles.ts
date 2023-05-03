// import { map } from "ramda"

import { OptionXlsxStyles } from "../../types"
import { AddWorksheetOptions, Style } from "exceljs"
import { px } from "../commons/pixelWidth"
// ! exceljs 定义的单位是像素, 要根据dpi 来进行计算, 参加 pixelWidth.ts 文件
const LR_PAGE_MARGIN = 0.236
const TB_PAGE_MARGIN = 0.62
const HF_PAGE_MARGIN = 0.236

// aligment: 上下左右居中
export const CENTER: Partial<Style> = { alignment: { vertical: "middle", horizontal: "center" } }
// !  购货合同标题行样式,  第1行标题默认行高
export const DEFAULT_TITAL_ROW_HEIGTS = 40 * px
export const STYLE_TITLE: Partial<Style> = {
  font: { name: "微软雅黑", size: 20, bold: true },
  alignment: CENTER.alignment,
}

export const DEFAULT_ROW_HEIGHT = 22 * px // 工作表默认行高, 这个是起作用的, 例如, 没有文字的地方行高就是22px
// 表头默认行高
export const DEFAULT_HEADER_ROW_HEIGHT = 22 * px
// 表体默认行高
export const DEFAULT_BODY_ROW_HEIGHT = 30 * px
// 默认列宽, 给 convertContent 用的
export const DEFAULT_COLUMNS_WIDTH = 100 /* * px */
// 默认字体高
export const DEFAULT_FONT_SIZE = 11

// const _width = [4.5, 3.25, 5, 2.88, 25, 2.25, 1.88, 10, 5, 6, 8.75, 4.38, 8.5]
// export const widths = map((x: number) => x * px)(_width)

const BORDER: Partial<Style> = {
  border: {
    left: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  },
}

// ! 表格标题一般样式, 在 setupTableBody, 有边框
export const STYLE_BODY: Partial<Style> = { border: BORDER.border, alignment: { vertical: "middle" } }
// ! 表体居中样式, 在 setupTableBody, 有边框, 还有居中
export const STYLE_BODY_CENTER: Partial<Style> = { border: BORDER.border, alignment: CENTER.alignment }
// ! 表体自动换行样式, 有边框, 自动换行
export const STYLE_BODY_WRAPTEXT: Partial<Style> = {
  border: BORDER.border,
  alignment: { wrapText: true, vertical: "middle" },
}
// ! 靠左对齐
export const STYLE_BODY_LEFT: Partial<Style> = {
  border: BORDER.border,
  alignment: { wrapText: true, vertical: "middle", horizontal: "left" },
}

export const B_BORDER: Partial<Style> = { border: { bottom: { style: "thin" } } }

export const sheetSettings: Partial<AddWorksheetOptions> = {
  properties: { tabColor: { argb: "FF00000" } },
  pageSetup: {
    paperSize: 9,
    orientation: "portrait", //
    horizontalCentered: true,
    margins: {
      left: LR_PAGE_MARGIN,
      right: LR_PAGE_MARGIN,
      top: TB_PAGE_MARGIN,
      bottom: TB_PAGE_MARGIN,
      header: HF_PAGE_MARGIN,
      footer: HF_PAGE_MARGIN,
    },
  },
}

export const optionStyles: OptionXlsxStyles = {
  defaultStyle: {
    font: { size: 11, name: "Arial" },
    alignment: { vertical: "middle" },
  },
  styles: {
    tableHeader: { font: { name: "Arial", size: 11, bold: true }, alignment: CENTER.alignment, border: BORDER.border },
    subTableHeader: {
      font: { name: "Arial", size: 11, bold: true },
      alignment: CENTER.alignment,
      border: BORDER.border,
    },
  },
}
