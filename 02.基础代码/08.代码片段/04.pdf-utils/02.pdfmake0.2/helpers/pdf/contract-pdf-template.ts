import { Decimal } from "decimal.js"
import type { TDocumentDefinitions, TableCell, Content, ContentText, ContentTable } from "pdfmake/interfaces"
import { compose, findIndex, pluck, mergeAll, filter, not, isEmpty } from "ramda"

import { BillingInfoType, ContactType, ContractType, TupleContractHeader, TupleContractBody } from "../../types"
import { sellerBillingInfo, sellerContact } from "../../data/seller"

import {
  ROW_MARGIN,
  SUB_TABLE_HEADER_FONTSIZE,
  TABLE_BODY_FONTSIZE,
  TABLE_HEADER_HEIGHT,
  TABLE_HEIGHT,
} from "../../constants"

import { generateTableHeader } from "./generateTableHeader"
import { generateTableBody } from "./generateTableBody"
import capitalCny from "../capital-cny"

export function generateContract(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractBOM: TupleContractBody[]
): TDocumentDefinitions {
  const headerUp: TupleContractHeader = ["序号", "名称", "型号及材质", "数量", "单价", "总价", "品牌", "备注"]
  const headerdown: TupleContractHeader = contractInfo.isTax
    ? ["", "", "", "", "人民币含税", "", "", ""]
    : ["", "", "", "", "人民币不含税", "", "", ""]
  // 如果是含税, 就计算税额, 未税就计算 未税合计
  const amountTxt = contractInfo.isTax ? `税金合计` : `未税合计`

  const [up, down] = generateTableHeader(headerUp, headerdown)

  const NO_BORDER = { border: [false, false], margin: [0, ROW_MARGIN] }
  const B_BORDER = { border: [false, false, false, true], margin: [0, ROW_MARGIN] }
  const L_BORDER = { border: [true, false, false, false], margin: [0, ROW_MARGIN] }
  const R_BORDER = { border: [false, false, true, false], margin: [0, ROW_MARGIN] }
  // const T_BORDER = { border: [false, true, false, false], margin: [0, ROW_MARGIN] }
  const LR_BORDER = { border: [true, false, true, false], margin: [0, ROW_MARGIN] }
  const LT_BORDER = { border: [true, true, false, false], margin: [0, ROW_MARGIN] }
  const TR_BORDER = { border: [false, true, true, false], margin: [0, ROW_MARGIN] }
  const LTR_BORDER = { border: [true, true, true, false], margin: [0, ROW_MARGIN] }
  const MAX_TABLE = 8
  const lenBom = contractBOM.length
  const isGt = lenBom > MAX_TABLE
  // 生成一个数组, 8 行, 列数与表头一致
  // 超过 8 行, 这个数组直接给 第 1 页的表格
  let tableRowsGt: TableCell[][] = []
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
    tableRowsGt = generateTableBody(attachSheet)
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
  const tableRows = generateTableBody(contractBOM)

  // console.log(tableRows)
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
  // 获取 tableRows 的 总价 项
  // console.log(tableRows)
  // 先构造一个数组, 再用本软件专属函数生成 开票资料, 交货期等这些表格
  const content: Content = [
    // 购货合同行
    {
      text: "购     货     合     同",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 20 },
      margin: [0, 0, 0, 8],
    },
    // 供, 需, 订单行是一个表, 共 5 列
    {
      table: {
        widths: [58, "*", 58, "*", 10],
        body: [
          [
            mergeAll([{ text: "供      方: " }, NO_BORDER]),
            mergeAll([{ text: sellerBillingInfo.company }, B_BORDER]),
            mergeAll([{ text: "合 同 编号: " }, NO_BORDER]),
            mergeAll([{ text: contractInfo.contractNo }, B_BORDER]),
            mergeAll([{ text: contractInfo.deliveryWay }, B_BORDER]),
          ],
          [
            mergeAll([{ text: "需      方: " }, NO_BORDER]),
            mergeAll([{ text: buyerBillingInfo.company }, B_BORDER]),
            mergeAll([{ text: "日      期: " }, NO_BORDER]),
            mergeAll([{ text: contractInfo.signedDate }, { colSpan: 2 }, B_BORDER]),
          ],
          [
            mergeAll([{ text: "经供需双方协商达成如下协议,并签定本合同." }, { colSpan: 2 }, NO_BORDER]),
            "",
            mergeAll([{ text: "客户订单号:" }, NO_BORDER]),
            mergeAll([{ text: contractInfo.customerOrderId }, { colSpan: 2 }, B_BORDER]),
          ],
        ],
      },
    },
    //  一个空行
    { text: " ", style: { alignment: "center", fontSize: 6 } },
    // 合同的明细表格行
    {
      layout: {
        hLineWidth: (rowIndex: number) => (rowIndex === 0 || rowIndex === 2 ? 2 : 1),
        vLineWidth: () => 1,
        hLineColor: () => "gray",
        vLineColor: () => "gray",
      },

      table: {
        headerRows: 2,
        // 数字设置的是固定列宽,
        // star 表示填充剩余空间, 如果多余一个 star, 平均分配剩余空间
        // auto 表示根据内容决定长度
        widths: [16, 60, 120, "auto", "auto", "auto", 40, "*"],
        heights: (row: number) => (row === 0 || row === 1 ? TABLE_HEADER_HEIGHT : TABLE_HEIGHT),
        // 超过 8 行就在第 2 页显示
        body: isGt ? [up, down, ...tableRowsGt] : [up, down, ...tableRows],
      },
    },
    // 注释行
    {
      table: {
        widths: ["*"],
        body: [
          [
            mergeAll([
              { text: `注释：请签约人在合同编号后选择交货方式，交货方式分别为： FF: 可分批交货，并开具等值发票 / ` },
              LR_BORDER,
            ]),
          ],
          [
            mergeAll([
              { text: `    FY: 可分批交货，货品全齐时一次开发票/  YY:  不可分批发货，一次性发货并开发票` },
              LR_BORDER,
            ]),
          ],
        ],
      },
    },
    // 合计行, 也是一个表格
    {
      table: {
        widths: [45, "*"],
        body: [
          [mergeAll([{ text: `${amountTxt}` }, LT_BORDER]), mergeAll([{ text: `${taxAmount}` }, LTR_BORDER])], //
        ],
      },
    },
    // 价税合计行, 表格
    {
      table: {
        widths: [112, 128, 30, "*"],
        body: [
          [
            mergeAll([{ text: `价税合计(含13%增值税:)` }, LT_BORDER]),
            mergeAll([{ text: `${taxAndPriceAmount}` }, LT_BORDER]),
            mergeAll([{ text: `大写:` }, LT_BORDER]),
            mergeAll([{ text: `人民币${capitalTaxAndPriceAmount}` }, LTR_BORDER]),
          ],
        ],
      },
    },
    // 质量标准与运输表格
    {
      table: {
        widths: ["*"],
        body: [
          [mergeAll([{ text: `质量标准：按制造商的质量技术标准执行` }, LTR_BORDER])], //
          [mergeAll([{ text: `运输、包装要求、费用负担：适合于长途运输，费用由供方承担.` }, LR_BORDER])], //
          [mergeAll([{ text: `提出异议期限: 需方收到货后30天内提出异议. ` }, LR_BORDER])], //
        ],
      },
    },
    // 交货方式等, 由于表格不一致, 还是才有一行行来做
    {
      table: {
        widths: [45, "*", 45, "*"],
        body: [
          [
            mergeAll([{ text: "交货期" }, LTR_BORDER]),
            mergeAll([{ text: `${contractInfo.timeOfDelivery}` }, LTR_BORDER]),
            mergeAll([{ text: "收货人" }, LTR_BORDER]),
            mergeAll([{ text: `${buyerContact.name}` }, LTR_BORDER]),
          ],
          [
            mergeAll([{ text: "交货地" }, LTR_BORDER]),
            mergeAll([{ text: `${contractInfo.pointOfDelivery}` }, LTR_BORDER]),
            mergeAll([{ text: "邮寄地址" }, LTR_BORDER]),
            mergeAll([{ text: `${buyerContact.address}` }, LTR_BORDER]),
          ],
          [
            mergeAll([{ text: "结算方式" }, LTR_BORDER]),
            mergeAll([{ text: `${contractInfo.termsOfPayment}` }, LTR_BORDER]),
            mergeAll([{ text: "电话" }, LTR_BORDER]),
            mergeAll([{ text: `${buyerContact.mobile}` }, LTR_BORDER]),
          ],
          [
            mergeAll([{ text: "供方" }, LT_BORDER]),
            mergeAll([{ text: `${sellerBillingInfo.company}` }, TR_BORDER]),
            mergeAll([{ text: "需方" }, LT_BORDER]),
            mergeAll([{ text: `${buyerBillingInfo.company}` }, TR_BORDER]),
          ],
          [
            mergeAll([{ text: "" }, L_BORDER]),
            mergeAll([{ text: "盖章" }, NO_BORDER]),
            mergeAll([{ text: "" }, L_BORDER]),
            mergeAll([{ text: "盖章" }, R_BORDER]),
          ],
          [
            mergeAll([{ text: "供方代表" }, L_BORDER]),
            mergeAll([{ text: "" }, NO_BORDER]),
            mergeAll([{ text: "需方代表" }, L_BORDER]),
            mergeAll([{ text: "" }, R_BORDER]),
          ],
          [
            mergeAll([{ text: "开户银行" }, LTR_BORDER]),
            mergeAll([{ text: sellerBillingInfo.bank }, TR_BORDER]),
            mergeAll([{ text: "开户银行" }, TR_BORDER]),
            mergeAll([{ text: buyerBillingInfo.bank }, TR_BORDER]),
          ],
          [
            mergeAll([{ text: "银行账号" }, LTR_BORDER]),
            mergeAll([{ text: sellerBillingInfo.account }, TR_BORDER]),
            mergeAll([{ text: "银行账号" }, TR_BORDER]),
            mergeAll([{ text: buyerBillingInfo.account }, TR_BORDER]),
          ],
          [
            mergeAll([{ text: "纳税人识别号" }, LTR_BORDER]),
            mergeAll([{ text: sellerBillingInfo.TaxpayerId }, TR_BORDER]),
            mergeAll([{ text: "纳税人识别号" }, TR_BORDER]),
            mergeAll([{ text: buyerBillingInfo.TaxpayerId }, TR_BORDER]),
          ],
          [
            mergeAll([{ text: "开票地址电话" }, LTR_BORDER]),
            mergeAll([{ text: sellerBillingInfo.addressAndTel }, TR_BORDER]),
            mergeAll([{ text: "开票地址电话" }, TR_BORDER]),
            mergeAll([{ text: buyerBillingInfo.addressAndTel }, TR_BORDER]),
          ],
        ],
      },
    },
    // 联系人及联系方式:
    // {
    //   table: {
    //     widths: ["*"],
    //     body: [
    //       [mergeAll([{ text: "联系人及联系方式, 邮寄地址" }, LTR_BORDER])], //
    //     ],
    //   },
    // },
    {
      table: {
        // widths: ["*", 20, "*", 20],
        widths: [45, "*", 45, "*"],
        body: [
          [
            mergeAll([{ text: "联系人地址电话" }, LTR_BORDER]),
            mergeAll([{ text: `${sellerContact.name} ${sellerContact.mobile} ${sellerContact.address}` }, TR_BORDER]),
            mergeAll([{ text: "联系人地址电话" }, TR_BORDER]),
            mergeAll([{ text: `${buyerContact.name} ${buyerContact.mobile} ${buyerContact.address}` }, TR_BORDER]),
          ],
        ],
      },
    },

    {
      table: {
        widths: [36, "*"],
        body: [
          [
            { text: "备注:", rowSpan: 5 },
            { text: "1.供需双方必须全面履行合同，违约方应按《中华人民共和国民法典》承担责任。" },
          ],
          [{ text: "" }, { text: "2.供需双方发生争议，协商调解不能解决，则按《中华人民共和国民法典》进行诉讼。" }],
          [{ text: "" }, { text: "3.本合同依法签订，具有法律效力，任何一方不得擅自变更或解除。如需变更和解除" }],
          [{ text: "" }, { text: "时，应按《中华人民共和国民法典》关于变更或解除的条款办理。" }],
          [{ text: "" }, { text: "4.本合同一式两份，买卖双方各执一份，复印件具有同等法律效力。" }],
        ],
      },
    },
  ]

  if (isGt) {
    content.push({ text: "", fontSize: 0, pageBreak: "after" })

    // 这里为什么要重写取下表头呢?
    const [up, down] = generateTableHeader(headerUp, headerdown)
    // 合计项
    const total = []
    if (contractInfo.isTax) {
      total.push([
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "价税合计" }, { colSpan: 2 }, { style: { alignment: "right" } }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([
          { text: `${taxAndPriceAmount}` },
          { colSpan: 3 },
          { style: { alignment: "left" } },
          NO_BORDER,
        ]),
      ])
    } else {
      total.push([
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "汇总" }, { colSpan: 2 }, { style: { alignment: "right" } }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([
          { text: `${priceAmount}` },
          { colSpan: 3 },
          { style: { alignment: "left" } },
          NO_BORDER,
        ]),
      ])
      total.push([
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "税额" }, { colSpan: 2 }, { style: { alignment: "right" } }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: `${taxAmount}` }, { colSpan: 3 }, { style: { alignment: "left" } }, NO_BORDER]),
      ])
      total.push([
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "价税合计" }, { colSpan: 2 }, { style: { alignment: "right" } }, NO_BORDER]),
        mergeAll<TableCell[]>([{ text: "" }, NO_BORDER]),
        mergeAll<TableCell[]>([
          { text: `${taxAndPriceAmount}` },
          { colSpan: 3 },
          { style: { alignment: "left" } },
          NO_BORDER,
        ]),
      ])
    }

    const attatchSheet = [
      <ContentText>{
        text: "附  表",
        style: { font: "msyh", bold: true, alignment: "center", fontSize: 20 },
        margin: [0, 0, 0, 6],
      },
      <ContentText>{
        text: `客户: ${buyerBillingInfo.company}`,
        style: { font: "msyh", bold: true, fontSize: 10, margin: [0, ROW_MARGIN] },
      },
      <ContentText>{
        text: `合同号: ${contractInfo.contractNo}`,
        style: { font: "msyh", bold: true, fontSize: 10, margin: [0, ROW_MARGIN] },
      },
      <ContentTable>{
        layout: {
          hLineWidth: (rowIndex: number) => (rowIndex === 0 || rowIndex === 2 ? 2 : 1),
          vLineWidth: () => 1,
          hLineColor: () => "gray",
          vLineColor: () => "gray",
        },
        table: {
          headerRows: 2,
          widths: [16, 60, 120, "auto", "auto", "auto", 40, "*"],
          heights: (row: number) => (row === 0 || row === 1 ? TABLE_HEADER_HEIGHT : TABLE_HEIGHT),
          body: [up, down, ...tableRows, ...total],
        },
      },
    ]

    content.push(...attatchSheet)
  }
  return {
    pageOrientation: "portrait", // 默认的进纸方式
    pageSize: "A4",
    pageMargins: [30, 30, 30, 40], // 设置页面距
    defaultStyle: { font: "SimSum", fontSize: TABLE_BODY_FONTSIZE },
    styles: {
      tableHeader: { font: "msyh", bold: true },
      subTableHeader: { font: "msyh", bold: true, fontSize: SUB_TABLE_HEADER_FONTSIZE },
    },
    content,
    // 设置页脚
    footer: (currentPage: number, pageCount: number /* , pageSize: ContextPageSize */): Content => {
      return {
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              { text: "", margin: [30, ROW_MARGIN] },
              {
                text: `第 ${currentPage} 页, 共 ${pageCount}页`,

                style: { alignment: "right" },
                margin: [30, ROW_MARGIN],
              },
            ],
          ],
        },
        // 取消边框在 table 的同级
        layout: "noBorders",
      }
    },
  }
}
