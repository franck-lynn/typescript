import { Decimal } from "decimal.js"
import { compose, findIndex, pluck, mergeAll, filter, not, isEmpty, mergeDeepRight } from "ramda"
import ExcelJS from "exceljs"

// import path from "path"

import {
  // ROW_MARGIN,
  // SUB_TABLE_HEADER_FONTSIZE,
  // TABLE_BODY_FONTSIZE,
  TABLE_HEADER_HEIGHT,
  TABLE_HEIGHT,
} from "../../constants"

import { BillingInfoType, ContactType, ContractType, TupleContractBody, TupleContractHeader } from "../../types"

import { sellerBillingInfo } from "../../data/seller"
import { setupTableHeader } from "./setupTableHeader"
import capitalCny from "../capital-cny"
import { setupTableBody } from "./setupTableBody"
import { numberToLetters } from "./commons"

const sheet1 = "购货合同"
const sheet2 = "附表"

const LR_PAGE_MARGIN = 0.236
const TB_PAGE_MARGIN = 0.62
const HF_PAGE_MARGIN = 0.236

const sheetSettings: Partial<ExcelJS.AddWorksheetOptions> = {
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

type OptionStyles = {
  defaultStyle?: Partial<ExcelJS.Style>
  styles?: Record<string, Partial<ExcelJS.Style>>
}
const optionStyles: OptionStyles = {
  // defaultStyle: {},
  // styles: {},
}

export function setupContract(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractBOM: TupleContractBody[]
) {
  const workbook = new ExcelJS.Workbook()
  // 共创建2张表
  workbook.addWorksheet(sheet1, sheetSettings)
  workbook.addWorksheet(sheet2, sheetSettings)
  // 根据名称获取表
  const worksheet1 = workbook.getWorksheet(sheet1)
  const worksheet2 = workbook.getWorksheet(sheet2)
  // 设置页脚
  worksheet1.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`
  worksheet2.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`

  const headerUp: TupleContractHeader = ["序号", "名称", "型号及材质", "数量", "单价", "总价", "品牌", "备注"]
  const headerdown: TupleContractHeader = contractInfo.isTax
    ? ["", "", "", "", "人民币含税", "", "", ""]
    : ["", "", "", "", "人民币不含税", "", "", ""]

  // 如果是含税, 就计算税额, 未税就计算 未税合计
  const amountTxt = contractInfo.isTax ? `税金合计` : `未税合计`

  const [up, down] = setupTableHeader(headerUp, headerdown)

  const NO_BORDER: Partial<ExcelJS.Style> = {}
  const B_BORDER: Partial<ExcelJS.Style> = {
    border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  }
  // const L_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  // const R_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  // // const T_BORDER = { border: [false, true, false, false], margin: [0, ROW_MARGIN] }
  // const LR_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  // const LT_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  // const TR_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  // const LTR_BORDER: Partial<ExcelJS.Style> = {
  //   border: { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } },
  // }
  const MAX_TABLE = 8
  const lenBom = contractBOM.length
  const isGt = lenBom > MAX_TABLE
  // 生成一个数组, 8 行, 列数与表头一致
  // 超过 8 行, 这个数组直接给 第 1 页的表格
  let tableRowsGt: any[] = []
  const J1 = findIndex((v) => v === "单价", headerUp)
  const J2 = findIndex((v) => v === "总价", headerUp)

  if (isGt) {
    const attachSheet: TupleContractBody[] = new Array<TupleContractBody[]>(MAX_TABLE).fill([]).map((_, i) => {
      return new Array<TupleContractBody[keyof TupleContractBody]>(headerUp.length).fill("").map((_, j) => {
        // return i === 0 && j === 1 ? "详情请见附表" : ""
        let el: string | Decimal = ""
        if (i === 0 && j === 1) el = "详情请见附表"
        else if (j === J1 || j === J2) el = new Decimal("0")
        else el = ""
        return el
      })
    }) as TupleContractBody[]
    // 再把这这个数组转换成 对象
    tableRowsGt = setupTableBody(attachSheet)
  }
  // 如果小于 8 行, 则补齐到 8 行
  const isLt = contractBOM.length < MAX_TABLE
  if (isLt) {
    const supplement: TupleContractBody[] = new Array<TupleContractBody[]>(MAX_TABLE - lenBom).fill([]).map((_, i) => {
      return new Array<TupleContractBody[keyof TupleContractBody]>(headerUp.length).fill("").map((_, j) => {
        let el: string | Decimal = ""
        if (j === 0) el = `${i + MAX_TABLE - lenBom - 1}`
        else if (j === J1 || j === J2) el = new Decimal("0")
        else el = ""
        return el
      })
    }) as TupleContractBody[]

    contractBOM = contractBOM.concat(supplement)
  }
  const tableRows = setupTableBody(contractBOM)

  // 计算表格中的金额 taxAmount 税金合计, taxAndPriceAmount: 价税合计, priceAmount: 未税合计
  let taxAmount: Decimal | string = new Decimal("0")
  let taxAndPriceAmount: Decimal | string = new Decimal("0")
  let priceAmount: Decimal | string = new Decimal("0")
  // 第几项是 总计, 先根据表头找一下
  const n = findIndex((v) => v === "总价", headerUp)
  // pluck 这一项
  const pluckTotal = pluck(n, contractBOM)

  const filterPluck = filter(compose(not, isEmpty), pluckTotal)
  // const mm = sum(map((v: string) => parseFloat(v), filterPluck))
  // const s1 = reduce(Decimal.add, new Decimal(0), filterPluck)
  const mm = filterPluck.reduce((acc, curr) => Decimal.add(acc, curr), new Decimal("0")) as Decimal

  if (contractInfo.isTax) {
    taxAndPriceAmount = mm // 价税合计 (第1, 2页都用到, 但计算方法不同, 直接相加)
    taxAmount = Decimal.mul(taxAndPriceAmount, 0.13) // 含税时计算税额(第1页用到 价税合计* 0.13)
  } else {
    priceAmount = mm // 未税时计算未税合计 (第1, 2页用到, 直接相加)
    taxAmount = Decimal.mul(priceAmount, 0.13) // 税额合计 (第1, 2页用到, priceAmount * 0.13 )
    taxAndPriceAmount = Decimal.mul(priceAmount, 1.13) // 价税合计 (第1, 2页都用到, 但计算方法不同, 上面2项相加)
  }
  taxAndPriceAmount = taxAndPriceAmount.toFixed(2)
  taxAmount = taxAmount.toFixed(2)
  // 转大写
  const capitalTaxAndPriceAmount = capitalCny(parseFloat(taxAndPriceAmount))
  console.log("计算的金额: ", taxAmount, capitalTaxAndPriceAmount, amountTxt)

  const content = [
    // 购货合同行
    {
      text: "购     货     合     同",
      style: {
        font: { name: "微软雅黑", size: 20, bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      },
      colSpan: 11,
    },
    // 供, 需, 订单行是一个表, 共 5 列
    {
      table: {
        widths: [58, "*", 58, "*", 10],
        body: [
          [
            mergeAll([{ text: "供      方: " }, { colSpan: 3 }, { style: NO_BORDER }]),
            mergeAll([{ text: sellerBillingInfo.company }, { colSpan: 3 }, { style: B_BORDER }]),
            mergeAll([{ text: "合 同 编号: " }, { colSpan: 2 }, { style: NO_BORDER }]),
            mergeAll([{ text: contractInfo.contractNo }, { colSpan: 3 }, { style: B_BORDER }]),
            mergeAll([{ text: contractInfo.deliveryWay }, { style: B_BORDER }]),
          ],
          [
            mergeAll([{ text: "需      方: " }, { colSpan: 3 }, { style: NO_BORDER }]),
            mergeAll([{ text: buyerBillingInfo.company }, { colSpan: 3 }, { style: B_BORDER }]),
            mergeAll([{ text: "日      期: " }, { colSpan: 2 }, { style: NO_BORDER }]),
            mergeAll([{ text: contractInfo.signedDate }, { colSpan: 4 }, { style: B_BORDER }]),
          ],
          [
            mergeAll([{ text: "经供需双方协商达成如下协议,并签定本合同." }, { colSpan: 6 }, NO_BORDER]),

            mergeAll([{ text: "客户订单号:" }, { colSpan: 2 }, { style: NO_BORDER }]),
            mergeAll([{ text: contractInfo.customerOrderId }, { colSpan: 4 }, { style: B_BORDER }]),
          ],
        ],
      },
    },
    //  一个空行
    { text: "AAA ", style: { alignment: { horizontal: "center", vertical: "middle" } }, font: { size: 6 } },
    // 合同的明细表格行
    {
      table: {
        headerRows: 2,
        // 数字设置的是固定列宽,
        // star 表示填充剩余空间, 如果多余一个 star, 平均分配剩余空间
        // auto 表示根据内容决定长度
        // widths: [16, 60, 120, "auto", "auto", "auto", 40, "*"],
        widths: [5, 16, 26, 7, 10, 12, 7, 14],
        heights: (row: number) => (row === 0 || row === 1 ? TABLE_HEADER_HEIGHT : TABLE_HEIGHT),
        // 超过 8 行就在第 2 页显示
        body: isGt ? [up, down, ...tableRowsGt] : [up, down, ...tableRows],
        // body: [up, down],
      },
    },
  ]
  // console.log([up, down])
  convert(content, worksheet1)
  return workbook
}

function convert(content: any[], worksheet: ExcelJS.Worksheet) {
  const startCol = 0 // 开始列数
  let rowNum = 0 // 行号的全局变量, 是与当前行号的差值
  // 遍历二维数组的每一组, 可能是表格, 也可能是字符串, 等等
  for (let i = 0; i < content.length; i++) {
    const item = content[i]
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
      // 获取对应的单元格行列进行设置,
      const c = worksheet.getCell(`${numberToLetters(startCol)}:${i + 1 + rowNum}`)
      c.value = item
      const style = getStyles(item, optionStyles)
      if (style) c.style = style
    }
    if ("text" in item) {
      const colSpan = item.colSpan ?? item.colSpan
      if (colSpan) {
        const start = `${numberToLetters(startCol)}${i + 1 + rowNum}`
        const end = `${numberToLetters(startCol + colSpan)}${i + 1 + rowNum}`
        worksheet.mergeCells(`${start}:${end}`)
      }
      const rowSpan = item.rowSpan ?? item.rowSpan
      if (rowSpan) {
        const start = `${numberToLetters(startCol)}${i + 1 + rowNum}`
        const end = `${numberToLetters(startCol)}${i + rowNum + rowSpan} `
        worksheet.mergeCells(`${start}:${end}`)
        rowNum = rowNum + rowSpan
      }
      const c = worksheet.getCell(`${numberToLetters(startCol)}:${i + 1 + rowNum}`)
      c.value = item.text
      const style = getStyles(item, optionStyles)
      if (style) c.style = style
    }
    if ("table" in item) {
      const tableBody = item.table.body
      const widths = item.table.widths

      for (let j = 0; j < tableBody.length; j++) {
        // 获取当前表格行
        const rowData = tableBody[j]

        let s = 0 // j 指针记录开始列, 从A(0)列开始,
        let e = 0 // j 指针记录结束列, 也是从A(0)列开始

        for (let k = 0; k < rowData.length; k++) {
          // 获取单元格数据
          const cData = rowData[k]
          const rowSpan = cData.rowSpan
          if (rowSpan) {
            const start = `${numberToLetters(startCol + k)}${j + 1 + rowNum + i}`
            const end = `${numberToLetters(startCol + k)}${j + rowNum + rowSpan + i} `
            worksheet.mergeCells(`${start}:${end}`)
            // if (k === 0) rowNum = rowNum + rowSpan
          }
          const colSpan = cData.colSpan
          if (colSpan) {
            e = s + colSpan - 1
            // console.log(`${numberToLetters(s)}${j + 1 + rowNum + i}:${numberToLetters(e)}${j + 1 + rowNum + i}`)
            worksheet.mergeCells(
              `${numberToLetters(s)}${j + 1 + rowNum + i}:${numberToLetters(e)}${j + 1 + rowNum + i}`
            )
          } else {
            e = s
          }
          // 获取单元格
          const c = worksheet.getCell(`${numberToLetters(startCol + s)}:${i + 1 + j + rowNum}`)
          if (cData.text) c.value = cData.text

          const style = getStyles(cData, optionStyles)

          if (style) c.style = style

          // 获取每一列, 只要设置一行所在列就可以
          if (j === 0 && widths) {
            // j 是行 k 是列
            const col = worksheet.getColumn(`${numberToLetters(startCol + k)}`)
            col.width = widths[k]
          }

          s = e + 1
        }
      }
      // 超过2行行号就要变
      rowNum = rowNum + tableBody.length - 1
    }
  }
}

function getStyles(item: any, optionStyles: OptionStyles) {
  let selfStyles = item.style

  const defaultStyle = optionStyles.defaultStyle
  const styles = optionStyles.styles

  if (!selfStyles && defaultStyle) {
    // 这是不存在 style 属性时, 设置一个默认的, 默认的也不存在, 就为空
    selfStyles = defaultStyle
    return
  }

  // selfStyles 存在, 当为字符串时
  if (typeof selfStyles === "string") {
    if (styles && styles[selfStyles]) {
      // styles 里面有 selfStyle 定义了的, 就用这个
      selfStyles = styles[selfStyles]
    } else {
      selfStyles = {}
    }
  }
  // 再看看 defaultStyle 是否存在
  if (defaultStyle) {
    selfStyles = mergeDeepRight(defaultStyle, selfStyles)
  }
  if (not(isEmpty(selfStyles))) return selfStyles
}
