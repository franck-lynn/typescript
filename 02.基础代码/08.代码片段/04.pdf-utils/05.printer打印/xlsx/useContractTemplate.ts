import { createContractContent } from "./contract/contractContent"
import ExcelJS from "exceljs"

import type { BillingInfoType, ContactType, ContractTableTuple, ContractType, XlsxContent } from "../types"

import { sheetSettings } from "./contract/contractStyles"

import { convertContentToTemplate } from "./commons/convertContentToTemplate"

const SHEET1 = "购货合同"
const SHEET2 = "附表"

/**
 * 根据这个模板生成合同的 excel 文件.
 * 供方开票信息和联系是固定在模板里, 不需要动态改变
 * @param contractInfo 合同信息: 合同号contractNo, 客户订单号customerOrderId, 签订日期,
 * 交货地, 交货期, 付款方式, 是否含税等
 * @param buyerBillingInfo 客户开票资料,
 * @param buyerContact 客户联系
 * @param contractTable 合同的明细表
 */
export function setupContract(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractTable: ContractTableTuple[]
) {
  const workbook = new ExcelJS.Workbook()
  // 共创建2张表
  workbook.addWorksheet(SHEET1, sheetSettings)
  workbook.addWorksheet(SHEET2, sheetSettings)
  // 根据名称获取表
  const worksheet1 = workbook.getWorksheet(SHEET1)
  const worksheet2 = workbook.getWorksheet(SHEET2)
  // 设置页脚
  worksheet1.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`
  worksheet2.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`

  const content: XlsxContent[] = createContractContent(contractInfo, buyerBillingInfo, buyerContact, contractTable)

  convertContentToTemplate(content, worksheet1)

  return workbook
}
