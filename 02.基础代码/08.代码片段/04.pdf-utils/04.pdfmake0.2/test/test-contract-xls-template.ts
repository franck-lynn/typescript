import path from "path"
import { setupContract } from "../helpers/xlsx/contract-xls-template"

import { buyerBillingInfo, buyerContact } from "../data/buyer"
import { contractInfo } from "../data/contract"
import { contractBOM } from "../data/table-contract-body"

const workbook = setupContract(contractInfo, buyerBillingInfo, buyerContact, contractBOM)

const filepath = path.resolve(__dirname, "./aName.xlsx")
workbook.xlsx.writeFile(filepath)
// 12列
/**
[
  [
    { text: '序号', rowSpan: 2, style: 'tableHeader' },
    { text: '名称', rowSpan: 2, colSpan: 3, style: 'tableHeader' },
    { text: '型号及材质', rowSpan: 2, style: 'tableHeader' },
    { text: '数量', rowSpan: 2, colSpan: 2, style: 'tableHeader' },
    { text: '单价' },
    { text: '总价', colSpan: 2, style: 'subTableHeader' },
    { text: '品牌', rowSpan: 2, style: 'tableHeader' },
    { text: '备注', rowSpan: 2, colSpan: 2, style: 'tableHeader' }
  ]
]
 */
