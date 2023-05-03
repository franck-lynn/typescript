import { createContractContent } from "./contract/createContractContent"
import ExcelJS from "exceljs"

import type {
  BillingInfoType,
  ContactType,
  ContentAttach,
  ContractTableTuple,
  ContractType,
  XlsxOptions,
} from "../types"

import { DEFAULT_ROW_HEIGHT, optionStyles, sheetSettings } from "./contract/contractStyles"

import { convertContentToTemplate } from "./commons/convertContent"

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
 * @options XlsxOptions 主要是一些样式的选项
 */
export function setupContract(
  contractInfo: ContractType,
  buyerBillingInfo: BillingInfoType,
  buyerContact: ContactType,
  contractTable: ContractTableTuple[],
  options: XlsxOptions = optionStyles
) {
  const workbook = new ExcelJS.Workbook()
  // 共创建2张表
  workbook.addWorksheet(SHEET1, sheetSettings)

  // 根据名称获取表
  const worksheet1 = workbook.getWorksheet(SHEET1)
  // 设置默认行高
  worksheet1.properties.defaultRowHeight = DEFAULT_ROW_HEIGHT
  // 设置页脚
  worksheet1.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`

  // 生成 content
  const contractContent: ContentAttach | undefined = createContractContent(
    contractInfo,
    buyerBillingInfo,
    buyerContact,
    contractTable
  )

  if (contractContent) convertContentToTemplate(contractContent.content, worksheet1, options)

  if (contractContent && contractContent.attachContent) {
    workbook.addWorksheet(SHEET2, sheetSettings)
    const worksheet2 = workbook.getWorksheet(SHEET2)
    // 设置默认行高
    worksheet2.properties.defaultRowHeight = DEFAULT_ROW_HEIGHT
    // 在每个打印页面上重复特定的行
    worksheet2.pageSetup.printTitlesRow = "4:5"
    worksheet2.headerFooter.oddFooter = `&L &C &R 第 &P 页, 共 &N 页`

    convertContentToTemplate(contractContent.attachContent, worksheet2, options)
  }
  return workbook
}
