import { contractHeader } from "../../sheet-data/contract"
import { BillingInfoType, ContactType, ContentAttach, ContractTableTuple, ContractType, XlsxContent } from "../../types"

import { sellerBillingInfo, sellerContact } from "../../sheet-data/seller"

import { setupTableBody } from "../commons/setupTableBody"
import { DEFAULT_BODY_ROW_HEIGHT, STYLE_TITLE, widths } from "./contractStyles"
import { amount } from "../../commons/amount"
import { createContractBomHelper } from "./createBomHelper"
import { px } from "../commons/pixelWidth"

const TOTAL_COLUMNS = 12 // ! 合同表格的总列数, 是从 0 开始取的
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

  const body = setupTableBody(cBody) // ! 设置表格体内容和样式

  let content: XlsxContent[] = []

  const row_1: XlsxContent = { text: "购     货     合     同", colSpan: TOTAL_COLUMNS, style: STYLE_TITLE }

  const emptyRow1: XlsxContent = { text: "", colSpan: TOTAL_COLUMNS, rowHeight: 2 * px }

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
          { text: "需      方: ", colSpan: 2, style: { font: { bold: true } } },
          {
            text: buyerBillingInfo.company,
            colSpan: 4,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } } },
          },
          { text: "日      期: ", colSpan: 2, style: { font: { bold: true } } },
          {
            text: contractInfo.signedDate,
            colSpan: 5,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } }, alignment: { horizontal: "right" } },
          },
        ],
        [
          { text: "经供需双方协商达成如下协议,并签定本合同.", colSpan: 6, style: { font: { bold: true } } },
          { text: "客户订单号:", colSpan: 2 },
          {
            text: contractInfo.customerOrderId,
            colSpan: 5,
            style: { font: { bold: true }, border: { bottom: { style: "thin" } }, alignment: { horizontal: "right" } },
          },
        ],
      ],
    },
  }

  const table_2: XlsxContent = {
    table: {
      headerRows: 2,
      // ! widths 的定义 在 contractStyles.ts 文件
      // widths: [4.5, 3.25, 5, 2.88, 25, 2.25, 1.88, 10, 5, 6, 8.75, 4.38, 8.5],
      widths,
      autoFitRowHeight: true,
      body: [...header, ...body],
    },
  }

  const emptyRow2: XlsxContent = { text: "", colSpan: TOTAL_COLUMNS, rowHeight: 4 * px }

  const table_3: XlsxContent = {
    table: {
      body: [
        [
          {
            text: `注释：请签约人在合同编号后选择交货方式，交货方式分别为： FF: 可分批交货，并开具等值发票 / `,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: `           FY: 可分批交货，货品全齐时一次开发票/  YY:  不可分批发货，一次性发货并开发票`,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
      ],
    },
  }

  const { taxAmount, taxAndPriceAmount, priceAmount, capitalTaxAndPriceAmount } = amount(contractBody, isTax, headerUp)

  const table_4: XlsxContent = {
    table: {
      body: [
        [
          {
            text: `价税合计(含13%增值税): ${isTax ? taxAndPriceAmount : priceAmount}`,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ], //
        [
          {
            text: `未税合计 : ${taxAmount}`,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `大写:`,
            colSpan: 2,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { horizontal: "right" },
            },
          },
          {
            text: `人民币${capitalTaxAndPriceAmount}`,
            colSpan: 6,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
      ],
    },
  }

  const table_5: XlsxContent = {
    table: {
      body: [
        [
          {
            text: `质量标准：按制造商的质量技术标准执行`,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: `运输、包装要求、费用负担：适合于长途运输，费用由供方承担.`,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: `提出异议期限: 需方收到货后30天内提出异议. `,
            colSpan: TOTAL_COLUMNS + 1,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
      ],
    },
  }

  const table_6: XlsxContent = {
    table: {
      body: [
        [
          {
            text: "交货期",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${contractInfo.timeOfDelivery}`,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "收货人",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${buyerContact.name}`,
            colSpan: 5,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
            },
          },
        ],
        [
          {
            text: "交货地",
            colSpan: 2,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", horizontal: "left" },
            },
          },
          {
            text: `${contractInfo.pointOfDelivery}`,
            colSpan: 4,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", horizontal: "left" },
            },
          },
          {
            text: "邮寄地址",
            colSpan: 2,
            rowHeight: 2 * 0.8 * DEFAULT_BODY_ROW_HEIGHT,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", horizontal: "left" },
            },
          },
          {
            text: `${buyerContact.address}`,
            colSpan: 5,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", horizontal: "left", wrapText: true },
            },
          },
        ],
        [
          {
            text: "结算方式",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${contractInfo.termsOfPayment}`,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "电话",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${buyerContact.mobile}`,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "供方",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${sellerBillingInfo.company}`,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "需方",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: `${buyerBillingInfo.company}`,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "盖章",
            colSpan: 4,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "盖章",
            colSpan: 5,
            style: { border: { left: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          { text: "供方代表", colSpan: 2, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          { text: "", colSpan: 4, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          { text: "需方代表", colSpan: 2, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          { text: "", colSpan: 5, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
        ],
        [
          {
            text: "开户银行",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: sellerBillingInfo.bank,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "开户银行",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: buyerBillingInfo.bank,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "银行账号",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: sellerBillingInfo.account,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "银行账号",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: buyerBillingInfo.account,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "纳税人识别号",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: sellerBillingInfo.TaxpayerId,
            colSpan: 4,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "纳税人识别号",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: buyerBillingInfo.TaxpayerId,
            colSpan: 5,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "开票地址电话",
            colSpan: 2,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
            rowHeight: 2 * 0.8 * DEFAULT_BODY_ROW_HEIGHT,
          },
          {
            text: sellerBillingInfo.addressAndTel,
            colSpan: 4,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
          {
            text: "开票地址电话",
            colSpan: 2,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
          {
            text: buyerBillingInfo.addressAndTel,
            colSpan: 5,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
        ],
      ],
    },
  }

  const table_7: XlsxContent = {
    table: {
      body: [
        [
          {
            text: "联系人地址电话",
            colSpan: 2,
            rowHeight: 2 * 0.8 * DEFAULT_BODY_ROW_HEIGHT,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
          {
            text: `${sellerContact.name} ${sellerContact.mobile} ${sellerContact.address}`,
            colSpan: 4,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
          {
            text: "联系人地址电话",
            colSpan: 2,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
          {
            text: `${buyerContact.name} ${buyerContact.mobile} ${buyerContact.address}`,
            colSpan: 5,
            style: {
              border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } },
              alignment: { vertical: "top", wrapText: true },
            },
          },
        ],
      ],
    },
  }
  const table_8: XlsxContent = {
    table: {
      body: [
        [
          {
            text: "备注:",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
          {
            text: "1.供需双方必须全面履行合同，违约方应按《中华人民共和国民法典》承担责任。",
            colSpan: 11,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          { text: "", colSpan: 2, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          {
            text: "2.供需双方发生争议，协商调解不能解决，则按《中华人民共和国民法典》进行诉讼。",
            colSpan: 11,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          { text: "", colSpan: 2, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          {
            text: "3.本合同依法签订，具有法律效力，任何一方不得擅自变更或解除。如需变更和解除",
            colSpan: 11,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          { text: "", colSpan: 2, style: { border: { left: { style: "thin" }, right: { style: "thin" } } } },
          {
            text: "   时，应按《中华人民共和国民法典》关于变更或解除的条款办理。",
            colSpan: 11,
            style: { border: { left: { style: "thin" }, top: { style: "thin" }, right: { style: "thin" } } },
          },
        ],
        [
          {
            text: "",
            colSpan: 2,
            style: { border: { left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } } },
          },
          {
            text: "4.本合同一式两份，买卖双方各执一份，复印件具有同等法律效力。",
            colSpan: 11,
            style: {
              border: {
                left: { style: "thin" },
                top: { style: "thin" },
                right: { style: "thin" },
                bottom: { style: "thin" },
              },
            },
          },
        ],
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

    const rowArrach_1: XlsxContent = { text: "附                   表", colSpan: TOTAL_COLUMNS, style: STYLE_TITLE }

    const rowAttach_2: XlsxContent = {
      text: `客   户: ${buyerBillingInfo.company}`,
      colSpan: TOTAL_COLUMNS,
      style: {
        font: { name: "Arial", bold: true, size: 12 },
      },
    }

    const rowAttach_3: XlsxContent = {
      text: `合同号: ${contractInfo.contractNo}`,
      colSpan: TOTAL_COLUMNS,
      style: {
        font: { name: "Arial", bold: true, size: 12 },
      },
    }

    const attachBody = setupTableBody(attachData)
    const attachTable_1: XlsxContent = {
      table: { headerRows: 2, widths, autoFitRowHeight: true, body: [...header, ...attachBody] },
    }

    const attachTable_2: XlsxContent = {
      table: {
        body: [
          [
            {
              text: `合计: `,
              colSpan: 7,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
            {
              text: `${priceAmount}`,
              colSpan: 3,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
          ],
          [
            {
              text: `13% 税额: `,
              colSpan: 7,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
            {
              text: `${taxAmount}`,
              colSpan: 3,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
          ],
          [
            {
              text: `价税合计: `,
              colSpan: 7,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
            {
              text: `${taxAndPriceAmount}`,
              colSpan: 3,
              style: {
                font: { name: "Arial", bold: true },
                alignment: {
                  horizontal: "right",
                },
              },
            },
          ],
        ],
      },
    }
    attachContent = attachContent.concat(rowArrach_1, rowAttach_2, rowAttach_3, attachTable_1, attachTable_2)

    return { content, attachContent }
  }
  return { content }
}
