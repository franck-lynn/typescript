import type { Content } from "pdfmake/interfaces"
import { contractHeader } from "../../sheet-data/contract"
import { sellerBillingInfo, sellerContact } from "../../sheet-data/seller"
import { ROW_MARGIN, TABLE_HEADER_HEIGHT, TABLE_HEIGHT } from "../commons/constants"

import { BillingInfoType, ContactType, ContractTableTuple, ContractType } from "../../types"
import { generateTableBody } from "../commons/generateTableBody"
import { generateContractBomHelper } from "./generateContractBomHelper"
import { amount } from "../../commons/amount"

const MAX_ROW_NO = 8

export function generateContractContent(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractBody: ContractTableTuple[]
): Content {
  const isTax = contractInfo.isTax
  const cHeader = contractHeader(isTax)
  const headerUp = cHeader[0]

  const len = contractBody.length
  const isGtMaxRowNo = len > MAX_ROW_NO

  const { header, attachData, cBody } = generateContractBomHelper(contractInfo, contractBody)

  const body = generateTableBody(cBody) // ! 设置表格体内容和样式

  let content: Content = []

  const row_1: Content = {
    text: "购     货     合     同",
    style: { font: "msyh", bold: true, alignment: "center", fontSize: 20 },
    margin: [0, 0, 0, 8],
  }

  const table_1: Content = {
    table: {
      widths: [58, "*", 58, "*", 10],
      body: [
        [
          { text: "供      方: ", border: [false, false], margin: [0, ROW_MARGIN] },
          { text: sellerBillingInfo.company, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          { text: "合 同 编号: ", border: [false, false], margin: [0, ROW_MARGIN] },
          { text: contractInfo.contractNo, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          { text: contractInfo.deliveryWay, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "需      方: ", border: [false, false], margin: [0, ROW_MARGIN] },
          { text: buyerBillingInfo.company, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          { text: "日      期: ", border: [false, false], margin: [0, ROW_MARGIN] },
          { text: contractInfo.signedDate, border: [false, false, false, true], margin: [0, ROW_MARGIN], colSpan: 2 },
        ],
        [
          {
            text: "经供需双方协商达成如下协议,并签定本合同.",
            colSpan: 2,
            border: [false, false],
            margin: [0, ROW_MARGIN],
          },
          { text: "" },
          { text: "客户订单号:", border: [false, false], margin: [0, ROW_MARGIN] },
          {
            text: contractInfo.customerOrderId,
            border: [false, false, false, true],
            colSpan: 2,
            margin: [0, ROW_MARGIN],
          },
        ],
      ],
    },
  }
  const emptyRow1: Content = { text: " ", style: { alignment: "center", fontSize: 4 } } // ! 要有一个空格

  const table_2: Content = {
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
      body: [...header, ...body],
    },
  }

  // 注释行
  const table_3: Content = {
    table: {
      widths: ["*"],
      body: [
        [
          {
            text: `注释：请签约人在合同编号后选择交货方式，交货方式分别为： FF: 可分批交货，并开具等值发票 / `,
            border: [true, false, true, false],
          },
        ],
        [
          {
            text: `    FY: 可分批交货，货品全齐时一次开发票/  YY:  不可分批发货，一次性发货并开发票`,
            border: [true, false, true, false],
          },
        ],
      ],
    },
  }
  // 价税合计行, 表格
  const { taxAmount, taxAndPriceAmount, capitalTaxAndPriceAmount } = amount(contractBody, isTax, headerUp)

  const table_4_1: Content = {
    table: {
      widths: [45, "*"],
      body: [
        [
          { text: `未税合计`, border: [true, true, false, false] },
          { text: `${taxAmount}`, border: [true, true, true, false] },
        ],
      ],
    },
  }
  const table_4: Content = {
    table: {
      widths: [112, 128, 30, "*"],
      body: [
        [
          { text: `价税合计(含13%增值税:)`, border: [true, true, false, false] },
          { text: `${taxAndPriceAmount}`, border: [true, true, false, false] },
          { text: `大写:`, border: [true, true, false, false] },
          { text: `人民币${capitalTaxAndPriceAmount}`, border: [true, true, true, false] },
        ],
      ],
    },
  }
  // 质量标准与运输表格
  const table_5: Content = {
    table: {
      widths: ["*"],
      body: [
        [{ text: `质量标准：按制造商的质量技术标准执行`, border: [true, true, true, false], margin: [0, ROW_MARGIN] }],
        [
          {
            text: `运输、包装要求、费用负担：适合于长途运输，费用由供方承担.`,
            border: [true, false, true, false],
            margin: [0, ROW_MARGIN],
          },
        ],
        [
          {
            text: `提出异议期限: 需方收到货后30天内提出异议. `,
            border: [true, false, true, false],
            margin: [0, ROW_MARGIN],
          },
        ],
      ],
    },
  }
  // 交货方式等, 由于表格不一致, 还是才有一行行来做
  const table_6: Content = {
    table: {
      widths: [45, "*", 45, "*"],
      body: [
        [
          { text: "交货期", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${contractInfo.timeOfDelivery}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "收货人", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${buyerContact.name}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "交货地", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${contractInfo.pointOfDelivery}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "邮寄地址", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${buyerContact.address}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "结算方式", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${contractInfo.termsOfPayment}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "电话", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: `${buyerContact.mobile}`, border: [true, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "供方", border: [true, true, false, false], margin: [0, ROW_MARGIN] },
          { text: `${sellerBillingInfo.company}`, border: [false, true, false, false], margin: [0, ROW_MARGIN] },
          { text: "需方", border: [true, true, false, false], margin: [0, ROW_MARGIN] },
          { text: `${buyerBillingInfo.company}`, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "", border: [true, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "盖章", border: [false, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "", border: [true, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "盖章", border: [false, false, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "", border: [true, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "", border: [false, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "", border: [true, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "", border: [false, false, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "供方代表", border: [true, false, false, false], margin: [0, ROW_MARGIN] }, //
          { text: "", border: [false, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "需方代表", border: [true, false, false, false], margin: [0, ROW_MARGIN] },
          { text: "", border: [false, false, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "开户银行", border: [true, true, true, false], margin: [0, ROW_MARGIN] }, //
          { text: sellerBillingInfo.bank, border: [false, true, true, false], margin: [0, ROW_MARGIN] }, //
          { text: "开户银行", border: [false, true, true, false], margin: [0, ROW_MARGIN] }, //
          { text: buyerBillingInfo.bank, border: [false, true, true, false], margin: [0, ROW_MARGIN] }, //
        ],
        [
          { text: "银行账号", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: sellerBillingInfo.account, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "银行账号", border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: buyerBillingInfo.account, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "纳税人识别号", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: sellerBillingInfo.TaxpayerId, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "纳税人识别号", border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: buyerBillingInfo.TaxpayerId, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
        ],
        [
          { text: "开票地址电话", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          { text: sellerBillingInfo.addressAndTel, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: "开票地址电话", border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          { text: buyerBillingInfo.addressAndTel, border: [false, true, true, false], margin: [0, ROW_MARGIN] },
        ],
      ],
    },
  }
  // 联系人及联系方式:
  const table_7: Content = {
    table: {
      // widths: ["*", 20, "*", 20],
      widths: [45, "*", 45, "*"],
      body: [
        [
          { text: "联系人地址电话", border: [true, true, true, false], margin: [0, ROW_MARGIN] },
          {
            text: `${sellerContact.name} ${sellerContact.mobile} ${sellerContact.address}`,
            border: [false, true, true, false],
            margin: [0, ROW_MARGIN],
          },
          { text: "联系人地址电话", border: [false, true, true, false], margin: [0, ROW_MARGIN] },
          {
            text: `${buyerContact.name} ${buyerContact.mobile} ${buyerContact.address}`,
            border: [false, true, true, false],
            margin: [0, ROW_MARGIN],
          },
        ],
      ],
    },
  }
  // 聚合
  const table_8: Content = {
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
  }
  // 聚合
  content = content.concat(
    row_1,
    table_1,
    emptyRow1,
    table_2,
    table_3,
    table_4_1,
    table_4,
    table_5,
    table_6,
    table_7,
    table_8
  )

  if (isGtMaxRowNo) {
    content = content.concat({ text: "", fontSize: 0, pageBreak: "after" })
    const attachRow_1: Content = {
      text: "附  表",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 20 },
      margin: [0, 0, 0, 6],
    }
    const attachRow_2: Content = {
      text: `合同号: ${contractInfo.contractNo}`,
      style: { font: "msyh", bold: true, fontSize: 14, margin: [0, ROW_MARGIN] },
    }
    const attachRow_3: Content = {
      text: `客   户: ${buyerBillingInfo.company}`,
      style: { font: "msyh", bold: true, fontSize: 14, margin: [0, ROW_MARGIN] },
    }
    const attachRow_4: Content = { text: "  ", style: { alignment: "center", fontSize: 6 } }

    const { header } = generateContractBomHelper(contractInfo, contractBody)

    const attachBody = generateTableBody(attachData)
    const attachTable_1: Content = {
      table: {
        headerRows: 2,
        widths: [16, 60, 120, "auto", "auto", "auto", 40, "*"],
        heights: (row: number) => (row === 0 || row === 1 ? TABLE_HEADER_HEIGHT : TABLE_HEIGHT),
        body: [...header, ...attachBody],
      },
    }
    const attachTable_2: Content = {
      table: {
        widths: ["55%", "*"],
        body: [
          [
            { text: "合计:", border: [false, false, false, false], margin: [0, ROW_MARGIN], alignment: "right" },
            {
              text: `${taxAmount}`,
              border: [false, false, false, true],
              margin: [0, ROW_MARGIN],
              alignment: "left",
            },
          ],
          [
            { text: "税额:", border: [false, false, false, false], margin: [0, ROW_MARGIN], alignment: "right" },
            {
              text: `${taxAmount}`,
              border: [false, false, false, true],
              margin: [0, ROW_MARGIN],
              alignment: "left",
            },
          ],
          [
            { text: "价税合计:", border: [false, false, false, false], margin: [0, ROW_MARGIN], alignment: "right" },
            {
              text: `${taxAmount}`,
              border: [false, false, false, true],
              margin: [0, ROW_MARGIN],
              alignment: "left",
            },
          ],
        ],
      },
    }
    content = content.concat(attachRow_1, attachRow_2, attachRow_3, attachRow_4, attachTable_1, attachTable_2)
  }
  return content
}
