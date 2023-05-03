import type { TDocumentDefinitions, Content } from "pdfmake/interfaces"
import { BillingInfoType, ContactType, ContractTableTuple, ContractType } from "../types"
import { ROW_MARGIN, SUB_TABLE_HEADER_FONTSIZE, TABLE_BODY_FONTSIZE } from "./commons/constants"
import { generateContractContent } from "./contract/generateContractContent"

export function generateContract(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractTable: ContractTableTuple[]
): TDocumentDefinitions {
  // 生成 content
  const content = generateContractContent(contractInfo, buyerBillingInfo, buyerContact, contractTable)
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
