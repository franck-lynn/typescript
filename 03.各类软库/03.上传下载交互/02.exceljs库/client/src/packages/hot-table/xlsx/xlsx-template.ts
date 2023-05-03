import { any, has } from "ramda"
import ExcelJS from "exceljs"

type TableHeader = {
  name: string
  // 有这个属性, 说明当前列与下一列下面的行要进行合并
  attachname?: string
}

// 报价单表头 QUOTATION_TABLE_HEADERS
export const QTH: TableHeader[] = [
  { name: "序号" }, //
  { name: "名称" },
  { name: "订货号" },
  { name: "型号及材质" },
  { name: "数量" },
  { name: "单价", attachname: "人民币不含税" },
  { name: "总价" },
  { name: "品牌" },
  { name: "物号" },
  { name: "备注" },
]
type TitleOptions = {
  name: string
  isMerge?: boolean
}
export const titleOptions: TitleOptions[] = [
  { name: "杭州德美瑞数控工具有限公司", isMerge: true },
  { name: "Hangzhou Demry NC Tooling Co.,Ltd", isMerge: true },
  { name: "报价单", isMerge: true },
  { name: "客  户: " },
]

// 单独生成一行
//
type RowType = {
  name: string
  colSpan?: number
}
export function generateRow(worksheet: ExcelJS.Worksheet, rows: RowType[]) {
  let j = 0 // j 指针记录开始列
  let k = 0 // k 指针记录增量后的列
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    j = i + k // 开始列 = 当前列 + 增量
    if (has("colSpan")(row)) {
      k = j + row.colSpan! // 增量后的列 = 开始列 + 增量
      // console.log("起始--> ", j, "结束", k)

      // currCol = numberToLetters(i + colSpan)
      // const currRow = 1
      // colSpan = colSpan + rows[i]!.colSpan!
      // console.log(`${numberToLetters(currCol)}${currRow}:${rows[i]?.colSpan} `)
      // // worksheet.mergeCells(`${currCol}${currRow}:${row[i]?.colSpan}`)
      // // 设置单元格
      // currCol = currCol + rows[i]!.colSpan!
      // j = j + i + row.colSpan!
    } else {
      j = k + 1
      k = j + k
    }

    // 没有增量的情况, k 只是随 j 增加
    // j = k + 1 // 开始列 = 当前列
    // k = j
    console.log(j, k)

    // const cell = worksheet.getCell(`${currCol}`)
    // cell.value = row[i]?.name
  }
}
export function generateTitle(
  worksheet: ExcelJS.Worksheet, //
  headers: TableHeader[],
  titleOptions: TitleOptions[]
) {
  // 确定要合并的列的最后一项
  const len = titleOptions.length
  const LAST_COLUMN = numberToLetters(headers.length - 1) // 最后列

  for (let i = 0; i < len; i++) {
    const current = titleOptions[i] // 当前项

    if (has("isMerge")(current)) {
      worksheet.mergeCells(`A${i + 1}:${LAST_COLUMN}${i + 1}`)
    }
    // 获取当前的单元格
    const currentRow = worksheet.getCell(`A${i + 1}`)
    currentRow.value = current?.name
  }
}

/* 
// 根据表头生成 标题
function generateTitle(
  worksheet: ExcelJS.Worksheet, //
  headers: TableHeader[],
  titleOptions: TitleOptions[] | TitleOptions[][]
) {
  // 确定要合并的列的最后一项
  const len = headers.length
  const LAST_COLUMN = len - 1

  for (let i = 0; i < len; i++) {
    const current = titleOptions[i]
    if (is(Array, current)) {
      // 如果是数组
    } else {
      // 不是数组,
      if (current?.isMerge) {
        // 要 merge
        worksheet.mergeCells(`A1:${LAST_COLUMN}`)
      }
      // 获取当前行
      worksheet.getCell()
    }
  }
}
 */
export function generateHeaders(
  worksheet: ExcelJS.Worksheet, //
  headers: TableHeader[],
  startRow: number,
  endrow: number
) {
  // 只要存在一项有 attachName, 就要进行合并, 并且在附加信息处进行列合并
  const existAttach = any(has("attachname"))(headers)
  const len = headers.length
  for (let i = 0; i < len; i++) {
    const header = headers[i] // 获取表头中的每一项
    const COL_NAME = numberToLetters(i) // 列名, 大写 A, B, C...

    let headwerPrev: TableHeader | undefined
    if (i > 0 && i < len - 1) {
      headwerPrev = headers[i - 1]
    }

    const hasAttatch = has("attachname")(header)
    // 当前元素的上一项有 attachname 属性, 就表示是有附加项的下一项
    const isAttatchNext = has("attachname")(headwerPrev)
    // 只有存在附加项才有合并项的需求, 分2种情况
    if (existAttach) {
      if (hasAttatch || isAttatchNext) {
        // 有附加项 或者 是附加项的后一项, 是不能进行行合并的, 只能进行部分列合并(下行合并)
        // 这里还要看当前列是有附加项还是没有附加项, 如果有, 取当前列和下一列,

        if (hasAttatch) {
          const COL_NAME_NEXT = numberToLetters(i + 1)
          // console.log(`${COL_NAME}${endrow}:${COL_NAME_NEXT}${endrow}`)
          worksheet.mergeCells(`${COL_NAME}${endrow}:${COL_NAME_NEXT}${endrow}`) // 行合并
          // 单独设置进行了列合并的下面单元格的值
          const cellDown = worksheet.getCell(`${COL_NAME}:${endrow}`) // 获取下面的单元格
          cellDown.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
          cellDown.value = header!.attachname!
          // 如果没有附加项, 就说明前面一项是有附加项的, 就什么都不用做
        }
      } else {
        // 没有附加项或者不是附加项后一项, 就进行列合并
        // console.log("进行行合并的项目", `${COL_NAME}${startRow}:${COL_NAME}${endrow}`)
        worksheet.mergeCells(`${COL_NAME}${startRow}:${COL_NAME}${endrow}`) // 列合并
      }
    }
    // 获取对象列, 进行样式和值的设定, 因为下面有一行 有合并的情况, 从开始行取

    const cell = worksheet.getCell(`${COL_NAME}${startRow}`)
    // 列宽在这里设置
    cell.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
    cell.value = header!.name!
  }
}

// 数字转字母的函数
function numberToLetters(num: number) {
  let letters = ""
  while (num >= 0) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters
    num = Math.floor(num / 26) - 1
  }
  return letters
}
