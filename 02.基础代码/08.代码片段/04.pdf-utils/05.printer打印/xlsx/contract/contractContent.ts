import { contractHeader } from "../../sheet-data/contract"
import { BillingInfoType, ContactType, ContractTableTuple, ContractType, XlsxContent } from "../../types"

import { sellerBillingInfo } from "../../sheet-data/seller"

import { B_BORDER, STYLE_TITLE } from "../commons/getStyles"

import { setupTableHeader } from "../commons/setupTableHeader"
import { setupTableBody } from "../commons/setupTableBody"

const TOTAL_COLUMNS = 12 // 合同表格的总列数

export const createContractContent = (
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractBody: ContractTableTuple[]
): XlsxContent[] => {
  let content: XlsxContent[] = []

  const row_1: XlsxContent = { text: "购     货     合     同", colSpan: TOTAL_COLUMNS, style: STYLE_TITLE }
  const table_1: XlsxContent = {
    table: {
      body: [
        [
          { text: "供      方: ", colSpan: 3 },
          { text: sellerBillingInfo.company, colSpan: 3, style: B_BORDER },
          { text: "合 同 编号: ", colSpan: 2 },
          { text: contractInfo.contractNo, colSpan: 3, style: B_BORDER },
          { text: contractInfo.deliveryWay, style: B_BORDER },
        ],
        [
          { text: "需      方: ", colSpan: 3 },
          { text: buyerBillingInfo.company, colSpan: 3, style: B_BORDER },
          { text: "日      期: ", colSpan: 2 },
          { text: contractInfo.signedDate, colSpan: 4, style: B_BORDER },
        ],
        [
          { text: "经供需双方协商达成如下协议,并签定本合同.", colSpan: 6 },
          { text: "客户订单号:", colSpan: 2 },
          { text: contractInfo.customerOrderId, colSpan: 4, style: B_BORDER },
        ],
      ],
    },
  }

  // 设置表头
  const isTax = contractInfo.isTax
  const header = setupTableHeader(contractHeader(isTax))
  const body = setupTableBody(contractBody)
  const table_2: XlsxContent = {
    table: {
      body: [...header, ...body],
    },
  }
  content = content.concat(row_1, table_1, table_2)

  return content
}
