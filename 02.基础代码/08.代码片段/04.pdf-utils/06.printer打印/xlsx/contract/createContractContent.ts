// import { Decimal } from "decimal.js"
// import { findIndex } from "ramda"

import { contractHeader } from "../../sheet-data/contract"
import { BillingInfoType, ContactType, ContentAttach, ContractTableTuple, ContractType, XlsxContent } from "../../types"

import { sellerBillingInfo, sellerContact } from "../../sheet-data/seller"

// import { setupTableHeader } from "../commons/setupTableHeader"

import { setupTableBody } from "../commons/setupTableBody"
import { B_BORDER, STYLE_TITLE } from "./contractStyles"
import { amount } from "../../commons/amount"
import { createContractBomHelper } from "./createContractBomHelper"

const TOTAL_COLUMNS = 12 // 合同表格的总列数
const MAX_ROW_NO = 8

export const createContractContent = (
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractBody: ContractTableTuple[]
): ContentAttach | undefined => {
  const isTax = contractInfo.isTax
  const cHeader = contractHeader(isTax)
  const headerUp = cHeader[0]

  const len = contractBody.length
  const isGtMaxRowNo = len > MAX_ROW_NO
  const { header, attachData, cBody } = createContractBomHelper(contractInfo, contractBody)

  let content: XlsxContent[] = []

  const row_1: XlsxContent = { text: "购     货     合     同", colSpan: TOTAL_COLUMNS, style: STYLE_TITLE }

  const emptyRow1: XlsxContent = { text: "", colSpan: TOTAL_COLUMNS, style: { font: { size: 4 } } }

  const table_1: XlsxContent = {
    table: {
      body: [
        [
          { text: "供      方: ", colSpan: 2, style: { font: { bold: true } } },
          {
            text: sellerBillingInfo.company,
            colSpan: 4,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } } },
          },
          { text: "合 同 编号: ", colSpan: 2, style: { font: { bold: true } } },
          {
            text: contractInfo.contractNo,
            colSpan: 4,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } } },
          },
          {
            text: contractInfo.deliveryWay,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } }, alignment: { horizontal: "right" } },
          },
        ],
        [
          { text: "需      方: ", colSpan: 2 },
          { text: buyerBillingInfo.company, colSpan: 4, style: B_BORDER },
          { text: "日      期: ", colSpan: 2 },
          { text: contractInfo.signedDate, colSpan: 5, style: B_BORDER },
        ],
        [
          { text: "经供需双方协商达成如下协议,并签定本合同.", colSpan: 6 },
          { text: "客户订单号:", colSpan: 2 },
          { text: contractInfo.customerOrderId, colSpan: 5, style: B_BORDER },
        ],
      ],
    },
  }

  // // 设置表头
  // const isTax = contractInfo.isTax
  // const cHeader = contractHeader(isTax)
  // const header = setupTableHeader(cHeader)
  // // 根据表格最大行数是否大于 8 行, 来绝对是否添加附表, 大于8行添加附表, 原来的表格也要补齐 8 行
  // const headerUp = cHeader[0]
  // const J1 = findIndex((v) => v === "单价", headerUp)
  // const J2 = findIndex((v) => v === "总价", headerUp)

  // const len = contractBody.length
  // const isGtMaxRowNo = len > MAX_ROW_NO
  // const isLtMaxRowNo = len < MAX_ROW_NO

  // const attachData = contractBody // 把明细数据先保存起来

  // if (isGtMaxRowNo) {
  //   const seeingAttatchData: ContractTableTuple[] = new Array<ContractTableTuple[]>(MAX_ROW_NO).fill([]).map((_, i) => {
  //     return new Array<ContractTableTuple[keyof ContractTableTuple]>(headerUp.length).fill("").map((_, j) => {
  //       let el: string | Decimal | number = ""
  //       if (i === 0 && j === 1) el = "详情请见附表"
  //       else if (j === J1 || j === J2) el = new Decimal("0")
  //       else el = ""
  //       return el
  //     })
  //   }) as ContractTableTuple[]
  //   contractBody = seeingAttatchData
  // }

  // if (isLtMaxRowNo) {
  //   // 小于 8 行补齐 8 行数组
  //   const supplementData = new Array<ContractTableTuple[]>(MAX_ROW_NO - len).fill([]).map((_, i) => {
  //     return new Array<ContractTableTuple[keyof ContractTableTuple]>(headerUp.length).fill("").map((_, j) => {
  //       let el: string | Decimal | number = ""
  //       if (j === 0) el = i + len + 1
  //       else if (j === J1 || j === J2) el = new Decimal("0")
  //       else el = ""
  //       return el
  //     })
  //   }) as ContractTableTuple[]
  //   contractBody = contractBody.concat(supplementData)
  // }
  const body = setupTableBody(cBody)

  const table_2: XlsxContent = {
    table: {
      headerRows: 2,
      // 0.62       0.5      0.5    0.63   0.63 .62   0.63  0.62  0.62
      // !    3.88  2.75   5.88   2.25  29.25  1.63  1.25 4.13  1.63
      // !     A     B     C      D     E     F     G     H     I     J     K     L     M
      widths: [4.5, 3.25, 5, 2.88, 25, 2.25, 1.88, 10, 5, 6, 8.75, 4.38, 8.5],
      body: [...header, ...body],
    },
  }

  const emptyRow2: XlsxContent = { text: "", colSpan: TOTAL_COLUMNS, style: { font: { size: 4 } } }

  const table_3: XlsxContent = {
    table: {
      body: [
        [
          {
            text: `注释：请签约人在合同编号后选择交货方式，交货方式分别为： FF: 可分批交货，并开具等值发票 / `,
            colSpan: TOTAL_COLUMNS,
          },
        ],
        [
          {
            text: `           FY: 可分批交货，货品全齐时一次开发票/  YY:  不可分批发货，一次性发货并开发票`,
            colSpan: TOTAL_COLUMNS,
          },
        ],
      ],
    },
  }

  const { taxAmount, taxAndPriceAmount, priceAmount, capitalTaxAndPriceAmount } = amount(contractBody, isTax, headerUp)

  const table_4: XlsxContent = {
    table: {
      body: [
        [{ text: `价税合计(含13%增值税): ${isTax ? taxAndPriceAmount : priceAmount}`, colSpan: TOTAL_COLUMNS }], //
        [{ text: `未税合计 : ${taxAmount}` }, { text: `大写:` }, { text: `人民币${capitalTaxAndPriceAmount}` }],
      ],
    },
  }

  const table_5: XlsxContent = {
    table: {
      body: [
        [{ text: `质量标准：按制造商的质量技术标准执行` }],
        [{ text: `运输、包装要求、费用负担：适合于长途运输，费用由供方承担.` }],
        [{ text: `提出异议期限: 需方收到货后30天内提出异议. ` }],
      ],
    },
  }

  const table_6: XlsxContent = {
    table: {
      body: [
        [
          { text: "交货期" },
          { text: `${contractInfo.timeOfDelivery}` },
          { text: "收货人" },
          { text: `${buyerContact.name}` },
        ],
        [
          { text: "交货地" },
          { text: `${contractInfo.pointOfDelivery}` },
          { text: "邮寄地址" },
          { text: `${buyerContact.address}` },
        ],
        [
          { text: "结算方式" },
          { text: `${contractInfo.termsOfPayment}` },
          { text: "电话" },
          { text: `${buyerContact.mobile}` },
        ],
        [
          { text: "供方" },
          { text: `${sellerBillingInfo.company}` },
          { text: "需方" },
          { text: `${buyerBillingInfo.company}` },
        ],
        [{ text: "" }, { text: "盖章" }, { text: "" }, { text: "盖章" }],
        [{ text: "供方代表" }, { text: "" }, { text: "需方代表" }, { text: "" }],
        [{ text: "开户银行" }, { text: sellerBillingInfo.bank }, { text: "开户银行" }, { text: buyerBillingInfo.bank }],
        [
          { text: "银行账号" },
          { text: sellerBillingInfo.account },
          { text: "银行账号" },
          { text: buyerBillingInfo.account },
        ],
        [
          { text: "纳税人识别号" },
          { text: sellerBillingInfo.TaxpayerId },
          { text: "纳税人识别号" },
          { text: buyerBillingInfo.TaxpayerId },
        ],
        [
          { text: "开票地址电话" },
          { text: sellerBillingInfo.addressAndTel },
          { text: "开票地址电话" },
          { text: buyerBillingInfo.addressAndTel },
        ],
      ],
    },
  }

  const table_7: XlsxContent = {
    table: {
      body: [
        [
          { text: "联系人地址电话" },
          { text: `${sellerContact.name} ${sellerContact.mobile} ${sellerContact.address}` },
          { text: "联系人地址电话" },
          { text: `${buyerContact.name} ${buyerContact.mobile} ${buyerContact.address}` },
        ],
      ],
    },
  }
  const table_8: XlsxContent = {
    table: {
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
  }
  content = content.concat(
    row_1,
    emptyRow1,
    table_1,
    emptyRow2,
    table_2,
    table_3,
    table_4,
    table_5,
    table_6,
    table_7,
    table_8
  )

  if (isGtMaxRowNo) {
    let attachContent: XlsxContent[] = []
    const attachBody = setupTableBody(attachData)
    const attachTable: XlsxContent = { table: { body: [...header, ...attachBody] } }

    attachContent = attachContent.concat(attachTable)

    return { content, attachContent }
  }
  return { content }
}
